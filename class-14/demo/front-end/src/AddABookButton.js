import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddABookButton extends React.Component {

  render() {
    return(
      <Button onClick={this.props.addABook}>Add a Book</Button>
    )
  }
}

export default AddABookButton;