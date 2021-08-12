# React and Component Based Architecture

## Overview

Today we will be covering some new topics and reviewing concepts you should already be familiar with.

We will spend some time reviewing the concepts from the prework. We will also discuss several new and very important topics, `create-react-app` and component based architeture.

## Daily Plan

- Overview of 301
- Review of prework
- Discussion of `create-react-app`
- Discussion of component based architeture
- Introduction to code challenges
- Introduction of Code Challenge topic
- Lab Prep

## Learning Objectives

As as result of completing Lecture 1 of Code 301, students will: 

- Describe and Define:
  - Component Based Architeture
  - React
  - create-react-app
  - classes
  - arrow functions
- Gain an understanding of scope with arrow functions
- Gain an understanding of context, scope, "this", and the "new" keyword
- Gain an understanding of the core concepts of React and how to create a basic React application
- Be able to create a basic React application using `create-react-app`
- Understand component based architecture and be able to build a simple component based React appliction

## Notes

1. What is React?

1. What are components?

1. What is the difference between an arrow function and a function declaration?

1. Difference between constructor function and a class:
  ```javaScript
  // constructor
  function Cat(name) {
    this.name = name;
    this.fluffy = true;
  }

  Cat.prototype.speak = function(){
    console.log(`${this.name} says meow`);
  }

  // to make a new instance
  const bob = new Cat('bob');
  bob.speak();

  // class
  class Cat {
    constructor(name) {
      this.name = name;
      this.fluffy = true;
    }

    speak = () => console.log(`${this.name} says meow`);
  }

  // to make a new instance
  const bob = new Cat('bob');
  bob.speak();
  ```

1. Turning a function declaration into an arrow function:
  ```javaScript
  function doSomething(name) {
    // do something
  }

  doSomething = (name) => {
    // do something 
  }

  // or make it a one liner!
  doSomething = (name) => //do something
  ```

1. Basic React Component Structure:
  ```javaScript
  import React from 'react';

  class Something extends React.Component {
    render() {
      return(
        <h1>Header for Something</h1>
      )
    }
  }

  export default Something
  ```