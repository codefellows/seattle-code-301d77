import { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: []
    }
  }

  getShoppingList = async () => {
    const API = 'http://localhost:3001';

    try {
      const shoppingListResponse = await axios.get(`${API}/shopping-list`);
      this.setState({ shoppingList: shoppingListResponse.data });
    } catch (error) {
      alert("Something went wrong!!!")
    }
  }

  render() {
    return (
      <>
        <button onClick={this.getShoppingList}>Get Shopping List</button>
        {this.state.shoppingList.length > 0 && this.state.shoppingList.map((item, idx) => (
          <div key={idx}>
            {item}
          </div>
        ))}
      </>
    )
  }
}

export default App;