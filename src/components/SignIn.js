import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn, sendPasswordResetEmail } from '../store/actions/authActions';
import Notifications from './Notifications.js';
import { Redirect } from 'react-router-dom'

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .required("Required")
});

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required")
});

class SignIn extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      passwordHidden: true,
      resetPassword: false
    }

  }

  togglePassword = () => this.setState({ passwordHidden: !this.state.passwordHidden });
  resetPassword = () => this.setState({ resetPassword: !this.state.resetPassword });


  render() {
    const { profile, signIn, sendPasswordResetEmail } = this.props;
    const { resetPassword } = this.state;

    if(!profile.isEmpty)
      return <Redirect to="/dashboard" />
    return (
      <React.Fragment>
        <Notifications location="topRight" />
        <div style={{height:"calc(100vh - 10rem)",background:"radial-gradient(circle, gainsboro, lightsteelblue)"}}>
          <div className=" mx-auto pt-5" style={{maxWidth:"330px"}}>
            <h2 className="text-center">{!resetPassword ? "Sign In" :  "Password Reset"}</h2>
            <Formik
              initialValues={{ email: "", password:""}}
              validationSchema={!resetPassword ? EmailSchema : ResetPasswordSchema}
              onSubmit={(values, actions) => {
                if(!resetPassword)
                  signIn(values);
                else{
                  sendPasswordResetEmail(values.email);
                  actions.resetForm();
                }
                actions.setSubmitting(false);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form autoComplete="on">
                  <div className="form-group">
                    <label htmlFor="signInEmail">Email</label>
                    <Field
                      type="email"
                      name="email"
                      id="signInEmail"
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
                  {!resetPassword &&
                    <div className="form-group">
                      <label htmlFor="signInPassword">Password</label>
                      <div className="input-group">
                        <Field
                          type={this.state.passwordHidden ? "password" : "text"}
                          name="password"
                          id="signInPassword"
                          className={`form-control ${
                            touched.password && errors.password ? "is-invalid" : ""
                          }`}
                        />
                        <div className="input-group-append text-center align-self-center">
                          <button
                            type="button"
                            className="btn btn-sm"
                            onClick={this.togglePassword}
                            aria-label="Toggle password"
                          >
                            <FontAwesomeIcon icon={this.state.passwordHidden ? "eye-slash" : "eye"} style={{ color: 'rgb(89,89,98)' }} size="lg" />
                          </button>
                        </div>
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                  }

                  <div className="text-right">
                    <button
                      type="submit"
                      className="btn btn-outline-primary border-0"
                      disabled={isSubmitting}
                    >
                    {!resetPassword
                     ? isSubmitting ? "Signing in..." : "Sign In"
                     : isSubmitting ? "Sending..." : "Send"
                    }
                    </button>
                  </div>
                  <div className="text-right mt-2">
                    {!resetPassword &&
                      <div>
                        <button type="button" className="btn btn-link">
                          <Link to="/">
                            <small className="text-muted">Don't have an account?</small>
                          </Link>
                        </button>
                      </div>
                    }
                    <div>
                      <button type="button" className="btn btn-link" onClick={this.resetPassword}>
                        <small className="text-muted">{!resetPassword ? "Forgot your password?" : "Go back to login"}</small>
                      </button>
                    </div>
                  </div>

                </Form>
              )}
            </Formik>
          </div>
        </div>
      </React.Fragment>
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
    signIn: (credentials) => dispatch(signIn(credentials)),
    sendPasswordResetEmail: (emailAddress) => dispatch(sendPasswordResetEmail(emailAddress)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
