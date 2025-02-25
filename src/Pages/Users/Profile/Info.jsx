import React, { useContext } from 'react';
import { UserContext } from '../../../Components/User/context/UserContext';
import { Card, Row, Col } from 'react-bootstrap';
import './info.css';
import { SpinnerCircular } from 'spinners-react';

export default function Info() {
  const { user, loading } = useContext(UserContext);

  return (
    <div className='profile-container'>
      <h3 className="ms-2">Profile Info Page</h3>
      <Card className="ms-2 p-3">
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={4} className="text-center">
            {loading ? (
              "Loading image..."
            ) : user?.image?.secure_url ? (
              <img
                src={user.image.secure_url}
                alt="User profile"
                className="profile-image"
              />
            ) : (
              <p>No image available</p>
            )}
          </Col>
          <Col xs={12} sm={12} md={6}>
            <h5 className="p-2">
              {loading ? (
                <div className='d-flex justify-content-center align-item-center vh-100'>
                  <SpinnerCircular size={60} speed={100} thickness={100} color="blue" secondaryColor="lightgray" />
                </div>
              ) : `Name: ${user?.userName}`}
            </h5>
            <h5 className="p-2">
              {loading ? (
                <div className='d-flex justify-content-center align-item-center vh-100'>
                  <SpinnerCircular size={60} speed={100} thickness={100} color="blue" secondaryColor="lightgray" />
                </div>
              ) : `Email: ${user?.email}`}
            </h5>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
