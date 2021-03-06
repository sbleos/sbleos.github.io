import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from 'react-redux'
import { updateProfile } from '../../../store/actions/profileActions';

const ProfileSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches("^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$","Please include a valid phone number"),
  address: Yup.string(),
  city: Yup.string(),
  zipCode: Yup.string(),
  joinDate: Yup.string(),
  dateOfBirth: Yup.date()
});


class Profile extends React.Component {
  render() {
    const { profile, email, updateProfile } = this.props; // profile is passed down as a prop, so there is no need to connect to redux
    var initialValues = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      position: profile.position,
      memberID: profile.memberID,
      email: email,
      dateOfBirth: profile.dateOfBirth,
      address: profile.address,
      city: profile.city,
      zipCode: profile.zipCode,
      phoneNumber: profile.phoneNumber,
      joinDate: profile.joinDate,
      start: profile.start,
      end: profile.end
    }

    return (
      <div>
        <h2>Profile</h2>
        { profile.memberID === "" &&
          <div className="alert alert-info" role="alert">
            <h4 className="alert-heading">Looks like the board has not verified your account yet.</h4>
            <p>You can get access to the rest of the dashboard once your account has been verified by the board. Please fill up your profile to speed up the process.</p>
          </div>
        }
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={(values, actions) => {
            if(JSON.stringify(values) !== JSON.stringify(initialValues)){
              updateProfile(values);
              initialValues = values;
            }

            setTimeout(()=>{
              actions.setSubmitting(false);
            },250);
          }}
        >
          {({ touched, errors, isSubmitting, values }) => (
            <Form>
              <div className="form-row">
                <div className="form-group col-6 col-md-2">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    className="form-control"
                    disabled={true}
                  />
                </div>
                <div className="form-group col-6 col-md-2">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    type="text"
                    name="lastName"
                    className="form-control"
                    disabled={true}
                  />
                </div>
                {values.position !== "Member" && <div className="form-group col-md-2">
                  <label htmlFor="position">Position</label>
                  <Field
                    type="text"
                    name="position"
                    className="form-control"
                    disabled={true}
                  />
                </div>}
              </div>

              <div className="form-row">
                <div className="form-group col-6 col-md-2">
                  <label htmlFor="memberID">Membership ID</label>
                  <Field
                    type="text"
                    name="memberID"
                    className="form-control"
                    disabled={true}
                  />
                </div>
                <div className="form-group col-6 col-md-2">
                  <label htmlFor="joinDate">Join Date</label>
                  <Field
                    type="text"
                    name="joinDate"
                    className="form-control"
                    disabled={true}
                  />
                </div>
                <div className="form-group col-6 col-md-2">
                  <label htmlFor="start">Start</label>
                  <Field
                    type="text"
                    name="start"
                    className="form-control"
                    disabled={true}
                  />
                </div>
                <div className="form-group col-6 col-md-2">
                  <label htmlFor="end">End</label>
                  <Field
                    type="text"
                    name="end"
                    className="form-control"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-sm-6 col-md-4">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    disabled={true}
                  />
                </div>
                <div className="form-group col-6 col-md-2">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder="555-555-5555"
                    className={`form-control ${
                    touched.phoneNumber && errors.phoneNumber ? "is-invalid" : ""
                  }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="phoneNumber"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group col-6 col-md-2">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <Field
                    type="date"
                    name="dateOfBirth"
                    className="form-control"
                  />
                </div>
              </div>


              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="address">Address</label>
                  <Field
                    type="text"
                    name="address"
                    className="form-control"
                  />
                </div>
                 <div className="form-group col-6 col-md-2">
                  <label htmlFor="city">City</label>
                  <Field
                    type="text"
                    name="city"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-6 col-md-2">
                  <label htmlFor="zipCode">Zip Code</label>
                  <Field
                    type="text"
                    name="zipCode"
                    className="form-control"
                  />
                </div>
              </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                {isSubmitting ? "Saving..." : "Save Changes"}
                </button>

            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.firebase.auth.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (updatedProfile) => dispatch(updateProfile(updatedProfile))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);