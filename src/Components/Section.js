import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: ${props =>
    props.width
      ? `repeat(auto-fit, ${props.width})`
      : `repeat(auto-fill, 125px)`};
  -webkit-box-pack: center;
  grid-gap: 25px;
`;

const Section = ({ title, children, width }) => (
  <Container>
    <Title>{title}</Title>
    <Grid width={width}>{children}</Grid>
  </Container>
);

Section.prototype = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default Section;
