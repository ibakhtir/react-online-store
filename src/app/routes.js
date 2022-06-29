import Admin from "./pages/admin";
import Main from "./pages/main";
import Auth from "./pages/auth";
import LogOut from "./pages/logout";
import ShoppingCart from "./pages/shoppingCart";
import Item from "./pages/item";
import {
  ADMIN_ROUTE,
  MAIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  LOGOUT_ROUTE,
  SHOPPING_CART_ROUTE,
  ITEM_ROUTE
} from "./utils/constants";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  }
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: LOGOUT_ROUTE,
    Component: LogOut
  },
  {
    path: SHOPPING_CART_ROUTE,
    Component: ShoppingCart
  },
  {
    path: `${ITEM_ROUTE}/:itemId`,
    Component: Item
  }
];
