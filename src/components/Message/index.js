import React from 'react';
import { Alert } from 'antd';
import { connect } from 'react-redux';

const Message = (props) => {
  return (
    <>
      {props.error && <Alert message="Error" description={props.error_message} onClose/>}
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