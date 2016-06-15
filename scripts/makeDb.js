import connection from '../src/models/connection';

import '../src/models/';

connection.sync({ force: true })
  .then(() => console.log('Successfully created DB from Schema'))
  .catch(error => { throw error; });
