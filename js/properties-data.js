/**
 * Catálogo de Imóveis Reais da UrbanTop Negócios Imobiliários
 * Extraídos e organizados a partir do banco de dados oficial da empresa
 */

const PROPERTIES_DATA = [
  {
    id: 1,
    code: "1297",
    title: "Apartamento Aconchegante com Excelente Acabamento",
    type: "apartamento",
    purpose: "venda",
    price: "R$ 370.000,00",
    priceRaw: 370000,
    city: "Ibirité",
    state: "MG",
    neighborhood: "Palmeiras (Parque Durval de Barros)",
    address: "Região central de Palmeiras, próximo à Av. Babaçu",
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      area: "78 m²"
    },
    image: "assets/images/properties/prop-1297.jpg",
    badge: "Minha Casa Minha Vida",
    featured: true,
    description: "Excelente oportunidade em localização privilegiada no Parque Durval de Barros. Imóvel com sala ampla para dois ambientes, cozinha planejada com bancadas em granito, 3 quartos arejados (sendo 1 suíte) e vaga de garagem demarcada. Próximo a comércio ativo, escolas e linhas de ônibus com fácil acesso a Contagem e BH.",
    features: ["Aceita Financiamento Caixa", "Uso do FGTS", "Bancadas em Granito", "Piso em Porcelanato", "Vaga Demarcada", "Interfone"]
  },
  {
    id: 2,
    code: "1040",
    title: "Apartamento Decorado de Alto Padrão",
    type: "apartamento",
    purpose: "venda",
    price: "R$ 450.000,00",
    priceRaw: 450000,
    city: "Ibirité",
    state: "MG",
    neighborhood: "Palmeiras (Parque Durval de Barros)",
    address: "Bairro Palmeiras / Durval de Barros",
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "85 m²"
    },
    image: "assets/images/properties/prop-1040.jpg",
    badge: "Destaque da Semana",
    featured: true,
    description: "Espaço, conforto e modernidade em um dos bairros mais valorizados da região. Projeto luminotécnico completo em LED, rebaixamento em gesso, cozinha em conceito aberto integrada à varanda gourmet e 2 vagas livres de garagem. Documentação rigorosamente regularizada para financiamento.",
    features: ["Varanda Gourmet", "2 Vagas Cobertas", "Rebaixamento em Gesso", "Suíte Master", "Cozinha Americana", "Gás Canalizado"]
  },
  {
    id: 3,
    code: "1332",
    title: "Apartamento Executivo no Jardim Riacho",
    type: "apartamento",
    purpose: "locacao",
    price: "R$ 3.300,00/mês",
    priceRaw: 3300,
    city: "Contagem",
    state: "MG",
    neighborhood: "Jardim Riacho das Pedras",
    address: "Próximo ao Carrefour Contagem e Rod. Fernão Dias",
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "92 m²"
    },
    image: "assets/images/properties/prop-1332.jpg",
    badge: "Locação Premium",
    featured: true,
    description: "Apartamento impecável para locação no desejado bairro Jardim Riacho das Pedras em Contagem. Condomínio fechado com portaria 24 horas, salão de festas, elevador e piscina. Ambientes climatizados, armários embutidos de marcenaria fina e excelente luminosidade natural.",
    features: ["Condomínio Fechado", "Portaria 24h", "Elevador", "Piscina", "Armários Planejados", "Fácil Acesso Fernão Dias"]
  },
  {
    id: 4,
    code: "1343",
    title: "Apartamento Moderno Pronto para Morar",
    type: "apartamento",
    purpose: "venda",
    price: "R$ 315.000,00",
    priceRaw: 315000,
    city: "Ibirité",
    state: "MG",
    neighborhood: "Eldorado (Parque Durval de Barros)",
    address: "Entorno do Parque Durval de Barros",
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      area: "58 m²"
    },
    image: "assets/images/properties/prop-1343.jpg",
    badge: "Oportunidade",
    featured: false,
    description: "Perfeito para quem busca sair do aluguel com parcelas acessíveis e possibilidade de subsídio do programa habitacional. Prédio individual, água e luz individualizados, sala com sacada integrada, quartos confortáveis e condomínio com baixo custo de manutenção.",
    features: ["Prédio Individual", "Baixo Condomínio", "Medidores Individuais", "Enquadramento MCMV", "Entrada Facilitada"]
  },
  {
    id: 5,
    code: "1370",
    title: "Casa Residencial em Bairro Tranquilo",
    type: "casa",
    purpose: "venda",
    price: "R$ 350.000,00",
    priceRaw: 350000,
    city: "Contagem",
    state: "MG",
    neighborhood: "Jardim Riacho das Pedras",
    address: "Rua residencial arborizada",
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "110 m²"
    },
    image: "assets/images/properties/prop-1370.jpg",
    badge: "Casa Térrea",
    featured: true,
    description: "Linda casa com quintal privativo, ideal para sua família e pets. Estrutura sólida, varanda colonial charmosa, 3 quartos espaçosos, copa integrada à cozinha e área de serviço coberta independente. Garagem para 2 veículos.",
    features: ["Quintal Privativo", "Varanda Colonial", "Garagem 2 Carros", "Espaço Gourmet", "Área de Serviço Separada"]
  },
  {
    id: 6,
    code: "1308",
    title: "Apartamento para Locação com Condomínio Enxuto",
    type: "apartamento",
    purpose: "locacao",
    price: "R$ 1.350,00/mês",
    priceRaw: 1350,
    city: "Ibirité",
    state: "MG",
    neighborhood: "Palmeiras (Parque Durval de Barros)",
    address: "Próximo à Av. Babaçu e pontos comerciais",
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      area: "52 m²"
    },
    image: "assets/images/properties/prop-1308.jpg",
    badge: "Locação Ágil",
    featured: false,
    description: "Locação simplificada sem burocracia desnecessária. Imóvel recém-pintado, piso cerâmico de fácil limpeza, cozinha com azulejos até o teto e banheiro com box blindex. Ótima ventilação natural e vaga de estacionamento inclusa.",
    features: ["Locação Facilitada", "Box Blindex", "Recém Reformado", "Ponto de Ônibus na Porta", "Ambiente Seguro"]
  },
  {
    id: 7,
    code: "1300",
    title: "Apartamento Prático e Funcional para Alugar",
    type: "apartamento",
    purpose: "locacao",
    price: "R$ 1.300,00/mês",
    priceRaw: 1300,
    city: "Ibirité",
    state: "MG",
    neighborhood: "Palmeiras (Parque Durval de Barros)",
    address: "Excelente ponto no Parque Durval de Barros",
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      area: "50 m²"
    },
    image: "assets/images/properties/prop-1300.jpg",
    badge: "Locação",
    featured: false,
    description: "Opção econômica e muito bem posicionada para quem trabalha em Ibirité, Contagem ou Barreiro. Sala para dois ambientes, 2 quartos, cozinha com área de serviço e interfone.",
    features: ["Custo-Benefício", "Interfone", "Ponto Estratégico", "Próximo a Supermercados e Farmácias"]
  },
  {
    id: 8,
    code: "1255",
    title: "Ponto Comercial / Loja Estratégica na Região de Palmeiras",
    type: "comercial",
    purpose: "venda",
    price: "R$ 59.000,00",
    priceRaw: 59000,
    city: "Ibirité",
    state: "MG",
    neighborhood: "Palmeiras (Parque Durval de Barros)",
    address: "Corredor comercial ativo",
    specs: {
      bedrooms: 0,
      bathrooms: 1,
      parking: 0,
      area: "42 m²"
    },
    image: "assets/images/properties/prop-1255.jpg",
    badge: "Comercial",
    featured: false,
    description: "Excelente ponto para quem quer abrir ou expandir seu próprio negócio comercial ou escritório de atendimento. Fachada com ótima visibilidade, porta de aço de enrolar reforçada, banheiro privativo e instalações elétricas e hidráulicas prontas.",
    features: ["Frente para Rua", "Fluxo de Pedestres e Carros", "Banheiro Privativo", "Ideal para Serviços ou Varejo"]
  },
  {
    id: 9,
    code: "1166",
    title: "Terreno / Loteamento Residencial em Expansão",
    type: "lote",
    purpose: "venda",
    price: "R$ 96.000,00",
    priceRaw: 96000,
    city: "Mateus Leme",
    state: "MG",
    neighborhood: "Serra Azul",
    address: "Loteamento Serra Azul",
    specs: {
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      area: "360 m²"
    },
    image: "assets/images/properties/prop-1166.jpg",
    badge: "Loteamento",
    featured: true,
    description: "Loteamento com topografia favorável e documentação 100% regularizada. Vista deslumbrante para a serra, infraestrutura de água e energia já implantada no local. Ideal para construir a casa de campo dos sonhos ou investir com grande potencial de valorização.",
    features: ["360 m² de Área", "Topografia Plana", "Água e Luz na Porta", "Registro e Escritura", "Potencial de Valorização"]
  }
];

// Regiões reais de atendimento
const REGIONS_DATA = [
  {
    name: "Ibirité",
    tag: "Sede & Região Central",
    bairros: "Palmeiras, Parque Durval de Barros, Cascata, Eldorado, Novo Horizonte",
    desc: "Nossa casa principal. Onde a UrbanTop nasceu em 2010 e onde mantemos nossa loja física de atendimento.",
    highlight: "Sede Física na Av. Babaçu 725"
  },
  {
    name: "Contagem",
    tag: "Forte Polo Residencial e Industrial",
    bairros: "Jardim Riacho das Pedras, Sapucaias, Eldorado, Inconfidentes, Cidade Industrial",
    desc: "Conexão direta com Ibirité e Betim. Ampla oferta de apartamentos familiares e casas com excelente infraestrutura.",
    highlight: "Alta Demanda MCMV & Locação"
  },
  {
    name: "Betim",
    tag: "Vetor de Crescimento",
    bairros: "Centro, PTB, Alterosas, Filadélfia, Ingá",
    desc: "Mercado dinâmico com condomínios fechados modernos e excelentes oportunidades de financiamento habitacional.",
    highlight: "Financiamento Facilitado"
  },
  {
    name: "Belo Horizonte",
    tag: "Capital Mineira",
    bairros: "Região do Barreiro, Buritis, Estoril, Oeste",
    desc: "Atendimento especializado na conexão Barreiro / RMBH, unindo o melhor da capital com a tranquilidade da região metropolitana.",
    highlight: "Proximidade & Comodidade"
  },
  {
    name: "Sarzedo & Mário Campos",
    tag: "Tranquilidade & Qualidade de Vida",
    bairros: "Centro, Jardim Planalto, Imóveis Rurais",
    desc: "Opções residenciais com mais espaço verde, ar puro e casas independentes para famílias que valorizam bem-estar.",
    highlight: "Casas com Quintal"
  },
  {
    name: "Mateus Leme & Igarapé",
    tag: "Chácaras, Lotes & Lazer",
    bairros: "Serra Azul, Vivendas, Vale dos Sonhos",
    desc: "Especialidade em loteamentos, terrenos planos e sítios com documentação segura e condições de aquisição direta.",
    highlight: "Lotes a partir de 360m²"
  }
];

// Dados institucionais oficiais da empresa
const COMPANY_INFO = {
  name: "UrbanTop Negócios Imobiliários",
  tradeName: "UrbanTop Imóveis",
  creci: "4298 MG - J",
  founded: "2010",
  yearsInMarket: new Date().getFullYear() - 2010,
  phone: "(31) 98412-0088",
  phoneRaw: "5531984120088",
  email: "contato@urbantopimoveis.com.br",
  address: {
    street: "Avenida Babaçu (Antiga Av. Um)",
    number: "725",
    complement: "Loja",
    neighborhood: "Palmeiras (Parque Durval de Barros)",
    city: "Ibirité",
    state: "MG",
    cep: "32441-260",
    full: "Avenida Babaçu (Antiga Av. Um), nº 725 - Loja, Palmeiras (Parque Durval de Barros), Ibirité - MG"
  },
  social: {
    instagram: "https://www.instagram.com/urbantopimov/",
    facebook: "https://www.facebook.com/urbantopimoveis",
    whatsapp: "https://api.whatsapp.com/send?phone=5531984120088&text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20im%C3%B3veis%20na%20UrbanTop"
  },
  hours: "Segunda a Sexta: 08h30 às 18h00 | Sábados com agendamento prévio"
};
