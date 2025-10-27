export interface Article {
  id: string
  title: string
  category: string
  shortDescription: string
  content: string
  source: string
  sourceUrl: string
  reference: string
  thumbnail?: string
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Cuidados com a saúde ocular ao frequentar piscinas e praias',
    category: 'Higiene Ocular',
    shortDescription: 'Aprenda práticas simples e eficazes para proteger seus olhos ao frequentar piscinas e praias',
    thumbnail: '/IMAGENS/articles-default.jpg',
    source: 'Hospital de Olhos de Cascavel',
    sourceUrl: 'https://www.hospitaldeolhos.com.br/cuidados-com-a-saude-ocular-proteja-seus-olhos-ao-frequentar-piscinas-e-praias/',
    reference: 'HOSPITAL DE OLHOS DE CASCAVEL. Cuidados com a saúde ocular: proteja seus olhos ao frequentar piscinas e praias! Disponível em: https://www.hospitaldeolhos.com.br/cuidados-com-a-saude-ocular-proteja-seus-olhos-ao-frequentar-piscinas-e-praias/. Acesso em: 23 out. 2025.',
    content: `
Calor, férias e muita diversão! Os dias de lazer na praia e na piscina são momentos de descontração e alegria, mas também podem trazer riscos à saúde ocular. Para não atrapalhar a diversão, é importante ficar atento a alguns cuidados. Isso porque o contato com cloro, areia e água salgada pode causar irritações, alergias e até infecções como conjuntivite. Até mesmo o uso do protetor solar, tão necessário hoje em dia, exige atenção na hora da aplicação. Por conta disso tudo, é essencial adotar medidas preventivas para proteger os olhos e garantir uma experiência segura e feliz.

"Nesta época do ano, as principais irritações oculares são causadas por queda de protetor solar dentro dos olhos e conjuntivites virais", afirma a oftalmologista Dra. Ameline Nishizima. "Para usar o protetor solar, é bom respeitar uma distância dos olhos. Passe como se fosse um olho de guaxinim, um círculo de cerca de 2 dedos de distância dos olhos. E, se entrar produto nos olhos, lave bem os olhos com soro fisiológico ou água corrente. Se não melhorar a irritação, é importante procurar um especialista", acrescenta.

Confira outras dicas importantes para garantir a saúde ocular sem perder a diversão.

**Cloro:** O cloro, utilizado para desinfetar piscinas, pode ser agressivo para os olhos. Ele pode remover a camada de lubrificação natural dos olhos, deixando-os vulneráveis à saúde e ao ressecamento. Além disso, piscinas com níveis inadequados de cloro podem conter microrganismos que aumentam o risco de infecções.

Aqui, a dica é, se possível, usar óculos de proteção, e lavar bem os olhos com água limpa corrente ou soro fisiológico toda vez que sair da piscina.

**Areia:** Na praia, partículas de areia podem entrar em contato com os olhos, causando danos à superfície ocular (abrasões da córnea) e irritações. Além disso, a areia contaminada pode ser um veículo para bactérias e outros agentes infecciosos.

Nesse caso, a orientação é ficar o máximo de tempo possível com óculos de sol. Pois, além da areia, ele ainda protege do sol.

**Água salgada:** Embora a água salgada do mar tenha propriedades antimicrobianas naturais, ela pode afetar os olhos devido à alta concentração de sal. Quando combinado com substâncias poluentes ou microrganismos presentes na água, o risco de infecções aumenta. Tenha sempre em mãos uma garrafinha de água limpa para lavar os olhos toda vez que sair do mar.

## Como evitar infecções oculares

Para minimizar os riscos à saúde dos seus olhos e aproveitar os momentos de lazer com segurança, siga estas orientações:

**Use óculos de proteção:** Óculos de natação são uma barreira eficaz contra o cloro, a areia e a água salgada. Escolha modelos inovadores e com boa colocação para evitar que partículas ou líquidos entrem em contato direto com os olhos.

**Evite lentes de contato em piscinas ou no mar:** As lentes de contato podem conter bactérias e aumentar o risco de infecções graves, como ceratite, uma inflamação da córnea. Caso seja necessário o uso de lentes, opte por modelos diários adicionais e use óculos de proteção sobre eles.

**Evite coçar os olhos:** Se sentir desconforto, coçar os olhos pode agravar irritações e facilitar a entrada de microrganismos. Prefira lavá-los com água limpa ou usar colírios prescritos por um oftalmologista.

**Mantenha as mãos limpas:** Antes de tocar nos olhos ou aplicar colírios, certifique-se de que as mãos estejam limpas para evitar a transferência de germes.

## Sinais de alerta

O cuidado com os olhos é fundamental para desfrutar das atividades aquáticas de forma segura. Adotar medidas preventivas simples, como o uso de óculos de proteção e higiene adequada, pode evitar infecções e desconfortos, garantindo que os momentos de lazer não tragam preocupações para sua saúde ocular.

Contudo, mesmo com os cuidados, é importante estar atento a sinais de possíveis problemas oculares e buscar ajuda o quanto antes.

Se você notar uma vermelhidão persistente nos olhos, dor ou desconforto intenso, secreção e/ou lacrimejamento excessivo, ou ainda visão embaçada, procure um oftalmologista imediatamente para avaliação e tratamento adequado.
    `
  },
  {
    id: '2',
    title: '10 mitos sobre óculos e olhos',
    category: 'Mitos e Verdades',
    shortDescription: 'Descubra como escolher óculos de proteção, evitar irritações e identificar sinais de problemas',
    thumbnail: '/IMAGENS/articles-default.jpg',
    source: 'Luxreaders',
    sourceUrl: 'https://luxreaders.com/pt-pt/blogs/artigos/10-mitos-sobre-oculos-e-olhos',
    reference: 'LUXREADERS. 10 mitos sobre óculos e olhos. Disponível em: https://luxreaders.com/pt-pt/blogs/artigos/10-mitos-sobre-oculos-e-olhos. Acesso em: 23 out. 2025.',
    content: `
Ao longo dos anos, mitos sobre óculos e visão se espalharam como incêndio. Alguns mitos foram transmitidos por nossos pais, e geralmente acreditamos que eles sejam verdadeiros, mesmo que possam ser completamente fabricados. É hora de colocar essas histórias na cama e dissipar os equívocos. Reunimos uma lista dos mitos mais comuns sobre óculos, visão e olhos para que você possa esclarecer os fatos.

## Mito 1: "Usar a prescrição de óculos incorretos danificará seus olhos"

Talvez você já tenha ouvido falar sobre esse equívoco. Mesmo que você possa experimentar a visão embaçada e a fadiga ocular ao usar a prescrição errada, certamente não danificará sua visão de forma alguma. No entanto, para a melhor experiência, recomendamos o uso da prescrição certa para garantir uma visão e alívio ideais.

## Mito 2: "Todos os óculos de sol protegem seus olhos contra o sol"

Você pode pensar que qualquer óculos de sol do mercado o protege contra o sol, mas está longe da verdade. Certifique-se de que seus óculos de sol tenham proteção suficiente contra os raios UV. Se você não proteger seus olhos do sol, eles são expostos a radiação prejudicial que pode ter efeitos prejudiciais nos seus olhos. Procure o UV400 ou CE-label ao comprar óculos de sol.

## Mito 3: "Comer cenouras vai melhorar sua visão"

As cenouras contêm certas vitaminas e nutrientes que ajudarão você a manter uma visão saudável, mas o fato de que as cenouras se destacam entre os vegetais para ajudar a combater problemas de visão é um mito puro. Eles contêm vitamina A, o que é importante para os nossos olhos, mas existem outros vegetais que têm muito mais benefícios relacionados à visão do que as cenouras, como couve e brotos de Bruxelas.

## Mito 4: "Ler sob a luz fraca irá danificar seus olhos"

Talvez você ouça a história sobre o famoso compositor clássico, Bach, que leu suas partituras sob velas escuras e ficou cego? A verdade é que não tinha nada a ver com a falta de luz; Ele estava realmente sofrendo de catarata. Embora a leitura em luz dim não danifique sua visão, sempre recomendamos a leitura em um ambiente bem iluminado, porque oferece a melhor experiência e resistência.

## Mito 5: "Sentado muito perto da televisão vai prejudicar seus olhos"

Falando em hábitos prejudiciais, o próximo mito também deve ser criado. "Não se sente tão perto da televisão, seus olhos ficarão quadrados!". Obviamente, esse hábito não muda a forma dos seus olhos nem prejudica sua visão. No entanto, se seu filho ficar muito perto da televisão, considere visitar um médico, pois eles podem sofrer da miopia, onde você tem problemas para ver em longas distâncias.

## Mito 6: "Atravessando seus olhos os fará com que os cruzassem permanentemente"

Se você tem a capacidade de cruzar os olhos, não precisa se preocupar com o fato de eles ficarem permanentemente congelados. Você é mais do que bem-vindo para manter o bom entretenimento para seus amigos, já que os olhos cruzados permanentemente são causados pela genética, e não por ações.

## Mito 7: "Usar óculos deteriorará sua visão"

Você finalmente comprou seu primeiro par de óculos, mas sente como se sua visão piorasse toda vez que os tira? Seus óculos não têm nada a ver com isso. Eles simplesmente melhoram sua visão, mudando a maneira como os raios de luz caem em seu espectro, mas não mudam a estrutura do próprio olho. Seus sentimentos de visão deteriorada podem ser que você está acostumado a ver claramente com seus óculos que, quando você os tira, parece estrangeiro.

## Mito 8: "Pais com olhos castanhos não podem ter filhos com olhos azuis"

Seu filho tem olhos azuis, mesmo que você e seu parceiro tenham olhos castanhos? Não precisa se preocupar. A genética funciona de maneiras misteriosas e seu filho pode acabar com diferentes olhos coloridos do que você de um gene dominante dentro de sua composição genética.

## Mito 9: "Os óculos de luz azul não fazem nada pelos seus olhos"

Suas telas estão constantemente enviando luz azul danosa para seus olhos, o que pode levar a pálpebras e dores de cabeça entre outras coisas. Nós, portanto, recomendamos que você use óculos que filtram um pouco da luz azul quando você estiver olhando para telas por períodos mais longos.

## Mito 10: "Minha prescrição é permanente"

Algumas pessoas acreditam que uma vez que tenham medido sua prescrição, eles sabem que tipo de correção eles precisarão para o resto de suas vidas. Isso não é verdade. Se você já tem uma receita, sabe que os pontos fortes que você precisa podem mudar de tempos em tempos. Esta é a razão pela qual é recomendado ter um teste ocular de vez em quando.
    `
  },
  {
    id: '3',
    title: 'Glaucoma: descubra como o diagnóstico precoce pode prevenir a perda de visão',
    category: 'Doenças Comuns',
    shortDescription: 'Conheça os principais tipos de glaucoma, suas causas, sintomas e tratamentos para prevenir a doença',
    thumbnail: '/IMAGENS/articles-default.jpg',
    source: 'ClínicaBorges+',
    sourceUrl: 'https://www.clinsborges.pt/glaucoma-diagnostico-precoce/',
    reference: 'CLINSBORGES+. Glaucoma – descubra como o diagnóstico precoce pode prevenir a perda de visão. Disponível em: https://www.clinsborges.pt/glaucoma-diagnostico-precoce/. Acesso em: 23 out. 2025.',
    content: `
O **glaucoma** é uma doença ocular grave e irreversível, que quando não tratada corretamente, pode causar a cegueira total. De salientar, que está entre as doenças que mais causam cegueira em todo o mundo.

Esta doença está relacionada com a pressão interna do olho, e age de forma silenciosa no indivíduo, que infelizmente não consegue perceber os seus sinais nos vários estádios iniciais. Por isso, é importante lembrar que a forma mais eficiente de diagnosticar e tratar adequadamente o glaucoma é através de exames oftalmológicos de rotina.

De acordo com a Organização Mundial da Saúde (OMS), o glaucoma ocupa atualmente a 2º posição no ranking de doenças que mais causam cegueira em todo o mundo. Ao todo, são mais de 64 milhões de pessoas em todo o mundo que possuem esta doença. Desses, 150 a 200 mil são portugueses. Além disso, todas as faixas etárias podem ser afetadas.

De um modo geral, o glaucoma relaciona-se com o aumento da pressão intraocular. Isso, por sua vez, acaba alterando todo o fluxo sanguíneo no órgão, e também prejudicando o nervo óptico. Assim, com o passar do tempo, a doença vai avançando, até poder causar a cegueira total.

Neste sentido, o ponto mais negativo do glaucoma é que, em muitos casos, esta é uma doença silenciosa, que acaba não gerando sintomas claros para o indivíduo. Deste modo, muitas pessoas que a possuem, não conseguem perceber, até que os efeitos da perda da visão comecem a surgir.

Uma amostra disso, por exemplo, nos Estados Unidos, onde o glaucoma afeta mais de 3 milhões de pessoas, somente 50% sabe que é portador. Assim, a outra metade vive sem ter um diagnóstico, e pouco a pouco a doença vai progredindo.

Outra questão também indispensável a se considerar é que o glaucoma ainda não possui cura. No entanto, conta com tratamentos eficientes, que conseguem controlar melhor a doença, retardando a sua progressão. Mas, quanto mais precoce for o diagnóstico, maiores são as probabilidades de se conseguir controlar a doença com sucesso.

## Como o diagnóstico precoce pode prevenir a perda de visão?

Como mencionado, o glaucoma afeta a grande maioria das pessoas de uma forma assintomática. Por isso, o paciente não consegue perceber o avanço da doença até que ela realmente já esteja afetando alguns pontos da sua visão. Neste caso, ela já estará numa fase mais avançada, dificultando um controle eficiente.

Além do mais, o glaucoma consegue causar pontos de cegueira permanente nos olhos, prejudicando o campo de visão do indivíduo afetado. Assim, a solução mais eficiente para evitar este problema é através de exames de rotina com um médico oftalmologista.

O médico oftalmologista irá executar um exame completo do olho, e avaliar diversos pontos relacionados com a doença, tal como a medição da pressão ocular. Além do mais, ele também avaliará o nervo óptico, o ângulo de drenagem e ainda o campo visual.

Logo, trata-se de uma avaliação não invasiva, e que conseguirá gerar resultados eficientes que contribuem para o diagnóstico precoce da doença. Afinal, apenas através da observação desses pontos é que será possível diagnosticar o glaucoma antes que ele comece a causar defeitos graves na visão.

No entanto, outro ponto a destacar são as consultas regulares em relação a essas avaliações. Assim, o oftalmologista conseguirá observar também alterações no decorrer dos exames, identificar a doença logo nos seus primeiros sinais e avaliar a sua progressão.

Então, diagnosticada a doença, o médico poderá optar pelos tratamentos existentes, que vão desde o uso de medicamentos (não invasivos), como colírios e tratamento oral, até uma intervenção cirúrgica, mais invasiva. Neste sentido, a escolha dos tratamentos parte também da fase em que o glaucoma se encontra.

## Quais são os grupos de risco do glaucoma?

De um modo geral, o glaucoma pode acometer qualquer pessoa, em qualquer faixa etária, inclusive crianças. No entanto, há sim alguns grupos que acabam entrando no chamado grupo de risco desta doença, que possuem probabilidades maiores de a desenvolver. Assim, os fatores genéticos são um ponto importante a se considerar, bem como também a idade e alguns hábitos diários. Vejamos:

- Pessoas com mais de 50 anos de idade
- Diabéticos
- Afrodescendentes (raça negra)
- Fumadores
- Quem já possui casos dessa doença no seio familiar, ou de outra doença ocular, nomeadamente miopia ou retinopatia diabética
- Pessoas que fazem o uso de corticosteróides
- Após algum traumatismo ou lesão ocular

Assim sendo, estes são os grupos que possuem maior probabilidade de desenvolverem glaucoma. No entanto, isto não significa que os indivíduos que não pertencem a estes grupos estejam livres da doença. Por isso, o diagnóstico precoce, realizado através de exames oftalmológicos de rotina, continuam a ser uma arma importante para evitar maiores complicações e danos irreversíveis!
    `
  },
  {
    id: '4',
    title: 'Quais os alimentos que melhoram a Visão',
    category: 'Alimentação',
    shortDescription: 'Veja quais alimentos fornecem os nutrientes certos para ajudar a prevenir problemas de visão',
    thumbnail: '/IMAGENS/articles-default.jpg',
    source: 'Shamir',
    sourceUrl: 'https://shamir.com/pt/for-consumers/alimentos-que-melhoram-a-visao-tudo-o-que-deve-saber/',
    reference: 'SHAMIR. Quais os alimentos que melhoram a visão: tudo o que deve saber! Disponível em: https://shamir.com/pt/for-consumers/alimentos-que-melhoram-a-visao-tudo-o-que-deve-saber/. Acesso em: 23 out. 2025.',
    content: `
Há vários fatores que têm impacto na nossa saúde e a alimentação é um deles. No que toca à saúde ocular, por vezes pensa-se que esta é apenas afetada pela idade e por fatores genéticos. No entanto, há que ter em conta a alimentação, visto poder ter uma acentuada e direta influência na visão.

O zinco, as vitaminas A, C, e E e o ácido gordo ómega 3, entre outros, são nutrientes que constituem os alimentos que melhoram a visão. Saiba quais são estes alimentos e de que maneira os pode incluir na sua dieta.

## Coma melhor, veja melhor

Os alimentos que melhoram a visão, na sua maioria, são alimentos que contêm nutrientes como o zinco, as vitaminas A, C, e E, o ácido gordo ómega 3, a luteína e a zeaxantina. O que significa que qualquer alimento que tenha estes elementos na sua constituição terá propriedades capazes de ajudar a prevenir problemas de visão. Vamos conhecê-los um pouco melhor e saber como funcionam:

**Zinco:** Trata-se de um metal que desempenha um papel vital no transporte de vitamina A do fígado para a retina, de modo a produzir melanina, um pigmento protetor. As cataratas e a má visão noturna estão associadas à falta de zinco.

**Luteína e zeaxantina:** São antioxidantes que estão concentrados na mácula (ponto de cor amarela junto à retina do olho). Funcionam como protetores naturais do sol e são elementos importantes na prevenção da degenerescência da mácula e prevenção de cataratas.

**Ácido gordo ómega 3:** Trata-se de um nutriente que pode ajudar a evitar o síndrome do olho seco e, de acordo com alguns estudos, a reduzir o risco de retinopatia diabética (doença que afeta a região do olho responsável pela formação das imagens enviadas ao cérebro).

**Vitaminas A, C e E:** São essencialmente nutrientes protetores, capazes de prevenir por exemplo, a degenerescência da mácula.

## Afinal, quais são os alimentos que melhoram a visão?

### 1. Vegetais

Os vegetais são muito benéficos para a nossa saúde e devem fazer parte da nossa alimentação. Talvez para incentivar o seu consumo, é frequente ouvir a expressão: "as cenouras fazem bem aos olhos", certo? Neste caso, não se trata apenas de um mito. As cenouras são ricas em vitamina A, que auxilia a retina a absorver luz e betacaroteno.

Mas não só. Os citrinos, como a laranja, limão, ou a uva, são ricos em vitamina C! Ajudam a combater o envelhecimento ocular, bem como a maçã, papaia, brócolos, espinafres e batata-doce (rica em betacaroteno e vitamina E). São uma mais-valia na saúde ocular, uma vez que previnem a degenerescência da mácula.

### 2. Frutos Vermelhos

São conhecidos pelo seu poder antioxidante e por tornarem os olhos mais saudáveis. Frutos como morangos, mirtilos, amoras, cerejas ou framboesas fornecem uma grande quantidade de vitaminas do complexo B, potássio e vitamina C, ajudando a proteger as células do nosso corpo.

### 3. Frutos Secos

As nozes, amendoins, cajus e amêndoas não são apenas fontes de proteínas. São também alimentos ricos em nutrientes indicados para proteger a retina. Contém vitamina E, e em especial ómega 3, que previne o surgimento do síndrome do olho seco e contribui para o desenvolvimento contínuo da visão.

### 4. Peixe

Outro elemento que não é de estranhar que figure numa lista de alimentos que melhoram a visão. Todos os peixes ricos em ácido gordo ómega 3 e vitaminas A, B, D e E, como a sardinha, o atum, o salmão e a truta, previnem problemas de visão.

### 5. Ovos

São uma excelente fonte de luteína e zeaxantina. Ou seja, ajuda a reduzir o risco de perda de visão associada à idade, degenerescência da mácula e cataratas. Estes alimentos são igualmente ricos em vitaminas A, C, E e zinco, sendo que este último auxilia a ver melhor em ambientes mais escuros.

## Ingredientes inimigos dos seus olhos

Se os cuidados com a alimentação nunca estiveram tão em voga, a variedade de produtos que encontramos nos super e hipermercados nunca foi tão variada e as nossas escolhas nem sempre acompanham o que o nosso organismo exige.

Até aqui abordamos alimentos que melhoram a visão. No entanto, existem alimentos que fazem o contrário e que, a longo prazo se tornam inimigos sérios dos seus olhos:

**Margarina e óleos vegetais:** Apesar de parecerem naturais, são ingredientes que passam por uma grande quantidade de processos químicos até que estejam prontos para o consumo. O resultado são ingredientes ricos em gorduras polissaturadas, que aumentam as hipóteses de obstrução das veias.

**Açúcar:** O excesso de açúcar pode provocar, a curto, médio e longo prazo, diferentes tipos de doenças. O caso mais popular talvez seja a diabetes. A verdade, é que a excessiva quantidade de açúcares no nosso corpo faz com que este tenha dificuldade em produzir insulina suficiente, até que a sua absorção fique comprometida. Para os diabéticos, as hipóteses de desenvolver retinopatia é consideravelmente maior, provocando danos irreversíveis, incluindo a perda da visão.

Podemos concluir que a nossa alimentação é um fator determinante na qualidade da nossa visão. Como qualquer um dos cinco sentidos, assim que afetado, nem que seja de forma leve, é de imediato um problema para nós e para o nosso dia-a-dia. Por isso, seja prudente nas opções que toma para a sua alimentação e lembre-se: Somos aquilo que comemos.
    `
  },
  {
    id: '5',
    title: 'Higiene ocular: saiba por que é importante e como fazer',
    category: 'Higiene Ocular',
    shortDescription: 'Aprenda práticas diárias de higiene ocular para prevenir infecções e irritações',
    thumbnail: '/IMAGENS/articles-default.jpg',
    source: 'Dra. Carolina Kita',
    sourceUrl: 'https://www.dracarolinakita.com/post/higiene-ocular-saiba-por-que-é-importante-e-como-fazer',
    reference: 'KITA, Carolina. Higiene ocular: saiba por que é importante e como fazer. Disponível em: https://www.dracarolinakita.com/post/higiene-ocular-saiba-por-que-é-importante-e-como-fazer. Acesso em: 23 out. 2025.',
    content: `
A higiene ocular é um aspecto fundamental da saúde geral que não costuma receber a atenção devida.

Porém, manter os olhos limpos e livres de impurezas não só contribui para uma visão clara, mas também previne infecções, irritações e outras condições oftalmológicas.

Assim, desde práticas simples do dia a dia até recomendações específicas para usuários de lentes de contato, é importante estar ciente das melhores estratégias para cuidar da sua visão.

## O que é a higiene ocular?

A higiene ocular refere-se à prática de manter a área ao redor dos olhos limpa e livre de contaminações.

Nesse sentido, sua importância reside no fato desta região ser extremamente sensível e estar constantemente exposta a diversos agentes externos que podem prejudicá-la.

Os olhos podem ser afetados por poluição, bactérias, partículas presentes no ar, cosméticos e maquiagens.

Esses elementos podem aderir à superfície dos olhos ou à pele ao redor, levando a irritações, alergias, infecções e outros problemas oculares.

Portanto, adotar práticas de higiene ocular não apenas contribui para a saúde, mas também ajuda a prevenir problemas mais graves que podem necessitar de tratamento médico especializado.

## Qual a importância dessa prática?

A importância da higiene ocular abrange várias dimensões:

### Prevenção de Infecções

A higiene ocular adequada pode prevenir infecções, como conjuntivite, e outras causadas por bactérias, vírus ou fungos.

Isso é especialmente importante para usuários de lentes de contato, que estão mais expostos a riscos de infecções se as lentes não forem manuseadas, limpas e armazenadas corretamente.

### Redução de Irritações

Limpar regularmente a área ao redor dos olhos pode ajudar a reduzir irritações e inflamações, como a blefarite, causadas por alergias, exposição a produtos químicos ou pequenos objetos estranhos que possam entrar nos olhos.

### Manutenção da saúde visual

Práticas de higiene ocular também contribuem para a manutenção da saúde visual a longo prazo, prevenindo problemas que podem afetar a visão.

### Conforto

Manter uma boa higiene ocular pode aumentar o conforto geral dos olhos, especialmente em ambientes secos ou para pessoas que passam muitas horas em frente a telas de computador ou dispositivos digitais.

## Como realizar a higiene ocular no dia-a-dia?

Uma dúvida comum dos pacientes é como realizar a limpeza dos olhos. Afinal, o que pode e o que não pode fazer?

Aqui estão alguns passos fundamentais para realizar a higiene ocular diária:

### Lave as mãos frequentemente

Certifique-se de lavar as mãos com água e sabão antes de tocar nos olhos, inserir ou remover lentes de contato. Isso reduz o risco de transferir germes e sujeira para os olhos.

### Limpeza das pálpebras

Use uma compressa limpa e úmida para limpar suavemente as pálpebras e a base dos cílios.

Ademais, para pessoas com condições específicas, como blefarite, podemos recomendar produtos de limpeza especializados.

### Cuidados com as lentes de contato

Siga rigorosamente as instruções de cuidados com as lentes de contato, incluindo limpeza, desinfecção e substituição das lentes conforme recomendado pelo fabricante e pelo seu oftalmologista.

Além disso, nunca durma com lentes de contato, a menos que sejam específicas para uso noturno.

### Higiene dos Óculos

Mantenha os óculos limpos, lavando-os regularmente com água e sabão neutro. Isso ajuda a evitar que a sujeira nos óculos entre em contato com os olhos.

### Uso de produtos de maquiagem

Evite compartilhar maquiagem dos olhos, como rímel ou lápis de olho, para reduzir o risco de infecção.

Lembre-se também de remover a maquiagem dos olhos antes de dormir para evitar irritações.

O uso de produtos especializados para a região dos olhos é fundamental, pois eles possuem as substâncias adequadas, que não causam irritações nesta delicada região do nosso corpo.

### Proteção ocular

Use óculos de sol para proteger os olhos dos raios UV e óculos de proteção em ambientes com poeira, produtos químicos ou partículas no ar.

Não podemos esquecer de destacar a importância de manter uma dieta equilibrada e rica em vitaminas e minerais, especialmente aqueles importantes para a saúde ocular, como a vitamina A, C, e E, e o ômega-3.

Beber água suficiente também ajuda a manter os olhos hidratados e saudáveis.

Além disso, se você passa muito tempo em frente a telas, procure descansar a vista regularmente, pelo menos, a cada 20 minutos para reduzir a fadiga ocular.

## Conte com a oftalmologista!

Além dessas práticas, reforçamos a importância de consultas regulares à oftalmologista como parte integral da saúde dos olhos.

A especialista pode oferecer orientações personalizadas baseadas em seu histórico de saúde ocular, estilo de vida e necessidades específicas, ajudando a preservar sua visão no longo prazo.

Então, incorporar as visitas ao oftalmologista na sua rotina de cuidados de saúde é tão vital quanto manter a higiene ocular diária.

Em caso de dúvida ou ao menor sinal de problema visual, agende uma consulta com a especialista!
    `
  },
  {
    id: '6',
    title: 'Os óculos de sol são (mesmo) importantes',
    category: 'Mitos e Verdades',
    shortDescription: 'Entenda por que os óculos de sol são essenciais para proteger contra radiação UV',
    thumbnail: '/IMAGENS/articles-default.jpg',
    source: 'Lusíadas Saúde',
    sourceUrl: 'https://www.lusiadas.pt/blog/prevencao-estilo-vida/saude-familia/oculos-sol-sao-mesmo-importantes',
    reference: 'LUSÍADAS Saúde. Os óculos de sol são (mesmo) importantes. Disponível em: https://www.lusiadas.pt/blog/prevencao-estilo-vida/saude-familia/oculos-sol-sao-mesmo-importantes. Acesso em: 23 out. 2025.',
    content: `
Álvaro Sá, oftalmologista no Hospital Lusíadas Porto, explica por que não deve sair de casa sem os seus óculos de sol.

Todos sabemos que os óculos de sol protegem contra a radiação luminosa, mas o que fazem exatamente? "Num dia com luz solar muito intensa, os níveis elevados de luz tendem a saturar a retina e, por isso a diminuir os níveis de sensibilidade ao contraste. A função dos óculos de sol é, assim, devolver à retina o nível máximo de sensibilidade ao contraste, eliminando o excesso de 'ruído'", explica Álvaro Sá, oftalmologista no Hospital Lusíadas Porto.

O especialista lembra ainda que "a maioria dos óculos de sol absorve 70 a 80% da luz incidente, mas reduzem o excesso de brilho (glare) da luz refletida pelas superfícies metálicas, lagos e rios, vidros das janelas, piso das estradas, etc. Quase todos absorvem a maioria dos raios UV, o que também é verdade para os óculos com lentes "normais" (lentes claras)".

## Os perigos do sol

"As queimaduras solares são causadas pela exposição prolongada a altas doses de radiação ultravioleta. Pode haver lesão estrutural e funcional do exterior e interior do olho pelos efeitos térmicos e/ou fotoquímicos da absorção da luz", alerta o médico. Desta forma, mesmo em dias mais nublados, não deve desleixar a sua proteção, já que os raios UV estão presentes durante todo o ano, independentemente da intensidade do sol. Mas como se manifestam as lesões oculares pela luz?

## Exemplos clínicos de lesões oculares pela luz

### Nas pálpebras

É preciso ter especial atenção na época balnear, pois, tal como explica o oftalmologista do Hospital Lusíadas Porto, a pele das pálpebras pode sofrer queimadura solar essencialmente pelos raios UV-B. "As nuvens não filtram a radiação UV, portanto não previnem as queimaduras solares. Os raios UV são refletidos pela areia, água, etc. O guarda-sol não fornece proteção total contra estes raios", refere Álvaro Sá. E acrescenta: "O espetro das lesões da pele causadas pelos raios UV pode variar entre as lesões relativamente benignas (queratose epidérmica, pele seca, hiperplasia sebácea, manchas pela idade, rugas, etc.) até lesões malignas (carcinoma de células basais, carcinoma de células escamosas, melanoma maligno, etc.)."

### Na córnea

Situações a evitar e sintomas aos quais se deve estar atento:

- Solários, lâmpadas germicidas, trabalhar com equipamentos de solda – podem provocar queratite superficial provocada
- A "cegueira" da neve (a neve reflete cerca de 85% da radiação UV incidente) é o resultado da exposição prolongada aos raios UV – causam uma queratite superficial punctata que tipicamente aparece 8 a 12 horas após a exposição
- Exposição crónica à radiação ultravioleta – pode produzir uma degeneração esferoidal da córnea (por exemplo, surge em cerca de 14% dos esquimós) e estar associada à presença de pterígeo (membrana que cobre os olhos)
- Exposição solar prolongada na praia (sem óculos de sol): chega a dificultar a adaptação ao escuro durante dois dias

### No cristalino

Associado ao aparecimento de catarata e ao início mais precoce da presbiopia que, em média, surge cinco anos antes na população dos países com mais sol (trópicos), talvez pela maior exposição à radiação infravermelha.

### Na retina

Parece haver associação com o aparecimento da Degenerescência Macular relacionada com a Idade (DMI) pela toxicidade da luz azul e dos raios UV na mácula.

## Grupos mais vulneráveis à lesão ocular pelos raios ultravioleta

### Idosos

A partir dos três anos, as crianças já devem estar protegidas, mas os mais velhos não podem descurar a sua saúde ocular. "Com a idade há diminuição da concentração de moléculas que protegem dos raios UV. Catarata e DMI podem estar relacionadas com a combinação da exposição cumulativa de luz e coincidente diminuição da bioquímica protetora", diz Álvaro Sá.

### Pessoas com olhos azuis

Pessoas com menos pigmentação, vulgo "olhos azuis", são mais sensíveis à luz? O tema ainda é polémico, mas os indivíduos com íris mais escura apresentam maior quantidade de melanina nos tecidos, incluindo na coroide, protegendo melhor a retina da exposição à luz solar. O especialista confirma: "Estudos mostram que pacientes cujas íris são azuis (menos pigmentadas) têm mais incidência de DMI em comparação com pacientes com íris castanhas".

### Pessoas com afaquia (ausência de cristalino)

O cristalino é o filtro natural do olho que o protege da radiação ultravioleta e luz azul, protegendo a retina da DMI. "Por esta razão, a maior parte das lentes intraoculares implantadas durante a cirurgia de catarata (em que se retira o cristalino) têm filtro ultravioleta e para a luz azul", explica Álvaro Sá.

### Uso de fármacos fotossensibilizantes

"Existem fármacos, como tetraciclinas ou psoralenos, que deixam os tecidos mais vulneráveis à lesão luminosa, depositando-se no cristalino e na retina", afirma o especialista, acrescentando que nesses casos, a exposição solar deve ser evitada.
    `
  },
  {
    id: '7',
    title: 'O que é a conjuntivite?',
    category: 'Doenças Comuns',
    shortDescription: 'Saiba o que é conjuntivite, quais são suas causas e como prevenir e tratar',
    thumbnail: '/IMAGENS/articles-default.jpg',
    source: 'CUF',
    sourceUrl: 'https://www.cuf.pt/saude-a-z/conjuntivite',
    reference: 'CUF. Conjuntivite: o que é, sintomas e tratamento. Disponível em: https://www.cuf.pt/saude-a-z/conjuntivite. Acesso em: 23 out. 2025.',
    content: `
Existe nos olhos uma membrana muito fina e transparente, que reveste a superfície da córnea e a parte interior das pálpebras, protegendo-os de substâncias estranhas. Por vezes esta membrana - de nome conjuntiva - fica inflamada devido a uma reação alérgica ou à ação de um vírus ou de uma bactéria. Quando isto acontece, os vasos sanguíneos dos olhos alargam-se, tornam-se vermelhos, e surgem sintomas como comichão, lacrimejo e secreção.

A conjuntivite pode afetar os dois olhos em simultâneo e, embora não seja particularmente grave nem costume deixar sequelas, pode tornar-se bastante incómoda e dificultar as atividades habituais.

## Sintomas de conjuntivite

A diversos tipos de conjuntivite podem corresponder diversas manifestações. Algumas ocorrem apenas de forma sazonal e outras fazem-se sentir durante todo o ano. Existem, contudo, sintomas que são comuns à generalidade dos casos:

- Olhos vermelhos e lacrimejantes
- Pálpebras inchadas
- Comichão ou ardência
- Intolerância à luz
- Sensação de areias nos olhos
- Secreções

## Causas de conjuntivite

Existem três grandes formas de conjuntivite, distinguidas consoante a origem:

**Conjuntivite alérgica:** é a mais comum das três, estimando-se que afete atualmente um terço da população portuguesa. Ocorre após a exposição a alergénios como pólenes (sendo, por isso, particularmente comum na primavera), pelos de animais ou ácaros. Costuma afetar os dois olhos, mas não é contagiosa.

**Conjuntivite infeciosa:** é transmitida por vírus, fungos ou bactérias que entram em contacto com os olhos e pode ser contagiosa, transmitindo-se através do contacto direto com pessoas afetadas, da partilha de toalhas de rosto e outros objetos de higiene ocular ou até mesmo da água da piscina.

**Conjuntivite tóxica:** é causada pela exposição a fumo de cigarros, tintas para o cabelo, produtos de limpeza e outros agentes potencialmente tóxicos, assim como pela toma de certos medicamentos.

**Conjuntivite bacteriana:** costuma provocar secreções mais espessas, amareladas e abundantes do que a conjuntivite viral (mais esbranquiçadas) ou do que a alérgica (mais claras).

## Quando devo suspeitar de conjuntivite alérgica?

A conjuntivite alérgica constitui uma patologia ocular frequente e com potencial impacto na qualidade de vida do doente. Geralmente associada a queixas de rinite alérgica, pode também surgir de forma isolada.

São sintomas típicos da doença a comichão nos olhos, os olhos vermelhos, o lacrimejo, o inchaço e a dor ou desconforto locais (sensação de corpo estranho). Estes sinais podem variar desde ligeiros e sazonais até muito intensos e que persistem ao longo de todo o ano.

Se os olhos costumam ficar vermelhos, doridos, com comichão ou lacrimejantes e se o contacto com o pó, os animais de estimação (gato, cão), os pólenes ou outros alergénios provocam comichão e lacrimejo quer dizer que estamos perante uma conjuntivite alérgica.

## Diagnóstico de conjuntivite

O diagnóstico baseia-se na observação clínica e nos sintomas, podendo ser necessário exame com lâmpada de fenda no consultório de Oftalmologia. Em caso de suspeita de conjuntivite bacteriana pode fazer-se colheita da secreção ocular com um cotonete e enviar para análise no laboratório.

## Tratamento de conjuntivite

O tratamento depende largamente da sua causa, no entanto podem ser receitados colírios lubrificantes (como lágrimas artificiais), pomadas com antibiótico e anti-histamínicos para aliviar os sintomas. No geral, deve-se:

- Lavar regularmente as pálpebras para as manter livre de secreções
- Lavar as mãos antes e depois de aplicar colírios ou pomadas
- Aplicar compressas frias para diminuir o inchaço
- Não usar lentes de contacto
- Trocar as fronhas dos travesseiros e as toalhas de rosto diariamente
- Evitar a exposição direta à luz ou ao sol
- Diminuir a exposição a alergénios ou outros agentes potencialmente irritantes (como o fumo do tabaco)
- Evitar nadar em lagos ou piscinas

## Prevenção de conjuntivite

Embora não seja fácil prevenir a conjuntivite, algumas práticas básicas de higiene podem diminuir o risco de a contrair:

- Lavar as mãos e o rosto com frequência
- Evitar esfregar ou coçar os olhos
- Não partilhar toalhas de rosto
- Não partilhar cosméticos para os olhos nem utilizar os de outras pessoas
    `
  },
  {
    id: '8',
    title: 'Como a alimentação influencia na visão',
    category: 'Alimentação',
    shortDescription: 'Confira quais alimentos favorecem a saúde ocular e quais devem ser evitados',
    thumbnail: '/IMAGENS/articles-default.jpg',
    source: 'Donato Hospital de Olhos',
    sourceUrl: 'https://donatoholhos.com.br/como-a-alimentacao-influencia-na-visao/',
    reference: 'DONATO Hospital de Olhos. Como a alimentação influencia na visão. Disponível em: https://donatoholhos.com.br/como-a-alimentacao-influencia-na-visao/. Acesso em: 23 out. 2025.',
    content: `
Comer bem e de forma saudável é fundamental para manter a saúde em dia e isso vale também para a visão. A alimentação pode influenciar diretamente na saúde dos olhos, prevenindo doenças e até mesmo evitando o envelhecimento precoce da visão.

Neste artigo, vamos explorar a relação entre a alimentação e a saúde visual, destacando os principais nutrientes que contribuem para o bom funcionamento dos olhos.

## Relação entre a alimentação e a saúde da visão

A alimentação está diretamente relacionada com a saúde ocular, sendo alguns nutrientes essenciais para a manutenção da visão saudável.

Na dieta, é importante incluir alimentos ricos em vitaminas A, C e E, além de ômega 3 e zinco, que ajudam na prevenção de doenças oculares e no fortalecimento dos olhos. Já alimentos processados, industrializados e com alto teor de açúcar, devem ser evitados.

## Saúde da visão: conheça seus inimigos

Se você quer manter a boa saúde dos olhos, é importante deixar alguns alimentos de lado na sua alimentação diária. O açúcar, por exemplo, está longe de ser uma alternativa saudável para quem quer cuidar bem dos olhos e da saúde, principalmente se você sofre com a retinopatia diabética.

Portanto, para manter a saúde dos olhos, mantenha distância de alimentos ricos em açúcares, gorduras saturadas e processados. Alimentos industrializados e fast food, por exemplo, devem ser evitados na medida do possível.

## Saúde da visão: conheça seus amigos

Se você quer manter a boa saúde da sua visão, é importante acrescentar à sua alimentação diária alguns alimentos específicos. Aposte em:

**Frutas vermelhas e cítricas:** são antioxidantes naturais que ajudam a diminuir os riscos de degeneração macular e catarata.

**Brócolis, abóbora, espinafre, leite, ovos e fígado:** estes alimentos são ricos em vitamina A e ajudam a diminuir os riscos de cegueira.

**Caju, tomate e morango:** ricos em vitamina C, são alimentos conhecidos por prevenir o glaucoma.

**Ômega 3:** é ótimo para aliviar os sintomas da Síndrome do Olho Seco.

**Maracujá, couve manteiga, melancia, pêssego, acerola e manga:** ricos em vitaminas C e E e zinco, ajudam a diminuir a progressão da degeneração macular.

**Romã, maçã, uva, framboesa, nozes, cebola, linhaça e mel:** protegem a visão da catarata e da degeneração macular.

**Sardinha, atum, cogumelos, ovo e fígado:** fontes de vitamina D, também são ótimos para prevenir a degeneração macular.

**Castanha de caju, amendoim, ostras, camarão e leite integral:** são alimentos ricos em zinco que ajudam a reduzir os riscos de desenvolvimento da degeneração macular.

## Ajude quem você ama: compartilhe este texto com seus amigos e familiares

Ter uma alimentação mais saudável vai ajudar você a manter a boa saúde da visão. E, para isso, a informação é sua aliada. Portanto, compartilhe este texto com seus amigos e familiares para que eles também saibam quais alimentos levar à mesa e quais deixar de lado para evitar possíveis problemas oculares no futuro.
    `
  }
]
