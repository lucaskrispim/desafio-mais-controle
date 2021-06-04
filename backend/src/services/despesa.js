const Despesa = require('../models/despesa');
const Obra = require('../models/obra');


class DespesaService {
  static async getAll() {
    try {
      const despesa = await Despesa.findAll({ raw: true });
      return despesa;
    } catch (error) {
      return error;
    }
  }


  static async create(body) {
    try {
      const obra = await Obra.findOne({ where: { "name": body.obra } });
      if (obra) {
        const { value, description } = body;
        const new_despesa = await Despesa.create({
          obra_id: obra.id,
          obra_name: obra.name,
          value: value,
          description: description,
        });
        return new_despesa;
      } else {
        return { 'msg': 'Esta obra não existe!' };
      }
    } catch (error) {
      return error;
    }

  }

  static async modify(req) {

    try {
      const despesa = await Despesa.findOne({ where: { "id": req.params.id } });
      if (despesa) {

        await Despesa.update(
          {
            value: req.body.value,
            description: req.body.description
          },
          { where: { "id": req.params.id } });
        const modify_despesa = await Despesa.findOne({ where: { "id": req.params.id } });
        return modify_despesa;
      } else {
        return { 'msg': 'Esta despesa não existe!' };
      }
    } catch (error) {
      return error;
    }
  };

  static async delete(id) {
    try {
      const despesa = await Despesa.findOne({ where: { "id": id } });
      if (despesa) {
        await Despesa.destroy({ where: { "id": id } });
        const delete_despesa = await Despesa.findOne({ where: { "id": id } });
        if (delete_despesa) {
          return { 'msg': 'Despesa não foi deletada!' };
        } else {
          return { 'msg': 'Despesa deletada!' }
        }
      } else {
        return { 'msg': 'Esta despesa não existe!' };
      }
    } catch (error) {
      return error;
    }
  }
};

module.exports = DespesaService;