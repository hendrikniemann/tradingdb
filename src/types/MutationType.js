import { GraphQLObjectType } from 'graphql';

import createItem from '../mutations/createItem';
import sellItem from '../mutations/sellItem';

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: () => ({
    createItem,
    sellItem,
  }),
});

export default MutationType;
