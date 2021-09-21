const Despesa = require('../models/despesa');
const Obra = require('../models/obra');


class DespesaService {
  static async getAll(req) {
    try {
      
      const limit = parseInt(req.query.size);
      const offset = 0 + (parseInt(req.query.page)) * limit
      
      const despesa = await Despesa.findAndCountAll({
        offset: offset,
        limit: limit,
        include: { association: 'obra' },
        order: [['date', 'ASC']]
      });

      const first = offset === 0;
      const last = offset+limit >= despesa.count;

      return {content:despesa.rows, first: first,last: last, number: parseInt(req.query.page), totalElements: despesa.count, totalPages: despesa.count/limit};

    } catch (error) {
      return error;
    }
  }

  static async getById(id) {
    try {
      const despesa = await Despesa.findOne({ where: { "id": id }, include: { association: 'obra' } });
      return despesa;
    } catch (error) {
      return error;
    }
  }

  static async create(body) {
    try {
      const obra = await Obra.findOne({ where: { "name": body.obra } });
      if (obra) {
        const { value, description, date } = body;
        const new_despesa = await Despesa.create({
          obra_id: obra.id,
          value: value,
          date: date,
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
      const obra = await Obra.findOne({ where: { "name": req.body.obra } });
      if (despesa && obra) {
        await Despesa.update(
          {
            value: req.body.value,
            description: req.body.description,
            obra_id: obra.id,
            date: req.body.date,
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