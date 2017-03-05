/* @flow */
import Sequelize from 'sequelize';

const connection = new Sequelize('mysql:root@localhost/sequelized_tradingdb');

export default connection;
