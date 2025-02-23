import React, { useContext } from 'react';
import { UserContext } from '../../../Components/User/context/UserContext';
import { Card, Row, Col } from 'react-bootstrap';
import './info.css'
export default function Info() {
  const { user, loading } = useContext(UserContext);

  return (
    <>
      <h3 className="ms-2">Profile Info Page</h3>
      <Card className="ms-2 p-3 col-md-8">
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={4} className="text-center">
            {loading ? (
              "Loading image..."
            ) : user?.image?.secure_url ? (
              <img
                src={user.image.secure_url}
                alt="User profile"
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%'
                }}
              />
            ) : (
              <p>No image available</p>
            )}
          </Col>
          <Col xs={12} sm={12} md={6}>
            <h5 className="p-2">
              {loading ? "Loading..." : `Name: ${user?.userName}`}
            </h5>
            <h5 className="p-2">
              {loading ? "Loading..." : `Email: ${user?.email}`}
            </h5>
          </Col>
        </Row>
      </Card>
    </>
  );
}
