import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  width: 25%;
  height: 50vh;
  margin: 2rem auto;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12), 0 5px 2px rgba(0, 0, 0, 0.24);
`;

const UserContainer = styled.div`
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12), 0 5px 2px rgba(0, 0, 0, 0.24);
  color: #fff;
  font-family: "Comic Sans MS", cursive, sans-serif;
`;

const UserDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ListStyle = styled.div`
  list-style: none;
`;

// UserForm Component
const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);

  // useEffect Hook
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div>
      <Form>
        <FieldContainer>
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && <p>{errors.name}</p>}
          <Field type="email" name="email" placeholder="Email" />
          {touched.email && errors.email && <p>{errors.email}</p>}
          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && <p>{errors.password}</p>}
          <label>
            Terms of Service
            <Field
              type="checkbox"
              name="termsOfService"
              checked={values.termsOfService}
            />
          </label>
          <button>Submit</button>
        </FieldContainer>
      </Form>
      {/* Users Components */}
      <UserDiv>
        {users.map(user => (
          <UserContainer>
            <ul key={user.id}>
              <ListStyle>
                <li>Name:{user.name}</li>
                <li>Email: {user.email}</li>
                <li>Passowrd: {user.password}</li>
              </ListStyle>
            </ul>
          </UserContainer>
        ))}
      </UserDiv>
    </div>
  );
};

// Formik
const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, termsOfService }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      termsOfService: termsOfService || false
    };
  },

  // Form Validation
  validationSchema: Yup.object().shape({
    name: Yup.string().required(`You must must put a name mate!`),
    email: Yup.string()
      .email()
      .required(`You must include an email bro!`),
    password: Yup.string()
      .min(7)
      .required(`put at least 7 characters!`)
  }),

  // Axios .post
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(response => {
        setStatus(response.data);
        console.log(response.data);
      })
      .catch(error => console.log(error.response));
  }
})(UserForm);

console.log("This is the HOC", FormikUserForm);
export default FormikUserForm;
