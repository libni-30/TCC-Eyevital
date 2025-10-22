import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get, post } from "../lib/api";

interface ChatIntroProps {
  limit?: number;
}

interface ChatMessage {
  id: number;
  message: string;
  sender: "user" | "specialist";
  created_at: string;
}

export default function ChatIntro({ limit = 10 }: ChatIntroProps) {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar histórico e contador ao montar
  useEffect(() => {
    loadChatData();
  }, []);

  const loadChatData = async () => {
    try {
      const [countData, messagesData] = await Promise.all([
        get<{ count: number }>("/chat/count"),
        get<ChatMessage[]>("/chat/messages")
      ]);
      setCount(countData.count);
      setMessages(messagesData);
    } catch (err) {
      console.error("Erro ao carregar chat:", err);
      setError("Erro ao carregar histórico do chat");
    }
  };

  const handleSend = async () => {
    const txt = message.trim();
    if (!txt) return;
    if (count >= limit) return;

    setLoading(true);
    setError(null);

    try {
      const response = await post<
        {
          userMessage: ChatMessage;
          specialistMessage: ChatMessage;
          questionsRemaining: number;
        },
        { message: string }
      >("/chat/send", { message: txt });

      setMessages((prev) => [
        ...prev,
        response.userMessage,
        response.specialistMessage
      ]);
      setCount((c) => c + 1);
      setMessage("");
    } catch (err: any) {
      console.error("Erro ao enviar mensagem:", err);
      if (err.message?.includes("403")) {
        setError("Você atingiu o limite de 10 perguntas");
      } else {
        setError("Erro ao enviar mensagem. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const disabled = count >= limit || loading;

  return (
    <section className="chat-section" aria-labelledby="chat-title">
      <div className="chat-container">
        <h2 id="chat-title" className="chat-title">
          Bem vindo ao chat!
        </h2>
        <p className="chat-desc">
          Aqui, você pode tirar suas dúvidas e conversar com um profissional.
          Você tem direito a até {limit} perguntas. Após isso, será direcionado
          para o telefone de uma clínica, onde poderá continuar o atendimento.
        </p>

        {!disabled && <h3 className="chat-subtitle">Pergunte à vontade!</h3>}

        {disabled && !loading && (
          <div className="chat-limit-alert" role="alert" aria-live="assertive">
            <p>
              Você chegou ao limite de {limit} perguntas. Para continuar
              recebendo suporte, clique abaixo para acessar os contatos das
              clínicas e profissionais especializados.
            </p>
            <div className="chat-limit-actions">
              <Link to="/contato" className="contacts-btn">
                Contatos
              </Link>
            </div>
          </div>
        )}

        {error && (
          <div
            className="chat-error-alert"
            role="alert"
            style={{
              padding: "12px",
              marginBottom: "16px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "8px",
              color: "#c33"
            }}
          >
            {error}
          </div>
        )}

        {messages.length > 0 && (
          <div
            className="chat-history"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              marginBottom: "16px",
              padding: "12px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              border: "1px solid #e0e0e0"
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  marginBottom: "12px",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor:
                    msg.sender === "user" ? "#e3f2fd" : "#f1f8e9",
                  textAlign: msg.sender === "user" ? "right" : "left"
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                    marginBottom: "4px",
                    color: "#555"
                  }}
                >
                  {msg.sender === "user" ? "Você" : "Especialista"}
                </div>
                <div style={{ fontSize: "0.95rem" }}>{msg.message}</div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#999",
                    marginTop: "4px"
                  }}
                >
                  {new Date(msg.created_at).toLocaleString("pt-BR")}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="chat-box" role="region" aria-label="Caixa de mensagem">
          <div className="chat-input-wrapper">
            <input
              type="text"
              className="chat-input"
              placeholder="Digite aqui"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !disabled) {
                  handleSend();
                }
              }}
              disabled={disabled}
              aria-disabled={disabled}
            />
            <button
              type="button"
              className="chat-send-btn"
              onClick={handleSend}
              disabled={disabled}
              aria-label="Enviar mensagem"
              title={disabled ? "Limite de perguntas atingido" : "Enviar"}
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? (
                <span>...</span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              )}
            </button>
          </div>
          <div className="chat-hint" aria-live="polite">
            {count < limit ? (
              <span>
                {count}/{limit} perguntas
              </span>
            ) : (
              <span>Limite de {limit} perguntas atingido.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
