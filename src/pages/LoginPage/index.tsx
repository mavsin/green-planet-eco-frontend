import React, { lazy } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { Button } from "@material-tailwind/react";
import Container from "../../components/Container";
import { MSG_REQUIRED_FIELD } from "../../utils/constants";
import Input from "../../components/Input";
import useAlertMessage from "../../hooks/useAlertMessage";
import useLoading from "../../hooks/useLoading";
import api from "../../utils/api";
import { Link, Navigate } from "react-router-dom";

// ----------------------------------------------------------------------

const PageTitle = lazy(() => import("../../components/PageTitle"));

// -----------------------------------------------------------------------

interface IRequestData {
  email: string;
  password: string;
}

// -----------------------------------------------------------------------

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email type.").required(MSG_REQUIRED_FIELD),
});

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { openAlert } = useAlertMessage();
  const { openLoading, closeLoading } = useLoading();

  const initialValues: IRequestData = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      openLoading();
      api
        .post("/api/auth/sign-in", values, { withCredentials: true })
        .then((result: any) => {
          if (result.status === 200) {
            openAlert({
              title: "Success",
              color: "green",
              message: "Login has been successfully.",
              icon: <Icon icon="ic:round-check-circle" />,
            });
          } else {
            openAlert({
              title: "Failed",
              color: "red",
              message: result.data,
              icon: <Icon icon="ic:round-check-circle" />,
            });
          }
          closeLoading();
        })
        .catch((error) => {
          openAlert({
            title: "Failed",
            color: "red",
            message: error.response.data,
            icon: <Icon icon="material-symbols:error-rounded" />,
          });
          closeLoading();
        });
    },
  });

  return (
    <div>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NNTKG8C"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <PageTitle title="Log In" />
      <Container className="my-16 md:my-32">
        <div className="grid grid-cols-3 gap-24">
          <div className="col-span-3 md:col-span-2 border-green-300 border rounded-md p-8 md:p-16 flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Your Email */}
              <div className="col-span-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="py-1 md:py-3 w-full px-3 border border-gray-500"
                  placeholder="Your Email *"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
                {formik.touched.email && Boolean(formik.errors.email) && (
                  <span className="text-red-800 text-sm font-bold">
                    {formik.touched.email && formik.errors.email}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="col-span-2">
                <Input
                    id="password"
                    name="password"
                    type="password"
                    className="py-1 md:py-3 w-full px-3 border border-gray-500"
                    placeholder="Password *"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.touched.password && Boolean(formik.errors.password) && (
                  <span className="text-red-800 text-sm font-bold">
                    {formik.touched.password && formik.errors.password}
                  </span>
                )}
              </div>
            </div>

            <div>
              <Button
                className="shadow-none bg-green-300 hover:shadow-none border border-green-300 capitalize px-12 text-base rounded-full mt-4"
                onClick={() => formik.handleSubmit()}
              >
                Login
              </Button>
            </div>
            <p>
              Dont have an account? <Link to={"/signup"} style={{color: "blue", textDecoration: "underline"}}>Register</Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}