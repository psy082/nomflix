import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Message from "../../Components/Message";
import Section from "../../Components/Section";
import Details from "../../Components/Details";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  position: relative;
  /* top: 0px; */
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
  visibility: visible;
  opacity: 1;
  z-index: -1;

  transition: all 0.5s ease-in-out 0.3s;
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 25vh;
  width: 30%;
  height: 40%;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.5s ease-in-out 0.3s;
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
  src: ${props => props.src};
`;

const CoverContainer = styled.div`
  width: 30%;
  height: 100%;
  &:hover {
    ${Cover} {
      opacity: ${props => (props.isVideo ? "0" : "1")};
      transform: ${props =>
        props.isVideo ? `matrix(1, 0, 0, 0.5, 0, 0)` : "none"};
    }

    ${VideoContainer} {
      opacity: ${props => (props.isVideo ? "1" : "0")};
    }
  }
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 15px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const OverView = styled.p`
  font-size: 15px;
  opacity: 0.7;
  line-height: 1.5;
  width: 80%;
`;

const TabContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const TabLink = styled.label`
  width: 150px;
  order: 1;
  display: block;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  padding: 10px 0px;
  background-color: rgba(52, 152, 219, 0.5);

  border-bottom: 3px solid
    ${props => (props.checked ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;

  &:hover {
    background-color: rgba(52, 152, 219, 1);
  }
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
`;

const TabContents = styled.div`
  order: 99;
  flex-grow: 1;
  height: 50vh;
  width: 100%;
  display: ${props => (props.checked ? "block" : "none")};
  padding: 20px;
  transition: display 0.5s ease-in-out;

  overflow: scroll;
  -ms-overflow-style: none; // IE에서 스크롤바 감춤
  &::-webkit-scrollbar {
    display: none !important; // 윈도우 크롬 등
  }
`;

const Tabs = styled.input.attrs(props => ({
  id: props.id,
  type: props.type,
  name: props.name,
  value: props.value,
  checked: props.checked,
  onChange: props.onChange
}))`
  display: none;
`;

const DetailPresenter = ({
  result,
  isMovie,
  error,
  loading,
  radioGroup,
  handleRadio
}) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>{result.title ? result.title : result.name} | Nomflix</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <CoverContainer isVideo={result.videos.results[0] ? true : false}>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/popcorn-time.png")
            }
          />
          {result.videos.results[0] && (
            <VideoContainer>
              <Video
                src={`https://www.youtube.com/embed/${result.videos.results[0].key}?controls=0`}
              />
            </VideoContainer>
          )}
        </CoverContainer>
        <Data>
          <Title>{result.title ? result.title : result.name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime
                ? `${result.runtime} min`
                : result.episode_run_time
                ? `${result.episode_run_time[0]} min`
                : "unknown"}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <OverView>{result.overview}</OverView>
          <TabContainer>
            <TabLink checked={radioGroup["prod"]}>
              <Tabs
                id="prod"
                type="radio"
                name="tabs"
                value="prod"
                checked={radioGroup["prod"]}
                onChange={handleRadio}
              />
              Production
            </TabLink>
            <TabContents className="tab" checked={radioGroup["prod"]}>
              <Section title="Production Companies" width="30%">
                {result.production_companies.map(production => (
                  <Details
                    key={production.name}
                    name={production.name}
                    imagePath={production.logo_path}
                    height="150px"
                  />
                ))}
              </Section>
            </TabContents>

            {!isMovie && (
              <>
                <TabLink checked={radioGroup["created"]}>
                  <Tabs
                    id="created"
                    type="radio"
                    name="tabs"
                    value="created"
                    checked={radioGroup["created"]}
                    onChange={handleRadio}
                  />
                  Created By
                </TabLink>
                <TabContents className="tab" checked={radioGroup["created"]}>
                  <Section title="Created By">
                    {result.created_by.map(creator => (
                      <Details
                        key={creator.name}
                        name={creator.name}
                        imagePath={creator.profile_path}
                        height="180px"
                      />
                    ))}
                  </Section>
                </TabContents>

                <TabLink checked={radioGroup["seasons"]}>
                  <Tabs
                    id="seasons"
                    type="radio"
                    name="tabs"
                    value="seasons"
                    checked={radioGroup["seasons"]}
                    onChange={handleRadio}
                  />
                  Seasons
                </TabLink>
                <TabContents className="tab" checked={radioGroup["seasons"]}>
                  <Section title="Seasons">
                    {result.seasons.map(season => (
                      <Details
                        key={season.name}
                        name={season.name}
                        imagePath={season.poster_path}
                        height="180px"
                      />
                    ))}
                  </Section>
                </TabContents>
              </>
            )}
          </TabContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.prototype = {
  result: PropTypes.array,
  isMovie: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  radioGroup: PropTypes.object.isRequired,
  handleRadio: PropTypes.func.isRequired
};

export default DetailPresenter;
