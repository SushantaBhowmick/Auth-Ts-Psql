import { DataTypes, Model, Sequelize } from "sequelize";

class User extends Model{
    public id!:number;
    public name!:string;
    public email!:string;
    public password!:string;

    public static initialize(sequelize:Sequelize):void{
        this.init({
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true
            },
            name:{
                type:DataTypes.STRING,
                allowNull:false,
            },
            email:{
                type:DataTypes.STRING,
                allowNull:false,
                unique:true,
            },
            password:{
                type:DataTypes.STRING,
                allowNull:false,
            },
        },{
            sequelize,
            tableName:"userts"
        })
    }

}

export default User;