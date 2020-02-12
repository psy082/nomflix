import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  margin-bottom: 5px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;

  transition: all 10s ease-in-out 1s;

  & :hover {
    box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
    transform: translate3d(0px, -1px, 0px);
  }
`;

const Image = styled.img.attrs(props => ({ src: props.bgUrl }))`
  width: 100%;
  height: 125px;
  background-size: cover;
  background-position: center center;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const Name = styled.div`
  display: block;
  margin-bottom: 3px;
`;

const Production = ({ name, imagePath }) => (
  <Container>
    <Image
      bgUrl={
        imagePath
          ? `https://image.tmdb.org/t/p/original${imagePath}`
          : require("../assets/popcorn-time.png")
      }
    />
    <Name>{name}</Name>
  </Container>
);

Production.prototype = {
  name: PropTypes.stirng,
  imagePath: PropTypes.string
};

export default Production;
