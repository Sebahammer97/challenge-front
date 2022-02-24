import { Button, LinearProgress, Stack } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { useNavigate, useLocation } from "react-router-dom";

import useAuth from "../components/context/useAuth";

// Summary: Show a form to be completed by the user, validate their credentials and
// if it is ok redirect the user to the home page
const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  return (
    <div className="login">
      <div className="login-form" aria-labelledby="login-form-title">
        <h1 id="login-form-title" className="login-form-title">
          TO-DO manager Log In
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            console.log(values);
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = "Required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              if (
                values.email !== "test@test.com" ||
                values.password !== "qwert"
              ) {
                alert("Invalid credetentials");
              } else {
                auth.signin(values.email, () => {
                  navigate(from, { replace: true });
                });
              }
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Stack
                className="fields"
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                />
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                />
                {isSubmitting && <LinearProgress />}
              </Stack>

              <Stack alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Log In
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
