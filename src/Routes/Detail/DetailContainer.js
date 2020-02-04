import React from "react";
import DetailPresenter from "./DetailPresenter";
import { tvApi, movieApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      loading: true,
      error: null,
      isMovie: pathname.includes("/movie/"),

      radioGroup: {
        prod: true,
        created: false,
        seasons: false
      }
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;

    const { isMovie } = this.state;

    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return push("/");
    }

    let result;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything" });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  handleRadio = event => {
    let obj = {};
    obj[event.target.value] = event.target.checked;
    this.setState({ radioGroup: obj });
  };

  render() {
    const { result, loading, error, isMovie, radioGroup } = this.state;
    return (
      <DetailPresenter
        result={result}
        isMovie={isMovie}
        loading={loading}
        error={error}
        radioGroup={radioGroup}
        handleRadio={this.handleRadio}
      />
    );
  }
}
