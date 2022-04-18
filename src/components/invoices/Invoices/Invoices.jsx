import React from "react";
import Invoice from "../invoice/Invoice";
import EmptyInvoices from "../../empty-invoices/EmptyInvoices";
import { getDueDate } from "../../../utils/utils";
import { useSelector } from "react-redux";
import classes from "./Invoices.module.css";

const Invoices = ({ invoices }) => {
  const filterValue = useSelector((state) => state.filters.filterValue);

  const newInvoices = invoices?.map((invoice) => ({
    id: invoice.id,
    invoice: invoice.data().invoice,
  }));

  const filteredInvoices = newInvoices.filter((invoice) => {
    if (filterValue === "all") {
      return invoice;
    } else {
      return invoice.invoice.status.toLowerCase() === filterValue;
    }
  });

  return (
    <>
      {filteredInvoices.length > 0 ? (
        <div className={classes.lists}>
          {filteredInvoices?.map((invoice) => {
            const amount = invoice.invoice.itemList?.map(
              (item) => item.price * item.quantity
            );

            const totalAmount = amount.reduce((a, b) => a + b);

            const dueDate = getDueDate(
              invoice.invoice.invoiceDate,
              invoice.invoice.terms
            );

            return (
              <Invoice
                key={invoice.id}
                id={invoice.id}
                toName={invoice.invoice.to.name}
                dueDate={dueDate}
                totalAmount={totalAmount}
                currency={invoice.invoice.currency}
                status={invoice.invoice.status}
              />
            );
          })}
        </div>
      ) : (
        <EmptyInvoices
          header={"There is nothing here"}
          text={"Create on invoice by clicking the New button and get started"}
        />
      )}
    </>
  );
};

export default Invoices;
