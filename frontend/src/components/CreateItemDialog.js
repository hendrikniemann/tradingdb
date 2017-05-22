/* @flow */
import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { Modal, Form, Button } from 'semantic-ui-react';
import { ItemQuery } from '../containers/ItemListContainer';
import Item from './Item';

export type CreateItemDialogPropTypes = {
  open: boolean,
  createItem: (string, number) => void,
  onClose: Function,
};

export const CreateItemMutation = gql`
  mutation CreateItemMutation($description: String!, $bought: Int!) {
    createItem(description: $description, bought: $bought) {
      ...ItemFragment
    }
  }
  ${Item.fragments.ItemFragment}
`;

const onlyNumbers = (str: string) => str.match(/^[0-9]+$/);

export class CreateItemDialog extends Component {
  props: CreateItemDialogPropTypes
  state: { description: string, bought: string }
  onDescriptionChange: Event => any
  onBoughtChange: Event => any

  constructor(props: CreateItemDialogPropTypes) {
    super(props);

    this.state = {
      description: '',
      bought: '',
    };

    (this: any).onCreateButtonClick = this.onCreateButtonClick.bind(this);
    this.onDescriptionChange = this.onFieldChange.bind(this, 'description');
    this.onBoughtChange = this.onFieldChange.bind(this, 'bought');
  }

  onCreateButtonClick(event: Event) {
    event.preventDefault();
    if (onlyNumbers(this.state.bought)) {
      this.props.createItem(this.state.description, parseInt(this.state.bought, 10));
      this.props.onClose();
    }
  }

  onFieldChange(field: 'description' | 'bought', event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ [field]: event.target.value });
    }
  }

  render() {
    const { open, onClose } = this.props;
    const isBoughtValueInvalid = !onlyNumbers(this.state.bought);
    return (
      <Modal open={open} onClose={onClose}>
        <Modal.Header>Create a new item!</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              value={this.state.description}
              onChange={this.onDescriptionChange}
              label="Description"
            />
            <Form.Input
              value={this.state.bought}
              onChange={this.onBoughtChange}
              label="Gold spent"
              error={isBoughtValueInvalid}
            />
            <Button.Group>
              <Form.Button
                onClick={this.onCreateButtonClick}
                disabled={isBoughtValueInvalid || this.state.description === ''}
                positive
              >
                Create
              </Form.Button>
              <Button.Or />
              <Form.Button onClick={onClose}>Abort</Form.Button>
            </Button.Group>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default graphql(CreateItemMutation, {
  props: ({ mutate }) => ({
    createItem: (description: string, bought: number) => mutate({
      variables: { description, bought },
      update: (store, { data: { createItem } }) => {
        const data = store.readQuery({ query: ItemQuery });
        data.items.push(createItem);
        store.writeQuery({ query: ItemQuery, data });
      },
    }),
  }),
})(CreateItemDialog);
