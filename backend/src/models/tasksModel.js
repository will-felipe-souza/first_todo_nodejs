const connection = require('./connection');

const getAll = async () => {
  const [ tasks ] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

const createTask =  async (task) => {
  const { title } = task;

  const query = 'INSERT INTO tasks (title, status) VALUES (?, ?)';

  const [ createdTask ] = await connection.execute(query, [title, 'pendente']);
  return {insertId: createdTask.insertId};
};

const deleteTask = async (id) => {
  const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
  return removedTask;
};

const updateTask = async (id, task) => {
  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

  const { title, status } = task;

  const [ updatedTask ] = await connection.execute(query, [title, status, id]);
  return updatedTask;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask
};