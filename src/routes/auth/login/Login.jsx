import { Button, Checkbox, Form, Input } from "antd";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import axios from "../../../api";


const { Title, Text } = Typography;

const Login = () => {
  const onFinish = (values) => {
    try {
      const res  = axios.post("/users/login", values);
      localStorage.getItem("token", res.data.token)
      console.log(res.data);
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
      <Title style={{ textAlign: 'center' }} level={2}>Login</Title>
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
        name="remember"
        valuePropName="checked"
        style={{
          display: 'flex',
          justifyContent: 'flex-start'
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
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
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
      <Text style={{ textAlign: 'center' }}>Don't have an account? <Link to="/auth/register">Register</Link></Text>
    </Form>
  );
};

export default Login;
