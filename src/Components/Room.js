import React from "react";
import { Link } from "react-router-dom";

export default function Room({ room }) {
  console.log(room);
  const { name, slug, images, price } = room;

  return (
    <article className="room">
      <h1>a</h1>
    </article>
  );
}
