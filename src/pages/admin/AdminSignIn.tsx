import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { SignInForm } from "../../features/auth/types";
import { signIn } from "../../features/auth/api";
import Logo from "../../assets/logo.png";

const AdminSignIn: React.FC = () => {
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);

  const onFinish = (values: SignInForm) => {
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

      <Form
        name="normal_login"
        layout="vertical"
        className="w-[300px]"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-[#C50533]">
            SIGN IN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminSignIn;
