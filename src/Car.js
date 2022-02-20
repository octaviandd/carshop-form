/** @format */

import React from "react";
import styled from "styled-components";

export default function Car({ data }) {
  if (data) {
    const { make, model, seats, doors, colour, picture, price } = data;
    return (
      <Wrapper>
        <ImageHolder>
          <img src={picture} alt="car_picture" />
        </ImageHolder>
        <DescriptionGrid>
          <span>
            <b>Make:</b> {make}
          </span>
          <span>
            <b>Price:</b> £{price}
          </span>
          <span>
            <b>Model:</b> {model}
          </span>
          <span>
            <b>Seats:</b> {seats}
          </span>
          <span>
            <b>Doors:</b> {doors}
          </span>
          <span>
            <b>Colour:</b> {colour}
          </span>
        </DescriptionGrid>
      </Wrapper>
    );
  }

  return <div>Loading...</div>;
}

const Wrapper = styled.div`
  transition: 0.5s ease-in-out;
`;

const DescriptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px;
  row-gap: 5px;
`;

const ImageHolder = styled.div`
  max-width: 500px;
  img {
    width: 100%;
    object-fit: fill;
    height: 300px;
  }
`;
