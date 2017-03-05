/* @flow */
import Sequelize from 'sequelize';
import connection from './connection';

const UserModel = connection.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default UserModel;
