import connection from '../../connection';
import Sequelize from 'sequelize';
import User from '../user/model';
import Offer from '../offer/model';

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

Item.belongsTo(User);
Item.hasMany(Offer);

export default Item;
