const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/tasks - lista todas as tarefas
router.get("/", (req, res) => {
  res.json(db.listTasks());
});

// GET /api/tasks/filter?done=true&owner=mentoria - filtros sem executar código.
router.get("/filter", (req, res) => {
  const { done, owner } = req.query;
  const allowed = new Set(["done", "owner"]);
  if (Object.keys(req.query).some((key) => !allowed.has(key)) ||
      (done === undefined && owner === undefined) ||
      (done !== undefined && done !== "true" && done !== "false") ||
      (owner !== undefined && (typeof owner !== "string" || owner.length > 100))) {
    return res.status(400).json({ error: "Use done=true|false e/ou owner (até 100 caracteres)" });
  }
  const result = db.listTasks().filter((task) =>
    (done === undefined || task.done === (done === "true")) &&
    (owner === undefined || task.owner === owner)
  );
  res.json(result);
});

// GET /api/tasks/:id - busca uma tarefa pelo id
router.get("/:id", (req, res) => {
  const task = db.getTask(req.params.id);
  if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
  res.json(task);
});

// POST /api/tasks - cria uma nova tarefa
router.post("/", (req, res) => {
  const { title, owner } = req.body;
  if (!title) return res.status(400).json({ error: "Campo 'title' é obrigatório" });
  const task = db.createTask({ title, owner });
  res.status(201).json(task);
});

// PATCH /api/tasks/:id - atualiza uma tarefa (ex: marcar como concluída)
router.patch("/:id", (req, res) => {
  const task = db.updateTask(req.params.id, req.body);
  if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
  res.json(task);
});

// DELETE /api/tasks/:id - remove uma tarefa
router.delete("/:id", (req, res) => {
  const ok = db.deleteTask(req.params.id);
  if (!ok) return res.status(404).json({ error: "Tarefa não encontrada" });
  res.status(204).end();
});

module.exports = router;
