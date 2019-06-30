const catchServerErrors = fn => (req, res, next) => fn(req, res, next)
  .catch(error => res.status(500).json({ message: error.message }));

module.exports = catchServerErrors;
