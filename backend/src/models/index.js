/* @flow */
import UserModel from './UserModel';
import ItemModel from './ItemModel';

UserModel.ItemModels = UserModel.hasMany(ItemModel);
ItemModel.UserModel = ItemModel.belongsTo(UserModel);

export { UserModel, ItemModel };
