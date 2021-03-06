import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createEvent } from '../../../store/actions/eventActions';
import { connect } from 'react-redux';
import Notifications from '../../Notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const EventSchema = Yup.object().shape({
  title: Yup.string()
    .required("Required"),
  date: Yup.date()
    .required("Required") //required so it is properly sorted
    .min(new Date(2015,0,1),"Please include a recent date"),
  formLink: Yup.string()
    .url("Please enter a valid URL (Add https://)")
});

class CreateEvent extends React.Component {

  render() {
    const formType = this.props.formType || "Event"; //possible values: "Event", "Meeting"
    return (
      <div>
        <div className="modal fade" id="createEvent" tabIndex="-1" role="dialog" aria-labelledby="createEventModal" aria-hidden="true">
          <Notifications location="topRight"/>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">{`Create ${formType}`}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <Formik
                initialValues={{ title: "", date: "", description: "", type: formType === "Event" ? "Community": "Meeting", defaultImage:false, imgDescription:"", formLink:"", formDescription: "" }}
                validationSchema={EventSchema}
                onSubmit={(values, actions) => {
                  if(values.defaultImage){
                    values.imgDescription = "";
                    if(values.image)
                      delete values.image;
                  }
                  if(!values.image)
                    delete values.image;

                  this.props.createEvent(values);
                  setTimeout(()=>{
                      actions.setSubmitting(false);
                      actions.resetForm();
                  },500);
                }}
              >
              {({ touched, errors, isSubmitting, setFieldValue, values }) => (
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
                        <label htmlFor="createEventDate">Date</label>
                        <Field
                          type="datetime-local"
                          name="date"
                          id="createEventDate"
                          className={`form-control ${
                            touched.date && errors.date ? "is-invalid" : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="date"
                          className="invalid-feedback"
                        />
                      </div>

                    </div>

                    <div className="form-row">
                      <div className={`form-group ${formType === "Event" ? "col-md-8" : "col-12"}`}>
                        <label htmlFor="createEventDescription">Description</label>
                        <Field
                          as="textarea"
                          type="text"
                          name="description"
                          id="createEventDescription"
                          className="form-control"
                          style={{resize:"none"}}
                          rows={3}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        {formType !== "Meeting" &&
                          <div>
                            <label htmlFor="createEventType">Type of Event</label>
                            <Field
                              as="select"
                              name="type"
                              id="createEventType"
                              className="custom-select"
                            >
                              <option value="Community">Community</option>
                              <option value="Diabetes">Diabetes</option>
                              <option value="Vision">Vision</option>
                              <option value="Hunger">Hunger</option>
                              <option value="Environment">Environment</option>
                              <option value="Childhood Cancer">Childhood Cancer</option>
                              <option value="Youth">Youth</option>
                              <option value="Humanitarian">Humanitarian</option>
                              <option value="Disaster Relief">Disaster Relief</option>
                            </Field>
                          </div>}
                        {values.type !== "Community" && values.type !== "Meeting" &&
                          <div>
                            <label>
                              <Field type="checkbox" name="defaultImage" className="mr-1"/>
                              Use default event type logo as image
                            </label>
                          </div>
                        }
                      </div>
                  </div>

                  {!values.defaultImage && values.type !== "Meeting" &&
                  <div className="form-group">
                    <label htmlFor="file">Image</label>
                    <div className="input-group ">
                      <div className="custom-file">
                        <input
                          type="file"
                          name="image"
                          accept='image/*'
                          className="custom-file-input"
                          onChange={(event) => {
                            setFieldValue("image", event.currentTarget.files[0]);
                          }}
                        />
                        <label className="custom-file-label" htmlFor="image">{values.image ? values.image.name : "Choose Image"}</label>
                      </div>
                      <div className="input-group-append text-center align-self-center">
                        <button
                          type="button"
                          className="btn sm"
                          disabled={isSubmitting}
                          aria-label="Remove Image"
                          onClick={() => {
                            setFieldValue("image", null);
                          }}
                        >
                          <FontAwesomeIcon icon="trash" style={{ color: 'rgb(89,89,98)' }} size="lg" />
                        </button>
                      </div>
                    </div>
                    <div className="form-row mt-2">
                      <div className="col-md-8">
                        <Thumbnail image={values.image} />
                      </div>
                      <ImageDescription image={values.image} />
                    </div>
                  </div>
                }


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
                      {isSubmitting ? "Creating..." : `Create New ${formType}!`}
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

class Thumbnail extends React.Component {
  state = {
    loading: false,
    thumbnail: undefined,
  };

  componentDidUpdate(prevProps) {
    const { image } = this.props;
    if (prevProps.image === image) { return; }

    if(image){
      this.setState({ loading: true }, () => {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState({ loading: false, thumbnail: reader.result });
        };

        reader.readAsDataURL(image);
      });
    }else
      this.setState({ loading: false, thumbnail: undefined });
  }

  render() {
    const { image } = this.props;
    const { loading, thumbnail } = this.state;

    if (!image) { return null; }

    return (
      <div className="text-center align-self-center">
        <img src={thumbnail}
        alt={image.name}
        className="img-thumbnail mt-2"
        style={{maxHeight:"200px",maxWidth:"200px"}}
        />
      </div>
    );
  }
}

class ImageDescription extends React.Component {

  render() {
    const { image } = this.props;

    if (!image) { return null; }

    return (
      <div className="form-group col-md-4">
      <label htmlFor="imgDescription">Image Description</label>
      <Field
        type="text"
        name="imgDescription"
        className="form-control"
      />
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

