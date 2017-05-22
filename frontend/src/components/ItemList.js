/* @flow */
import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import moment from 'moment';
import { List, Container, Button } from 'semantic-ui-react';
import CreateItemDialog from './CreateItemDialog';

import Item, { type ItemFragmentType } from './Item';

const compareFn = (a: ItemFragmentType, b: ItemFragmentType) => {
  if ((a.sold === null && b.sold === null) || (a.sold !== null && b.sold !== null)) {
    return moment(a.boughtOn).isBefore(b.boughtOn) ? 1 : -1;
  }
  if (a.soldOn === null) {
    return -1;
  }
  return 1;
};

export type ItemListPropTypes = {
  items: ItemFragmentType[],
}

export default function ItemList(props: ItemListPropTypes) {
  return (
    <div>
      <Container>
        <List divided relaxed verticalAlign="middle">
          {props.items.slice().sort(compareFn).map(item =>
            <Item
              key={item.id}
              item={item}
            />
          )}
        </List>
      </Container>
    </div>
  );
}
