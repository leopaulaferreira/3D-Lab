import { canonical } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/catalog";
import { Heading } from "@/components/ui";
export const metadata = {
  ...canonical("/projetos"),
  title: "Projetos e estudos",
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  return (
    <section>
      <Heading
        title="Nosso laboratório de ideias"
        text="Estudos conceituais, experimentos e possibilidades. Ainda não há projetos fabricados documentados."
      />
      <form>
        <label>
          Categoria
          <select name="categoria" defaultValue={categoria}>
            <option value="">Todas</option>
            <option>Decoração</option>
          </select>
        </label>
        <button className="button">Filtrar</button>
      </form>
      {projects
        .filter((p) => !categoria || p.category === categoria)
        .map((p) => (
          <Link
            className="project-feature"
            href={`/projetos/${p.slug}`}
            key={p.id}
          >
            <Image
              src={p.images[0]}
              alt="Ilustração conceitual"
              width={600}
              height={600}
            />
            <div>
              <span>{p.status}</span>
              <h2>{p.title}</h2>
              <p>{p.summary}</p>
              <p>{p.materials.join(", ")}</p>
            </div>
          </Link>
        ))}
    </section>
  );
}
