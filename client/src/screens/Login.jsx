import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const AUTHENTICATE = gql`
  mutation Authenticate($name: String!, $password: String!) {
    authenticate(name: $name, password: $password)
  }
`;
  const [addTodo, { data, loading, error }] = useMutation(AUTHENTICATE);

  const tokenControl = localStorage.getItem('token');
  if (tokenControl) {
    setToken(tokenControl);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    var data = await addTodo({ variables: { name: username, password: password } });
    let token = data.data.authenticate;
    localStorage.setItem('token', token)
    setToken(token);
  }

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (

    <>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" onChange={e => setUserName(e.target.value)} placeholder="Enter Username" />
            <Form.Text className="text-muted">
              username: admin
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <Form.Text className="text-muted">
              password: 123
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}