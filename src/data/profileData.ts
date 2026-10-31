export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  dates: string;
  location: string;
  context: string;
  bullets: string[];
  techStack?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  dates: string;
  details: string;
}

export interface SkillCategory {
  title: string;
  category: "telecom" | "iot" | "ai" | "energy" | "tools";
  description: string;
  tags: string[];
}

export const PROFILE_DATA = {
  name: "Abrahan Isaac Rondon Arteaga",
  shortName: "Abrahan Rondon",
  title: "Ingeniero en Electrónica & Automatización",
  headline: "Telecomunicaciones 5G/RF | Domótica & IoT | Agentes & Automatización con IA",
  location: "Santiago, Chile",
  email: "ing.rondon2015@gmail.com",
  phone: "+56 9 6552 9637",
  whatsappUrl: "https://wa.me/56965529637?text=Hola%20Abrahan,%20vi%20tu%20perfil%20en%20rondontech.com%20y%20me%20gustar%C3%ADa%20conversar.",
  linkedin: "https://www.linkedin.com/in/ingeniero-abrahan-rondon/",
  website: "https://ablutech.com/",
  domain: "rondontech.com",
  status: "DISPONIBLE PARA NUEVOS RETOS",
  summary: [
    "Ingeniero en Electrónica mención Control y TSU en Informática con más de 10 años de trayectoria en operaciones de terreno, telecomunicaciones móviles (5G/LTE/RF), enlaces de microondas y fibra óptica para los principales operadores de Chile y Latinoamérica.",
    "Fundador de Ablu Tech, donde desarrollo en paralelo soluciones de domótica, videovigilancia inteligente (CCTV), control de acceso y automatizaciones asistidas por Inteligencia Artificial (Antigravity, Claude Code, Dify y agentes autónomos) para empresas y clientes residenciales."
  ],
  telemetryMetrics: [
    { label: "Experiencia en Telecom & TI", value: "+10 Años" },
    { label: "Redes Móviles Operadas", value: "5G / LTE / UMTS / GSM" },
    { label: "Proyectos IoT & Domótica", value: "Ablu Tech" },
    { label: "Automatización & IA", value: "Antigravity & Dify" }
  ],
  pillars: [
    {
      id: "telecom",
      badge: "INFRAESTRUCTURA CRÍTICA",
      title: "Telecomunicaciones & Redes Móviles",
      subtitle: "5G / LTE / Transmisión / Radiofrecuencia",
      description: "Operación, comisionamiento y mantenimiento preventivo/correctivo de estaciones base y enlaces de alta capacidad en Entel, WOM, Claro y Movistar.",
      tags: ["Ericsson RBS 6000", "Huawei & Nokia RAN", "Microondas MMOO", "Fibra Óptica / MPLS", "SiteMaster RF", "Energía AC/DC & UPS"],
      stats: "Alta disponibilidad y resolución de incidencias en terreno 24/7"
    },
    {
      id: "iot",
      badge: "HARDWARE & ESPACIOS INTELIGENTES",
      title: "Domótica, CCTV & Seguridad Electrónica",
      subtitle: "Ablu Tech — Soluciones de Automatización",
      description: "Diseño e implementación integral de ecosistemas inteligentes para viviendas y oficinas: videovigilancia IP, control de acceso, monitoreo en tiempo real y rutinas automatizadas.",
      tags: ["CCTV IP & NVR", "Control de Acceso", "Domótica Zigbee/WiFi", "Automatización de Espacios", "Monitoreo Remoto"],
      stats: "Integración llave en mano para clientes privados y corporativos"
    },
    {
      id: "ai",
      badge: "FRONTERA TECNOLÓGICA",
      title: "Automatización & Agentes con Inteligencia Artificial",
      subtitle: "Desarrollo Asistido por IA & Servidores",
      description: "Construcción de aplicaciones web/móviles y flujos automatizados utilizando agentes inteligentes para optimizar procesos comerciales, gestión de datos y soporte técnico.",
      tags: ["Google Antigravity", "Claude Code / Codex", "Dify AI Workflows", "Python / Next.js", "Automatización de Procesos"],
      stats: "Flujos de trabajo aumentados por modelos de lenguaje y agentes"
    }
  ],
  experience: [
    {
      id: "ablutech",
      role: "Desarrollo e Implementación de Soluciones Tecnológicas",
      organization: "Ablu Tech",
      dates: "Enero 2025 - Actualidad",
      location: "Santiago, Chile",
      context: "Actividad independiente orientada a proyectos de domótica, seguridad electrónica, aplicaciones y automatización empresarial con IA.",
      bullets: [
        "Implemento proyectos de domótica y automatización de espacios residenciales y corporativos.",
        "Integro soluciones avanzadas de videovigilancia CCTV y control de acceso seguro.",
        "Desarrollo aplicaciones y servidores dedicados a la monitorización y gestión de procesos.",
        "Implemento agentes de IA con Antigravity, Claude Code y Dify para automatizar ventas, gestión y rutinas de domótica."
      ],
      techStack: ["Domótica", "CCTV", "IoT", "Antigravity", "Dify", "Python", "Next.js"]
    },
    {
      id: "entel",
      role: "Operación y Mantenimiento de Redes Móviles",
      organization: "Entel Connect Center Chile",
      dates: "Marzo 2023 - Actualidad",
      location: "Santiago, Chile",
      context: "O&M en terreno de la red Entel en sectores oriente y sur de la Región Metropolitana.",
      bullets: [
        "Atención y diagnóstico de incidencias críticas en infraestructura de telecomunicaciones 5G, LTE, UMTS y GSM.",
        "Mantenimiento correctivo y preventivo de equipamiento de transmisión MPLS y microondas (MMOO).",
        "Intervención en sistemas de energía AC/DC, rectificadores Eltek/Eaton y bancos de baterías con medición de impedancia.",
        "Diagnóstico y pruebas de cobertura RF y potencia óptica en enlaces de fibra."
      ],
      techStack: ["5G / LTE", "Ericsson", "Enlaces MMOO", "MPLS", "Energía AC/DC", "UPS"]
    },
    {
      id: "wisecom",
      role: "Ingeniero TSSR WOM",
      organization: "WISECOM SpA",
      dates: "Febrero 2022 - Noviembre 2022",
      location: "Santiago, Chile",
      context: "Ingeniería de detalle y levantamientos técnicos para proyectos de modernización de radiofrecuencia y transmisión para WOM.",
      bullets: [
        "Elaboración de ingeniería de detalle para modernización de RF en bandas AWS, 700 MHz, 3.5 GHz y 26 GHz.",
        "Cálculo de parámetros de radiofrecuencia y proyección de nuevos enlaces de microondas y fibra óptica.",
        "Ejecución de levantamientos técnicos TSS a nivel de piso y en torres para sitios particulares y empresas.",
        "Coordinación técnica con empresas de obras civiles para evaluación estructural de sitios."
      ],
      techStack: ["Ingeniería RF", "TSS Surveys", "Bandas 5G/3.5GHz", "Fibra Óptica", "WOM Project"]
    },
    {
      id: "telrad",
      role: "Operación y Mantenimiento RAN & Transmisión",
      organization: "Telrad Services LATAM (Cliente: Entel)",
      dates: "Junio 2018 - Enero 2022",
      location: "Santiago, Chile",
      context: "O&M de redes de acceso radio (RAN) e infraestructura de transmisión para la red de Entel a nivel metropolitano y regional.",
      bullets: [
        "Comisionamiento, diagnóstico e integración de equipamiento Ericsson RBS/RAN (Baseband 6630/5216, TCU, SIU, serie 6000).",
        "Intervención en equipamiento de microondas Ericsson, Huawei y Aviat.",
        "Mediciones de líneas de transmisión con SiteMaster y potencia óptica con Power Meter.",
        "Configuración de rectificadores de energía Eltek, Eaton y Emerson; resolución de fallas en generadores y climatización."
      ],
      techStack: ["Ericsson Baseband", "Aviat MMOO", "Huawei TX", "SiteMaster", "Power Meter", "Sistemas Eltek"]
    },
    {
      id: "celplan",
      role: "Jefe de Grupo de Instalaciones Telecom",
      organization: "CelPlan Technologies, Inc.",
      dates: "Marzo 2017 - Mayo 2018",
      location: "Santiago, Chile",
      context: "Liderazgo de cuadrillas de instalación y comisionamiento para Claro, Movistar y WOM.",
      bullets: [
        "Liderazgo en terreno de grupos de instalación para equipamiento Nokia y Huawei.",
        "Comisionamiento e integración local de estaciones base móviles.",
        "Supervisión y ejecución de maniobras técnicas en sistemas radiantes y torres."
      ],
      techStack: ["Nokia Networks", "Huawei BTS", "Trabajo en Altura", "Comisionamiento"]
    }
  ],
  education: [
    {
      degree: "Ingeniero en Electrónica mención Control",
      institution: "Universidad Nacional Experimental Politécnica de la Fuerza Armada (UNEFA)",
      dates: "2010 - 2015",
      details: "Especialización en sistemas de control automático, instrumentación, líneas de transmisión, circuitos eléctricos de potencia, puesta a tierra y gestión de proyectos de ingeniería."
    },
    {
      degree: "Técnico Superior Universitario en Informática",
      institution: "Instituto Universitario de Tecnología Dr. Cristóbal Mendoza",
      dates: "2004 - 2007",
      details: "Formación en arquitectura de software, bases de datos relacionales, redes locales LAN, desarrollo web y sistemas operativos."
    }
  ],
  skillsCategories: [
    {
      title: "Telecomunicaciones & Redes Móviles",
      category: "telecom",
      description: "Redes celulares de alta generación, estaciones base, sistemas radiantes e ingeniería de detalle.",
      tags: ["5G NR", "4G LTE", "UMTS / GSM", "Ericsson RBS", "Huawei BTS", "Nokia AirScale", "Parámetros RF", "SiteMaster"]
    },
    {
      title: "Transmisión & Conectividad",
      category: "telecom",
      description: "Enlaces de transporte troncal y acceso para tráfico de datos crítico.",
      tags: ["Microondas (MMOO)", "Fibra Óptica", "MPLS", "Power Meter", "Aviat", "MiniLink", "Networking IP"]
    },
    {
      title: "Domótica, CCTV & Hardware IoT",
      category: "iot",
      description: "Integraciones de seguridad electrónica y automatización de espacios físicos en Ablu Tech.",
      tags: ["CCTV IP & NVR", "Control de Acceso", "Domótica Residencial & Oficinas", "Sensores IoT", "Videovigilancia"]
    },
    {
      title: "Energía & Climatización de Sitios",
      category: "energy",
      description: "Sistemas de respaldo de energía crítica continua y alterna para nodos de red.",
      tags: ["Sistemas AC/DC", "Rectificadores Eltek / Eaton / Emerson", "Bancos de Baterías", "Medición de Impedancia", "UPS", "Generadores"]
    },
    {
      title: "Automatización & Agentes con IA",
      category: "ai",
      description: "Aceleración de procesos y desarrollo de aplicaciones impulsadas por modelos de frontera.",
      tags: ["Google Antigravity", "Dify Workflows", "Claude Code / Codex", "Python", "Desarrollo Web / Next.js", "APIs & Webhooks"]
    },
    {
      title: "Herramientas de Diagnóstico & Consola",
      category: "tools",
      description: "Software especializado para configuración y mantenimiento de redes e infraestructura.",
      tags: ["Winfiol", "Moshell", "Element Manager", "PuTTY / SSH", "NetSetMan", "U2000", "DC Tools", "AMOS", "Rebex"]
    }
  ],
  terminalCommands: {
    help: "Comandos disponibles: 'status', 'skills', 'experience', 'pillars', 'contact', 'cv', 'clear'",
    status: "STATUS: ONLINE ● Operacional | Ubicación: Santiago, Chile | Buscando: Nuevos Retos Profesionales en Telecomunicaciones, IoT y Automatización.",
    skills: "SKILLS: [Telecom 5G/LTE/RF] [Transmisión Microondas & Fibra] [Energía AC/DC & UPS] [Domótica & CCTV Ablu Tech] [Agentes IA & Python]",
    pillars: "PILARES: 1. Telecomunicaciones Críticas | 2. Domótica & IoT (Ablu Tech) | 3. Desarrollo y Automatización con IA",
    experience: "TRAYECTORIA: Entel (2023-Hoy) | Ablu Tech (2025-Hoy) | WISECOM (2022) | Telrad (2018-2022) | CelPlan (2017-2018)",
    contact: "CONTACTO: WhatsApp: +56 9 6552 9637 | Email: ing.rondon2015@gmail.com | LinkedIn: https://www.linkedin.com/in/ingeniero-abrahan-rondon/ | Web: https://rondontech.com",
    cv: "DESCARGA: Iniciando descarga del archivo CV_Abrahan_Rondon.pdf ..."
  }
};
