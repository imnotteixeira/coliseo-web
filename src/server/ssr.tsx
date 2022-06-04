import { renderToString } from "react-dom/server";
import React from "react"
import App from "../client/components/app";
import { getListItems, getMenuItems } from "./db";

export const appProps: AppProps = {listItems: getListItems(), menuItems: getMenuItems()}

export default renderToString(<App {...appProps}  />);