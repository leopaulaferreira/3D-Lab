import Link from "next/link";
export default function NotFound() {
  return (
    <section className="empty">
      <span className="eyebrow">404</span>
      <h1>Essa forma ainda não existe.</h1>
      <p>A página não foi encontrada.</p>
      <Link className="button" href="/produtos">
        Explorar produtos
      </Link>
    </section>
  );
}
