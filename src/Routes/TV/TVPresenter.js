import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const TVPresenter = ({ topRated, popular, airingToday, error, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>TV Shows | Nomflix</title>
      </Helmet>
      {airingToday && airingToday.length > 0 && (
        <Section title="Today's Airing Shows">
          {airingToday.map(show => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.name}
              imageUrl={show.poster_path}
              rating={show.vote_average}
              isMovie={false}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated Shows">
          {topRated.map(show => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.name}
              imageUrl={show.poster_path}
              rating={show.vote_average}
              isMovie={false}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Shows">
          {popular.map(show => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.name}
              imageUrl={show.poster_path}
              rating={show.vote_average}
              isMovie={false}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );

TVPresenter.prototype = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default TVPresenter;
