const errorHandler = (err, req, res, next) => {
  console.error('❌ Erro capturado pelo Middleware:', err.stack || err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ocorreu um erro interno no servidor.';

  res.status(statusCode).json({
    error: message,
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;