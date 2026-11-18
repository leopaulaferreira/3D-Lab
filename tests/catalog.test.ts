import { describe, it, expect } from "vitest";
import { filterProducts, products } from "../src/data/catalog";
import { money, whatsappLink } from "../src/lib/config";
describe("catálogo", () => {
  it("busca nomes e categorias", () => {
    expect(
      filterProducts(products, new URLSearchParams("q=TWIST")),
    ).toHaveLength(1);
    expect(
      filterProducts(products, new URLSearchParams("q=miniaturas")),
    ).toHaveLength(2);
  });
  it("combina filtros e trata vazio", () => {
    expect(
      filterProducts(
        products,
        new URLSearchParams("categoria=vasos&cor=Verde&personalizavel=sim"),
      ),
    ).toHaveLength(5);
    expect(
      filterProducts(products, new URLSearchParams("disponibilidade=sim")),
    ).toHaveLength(0);
    expect(
      filterProducts(products, new URLSearchParams("max=100")),
    ).toHaveLength(0);
  });
  it("ordena preços com consulta no fim", () => {
    const items = [
      { ...products[0], price: null },
      { ...products[1], price: 50 },
      { ...products[2], price: 10 },
    ];
    expect(
      filterProducts(items, new URLSearchParams("ordem=menor")).map(
        (p) => p.price,
      ),
    ).toEqual([10, 50, null]);
    expect(
      filterProducts(items, new URLSearchParams("ordem=maior")).map(
        (p) => p.price,
      ),
    ).toEqual([50, 10, null]);
  });
  it("formata reais", () =>
    expect(money(12.5).replace(/\s/g, " ")).toBe("R$ 12,50"));
  it("não inventa contato e codifica mensagem", () => {
    expect(whatsappLink("Olá", "")).toBeNull();
    expect(whatsappLink("Olá & oi", "5511999999999")).toBe(
      "https://wa.me/5511999999999?text=Ol%C3%A1%20%26%20oi",
    );
  });
});
