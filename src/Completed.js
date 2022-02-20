/** @format */

import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Completed() {
  const location = useLocation();
  const { name, number, email, car, dateIn, dateOut } = location.state;
  return (
    <Card>
      <Top>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          xmlSpace="preserve"
        >
          <path
            d="M131.583,92.152l-0.026-0.041c-0.713-1.118-2.197-1.447-3.316-0.734l-31.782,20.257l-4.74-12.65
	c-0.483-1.29-1.882-1.958-3.124-1.493l-0.045,0.017c-1.242,0.465-1.857,1.888-1.374,3.178l5.763,15.382
	c0.131,0.351,0.334,0.65,0.579,0.898c0.028,0.029,0.06,0.052,0.089,0.08c0.08,0.073,0.159,0.147,0.246,0.209
	c0.071,0.051,0.147,0.091,0.222,0.133c0.058,0.033,0.115,0.069,0.175,0.097c0.081,0.037,0.165,0.063,0.249,0.091
	c0.065,0.022,0.128,0.047,0.195,0.063c0.079,0.019,0.159,0.026,0.239,0.037c0.074,0.01,0.147,0.024,0.221,0.027
	c0.097,0.004,0.194-0.006,0.292-0.014c0.055-0.005,0.109-0.003,0.163-0.012c0.323-0.048,0.641-0.16,0.933-0.346l34.305-21.865
	C131.967,94.755,132.296,93.271,131.583,92.152z"
          />
          <circle
            fill="none"
            stroke="#ffffff"
            strokeWidth="5"
            strokeMiterlimit="10"
            cx="109.486"
            cy="104.353"
            r="32.53"
          />
        </svg>
        <h3 id="status">Success</h3>
      </Top>
      <Bottom>
        <p>Car successfully selected.</p>
        <span>
          <b>Name:</b> {name}
        </span>
        <span>
          <b>Email:</b> {email}
        </span>
        <span>
          <b>Price:</b> £{car.price}
        </span>
        <span>
          <b>Number:</b> {number}
        </span>
        <span>
          <b>Model:</b> {car.model}
        </span>
        <span>
          <b>Make:</b> {car.make}
        </span>
        <span>
          <b>Date In: </b>
          {dateIn}
        </span>
        <span>
          <b>Date Out: </b>
          {dateOut}
        </span>
      </Bottom>
    </Card>
  );
}

const Card = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  margin: auto;
  text-align: center;
  font-family: "Source Sans Pro", sans-serif;
`;

const Top = styled.div`
  padding: 2em;
  background-color: #8bc34a;
  display: block;
  color: #fff;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Bottom = styled.div`
  padding: 2em 2em 5em 2em;
  background: #ffd;
  display: block;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  display: flex;
  flex-direction: column;

  h3 {
    font-weight: lighter;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1em;
    margin-top: -0.2em;
    margin-bottom: 0;
  }

  p {
    margin-top: -0.5em;
    color: #757575;
    letter-spacing: 1px;
  }
  span {
    margin-top: 4px;
  }
`;
