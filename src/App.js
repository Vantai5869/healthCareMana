import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeContext } from "./context/darkModeContext";
import { productInputs, userInputs } from "./formSource";
import Branchs from "./pages/branchs/Branchs";
import CreateBranchForm from "./pages/branchs/CreateBranch";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import List from "./pages/products/List";
import CreateServiceGroup from "./pages/service-group/CreateServiceGroup";
import ServiceGroupPage from "./pages/service-group/ServiceGroupPage";
import CreateService from "./pages/service/CreateService";
import ServicePage from "./pages/service/ServicePage";
import Single from "./pages/single/Single";
import UsersList from "./pages/users/Users";
import "./style/dark.scss";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
             <Route path="login" element={<Login />} />
            <Route index element={<Home />} />
           
            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="service-group">
              <Route index element={<ServiceGroupPage />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<CreateServiceGroup title="Tạo nhóm dịch vụ" />}
              />
            </Route>
            <Route path="service">
              <Route index element={<ServicePage />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<CreateService title="Add New User" />}
              />
            </Route>
            <Route path="branch">
              <Route index element={<Branchs />} />
              <Route path=":branchId" element={<Single />} />
              <Route
                path="new"
                element={<CreateBranchForm  title="Thêm 1 branch mới" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
