export interface TechChapterData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  gradient: "cyan" | "purple" | "amber" | "emerald" | "rainbow";
  accentColor: string;
  glowColor: string;
  statNumber: string;
  statLabel: string;
  description: string;
  quote: {
    text: string;
    author: string;
    role: string;
  };
  pillars: {
    title: string;
    desc: string;
    icon: string;
    metric: string;
  }[];
  timeline: {
    year: string;
    milestone: string;
    status: "achieved" | "current" | "projected";
  }[];
  deepDive: {
    architecture: string;
    humanImpact: string;
    ethicalFrontier: string;
    keyTechnologies: string[];
  };
}

export const HERO_STATS = [
  { label: "AI Reasoning FLOPs", value: "10²⁶", sub: "+10,000% / 3 yrs" },
  { label: "Qubit Coherence Time", value: "99.98%", sub: "Fault-tolerant threshold" },
  { label: "Fusion Energy Gain", value: "Q > 1.25", sub: "Net ignition reached" },
  { label: "CRISPR Base Precision", value: "99.4%", sub: "Cellular reprogramming" },
];

export const TECH_CHAPTERS: TechChapterData[] = [
  {
    id: "chapter-ai",
    number: "01",
    title: "Artificial Superintelligence",
    subtitle: "Synthetic Cognition & Neural Co-Pilots",
    tagline: "The invention that will invent everything else.",
    gradient: "cyan",
    accentColor: "#00f2fe",
    glowColor: "rgba(0, 242, 254, 0.4)",
    statNumber: "100,000x",
    statLabel: "Scientific Research Acceleration",
    description:
      "Autonomous machine cognition is shifting from simple statistical correlation to deep conceptual reasoning. From AlphaFold unraveling 200 million protein folding structures to autonomous robotic laboratories synthesizing novel superconductors without human sleep, AI is collapsing decades of scientific discovery into hours.",
    quote: {
      text: "We are creating a tool that thinks alongside us — magnifying human imagination by orders of magnitude.",
      author: "Demis Hassabis",
      role: "Founder, Google DeepMind & Nobel Laureate",
    },
    pillars: [
      {
        title: "Autonomous Scientific Method",
        desc: "Closed-loop AI robots formulating hypotheses, running wet-lab assays, and synthesising room-temperature materials 24/7.",
        icon: "Cpu",
        metric: "200M+ Proteins Solved",
      },
      {
        title: "Cognitive Reasoning & Agents",
        desc: "Beyond pattern-matching: autonomous multi-agent networks executing planetary supply chains, code synthesis, and climate mitigation.",
        icon: "Sparkles",
        metric: "98.7% Complex Logic",
      },
      {
        title: "Neural Symbiosis & BCIs",
        desc: "Sub-millimeter neural lace connecting human brain cortex directly with high-bandwidth cognitive coprocessors.",
        icon: "Network",
        metric: "10 Gbps Thought Transfer",
      },
    ],
    timeline: [
      { year: "2020", milestone: "Large Language Models grasp human conversational semantics", status: "achieved" },
      { year: "2024", milestone: "Deep reasoning architectures solve Olympiad geometry & protein mechanics", status: "achieved" },
      { year: "2028", milestone: "Autonomous scientific labs discover novel battery chemistries without human intervention", status: "current" },
      { year: "2032", milestone: "Synthetic general intelligence outperforms global human collective in formal theorem proving", status: "projected" },
    ],
    deepDive: {
      architecture: "Transformer-diffusion-hybrid architectures running on optical tensor processing units with sparse mixture-of-experts routing.",
      humanImpact: "Eradication of rare pediatric genetic disorders, hyper-personalized education for every child on Earth, and automated planetary logistics.",
      ethicalFrontier: "Autonomous alignment, cognitive sovereignty, and ensuring AI dividend distributes equitably across global populations.",
      keyTechnologies: ["Liquid Neural Networks", "Optical Matrix Multipliers", "Neuro-symbolic Formal Provers", "Synthetic Synapses"],
    },
  },
  {
    id: "chapter-quantum",
    number: "02",
    title: "Quantum Supremacy",
    subtitle: "Harnessing the Multiverse of Superposition",
    tagline: "Computing at the speed of atomic probability.",
    gradient: "purple",
    accentColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    statNumber: "1,000,000+",
    statLabel: "Physical Qubits in Fault-Tolerant Arrays",
    description:
      "Classical computers process bits of 0 or 1. Quantum processors leverage superposition, entanglement, and quantum tunneling to simulate the exact quantum mechanical reality of molecules, unlocking room-temperature energy conductors, unbreakable post-quantum cryptography, and optimal planetary trade routes in split seconds.",
    quote: {
      text: "Nature isn't classical, dammit, and if you want to make a simulation of nature, you'd better make it quantum mechanical.",
      author: "Richard Feynman",
      role: "Theoretical Physicist & Quantum Pioneer",
    },
    pillars: [
      {
        title: "Molecular Simulation",
        desc: "Exact quantum modeling of chemical bond dynamics to engineer atmospheric carbon scrubbers and eternal electrolyte batteries.",
        icon: "Atom",
        metric: "10²⁴ Operations/Sec",
      },
      {
        title: "Topological Qubits",
        desc: "Braided Majorana zero modes offering hardware-level noise protection against decoherence.",
        icon: "ShieldAlert",
        metric: "99.999% Gate Fidelity",
      },
      {
        title: "Quantum Internet & Entanglement",
        desc: "Instantaneous state teleportation across orbital satellite constellations, making cyber warfare mathematically impossible.",
        icon: "Wifi",
        metric: "Global QKD Satellites",
      },
    ],
    timeline: [
      { year: "2019", milestone: "First quantum supremacy demonstration over classical supercomputers", status: "achieved" },
      { year: "2025", milestone: "Logical qubits surpass physical error thresholds via surface codes", status: "achieved" },
      { year: "2029", milestone: "Commercial quantum catalysts revolutionize Haber-Bosch nitrogen fixation", status: "current" },
      { year: "2035", milestone: "Global quantum internet connects financial and military infrastructure via entanglement", status: "projected" },
    ],
    deepDive: {
      architecture: "Dilution-refrigerator cryostats chilling superconducting transmon qubits to 15 millikelvin (-273.13°C), colder than outer space.",
      humanImpact: "Simulating complex drugs in hours instead of 14 years of animal trials; complete eradication of battery degradation.",
      ethicalFrontier: "Immediate collapse of legacy RSA encryption and securing planetary financial banking infrastructure with lattice cryptography.",
      keyTechnologies: ["Trapped Ion Arrays", "Majorana Fermions", "Cryogenic CMOS Control", "Quantum Annealing"],
    },
  },
  {
    id: "chapter-fusion",
    number: "03",
    title: "Clean Fusion & Planetary Grid",
    subtitle: "Bottling the Star Inside Magnetic Cages",
    tagline: "Limitless zero-carbon energy for ten billion souls.",
    gradient: "amber",
    accentColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
    statNumber: "100M °C",
    statLabel: "Tokamak Core Plasma Temperature",
    description:
      "For 70 years, fusion was said to be '30 years away.' Today, High-Temperature Superconducting (HTS) tape generating 20-Tesla magnetic fields has made compact net-positive commercial fusion an engineering reality. A single glass of seawater holds deuterium fuel equivalent to 300 gallons of gasoline — with zero long-lived radioactive waste.",
    quote: {
      text: "Fusion is the ultimate energy source. It doesn't emit carbon, it produces no runaway meltdown, and its fuel is as abundant as the ocean.",
      author: "Dr. Dennis Whyte",
      role: "Director, MIT Plasma Science and Fusion Center",
    },
    pillars: [
      {
        title: "Magnetic Confinement (HTS)",
        desc: "Rare-earth barium copper oxide (REBCO) magnets producing 20 Tesla field strengths in desk-sized containment vessels.",
        icon: "Zap",
        metric: "20 Tesla Field Power",
      },
      {
        title: "Atmospheric Carbon Vacuum",
        desc: "Limitless base-load electricity powering direct air capture (DAC) arrays to reverse 200 years of fossil emissions.",
        icon: "Wind",
        metric: "10 Gt CO₂ Removed/Yr",
      },
      {
        title: "Global Desalination Grid",
        desc: "Fusion-powered hyperscale reverse osmosis greening the Sahara and Atacama deserts into arable agriculture.",
        icon: "Droplets",
        metric: "50B m³ Fresh Water",
      },
    ],
    timeline: [
      { year: "2022", milestone: "National Ignition Facility reaches scientific energy gain Q > 1", status: "achieved" },
      { year: "2025", milestone: "Compact HTS Tokamaks sustain 100M°C plasma for record runtimes", status: "achieved" },
      { year: "2030", milestone: "First commercial fusion power delivered to municipal power grids", status: "current" },
      { year: "2040", milestone: "Global phaseout of coal and natural gas baseload plants in favor of fusion dynamos", status: "projected" },
    ],
    deepDive: {
      architecture: "Compact spherical tokamaks with liquid lithium blankets absorbing 14.1 MeV fusion neutrons to generate steam turbine electricity and breed tritium.",
      humanImpact: "Abundant electricity costs drop near zero, ending global geopolitical fossil conflicts and water scarcity forever.",
      ethicalFrontier: "Equitable distribution to developing nations without monopolization by energy cartels.",
      keyTechnologies: ["REBCO Superconducting Tape", "Inertial Confinement Laser Arrays", "Liquid Lithium First Walls", "Stellarator Plasma AI Optimizers"],
    },
  },
  {
    id: "chapter-biotech",
    number: "04",
    title: "Synthetic Biology & Longevity",
    subtitle: "Programming Cellular Code & Eradicating Senescence",
    tagline: "DNA is software. We are learning to compile it.",
    gradient: "emerald",
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    statNumber: "+45 Yrs",
    statLabel: "Projected Healthy Biological Healthspan",
    description:
      "Biology is no longer merely observed; it is engineered. CRISPR base and prime editing allow single-letter genetic corrections inside living human organs. Epigenetic reprogramming factors (Yamanaka factors) have reversed cellular aging markers in mammalian eyes and muscle tissue, turning aging into a medically manageable condition.",
    quote: {
      text: "The first person to live healthily to 150 years of age is likely already walking the Earth today.",
      author: "Dr. David Sinclair",
      role: "Professor of Genetics, Harvard Medical School",
    },
    pillars: [
      {
        title: "Epigenetic Age Reversal",
        desc: "Transient expression of OSK Yamanaka factors resetting cellular methylation clocks back to youthful vitality.",
        icon: "HeartPulse",
        metric: "Reverse Cellular Age",
      },
      {
        title: "3D Organ Bioprinting",
        desc: "Patient-specific autologous stem cell scaffolds printed in sterile bioreactors, rendering transplant waiting lists obsolete.",
        icon: "Dna",
        metric: "Zero Donor Rejection",
      },
      {
        title: "Programmable Nanomedicine",
        desc: "Synthetic mRNA logic gates patrolling the bloodstream to neutralize circulating metastatic cancer cells on sight.",
        icon: "Activity",
        metric: "99.8% Tumor Eradication",
      },
    ],
    timeline: [
      { year: "2020", milestone: "mRNA vaccines engineered and deployed globally within 10 months", status: "achieved" },
      { year: "2023", milestone: "First FDA-approved CRISPR gene therapy for sickle cell anemia (Casgevy)", status: "achieved" },
      { year: "2028", milestone: "Clinical trials for human systemic epigenetic rejuvenation therapies", status: "current" },
      { year: "2036", milestone: "Synthetic 3D printed hearts and kidneys available on-demand worldwide", status: "projected" },
    ],
    deepDive: {
      architecture: "In vivo lipid nanoparticle delivery of programmable prime editors coupled with cellular methylation clock biosensors.",
      humanImpact: "Compression of morbidity: humans living active, disease-free, cognitively sharp lives well past 100 years.",
      ethicalFrontier: "Equal access to longevity therapies to prevent genetic stratification between socio-economic classes.",
      keyTechnologies: ["Base & Prime Editors", "Yamanaka Factor Gene Drives", "Vascularized Organ Scaffolds", "Cellular Senolytics"],
    },
  },
  {
    id: "chapter-space",
    number: "05",
    title: "Interstellar Space & Spatial Reality",
    subtitle: "Expanding Beyond Earth & Merging Realities",
    tagline: "Consciousness becoming a cosmic phenomenon.",
    gradient: "rainbow",
    accentColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    statNumber: "10,000+",
    statLabel: "Projected Off-World Pioneers by 2045",
    description:
      "Fully reusable super-heavy launch vehicles have reduced the cost per kilogram to low Earth orbit from $50,000 to under $50. Humankind is building permanent orbital infrastructure, asteroid mining outposts for rare-earth metals, and self-sufficient biospheres on the lunar South Pole and Mars, while spatial computing dissolves physical distance.",
    quote: {
      text: "You want to wake up in the morning and think the future is going to be great - and that's what being a spacefaring civilization is all about.",
      author: "Elon Musk",
      role: "Chief Engineer, SpaceX",
    },
    pillars: [
      {
        title: "Orbital Solar Power Beams",
        desc: "Gigawatt-scale photovoltaic satellites in geostationary orbit beaming microwave energy 24/7 through any weather.",
        icon: "Orbit",
        metric: "24/7 Zero-Interruption Solar",
      },
      {
        title: "Lunar & Martian Biospheres",
        desc: "Closed-loop hydroponic regolith domes shielding explorers from cosmic radiation with water-ice layers.",
        icon: "Globe",
        metric: "Permanent Off-World Life",
      },
      {
        title: "Spatial Reality Convergence",
        desc: "Photonic waveguides projecting photorealistic holographic avatars, making physical location irrelevant for global collaboration.",
        icon: "Glasses",
        metric: "8K Micro-OLED Waveguides",
      },
    ],
    timeline: [
      { year: "2024", milestone: "First commercial spacewalk and Starship full-stack orbital test", status: "achieved" },
      { year: "2026", milestone: "Artemis III lands first crew on the Lunar South Pole water ice deposits", status: "current" },
      { year: "2032", milestone: "First uncrewed industrial resource extraction on near-Earth asteroid Psyche 16", status: "projected" },
      { year: "2042", milestone: "Self-sustaining city of 50,000 residents operational on the Martian surface", status: "projected" },
    ],
    deepDive: {
      architecture: "Methane-oxygen staged combustion rocket engines, solar-ion ion thrusters, and autonomous ISRU (In-Situ Resource Utilization) water splitters.",
      humanImpact: "Securing humanity against extinction-level planetary catastrophes while accessing trillions of tons of platinum and nickel from asteroids.",
      ethicalFrontier: "Planetary preservation, space governance treaties, and space debris remediation.",
      keyTechnologies: ["Methane-LOX Staged Engines", "ISRU Sabatier Reactors", "Centrifugal Gravity Rings", "Holographic Neural Displays"],
    },
  },
];

export const COMPARISON_MATRIX = [
  {
    domain: "Computing",
    past: "Vacuum tubes & 8-bit chips",
    present: "Cloud silicon & 3nm GPUs",
    future: "Quantum topological cores & optical neural nets",
  },
  {
    domain: "Energy",
    past: "Coal, peat & wood combustion",
    present: "Intermittent wind & solar arrays",
    future: "Compact magnetic fusion & space solar beams",
  },
  {
    domain: "Medicine",
    past: "Leeches, bloodletting & guesswork",
    present: "Chemotherapy & mass-market pills",
    future: "mRNA programmed nanobots & epigenetic reversal",
  },
  {
    domain: "Exploration",
    past: "Wooden ships on uncharted oceans",
    present: "Orbital space stations & probes",
    future: "Interstellar laser sails & terraformed Mars colonies",
  },
  {
    domain: "Intelligence",
    past: "Isolated human brains",
    present: "Search engines & chat assistants",
    future: "Universal synthetic cognition & neural symbiosis",
  },
];
