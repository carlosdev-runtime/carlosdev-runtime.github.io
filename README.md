# Carlos Santana Nunes — Portfólio

Portfólio pessoal em Nuxt 4, Vue e TypeScript, gerado como arquivos estáticos. Projeto independente do Domina Licita Gestão.

Endereço de publicação: https://carlosdev-runtime.github.io/

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
npm run validate:static
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

## Publicação no GitHub Pages

Repositório público: `carlosdev-runtime/carlosdev-runtime.github.io`. A organização usa GitHub Free e tem a conta pessoal `CARLOSCSN` como proprietário. Configurar **Settings → Pages → Source → GitHub Actions**.

O preset `github-pages` produz HTML pré-renderizado e uma página 404. O caminho-base é `/`, sem prefixo de repositório, e falhas de pré-renderização interrompem o build. URLs canônicas, imagem social, dados estruturados, robots e sitemap usam o domínio definitivo.

`.github/workflows/pages.yml` instala com `npm ci`, verifica TypeScript, gera e valida antes de publicar. Pull requests para `main` validam; somente `main` publica. Alterações apenas em documentação não disparam build automático. Também é possível executar manualmente em Actions.

- Runners padrão `ubuntu-latest`; sem runners próprios ou infraestrutura externa.
- Cache npm identificado pelo lockfile; não armazena `node_modules` nem a saída do Nuxt.
- Actions oficiais fixadas por SHA; checkout sem credenciais persistidas.
- Build com leitura de conteúdo; deploy com `pages: write` e `id-token: write`.
- Ambiente `github-pages` e controle de concorrência por branch.
- Um artefato estático por publicação, retido por um dia; sem pacotes ou imagens Docker publicados.
- Autenticação temporária do workflow; nenhum PAT ou segredo de produção.

`validate:static` confere HTML pré-renderizado, base `/`, rotas, âncoras, recursos HTML/CSS/JavaScript, fontes, PDF, SEO, imagem social e orçamento de 50 MB. Arquivos ocultos inesperados, source maps e URLs locais na saída causam falha.

Pages público está disponível no GitHub Free para organizações, e runners padrão públicos são gratuitos. O cache incluído é de 10 GB por repositório e o pequeno artefato tem retenção de um dia. A publicação não depende de benefícios de um plano pessoal pago. Referências: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) e [cobrança do Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

Os exemplos opcionais de Docker e proxy em `deploy/` não são utilizados pelo Pages. Não incluir ambientes, credenciais, relatórios financeiros ou arquivos de outros projetos. Relatórios locais em `output/` são ignorados pelo Git.

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
