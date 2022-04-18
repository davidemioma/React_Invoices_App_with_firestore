import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeEditForm } from "../../store/store";
import Layout from "../form/layout/Layout";
import BkBtn from "../back-button/BkBtn";
import FormInputs from "./form-inputs/FormInputs";
import FormSelect from "./form-selects/FormSelect";
import Item from "./items/Item";
import EditItem from "./items/EditItem";
import { db } from "../../firebase";
import { doc, updateDoc } from "@firebase/firestore";
import classes from "./Form.module.css";

const EditForm = ({
  id,
  FormItemsList,
  addressValue,
  cityValue,
  countryValue,
  postcodeValue,
  clientNameValue,
  clientEmailValue,
  clientAddressValue,
  clientCityValue,
  clientCountryValue,
  clientPostcodeValue,
  dateValue,
  termValue,
  descriptionValue,
  currencyValue,
  status,
  invoiceId,
}) => {
  const dispatch = useDispatch();

  const formOpen = useSelector((state) => state.form.editFormOpen);

  const currentUser = useSelector((state) => state.user.currentUser);

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
  const [address, setAddress] = useState(addressValue);
  const [city, setCity] = useState(cityValue);
  const [postcode, setPostcode] = useState(postcodeValue);
  const [country, setCountry] = useState(countryValue);
  const [clientName, setClientName] = useState(clientNameValue);
  const [clientEmail, setClientEmail] = useState(clientEmailValue);
  const [clientAddress, setClientAddress] = useState(clientAddressValue);
  const [clientCity, setClientCity] = useState(clientCityValue);
  const [clientPostcode, setClientPostcode] = useState(clientPostcodeValue);
  const [clientCountry, setClientCountry] = useState(clientCountryValue);
  const [currency, setCurrency] = useState(currencyValue);
  const [date, setDate] = useState(dateValue);
  const [term, setTerm] = useState(termValue);
  const [description, setDescription] = useState(descriptionValue);

  const onUpdateInvoice = async () => {
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
        status: status,
      };

      await updateDoc(
        doc(db, "users", currentUser.uid, "invoices", `${invoiceId}`),
        {
          invoice: invoice,
        }
      );

      alert("Successfully Updated");

      setLoading(false);

      dispatch(closeEditForm());
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout formOpen={formOpen} closeForm={closeEditForm}>
      <div className={classes.form}>
        <BkBtn task={() => dispatch(closeEditForm())} />

        <h2>Edit #{id}</h2>

        <p className="title">Bill Form</p>

        <div className={classes.inputs}>
          <FormInputs
            label="Street Address"
            id="address"
            type="text"
            defaultValue={address}
            setValue={setAddress}
          />

          <div className={classes.double_inputs}>
            <FormInputs
              label="City"
              id="city"
              type="text"
              defaultValue={city}
              setValue={setCity}
            />

            <FormInputs
              label="Postcode"
              id="postcode"
              type="text"
              defaultValue={postcode}
              setValue={setPostcode}
            />
          </div>

          <FormInputs
            label="Country"
            id="country"
            type="text"
            defaultValue={country}
            setValue={setCountry}
          />
        </div>

        <p className="title">Bill To</p>

        <div className={classes.inputs}>
          <FormInputs
            label="Client's Name"
            id="name"
            type="text"
            defaultValue={clientName}
            setValue={setClientName}
          />

          <FormInputs
            label="Client's Email"
            id="email"
            type="email"
            defaultValue={clientEmail}
            setValue={setClientEmail}
          />

          <FormInputs
            label="Street Address"
            id="client-address"
            type="text"
            defaultValue={clientAddress}
            setValue={setClientAddress}
          />

          <div className={classes.double_inputs}>
            <FormInputs
              label="Client's City"
              id="client-city"
              type="text"
              defaultValue={clientCity}
              setValue={setClientCity}
            />

            <FormInputs
              label="Client's Postcode"
              id="client-postcode"
              type="text"
              defaultValue={clientPostcode}
              setValue={setClientPostcode}
            />
          </div>

          <FormInputs
            label="Client's Country"
            id="client-country"
            type="text"
            defaultValue={clientCountry}
            setValue={setClientCountry}
          />

          <FormSelect
            label="Currency"
            id="currency"
            defaultValue={currency}
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
              defaultValue={date}
              setValue={setDate}
            />

            <FormSelect
              label="Payment Term"
              id="payment-term"
              defaultValue={term}
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
            defaultValue={description}
            setValue={setDescription}
          />
        </div>

        <h3 className="item_list">Item List</h3>

        <div className={classes.item_list}>
          {FormItemsList?.map((item) => (
            <EditItem
              key={item.id}
              id={item.id}
              nameValue={item.itemName}
              priceValue={item.price}
              qtyvalue={item.quantity}
              onAddItem={onAddItem}
            />
          ))}

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
          disabled={loading}
          onClick={addItemComponent}
        >
          +Add New Item
        </button>

        <div className={classes.edit_actions}>
          <div />

          <div className={classes.btn_flex}>
            <button
              className="btn_discard"
              disabled={loading}
              onClick={() => dispatch(closeEditForm())}
            >
              Cancel
            </button>

            <button
              className="btn_send"
              disabled={loading}
              onClick={onUpdateInvoice}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditForm;
