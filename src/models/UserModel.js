import connection from '../../connection';
import Sequelize from 'sequelize';

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
