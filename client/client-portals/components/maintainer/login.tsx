import React, { useState } from "react";
import { Formik, Form, FormikState } from "formik";
import Markdown from "react-markdown";
import { MaintainerLoginData } from "../../utils/interfaces";
import {
  maintainerLoginValidation,
  maintainerLoginInputs,
  customInputClasses,
} from "utils/constants";
import { Input, Layout, Button } from "@/shared/index";
import Router from "next/router";
import { successToast } from "utils/functions/toast";
import { AuthContext } from "context/authContext";
import { useContext } from "react";
import Link from "next/link";
import { postMaintainerLogin } from "services/api";
import { Loading } from "@/icons/index";

const MaintainerLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  //@ts-ignore
  const initialValues: MaintainerLoginData = {
    email: "",
    password: "",
  };

  const submitValues = async (
    values: MaintainerLoginData,
    resetForm: (nextState?: Partial<FormikState<MaintainerLoginData>>) => void
  ) => {
    setLoading(true);
    const res = await postMaintainerLogin(values);
    if (res) {
      authContext.decode();
      successToast("Logged In successfully!");
      Router.push("maintainer/dashboard");
      resetForm({ values: { ...initialValues } });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <Layout type="maintainer">
      <div className="md:p-14 bg-base-blue">
        <h1 className="flex justify-center text-5xl font-extrabold text-white">
          Maintainer Login
        </h1>

        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => submitValues(values, resetForm)}
          validationSchema={maintainerLoginValidation}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col px-6 lg:w-1/4 max-w-6xl mt-10 py-6 mx-auto bg-white rounded-lg">
              {maintainerLoginInputs.map((input, index) => (
                <div key={index} className="bg-gray-50 rounded my-4 px-2 py-1">
                  <Input key={input.id} {...input} {...customInputClasses} />
                </div>
              ))}
              {Object.keys(errors).map((error) => {
                if (touched[error]) {
                  return (
                    <Markdown
                      key={error.trim()}
                      className="text-red-500 my-2 lg:my-2"
                    >
                      {errors[error] as string}
                    </Markdown>
                  );
                }
              })}
              <div className="flex flex-col items-center justify-center">
                <Button
                  disabled={Object.keys(errors).length > 0}
                  type="submit"
                  btnStyle="primary"
                >
                  {loading ? (
                    <span className="flex w-6 mx-auto">
                      <Loading />
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
                <div className="text-md mt-5 hover:underline">
                  <Link href="/maintainer/reset-password/reset">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default MaintainerLogin;
