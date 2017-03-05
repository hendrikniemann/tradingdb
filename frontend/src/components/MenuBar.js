import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import update from 'react-addons-update';

import castWithK from '../utils/castWithK';

const parseInput = str => ({
  description: str.split('@')[0].trim(),
  bought: castWithK(str.split('@')[1].trim()),
});

export function MenuBar({ mutate }) {
  let input;
  const addItem = () => {
    if (input.value.indexOf('@') >= 0) {
      const variables = parseInput(input.value);
      mutate({
        variables,
        optimisticResponse: {
          __typename: 'Mutation',
          createItem: {
            __typename: 'Item',
            id: '0',
            description: variables.description + 'x',
            bought: variables.bought,
            boughtOn: moment().format(),
            sold: null,
            soldOn: null,
          },
        },
        updateQueries: {
          ItemQuery: (prev, { mutationResult }) => {
            const newItem = mutationResult.data.createItem;
            return update(prev, {
              items: {
                $push: [newItem],
              },
            });
          },
        },
      });
    }
  };

  return (
    <div id="menu">
			<div>
				<input type="text" ref={ref => input = ref} />
				<div id="send" onClick={addItem}>
					<svg width="36px" height="36px">﻿
						<path fill="#E0E0E0" fillOpacity="1" strokeWidth="0.2" strokeLinejoin="round" d="M 10.87505, 15.625L 16.4167,21.1667L 25.1250,10.0834L 27.5,12.4584L 16.4167,25.9167L 8.5,18L 10.8751,16.625 Z "></path>
					</svg>
				</div>
				<div id="menu-click">
					<div id="menu-icon"></div>
				</div>
			</div>
		</div>
  );
}

export default graphql(gql`
  mutation newItem($description: String!, $bought: Int!) {
    createItem(description: $description, bought: $bought) {
      __typename
      id
      bought
      description
      sold
      boughtOn
      soldOn
    }
  }
`)(MenuBar);
