import React from 'react';
import { connect } from 'react-redux';

import ExampleComponent from './components/ExampleComponent';
import TripForm from './components/TripForm';

import styles from './App.module.scss';



const App = (props) => {

  return (
    <div>
      <TripForm />
    </div>
  );
}

const mapStateToProps = state => (
  {
    title: state.title
  }
)

export default connect(mapStateToProps, {})(App);
