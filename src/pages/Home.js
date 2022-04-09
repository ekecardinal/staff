import React, { useState } from 'react'
import { Grid } from '@mui/material'
import Form from '../components/Form'
import StaffTable from '../components/Table'

function Home() {
  const [staffId, setStaffId] = useState('')
  const getStaffIdHandler = (id) => {
    console.log('the id', id)
    setStaffId(id)
  }
  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <h4>Staff Registration</h4>
        <Form id={staffId} setStaffId={setStaffId} />
        <StaffTable getStaffId={getStaffIdHandler} />
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  )
}

export default Home
