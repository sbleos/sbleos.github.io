import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createEvent } from '../../../store/actions/eventActions';
import { connect } from 'react-redux';
import Notifications from '../../Notifications';


const EventSchema = Yup.object().shape({
  title: Yup.string()
    .required("Required"),
  date: Yup.date()
   .min(new Date(2015,0,1),"Please include a recent date"),
  formLink: Yup.string()
    .url("Please enter a valid URL (Add https://)")
});

class CreateEvent extends React.Component {

  render() {
    return (
      <div>

        <div className="modal fade" id="createEvent" tabIndex="-1" role="dialog" aria-labelledby="createEventModal" aria-hidden="true">
          <Notifications location="topRight"/>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Create Event</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <Formik
                initialValues={{ title: "", date: "", description: "", type:"", imgsrc:"", imgDescription:"", formLink:"", formDescription: "" }}
                validationSchema={EventSchema}
                onSubmit={(values, actions) => {
                  this.props.createEvent(values);
                  // this.props.createNotification({
                  //   title: "Created New Event",
                  //   message: `Created Event "${values.title}"`,
                  //   type: "success",
                  //   delay: 5000
                  // })
                  setTimeout(()=>{
                      actions.setSubmitting(false);
                      actions.resetForm();
                  },500);
                }}
              >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="modal-body">
                  <div className="form-row">
                    <div className="form-group col-md-5">
                      <label htmlFor="title">Title</label>
                      <Field
                        type="text"
                        name="title"
                        className={`form-control ${
                          touched.title && errors.title ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="title"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group col-md-7">
                      <label htmlFor="date">Date</label>
                      <Field
                        type="datetime-local"
                        name="date"
                        className="form-control"
                      />
                    </div>

                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field
                      as="textarea"
                      type="text"
                      name="description"
                      className="form-control"
                      style={{resize:"none"}}
                      rows={3}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-7">
                      <label htmlFor="formLink">Form Link</label>
                      <Field
                        type="text"
                        name="formLink"
                        placeholder="https://example.com/"
                        className={`form-control ${
                          touched.formLink && errors.formLink ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="formLink"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group col-md-5">
                      <label htmlFor="formDescription">Form Description</label>
                      <Field
                        type="text"
                        name="formDescription"
                        placeholder="Example"
                        className={`form-control ${
                          touched.formLink && errors.formLink ? "is-invalid" : ""
                        }`}
                      />
                    </div>
                  </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating..." : "Create New Event!"}
                    </button>
                  </div>
                </Form>
              )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (event) => dispatch(createEvent(event))
  }
}

export default connect(null, mapDispatchToProps)(CreateEvent);

