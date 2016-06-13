import connection from '../../connection';
import Sequelize from 'sequelize';
import Item from '../item/model';

const User = connection.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.hasMany(Item);

export default User;
