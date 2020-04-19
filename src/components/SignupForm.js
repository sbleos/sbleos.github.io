import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PDF from "../assets/leo50a_en.pdf";
import { db } from '../firebase'; // add

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required")
});

export default class SignupForm extends React.Component {
  render() {
    return (
      <div>
        <h2>Join Now</h2>
        <p>Sign up to receive all club emails. If you are registered through MyLCI, you will be given access to a personal dashboard.</p>
        <div className="alert alert-info" role="alert">
          At the moment, you must add yourself to the mailing list <a href="https://groups.google.com/forum/#!forum/sbleoclub/join" className="alert-link" target='_blank' rel="noopener noreferrer">using this link</a>. We will soon automate the process.
        </div>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: ""}}
          validationSchema={EmailSchema}
          onSubmit={(values, actions) => {
            //
            db.collection('members').where("email","==",values.email).get()
            .then(function(querySnapshot) {
              if(querySnapshot.empty){
                setTimeout(()=>{
                  db.collection('members').add(values);
                  actions.setSubmitting(false);
                },500)
              }else
                alert("Email already exists in database");
            })
            .catch(function(error){});



          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <div className="form-row">
                <div className="form-group col-md-6 col-sm-12">
                  <Field type="text" name="firstName" placeholder="First Name" className="form-control"/>
                </div>
                <div className="form-group col-md-6 col-sm-12">
                  <Field type="text" name="lastName" placeholder="Last Name" className="form-control"/>
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

              <a href={PDF} style={{"margin":"1rem 0","display":"block"}} target='_blank' rel="noopener noreferrer">Registration form</a>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Get Started!"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

