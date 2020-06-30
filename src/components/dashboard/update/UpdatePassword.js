import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from 'react-redux'
import { updatePassword } from '../../../store/actions/authActions';

const UpdatePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Required"),
  newPassword: Yup.string()
    .required("Required")
    .min(8, "Seems a bit short... try something longer")
    .max(16, "Woah there! Are you sure you can remember that? Try something shorter"),
    // .matches("","Must be at least ...") Use same regex expression as SignUp.js,
  confirmNewPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("newPassword")], "Password does not match")
});


class Profile extends React.Component {
  render() {
    const { updatePassword } = this.props;
    var initialValues = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    }

    return (
      <div>
        <h3>Update Password</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={UpdatePasswordSchema}
          onSubmit={(values, actions) => {
            if(JSON.stringify(values) !== JSON.stringify(initialValues)){
              updatePassword(values.currentPassword,values.newPassword);
              actions.resetForm();
            }


            setTimeout(()=>{
              actions.setSubmitting(false);
            },250);
          }}
        >
          {({ touched, errors, isSubmitting, values }) => (
            <Form>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="currentPassword">Current Password</label>
                  <Field
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    className={`form-control ${
                      touched.currentPassword && errors.currentPassword ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="currentPassword"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="newPassword">New Password</label>
                  <Field
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className={`form-control ${
                      touched.newPassword && errors.newPassword ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="newPassword"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="confirmNewPassword">Confirm New Password</label>
                  <Field
                    type="password"
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    className={`form-control ${
                      touched.confirmNewPassword && errors.confirmNewPassword ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="confirmNewPassword"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
              {isSubmitting ? "Updating Password..." : "Update Password"}
              </button>

            </Form>
          )}
        </Formik>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (currentPassword, newPassword) => dispatch(updatePassword(currentPassword, newPassword))
  }
}

export default connect(null,mapDispatchToProps)(Profile);