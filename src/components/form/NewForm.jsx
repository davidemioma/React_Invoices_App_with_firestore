import React, { useState } from "react";
import Layout from "./layout/Layout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeNewForm } from "../../store/store";
import BkBtn from "../back-button/BkBtn";
import FormInputs from "./form-inputs/FormInputs";
import FormSelect from "./form-selects/FormSelect";
import Item from "./items/Item";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import classes from "./Form.module.css";

const NewForm = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const formOpen = useSelector((state) => state.form.newFormOpen);

  const [saveAsDraft, setSaveAsDraft] = useState(false);

  const [loading, setLoading] = useState(false);

  //For Item Lists
  const [component, setComponent] = useState(["sampleComponent"]);
  const [itemList, setItemList] = useState([]);
  const addItemComponent = () => {
    setComponent((prev) => [...prev, "sampleComponent"]);
  };
  const onRemoveComponent = (id) => {
    setComponent((prev) => prev.filter((item, i) => i !== id));
  };
  const onAddItem = (item) => {
    setItemList((prev) => [...prev, item]);
  };

  //For the Inputs
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPostcode, setClientPostcode] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [currency, setCurrency] = useState("$");
  const [date, setDate] = useState("");
  const [term, setTerm] = useState("1");
  const [description, setDescription] = useState("");

  //Reset Form
  const resetForm = () => {
    setAddress("");
    setCity("");
    setPostcode("");
    setCountry("");
    setClientName("");
    setClientEmail("");
    setClientAddress("");
    setClientCity("");
    setClientPostcode("");
    setClientCountry("");
    setCurrency("$");
    setDate("");
    setTerm("1");
    setDescription("");
    setItemList([]);
  };

  //Submit Invoice
  const submitIvoiceHandler = async () => {
    if (
      address.trim() === "" ||
      city.trim() === "" ||
      postcode.trim().length < 5 ||
      country.trim() === "" ||
      clientName.trim() === "" ||
      !clientEmail.includes("@") ||
      clientAddress.trim() === "" ||
      clientCity.trim() === "" ||
      clientPostcode.trim().length < 5 ||
      clientCountry.trim() === "" ||
      date === "" ||
      description.trim() === "" ||
      itemList.length < 1
    )
      return;

    try {
      setLoading(true);

      const invoice = {
        from: {
          address: address,
          city: city,
          postCode: postcode,
          country: country,
        },
        to: {
          mail: clientEmail,
          name: clientName,
          address: clientAddress,
          city: clientCity,
          postCode: clientPostcode,
          country: clientCountry,
        },
        currency: currency,
        invoiceDate: date,
        terms: term,
        desc: description,
        itemList: itemList,
        status: saveAsDraft ? "Draft" : "Pending",
      };

      await addDoc(collection(db, "users", currentUser.uid, "invoices"), {
        invoice: invoice,
        timestamps: serverTimestamp(),
      });

      setLoading(false);

      resetForm();

      dispatch(closeNewForm());
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout formOpen={formOpen} closeForm={closeNewForm}>
      <div className={classes.form}>
        <BkBtn task={() => dispatch(closeNewForm())} />

        <h2>New Invoice</h2>

        <p className="title">Bill Form</p>

        <div className={classes.inputs}>
          <FormInputs
            label="Street Address"
            id="address"
            type="text"
            value={address}
            setValue={setAddress}
          />

          <div className={classes.double_inputs}>
            <FormInputs
              label="City"
              id="city"
              type="text"
              value={city}
              setValue={setCity}
            />

            <FormInputs
              label="Postcode"
              id="postcode"
              type="text"
              value={postcode}
              setValue={setPostcode}
            />
          </div>

          <FormInputs
            label="Country"
            id="country"
            type="text"
            value={country}
            setValue={setCountry}
          />
        </div>

        <p className="title">Bill To</p>

        <div className={classes.inputs}>
          <FormInputs
            label="Client's Name"
            id="name"
            type="text"
            value={clientName}
            setValue={setClientName}
          />

          <FormInputs
            label="Client's Email"
            id="email"
            type="email"
            value={clientEmail}
            setValue={setClientEmail}
          />

          <FormInputs
            label="Street Address"
            id="client-address"
            type="text"
            value={clientAddress}
            setValue={setClientAddress}
          />

          <div className={classes.double_inputs}>
            <FormInputs
              label="Client's City"
              id="client-city"
              type="text"
              value={clientCity}
              setValue={setClientCity}
            />

            <FormInputs
              label="Client's Postcode"
              id="client-postcode"
              type="text"
              value={clientPostcode}
              setValue={setClientPostcode}
            />
          </div>

          <FormInputs
            label="Client's Country"
            id="client-country"
            type="text"
            value={clientCountry}
            setValue={setClientCountry}
          />

          <FormSelect
            label="Currency"
            id="currency"
            value={currency}
            setValue={setCurrency}
            options={[
              { value: "$", label: "USD" },
              { value: "£", label: "GBP" },
            ]}
          />

          <div className={classes.double_inputs}>
            <FormInputs
              label="Invoice Date"
              id="date"
              type="date"
              value={date}
              setValue={setDate}
            />

            <FormSelect
              label="Payment Term"
              id="payment-term"
              value={term}
              setValue={setTerm}
              options={[
                { value: "1", label: "Net 1 day" },
                { value: "7", label: "Net 7 days" },
                { value: "30", label: "Net 30 days" },
              ]}
            />
          </div>

          <FormInputs
            label="Project Description"
            id="description"
            type="text"
            value={description}
            setValue={setDescription}
          />
        </div>

        <h3 className="item_list">Item List</h3>

        <div className={classes.item_list}>
          {component.map((item, i) => (
            <Item
              key={i}
              id={i}
              onAddItem={onAddItem}
              onDeleteItem={onRemoveComponent}
            />
          ))}
        </div>

        <button
          className={classes.btn_add}
          onClick={addItemComponent}
          disabled={loading}
        >
          +Add New Item
        </button>

        <div className={classes.action_btn}>
          <button
            className="btn_discard"
            onClick={() => {
              resetForm();
              dispatch(closeNewForm());
            }}
            disabled={loading}
          >
            Discard
          </button>

          <div>
            <button
              className="btn_draft"
              onClick={() => {
                setSaveAsDraft(true);
                submitIvoiceHandler();
              }}
              disabled={loading}
            >
              Save As Draft
            </button>

            <button
              className="btn_send"
              onClick={submitIvoiceHandler}
              disabled={loading}
            >
              Save & Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewForm;
