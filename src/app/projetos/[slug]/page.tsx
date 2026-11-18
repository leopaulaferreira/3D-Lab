import { notFound } from "next/navigation";
import { projects } from "@/data/catalog";
import { Heading, CTA } from "@/components/ui";
import { Gallery } from "@/components/gallery";
export const generateStaticParams = () =>
  projects.map((p) => ({ slug: p.slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: projects.find((p) => p.slug === slug)?.title };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <section>
        <Heading title={p.title} text={p.status} />
        <div className="detail">
          <Gallery name={p.title} images={p.images} />
          <div>
            <h2>Objetivo e conceito</h2>
            <p>{p.description}</p>
            <h2>Desenvolvimento</h2>
            <p>
              Exploração visual de curvas e camadas. Fabricação e testes físicos
              pendentes.
            </p>
            <h2>Material proposto</h2>
            <p>{p.materials.join(", ")}</p>
            <h2>Desafios</h2>
            <p>{p.challenges}</p>
            <h2>Resultado</h2>
            <p>{p.result}</p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
