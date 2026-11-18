export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  collectionIds: string[];
  price: number | null;
  priceOnRequest: boolean;
  featured: boolean;
  available: boolean;
  customizable: boolean;
  images: string[];
  dimensions: string;
  weight: string;
  material: string;
  colors: string[];
  tags: string[];
  careInstructions: string;
  createdAt: string;
}
export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  coverImage: string;
  productIds: string[];
}
export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  images: string[];
  category: string;
  materials: string[];
  status: string;
  challenges: string;
  result: string;
  createdAt: string;
}
export const categories = [
  {
    id: "vasos",
    name: "Vasos e decoração",
    description: "Formas que acolhem o seu espaço.",
  },
  {
    id: "miniaturas",
    name: "Miniaturas",
    description: "Pequenos universos, grandes detalhes.",
  },
  {
    id: "acessorios",
    name: "Acessórios",
    description: "Mais intenção no dia a dia.",
  },
  {
    id: "presentes",
    name: "Presentes personalizados",
    description: "Um detalhe que é só seu.",
  },
];
const names = [
  "Vaso Twist",
  "Mini Vaso Geométrico",
  "Cachepô Orgânico",
  "Escultura Abstrata",
  "Porta-objetos Minimalista",
  "Figura Articulada Original",
  "Miniatura Decorativa",
  "Suporte de Controle",
  "Organizador de Cabos",
  "Suporte de Celular",
];
export const products: Product[] = names.map((name, i) => ({
  id: String(i),
  slug: name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replaceAll(" ", "-"),
  name,
  sku: `LAB-${String(i + 1).padStart(3, "0")}`,
  shortDescription: "Um estudo de forma, textura e possibilidades.",
  description:
    "Conceito ilustrativo do catálogo. Geometria e acabamento serão definidos após desenvolvimento e validação de uma peça física.",
  categoryId: i < 5 ? "vasos" : i < 7 ? "miniaturas" : "acessorios",
  collectionIds: [i < 5 ? "vasos" : i < 7 ? "miniaturas" : "acessorios"],
  price: null,
  priceOnRequest: true,
  featured: i < 4,
  available: false,
  customizable: true,
  images: [`/images/study-${i}.svg`],
  dimensions: "A definir no orçamento",
  weight: "A confirmar",
  material: "PLA proposto; sujeito a validação",
  colors: ["Areia", "Verde", "Terracota"],
  tags: ["Demonstração"],
  careInstructions:
    "Evite calor e sol direto. Limpe com pano macio. Uso decorativo; contato com alimentos e estanqueidade não validados.",
  createdAt: "2026-11-18",
}));
export const collections: Collection[] = categories.map((c, i) => ({
  ...c,
  slug: c.id,
  coverImage: `/images/study-${[0, 5, 9, 3][i]}.svg`,
  productIds: products.filter((p) => p.categoryId === c.id).map((p) => p.id),
}));
export const projects: Project[] = [
  {
    id: "1",
    slug: "estudo-de-curvas",
    title: "Entre curvas e camadas",
    summary: "Uma exploração conceitual de volumes para morar.",
    description:
      "Estudo demonstrativo de direção de produto, ainda sem fabricação documentada.",
    images: ["/images/object-0.svg"],
    category: "Decoração",
    materials: ["PLA proposto"],
    status: "Conceito demonstrativo",
    challenges: "Investigar proporções e viabilidade de impressão.",
    result: "Proposta visual ilustrativa. Protótipo físico ainda não validado.",
    createdAt: "2026-11-18",
  },
];
export const repository = {
  products: () => products,
  product: (slug: string) => products.find((p) => p.slug === slug),
  projects: () => projects,
};
export function filterProducts(items: Product[], params: URLSearchParams) {
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("pt-BR")
      .trim();
  const q = normalize(params.get("q") || "");
  const result = items.filter(
    (p) =>
      normalize(
        p.name + " " + categories.find((c) => c.id === p.categoryId)?.name,
      ).includes(q) &&
      (!params.get("categoria") || p.categoryId === params.get("categoria")) &&
      (!params.get("cor") || p.colors.includes(params.get("cor")!)) &&
      (params.get("personalizavel") !== "sim" || p.customizable) &&
      (!params.get("disponibilidade") ||
        (params.get("disponibilidade") === "sim"
          ? p.available
          : !p.available)) &&
      (!params.get("max") ||
        (p.price !== null && p.price <= Number(params.get("max")))),
  );
  return result.sort((a, b) =>
    params.get("ordem") === "menor"
      ? (a.price ?? Infinity) - (b.price ?? Infinity)
      : params.get("ordem") === "maior"
        ? (b.price ?? -Infinity) - (a.price ?? -Infinity)
        : params.get("ordem") === "recentes"
          ? b.createdAt.localeCompare(a.createdAt)
          : Number(b.featured) - Number(a.featured),
  );
}
