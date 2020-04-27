import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PDF from "../assets/leo50a_en.pdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { db, auth } from '../firebase';

const EmailSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required"),
  lastName: Yup.string()
    .required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .min(8, "Seems a bit short... try something longer")
    .max(16, "Woah there! Are you sure you can remember that? Try something shorter")
    // .matches("","Must be at least ...") Find a regex expression that works
    .required("Required")
});

export default class SignupForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      passwordHidden: true
    }
    this.togglePassword = this.togglePassword.bind(this);
  }

  togglePassword =() => {
    this.setState({ passwordHidden: !this.state.passwordHidden });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h2>Join Now</h2>
        <p>Sign up to receive all club emails. If you are registered through MyLCI, you will be given access to a personal dashboard.</p>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password:""}}
          validationSchema={EmailSchema}
          onSubmit={(values, actions) => {
            auth.createUserWithEmailAndPassword(values.email,values.password).then(credentials => {
              return db.collection('users').doc(credentials.user.uid).set({
                firstName: values.firstName,
                lastName: values.lastName,
                ID: 0,
                role: "Member"
              });
            }).then(() => {
              setTimeout(()=>{
                actions.setSubmitting(false);
              },500);
            }).catch((error) => {
              if(error.code === "auth/email-already-in-use")
                alert(error.message);
                actions.setSubmitting(false);
            })


          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <div className="form-row">
                <div className="form-group col-md-6 col-sm-12">
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className={`form-control ${
                      touched.firstName && errors.firstName ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="firstName"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group col-md-6 col-sm-12">
                  <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={`form-control ${
                      touched.lastName && errors.lastName ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="lastName"
                    className="invalid-feedback"
                  />
                </div>
              </div>


              <div className="form-group">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="email"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group input-group">
                <Field
                  type={this.state.passwordHidden ? "password" : "text"}
                  name="password"
                  placeholder="Password"
                  className={`form-control ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                />
                <div className="input-group-append text-center align-self-center">
                  <a type="button" className="btn btn-sm" onClick={this.togglePassword}><FontAwesomeIcon icon={this.state.passwordHidden ? faEye : faEyeSlash} style={{ color: 'rgb(89,89,98)' }} size="lg" /></a>
                </div>
                <ErrorMessage
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </div>

              <a href={PDF} className="d-block m-1" target='_blank' rel="noopener noreferrer">Registration form</a>
              <a href="https://groups.google.com/forum/#!forum/sbleoclub/join" className="d-block m-1" target='_blank' rel="noopener noreferrer">Mailing List</a>
              <a href="https://www.remind.com/join/sbleo" className="d-block m-1 pb-1" target='_blank' rel="noopener noreferrer">Remind SMS Notifications</a>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Get Started!"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

