import { Layout } from "react-admin";
import MyAppBar from "./AppBar";
import MyNotification from "./Notification";
import SideMenu from "./SideMenu";

const MyLayout = (props) => (
  <Layout {...props} appBar={MyAppBar} notification={MyNotification} menu={SideMenu}>
    {props.children}
  </Layout>
);

export default MyLayout;
