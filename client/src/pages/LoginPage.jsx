import UserLogin from "../components/UserLogin/UserLogin";
const LoginPage = (props) => {
  return <UserLogin userRole={props.user}></UserLogin>;
};
export default LoginPage;
