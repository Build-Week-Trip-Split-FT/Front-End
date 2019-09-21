import React from 'react';
import { connect } from 'react-redux';
import ExampleComponent from './components/ExampleComponent';
import './App.scss';

const App = (props) => {

  return (
    <div className="App">
      Welcome To Trip Split
      {props.title}
      <ExampleComponent />
    </div>
  );
}

const mapStateToProps = state => (
  {
    title: state.title
  }
)

export default connect(mapStateToProps, {})(App);
