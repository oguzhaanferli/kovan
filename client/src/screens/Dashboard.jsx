import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Card, Alert, Table, Button, Placeholder, Modal, Form } from 'react-bootstrap';

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [ttlCount, setTTlCount] = useState();
  const [bikeTypes, setBikeTypes] = useState([]);
  const [bikeList, setBikeList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [searchBikeId, setSearchBikeId] = useState("");
  const [searchVehicleType, setSearchVehicleType] = useState("");

  const GET_BIKES = gql`
  query {
    bikes {
      ttl
      data {
        bikes {
          bike_id
          vehicle_type
          total_bookings
        }
      }
      total_count
    }
  }
`;
  const { data, loading, error } = useQuery(GET_BIKES);

  useEffect(() => {
    if (data) {
      setTTlCount(data.bikes.ttl);
      let typeList = [];
      data.bikes.data.bikes.filter(x => x != null && x.vehicle_type != null).map((item) => {
        if (!typeList.includes(item.vehicle_type)) typeList.push(item.vehicle_type);
      });
      setBikeTypes(typeList);
      setBikeList(data.bikes.data.bikes.filter(x => x != null))
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      if (ttlCount != undefined && ttlCount > -1) {
        if (ttlCount == 0) {
          window.location.reload()
        }
        setTTlCount(ttlCount - 1);
      }
    }, 1000);
  }, [ttlCount]);

  useEffect(() => {
    _filter();
  }, [searchBikeId, searchVehicleType]);

  const _filter = () => {
    if (data != null) {
      var filterData = data.bikes.data.bikes.filter(x => x != null);
      if (searchBikeId != "") {
        filterData = filterData.filter(x => x.bike_id.toLowerCase().includes(searchBikeId.toLowerCase()))
      }
      if (searchVehicleType != "") {
        filterData = filterData.filter(x => x.vehicle_type == searchVehicleType);
      }
      setBikeList(filterData);
    }
  }

  return (
    <>

      <main role="main" className="container mt-5">
        {error ?
          <Alert key={"error"} variant={"error"}>
            {error.message}
          </Alert> : null
        }
        {loading ?
          <>
            <Placeholder xs={6} />
            <Placeholder className="w-75" /> <Placeholder style={{ width: '25%' }} />
          </> : null
        }
        {!loading && !error ?
          <Card>
            <Card.Header>
              <div className='row'>
                <div className='col-3'>
                  <Form.Control onChange={(event) => {
                    setSearchBikeId(event.target.value);
                  }} type="text" />
                </div>
                <div className='col-3'>
                  <Form.Select onChange={(event) => {
                    setSearchVehicleType(event.target.value);
                  }}>
                    {bikeTypes.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className='col-1'>
                  <span>TTL: {ttlCount}</span>
                </div>
                <div className='col-2'>
                  <span>Total Booking Count: {data.bikes.total_count}</span>
                </div>

              </div>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Bike ID</th>
                    <th>Vehicle Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    bikeList.map((item) => (
                      <tr key={item.bike_id}>
                        <td>{item.bike_id}</td>
                        <td>{item.vehicle_type}</td>
                        <td><Button variant="warning" onClick={handleShow}>View</Button></td>
                      </tr>

                    ))
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card> : null
        }
      </main>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    // {
    //   data.bikes.data.bikes((dog) => (
    //     <a key={dog.id} value={dog.breed}>
    //       {dog.breed}
    //     </a>
    //   ))
    // }
  );
}