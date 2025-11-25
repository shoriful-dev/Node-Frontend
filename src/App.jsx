import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from "react-router";
import CategoryList from "./components/dashboard/CategoryList";
import { CreateCategory } from "./components/dashboard/CreateCategory";
import EditCategory from "./components/dashboard/EditCategory";
import CreateSubCategory from "./components/dashboard/subcategory/CreateSubCategory";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { RegistrationForm } from "./pages/Registration";
function App() {
  const queryClient = new QueryClient()

  return (
     <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/createcategory" element={<CreateCategory />} />
          <Route path="/categorylist" element={<CategoryList />} />
          <Route path="/editCatgory/:slug" element={<EditCategory />} />
          <Route path="/subcategory" element={<CreateSubCategory/>} />
          <Route path="/subcategorylist" element={"subcategory list"} />
          <Route path="*" element={"not found"} />
        </Route>
        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
         <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
