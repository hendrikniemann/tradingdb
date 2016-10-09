import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Item from './Item';

const compareFn = (a, b) => {
  if ((a.soldOn === null && b.soldOn === null) || (a.soldOn !== null && b.soldOn !== null)) {
    return b.boughtOn - a.boughtOn;
  }
  if (a.soldOn === null) {
    return -1;
  }
  return 1;
};

export class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = { extended: null };
    this.extend = id => this.setState({ extended: id });
  }

  render() {
    if (this.props.data.error) {
      return <div>{ this.props.data.error }</div>;
    }
    const { items } = this.props.data;
    if (this.props.data.loading && !items) {
      return <div>Loading items...</div>;
    }
    return (
      <div className="itemlist">
        {items.slice().sort(compareFn).map(item =>
          <Item
            {...item}
            key={item.id}
            extend={this.extend}
            extended={this.state.extended === item.id}
          />
        )}
      </div>
    );
  }
}

ItemList.propTypes = {
  data: PropTypes.shape({
    laoding: PropTypes.bool,
    items: PropTypes.arrayOf(
      PropTypes.shape(Item.propTypes)
    ),
  }).isRequired,
};

const ItemQuery = gql`query ItemQuery {
  items {
    __typename
    id
    description
    bought
    sold
    boughtOn
    soldOn
  }
}`;

const WrappedItemList = graphql(ItemQuery)(ItemList);

export default WrappedItemList;
