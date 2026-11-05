# API de Tarefas — Código-base da Trilha de DevSecOps (SACI)

Esta é uma API REST simples de gerenciamento de tarefas (To-Do), em
Node.js + Express, usada como **projeto-alvo** ao longo dos Blocos 2 e 3 da
trilha de DevSecOps.

## Como rodar localmente

A partir da raiz do repositório, use Node.js 22:

```bash
cd app
npm ci --ignore-scripts
npm start
# API disponível em http://localhost:3000
```

## Limites do ambiente didático

A API ainda contém vulnerabilidades de estudo; consulte os [limites do Bloco 2](../bloco2/README.md#origem-e-limites). O endpoint raiz `/` ainda anuncia o filtro antigo `expr`; o contrato válido do roteador é `done`/`owner`, documentado abaixo.

## Como rodar com Docker

Execute os comandos abaixo dentro de `app/`. O Dockerfile publicado usa Node.js 14, enquanto o fluxo local e a CI usam Node.js 22. O contêiner não é validado pelo workflow atual e deve ser alinhado em uma alteração própria.

```bash
docker build -t task-api .
docker run -p 3000:3000 task-api
```

## Endpoints

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| GET | `/health` | Healthcheck (usado pelo Render) |
| GET | `/api/tasks` | Lista todas as tarefas |
| GET | `/api/tasks/:id` | Busca uma tarefa pelo id |
| POST | `/api/tasks` | Cria uma nova tarefa (`{ "title": "...", "owner": "..." }`) |
| PATCH | `/api/tasks/:id` | Atualiza uma tarefa |
| DELETE | `/api/tasks/:id` | Remove uma tarefa |
| GET | `/api/tasks/filter?done=false&owner=mentoria` | Filtro por conclusão e responsável |
| GET | `/api/ping?host=...` | Diagnóstico de rede |
| GET | `/api/files/:filename` | Lê um arquivo da pasta `uploads/` |

## Verificação local

Use Node.js 22 e execute `npm ci --ignore-scripts`, seguido de `npm test`. O filtro antigo `expr` foi removido por executar código recebido do usuário. Consulte o [README do Bloco 2](../bloco2/README.md) para a entrega de CI e os limites de segurança desta base didática.
