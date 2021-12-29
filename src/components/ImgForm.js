import React from "react";
import { useState } from "react";
import styled from "styled-components";

const ImgLoadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem;
  align-items: center;

  input {
    cursor: pointer;
  }
`;

const ImgContainerPreview = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
  }
`;

const ImgDeleteButton = styled.button`
  cursor: pointer;
  padding: 1rem;
  background: darkred;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 1rem;
  transition-duration: 200ms;
  &&:hover {
    background-color: red;
    transition-duration: 200ms;
  }
`;

export default function ImgForm({ onLoad }) {
  //obsługa ładowania img
  const [selectedImage, setSelectedImage] = useState();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const tempImg = new Image();
      tempImg.src = window.URL.createObjectURL(e.target.files[0]);
      tempImg.onload = () => {
        onLoad(tempImg.width, tempImg.height);
        // sprawdzenie aspect ratio
        if (tempImg.width === tempImg.height) {
          setSelectedImage(e.target.files[0]);
        } else {
          removeSelectedImage();
          alert(
            "Zdjęcie nie spełnia wymogów. Aspect ratio zdjęcia musi wynosić 1:1"
          );
        }
      };
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  return (
    <ImgLoadWrapper>
      <label>Wybierz obrazek</label>
      {/* walidacja formatu img */}
      <input
        accept="image/png, image/gif, image/jpeg"
        type="file"
        onChange={imageChange}
      />
      {selectedImage && (
        <ImgContainerPreview>
          <img src={URL.createObjectURL(selectedImage)} alt="Thumb" />
          <ImgDeleteButton onClick={removeSelectedImage}>
            Usuń obrazek
          </ImgDeleteButton>
        </ImgContainerPreview>
      )}
    </ImgLoadWrapper>
  );
}
