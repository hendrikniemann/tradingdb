/* @flow */
const { connect, dbCreate, db } = require('rethinkdb');

module.exports = async function makeDb() {
  const connection = await connect({ host: 'localhost', port: 28015 });

  try {
    console.log('Trying to create database `tradingdb`');
    await dbCreate('tradingdb').run(connection);
  } catch (e) {
    console.log('Database already exists!');
  }

  try {
    console.log('Trying to create table `user`');
    await db('tradingdb').tableCreate('user').run(connection);
  } catch (e) {
    console.log('Table already exists!');
  }

  try {
    console.log('Trying to create table `item`');
    await db('tradingdb').tableCreate('item').run(connection);
  } catch (e) {
    console.log('Table already exists!');
  }

  await connection.close();
};

// Execute this file if it is run directly
if (require.main === module) {
  module.exports().then(() => {});
}
