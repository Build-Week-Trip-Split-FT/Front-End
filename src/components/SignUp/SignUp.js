import React, { useState } from "react";
import { Form, Input, Button } from "antd";

import { connect } from 'react-redux';
import { signUpUser } from '../../actions';

import './SignUp.scss';

const RegistrationForm = props => {
  const [user, setUser] = useState({ name: "", username: "", email: "", password: "" });

  const handleChanges = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.signUpUser(user);
        setUser({ name: "", username: "", email: "", password: "" });
        props.history.push("/");
      }
    });
  };
  
  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      {/* <Form.Item
        label={
          <span>
            Name&nbsp;
            <Tooltip title="What do you want others to call you?">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("name", {
          rules: [
            {
              required: true,
              message: "Please input your name!",
              whitespace: true
            }
          ]
        })(<Input name="name" onChange={e => handleChanges(e)} />)}
      </Form.Item> */}
      <Form.Item label="User name">
        {getFieldDecorator("username", {
          rules: [
            {
              required: true,
              message: "Please input a username!"
            }
          ]
        })(<Input name="username" onChange={e => handleChanges(e)} value={user.username}/>)}
      </Form.Item>

      {/* <Form.Item label="E-mail">
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]
        })(<Input name="email" onChange={e => handleChanges(e)} />)}
      </Form.Item> */}

      <Form.Item label="Password" hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Please input your password!"
            },
          ]
        })(<Input.Password name="password" onChange={e => handleChanges(e)} value={user.password}/>)}
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedRegistrationForm = Form.create({ name: "register" })(RegistrationForm);

export default connect(null, {signUpUser: signUpUser})(WrappedRegistrationForm);