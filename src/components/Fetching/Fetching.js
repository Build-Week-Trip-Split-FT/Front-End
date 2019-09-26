import React from 'react';
import { Alert } from 'antd';
import { connect } from 'react-redux';

import './Fetching.scss';

const Fetching = (props) => {
  return (
    <>
      {props.isFetching && <Alert message="In progress" type="info" description={props.fetching_message} closable/>}
    </>
  )
}

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    fetching_message: state.fetching_message,
  }
};
export default connect(mapStateToProps,{})(Fetching);