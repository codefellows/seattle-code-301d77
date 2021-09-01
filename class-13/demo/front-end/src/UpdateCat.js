import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

class UpdateCat extends React.Component {

  handleSubmit = event => {
    event.preventDefault();
    this.props.onUpdate({
      _id: this.props.cat._id,
      name: event.target.formName.value,
      color: event.target.formColor.value,
      location: event.target.formLocation.value,
      hasClaws: event.target.formClawsCheckbox.checked,
    });
  };


  handleClose = () => {
    this.props.onClose();
  }


  render() {

    if (!this.props.cat) return null;
    return (
      <Modal show={this.props.cat} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Kitty</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter cat name" defaultValue={this.props.cat.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control type="name" placeholder="Enter cat color" defaultValue={this.props.cat.color} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="name" placeholder="Enter cat location" defaultValue={this.props.cat.location} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formClawsCheckbox">
              <Form.Check type="checkbox" label="Has claws" defaultChecked={this.props.cat.hasClaws} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default UpdateCat;