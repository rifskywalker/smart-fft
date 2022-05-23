import { Outlet } from "react-router-dom";

// const useAuth = () => {
//   const user = localStorage.getItem("user");
//   if (user) {
//     return true;
//   } else {
//     return false;
//   }
// };

const PublicRoutes = () => {
  // const auth = useAuth();
  // console.log(auth);
  return <Outlet />;
};

export default PublicRoutes;
