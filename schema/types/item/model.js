import connection from '../../connection';
import Sequelize from 'sequelize';

const Item = connection.define('item', {
  boughtOn: {
    type: Sequelize.DATE,
    allowNull: false,
    default: Sequelize.NOW,
  },
  soldOn: {
    type: Sequelize.DATE,
    default: null,
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

export default Item;
