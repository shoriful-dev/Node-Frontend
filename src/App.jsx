import { BrowserRouter, Route, Routes } from "react-router";
import { CreateCategory } from "./components/dashboard/CreateCategory";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { RegistrationForm } from "./pages/Registration";
import CategoryList from "./components/dashboard/CategoryList";
import EditCategory from "./components/dashboard/EditCategory";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/createcategory" element={<CreateCategory />} />
          <Route path="/categorylist" element={<CategoryList />} />
          <Route path="/editCatgory/:slug" element={<EditCategory />} />
          <Route path="/subcategory" element={"create subcategory"} />
          <Route path="/subcategorylist" element={"subcategory list"} />
          <Route path="*" element={"not found"} />
        </Route>
        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
