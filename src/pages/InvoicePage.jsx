import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Header from "../components/invoice-Details/Header/Header";
import Content from "../components/invoice-Details/Content/Content";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "@firebase/firestore";
import { getDueDate } from "../utils/utils";
import Mobile from "../components/invoice-Details/mobile-buttons/Mobile";
import EditForm from "../components/form/EditForm";

const InvoicePage = () => {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);

  const formIsOpen = useSelector((state) => state.form.editFormOpen);

  const { invoiceId } = useParams();

  const [allInvoices, setAllInvoices] = useState([]);

  const [invoice, setInvoice] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      currentUser.uid &&
      onSnapshot(
        collection(db, "users", currentUser.uid, "invoices"),
        (snapshot) => setAllInvoices(snapshot.docs)
      ),
    [db, currentUser.uid]
  );

  useEffect(() => {
    setInvoice(allInvoices?.filter((invoice) => invoice.id === invoiceId));
  }, [invoiceId, allInvoices]);

  const dueDate =
    invoice[0]?.data().invoice.invoiceDate &&
    invoice[0]?.data().invoice.terms &&
    getDueDate(
      invoice[0]?.data().invoice.invoiceDate,
      invoice[0]?.data().invoice.terms
    );

  const onDeletehandler = async () => {
    setLoading(true);

    try {
      await deleteDoc(
        doc(db, "users", currentUser.uid, "invoices", `${invoiceId}`)
      );

      setLoading(false);

      alert("Successfully Deleted");

      navigate("/", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  const onMarkAsPaidhandler = async () => {
    setLoading(true);

    try {
      await updateDoc(
        doc(db, "users", currentUser.uid, "invoices", `${invoiceId}`),
        {
          "invoice.status": "Paid",
        }
      );

      setLoading(false);

      alert("Successfully Updated");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      {invoice && (
        <Layout>
          <Header
            status={invoice[0]?.data().invoice.status}
            onDelete={onDeletehandler}
            onMarkAsPaid={onMarkAsPaidhandler}
            loading={loading}
          />

          <Content
            id={invoice[0]?.id}
            description={invoice[0]?.data().invoice.desc}
            address={invoice[0]?.data().invoice.from.address}
            city={invoice[0]?.data().invoice.from.city}
            country={invoice[0]?.data().invoice.from.country}
            postcode={invoice[0]?.data().invoice.from.postCode}
            invoiceDate={invoice[0]?.data().invoice.invoiceDate}
            paymentDue={dueDate && dueDate}
            clientName={invoice[0]?.data().invoice.to.name}
            clientMail={invoice[0]?.data().invoice.to.mail}
            clientCity={invoice[0]?.data().invoice.to.city}
            clientCountry={invoice[0]?.data().invoice.to.country}
            clientAddress={invoice[0]?.data().invoice.to.address}
            clientPostcode={invoice[0]?.data().invoice.to.postCode}
            itemList={invoice[0]?.data().invoice.itemList}
          />

          <Mobile
            onDelete={onDeletehandler}
            onMarkAsPaid={onMarkAsPaidhandler}
            loading={loading}
            status={invoice[0]?.data().invoice.status}
          />

          {formIsOpen && (
            <EditForm
              id={invoice[0]?.id}
              FormItemsList={invoice[0]?.data().invoice.itemList}
              addressValue={invoice[0]?.data().invoice.from.address}
              cityValue={invoice[0]?.data().invoice.from.city}
              countryValue={invoice[0]?.data().invoice.from.country}
              postcodeValue={invoice[0]?.data().invoice.from.postCode}
              clientNameValue={invoice[0]?.data().invoice.to.name}
              clientEmailValue={invoice[0]?.data().invoice.to.mail}
              clientCityValue={invoice[0]?.data().invoice.to.city}
              clientCountryValue={invoice[0]?.data().invoice.to.country}
              clientAddressValue={invoice[0]?.data().invoice.to.address}
              clientPostcodeValue={invoice[0]?.data().invoice.to.postCode}
              descriptionValue={invoice[0]?.data().invoice.desc}
              dateValue={invoice[0]?.data().invoice.invoiceDate}
              termValue={invoice[0]?.data().invoice.terms}
              currencyValue={invoice[0]?.data().invoice.currency}
              status={invoice[0]?.data().invoice.status}
              invoiceId={invoiceId}
            />
          )}
        </Layout>
      )}
    </>
  );
};

export default InvoicePage;
