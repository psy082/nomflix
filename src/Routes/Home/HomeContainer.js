import React from "react";
import HomePresenter from "./HomePresenter";

import { authenticationService } from "../../_services";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const currentUser = authenticationService.currentUserValue;

    if (currentUser) {
      this.props.history.push("/movie");
    }
  }

  render() {
    return <HomePresenter />;
  }
}
