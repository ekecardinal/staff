import React, { useState, useEffect } from 'react'
import { Grid, Box, TextField, Button } from '@mui/material'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  // signInWithEmailAndPassword,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

function Register() {
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/home')
      }, 1000)
    } else {
      navigate('/')
    }
  }, [auth.currentUser, navigate])

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  const registerUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        regEmail,
        regPassword
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  // const loginUser = async () => {
  //   try {
  //     const user = await signInWithEmailAndPassword(auth, regEmail, regPassword)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <h2>Welcome Please Register or Login</h2>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="password"
                id="password"
                fullWidth
                label="Password"
                name="password"
                onChange={(e) => setRegPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            onClick={registerUser}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Grid>
    </div>
  )
}

export default Register
