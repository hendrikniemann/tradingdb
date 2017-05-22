/* @flow */
import React, { Component } from 'react';
import { Icon, Segment, Container, Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const { Input, Button } = Form;

type LoginState = {
  status: 'LOGGED_IN' | 'LOGGED_OUT',
  request: 'LOADING' | 'OK',
  error?: string,
  email?: string,
  password?: string,
}

export default class Login extends Component {
  state: LoginState
  email: HTMLInputElement
  password: HTMLInputElement

  constructor(props: null) {
    super(props);

    this.state = {
      status: 'LOGGED_OUT',
      request: 'OK',
    };

    (this: any).handleLoginClick = this.handleLoginClick.bind(this);
    (this: any).handleEmailChange = this.handleEmailChange.bind(this);
    (this: any).handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({ email: e.target.value });
    }
  }

  handlePasswordChange(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({ password: e.target.value });
    }
  }

  async handleLoginClick(e: Event) {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({ request: 'LOADING' });
    try {
      const result = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: new Headers({ 'content-type': 'application/json' }),
      });

      const { token } = await result.json();

      if (!token) {
        this.setState({
          request: 'OK',
          error: 'Wrong credentials!'
        });
      } else {
        localStorage.setItem('JWT', token);
        this.setState({ request: 'OK', status: 'LOGGED_IN' });
      }
    } catch(e) {
      this.setState({
        request: 'OK',
        error: 'An error occurred when trying to reach the login endpoint.'
      });
    }
  }

  render() {
    if (this.state.status === 'LOGGED_IN') {
      return <Redirect to="/" />
    }
    return (
      <Container>
        <Segment>
          <Form onSubmit={this.handleLoginClick} loading={this.state.request === 'LOADING'}>
            <Input onChange={this.handleEmailChange} fluid iconPosition='left' placeholder='Email'>
              <Icon name="at" />
              <input type="email" />
            </Input>
            <Input
              onChange={this.handlePasswordChange}
              fluid
              iconPosition="left"
              placeholder="Password">
              <Icon name="key" />
              <input type="password" />
            </Input>
            <Button primary fluid>Login</Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}
