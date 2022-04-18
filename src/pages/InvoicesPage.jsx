import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Header from "../components/header/Header";
import Invoices from "../components/invoices/Invoices/Invoices";
import NewForm from "../components/form/NewForm";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";

const InvoicesPage = () => {
  const formIsOpen = useSelector((state) => state.form.newFormOpen);

  const currentUser = useSelector((state) => state.user.currentUser);

  const [invoices, setInvoices] = useState([]);

  useEffect(
    () =>
      currentUser.uid &&
      onSnapshot(
        query(
          collection(db, "users", currentUser.uid, "invoices"),
          orderBy("timestamps", "desc")
        ),
        (snapshot) => setInvoices(snapshot.docs)
      ),

    [db, currentUser.uid]
  );

  return (
    <Layout>
      <Header amount={invoices.length} />

      <Invoices invoices={invoices} />

      {formIsOpen && <NewForm />}
    </Layout>
  );
};

export default InvoicesPage;
