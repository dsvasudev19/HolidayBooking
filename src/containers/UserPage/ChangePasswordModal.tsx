import { useEffect, useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import {  ToastContainer } from "react-toastify";



export interface IAppProps {}

export default function App({ user }: { user: any }) {
  const [data, setData] = useState<any>();

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    
  };

  return (
    <div>
      <ToastContainer />
      <div className="modal fade" tabIndex={-1} id="changePassword">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Details of Enquiry</h5>
              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></div>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={data}
                enableReinitialize={true}
                onSubmit={onSubmit}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className="fv-row mb-7">
                      <label className="required fs-6 fw-semibold mb-2">
                        Email
                      </label>
                      <Field
                        type="text"
                        id="message"
                        name="property"
                        value={user.email}
                        className="form-control form-control-white"
                        placeholder="Enter Message"
                        contentEditable={false}
                      />
                      <ErrorMessage
                        name="Property"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>
                    <div className="fv-row mb-7">
                      <label className="required fs-6 fw-semibold mb-2">
                        Old Password
                      </label>

                      <Field
                        type="text"
                        id="message"
                        name="oldPassword"
                        className="form-control form-control-white"
                        placeholder="Enter Message"
                        contentEditable={false}
                      />
                      <ErrorMessage
                        name="oldPassword"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>
                    <div className="fv-row mb-7">
                      <label className="required fs-6 fw-semibold mb-2">
                        New Password
                      </label>
                      <Field
                        type="text"
                        id="message"
                        name="newPassword"
                        className="form-control form-control-white"
                        placeholder="Enter Message"
                        contentEditable={false}
                      />
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>
                    <div className="fv-row mb-7">
                      <label className="required fs-6 fw-semibold mb-2">
                        Confirm Password
                      </label>
                      <Field
                        type="text"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control form-control-white"
                        placeholder="Enter Message"
                        contentEditable={false}
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>

                    
                    <div className="modal-footer">
                      <a
                        className="btn btn-light-danger me-3"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </a>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
