import React from 'react';
import axios from 'axios';
import Cats from './Cats';
import CreateCat from './CreateCat';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

const SERVER = process.env.REACT_APP_SERVER;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
    }
  }

  componentDidMount() {
    this.fetchCats();
  }

  async fetchCats(location = null) {
    let apiUrl = `${SERVER}/cats`;

    if (location) {
      apiUrl += `?location=${location}`;
    }

    try {
      const response = await axios.get(apiUrl);
      this.setState({ cats: response.data });

    } catch (error) {
      console.log(error);
    }
  }

  handleLocationSubmit = (event) => {
    event.preventDefault();
    const location = event.target.location.value;
    console.log({ location });
    this.fetchCats(location);
  }

  handleCreate = async (catInfo) => {
    const apiUrl = `${SERVER}/cats`;
    const response = await axios.post(apiUrl, catInfo);
    const newCat = response.data;
    // React REALLY wants a NEW array when setting state
    const cats = [...this.state.cats, newCat];
    this.setState({ cats });
  };

  handleDelete = async (catToDelete) => {
    const apiUrl = `${SERVER}/cats/${catToDelete._id}`;
    await axios.delete(apiUrl);
    // deleted successfully
    // TODO: error checking
    const cats = this.state.cats.filter(candidate => candidate._id !== catToDelete._id);

    this.setState({ cats });

  };

  render() {
    return (
      <>
        <Router>
          <nav>
            <h1>World of Cats</h1>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/create">Create a Cat</NavLink>
          </nav>
          <Switch>
            <Route exact path="/">

              <div>
                <Cats cats={this.state.cats} onDelete={this.handleDelete} />
                <h2>Filter by location</h2>
                <form onSubmit={this.handleLocationSubmit}>
                  <input name="location" />
                  <button>ok</button>
                </form>
              </div>

            </Route>
            <Route path="/about">
              <h1>About Page Here</h1>
            </Route>
            <Route path="/create">
              <CreateCat onCreate={this.handleCreate} />
            </Route>

          </Switch>
        </Router>
      </>
    )
  }
}

export default App;
