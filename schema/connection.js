import Sequelize from 'sequelize';

const Connection = new Sequelize('mysql:root@localhost/sequelized_tradingdb');

export default Connection;
