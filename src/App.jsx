import { Routes, Route } from "react-router-dom";
// import PersistLogin from "./services/PersistLogin";

import {
  About,
  Dash,
  Payment,
  Promotion,
  Support,
  UserAuthPage,
} from "./pages";
import { ROLES } from "./config/roles";

import { Deposit } from "./components";
// import RequireAuth from "./services/RequireAuth";
import {
  EditPackage,
  EditUser,
  NewPackage,
  PackageDetail,
  PersonalInfo,
  Security,
  UsersList,
} from "./containers";
import Prefetch from "./services/Prefetch";
import PersistLogin from "./services/PersistLogin";
import RequireAuth from "./services/RequireAuth";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<UserAuthPage />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route path="/payment" element={<Payment />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/support" element={<Support />} />
              <Route path="/promotion" element={<Promotion />} />
              <Route path="/about" element={<About />} />
              <Route path="/users-list" element={<UsersList />} />
              <Route path="/personal-info" element={<PersonalInfo />} />
              <Route path="edit-user/:id" element={<EditUser />} />
              <Route path="package-detail/:id" element={<PackageDetail />} />
              <Route path="/new-package" element={<NewPackage />} />
              <Route path="edit-package/:id" element={<EditPackage />} />
              <Route path="/security" element={<Security />} />
              <Route path="/*" element={<Dash />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};

export default App;
