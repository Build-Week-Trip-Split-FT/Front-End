import React from 'react';
import { connect } from 'react-redux';

import ExampleComponent from './components/ExampleComponent';
import TripForm from './components/TripForm';
import { Route } from 'react-router-dom';

import './App.scss';



const App = (props) => {

  return (
    <div className="container">
      <Route exact path="/" component={TripForm} />
      <Route path="/events/:id/edit" component={TripForm} />
    </div>
  );
}

const mapStateToProps = state => (
  {
    title: state.title
  }
)

export default connect(mapStateToProps, {})(App);
