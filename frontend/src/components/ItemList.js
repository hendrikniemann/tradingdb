/* @flow */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

import Item, { type ItemFragmentType } from './Item';

const ItemQuery = gql`
  query ItemQuery {
    items {
      ...ItemFragment
    }
  }
  ${Item.fragments.ItemFragment}
`;

const compareFn = (a: ItemFragmentType, b: ItemFragmentType) => {
  if ((a.sold === null && b.sold === null) || (a.sold !== null && b.sold !== null)) {
    return moment(a.boughtOn).isBefore(b.boughtOn) ? -1 : 1;
  }
  if (a.soldOn === null) {
    return -1;
  }
  return 1;
};

export type ItemListPropType = {
  data: {
    loading: boolean,
    error: ?any,
    items: ?ItemFragmentType[],
  },
}

export class ItemList extends Component {
  props: ItemListPropType

  state: {
    extended: string | number | null,
  }

  constructor(props: ItemListPropType) {
    super(props);

    this.state = { extended: null };
    (this: any).extend = this.extend.bind(this);
  }

  extend(id: number | string) {
    this.setState(({ extended }) => {
      if (extended === id) {
        return { extended: null }
      }
      return { extended: id };
    });
  }

  render() {
    const { items, error } = this.props.data;
    if (error) {
      return <div>{error.toString()}</div>;
    }
    if (!items) {
      return <div>Loading items...</div>;
    }
    return (
      <div className="itemlist">
        {items.slice().sort(compareFn).map(item =>
          <Item
            key={item.id}
            item={item}
            extend={this.extend}
            extended={this.state.extended === item.id}
          />
        )}
      </div>
    );
  }
}

export default graphql(ItemQuery)(ItemList);
