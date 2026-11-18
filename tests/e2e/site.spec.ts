import { test, expect } from "@playwright/test";
test("navegação, produto, busca e estado vazio", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Ideias que ganham forma." }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Explorar produtos", exact: true })
    .click();
  await page.getByLabel("Buscar", { exact: true }).fill("Twist");
  await page.getByRole("button", { name: "Aplicar" }).click();
  await expect(page.getByRole("heading", { name: "Vaso Twist" })).toBeVisible();
  await page.getByRole("heading", { name: "Vaso Twist" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Vaso Twist",
  );
  await page.goto("/produtos?q=nenhum");
  await expect(page.getByText("Nenhuma peça por aqui.")).toBeVisible();
  await page.goto("/produtos/inexistente");
  await expect(page.getByText("Essa forma ainda não existe.")).toBeVisible();
});
test("validação e preparação honesta", async ({ page }) => {
  await page.goto("/personalizados");
  await page.getByRole("button", { name: "Preparar solicitação" }).click();
  await expect(page.getByText("Informe seu nome")).toBeVisible();
  await page.getByLabel("Nome", { exact: true }).fill("Pessoa Teste");
  await page.getByLabel("E-mail", { exact: true }).fill("teste@example.com");
  await page.getByLabel("Tipo de projeto").selectOption("Projeto especial");
  await page
    .getByLabel("Descrição", { exact: true })
    .fill("Gostaria de uma peça personalizada para a sala.");
  await page.getByRole("button", { name: "Preparar solicitação" }).click();
  await expect(
    page.getByText("Mensagem preparada localmente. Ela ainda não foi enviada."),
  ).toBeVisible();
});
test("mobile sem overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Principal" }),
  ).toBeVisible();
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
});
test("desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
});
