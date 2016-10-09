/* eslint-disable no-console */
import connection from '../src/models/connection';
import { UserModel, ItemModel } from '../src/models/';

console.log('Create tables...');
connection.sync({ force: true })
  .then(() => {
    console.log('Successfully created tables.');
    console.log('Filling in data...');
    UserModel.create({
      email: 'hendrik@tradingdb.de',
      password: 'test',
      items: [
        {
          description: 'WK 99+14+21',
          bought: 120000000,
          sold: 140000000,
          soldOn: Date.now(),
        },
        {
          description: '45er Bow r7+8 cl',
          bought: 16000000,
        },
      ],
    }, {
      include: [{
        model: ItemModel,
        as: 'items',
      }],
    }).then(() => console.log('Data created.'));
  })
  .catch(error => { throw error; });
