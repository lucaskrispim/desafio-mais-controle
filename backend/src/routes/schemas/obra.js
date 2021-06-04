const obra = {
  name: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 20
      },
    },
    errorMessage: 'Campo nome inválido!',
  },
  address: {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        min: 5,
        max: 50
      },
    },
    errorMessage: 'Campo endereço inválido!',
  },
}

module.exports = obra;