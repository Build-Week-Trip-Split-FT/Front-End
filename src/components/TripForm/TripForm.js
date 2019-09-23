import React from 'react';
import { Form, Input, Icon, Button} from 'antd';

import "./TripForm.scss";



const TripForm = (props) => {
  let id = props.match.params.id;
  let status = (id ? "Edit" : "Add");
  const { getFieldDecorator } = props.form;
  return (
    <div>
      This is the {status} trip form!
      <Form>
        <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}

        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  )
}

export default Form.create()(TripForm);