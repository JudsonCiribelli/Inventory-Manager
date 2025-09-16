This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Inventory Manager

Inventory Manager é uma aplicação web construída com Next.js para gerenciar produtos, registrar vendas e visualizar um dashboard com métricas e gráficos interativos.

O projeto foi pensado para pequenas lojas ou para teste/estudo de um sistema simples de controle de estoque e vendas. Ele inclui: cadastro de produtos (com preço e estoque), registro de vendas (com múltiplos produtos por venda) e um painel (dashboard) com valores resumidos e gráficos.

**Principais funcionalidades**

- **Cadastrar produto:** adicionar produtos com nome, preço e quantidade em estoque.
- **Cadastrar venda:** criar uma venda composta por um ou mais itens (produto, quantidade, preço unitário), atualizar automaticamente o estoque.
- **Dashboard:** exibe métricas como total de vendas, receita total, número total de produtos, total em estoque e gráficos interativos de revenue/metrics.
- **Tabelas e ações:** listagem de produtos e vendas com ações (editar, excluir, visualizar detalhes).

**Tecnologias**

- **Framework:** Next.js 14 (App Router)
- **React 18** como biblioteca de UI
- **Prisma** como ORM com banco PostgreSQL (configurado via `DATABASE_URL`)
- **Tailwind CSS** para estilos
- **Recharts** para gráficos interativos
- **React Hook Form** + **Zod** para validação de formulários
- **Sonner**, **Radix UI** e componentes reutilizáveis para UI

Arquivos/arquitetura importantes

- `app/` — rotas e componentes da aplicação (páginas do dashboard, produtos e vendas)
- `app/Api/` — rotas de API para recursos (ex.: `products/route.ts`)
- `app/_data-acess/` — consultas para obter dados do Prisma (ex.: `get-products.ts`, `get-sales.ts`)
- `app/_helpers/` — utilitários como formatação de moeda
- `lib/prisma.ts` — cliente Prisma reutilizável
- `prisma/schema.prisma` — modelo do banco (Product, Sale, SaleProduct)

Banco de dados (Prisma)
O esquema Prisma (em `prisma/schema.prisma`) define as entidades principais:

- `Product` — produtos com `name`, `price` (Decimal) e `stock` (Int)
- `Sale` — venda com `date` e relação com `SaleProduct`
- `SaleProduct` — associação entre venda e produto com `unitPrice` e `quantity`

Requisitos de ambiente

- Node.js 18+ (recomendado)
- PostgreSQL (ou outro provedor compatível configurado via `DATABASE_URL`)

Variáveis de ambiente (exemplo `.env`)

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Instalação e execução (desenvolvimento)

1. Instale dependências:

```bash
npm install
```

2. Configure seu banco de dados e crie o arquivo `.env` com `DATABASE_URL`.

3. Rode as migrations do Prisma (após ajustar `prisma/schema.prisma` se necessário):

```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. Inicie a aplicação em modo desenvolvimento:

```bash
npm run dev
```

Uso principal (fluxo)

- Acesse `http://localhost:3000`.
- No menu `Produtos`, adicione um novo produto informando nome, preço e estoque.
- No menu `Vendas`, crie uma nova venda selecionando um ou mais produtos e suas quantidades; o sistema registra o `unitPrice` e reduz o `stock` do produto.
- Acesse o `Dashboard` para ver métricas (total de vendas, receita, produtos no estoque) e gráficos interativos.

Contribuições

- Fork do repositório e envie PRs.
- Abra issues para bugs ou para solicitar melhorias.

Observações e dicas de manutenção

- Garanta que o tipo `Decimal` do Prisma seja tratado apropriadamente no frontend (formatar para reais com o helper em `app/_helpers/Currency/currency.ts`).
- Para testes manuais rápidos, você pode usar um banco PostgreSQL local (ex.: via Docker) e popular alguns produtos via a interface.

Licença

- Este repositório não especifica uma licença no momento. Adicione uma `LICENSE` se for tornar o projeto público.

Se quiser, eu aplico um README em inglês também, ou adiciono seções de troubleshooting, deploy (Docker/Vercel) e scripts de seed para popular o banco automaticamente. Diga qual prefere.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Diagramas de Arquitetura

- Sequência de criação de venda: `docs/sequence-create-sale.md` (diagrama Mermaid detalhado).
- Fluxo geral da aplicação: `docs/architecture.md` (diagrama Mermaid do fluxo).
