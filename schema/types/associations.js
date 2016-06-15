import UserModel from './user/UserModel';
import ItemModel from './item/ItemModel';

UserModel.hasMany(ItemModel);
ItemModel.belongsTo(UserModel);
