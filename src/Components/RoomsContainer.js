import React from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import { withRoomConsumer } from "../context";

function RoomsContainer({ context }) {
  const { loading, sortedRooms, rooms } = context;
  // console.log(context);
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );
}

export default withRoomConsumer(RoomsContainer);

{
  /* <RoomConsumer> */
}
//   {value => {
//     const { loading, sortedRooms, rooms } = value;
//     console.log(value);
// if (loading) {
//     return <div>Loading</div>;
//   }
//   return (
//     <div>
//       Hello form container
//       <RoomsFilter />
//       <RoomsList />
//     </div>
//     );
//   }}
// </RoomConsumer></RoomConsumer>
