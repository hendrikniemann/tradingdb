import Sequelize from 'sequelize';

const Connection = new Sequelize('mysql:root@localhost/tradingdb');

export default Connection;
