import React, { useEffect, useState } from 'react'
import { Box, Grid, TextField, Button, Alert } from '@mui/material'
import StaffDataService from '../services/StaffServices'

function Form({ id, setStaffId }) {
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [salary, setSalary] = useState('')
  const [message, setMessage] = useState({ error: false, msg: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (!name || !department || !salary) {
      setMessage({ error: true, msg: 'All fields are required!...' })
      return
    }
    const newStaff = {
      name,
      department,
      salary,
    }
    try {
      if (id !== undefined && id !== '') {
        await StaffDataService.updateStaff(id, newStaff)
        setStaffId('')
        setMessage({ error: false, msg: 'Updated Successfully!' })
      } else {
        await StaffDataService.addStaff(newStaff)
        setMessage({ error: false, msg: 'New Staff Added Successfully!' })
      }
    } catch (error) {
      setMessage({ error: true, msg: error.message })
    }
    setName('')
    setDepartment('')
    setSalary('')
  }

  const editHandler = async () => {
    setMessage('')
    try {
      const docSnap = await StaffDataService.getStaff(id)
      setName(docSnap.data().name)
      setDepartment(docSnap.data().department)
      setSalary(docSnap.data().salary)
    } catch (error) {
      // setMessage({ error: true, msg: error.message })
    }
  }

  useEffect(() => {
    // console.log('na u know', id)
    if (id !== undefined || id !== '') {
      editHandler()
    }
  }, [id])

  return (
    <div>
      <Grid container>
        <Grid item xs={6} sm={6}>
          {message?.msg && (
            <Alert severity={message?.error ? 'error' : 'success'}>
              {message?.msg}
            </Alert>
          )}
        </Grid>
      </Grid>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="name"
              required
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Department"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              label="Salary"
              name="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, mr: 3 }}>
          Submit
        </Button>
      </Box>
    </div>
  )
}

export default Form
