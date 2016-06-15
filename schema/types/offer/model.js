import connection from '../../connection';
import Sequelize from 'sequelize';
import Item from '../item/ItemModel';

const Offer = connection.define('offer', {
  amount: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  setOn: {
    type: Sequelize.DATE,
    allowNull: false,
    default: Sequelize.NOW,
  },
});

Offer.belongsTo(Item);

export default Offer;
