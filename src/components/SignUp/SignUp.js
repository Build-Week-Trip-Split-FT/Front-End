import React, { useState } from "react";
import "./SignUp.scss";
import { Form, Input, Tooltip, Icon, Checkbox, Button } from "antd";

import { connect } from "react-redux";
import { signUpUser } from "../../actions";

const RegistrationForm = props => {
  const [confirmDirty, setConfirmDirty] = useState();

  const handleChanges = e => {
    setConfirmDirty({ ...confirmDirty, [e.target.name]: e.target.value });
    console.log(`this is confirmdirty`, confirmDirty);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.signUpUser(confirmDirty);
    setConfirmDirty({ name: "", username: "", email: "", password: "" });
    props.history.push(`/secret/${confirmDirty.username}`);
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
              message: "Please input your User name!"
            }
          ]
        })(<Input name="username" onChange={e => handleChanges(e)} />)}
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
            }
          ]
        })(<Input.Password name="password" onChange={e => handleChanges(e)} />)}
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default connect(
  null,
  { signUpUser: signUpUser }
)(WrappedRegistrationForm);
