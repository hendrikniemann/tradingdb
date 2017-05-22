import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import MenuBar from '../components/MenuBar';
import ItemListContainer from './ItemListContainer';
import CreateItemDialog from '../components/CreateItemDialog';

export const AddButton = (props: { onClick: Function }) => (
  <Button
    {...props}
    style={{ position: 'fixed', right: 30, bottom: 30 }}
    size="huge"
    circular
    color="green"
    icon="plus"
  />
);

export default class Overview extends Component {
  state: {
    createNewItem: boolean,
  }

  constructor(props: ItemListPropTypes) {
    super(props);

    this.state = { createNewItem: false };
    (this: any).handleCreateItemButtonClick = this.handleCreateItemButtonClick.bind(this);
    (this: any).handleCreateItemAbort = this.handleCreateItemAbort.bind(this);
  }

  handleCreateItemButtonClick() {
    this.setState({ createNewItem: true });
  }

  handleCreateItemAbort() {
    this.setState({ createNewItem: false });
  }

  render() {
    return (
      <div>
        <CreateItemDialog
          open={this.state.createNewItem}
          onClose={this.handleCreateItemAbort}
        />
        <AddButton onClick={this.handleCreateItemButtonClick} />
        <MenuBar />
        <ItemListContainer />
      </div>
    );
  }
}
