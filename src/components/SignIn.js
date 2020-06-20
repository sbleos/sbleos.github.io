import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions';
import Notifications from './Notifications.js';
import { Redirect } from 'react-router-dom'

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .required("Required")
});

class SignIn extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      passwordHidden: true
    }
    this.togglePassword = this.togglePassword.bind(this);
  }

  togglePassword = () => this.setState({ passwordHidden: !this.state.passwordHidden });


  render() {
    const { profile } = this.props;

    if(!profile.isEmpty)
      return <Redirect to="/dashboard" />
    return (
      <div>
        <Notifications location="topRight"/>
          <div style={{height:"91vh",background:"radial-gradient(circle, gainsboro, lightsteelblue)"}}>
            <div className=" mx-auto pt-5" style={{maxWidth:"330px"}}>
            <h2 className="text-center">Sign in</h2>
            <Formik
              initialValues={{ email: "", password:""}}
              validationSchema={EmailSchema}
              onSubmit={(values, actions) => {
                this.props.signIn(values);
                actions.setSubmitting(false);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
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

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                      <Field
                        type={this.state.passwordHidden ? "password" : "text"}
                        name="password"
                        className={`form-control ${
                          touched.password && errors.password ? "is-invalid" : ""
                        }`}
                      />
                      <div className="input-group-append text-center align-self-center">
                        <button type="button" className="btn btn-sm" onClick={this.togglePassword}><FontAwesomeIcon icon={this.state.passwordHidden ? "eye-slash" : "eye"} style={{ color: 'rgb(89,89,98)' }} size="lg" /></button>
                      </div>
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      className="btn btn-outline-primary border-0"
                      disabled={isSubmitting}
                    >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>
                  </div>
                  <div className="text-right mr-2 mt-2">
                    <Link to="/"><small className="text-muted">Don't have an account?</small></Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
