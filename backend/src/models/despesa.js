const { Model, DataTypes } = require('sequelize');
const { STRING, FLOAT, UUIDV4, BOOLEAN, DATE } = require('sequelize');

class Despesa extends Model {
    static init(connection) {
        super.init({
            id: { type: DataTypes.UUIDV4, primaryKey: true, field: 'id', defaultValue: DataTypes.UUIDV4 },
            obra_id: DataTypes.UUIDV4,
            value: DataTypes.FLOAT,
            description: DataTypes.STRING,
            date:DataTypes.DATE,
            createdAt: { type: DataTypes.DATE, field: 'created_at' },
            updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
        }, {
            tableName: 'despesa',
            freezeTableName: true,
            sequelize: connection,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        })
    }
    static associate(models) {
        this.belongsTo(models.Obra, { foreignKey: 'obra_id', as: 'obra' });
    }
}

module.exports = Despesa;