import React, { PropTypes } from 'react';
import cn from 'classnames';
import moment from 'moment';

import castToK from '../utils/castToK';

function Item({ id, description, boughtOn, soldOn, bought, sold, extended, extend }) {
  const daysin = moment(boughtOn).fromNow();

  if (sold !== null) {
    const roi = Math.floor(sold / bought * 100) - 100;
    return (
      <div className={cn('item', 'sold', { extended })} onClick={() => extend(id)}>
        <div className="text">{description}</div>
        <div className="daysin">{daysin}</div>
        <div className="rev">{castToK(sold)}</div>
        <div className="price">{castToK(bought)}</div>
        <div className={cn('roi', roi > 0 ? 'positive' : 'negative')}>{roi}%</div>
      </div>
    )
  }
  return (
    <div className={cn('item', 'onsale', { extended })} onClick={() => extend(id)}>
      <div className="text">{description}</div>
      <div className="daysin">{daysin}</div>
      <div className="rev"></div>
      <div className="price">{castToK(bought)}</div>
    </div>
  );
}

Item.propTypes = {
  description: PropTypes.string.isRequired,
  bought: PropTypes.number.isRequired,
  sold: PropTypes.number,
  boughtOn: PropTypes.string.isRequired,
  soldOn: PropTypes.string,
};

export default Item;
