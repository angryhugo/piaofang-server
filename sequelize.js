const Sequelize = require('sequelize');
const sequelize = new Sequelize('whatever', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const hupai = sequelize.define('hupai', {
    date: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.TEXT
    },
    tip: {
        type: Sequelize.STRING
    },
    distance: {
        type: Sequelize.INTEGER
    }
});

User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

User.findAll().then(users => {
  console.log(users)
})