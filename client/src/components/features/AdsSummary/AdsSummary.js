import { NavLink } from 'react-router-dom';
import { Nav } from "react-bootstrap";
import { Col, Button, Card } from "react-bootstrap";
import { IMGS_URL } from "../../../config";


const AdSummary = ({title, image, location, _id}) => {

  return (
        <>
            <Col key={_id} className ="mb-2">
                <Card>
                    <Card.Img variant="top" src={IMGS_URL + image} className="grid-photo"/>  
            <Card.Title className="text-center" >
            {title}
            </Card.Title>
            <Card.Body>
            <Card.Text className="d-flex justify-content-between">
            <h4 className="small align-self-center"><b>Location: </b>{location}</h4>     
                        <Nav.Link as={NavLink} className="text-decoration-none text-light px-1" to={"/ad/" + _id}>
                            <Button type="submit" className="border border-none bg-primary rounded py-1">Read more</Button>
                        </Nav.Link>
            </Card.Text>
            </Card.Body>
            </Card>
            </Col>
        </>
  );
  };
  
    export default AdSummary;