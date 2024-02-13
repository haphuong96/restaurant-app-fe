import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { SignInForm } from "../../features/auth/types";
import { signIn } from "../../features/auth/api";
import Logo from "../../assets/logo.png";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

const AdminSignIn: React.FC = () => {
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);
  // form validate
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFinish: SubmitHandler<IFormInput> = (values: SignInForm) => {
    setSigningIn(true);
    const data = {
      email: values.email,
      password: values.password,
    };

    signIn(data).then(() => {
      setSigningIn(false);
      navigate("/admin/dashboard");
    });
  };

  return (
    <div className="flex flex-col items-center">
      <img className="w-36" src={Logo} alt="logo" />
      <div className="text-[#970024]">SIGN IN</div>

      <div className="bg-[#FBFBFB] p-6 mt-6">
        <Form
          name="normal_login"
          layout="vertical"
          className="w-[300px]"
          initialValues={{ remember: true }}
          onFinish={handleSubmit(onFinish)}
        >
          <Form.Item
            name="email"
            label={
              <span>
                Email <span className="text-[#FF2626]">*</span>
              </span>
            }
            validateStatus={errors.email?.type == "required" ? "error" : ""}
            help={errors.email?.type == "required" ? "Email is required." : ""}
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required." }}
              render={({ field }) => (
                <div>
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                    {...field}
                  />
                  {/* {errors.email?.type === "required" && (<p className="text-red-500">Email is required</p>)} */}
                </div>
              )}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <span>
                Password <span className="text-[#FF2626]">*</span>
              </span>
            }
            validateStatus={errors.password?.type == "required" ? "error" : ""}
            help={
              errors.password?.type == "required" ? "Password is required." : ""
            }
          >
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    {...field}
                  />
                  {/* {errors.password?.type === "required" && (<p className="text-red-500">Password is required</p>)} */}
                </div>
              )}
            />
          </Form.Item>

          <Form.Item>
            {/* <button className="w-full bg-[#C50533] hover:bg-[#C50533]">SIGN IN</button> */}
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#C50533", width: "100%" }}
            >
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminSignIn;
