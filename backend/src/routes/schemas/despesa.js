const despesa = {
  value: {
    in: 'body',
    isFloat: true,
    isLength: {
      options: {
        min: 1,
        max: 20
      },
    },
    errorMessage: 'Campo valor inválido!',
  },
  description: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 30
      },
    },
    errorMessage: 'Campo descrição inválido!',
  },
  obra: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 20
      },
    },
    errorMessage: 'Campo endereço inválido!',
  },
}

module.exports = despesa;