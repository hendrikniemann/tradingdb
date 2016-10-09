import { GraphQLObjectType } from 'graphql';

import * as mutations from '../mutations';

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: mutations,
});

export default MutationType;
