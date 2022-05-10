import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import useFetchWithLogin from '../hook/useFetchWithLogin'
import { UserInfo, UsersRest } from '../types/rest'

const MainPage = () => {
  const data = useFetchWithLogin<UsersRest>({
    url: '/users',
    method: 'get'
  })

  if (data.isLoading) return <>Loading</>
  
  console.log(data.result)
  return (
    <div
      className='Main'
    >
      <div
        className='Main__container'
      >
      
        {data.result.users.map((value) => (
          <Accordion
            disableGutters
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{value.name} {value.surname}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div>Birthday: { dayjs(value.birthday).format('DD.MM.YYYY') }</div>
                <div>Email: { value.email }</div>
                <div>Works at: { value.profession }</div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
    </div>
  );
}

export default MainPage