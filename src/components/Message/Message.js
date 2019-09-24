import React from 'react';
import { Alert } from 'antd';
import { connect } from 'react-redux';

import './Message.scss';

const Message = (props) => {
  return (
    <>
      {props.error && <Alert message="Error" type="error" description={props.error_message} closable/>}
    </>
  )
}

const mapStateToProps = state => {
  return {
    error: state.error,
    error_message: state.error_message,
  }
};
export default connect(mapStateToProps,{})(Message);