import { Redirect } from "react-router-dom";

function logOut() {
  localStorage.clear();
  //   window.location.reload();
  return <Redirect to="/" />;
}
export default logOut;
