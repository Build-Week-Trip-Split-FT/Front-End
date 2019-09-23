import React from 'react';
import { connect } from 'react-redux';

import ExampleComponent from './components/ExampleComponent';
import styles from './App.scss';
import LoginWithFormik from "./components/Login/Login";

const App = (props) => {

  return (
    <div>
      <div className={styles.app}>
        Welcome To Trip Split
      </div>
      {props.title}
      <ExampleComponent />
      <LoginWithFormik/>
    </div>
  );
}

const mapStateToProps = state => (
  {
    title: state.title
  }
)

export default connect(mapStateToProps, {})(App);
