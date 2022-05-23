import { Routes, Route, Navigate } from "react-router-dom";

//Pages
import Dashboard from "../components/Dashboard";

//Layout
import InnerContent from "../layout/InnerContent";

//Protect Routes
import ProtectedRoutes from "../routes/ProtectedRoutes";
import PublicRoutes from "../routes/PublicRoutes";
import PermissionDenied from "../routes/PermissionDenied";
import SuperHeroes from "../pages/SuperHero/SuperHeroes";
import Processes from "../pages/process/Processes";

const MainRoutes = () => {
  return (
    <Routes>
      {/** Protected Routes */}
      {/** Wrap all Route under ProtectedRoutes element */}
      <Route path="/" element={<PublicRoutes />}>
        {/* <Route path="/" element={<InnerContent />}> */}
        {/* <Route path="/" element={<Navigate replace to="dashboard" />} /> */}
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="superhero" element={<SuperHeroes />} />
        <Route path="process" element={<Processes />} />
        {/* <Route
          path="tabs"
          element={<Tabs props={{ userName: "Bikash web" }} />}
        >
          <Route path="/tabs" element={<Navigate replace to="tab1" />} />
          <Route path="tab1" element={<Tab1 />} />
          <Route path="tab2" element={<ProtectedRoutes roleRequired="USER" />}>
            <Route path="/tabs/tab2" element={<Tab2 />} />
          </Route>
          <Route path="tab3" element={<Tab3 />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="dynamic-form" element={<DynamicForm />} />
        <Route
          path="users"
          element={<Users extraItem="test extra item from router" />}
        />
        <Route path="users/:userId" element={<SingleUser />} />
        <Route path="users/new" element={<NewUser />} /> */}
        {/* </Route> */}
      </Route>
      {/** Public Routes */}
      {/** Wrap all Route under PublicRoutes element */}
      {/* <Route path="login" element={<PublicRoutes />}>
      <Route path="/login" element={<Login />} />
    </Route> */}

      {/** Permission denied route */}
      <Route path="/denied" element={<PermissionDenied />} />
    </Routes>
  );
};

export default MainRoutes;
