# Auditoria e refinamento

## Base inspecionada

Next 16.4.6, React 19.3, TypeScript 5.9.3, Tailwind 4.3.3, RHF 7.92 e Zod 4.6.7. Dependências mantidas. Rotas server, formulário client e dados locais são adequados ao MVP; não há justificativa para reescrever a aplicação.

## Achados

- Home com ritmo repetitivo, espaços grandes e imagens sem relação com categorias.
- Quatro SVGs reutilizados nos dez produtos; galeria duplicava a mesma imagem.
- Cards com cores decorativas idênticas e estados comerciais fixos.
- Filtros ocupavam muito espaço, sem reset visível; busca sensível a acentos.
- Menu sem Escape, rótulo de fechamento e estado ativo em subrotas.
- Modais sem título acessível; formulário sem autocomplete e indicadores de erro em todos os campos.
- Metadata dinâmica sem canonical; favicon padrão Next.
- Catálogo, filtros por URL, formulário e rotas funcionais. Atendimento real depende de contatos; não há upload/backend, fotos reais ou estoque validado.

## Referências

Pesquisa estrutural: https://www.muuto.com/products/accessories/vases/ (categorias, filtros e resultado vazio), https://www.gantri.com/shop/all-lights (apresentação de objetos), https://printmorph.com/shop (categorias e encomendas). Consulta web textual, sem alegar auditoria visual desses sites. Nenhum ativo reutilizado.

## Direção

Preservar paleta. Composição editorial mais compacta, hero com conjunto original de estudos vetoriais, imagens coerentes por categoria, hierarquia de produto e cores nomeadas. Continuar a identificar ilustrações como conceitos não fabricados. Manter componentes e acesso a dados existentes, sem novas dependências.
