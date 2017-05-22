/* @flow */
import React from 'react';
import moment from 'moment';
import gql from 'graphql-tag';
import { List, Label, Button } from 'semantic-ui-react';

import castToK from '../utils/castToK';

export type ItemFragmentType = {
  id: number | string,
  description: string,
  boughtOn: string,
  soldOn: ?string,
  bought: number,
  sold: ?number,
};

const fragments = {
  ItemFragment: gql`
    fragment ItemFragment on Item {
      id
      description
      boughtOn
      soldOn
      bought
      sold
    }
  `,
};

export type ItemPropTypes = {
  item: ItemFragmentType,
};

const RoiLabel = ({ amount }: { amount: number }) => (
  <Label color={amount > 0 ? 'olive' : 'red'}>{amount}%</Label>
);

function Item({ item, extended, extend }: ItemPropTypes) {
  const { id, description, bought, sold, boughtOn } = item;
  const daysin = moment(boughtOn).fromNow();

  const roi = Math.floor(1000 / bought * 100) - 100;
  const descriptionText = `${daysin} for ${castToK(bought)}`;
  return (
    <List.Item>
      <List.Content floated="left">
        <List.Header>{description}</List.Header>
        <List.Description>{descriptionText}</List.Description>
      </List.Content>
      <List.Content floated="left">
        <RoiLabel amount={roi} />
      </List.Content>
      <List.Content floated="right">
        <Button basic circular icon="write" />
      </List.Content>
    </List.Item>
  );
}

Item.fragments = fragments;

export default Item;
