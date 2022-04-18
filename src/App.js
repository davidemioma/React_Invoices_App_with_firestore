import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router";
import { login, logout } from "./store/store";
import { auth } from "./firebase";
import InvoicesPage from "./pages/InvoicesPage";
import InvoicePage from "./pages/InvoicePage";
import Login from "./pages/login/Login";

const App = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            profileImg: user.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className={theme === "dark_mode" ? "dark_mode" : "light_mode"}>
      {currentUser ? (
        <Routes>
          <Route path="/" element={<InvoicesPage />} />

          <Route path="/invoices/:invoiceId" element={<InvoicePage />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
