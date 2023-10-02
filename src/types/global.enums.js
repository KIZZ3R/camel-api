const HttpStatus = {
  400: {
    statusCode: 400,
    message: 'Falha na requisição',
  },
  401: {
    statusCode: 401,
    message: 'Falha na autenticação',
  },
  403: {
    statusCode: 403,
    message: 'Recurso não autorizado',
  },
  404: {
    statusCode: 404,
    message: 'Recurso não encontrado',
  },
  409: {
    statusCode: 409,
    message: 'Recurso duplicado',
  },
  500: {
    statusCode: 500,
    message: 'Ocorreu um erro inesperado',
  },
}

export default HttpStatus
