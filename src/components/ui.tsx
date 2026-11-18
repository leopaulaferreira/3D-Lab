import { Reveal } from "./reveal";
import Link from "next/link";
import Image from "next/image";
import { Product, categories } from "@/data/catalog";
import { money } from "@/lib/config";
export function Heading({ title, text }: { title: string; text?: string }) {
  return (
    <div className="heading">
      <span className="eyebrow">OBJETOS COM INTENÇÃO</span>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </div>
  );
}
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link className="product-card" href={`/produtos/${p.slug}`}>
      <div className="picture">
        <Image
          src={p.images[0]}
          alt={`Ilustração conceitual: ${p.name}`}
          width={600}
          height={600}
        />
        <span className="badge">Demonstração</span>
      </div>
      <small>{categories.find((c) => c.id === p.categoryId)?.name}</small>
      <h3>{p.name}</h3>
      <div className="card-meta">
        <span>{p.price !== null ? money(p.price) : "Sob consulta"}</span>
        <span className="swatches">● ● ●</span>
      </div>
      <small>Personalizável · Disponibilidade não confirmada</small>
    </Link>
  );
}
export function ProductGrid({ items }: { items: Product[] }) {
  return items.length ? (
    <div className="product-grid">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  ) : (
    <div className="empty">
      <h2>Nenhuma peça por aqui.</h2>
      <p>Experimente outra busca ou remova os filtros.</p>
      <Link href="/produtos">Limpar filtros</Link>
    </div>
  );
}
export function CTA() {
  return (
    <section className="cta">
      <span className="eyebrow">VAMOS CRIAR JUNTOS</span>
      <h2>Vamos tirar sua ideia do papel?</h2>
      <Link className="button light" href="/personalizados">
        Conversar sobre meu projeto
      </Link>
    </section>
  );
}
export function Process() {
  return (
    <section>
      <div className="section-title">
        <h2>Da sua ideia ao seu espaço.</h2>
        <span>COMO FUNCIONA</span>
      </div>
      <Reveal>
        <div className="steps">
          {[
            "Escolha uma peça ou envie sua ideia.",
            "Defina cores, tamanho e personalização.",
            "Receba um orçamento e prazo.",
            "Produzimos e combinamos a entrega.",
          ].map((s, i) => (
            <div key={s}>
              <span>0{i + 1}</span>
              <h3>{s}</h3>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
