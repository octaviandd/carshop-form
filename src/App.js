/** @format */

import "./App.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import audi_q3 from "./images/audi_q3.jpeg";
import vw_golf from "./images/vw_golf.jpeg";
import ford_fiesta from "./images/ford_fiesta.jpeg";
import Car from "./Car";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

let data = [
  {
    id: 1,
    picture: audi_q3,
    price: "5000",
    colour: "White",
    seats: "4",
    doors: "4",
    model: "Q3",
    make: "Audi",
  },
  {
    id: 2,
    picture: vw_golf,
    price: "4000",
    colour: "Red",
    seats: "4",
    doors: "4",
    model: "Golf",
    make: "WV",
  },
  {
    id: 3,
    picture: ford_fiesta,
    price: "3000",
    colour: "Silver",
    seats: "2",
    doors: "2",
    model: "Fiesta",
    make: "Ford",
  },
];

/**
 * Simple form values validator.
 * @param {*} errors
 * @returns boolean
 */

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

/**
 * Some basic regex for email/number (uk) and name.
 */

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validNumberRegex = RegExp(/^0([1-6][0-9]{8,10}|7[0-9]{9})$/);
const validNameRegex = RegExp(/^([A-Za-zéàë]{2,40} ?)+$/);

/**
 * Default state for the component, easier to reset it after form submitted.
 */

const defaultState = {
  name: "",
  number: "",
  email: "",
  dateIn: "",
  dateOut: "",
  errors: {
    name: "",
    email: "",
    number: "",
  },
  nameStatus: false,
  emailStatus: false,
  numberStatus: false,
  carID: 1,
};

function App() {
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);
  const [car, setCar] = useState(undefined);

  /**
   * Function that will listen to from submit. On submit, it checks for possible errors in @name @number @email and checks for empty inputs.
   * If errors are present, error messages are activated and the process is stopped.
   */

  const onSubmit = () => {
    if (checkForEmptyValues() && validateForm(state.errors)) {
      navigate("/completed", {
        state: {
          name: state.name,
          number: state.number,
          email: state.email,
          car: car,
          dateIn: state.dateIn,
          dateOut: state.dateOut,
        },
      });
      setState(defaultState);
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
  };

  /**
   * "Mock API call"(?). Basic filter that gets the item by ID and sets the state.
   * @param {*} id
   */

  const fetchCar = (id) => {
    let car = data.find((item) => item.id == id);
    setCar(car);
  };

  /**
   * Event Handler for @name @email @number inputs. Checks for RegEx errors, sets the possible errors and the values of inputs.
   * @param {*} name
   * @param {*} value
   */

  const handleChange = (name, value) => {
    let errors = state.errors;
    switch (name) {
      case "name":
        errors.name = validNameRegex.test(value) ? "" : "Name is Invalid!";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "number":
        errors.number = validNumberRegex.test(value)
          ? ""
          : "Number is not UK valid!";
        break;
      default:
        break;
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: errors,
    }));
  };

  /**
   * Checks for early form submission and rejects if @name @email @number are empty strings.
   * I have left the date pickers validation on HTML5.
   * @returns @valid
   */

  const checkForEmptyValues = () => {
    let valid = true;
    if (state.name === "") {
      setState((prevState) => ({
        ...prevState,
        errors: { ...prevState.errors, name: "Name Required" },
      }));
      valid = false;
    }
    if (state.email === "") {
      setState((prevState) => ({
        ...prevState,
        errors: { ...prevState.errors, email: "Email Required" },
      }));
      valid = false;
    }
    if (state.number === "") {
      setState((prevState) => ({
        ...prevState,
        errors: { ...prevState.errors, number: "Number Required" },
      }));
      valid = false;
    }
    return valid;
  };

  /**
   * One useEffect for the styling of the input labels. If any of the inputs for @name @email @number change,
   * the label/span associated with it transition.
   */

  useEffect(() => {
    state.email !== ""
      ? setState((prevState) => ({ ...prevState, emailStatus: true }))
      : setState((prevState) => ({ ...prevState, emailStatus: false }));
    state.name !== ""
      ? setState((prevState) => ({ ...prevState, nameStatus: true }))
      : setState((prevState) => ({ ...prevState, nameStatus: false }));
    state.number !== ""
      ? setState((prevState) => ({ ...prevState, numberStatus: true }))
      : setState((prevState) => ({ ...prevState, numberStatus: false }));
  }, [state.name, state.email, state.number]);

  /**
   * useEffect for the "mock API" call. Fires once on component mounting and every time @carID changes, basically when the user plays with the
   * <select> tag.
   */

  useEffect(() => {
    fetchCar(state.carID);
  }, [state.carID]);

  return (
    <Wrapper>
      <FormWrapper>
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <label>
            <NameLegend nameStatus={state.nameStatus}>Name*</NameLegend>
            <StyledField
              type="text"
              name="name"
              value={state.name}
              noValidate
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            ></StyledField>
            {state.errors.name.length > 0 && (
              <ErrorMsg>{state.errors.name}</ErrorMsg>
            )}
          </label>
          <label>
            <EmailLegend emailStatus={state.emailStatus}>Email*</EmailLegend>
            <StyledField
              type="email"
              value={state.email}
              name="email"
              noValidate
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            ></StyledField>
          </label>
          {state.errors.email.length > 0 && (
            <ErrorMsg>{state.errors.email}</ErrorMsg>
          )}
          <label>
            <NumberLegend numberStatus={state.numberStatus}>
              Contact Number*
            </NumberLegend>
            <StyledField
              type="tel"
              value={state.number}
              noValidate
              name="number"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            ></StyledField>
            {state.errors.number.length > 0 && (
              <ErrorMsg>{state.errors.number}</ErrorMsg>
            )}
          </label>
          <label>
            <StyledField
              type="date"
              value={state.dateIn}
              required
              name="dateIn"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              min={format(new Date(), "yyyy-MM-dd")}
            ></StyledField>
          </label>
          {state.dateIn !== "" && (
            <label>
              <StyledField
                type="date"
                value={state.dateOut}
                required
                name="dateOut"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                min={format(parseISO(state.dateIn), "yyyy-MM-dd")}
              ></StyledField>
            </label>
          )}
          <label htmlFor="car">
            <b>Choose a car:</b>
          </label>
          <select
            name="carID"
            id="car"
            value={state.selected}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          >
            <option value="1" name="Audi Q3">
              Audi Q3
            </option>
            <option value="2" name="VW Golf">
              VW Golf
            </option>
            <option value="3" name="Ford Fiesta">
              Ford Fiesta
            </option>
          </select>
          <SubmitButton type="submit">Select</SubmitButton>
        </StyledForm>
      </FormWrapper>
      <ImageWrapper>
        <Car data={car} />
      </ImageWrapper>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 525px;
  max-width: 400px;
  width: 100%;
  flex-shrink: 0;
  -webkit-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  -moz-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  border-radius: 20px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 15px;
  color: #222;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #4395fd;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 0px;
  margin-top: 15px;
`;

const StyledForm = styled.form`
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const StyledField = styled.input`
  padding: 9px 0 7px 8px;
  width: 100%;
  border: 1px solid #dbdbdb;
  background-color: #fafafa;
  font-size: 16px;
  cursor: auto;
  border-radius: 3px;
  text-overflow: ellipsis;
  &:focus {
    outline: #a2a2a2;
    border: 1px solid #a2a2a2;
  }
`;

const TextLegend = styled.span`
  position: absolute;
  top: 10px;
  left: 3.5%;
  color: #a2a2a2;
  cursor: auto;
  font-size: 14px;
  transition: all 0.1s ease-in-out;
`;

const NameLegend = styled(TextLegend)`
  ${({ nameStatus }) =>
    nameStatus &&
    `
      left: 8px;
      font-size: 10px;
      top: 5px;
      overflow:hidden;
      color: rgba(var(--f52,142,142,142),1);
      text-overflow: ellipsis;
      + input {
        padding: 14px 0 2px 8px;
        font-size: 12px;
      }
    `}
`;

const EmailLegend = styled(TextLegend)`
  ${({ emailStatus }) =>
    emailStatus &&
    `
      left: 8px;
      font-size: 10px;
      top: 5px;
      overflow:hidden;
      color: rgba(var(--f52,142,142,142),1);
      text-overflow: ellipsis;
      + input {
        padding: 14px 0 2px 8px;
        font-size: 12px;
      }
    `}
`;

const NumberLegend = styled(TextLegend)`
  ${({ numberStatus }) =>
    numberStatus &&
    `
      left: 8px;
      font-size: 10px;
      top: 5px;
      overflow:hidden;
      color: rgba(var(--f52,142,142,142),1);
      text-overflow: ellipsis;
      + input {
        padding: 14px 0 2px 8px;
        font-size: 12px;
      }
    `}
`;

const ErrorMsg = styled.div`
  margin: 5px 0px;
  background-color: #ff6767;
  color: white;
  padding: 5px 7.5px;
  border-radius: 6px;
  width: 100%;
`;
