import { Typography } from "antd";

const { Title }  = Typography;

const DashboardContentTitle = ({children}) => {
  return (
    <Title level={3}>
        {children}
    </Title>
  )
}

export {DashboardContentTitle}