# Carlos Santana Nunes — Portfólio

Portfólio pessoal em Nuxt 4, Vue e TypeScript, gerado como arquivos estáticos. Projeto independente do Domina Licita Gestão.

## Executar localmente

Requer Node.js 22 ou superior.

```sh
npm ci
npm run dev
```

Desenvolvimento em http://127.0.0.1:3100.

```sh
npm run typecheck
npm run generate
npm run preview
```

A prévia serve exatamente os arquivos gerados em `.output/public`. Não exige API, banco de dados, autenticação, ferramentas externas nem conexão com o Domina. As fontes são hospedadas no próprio site.

## Conteúdo e identidade

- `app/data/portfolio.ts`: conteúdo em português/inglês, contatos e experiências.
- `app/app.vue`: estrutura, idioma, navegação, case interativo e contato.
- `app/components/EngineeringGraphic.vue`: diagrama autoral da apresentação.
- `app/assets/css/main.css`: identidade visual e layouts responsivos.
- `public/carlos-santana-nunes-curriculo.pdf`: cópia do currículo com a data da nstech corrigida para outubro de 2026; o original foi preservado.
- `public/favicon.svg`, `public/social-card.svg` e `public/social-card.png`: identidade e imagem social.

O conteúdo usa o currículo fornecido. A saída da nstech em outubro de 2026 foi confirmada por Carlos. O diagrama do case é conceitual; não representa topologia interna nem uma captura de tela do produto. Não há métricas comerciais, depoimentos ou resultados inventados.

## Publicação futura na VPS

O site ainda não foi publicado. O domínio pessoal será escolhido depois da avaliação visual. Nenhuma configuração da VPS ou do Domina foi alterada.

Os arquivos `.output/public` podem ser servidos por qualquer servidor HTTP estático. Também estão preparados um Dockerfile multi-stage, `deploy/compose.yml`, uma configuração Nginx e um exemplo de bloco Caddy.

Antes de publicar:

1. Definir domínio, DNS e URLs canônicas. Atualizar `og:image` para a URL absoluta da imagem PNG de 1200×630 já incluída e gerar o sitemap com o domínio definitivo.
2. Conferir recursos, portas e a forma como o Caddy está executando. O exemplo usa Caddy no host e porta local 8095; não aplicar sem essa conferência.
3. Gerar/versionar a imagem do portfólio e manter seu deploy separado do SaaS. `docker compose -f deploy/compose.yml config` permite revisar a composição; a imagem não foi executada nem publicada nesta entrega.
4. Acrescentar somente o host do portfólio à configuração real do proxy, após backup e validação de sintaxe. Preservar os hosts existentes.
5. Validar HTTPS, fontes, PDF, idiomas, cache e navegação no domínio definitivo.

O container publica somente em loopback por padrão. O portfólio não usa segredos de aplicação. Não incluir arquivos de infraestrutura ou ambientes do Domina neste repositório.

## Validação da primeira versão — 24/10/2026

- `npm run typecheck`: aprovado.
- `npm run generate`: aprovado, com as rotas estáticas geradas. No Windows, o Nitro emite um aviso sobre `cache-driver.mjs`; a geração conclui e a prévia não registra erros de console.
- `docker compose -f deploy/compose.yml config --quiet`: aprovado. O container e o proxy de produção ainda não foram executados nesta entrega.
- HTTP: página, dez recursos referenciados e PDF responderam 200; rota inexistente respondeu 404. Todas as âncoras internas têm destino.
- Imagem social PNG validada em 1200×630.
- Revisão no navegador: português/inglês, persistência do idioma, menu mobile, troca de conteúdo do case e cópia de e-mail.
- Larguras de 360, 390, 768, 1024 px e desktop verificadas, sem rolagem horizontal. Inglês também conferido a 360 px.
- Textos HTML revisados por contraste calculado; sem falhas encontradas na verificação. Isso não substitui uma auditoria completa de acessibilidade.
- Cópia do currículo: data corrigida, texto extraído conferido e duas páginas renderizadas e inspecionadas. Original preservado.

As capturas de revisão ficam em `output/preview/`, ignorado pelo Git.
