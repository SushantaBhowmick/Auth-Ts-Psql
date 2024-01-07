import {Sequelize} from 'sequelize-typescript'
import User from './models/userModel'

export const Database = new Sequelize({
    database:'crud',
    username:'postgres',
    host:"localhost",
    port:5432,
    password:'abcd1234',
    dialect:'postgres',
})

User.initialize(Database)

//Database connection
Database.authenticate()
.then(()=>console.log('Database connected...'))
.catch((err)=>console.log("DBERROR",err))

// //Sync models with the database
// Database.sync({force:true}).then(()=>{
//     console.log('Tables Synced');
// }).catch((err)=>{
//     console.log('Error Syncing tables',err);
// })