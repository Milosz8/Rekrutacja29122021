import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ImgForm from "./ImgForm";

const FormWrapper = styled.div`
  box-sizing: border-box;
  margin: auto;
  margin-top: 5%;
  width: 40%;
  border: 4px solid black;
  font-family: sans-serif;
  background: pink;

  min-width: 430px;

  label {
    font-size: 2rem;
    display: flex;
    padding: 0 1rem;
    margin: 1rem 1rem;
    position: relative;
    background-color: rgba(0, 100, 100, 0.15);
    border-radius: 5px;
  }

  input {
    margin: 0 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 12px;
    transition-duration: 200ms;
  }
  input:hover {
    background-color: rgba(0, 0, 100, 0.2);
    transition-duration: 200ms;
  }
  select {
    margin: 1rem 1rem;
    border: 1px solid #ccc;
    padding: 6px 12px;
    cursor: pointer;
  }

  .text-danger {
    color: red;
  }
  .submitBtn1 {
    margin: 1rem;
    border: 1px solid #ccc;

    padding: 6px 12px;
    cursor: pointer;
  }
`;

export default function FormValidation() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    //funkcja onSubmit. Przekierowanie na błąd 404
    navigate("Contractor/Save");
    reset();
  };

  //walidacja rozmiaru zdjęcia (ratio)
  const testImg = (w, h) => {};

  let x = /^([0-9]){11}?$/;
  const [selects, setSelects] = useState("PESEL");
  const [cha, setCha] = useState(x);
  const selectElement = document.querySelector(".peselnip");
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Imie</label>
        <input
          type="text"
          className={errors.name && "invalid"}
          {...register("name", { required: "Imie wymagane" })}
          onKeyUp={() => {
            trigger("name");
          }}
        />
        {errors.name && (
          <small className="text-danger">{errors.name.message}</small>
        )}

        <label>Nazwisko</label>
        <input
          type="text"
          className={errors.surname && "invalid"}
          {...register("surname", { required: "Nazwisko wymagane" })}
          onKeyUp={() => {
            trigger("surname");
          }}
        />
        {errors.surname && (
          <small className="text-danger">{errors.surname.message}</small>
        )}
        <label>Typ</label>
        <select
          className="mySelect"
          {...register("type", { required: true })}
          valuse={selects}
          onChange={(e) => {
            setSelects(e.target.value);

            selectElement.value = "";

            if (e.target.value !== "PESEL") {
              x = /^([0-9]){12}?$/;
              setCha(x);
            } else {
              x = /^([0-9]){11}?$/;
              setCha(x);
            }
          }}
          selected="PESEL"
        >
          <option value="PESEL">Osoba prywatna</option>
          <option value="NIP">Firma</option>
        </select>
        <label className="change">{selects}</label>
        <input
          type="text"
          className={`peselnip ${errors.id ? "invalid" : ""}`}
          {...register("id", {
            required: "PESEL/NIP wymagany",
            pattern: {
              value: cha,
              message: "Nieprawidłowy PESEL/NIP",
            },
          })}
          onKeyUp={() => {
            trigger("id");
          }}
        />
        {errors.id && (
          <small className="text-danger">{errors.id.message}</small>
        )}
        <ImgForm className="imgLoad" onLoad={testImg} />
        <input type="submit" value="Wyślij" className="submitBtn1" />
      </form>
    </FormWrapper>
  );
}
