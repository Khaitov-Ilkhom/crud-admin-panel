import { Button, Form, Input } from "antd";
import { Typography } from "antd";
import { Link } from "react-router-dom";

import axios from "../../../api";

const { Title, Text } = Typography;

const Register = () => {
  const onFinish = (values) => {
    try {
      const res = axios.post("/users/register", values);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



  return (
    <Form
    name="basic"
    layout="vertical"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className="auth-form"
  >
    <Title style={{ textAlign: 'center' }} level={2}>Register</Title>
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: "Please input your name!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: "Please input your email!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: "Please input your password!",
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      <Button onClick={() => onFinish()} type="primary" htmlType="submit">
        Register
      </Button>
    </Form.Item>
    <Text style={{ textAlign: 'center' }}>Already have an account? <Link to="/auth">Login</Link></Text>
  </Form>
  )
}

export default Register