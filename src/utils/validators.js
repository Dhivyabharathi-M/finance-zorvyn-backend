const validateUser = (data) => {
  const errors = [];
  if (!data.name || typeof data.name !== 'string') errors.push('Name is required and must be a string.');
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) errors.push('Valid email is required.');
  if (!data.password || data.password.length < 6) errors.push('Password must be at least 6 characters.');
  return errors;
};

const validateRecord = (data) => {
  const errors = [];
  if (typeof data.amount !== 'number' || data.amount <= 0) errors.push('Amount must be a positive number.');
  if (!['income', 'expense'].includes(data.type)) errors.push('Type must be income or expense.');
  if (!data.category || typeof data.category !== 'string') errors.push('Category is required.');
  if (!data.date || !/\d{4}-\d{2}-\d{2}/.test(data.date)) errors.push('Valid date in YYYY-MM-DD format is required.');
  return errors;
};

module.exports = { validateUser, validateRecord };