import React from "react";
import { useSelector } from "react-redux";
import classes from "./Content.module.css";

const Content = ({
  id,
  description,
  address,
  city,
  country,
  postcode,
  invoiceDate,
  paymentDue,
  clientName,
  clientMail,
  clientAddress,
  clientCity,
  clientPostcode,
  clientCountry,
  itemList,
}) => {
  const theme = useSelector((state) => state.theme.theme);

  const amount = itemList?.map((item) => item.price * item.quantity);

  const totalAmount = amount?.reduce((a, b) => a + b);

  return (
    <div
      className={`${classes.container} ${
        theme === "dark_mode" ? classes.bg_dark : classes.bg_light
      }`}
    >
      <div className={classes.contents}>
        <div className={classes.top}>
          <p>
            #{id}
            <br />
            {description}
          </p>

          <p className={classes.address}>
            {address}
            <br />
            {city}
            <br />
            {country}
            <br />
            {postcode}
          </p>
        </div>

        <div className={classes.btm}>
          {invoiceDate && (
            <p>
              Invoice date
              <br />
              {invoiceDate}
            </p>
          )}

          {clientName && (
            <p>
              Bill To
              <br />
              {clientName}
            </p>
          )}

          {paymentDue && (
            <p>
              Payment Due
              <br />
              {paymentDue}
            </p>
          )}

          <p>
            {clientAddress}
            <br />
            {clientCity}
            <br />
            {clientCountry}
            <br />
            {clientPostcode}
          </p>

          {clientMail && (
            <p>
              Send To
              <br />
              {clientMail}
            </p>
          )}
        </div>

        <div
          className={`${classes.items} ${
            theme === "dark_mode" ? classes.items_dark : classes.items_light
          }`}
        >
          {itemList && (
            <div className={classes.item_list}>
              {itemList?.map((item) => (
                <div key={item.id} className={classes.item}>
                  <p>
                    Item Name
                    <br />
                    {item.itemName}
                  </p>

                  <p>
                    QTY.
                    <br />
                    {item.quantity}
                  </p>

                  <p>
                    Price
                    <br />
                    {item.price}
                  </p>

                  <p>
                    Total
                    <br />
                    {item.total}
                  </p>
                </div>
              ))}
            </div>
          )}

          {totalAmount && (
            <div className={classes.total}>
              <p>Amount Due</p>

              <p>{totalAmount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
