import { Sequelize } from 'sequelize';

// const password = process.env.DB_PASSWORD;
// const username = process.env.DB_USERNAME
// const databaseName = process.env.DB_NAME;
// const host = process.env.DB_HOST;

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


