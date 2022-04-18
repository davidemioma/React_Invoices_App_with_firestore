import React, { useState } from "react";
import FormInputs from "../form-inputs/FormInputs";
import icon_delete from "../../../assets/icon-delete.svg";
import icon_plus from "../../../assets/icon-plus.svg";
import icon_check from "../../../assets/icon-check.svg";
import classes from "./Item.module.css";

const Item = ({ id, onDeleteItem, onAddItem }) => {
  const [addBtnClicked, setAddBtnClicked] = useState(false);

  const [itemName, setItemName] = useState("");

  const [qty, setQty] = useState(0);

  const [price, setPrice] = useState(0);

  const onDeleteBtnClicked = () => {
    onDeleteItem(id);
  };

  const onAddBtnClicked = () => {
    if (itemName.trim().length < 3 || qty < 1 || price < 1) return;

    const invoiceItem = {
      itemName: itemName,
      quantity: qty,
      price: price,
      total: qty * price,
      id: id,
    };

    onAddItem(invoiceItem);

    setAddBtnClicked(true);

    setItemName("");

    setQty(0);

    setPrice(0);
  };

  return (
    <div>
      <FormInputs
        label="Item Name"
        id="item-name"
        type="text"
        value={itemName}
        setValue={setItemName}
      />

      <div className={classes.actions}>
        <FormInputs
          label="Qty"
          id="qty"
          type="number"
          min={1}
          max={10}
          value={qty}
          setValue={setQty}
        />

        <FormInputs
          label="Price"
          id="price"
          type="number"
          min={1}
          value={price}
          setValue={setPrice}
        />

        <p>
          <span>Total</span>
          <br />
          {qty * price}
        </p>

        <button className={classes.btn_delete} onClick={onDeleteBtnClicked}>
          <img src={icon_delete} alt="" />
        </button>

        <button className={classes.btn_add} onClick={onAddBtnClicked}>
          {addBtnClicked ? (
            <img src={icon_check} alt="" />
          ) : (
            <img src={icon_plus} alt="" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Item;
