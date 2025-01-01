const logger = (state) => (next) => (action) => {
  return next(action);
};

export default logger;
