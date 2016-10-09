import connection from './connection';
import Sequelize from 'sequelize';

const ItemModel = connection.define('item', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bought: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  sold: {
    type: Sequelize.BIGINT,
    defaultValue: null,
  },
  soldOn: {
    type: Sequelize.DATE,
    defaultValue: null,
  },
  boughtOn: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
  paranoid: true,
});

export default ItemModel;
