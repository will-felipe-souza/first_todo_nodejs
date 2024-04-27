const validateFieldTitle = (request, response, next) => {
  const { body } = request;

  if (body.title === undefined) {
    return response.status(400).json({ message: 'The field "title" is required' });
  }

  if (body.title.trim() === '') {
    return response.status(400).json({ message: 'title cannot be empty' });
  }

  next();
};

const validateFieldStatus = (request, response, next) => {
  const { body } = request;

  if (body.status === undefined) {
    return response.status(400).json({ message: 'The field "status" is required' });
  }

  if (body.status.trim() === '') {
    return response.status(400).json({ message: 'status cannot be empty' });
  }

  next();
};

module.exports = {
  validateFieldTitle,
  validateFieldStatus
};