import Connection from '../schema/connection';

import '../schema/types/item/model';

Connection.sync({ force: true })
  .then(() => console.log('Successfully created DB from Schema'))
  .catch(error => { throw error; });
