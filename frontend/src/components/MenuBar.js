import React from 'react';
import { Container, Menu, Input, Icon } from 'semantic-ui-react';

export default function MenuBar() {
  return (
    <Menu borderless inverted style={{ borderRadius: 0 }}>
      <Container>
        <Menu.Item>
          <Icon name="bars" size="big" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search"/>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
