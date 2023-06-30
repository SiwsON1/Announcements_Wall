import { Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import {Col, Button, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAdById } from "../../../redux/adsRedux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getUser } from "../../../redux/usersRedux";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { removeAdsRequest } from "../../../redux/adsRedux";
import { IMGS_URL } from "../../../config";
import { Navigate } from "react-router";
import '../../../styles/global.scss';
import { useNavigate} from "react-router";



const Ad = () => {
    
  const {id} = useParams();
  const ad = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const remove = e => {
    e.preventDefault();
    dispatch(removeAdsRequest(id))
    navigate("/");
  };
  console.log(ad);

  if(!ad) return <Navigate to="/" />

  return (
    <>
      <Col key={id}>
        <div className={"border border-2 rounded py-2 px-2 mx-1 mb-2"}> 
          <h3 className="text-center">{ad.title}</h3>
          <Card>
            <Card.Img variant="top" src={IMGS_URL + ad.image} className="big-photo" />
            <Card.Body>
              <Card.Text className="d-flex justify-content-between" >
            <div className="mt-3">
              <h4 className="small mb-3 "><b>Description: </b>{ad.content}</h4>
              <h4 className="small mb-3"><b>Date: </b>{ad.date}</h4>
              <h4 className="small mb-3"><b>Location: </b>{ad.location}</h4>
              <h4 className="small "><b>Price: </b>{ad.price}</h4>
            </div>
          <Card>
            <Card.Body>
              <h4 className="small"><b>Added by: </b>{ad.user === user ? "You" : ad.user}</h4>
              <h4 className="small"><b>Number: </b>{ad.userId.number}</h4>
              <div className='photoCover'>
                <img className="photo" src={IMGS_URL + ad.userId.avatar} alt="avatar" />
              </div>
            </Card.Body>
          </Card>
              </Card.Text>
              <Row>
            {user === ad.user && (<Nav.Link as={NavLink} className="col-2 text-decoration-none text-light px-1" key={ad._id} to={"/ad/edit/" + ad._id} >
                <Button type="submit" className="btn border-none bg-primary rounded p-2 w-100">Edit</Button>
                </Nav.Link>
              )}
              {user === ad.user && (<Button onClick={handleShow} className="col-2 btn border-danger bg-transparent py-0 mx-1">
                <p className="m-1 text-danger">Delete</p>
              </Button>)}
              </Row>
            </Card.Body>
          </Card>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              This action cannot be undone. 
              Do you want to proceed?
              </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary py-0 mx-1" onClick={handleClose}>
              <p className="m-2 text-light">Cancel</p>
              </button>
              <button className="btn btn-danger py-0 mx-1" onClick={remove}>
              <p className="m-2 text-light">Remove</p>
              </button>
            </Modal.Footer>
          </Modal>

        </div>
      </Col>
    </>
    );
  };
  
    export default Ad;