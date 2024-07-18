export const questions = [
  {
    categoria: "COMUNICAÇÃO",
    itens: [
      {
        id: 0,
        nome: "Progresso da criança em relação às habilidades de comunicação",
        opcoes: [
          { valor: 4, descricao: "Fez um progresso significativo" },
          { valor: 3, descricao: "Fez algum progresso" },
          { valor: 2, descricao: "Fez pouco ou nenhum progresso" },
          { valor: 1, descricao: "Não foi possível avaliar o progresso hoje" },
        ],
      },
      {
        id: 1,
        nome: "Resposta da criança às estratégias de comunicação ensinadas",
        opcoes: [
          {
            valor: 4,
            descricao: "Respondeu de forma positiva e demonstrou compreensão",
          },
          {
            valor: 3,
            descricao:
              "Respondeu de forma parcial e demonstrou alguma compreensão",
          },
          {
            valor: 2,
            descricao:
              "Teve dificuldade em responder às estratégias de comunicação",
          },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
      {
        id: 2,
        nome: "Expressão de necessidades e desejos pela criança",
        opcoes: [
          { valor: 4, descricao: "Sim, de forma clara e consistente" },
          { valor: 3, descricao: "Sim, com alguma ajuda ou apoio" },
          {
            valor: 2,
            descricao:
              "Não, teve dificuldade em expressar suas necessidades e desejos",
          },
          {
            valor: 1,
            descricao:
              "Não foi possível avaliar a expressão de necessidades e desejos hoje",
          },
        ],
      },
    ],
  },
  {
    categoria: "ALIMENTAÇÃO",
    itens: [
      {
        id: 0,
        nome: "Reação do atendido aos alimentos-alvo",
        opcoes: [
          { valor: 4, descricao: "Aceita bem e está disposto a experimentar" },
          {
            valor: 3,
            descricao:
              "Mostra alguma relutância, mas eventualmente experimenta",
          },
          {
            valor: 2,
            descricao: "Recusa ou mostra grande resistência a novos alimentos",
          },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
      {
        id: 1,
        nome: "Comportamentos apropriados do atendido durante a intervenção",
        opcoes: [
          { valor: 4, descricao: "Sim, sem dificuldades" },
          { valor: 3, descricao: "Sim, mas com algumas dificuldades" },
          { valor: 2, descricao: "Não, tem grande dificuldade" },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
      {
        id: 2,
        nome: "Independência do atendido na alimentação",
        opcoes: [
          { valor: 4, descricao: "Sim, sem ajuda" },
          { valor: 3, descricao: "Sim, mas com alguma ajuda" },
          { valor: 2, descricao: "Não, precisa de assistência significativa" },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
    ],
  },
  {
    categoria: "HABILIDADES SOCIAIS",
    itens: [
      {
        id: 0,
        nome: "Interação do paciente com os colegas durante a sessão",
        opcoes: [
          { valor: 4, descricao: "Interage ativamente e de forma apropriada" },
          { valor: 3, descricao: "Interage, mas com dificuldades" },
          { valor: 2, descricao: "Não interage ou evita contato" },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
      {
        id: 1,
        nome: "Demonstração de empatia ou resposta aos sentimentos dos outros",
        opcoes: [
          { valor: 4, descricao: "Frequentemente" },
          { valor: 3, descricao: "Ocasionalmente" },
          { valor: 2, descricao: "Raramente ou nunca" },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
      {
        id: 2,
        nome: "Participação do paciente em atividades em grupo",
        opcoes: [
          {
            valor: 4,
            descricao: "Participa ativamente e de forma colaborativa",
          },
          { valor: 3, descricao: "Participa, mas com dificuldades" },
          { valor: 2, descricao: "Evita participar ou se isola" },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
    ],
  },
  {
    categoria: "COMPORTAMENTO",
    itens: [
      {
        id: 0,
        nome: "Frequência de comportamentos desafiadores durante a sessão",
        opcoes: [
          { valor: 4, descricao: "Frequentemente" },
          { valor: 3, descricao: "Ocasionalmente" },
          { valor: 2, descricao: "Raramente ou nunca" },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
      {
        id: 1,
        nome: "Adaptação do paciente a mudanças na rotina durante a sessão",
        opcoes: [
          { valor: 4, descricao: "Lida bem e se adapta rapidamente" },
          { valor: 3, descricao: "Mostra alguma resistência, mas se ajusta" },
          {
            valor: 2,
            descricao: "Tem grande dificuldade e resiste fortemente",
          },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
      {
        id: 2,
        nome: "Manutenção da atenção do paciente durante as atividades",
        opcoes: [
          { valor: 4, descricao: "Mantém a atenção durante toda a atividade" },
          {
            valor: 3,
            descricao:
              "Mantém a atenção por períodos curtos, mas se distrai ocasionalmente",
          },
          {
            valor: 2,
            descricao:
              "Tem dificuldade em manter a atenção e se distrai frequentemente",
          },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
    ],
  },
  {
    categoria: "AUTONOMIA E AUTOREGULAÇÃO",
    itens: [
      {
        id: 0,
        nome: "Execução de Atividades de Vida Diária (AVDs) pelo paciente",
        opcoes: [
          {
            valor: 4,
            descricao: "Executa todas as AVDs de forma independente",
          },
          {
            valor: 3,
            descricao: "Executa a maioria das AVDs com mínima orientação",
          },
          {
            valor: 2,
            descricao:
              "Precisa de assistência significativa para executar AVDs",
          },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
      {
        id: 1,
        nome: "Progresso do paciente na qualidade do movimento nas AVDs",
        opcoes: [
          {
            valor: 4,
            descricao:
              "Houve progresso significativo, com movimentos mais coordenados e eficientes",
          },
          {
            valor: 3,
            descricao:
              "Houve algum progresso, com pequenas melhorias na coordenação e eficiência",
          },
          {
            valor: 2,
            descricao:
              "Houve pouco ou nenhum progresso, com movimentos ainda descoordenados e ineficientes",
          },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
      {
        id: 2,
        nome: "Reação do paciente à introdução de novos estímulos sensoriais",
        opcoes: [
          {
            valor: 4,
            descricao: "Reage bem e aceita novos estímulos sem problemas",
          },
          {
            valor: 3,
            descricao:
              "Mostra alguma hesitação, mas eventualmente aceita os novos estímulos",
          },
          {
            valor: 2,
            descricao:
              "Reage mal e tem dificuldade significativa em aceitar novos estímulos",
          },
          { valor: 1, descricao: "Não foi possível avaliar a resposta hoje" },
        ],
      },
    ],
  },
  {
    categoria: "HABILIDADES MOTORAS E PRÁXICAS",
    itens: [
      {
        id: 0,
        nome: "Coordenação motora fina do paciente",
        opcoes: [
          {
            valor: 3,
            descricao:
              "Demonstra boa coordenação motora fina e realiza as atividades com precisão",
          },
          {
            valor: 2,
            descricao:
              "Demonstra alguma dificuldade, mas consegue realizar as atividades com orientação",
          },
          {
            valor: 1,
            descricao:
              "Tem grande dificuldade em realizar atividades que exigem coordenação motora fina",
          },
        ],
      },
      {
        id: 1,
        nome: "Execução de movimentos motores grossos pelo paciente",
        opcoes: [
          {
            valor: 3,
            descricao:
              "Executa movimentos motores grossos com facilidade e precisão",
          },
          {
            valor: 2,
            descricao:
              "Executa movimentos motores grossos com alguma dificuldade, mas consegue completar as atividades",
          },
          {
            valor: 1,
            descricao:
              "Tem grande dificuldade em executar movimentos motores grossos e precisa de assistência constante",
          },
        ],
      },
      {
        id: 2,
        nome: "Capacidade do paciente de planejar e executar tarefas motoras sequenciais (práxis)",
        opcoes: [
          {
            valor: 3,
            descricao:
              "Planeja e executa tarefas motoras sequenciais de forma independente e eficaz",
          },
          {
            valor: 2,
            descricao:
              "Mostra alguma dificuldade em planejar e executar tarefas, mas consegue com orientação",
          },
          {
            valor: 1,
            descricao:
              "Tem grande dificuldade em planejar e executar tarefas motoras sequenciais e depende muito do apoio dos outros",
          },
        ],
      },
    ],
  },
  {
    categoria: "HABILIDADES ACADÊMICAS",
    itens: [
      {
        id: 0,
        nome: "Progresso da criança em relação aos objetivos acadêmicos",
        opcoes: [
          {
            valor: 4,
            descricao:
              "Está alcançando consistentemente ou até superando os objetivos estabelecidos para sua faixa etária",
          },
          {
            valor: 3,
            descricao:
              "Está progredindo de acordo com os objetivos estabelecidos, mostrando desenvolvimento positivo em várias áreas acadêmicas",
          },
          {
            valor: 2,
            descricao:
              "Está progredindo de forma variável, com alguns objetivos sendo alcançados enquanto outros exigem suporte adicional",
          },
          { valor: 1, descricao: "Não foi possível avaliar o progresso" },
        ],
      },
      {
        id: 1,
        nome: "Engajamento da criança nas atividades acadêmicas",
        opcoes: [
          {
            valor: 4,
            descricao:
              "Participa ativamente em todas as atividades, demonstrando entusiasmo e interesse",
          },
          {
            valor: 3,
            descricao:
              "Mostra interesse variável em diferentes tipos de atividades, participando de algumas mais do que de outras",
          },
          {
            valor: 2,
            descricao:
              "Demonstrou um aumento no engajamento ao longo do tempo, especialmente em áreas de interesse específico",
          },
          {
            valor: 1,
            descricao: "Não é possível avaliar o engajamento da criança",
          },
        ],
      },
      {
        id: 2,
        nome: "Capacidade da criança em lidar com regras e expectativas do grupo",
        opcoes: [
          {
            valor: 4,
            descricao:
              "Segue as regras de forma independente na maioria das situações, demonstrando compreensão das expectativas escolares",
          },
          {
            valor: 3,
            descricao:
              "Mostra alguma dependência de lembretes ou supervisão para seguir consistentemente as regras estabelecidas",
          },
          {
            valor: 2,
            descricao:
              "Apresenta dificuldade significativa em seguir as regras da sala de aula, necessitando de suporte intensivo para cumprir as expectativas",
          },
          { valor: 1, descricao: "Não é possível avaliar" },
        ],
      },
    ],
  },
];
