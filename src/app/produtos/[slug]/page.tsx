import { canonical } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, repository } from "@/data/catalog";
import { Gallery, Share } from "@/components/gallery";
import { ProductGrid } from "@/components/ui";
import { whatsappLink } from "@/lib/config";
export const generateStaticParams = () =>
  products.map((p) => ({ slug: p.slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = repository.product((await params).slug);
  return {
    ...(p ? canonical(`/produtos/${p.slug}`) : {}),
    title: p?.name || "Produto não encontrado",
    description: p?.shortDescription,
  };
}
export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = repository.product((await params).slug);
  if (!p) notFound();
  return (
    <section>
      <nav className="breadcrumbs" aria-label="Caminho da página">
        <Link href="/produtos">Produtos</Link> / {p.name}
      </nav>
      <div className="detail">
        <Gallery images={p.images} name={p.name} />
        <div>
          <span className="eyebrow">CONCEITO DEMONSTRATIVO · {p.sku}</span>
          <h1>{p.name}</h1>
          <p className="product-price">Sob consulta</p>
          <p>{p.description}</p>
          <p className="notice">
            Disponibilidade não confirmada. Ilustração, não fotografia de
            produto real.
          </p>
          <dl>
            <dt>Dimensões</dt>
            <dd>{p.dimensions}</dd>
            <dt>Material</dt>
            <dd>{p.material}</dd>
            <dt>Peso e prazo</dt>
            <dd>A confirmar após análise</dd>
            <dt>Cores propostas</dt>
            <dd>{p.colors.join(" · ")}</dd>
          </dl>
          <div className="actions">
            <a
              className="button"
              href={
                whatsappLink(
                  `Olá! Tenho interesse no produto ${p.name}, código ${p.sku}. Gostaria de saber sobre disponibilidade e personalização.`,
                ) || `/personalizados?produto=${p.slug}`
              }
            >
              Solicitar este produto
            </a>
            <Link href={`/personalizados?produto=${p.slug}`}>Personalizar</Link>
            <Share />
          </div>
          <details>
            <summary>Cuidados e recomendações</summary>
            <p>{p.careInstructions}</p>
          </details>
        </div>
      </div>
      <h2>Outras formas de se inspirar</h2>
      <ProductGrid
        items={products
          .filter((x) => x.categoryId === p.categoryId && x.id !== p.id)
          .slice(0, 4)}
      />
    </section>
  );
}
