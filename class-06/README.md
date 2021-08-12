# Asynchronous Code and Third Party APIs

## Overview

Today we will explore third party APIs and how to request data from them.

## Daily Plan

- Warm-up exercise
- Review code challenges
- Introduction of today's code challenge topic
- Code review of lab assignment
- Third Party APIs/ Async and Await
- Code Demo
- Lab Preview

## Learning Objectives

As a result of completing Lecture 6 of Code 301, students will:

- Describe and Define: 
  - APIs
  - Postman
  - .env
  - Axios
  - async and await
  - Asynchronous Code
  - API keys
  - Queries
  - WRRC
  - Request
  - Response
- Understand third-party APIs
- Be able to gather information from APIs
- Use Postman to test routes
- Understand async and await

## Notes

1. What is an API?

1. What is asynchronous code and how does it relate to async and await?

1. Why do you need an API key?

1. What is Postman?

1. What is axios?

1. Making a variable in an .env file: `PORT=3000`
  - incorrect ways to make a variable in a .env file:
  `PORT = 3000`
  `PORT=3000;`
  `port=3000`

1. Making an API call:
  ```javaScript
  import React from 'react';
  import axios from 'axios';

  class App extends React.Component {
    
    // because it takes a while to get the information, we need to do an async and await in this function
    getPokemon = async () => {
      // this will go to the Pokemon API and get us a bunch of pokemon objects
      // the 'await' says "wait until I get back with the information that you asked for and then put it in a variable called 'pokemon'"
      const pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon');

      // axios returns a big object. The part of that object that has the pokemon in it is the .data
      const pokemonArray = pokemon.data;
    }

    render() {
      return(
        <button onClick={this.getPokemon}>Get Pokemon</button>
      )
    }
  }
  ```

1. Using a try/catch for error handling:
  ```javaScript
      getPokemon = async () => {
      try{
        const pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonArray = pokemon.data;
      } catch(err) {
        console.error(err);
      }
    }
  ```
  - you can wrap a try/catch around any code you want
  - it says, "try to run this code - if it doesn't work, then run the code in the catch block"