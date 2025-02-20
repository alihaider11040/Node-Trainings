const { Sequelize } = require('sequelize');

const db = new Sequelize('test', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres', 'sqlite', etc.
  logging: false, // Disable logging for cleaner output
});


const connection =() =>{
    db.authenticate().then(()=>{
        console.log('Connection successful')
    }).catch(err =>{
        console.error('unable to connect', err.message)
    })
}

connection()
module.exports = db;
