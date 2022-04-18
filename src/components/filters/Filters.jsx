import React from "react";
import icon_arrow from "../../assets/icon-arrow-down.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFilterValue, toggleFilter } from "../../store/store";
import classes from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);

  const filterIsOpen = useSelector((state) => state.filters.isOpen);

  const filterValue = useSelector((state) => state.filters.filterValue);

  const getFilterValue = (e) => {
    if (e.target.dataset.value) {
      dispatch(setFilterValue(e.target.dataset.value));
    }
  };

  return (
    <div
      className={`${classes.filters} ${
        theme === "dark_mode" ? classes.dark_mode : classes.light_mode
      }`}
    >
      <div
        className={classes.filter_top}
        onClick={() => dispatch(toggleFilter())}
      >
        <span>{filterValue}</span>

        <img
          className={filterIsOpen ? classes.rotate : ""}
          src={icon_arrow}
          alt=""
        />
      </div>

      {filterIsOpen && (
        <div className={classes.filter_list} onClick={getFilterValue}>
          <p data-value="all">All</p>
          <p data-value="paid">Paid</p>
          <p data-value="pending">Pending</p>
          <p data-value="draft">Draft</p>
        </div>
      )}
    </div>
  );
};

export default Filters;
