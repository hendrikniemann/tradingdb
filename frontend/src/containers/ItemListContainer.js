/* @flow */
import React from 'react';
import { graphql, gql, compose } from 'react-apollo';

import Item, { type ItemFragmentType } from '../components/Item';
import ItemList from '../components/ItemList';

export const ItemQuery = gql`
  query ItemQuery {
    items {
      ...ItemFragment
    }
  }
  ${Item.fragments.ItemFragment}
`;

export type ItemListContainerPropTypes = {
  data: {
    loading: boolean,
    error?: any,
    items?: ItemFragmentType[],
  },
}

export function ItemListContainer(props: ItemListContainerPropTypes) {
  const { items, error } = props.data;
  if (error) {
    return <div>{error.toString()}</div>;
  }
  if (!items) {
    return <div>Loading items...</div>;
  }
  return <ItemList items={items} />
}

export default graphql(ItemQuery)(ItemListContainer);
