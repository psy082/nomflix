// Written by Jason Watmore
// https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example#authentication-service-js
"use strict";

import { BehaviorSubject } from "rxjs";

const baseUrl = "http://localhost:5000/api";

const init = () => {
  if (localStorage.getItem("currentUser") === "undefined") {
    localStorage.setItem("currentUser", JSON.stringify({}));
  }
};

init();

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

const loginByKakao = (id, token) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id, token })
  };

  return fetch(`${baseUrl}/user/authenticate`, requestOptions)
    .then(res => res.json())
    .then(text => {
      const data = JSON.parse(text.data);
      const { id, token } = data;

      localStorage.setItem("currentUser", JSON.stringify({ id, token }));
      currentUserSubject.next({ id, token });

      console.log(window.location);
      window.location.replace("/movie");
      return { id, token };
    });
};

const logout = () => {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
  window.location.reload();
};

export const authenticationService = {
  loginByKakao,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};
