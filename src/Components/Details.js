import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Image = styled.img.attrs(props => ({ src: props.bgUrl }))`
  width: 100%;
  height: ${props => (props.height ? props.height : "125px")};
  background-size: cover;
  background-position: center center;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const ImageContainer = styled.div`
  & :hover {
    box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
    transform: translate3d(0px, -1px, 0px);
  }

  transition: all 10s ease-in-out 1s;
`;

const Container = styled.div`
  margin-bottom: 5px;
  position: relative;
`;

const Name = styled.div`
  display: block;
  margin-bottom: 3px;
`;

const Production = ({ name, imagePath, height }) => (
  <Container>
    <ImageContainer>
      <Image
        bgUrl={
          imagePath
            ? `https://image.tmdb.org/t/p/original${imagePath}`
            : require("../assets/popcorn-time.png")
        }
        height={height}
      />
    </ImageContainer>
    <Name>{name}</Name>
  </Container>
);

Production.prototype = {
  name: PropTypes.stirng,
  imagePath: PropTypes.string
};

export default Production;
