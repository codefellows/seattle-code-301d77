import { Component } from 'react'
import beastImages from './data.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

function App() {
  console.log(beastImages);
  return (
    <div>
      <Header title="Beast Yay/Nay" />
      <Main message="Make Your Beast Opinion Known" />
    </div>
  );
}


function Header(props) {
  return <header><h1>Title here: {props.title}</h1></header>
}

class Main extends Component {
  render() {
    return (
      <Container>
        <h1>Message here: {this.props.message}</h1>
        <Row>
          <Col>
            <BeastImage image_url={beastImages[0].image_url} />
          </Col>
          <Col>
            <BeastImage image_url={beastImages[1].image_url} />
          </Col>
          <Col>
            <BeastImage image_url={beastImages[2].image_url} />
          </Col>
        </Row>
        <Row>
          <Col>
            <BeastImage image_url={beastImages[3].image_url} />
          </Col>
          <Col>
            <BeastImage image_url={beastImages[4].image_url} />
          </Col>
          <Col>
            <BeastImage image_url={beastImages[5].image_url} />
          </Col>
        </Row>

      </Container>
    );
  }
}

class BeastImage extends Component {

  constructor(props) {
    super(constructor);
    this.state = {
      "status": "Yay"
    }
  }

  handleClick = () => {
    const newStatus = this.state.status === "Nay" ? "Yay" : "Nay";
    this.setState({
      status: newStatus
    });
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <Image src={this.props.image_url} alt="some horned beast" rounded fluid />
        <p>{this.state.status}</p>
      </div>
    );
  }
}


export default App;
