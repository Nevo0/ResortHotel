import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../Components/Hero";
import Banner from "../Components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledHero from "../Components/StyledHero";

export default class SingleRoom extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log(this.props);
  // }
  state = {
    slug: this.props.match.params.slug
  };
  componentDidMount() {
    console.log(this.context);
  }
  static contextType = RoomContext;

  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    console.log(room);
    if (!room) {
      return (
        <div className="error">
          <h3>no such room could be found ...</h3>
          <Link to="/rooms/" className="btn-primary">
            back to Rooms
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images: img
      // zmiana nazwy
    } = room;
    //  destrukturyzacja tablicy index zero nazywa sie mainImg a reszta tabilcy bez mainImg nazywa sie defaultImg
    const [mainImg, ...defaultImg] = img;
    return (
      <>
        <StyledHero img={mainImg}>
          <Banner title={`${name} room`}>
            <Link to="/rooms/" className="btn-primary">
              Go to romms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((image, index) => {
              return <img key={index} src={image} alt={name} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>info</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price: ${price}</h6>
              <h6>size: ${size} SQFT</h6>
              <h6>
                {" "}
                maxcapacity:{" "}
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>

              <h6>{pets ? "pets allowed" : "no pets allowed"} </h6>
              <h6>{breakfast && "Free breakfast"} </h6>
              {/* <h6>extras: ${extras} </h6> */}
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>- {item}</li>;
            })}
          </ul>
        </section>
      </>
    );
  }
}
