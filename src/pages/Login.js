import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("../list-product");

    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);
  return (
    <div
      className="flex justify-center items-center"
      style={{ background: "#6698FF", minHeight: "100vh" }}
    >
      <div className="sm:w-2/3 lg:w-2/3 xl:w-[30%]">
        <div className="bg-white rounded-3 p-4 my-8 lg:my-12 mx-auto lg:mx-0 ">
          <h3 className="text-center title text-4xl">Đăng nhập</h3>
          <p className="text-center mt-4 lg:mt-6">
            Đăng nhập vào tài khoản của bạn để tiếp tục.
          </p>
          <div className="error text-center">
            {message.message == "Rejected" ? "You are not an Admin" : ""}
          </div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Email"
              id="email"
              name="email"
              onChng={formik.handleChange("email")}
              onBlr={formik.handleBlur("email")}
              val={formik.values.email}
            />
            <div className="error mt-2">
              {formik.touched.email && formik.errors.email}
            </div>
            <CustomInput
              type="password"
              label="Password"
              id="pass"
              name="password"
              onChng={formik.handleChange("password")}
              onBlr={formik.handleBlur("password")}
              val={formik.values.password}
            />
            <div className="error mt-2">
              {formik.touched.password && formik.errors.password}
            </div>
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
              style={{ background: "#6698FF" }}
              type="submit"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
