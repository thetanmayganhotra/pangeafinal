import { Container, Form as FormInputField } from "react-bootstrap";
import { ReactComponent as FaFacebook } from "../../../Assets/react-icons/FaFacebook.svg";
import { ReactComponent as FaInstagram } from "../../../Assets/react-icons/FaInstagram.svg";
import { ReactComponent as FaTwitter } from "../../../Assets/react-icons/FaTwitter.svg";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ContactSuccess from "../../Modals/ContactSuccess/ContactSuccess";
import { useState } from "react";

const NewsLetter = () => {
  const [show, setShow] = useState(false);

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is Required"),
  });

  // formik
  const initialValues = {
    email: "",
  };
  const submitContactForm = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    setShow(true);
  };
  return (
    <>
      <section className="newsLetter">
        <Container>
          <div className="newsLetter_wrapper">
            <div className="section_info">
              {/* <p className="section_small_heading">Future of crypto</p> */}
              <h1>Pangea</h1>
              <h1>The Evolution Of Crypto! Stay updated!</h1>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submitContactForm}
            >
              {(formik) => {
                return (
                  <Form className="newsletter_form">
                    <FormInputField.Group className="mb-3">
                      <Field
                        type="email"
                        placeholder="Email Address"
                        className=" shadow-none form-control"
                        name="email"
                      />
                      <ErrorMessage component="span" name="email" />
                    </FormInputField.Group>

                    <button
                      disabled={
                        !(formik.dirty && formik.isValid) || formik.isSubmitting
                      }
                      className={
                        !(formik.dirty && formik.isValid) || formik.isSubmitting
                          ? "btn_brand btn_brand_disabled mb-3"
                          : "btn_brand mb-3"
                      }
                    >
                      subscribe
                    </button>
                  </Form>
                );
              }}
            </Formik>
            <div className="social_links">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </div>
          </div>
        </Container>
      </section>
      <ContactSuccess
        type="news_letter"
        show={show}
        handleClose={() => setShow(false)}
      />
    </>
  );
};

export default NewsLetter;
