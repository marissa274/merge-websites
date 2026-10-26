export function validateMessage(name, message) {
  const errors = {};
  if (!name.trim()) errors.sender = 'Please enter your name.';
  else if (name.trim().length > 100) errors.sender = 'Use 100 characters or fewer.';
  if (message.trim().length < 10) errors.message = 'Tell us a little more (at least 10 characters).';
  else if (message.trim().length > 2000) errors.message = 'Use 2,000 characters or fewer.';
  return errors;
}
export function createDraft(name, message) { return `Hello,\n\n${message.trim()}\n\nBest,\n${name.trim()}\n`; }
