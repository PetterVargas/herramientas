export interface IcebreakerQuestion {
  id: number;
  question: string;
  category: 'personal' | 'technical' | 'culture' | 'fun';
}

export const icebreakerQuestions: IcebreakerQuestion[] = [
  // Personal Journey (1-25)
  {
    id: 1,
    question: '¿Cuál fue tu primer encuentro con la ciberseguridad?',
    category: 'personal',
  },
  {
    id: 2,
    question: '¿Qué te motivó a entrar al mundo de la seguridad informática?',
    category: 'personal',
  },
  {
    id: 3,
    question:
      '¿Cuál fue tu primera contraseña memorable? (¡No la compartas si aún la usas!)',
    category: 'fun',
  },
  {
    id: 4,
    question:
      '¿Alguna vez has sido víctima de un ataque de phishing? ¿Qué aprendiste?',
    category: 'personal',
  },
  {
    id: 5,
    question:
      '¿Qué certificación de seguridad te gustaría obtener o ya tienes?',
    category: 'technical',
  },
  {
    id: 6,
    question:
      '¿Cuál es tu conferencia de seguridad favorita o a cuál te gustaría asistir?',
    category: 'culture',
  },
  {
    id: 7,
    question:
      '¿Prefieres seguridad ofensiva (red team) o defensiva (blue team)? ¿Por qué?',
    category: 'technical',
  },
  {
    id: 8,
    question: '¿Cuál ha sido tu mayor "momento de pánico" en seguridad?',
    category: 'personal',
  },
  {
    id: 9,
    question:
      '¿Qué sistema operativo usas diariamente para tus tareas de seguridad?',
    category: 'technical',
  },
  {
    id: 10,
    question: '¿Cuál es tu libro favorito sobre ciberseguridad o hacking?',
    category: 'culture',
  },
  {
    id: 11,
    question:
      '¿Tienes algún proyecto personal de seguridad? Cuéntanos sobre él',
    category: 'personal',
  },
  {
    id: 12,
    question: '¿Qué opinión tienes sobre el hacking ético vs el black hat?',
    category: 'culture',
  },
  {
    id: 13,
    question:
      '¿Cuál es tu anécdota más divertida relacionada con la seguridad?',
    category: 'fun',
  },
  {
    id: 14,
    question:
      '¿Alguna vez has participado en un CTF? ¿Cuál fue tu experiencia?',
    category: 'technical',
  },
  {
    id: 15,
    question: '¿Qué es lo que más te apasiona de la ciberseguridad?',
    category: 'personal',
  },
  {
    id: 16,
    question:
      '¿Cuál es tu podcast o canal de YouTube favorito sobre seguridad?',
    category: 'culture',
  },
  {
    id: 17,
    question:
      '¿Cómo explicarías tu trabajo a alguien que no sabe nada de tecnología?',
    category: 'personal',
  },
  {
    id: 18,
    question:
      '¿Cuál es la vulnerabilidad más interesante que has descubierto o estudiado?',
    category: 'technical',
  },
  {
    id: 19,
    question: '¿Qué hábito de seguridad personal consideras más importante?',
    category: 'personal',
  },
  {
    id: 20,
    question: '¿Usas un gestor de contraseñas? ¿Cuál recomiendas?',
    category: 'technical',
  },
  {
    id: 21,
    question: '¿Cuál es tu opinión sobre la autenticación biométrica?',
    category: 'technical',
  },
  {
    id: 22,
    question:
      '¿Qué consejo le darías a alguien que quiere empezar en ciberseguridad?',
    category: 'culture',
  },
  {
    id: 23,
    question: '¿Tienes algún mentor en el campo de la seguridad?',
    category: 'personal',
  },
  {
    id: 24,
    question: '¿Cuál es tu metodología favorita para realizar pentesting?',
    category: 'technical',
  },
  {
    id: 25,
    question:
      '¿Alguna vez has hackeado algo por diversión (éticamente)? Cuenta la historia',
    category: 'fun',
  },

  // Technical Tools & Skills (26-50)
  {
    id: 26,
    question: '¿Cuál es tu herramienta de pentesting favorita y por qué?',
    category: 'technical',
  },
  {
    id: 27,
    question: '¿Wireshark o tcpdump? Defiende tu elección',
    category: 'technical',
  },
  {
    id: 28,
    question:
      '¿Cuál es tu lenguaje de programación preferido para scripting de seguridad?',
    category: 'technical',
  },
  {
    id: 29,
    question: '¿Qué opinas de Metasploit? ¿Es aún relevante?',
    category: 'technical',
  },
  {
    id: 30,
    question: '¿Burp Suite o OWASP ZAP? ¿Por qué?',
    category: 'technical',
  },
  {
    id: 31,
    question: '¿Cuál es tu distribución Linux favorita para seguridad?',
    category: 'technical',
  },
  {
    id: 32,
    question: '¿Has usado alguna vez Shodan? ¿Qué encontraste interesante?',
    category: 'technical',
  },
  {
    id: 33,
    question: '¿Nmap o Masscan? ¿En qué casos usas cada uno?',
    category: 'technical',
  },
  {
    id: 34,
    question:
      '¿Cuál es tu framework de seguridad favorito (NIST, ISO 27001, etc.)?',
    category: 'technical',
  },
  {
    id: 35,
    question: '¿Qué herramienta SIEM prefieres y por qué?',
    category: 'technical',
  },
  {
    id: 36,
    question: '¿Cuál es tu técnica favorita de ingeniería social?',
    category: 'technical',
  },
  {
    id: 37,
    question: '¿Has trabajado con honeypots? Cuenta tu experiencia',
    category: 'technical',
  },
  {
    id: 38,
    question: '¿Qué opinas sobre la inteligencia artificial en ciberseguridad?',
    category: 'technical',
  },
  {
    id: 39,
    question: '¿Cuál es tu tipo de ataque favorito para estudiar?',
    category: 'technical',
  },
  {
    id: 40,
    question:
      '¿Tienes experiencia con análisis de malware? ¿Qué herramientas usas?',
    category: 'technical',
  },
  {
    id: 41,
    question:
      '¿Cuál es tu opinión sobre la seguridad en contenedores (Docker, Kubernetes)?',
    category: 'technical',
  },
  {
    id: 42,
    question:
      '¿Has realizado auditorías de código? ¿Qué herramientas recomiendas?',
    category: 'technical',
  },
  {
    id: 43,
    question: '¿Qué opinas sobre el bug bounty hunting?',
    category: 'technical',
  },
  {
    id: 44,
    question:
      '¿Cuál es tu recurso favorito para aprender sobre nuevas vulnerabilidades?',
    category: 'culture',
  },
  {
    id: 45,
    question:
      '¿Has trabajado con análisis forense digital? Comparte una experiencia',
    category: 'technical',
  },
  {
    id: 46,
    question: '¿Qué opinas sobre la seguridad en la nube?',
    category: 'technical',
  },
  {
    id: 47,
    question: '¿Cuál es tu CVE favorito y por qué?',
    category: 'technical',
  },
  {
    id: 48,
    question: '¿Has contribuido a algún proyecto open source de seguridad?',
    category: 'culture',
  },
  {
    id: 49,
    question: '¿Qué opinas sobre el Zero Trust Security Model?',
    category: 'technical',
  },
  {
    id: 50,
    question: '¿Cuál es tu técnica favorita para evadir sistemas de detección?',
    category: 'technical',
  },

  // Culture & Industry (51-75)
  {
    id: 51,
    question: '¿Qué película o serie sobre hackers te parece más realista?',
    category: 'fun',
  },
  {
    id: 52,
    question: '¿Mr. Robot o Silicon Valley? Defiende tu respuesta',
    category: 'fun',
  },
  {
    id: 53,
    question: '¿Cuál es tu hacker histórico favorito y por qué?',
    category: 'culture',
  },
  {
    id: 54,
    question:
      '¿Qué opinas sobre la divulgación responsable de vulnerabilidades?',
    category: 'culture',
  },
  {
    id: 55,
    question: '¿Cuál es el mayor mito sobre hackers que te gustaría desmentir?',
    category: 'culture',
  },
  {
    id: 56,
    question: '¿Qué opinas sobre las leyes de ciberseguridad en tu país?',
    category: 'culture',
  },
  {
    id: 57,
    question: '¿Cuál es tu comunidad online de seguridad favorita?',
    category: 'culture',
  },
  {
    id: 58,
    question: '¿Qué opinas sobre la ética en el hacking?',
    category: 'culture',
  },
  {
    id: 59,
    question:
      '¿Cuál es el incidente de seguridad más impactante que recuerdas?',
    category: 'culture',
  },
  {
    id: 60,
    question: '¿Qué opinas sobre la privacidad vs seguridad?',
    category: 'culture',
  },
  {
    id: 61,
    question:
      '¿Sigues a algún investigador de seguridad en redes sociales? ¿A quién?',
    category: 'culture',
  },
  {
    id: 62,
    question: '¿Qué opinas sobre el papel de la ciberseguridad en la política?',
    category: 'culture',
  },
  {
    id: 63,
    question: '¿Cuál es tu opinión sobre el ransomware y cómo combatirlo?',
    category: 'culture',
  },
  {
    id: 64,
    question: '¿Qué tan importante crees que es la certificación en seguridad?',
    category: 'culture',
  },
  {
    id: 65,
    question: '¿Cuál es tu opinión sobre la seguridad por obscuridad?',
    category: 'technical',
  },
  {
    id: 66,
    question: '¿Qué opinas sobre el hacktivismo?',
    category: 'culture',
  },
  {
    id: 67,
    question: '¿Cuál es tu postura sobre la encriptación backdoors?',
    category: 'culture',
  },
  {
    id: 68,
    question: '¿Qué tan importante es el trabajo en equipo en ciberseguridad?',
    category: 'culture',
  },
  {
    id: 69,
    question: '¿Cuál es tu opinión sobre la seguridad en IoT?',
    category: 'technical',
  },
  {
    id: 70,
    question: '¿Qué opinas sobre el futuro de la ciberseguridad?',
    category: 'culture',
  },
  {
    id: 71,
    question:
      '¿Cómo manejas el estrés en situaciones de incidentes de seguridad?',
    category: 'personal',
  },
  {
    id: 72,
    question: '¿Qué opinas sobre la automatización en ciberseguridad?',
    category: 'technical',
  },
  {
    id: 73,
    question: '¿Cuál es tu opinión sobre las recompensas por vulnerabilidades?',
    category: 'culture',
  },
  {
    id: 74,
    question:
      '¿Qué tan importante es el networking en la industria de seguridad?',
    category: 'culture',
  },
  {
    id: 75,
    question: '¿Cuál es tu predicción para las amenazas del próximo año?',
    category: 'culture',
  },

  // Fun & Daily Life (76-100)
  {
    id: 76,
    question:
      '¿Alguna vez has usado tu conocimiento de seguridad en la vida cotidiana?',
    category: 'fun',
  },
  {
    id: 77,
    question: '¿Cuál es tu Easter Egg favorito en herramientas de seguridad?',
    category: 'fun',
  },
  {
    id: 78,
    question: '¿Tienes algún ritual antes de empezar un pentest?',
    category: 'fun',
  },
  {
    id: 79,
    question: '¿Cuál es tu snack favorito durante largas sesiones de hacking?',
    category: 'fun',
  },
  {
    id: 80,
    question: '¿Prefieres trabajar de día o de noche en tareas de seguridad?',
    category: 'personal',
  },
  {
    id: 81,
    question: '¿Cuál es tu setup ideal para trabajar en ciberseguridad?',
    category: 'personal',
  },
  {
    id: 82,
    question:
      '¿Has tenido que explicar a tus familiares qué haces? ¿Cómo reaccionaron?',
    category: 'fun',
  },
  {
    id: 83,
    question: '¿Cuál es tu bebida favorita mientras codeas o investigas?',
    category: 'fun',
  },
  {
    id: 84,
    question:
      '¿Tienes algún sticker o gadget favorito relacionado con hacking?',
    category: 'fun',
  },
  {
    id: 85,
    question:
      '¿Cuál es la pregunta más rara que te han hecho sobre tu trabajo?',
    category: 'fun',
  },
  {
    id: 86,
    question:
      '¿Has encontrado alguna vulnerabilidad en un servicio que usas diariamente?',
    category: 'personal',
  },
  {
    id: 87,
    question: '¿Qué tan paranoico eres con tu propia seguridad digital?',
    category: 'personal',
  },
  {
    id: 88,
    question:
      '¿Alguna vez has tenido que hackear tu propia cuenta? Cuenta la historia',
    category: 'fun',
  },
  {
    id: 89,
    question: '¿Cuál es tu meme favorito sobre ciberseguridad?',
    category: 'fun',
  },
  {
    id: 90,
    question:
      '¿Tienes algún superstición o creencia sobre el mundo del hacking?',
    category: 'fun',
  },
  {
    id: 91,
    question:
      '¿Cuál es tu forma favorita de desconectar del trabajo de seguridad?',
    category: 'personal',
  },
  {
    id: 92,
    question: '¿Has participado en algún hackathon? ¿Qué construiste?',
    category: 'personal',
  },
  {
    id: 93,
    question: '¿Qué consejo de seguridad le das a tus amigos y familia?',
    category: 'personal',
  },
  {
    id: 94,
    question: '¿Cuál es tu tema o wallpaper favorito relacionado con hacking?',
    category: 'fun',
  },
  {
    id: 95,
    question:
      '¿Alguna vez has asustado a alguien con tus habilidades técnicas?',
    category: 'fun',
  },
  {
    id: 96,
    question:
      '¿Qué tan importante es el balance vida-trabajo en ciberseguridad?',
    category: 'personal',
  },
  {
    id: 97,
    question:
      '¿Tienes algún alias o handle que uses en comunidades de seguridad?',
    category: 'fun',
  },
  {
    id: 98,
    question: '¿Cuál es tu opinión sobre trabajar remoto en ciberseguridad?',
    category: 'personal',
  },
  {
    id: 99,
    question: '¿Qué superpoder relacionado con hacking te gustaría tener?',
    category: 'fun',
  },
  {
    id: 100,
    question: '¿Cuál es tu mejor consejo para alguien nuevo en el equipo?',
    category: 'culture',
  },
];
