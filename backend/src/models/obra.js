const {Model,DataTypes} = require('sequelize');
const { STRING, BOOLEAN } = require('sequelize');

class Obra extends Model{
    static init(connection){
        super.init({
            id:{ type:DataTypes.UUIDV4, primaryKey:true, field:'id', defaultValue:DataTypes.UUIDV4 },
            name:DataTypes.STRING,
            address:DataTypes.STRING,
            createdAt: { type: DataTypes.DATE, field: 'created_at' },
            updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
        },{
            tableName: 'obra', 
            freezeTableName: true,
            sequelize:connection,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        })
    }
    static associate(models){
        this.hasMany(models.Despesa,{foreignKey:'obra_id', as: 'despesas'});
    }
}

module.exports = Obra;