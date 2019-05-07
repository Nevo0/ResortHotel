import React, { Component } from "react";
import items from "./data";
const RoomContext = React.createContext();

// RoomContext.Provider value={}

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    maxPrice: 0,
    minPrice: 0,
    maxSize: 0,
    minSize: 0,

    breakfast: false,
    pets: false
  };
  //get data
  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    // console.log(...rooms);

    let maxPrice = Math.max(
      ...rooms.map(item => {
        // console.log(item.price);
        return item.price;
      })
    );
    let maxSize = Math.max(
      ...rooms.map(item => {
        // console.log(item.price);
        return item.size;
      })
    );
    // console.log(maxPrice);

    this.setState({
      rooms,
      sortedRooms: rooms,
      featuredRooms,
      loading: false,
      maxPrice,
      maxSize,
      price: maxPrice
    });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      //   console.log(item);

      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  handleChange = event => {
    // console.log(event.type, event.target.type);

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    // console.log(value);

    const name = event.target.name;

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    // console.log("Hellowfilter");
    let {
      rooms,
      type,
      capacity,
      price,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    let tempRooms = [...rooms];
    capacity = parseInt(capacity);
    price = parseInt(price);
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    tempRooms = tempRooms.filter(room => room.price <= price);

    tempRooms = tempRooms.filter(room => room.size >= minSize);
    tempRooms = tempRooms.filter(room => room.size <= maxSize);
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === breakfast);
    }
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === pets);
    }

    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
