export const serverLogger = (type, message) => {
  if (process.env.NODE_ENV === 'test') return;
  console.log(`[${type}] `, message);
};
