import React, { useState } from 'react';
import { Form, Input, Icon, Button, Checkbox, DatePicker, Row, Col } from 'antd';

import "./TripForm.scss";

const TripForm = (props) => {
  let id = props.match.params.id;
  let status = (id ? "Edit" : "Add");
  let [trip, setTrip] = useState({name:""});
  let [validation, setValidation] = useState({name: {type: 'success', help: null}})
  
  const handleChange = (event) => {
    setTrip({name: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const validateField = (event) => {
    let val = trip[event.target.name];
    if (val.trim()) {
      setValidation({...validation, [event.target.name]: {type: 'success', help: null}})
    } else {
      setValidation({...validation, [event.target.name]: {type: 'error', help: 'Required'}})
    }
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  return (
    <div>
      This is the {status} trip form!
      <Form {...formItemLayout} onSubmit={(e) => handleSubmit(e)} className="trip-form">
        <Form.Item
          label="Destination:"
          validateStatus={validation.name.type}
          help={validation.name.help}
          name="name"
        >
          <Input
            className="field"
            prefix={<Icon type="paper-clip" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Trip Name"
            name="name"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => validateField(e)}
            value={trip.name}
          />
        </Form.Item>
        <Form.Item
          label="Date"
        >
          <DatePicker format="MM/DD/YYYY" />
        </Form.Item>
        <Form.Item label="In Progress">
          <Checkbox />
        </Form.Item>
        <Form.Item label="People">
          <Row>
            <Col span={16}>
              <Input
                name="name"
                placeholder="person"
              />
            </Col>
            <Col span={8}>
              Paid?: 
              <Checkbox />
            </Col>
          </Row>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Trip
        </Button>
      </Form>
    </div>
  )
}

export default TripForm;