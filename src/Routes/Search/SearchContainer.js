import React from "react";
import SearchPresenter from "./SearchPresenter";
import { tvApi, movieApi } from "../../api";

export default class extends React.Component {
  state = {
    movieResults: null,
    showResults: null,
    searchTerm: "",
    loading: false,
    error: null
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  updateTerm = event => {
    const {
      target: { value }
    } = event;
    this.setState({ searchTerm: value });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults }
      } = await movieApi.search(searchTerm);
      const {
        data: { results: showResults }
      } = await tvApi.search(searchTerm);

      this.setState({ movieResults, showResults });
    } catch {
      this.setState({ error: "Can't find results." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      movieResults,
      showResults,
      searchTerm,
      loading,
      error
    } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        showResults={showResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
