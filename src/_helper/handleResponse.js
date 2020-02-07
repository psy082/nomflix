import { authenticationService } from "../_services";

export function handleResponse(response) {
  return response.text().then(text => {
    console.log(text);
    const data = text && JSON.parse(text);
    if (response.status !== 200) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        authenticationService.logout();
        Location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
