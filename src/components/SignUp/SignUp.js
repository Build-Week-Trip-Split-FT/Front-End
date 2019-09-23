import React, { useState } from "react";
import "./SignUp.scss";
import { Form, Input, Tooltip, Icon, Checkbox, Button } from "antd";

//// Functional Component

const RegistrationForm = props => {
  const [confirmDirty, setConfirmDirty] = useState();

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   props.form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //       console.log("Received values of form: ", values);
  //       console.log(values);
  //     }
  //   });
  // };

  const handleChanges = e => {
    setConfirmDirty({ ...confirmDirty, [e.target.name]: e.target.value });
    console.log(`this is confirmdirty`, confirmDirty);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("this is inputed data", confirmDirty);
    setConfirmDirty({ name: "", username: "", email: "", password: "" });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty({ confirmDirty: confirmDirty || !!value });
  };

  const compareToFirstPassword = (value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  // const handleWebsiteChange = value => {
  //   let autoCompleteResult;
  //   if (!value) {
  //     autoCompleteResult = [];
  //   } else {
  //     autoCompleteResult = [".com", ".org", ".net"].map(
  //       domain => `${value}${domain}`
  //     );
  //   }
  //   setConfirmDirty({ autoCompleteResult });
  // };

  // render()
  const { getFieldDecorator } = props.form;
  // const { autoCompleteResult } = this.state;

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
  // const prefixSelector = getFieldDecorator("prefix", {
  //   initialValue: "86"
  // })(
  //   <Select style={{ width: 70 }}>
  //     <Option value="86">+86</Option>
  //     <Option value="87">+87</Option>
  //   </Select>
  // );

  // const websiteOptions = autoCompleteResult.map(website => (
  //   <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
  // ));

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item
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
      </Form.Item>
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

      <Form.Item label="E-mail">
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
      </Form.Item>

      <Form.Item label="Password" hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Please input your password!"
            },
            {
              validator: validateToNextPassword
            }
          ]
        })(<Input.Password name="password" onChange={e => handleChanges(e)} />)}
      </Form.Item>

      <Form.Item label="Confirm Password" hasFeedback>
        {getFieldDecorator("confirm", {
          rules: [
            {
              required: true,
              message: "Please confirm your password!"
            },
            {
              validator: compareToFirstPassword
            }
          ]
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        {getFieldDecorator("agreement", {
          valuePropName: "checked"
        })(
          <Checkbox>
            I have read the <a href="#">agreement</a>
          </Checkbox>
        )}
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

export default WrappedRegistrationForm;

///////// CLASS COMPONENT //////////////////////

// const RegistrationForm = () => {
//   // state = {
//   //   confirmDirty: false,
//   //   autoCompleteResult: []
//   // };

//   const [confirmDirty, setConfirmDirty] = useState(false)

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFieldsAndScroll((err, values) => {
//       if (!err) {
//         console.log("Received values of form: ", values);
//       }
//     });
//   };

//   handleConfirmBlur = e => {
//     const { value } = e.target;
//     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
//   };

//   compareToFirstPassword = (value, callback) => {
//     const { form } = this.props;
//     if (value && value !== form.getFieldValue("password")) {
//       callback("Two passwords that you enter is inconsistent!");
//     } else {
//       callback();
//     }
//   };

//   validateToNextPassword = (value, callback) => {
//     const { form } = this.props;
//     if (value && this.state.confirmDirty) {
//       form.validateFields(["confirm"], { force: true });
//     }
//     callback();
//   };

//   handleWebsiteChange = value => {
//     let autoCompleteResult;
//     if (!value) {
//       autoCompleteResult = [];
//     } else {
//       autoCompleteResult = [".com", ".org", ".net"].map(
//         domain => `${value}${domain}`
//       );
//     }
//     this.setState({ autoCompleteResult });
//   };

//   render() {
//     const { getFieldDecorator } = this.props.form;
//     // const { autoCompleteResult } = this.state;

//     const formItemLayout = {
//       labelCol: {
//         xs: { span: 24 },
//         sm: { span: 8 }
//       },
//       wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 16 }
//       }
//     };
//     const tailFormItemLayout = {
//       wrapperCol: {
//         xs: {
//           span: 24,
//           offset: 0
//         },
//         sm: {
//           span: 16,
//           offset: 8
//         }
//       }
//     };
//     // const prefixSelector = getFieldDecorator("prefix", {
//     //   initialValue: "86"
//     // })(
//     //   <Select style={{ width: 70 }}>
//     //     <Option value="86">+86</Option>
//     //     <Option value="87">+87</Option>
//     //   </Select>
//     // );

//     // const websiteOptions = autoCompleteResult.map(website => (
//     //   <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
//     // ));

//     return (
//       <Form {...formItemLayout} onSubmit={this.handleSubmit}>
//         {/* <Form.Item label="User name">
//           {getFieldDecorator("username", {
//             rules: [
//               {
//                 type: "user-name",
//                 message: "The input is not valid User name!"
//               },
//               {
//                 required: true,
//                 message: "Please input your User name!"
//               }
//             ]
//           })(<Input />)}
//         </Form.Item> */}
//         <Form.Item
//           label={
//             <span>
//               Name&nbsp;
//               <Tooltip title="What do you want others to call you?">
//                 <Icon type="question-circle-o" />
//               </Tooltip>
//             </span>
//           }
//         >
//           {getFieldDecorator("name", {
//             rules: [
//               {
//                 required: true,
//                 message: "Please input your name!",
//                 whitespace: true
//               }
//             ]
//           })(<Input />)}
//         </Form.Item>
//         <Form.Item label="E-mail">
//           {getFieldDecorator("email", {
//             rules: [
//               {
//                 type: "email",
//                 message: "The input is not valid E-mail!"
//               },
//               {
//                 required: true,
//                 message: "Please input your E-mail!"
//               }
//             ]
//           })(<Input />)}
//         </Form.Item>
//         <Form.Item label="Password" hasFeedback>
//           {getFieldDecorator("password", {
//             rules: [
//               {
//                 required: true,
//                 message: "Please input your password!"
//               },
//               {
//                 validator: this.validateToNextPassword
//               }
//             ]
//           })(<Input.Password />)}
//         </Form.Item>
//         <Form.Item label="Confirm Password" hasFeedback>
//           {getFieldDecorator("confirm", {
//             rules: [
//               {
//                 required: true,
//                 message: "Please confirm your password!"
//               },
//               {
//                 validator: this.compareToFirstPassword
//               }
//             ]
//           })(<Input.Password onBlur={this.handleConfirmBlur} />)}
//         </Form.Item>

//         <Form.Item {...tailFormItemLayout}>
//           {getFieldDecorator("agreement", {
//             valuePropName: "checked"
//           })(
//             <Checkbox>
//               I have read the <a href="">agreement</a>
//             </Checkbox>
//           )}
//         </Form.Item>
//         <Form.Item {...tailFormItemLayout}>
//           <Button type="primary" htmlType="submit">
//             Register
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// }

// const WrappedRegistrationForm = Form.create({ name: "register" })(
//   RegistrationForm
// );

// export default WrappedRegistrationForm;
