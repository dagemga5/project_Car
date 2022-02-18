import React from 'react';
import { Menu, Dropdown, Button, Col,Row} from 'antd'; 
import {Link} from 'react-router-dom';
function DefaultLayout(props) {

  const user = JSON.parse(localStorage.getItem('user'))
  const menu = (
    <Menu>
        <Menu.Item>
        <a href="/">
         Home
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="/userbookings">
         Bookings
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="/profile">
          Profile
        </a>
      </Menu.Item>
      <Menu.Item onClick={ () => {
        localStorage.removeItem('user');
        window.location.href='/login'
      }}>
        <li style={{color: 'red'}}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  return <div  className='homepage'>
      <div className="header bs1">
        <Row gutter={26} justify='center'>
          <Col lg={20} sm={24} xs={24}>
          <div className="d-flex justify-content-between">
   <h1 className='multicolortext'> <b> <Link to="/">መኪና.Rental</Link></b></h1>
   <Dropdown overlay={menu} placement="bottomCenter">
        <Button>{user.username}</Button>
      </Dropdown>
        </div> </Col>
        </Row>
       
      </div>
      <div className="content">
     {props.children}
      </div>

      <div className='footer text-center'>

        <hr />

        <p>Designed and Developed By</p>
        <p>Dagem</p>
      </div>
  </div>;
}

export default DefaultLayout;
