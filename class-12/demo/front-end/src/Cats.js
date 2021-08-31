import React from 'react';

class Cats extends React.Component {
  render() {
    return (
      <>
        {this.props.cats.length && this.props.cats.map((cat) => (
          <div key={cat._id}>
            {cat.name} ({cat.location}) <span onClick={() => this.props.onDelete(cat)}>[x]</span>
          </div>
        ))}
      </>
    )
  }
}

export default Cats;