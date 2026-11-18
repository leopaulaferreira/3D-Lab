# Lableo 3D
MVP de catálogo, portfólio demonstrativo e preparação de orçamento. Next.js App Router + TypeScript strict + Tailwind + React Hook Form/Zod. SVGs originais ilustrativos; não representam produtos fabricados.

## Rodar
Node 24 recomendado.
```
npm ci
cp .env.example .env.local
npm run dev
```
Abra http://localhost:3000. Configure contatos reais em `.env.local` (WhatsApp somente dígitos com país e DDD). Sem contato configurado, o formulário oferece cópia da mensagem. Não há transmissão, upload, pagamento ou armazenamento de pedidos. Variáveis públicas são incorporadas ao build: reconstrua após mudar.

## Validar
```
npm run build
npm run lint
npx tsc --noEmit
npx vitest run tests/catalog.test.ts
npx playwright install chromium
npx playwright test
```
Playwright inicia o servidor de produção; execute build antes. Screenshots em artifacts/. Não há garantias de Core Web Vitals sem medição no ambiente final.

## Manutenção
Marca e navegação: src/lib/config.ts. Dados tipados e acesso: src/data/catalog.ts. Substitua imagens e dados demonstrativos por informações verificadas antes do lançamento. Nunca publique modelos sem licença comercial. Configure domínio absoluto para sitemap e metadataBase. Sem dados estruturados comerciais enquanto não houver dados reais.

Limitações: ilustrações substitutas, galeria demonstrativa repete a imagem; contatos e domínio pendentes; sem backend e upload. Filtros responsivos recolhíveis usam HTML nativo. Não há painel administrativo. Política de privacidade inicial precisa refletir hospedagem e operação reais antes do lançamento comercial.
