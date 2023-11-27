import { Sequelize } from 'sequelize';
import pg from 'pg';

const {Pool} = pg;
const database = process.env.POSTGRESS_URL + '?sslmode=require';

export const pool = new Pool({connectionString: database});

export const sequelize = new Sequelize(database);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


