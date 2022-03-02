import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(login(user))
      dispatch(setNotification('Logged in', 3))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label className='mt-3'>Password:</Form.Label>
        <Form.Control
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button className='mt-3' id='login-button' type='submit'>
          login
        </Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm
