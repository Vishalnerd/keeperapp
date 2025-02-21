import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ Import GoogleOAuthProvider
import { googleClientId } from "./config/googleAuthConfig"; // ✅ Import Google Client ID

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={googleClientId}>
    {" "}
    {/* ✅ Wrap with GoogleOAuthProvider */}
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
