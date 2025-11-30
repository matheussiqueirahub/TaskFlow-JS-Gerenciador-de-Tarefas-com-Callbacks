const tasks = [];

const addTask = function (description) {
  const title = (description || "").trim();
  if (!title) {
    console.log("Nenhuma tarefa adicionada. Informe um texto.");
    return;
  }
  tasks.push({ title, done: false });
  console.log(`Tarefa adicionada: ${title}`);
};

const listTasks = () => {
  if (tasks.length === 0) {
    console.log("Nenhuma tarefa cadastrada.");
    return;
  }
  console.log("----- Tarefas -----");
  tasks.forEach((task, index) => {
    const status = task.done ? "[x]" : "[ ]";
    console.log(`${index} ${status} ${task.title}`);
  });
};

const withTasks = (callback) => {
  if (typeof callback !== "function") {
    console.log("Callback inválido.");
    return;
  }
  callback(tasks);
};

const requestIndex = (message) => {
  if (tasks.length === 0) {
    console.log("Lista vazia. Adicione algo primeiro.");
    return null;
  }
  const input = prompt(message);
  if (input === null) {
    console.log("Operação cancelada.");
    return null;
  }
  const index = Number(input);
  if (!Number.isInteger(index) || index < 0 || index >= tasks.length) {
    console.log("Índice inválido.");
    return null;
  }
  return index;
};

const removeTask = (list) => {
  const index = requestIndex("Índice da tarefa para remover:");
  if (index === null) return;
  const [removed] = list.splice(index, 1);
  console.log(`Tarefa removida: ${removed.title}`);
};

const updateTask = (list) => {
  const index = requestIndex("Índice da tarefa para atualizar:");
  if (index === null) return;
  const newTitle = prompt("Novo texto da tarefa:");
  if (newTitle === null) {
    console.log("Atualização cancelada.");
    return;
  }
  const normalized = newTitle.trim();
  if (!normalized) {
    console.log("Texto vazio. Nada alterado.");
    return;
  }
  list[index].title = normalized;
  list[index].done = false;
  console.log(`Tarefa atualizada: ${normalized}`);
};

const completeTask = (list) => {
  const index = requestIndex("Índice da tarefa para concluir:");
  if (index === null) return;
  list[index].done = true;
  console.log(`Tarefa concluída: ${list[index].title}`);
};

const askAction = () =>
  prompt(
    [
      "Escolha uma ação:",
      "adicionar | listar | remover | atualizar | concluir | sair",
    ].join("\n")
  );

const runTaskFlow = () => {
  console.log("TaskFlow JS - fluxo iniciado. Use o botão para recomeçar sempre que quiser.");
  let running = true;
  while (running) {
    const input = askAction();
    if (input === null) {
      console.log("Execução encerrada pelo usuário.");
      break;
    }
    const action = input.trim().toLowerCase();
    switch (action) {
      case "adicionar":
      case "add": {
        const text = prompt("Digite a descrição da tarefa:");
        if (text === null) {
          console.log("Adição cancelada.");
          break;
        }
        addTask(text);
        break;
      }
      case "listar":
      case "list":
        listTasks();
        break;
      case "remover":
      case "remove":
        withTasks(removeTask);
        break;
      case "atualizar":
      case "update":
        withTasks(updateTask);
        break;
      case "concluir":
      case "done":
        withTasks(completeTask);
        break;
      case "sair":
      case "exit":
        running = false;
        console.log("Fluxo finalizado.");
        break;
      default:
        console.log("Ação inválida. Tente novamente.");
        break;
    }
    listTasks();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-taskflow");
  if (startButton) {
    startButton.addEventListener("click", () => runTaskFlow());
  }
});
