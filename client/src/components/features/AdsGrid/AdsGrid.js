import AdSummary from "../AdsSummary/AdsSummary";
import { Col, Row } from "react-bootstrap";

const AdsGrid = ({ads}) => {

  if (ads.length === 0) return 'No ads to display'

  return (
    <Row xs={1} md={2} lg={3}>
      {ads.map(ad =>
        <Col key={ad._id}>
            <AdSummary {...ad} />
        </Col>
        )}
    </Row>
  );
};

  export default AdsGrid;