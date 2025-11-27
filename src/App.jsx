import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router";

import { CreateCategory } from "./components/dashboard/CreateCategory";
import EditCategory from "./components/dashboard/EditCategory";
import CreateSubCategory from "./components/dashboard/subcategory/CreateSubCategory";

import { CreateBrand } from "./components/dashboard/brand/Createbrand";
import { ToastContainer, toast } from "react-toastify";
import BrandList from "./components/dashboard/brand/BrandList";
import CreateSingleVariantproduct from "./components/dashboard/singleVariantProuduct/CreateSingleVariantproduct";
import SingleVariantProductList from "./components/dashboard/singleVariantProuduct/SingleVariantProductList";
import MultiVariantProductList from "./components/dashboard/MultiVariantProduct/MultiVariantProductList";
import CreateMultiVariantProudct from "./components/dashboard/MultiVariantProduct/CreateMultiVariantProudct";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Registration = React.lazy(() =>
  import("./pages/Registration").then((c) => c.RegistrationForm)
);
const CategoryList = React.lazy(() =>
  import("./components/dashboard/CategoryList.jsx")
);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/createcategory" element={<CreateCategory />} />
            <Route
              path="/categorylist"
              element={
                <Suspense fallback={<h1>loadin ..</h1>}>
                  <CategoryList />
                </Suspense>
              }
            />
            <Route path="/editCatgory/:slug" element={<EditCategory />} />
            <Route path="/subcategory" element={<CreateSubCategory />} />
            <Route path="/subcategorylist" element={"subcategory list"} />
            <Route path="/createbrand" element={<CreateBrand />} />
            <Route path="/brandlist" element={<BrandList />} />
            <Route path="/createsvp" element={<CreateSingleVariantproduct />} />
            <Route path="/svplist" element={<SingleVariantProductList />} />
            <Route path="/createmvp" element={<CreateMultiVariantProudct />} />
            <Route path="/mvplist" element={<MultiVariantProductList />} />
            <Route path="*" element={"not found"} />
          </Route>
          {/* auth */}
          <Route
            path="/login"
            element={
              <Suspense fallback={<h1>loading ..</h1>}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<h1>loading ..</h1>}>
                <Registration />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
