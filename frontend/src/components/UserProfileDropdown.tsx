import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './UserProfileDropdown.css'

export default function UserProfileDropdown() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setIsOpen(false)
    await logout()
  }

  // Pegar iniciais do nome para o avatar
  const getInitials = () => {
    const name = user?.username || user?.email || 'U'
    return name.substring(0, 2).toUpperCase()
  }

  const displayName = user?.username || user?.email || 'Usuário'

  return (
    <div className="user-profile-dropdown" ref={dropdownRef}>
      <button 
        className="profile-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="profile-avatar">
          {getInitials()}
        </div>
        <span className="profile-name">{displayName}</span>
        <svg 
          className={`profile-arrow ${isOpen ? 'open' : ''}`}
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {isOpen && (
        <div className="profile-menu">
          <button className="profile-menu-item logout-btn" onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Sair</span>
          </button>
        </div>
      )}
    </div>
  )
}
