export default function Loading() {
  return (
    <section aria-label="Carregando conteúdo" role="status">
      <p>Carregando…</p>
      <div className="product-grid">
        {[0, 1, 2, 3].map((i) => (
          <div className="skeleton" key={i} />
        ))}
      </div>
    </section>
  );
}
