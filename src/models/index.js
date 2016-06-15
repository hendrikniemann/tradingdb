import UserModel from './UserModel';
import ItemModel from './ItemModel';

UserModel.hasMany(ItemModel);
ItemModel.belongsTo(UserModel);

export { UserModel, ItemModel };
