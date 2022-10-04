<p>Este projeto foi desenvolvido por <a href="https://github.com/Istvanoliva">Istvan Oliva</a> enquanto estudava Desenvolvimento Back-end na <a href="https://www.betrybe.com/">Trybe</a> :rocket:</p>

# O que será desenvolvido

  Você vai desenvolver sua primeira API utilizando a arquitetura MSC (model-service-controller)!

  A API a ser construída é um sistema de gerenciamento de vendas em que será possível criar, visualizar, deletar e atualizar produtos e vendas.

  Você deverá utilizar o banco MySQL para a gestão de dados. Além disso, a API deve ser RESTful.
# Orientações

<details>
  <summary><strong>⚠️ Observações importantes</strong></summary><br />

  - A pessoa usuária, independente de cadastro ou login, deve conseguir:

    - Adicionar, ler, deletar e atualizar produtos no estoque;

    - Enviar vendas para o sistema e essas vendas devem validar se o produto em questão existe;

    - Ler, deletar e atualizar venda.

  - Para **todos os endpoints** garanta que:

    - Caso o recurso **não seja encontrado**, **aconteça um erro** ou **haja dados inválidos** na sua requisição, sua API deve retornar o status HTTP adequado com o body `{ message: <mensagem de erro> }`;

    - Todos os retornos de erro devem seguir o mesmo formato.

   <br />
 </details>

<details>
  <summary><strong>:whale: Rodando no Docker vs Localmente</strong></summary><br />

  ## Com Docker

  > Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
  - Esses serviços irão inicializar um container chamado `store_manager` e outro chamado `store_manager_db`;
  - A partir daqui você pode rodar o container `store_manager` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it store_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`

  ---

  ## Sem Docker

  > Instale as dependências [**Caso existam**] com `npm install`

  ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.

  ✨ **Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

  <br/>
</details>

<details>
  <summary><strong>📥 Todos os seus endpoints devem estar no padrão REST</strong></summary><br />

  - Use os verbos HTTP adequados para cada operação;

  - Agrupe e padronize suas URL em cada recurso;

  - Garanta que seus endpoints sempre retornem uma resposta, havendo sucesso nas operações ou não;

  - E retorne os códigos de status corretos (recurso criado, erro de validação, autorização, etc).

  <br />
</details>

<details>
  <summary><strong>🥞 Cada camada da sua API deve estar em seu respectivo diretório</strong></summary><br />

  Crie os seguintes diretórios **a partir da raiz do projeto** para representar cada uma das camadas da aplicação:

  - A camada **Models** deve estar no diretório de nome `models`;

  - A camada **Services** deve estar no diretório de nome `services`;

  - A camada **Controllers** deve estar no diretório de nome `controllers`;

  - A camada de **Middlewares** deve estar no diretório de nome `middlewares`.
  <br />
</details>

<details id="para-escrever-seus-própios-arquivos-de-teste">
  <summary><strong>🧰 Para escrever seus próprios arquivos de teste</strong></summary><br />

- Utilize o **mocha**, **chai** e **sinon** para escrever seus testes;

- E coloque todos os testes de `models`, `services` e `controllers` dentro da pasta `test/unit`.

  <br />
</details>

<details>
  <summary><strong>🎲 Conexão com o Banco</strong></summary><br />

:warning: **IMPORTANTE!**

```javascript
require('dotenv').config(); // não se esqueça de configurar suas variáveis de ambiente aqui na configuração

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});
```

  <br />
</details>

<details>
  <summary><strong>🖼 Tabelas</strong></summary><br />

Na raiz do projeto existe o arquivo `StoreManager.sql` que será usado para rodar os testes. Você pode importá-lo localmente para testar o comportamento da sua aplicação durante o desenvolvimento.

O banco terá três tabelas: `products`, `sales` e `sales_products`.

A tabela `products` tem o seguinte formato:

![Tabela Produtos](./public/tableproducts.png)

(O id será gerado automaticamente)

A tabela `sales` tem o seguinte formato:

![Tabela Vendas](./public/tablesales.png)

(O id e date são gerados automaticamente)

A tabela `sales_products`, é a tabela que faz o relacionamento `N:N` entre `products` e `sales` e tem o seguinte formato:

![Tabela Vendas-Produtos](./public/tablesalesproducts.png)

  <br />
</details>


# Requisitos Obrigatórios

## 1 - Escreva testes para cobrir 35% das camadas da sua aplicação

- Seus arquivos de teste devem ficar no diretório `test/unit`, **como citado [aqui](#para-escrever-seus-própios-arquivos-de-teste)**;

- Seus testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente você pode parar o serviço do `MYSQL` em sua máquina. Para rodar seus teste utilize `npm run test:mocha`;


## 2 - Crie endpoints para listar os produtos e as vendas

### :information_source: Para **Produtos**

- O endpoint para listar produtos deve ser acessível através do caminho (`/products`) e (`/products/:id`);

- Através do caminho `/products`, todos os produtos devem ser retornados;

- Através do caminho `/products/:id`, apenas o produto com o `id` presente na URL deve ser retornado;

- o resultado deve ser **ordernado** de forma crescente pelo campo `id`;


<br>

### :information_source: Para **Vendas**

- O endpoint para listar vendas deve ser acessível através do caminho (`/sales`) e (`/sales/:id`);

- Através do caminho `/sales`, todas as vendas devem ser retornadas;

- Através do caminho `/sales/:id`, apenas a venda com o `id` presente na URL deve ser retornada;

- o resultado deve ser **ordernado** de forma crescente pelo campo `saleId`, em caso de empate, **ordernar** também de forma crescente pelo campo `productId`;



## 3 - Crie middlewares de validação para as rotas `/products` e `/sales`

### :information_source: Para **Produtos**

- O endpoint de produtos deve ser acessível através do caminho (`/products`);

- Lembre-se, o banco de dados não deve ser acessado nas validações iniciais do corpo da requisição;

<br>

### :information_source: Para **Vendas**

- O endpoint de produtos deve ser acessível através do caminho (`/sales`);

- Lembre-se, o banco de dados não deve ser acessado nas validações iniciais do corpo da requisição;


## 4 - Crie um endpoint para o cadastro de produtos

- O endpoint deve ser acessível através do caminho (`/products`);

- Os produtos enviados devem ser salvos na tabela `products` do Banco de Dados;

- *Observe as regras de negócio e coloque na camada certa;*

## 5 - Crie um endpoint para atualizar um produto

- O endpoint deve ser acessível através do caminho (`/products/:id`);

- O corpo da requisição deve seguir a mesma estrutura do método responsável por adicionar um produto;

- Apenas o produto com o `id` presente na URL deve ser atualizado;

- *Observe as regras de negócio e coloque na camada certa;*


## 6 - Crie um endpoint para deletar um produto

- O endpoint deve ser acessível através do caminho (`/products/:id`);

- Apenas o produto com o `id` presente na URL deve ser deletado;

- *Observe as regras de negócio e coloque na camada certa;*


## 7 - Crie um endpoint para cadastrar vendas

- O endpoint deve ser acessível através do caminho (`/sales`);

- As vendas enviadas devem ser salvas na tabela `sales` e `sales_products` do Banco de dados;

- Deve ser possível cadastrar a venda de vários produtos através da uma mesma requisição;

- *Observe as regras de negócio e coloque na camada certa;*


## 8 - Crie um endpoint para atualizar uma venda

- O endpoint deve ser acessível através do caminho (`/sales/:id`);

- `quantity` deve ser um número inteiro maior que 0;

- Apenas a venda com o `id` presente na URL deve ser atualizada;

- *Observe as regras de negócio e coloque na camada certa;*


## 9 - Escreva testes para cobrir 40% das camadas da sua aplicação

- Seus arquivos de teste devem ficar no diretório `test/unit`, **como citado [aqui](#para-escrever-seus-própios-arquivos-de-teste)**

- Seus testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente você pode parar o serviço do `MYSQL` em sua máquina. Para rodar seus teste utilize `npm run test:mocha`;


# Requisitos Bônus

## 10 - Crie um endpoint para deletar uma venda

- O endpoint deve ser acessível através do caminho (`/sales/:id`);

- Apenas a venda com o `id` presente na URL deve ser deletado;

## 11 - Atualize a quantidade de produtos

- Ao realizar uma venda, atualizá-la ou deletá-la, você deve também atualizar a quantidade do produto em questão presente na tabela responsável pelos produtos;

  - **Exemplo 1**: suponha que haja um produto chamado *Bola de Futebol* e a sua propriedade `quantity` tenha o valor *10*. Caso seja feita uma venda com *8* unidades desse produto, a quantidade do produto deve ser atualizada para *2* , pois 10 - 8 = 2;
  - **Exemplo 2**: Suponha que esta venda tenha sido deletada, logo estas *8* unidades devem voltar ao `quantity` e seu valor voltará a *10*, pois 2 + 8 = 10;

## 12 - Valide a quantidade de produtos

- Um produto nunca deve ter a quantidade em estoque menor que 0;

- Quando uma venda for realizada, garanta que a quantidade sendo vendida está disponível no estoque

## 13 - Escreva testes para cobrir 50% das camadas da sua aplicação

- Seus arquivos de teste devem ficar no diretório `test/unit`, **como citado [aqui](#para-escrever-seus-própios-arquivos-de-teste)**;

- Seus testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente você pode parar o serviço do `MYSQL` em sua máquina. Para rodar seus teste utilize `npm run test:mocha`;


## 14 - Escreva testes para cobrir 60% das camadas da sua aplicação

- Seus arquivos de teste devem ficar no diretório `test/unit`, **como citado [aqui](#para-escrever-seus-própios-arquivos-de-teste)**;

- Seus testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente você pode parar o serviço do `MYSQL` em sua máquina. Para rodar seus teste utilize `npm run test:mocha`;

