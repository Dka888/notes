import { Sequelize } from 'sequelize';

const password = process.env.POSTGRESS_PASSWORD;
const username = process.env.POSTGRESS_USER;
const databaseName = process.env.POSTGRESS_DATABASE;
const host = process.env.POSTGRESS_HOST;

// export const sequelize = new Sequelize(username, databaseName, password, {
//   host,
//   dialect: 'postgres',
//   logging: false,
// });

 const database = process.env.POSTGRESS_URL + '?sslmode=require';

export const sequelize = new Sequelize(database);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


