import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from 'react-redux'
import { updateProfile } from '../../store/actions/profileActions';

const ProfileSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches("^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$","Must be a valid phone number"),
  dateOfBirth: Yup.string(),
  address: Yup.string(),
  city: Yup.string(),
  zipCode: Yup.string(),
  joinDate: Yup.date("")
   .min(new Date(2015,0,1),"Please include a recent date"),
});


class Profile extends React.Component {
  render() {
    const { profile, email } = this.props; //this is passed down as a prop, so there is no need to connect to redux
    console.log(profile.id);
    return (
      <div>
        <h2>Profile</h2>
        <Formik
          initialValues={{
            firstName: profile.firstName,
            lastName: profile.lastName,
            id: profile.id,
            email: email,
            dateOfBirth: profile.dateOfBirth,
            address: profile.address,
            city: profile.city,
            zipCode: profile.zipCode,
            phoneNumber: profile.phoneNumber,
            joinDate: profile.joinDate
          }}
          validationSchema={ProfileSchema}
          onSubmit={(values, actions) => {
            this.props.updateProfile(values);
            setTimeout(()=>{
              actions.setSubmitting(false);
            },250);
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  disabled={true}
                />
              </div>


              <div className="text-right">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
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