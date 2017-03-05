/* @flow */
import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import gql from 'graphql-tag';

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

export type ItemPropType = {
  item: ItemFragmentType,
  extended: boolean,
  extend: (number | string) => any,
};

function Item({ item, extended, extend }: ItemPropType) {
  const { id, description, bought, sold, boughtOn } = item;
  const daysin = moment(boughtOn).fromNow();

  if (sold) {
    const roi = Math.floor(sold / bought * 100) - 100;
    return (
      <div className={classnames('item', 'sold', { extended })} onClick={() => extend(id)}>
        <div className="text">{description}</div>
        <div className="daysin">{daysin}</div>
        <div className="rev">{castToK(sold)}</div>
        <div className="price">{castToK(bought)}</div>
        <div className={classnames('roi', roi > 0 ? 'positive' : 'negative')}>{roi}%</div>
      </div>
    )
  }
  return (
    <div className={classnames('item', 'onsale', { extended })} onClick={() => extend(id)}>
      <div className="text">{description}</div>
      <div className="daysin">{daysin}</div>
      <div className="rev"></div>
      <div className="price">{castToK(bought)}</div>
    </div>
  );
}

Item.fragments = fragments;

export default Item;
