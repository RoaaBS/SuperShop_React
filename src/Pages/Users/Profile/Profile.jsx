import React from 'react'
import CustomeSidebar from '../../../Components/User/Sidebar/CustomeSidebar'
import { Outlet } from 'react-router-dom'
import { Container,Row,Col } from 'react-bootstrap'


export default function Profile() {
  return (
<> 
<Container fluid className='p-0'>
  <Row>
    <Col md={2}><CustomeSidebar/></Col>
    <Col md={8}><Outlet/></Col>
  </Row>
  </Container>

</>


  )
}
