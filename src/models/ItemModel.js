import connection from './connection';
import Sequelize from 'sequelize';

const ItemModel = connection.define('item', {
  boughtOn: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  soldOn: {
    type: Sequelize.DATE,
    defaultValue: null,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bought: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
}, {
  paranoid: true,
});

export default ItemModel;
