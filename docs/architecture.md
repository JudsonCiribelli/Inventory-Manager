**Arquitetura & Fluxo (Mermaid)**

Este diagrama descreve o fluxo principal da aplicação: páginas do frontend, rotas de API, camada de dados (Prisma) e o banco PostgreSQL.

```mermaid
flowchart LR
  subgraph Frontend
    A[Usuário] --> B[Pages: Dashboard]
    A --> C[Pages: Produtos]
    A --> D[Pages: Vendas]
    C --> C1[Form: Cadastrar/Editar Produto]
    D --> D1[Form: Criar Venda]
    B --> B1[Gráficos Interativos (Recharts)]
  end

  subgraph API
    C2[/api/products]
    D2[/api/sales]
    B2[/api/dashboard]
  end

  subgraph Server
    S1[Next.js App Router]
    S2[Data Access (app/_data-acess)]
    S3[lib/prisma.ts]
  end

  subgraph DB
    DB[(PostgreSQL)]
  end

  C1 --> C2
  D1 --> D2
  B1 --> B2

  C2 --> S1
  D2 --> S1
  B2 --> S1

  S1 --> S2
  S2 --> S3
  S3 --> DB

  %% Models
  subgraph Models
    M1[Product]
    M2[Sale]
    M3[SaleProduct]
  end

  S3 --> M1
  S3 --> M2
  S3 --> M3

  %% Flow notes
  classDef app fill:#f9f,stroke:#333,stroke-width:1px;
  class Frontend app;

  %% Additional interactions
  D2 -- atualiza estoque --> C2
  D2 -- cria SaleProduct --> M3
  B2 -- consulta agregações --> M1
  B2 -- consulta agregações --> M2

  style DB fill:#fff3bf,stroke:#333
```

Explicação curta:

- O usuário interage com páginas (Dashboard, Produtos, Vendas).
- Formulários enviam requisições para rotas de API sob `app/Api`.
- O Next.js App Router processa as requisições e usa a camada de data access (`app/_data-acess`) que chama `lib/prisma.ts`.
- `prisma` mapeia os modelos `Product`, `Sale` e `SaleProduct` para o banco PostgreSQL. Vendas criam registros em `Sale` e `SaleProduct` e reduzem o `stock` em `Product`.

Se quiser, eu posso:

- Gerar um diagrama mais detalhado (sequência) para o fluxo de criação de venda.
- Inserir o diagrama diretamente em outra página do README ou exportar como SVG.
