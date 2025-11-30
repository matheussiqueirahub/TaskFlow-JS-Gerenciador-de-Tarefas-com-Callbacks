import assert from "node:assert/strict";

const createMockPrompt = (inputs) => () => {
  const value = inputs.shift();
  return value === undefined ? null : value;
};

const makeLocalStorageMock = () => {
  const store = new Map();
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  };
};

const run = async () => {
  global.localStorage = makeLocalStorageMock();

  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));

  const module = await import("../src/taskflow.js");
  const {
    addTask,
    listTasks,
    withTasks,
    removeTask,
    updateTask,
    completeTask,
    tasks,
  } = module;

  const reset = () => tasks.splice(0, tasks.length);
  reset();

  addTask("Ler docs");
  assert.equal(tasks.length, 1);
  assert.equal(tasks[0].done, false);

  global.prompt = createMockPrompt(["0"]);
  withTasks(removeTask);
  assert.equal(tasks.length, 0);

  addTask("Primeira");
  global.prompt = createMockPrompt(["0", "Refatorar callback"]);
  withTasks(updateTask);
  assert.equal(tasks[0].title, "Refatorar callback");
  assert.equal(tasks[0].done, false);

  global.prompt = createMockPrompt(["0"]);
  withTasks(completeTask);
  assert.equal(tasks[0].done, true);

  const saved = JSON.parse(localStorage.getItem("taskflow-js/tasks"));
  assert.equal(saved.length, 1);
  assert.equal(saved[0].title, "Refatorar callback");
  assert.equal(saved[0].done, true);

  listTasks();
  assert.ok(logs.some((line) => line.includes("Refatorar callback")));

  console.log = originalLog;
  console.log("All tests passed");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
