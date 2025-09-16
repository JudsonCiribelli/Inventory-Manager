**Diagrama de sequência: Criação de Venda**

O diagrama abaixo descreve passo a passo o fluxo quando um usuário cria uma venda na aplicação.

```mermaid
sequenceDiagram
    participant U as Usuário (Browser)
    participant F as Frontend (Next.js)
    participant API as API Route (/api/sales)
    participant S as App Server (Data Access)
    participant P as Prisma Client
    participant DB as PostgreSQL

    U->>F: Abre formulário de nova venda
    F->>U: Exibe lista de produtos e formulário (quantidades)
    U->>F: Submete venda (produtos + quantidades)
    F->>API: POST /api/sales { items: [{productId, quantity, unitPrice}], date }
    API->>S: Valida payload (Zod)
    S->>P: Inicia transação
    P->>DB: CREATE Sale (date)
    loop para cada item
      P->>DB: CREATE SaleProduct (saleId, productId, unitPrice, quantity)
      P->>DB: UPDATE Product SET stock = stock - quantity WHERE id = productId
    end
    P->>S: Commit transaction
    S->>API: Retorna 201 Created com venda criada
    API->>F: Retorna resposta (resultado/ID)
    F->>U: Exibe confirmação e atualiza UI (tabelas e dashboard)

    Note right of P: Em caso de erro, a transação é revertida
```

Observações:

- A operação deve ser executada em transação para garantir consistência (criar sale + criar saleProducts + atualizar stock).
- Validação de entrada no servidor (Zod) é importante para evitar inconsistências.
