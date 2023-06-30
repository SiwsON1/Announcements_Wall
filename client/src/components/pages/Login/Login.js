import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux';

const Login = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password }),
      credentials: 'include'
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/login`, options)
    .then(res => {
      if(res.status === 200) {
        setStatus('success');
        dispatch(logIn({ login }));
      } else if (res.status === 400) {
        setStatus('clientError');
      } else {
        setStatus('serverError');
      }
    })
    .catch(err => {
      setStatus('serverError');
    });
  }

    return (
      <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>

      <h1>Sign in</h1>

      {status === "success" && (
          <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You've been successfully logged in.</p>
        </Alert>
        )}

        {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Incorrect Data</Alert.Heading>
          <p>Login or password are wrong.</p>
        </Alert>
        )}

        {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
        )}

        {status === "loading" && (
        <Spinner animation="border" role="status" className="block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        )}

        <Form.Group className="mb-3" controlId="formLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter Login" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" autoComplete='false' value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>

      </Form>
    );
  };
  
    export default Login;