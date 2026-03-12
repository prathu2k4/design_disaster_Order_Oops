import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { CategoryPage } from "./pages/CategoryPage";
import { NestedMenu } from "./pages/NestedMenu";
import { FilterPage } from "./pages/FilterPage";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/category/:category",
    Component: CategoryPage,
  },
  {
    path: "/nested-menu",
    Component: NestedMenu,
  },
  {
    path: "/filter",
    Component: FilterPage,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/checkout",
    Component: Checkout,
  },
  {
    path: "*",
    Component: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Page not found</p>
        </div>
      </div>
    ),
  },
]);