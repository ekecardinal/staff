import React, { useEffect, useState } from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material'
import StaffDataService from '../services/StaffServices'

function StaffTable({ getStaffId }) {
  const [staffs, setStaffs] = useState([])
  useEffect(() => {
    getStaff()
  }, [])

  const getStaff = async () => {
    const data = await StaffDataService.getAllStaff()
    // console.log(data.docs)
    setStaffs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const deleteHandler = async (id) => {
    await StaffDataService.deleteStaff(id)
    getStaff()
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(staffs, undefined, 2)}</pre> */}

      <TableContainer sx={{ maxHeight: 440 }}>
        <h4>{/* {totalStaffs} Staff {staffs.length > 1 && 's'} */}</h4>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>Staff Name</h3>
              </TableCell>
              <TableCell>
                <h3>Department</h3>
              </TableCell>
              <TableCell>
                <h3>Salary</h3>
              </TableCell>
              <TableCell>
                Action
                <Button
                  variant="contained"
                  sx={{ ml: 2, bgcolor: '#555d50' }}
                  onClick={getStaff}
                >
                  Refresh
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map((doc) => {
              return (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.department}</TableCell>
                  <TableCell>{doc.salary}</TableCell>
                  <TableCell>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2, mb: 1, mr: 1 }}
                      onClick={(e) => getStaffId(doc.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2, mb: 1 }}
                      onClick={(e) => deleteHandler(doc.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default StaffTable
