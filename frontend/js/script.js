const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTask = async () => {
  const response = await fetch('http://localhost:3333/tasks')
  const tasks = await response.json()
  return tasks
}

const addTask = async (event) => {
  event.preventDefault();

  const task = { title: inputTask.value };

  await fetch('http://localhost:3333/tasks', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  inputTask.value = '';

  loadTasks();
}

const formtDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };
  const date = new Date(dateUTC).toLocaleString('pt-br', options);
  return date;
}

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);

  if(innerText) {
    element.innerText = innerText;
  }

  if(innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element
}

const createSelect = (value) => {
  const options = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluida">concluída</option>
  `;

  const select = createElement('select', '', options);

  select.value = value;

  return select;
}

const createRow = (task) => {

  const { id, title, created_at, status } = task;

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', formtDate(created_at));
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);

  const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;

}

const loadTasks = async () => {
  const tasks = await fetchTask();

  tbody.innerHTML = '';

  tasks.forEach(task => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
}

addForm.addEventListener('submit', addTask);

loadTasks();