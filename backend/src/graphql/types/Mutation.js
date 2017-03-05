/* @flow */
import { GraphQLObjectType } from 'graphql';

import * as mutations from '../mutations';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: mutations,
});

export default Mutation;
