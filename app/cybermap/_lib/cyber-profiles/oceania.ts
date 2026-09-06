import type { CountryCyberProfile } from '../types';

export const oceaniaCyberProfiles: Record<string, CountryCyberProfile> = {
  "AU": {
    "interestGroups": [
      {
        "name": "AISA – Australian Information Security Association",
        "description": "Asociación profesional y organismo líder de la industria de seguridad de la información en Australia, con más de 11.500 miembros.",
        "url": "https://www.aisa.org.au"
      }
    ],
    "authorities": [
      {
        "name": "ACSC – Australian Cyber Security Centre",
        "description": "Centro australiano de ciberseguridad, parte de la Australian Signals Directorate (ASD), coordina la respuesta a incidentes nacionales.",
        "url": "https://www.cyber.gov.au"
      },
      {
        "name": "OAIC – Office of the Australian Information Commissioner",
        "description": "Regulador nacional independiente de privacidad y libertad de información de Australia.",
        "url": "https://www.oaic.gov.au"
      },
      {
        "name": "ASD – Australian Signals Directorate",
        "description": "Agencia de inteligencia de señales australiana que opera el ACSC y lidera la ciberseguridad nacional."
      },
      {
        "name": "Australian Federal Police – Cybercrime",
        "description": "Unidad de la Policía Federal Australiana especializada en la investigación de delitos cibernéticos graves."
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "Security of Critical Infrastructure Act 2018 (SOCI Act)",
        "description": "Ley australiana que impone obligaciones de seguridad y reporte a operadores de infraestructura crítica."
      },
      {
        "name": "Cyber Security Act 2024",
        "description": "Primera ley australiana dedicada a ciberseguridad, incluye estándares para dispositivos IoT y reporte de pagos de ransomware."
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "Privacy Act 1988",
        "description": "Ley federal australiana de privacidad que regula el manejo de información personal, aplicada por la OAIC."
      }
    ]
  },
  "FJ": {
    "interestGroups": [],
    "authorities": [
      {
        "name": "Online Safety Commission",
        "description": "Organismo regulador de Fiyi creado por la Online Safety Act 2018 para abordar la seguridad en línea y el contenido dañino."
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "Online Safety Act 2018",
        "description": "Ley de Fiyi aprobada en 2018 que regula la seguridad en línea y crea la Online Safety Commission."
      }
    ],
    "dataProtectionRegulations": []
  },
  "FM": {
    "interestGroups": [
      {
        "name": "Pacific Cybersecurity Operational Network (PaCSON)",
        "description": "Red regional de cooperación operativa en ciberseguridad del Pacífico; Micronesia participa mediante su Cyber Security and Intelligence Bureau.",
        "url": "https://pacson.org"
      }
    ],
    "authorities": [
      {
        "name": "Cyber Security and Intelligence Bureau",
        "description": "Oficina creada por orden ejecutiva dentro del Departamento de Justicia de los Estados Federados de Micronesia."
      },
      {
        "name": "CERT-FSM (en desarrollo)",
        "description": "Equipo de respuesta a incidentes informáticos que se busca crear y fortalecer bajo la hoja de ruta de ciberseguridad nacional."
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "Cybersecurity Act 2025",
        "description": "Normativa orientada a proteger infraestructura crítica y crear el CERT-FSM; discutida junto a otras leyes en el simposio nacional de ciberseguridad de 2025."
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "No existe una ley integral de protección de datos",
        "description": "FSM carece de ley de protección de datos en vigor; una Personal Data Protection Act fue discutida como necesidad pendiente en 2025."
      }
    ]
  },
  "KI": {
    "interestGroups": [
      {
        "name": "Pacific Cybersecurity Operational Network (PaCSON)",
        "description": "Red regional de cooperación operativa en ciberseguridad del Pacífico; Kiribati participa mediante el MICTTD.",
        "url": "https://pacson.org"
      }
    ],
    "authorities": [
      {
        "name": "Ministry of Information, Communication, Transport and Tourism Development (MICTTD)",
        "description": "Su División de Política y Desarrollo TIC asesora al gobierno y coordina asesoría y sensibilización en ciberseguridad."
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "Cybercrime Act 2021",
        "description": "Ley que tipifica delitos informáticos, otorga poderes de investigación y define arreglos institucionales frente al cibercrimen en Kiribati."
      },
      {
        "name": "Communications Act 2013",
        "description": "Ley de comunicaciones cuyas secciones 107 a 111 tipifican delitos informáticos en Kiribati."
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "Data Protection Act 2025",
        "description": "Ley de protección de datos de Kiribati alineada con principios del RGPD; exige notificación de brechas y regula transferencias internacionales."
      }
    ]
  },
  "MH": {
    "interestGroups": [
      {
        "name": "Pacific Cybersecurity Operational Network (PaCSON)",
        "description": "Red regional de cooperación operativa en ciberseguridad del Pacífico; Marshall Islands participa mediante la policía nacional.",
        "url": "https://pacson.org"
      }
    ],
    "authorities": [
      {
        "name": "Marshall Islands Police Department (MIPD) - Transnational Crime Unit",
        "description": "Unidad de la policía nacional, con oficina central de INTERPOL, que atiende delitos transnacionales incluyendo ciberdelitos."
      },
      {
        "name": "Competent Authority for Personal Data Protection",
        "description": "Autoridad de protección de datos personales establecida por la Personal Data Protection Act 2025 de las Islas Marshall."
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "Cybercrimes Act 2025",
        "description": "Ley de cibercrimen de las Islas Marshall, promulgada el 6 de octubre de 2025.",
        "url": "https://rmiparliament.org/cms/images/LEGISLATION/PRINCIPAL/2025/2025-0040/2025-0040_1.pdf"
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "Personal Data Protection Act 2025",
        "description": "Ley de protección de datos personales de las Islas Marshall, promulgada el 7 de octubre de 2025; crea una autoridad competente.",
        "url": "https://www.rmiparliament.org/cms/images/LEGISLATION/PRINCIPAL/2025/2025-0043/2025-0043_1.pdf"
      }
    ]
  },
  "NR": {
    "interestGroups": [
      {
        "name": "Pacific Cybersecurity Operational Network (PaCSON)",
        "description": "Red regional de cooperación operativa en ciberseguridad del Pacífico; Nauru participa mediante el Department of Telecommunications.",
        "url": "https://pacson.org"
      }
    ],
    "authorities": [
      {
        "name": "Department of Telecommunications",
        "description": "Departamento con la Regulatory Directorate y el ICT Department, responsable de infraestructura de red y sistemas gubernamentales en Nauru."
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "Cybercrime Act 2015",
        "description": "Ley que define y tipifica delitos informáticos en Nauru; principal referente legal en la materia según el National Cyber Security Index."
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "No existe una ley integral de protección de datos",
        "description": "Según el National Cyber Security Index, Nauru no cuenta con autoridad ni ley de protección de datos personales."
      }
    ]
  },
  "NZ": {
    "interestGroups": [],
    "authorities": [
      {
        "name": "NCSC-NZ – National Cyber Security Centre",
        "description": "Centro nacional neozelandés de ciberseguridad, responde a incidentes y publica informes sobre el panorama de amenazas.",
        "url": "https://www.ncsc.govt.nz"
      },
      {
        "name": "Office of the Privacy Commissioner (OPC)",
        "description": "Regulador neozelandés de privacidad, aplica la Privacy Act 2020 e investiga quejas sobre datos personales.",
        "url": "https://www.privacy.org.nz"
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "Marco de ciberseguridad del NCSC-NZ",
        "description": "Guías y estándares nacionales de Nueva Zelanda para la protección de infraestructuras críticas y organizaciones frente a amenazas cibernéticas."
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "Privacy Act 2020",
        "description": "Ley neozelandesa de privacidad que establece 13 principios de protección de la información personal y notificación de brechas en 72 horas."
      }
    ]
  },
  "PG": {
    "interestGroups": [
      {
        "name": "Pacific Cybersecurity Operational Network (PaCSON)",
        "description": "Red regional de cooperación operativa en ciberseguridad del Pacífico; Papua Nueva Guinea participa con DICT y NICTA.",
        "url": "https://pacson.org"
      }
    ],
    "authorities": [
      {
        "name": "National Cyber Security Centre (NCSC)",
        "description": "Centro nacional de ciberseguridad de PNG, creado en 2018 y formalizado por la Digital Government Act 2022 (secciones 18-19).",
        "url": "https://ncsc.gov.pg"
      },
      {
        "name": "National Information and Communications Technology Authority (NICTA)",
        "description": "Regulador y autoridad de licenciamiento del sector TIC y telecomunicaciones de Papúa Nueva Guinea.",
        "url": "https://www.nicta.gov.pg"
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "Cybercrime Code Act 2016",
        "description": "Tipifica los delitos informáticos en PNG; elaborada con cooperación de expertos australianos y del Consejo de Europa.",
        "url": "https://www.parliament.gov.pg/uploads/acts/16A_35.pdf"
      },
      {
        "name": "Digital Government Act 2022",
        "description": "Ley que formaliza al National Cyber Security Centre y regula funciones de gobierno digital en PNG."
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "National Data Governance and Data Protection Policy 2024",
        "description": "Política (no ley vinculante) que fija lineamientos para gestión de datos, brechas y privacidad; completada en mayo de 2024.",
        "url": "https://www.ict.gov.pg/ndgdpp/"
      },
      {
        "name": "Protection of Private Communications Act 1973",
        "description": "Regula la interceptación de comunicaciones privadas y sanciona la interceptación no autorizada; no es una ley integral de protección de datos."
      }
    ]
  },
  "PW": {
    "interestGroups": [
      {
        "name": "Pacific Cybersecurity Operational Network (PaCSON)",
        "description": "Red regional de cooperación operativa en ciberseguridad del Pacífico; Palau participa mediante el Bureau of Public Safety.",
        "url": "https://pacson.org"
      }
    ],
    "authorities": [
      {
        "name": "Bureau of Public Safety",
        "description": "Órgano del Ministerio de Justicia de Palau que representa al país en la red regional PaCSON y coordina temas de seguridad pública."
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "No existe legislación de ciberseguridad identificada",
        "description": "El National Cyber Security Index no registra ley, estrategia ni marco normativo de ciberseguridad vigente en Palau."
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "No existe una ley integral de protección de datos",
        "description": "Palau no cuenta con autoridad ni ley de protección de datos personales según el National Cyber Security Index."
      }
    ]
  },
  "SB": {
    "interestGroups": [
      {
        "name": "Pacific Cybersecurity Operational Network (PaCSON)",
        "description": "Red regional de cooperación operativa en ciberseguridad del Pacífico; Solomon Islands participa mediante SIG ICT Services.",
        "url": "https://pacson.org"
      }
    ],
    "authorities": [
      {
        "name": "Solomon Islands Government ICT Services (SIG ICT)",
        "description": "Órgano central de servicios TIC de todo el gobierno de Solomon Islands, mandatado por decisión del gabinete en 2011."
      },
      {
        "name": "SICERT (proyecto)",
        "description": "Proyecto de equipo nacional de respuesta a incidentes (CERT), impulsado por el Ministerio de Comunicaciones y Aviación.",
        "url": "https://www.mca.gov.sb/news-updates/520-solomon-islands-launches-sicert-project-to-combat-cybersecurity-threats.html"
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "No existe una ley de cibercrimen dedicada",
        "description": "Según el Consejo de Europa y la Fiscalía de Solomon Islands, el país carece de legislación específica para perseguir delitos informáticos."
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "No existe una ley integral de protección de datos",
        "description": "Solomon Islands no cuenta con legislación de protección de datos personales comparable al RGPD."
      }
    ]
  },
  "TO": {
    "interestGroups": [
      {
        "name": "Pacific Cybersecurity Operational Network (PaCSON)",
        "description": "Red regional de cooperación operativa en ciberseguridad del Pacífico; Tonga participa mediante CERT Tonga.",
        "url": "https://pacson.org"
      }
    ],
    "authorities": [
      {
        "name": "CERT Tonga",
        "description": "Equipo nacional de respuesta a incidentes informáticos, bajo el ministerio MEIDECC, que asesora a infraestructura crítica y empresas."
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "Computer Crimes Act (2020 Revised Edition)",
        "description": "Ley que define los delitos informáticos en Tonga."
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "No existe una ley integral de protección de datos",
        "description": "Tonga carece de legislación integral de protección de datos personales según el National Cyber Security Index."
      }
    ]
  },
  "TV": {
    "interestGroups": [
      {
        "name": "Pacific Cybersecurity Operational Network (PaCSON)",
        "description": "Red regional de cooperación operativa en ciberseguridad del Pacífico; Tuvalu participa mediante su Department of ICT.",
        "url": "https://pacson.org"
      }
    ],
    "authorities": [
      {
        "name": "Department of Information and Communications Technology (ICT)",
        "description": "Departamento del Ministerio de Justicia, Comunicaciones y Asuntos Exteriores que ejerce funciones regulatorias y de ciberseguridad en Tuvalu."
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "No existe legislación de ciberseguridad identificada",
        "description": "El National Cyber Security Index no registra una ley o marco normativo específico de ciberseguridad vigente en Tuvalu."
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "No existe una ley integral de protección de datos",
        "description": "Tuvalu no cuenta con autoridad ni ley de protección de datos personales según el National Cyber Security Index."
      }
    ]
  },
  "VU": {
    "interestGroups": [
      {
        "name": "Pacific Cybersecurity Operational Network (PaCSON)",
        "description": "Red regional de cooperación operativa en ciberseguridad del Pacífico; Vanuatu participa mediante CERT Vanuatu.",
        "url": "https://pacson.org"
      }
    ],
    "authorities": [
      {
        "name": "CERT Vanuatu (CERT VU)",
        "description": "Centro nacional de información y respuesta a incidentes de ciberseguridad, bajo la Oficina del CIO del Gobierno.",
        "url": "https://cert.gov.vu"
      },
      {
        "name": "Deputy Commissioner of Data Protection and Privacy",
        "description": "Autoridad reguladora designada por la Data Protection and Privacy Act No. 13 de 2024 para supervisar la protección de datos."
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "Cybercrime Act No. 22 of 2021",
        "description": "Primera ley de cibercrimen de Vanuatu; regula divulgación de datos y cooperación con autoridades extranjeras, con asistencia del Consejo de Europa.",
        "url": "https://cert.gov.vu/images/ressources/Cybercrime_Act_n_of_2021.pdf"
      },
      {
        "name": "Vanuatu National Data Protection & Privacy Policy",
        "description": "Política que exige que los datos generados en Vanuatu se sujeten a las leyes y estructuras de gobernanza nacionales.",
        "url": "https://cert.gov.vu/index.php/policies-strategies/54-vanuatu-national-data-protection-privacy-policy"
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "Data Protection and Privacy Act No. 13 of 2024",
        "description": "Ley de protección de datos y privacidad de Vanuatu; designa al Deputy Commissioner of Data Protection and Privacy como regulador."
      }
    ]
  },
  "WS": {
    "interestGroups": [
      {
        "name": "Pacific Cybersecurity Operational Network (PaCSON)",
        "description": "Red regional de cooperación operativa en ciberseguridad del Pacífico; Samoa participa mediante el MCIT.",
        "url": "https://pacson.org"
      }
    ],
    "authorities": [
      {
        "name": "SamCERT",
        "description": "Equipo gubernamental de respuesta a incidentes cibernéticos a nivel nacional de Samoa."
      },
      {
        "name": "Ministry of Communications and Information Technology (MCIT)",
        "description": "Ministerio que define políticas de TIC y telecomunicaciones y representa a Samoa en la red PaCSON."
      }
    ],
    "cybersecurityRegulations": [
      {
        "name": "Crimes Act 2013",
        "description": "Su Parte XVIII ('Crimes Involving Electronic Systems') tipifica delitos informáticos en Samoa."
      },
      {
        "name": "Telecommunications Act 2005",
        "description": "Su sección 74 regula delitos relacionados con telecomunicaciones e informática en Samoa."
      }
    ],
    "dataProtectionRegulations": [
      {
        "name": "No existe una ley integral de protección de datos",
        "description": "Según el National Cyber Security Index, Samoa no cuenta con autoridad de protección de datos personales."
      }
    ]
  }
};
