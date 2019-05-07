import React from "react";
import { useContext } from "react";
import { RoomContext } from "../context";
import Title from "../Components/Title";

export default function RoomsFilter({ rooms }) {
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context;
  console.log();

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            <option value="x">X</option>
          </select>
        </div>
        {/* end select type */}
      </form>
    </section>
  );
}
