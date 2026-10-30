const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { once } = require("node:events");
const app = require("../src/server");
let server;
let base;
before(async () => {
  server = http.createServer(app).listen(0, "127.0.0.1");
  await once(server, "listening");
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve, reject) => server.close((err) => err ? reject(err) : resolve())));

test("healthcheck e listagem continuam disponíveis", async () => {
  assert.equal((await (await fetch(`${base}/health`)).json()).status, "ok");
  assert.ok(Array.isArray(await (await fetch(`${base}/api/tasks`)).json()));
});
test("filtro aplica done e owner sem executar expressões", async () => {
  const res = await fetch(`${base}/api/tasks/filter?done=false&owner=mentoria`);
  assert.equal(res.status, 200);
  const tasks = await res.json();
  assert.ok(tasks.length > 0);
  assert.ok(tasks.every((t) => !t.done && t.owner === "mentoria"));
});
test("expressão maliciosa não é executada", async () => {
  delete global.__saciInjected;
  const expr = encodeURIComponent("global.__saciInjected = true");
  const res = await fetch(`${base}/api/tasks/filter?expr=${expr}`);
  assert.equal(res.status, 400);
  assert.equal(global.__saciInjected, undefined);
});
test("filtros inválidos são rejeitados", async () => {
  for (const query of ["", "done=invalid", "owner[a]=b", "owner=a&owner=b", "unknown=x"]) {
    assert.equal((await fetch(`${base}/api/tasks/filter?${query}`)).status, 400);
  }
});
test("arquivo permitido continua disponível", async () => {
  const res = await fetch(`${base}/api/files/bem-vindo.txt`);
  assert.equal(res.status, 200);
  assert.ok((await res.text()).length > 0);
});
test("tentativas de sair de uploads são rejeitadas", async () => {
  for (const filename of ["..%2Fpackage.json", "..%5Cpackage.json", ".env"]) {
    assert.equal((await fetch(`${base}/api/files/${filename}`)).status, 400);
  }
  assert.equal((await fetch(`${base}/api/files/inexistente.txt`)).status, 404);
});
