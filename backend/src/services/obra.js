const Obra = require('../models/obra');

class ObraService {
  static async getAll() {
    try {
      const obra = await Obra.findAll({ raw: true });
      return obra;
    } catch (error) {
      return error;
    }
  };


  static async create(body) {
    try {
      const obra = await Obra.findOne({ where: { "name": body.name } });
      if (!obra) {
        const { name, address } = body;
        const new_obra = await Obra.create({
          name: name,
          address: address,
        });

        return new_obra;
      } else {
        return { 'msg': 'Esta obra já existe!' };
      }
    } catch (error) {
      return error;
    }

  };

  static async modify(req) {
    try {
      const obra = await Obra.findOne({ where: { "id": req.params.id } });
      if (obra) {
        await Obra.update(
          {
            name: req.body.name,
            address: req.body.address
          },
          { where: { "id": req.params.id } });
        const modify_obra = await Obra.findOne({ where: { "id": req.params.id } });
        return modify_obra;
      } else {
        return { 'msg': 'Esta obra não existe!' };
      }
    } catch (error) {
      return error;
    }
  };

  static async delete(id) {
    try {
      const obra = await Obra.findOne({ where: { "id": id } });
      if (obra) {
        await Obra.destroy({ where: { "id": id } });
        const delete_obra = await Obra.findOne({ where: { "id": id } });
        if (delete_obra) {
          return { 'msg': 'Obra não deletada!' };
        } else {
          return { 'msg': 'Obra deletada!' }
        }
      } else {
        return { 'msg': 'Esta obra não existe!' };
      }
    } catch (error) {
      return error;
    }
  }
};

module.exports = ObraService;