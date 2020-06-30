import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PDF from "../assets/leo50a_en.pdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { signUp } from '../store/actions/authActions';
import { withRouter } from 'react-router';


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

class SignUp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      passwordHidden: true
    }
    this.togglePassword = this.togglePassword.bind(this);
  }

  togglePassword = () => this.setState({ passwordHidden: !this.state.passwordHidden });


  render() {
    return (
      <div>
        <h2>Join Now</h2>
        <p>Sign up to receive all club emails. If you are registered through MyLCI, you will be given access to a personal dashboard.</p>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password:""}}
          validationSchema={EmailSchema}
          onSubmit={(values, actions) => {
          this.props.signUp(values);
          setTimeout(()=>{
            actions.setSubmitting(false);
            this.props.history.push('/dashboard');
          },250);

          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <div className="form-row">
                <div className="form-group col-md-6 col-sm-12">
                <label htmlFor="signUpFirstName">First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    id="signUpFirstName"
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
                  <label htmlFor="signUpLastName">Last Name</label>
                  <Field
                  type="text"
                  name="lastName"
                  id="signUpLastName"
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
                <label htmlFor="signUpEmail">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="signUpEmail"
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
                <label htmlFor="signUpPassword">Password</label>
                <div className="input-group">
                  <Field
                    type={this.state.passwordHidden ? "password" : "text"}
                    name="password"
                    id="signUpPassword"
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

              <div className="text-right mr-2 mt-2">
                <Link to="/dashboard"><small className="text-muted">Already have an account?</small></Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignUp));
