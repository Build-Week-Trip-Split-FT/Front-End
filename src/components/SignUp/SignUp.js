import React from "react";
import { Form, Input, Button } from "antd";

import { connect } from "react-redux";
import { signUpUser } from "../../actions";

import "./SignUp.scss";

const RegistrationForm = props => {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.signUpUser(values);
        props.form.setFieldsValue({ username: "", password: "" });
        props.history.push(`/secret/${values.username}`);
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
    <div class="sign-up-container">
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <h2 className="sign-up">Sign Up</h2>

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
          })(<Input name="username" />)}
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
          })(<Input.Password name="password" />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default connect(
  null,
  { signUpUser: signUpUser }
)(WrappedRegistrationForm);
