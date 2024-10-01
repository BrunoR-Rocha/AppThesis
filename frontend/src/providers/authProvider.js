import apiUrl from "./apiUrl";

const authProvider = {
  login: async ({ email, password }) => {
    const request = new Request(apiUrl + "/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem("auth", JSON.stringify(auth));
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
  logout: () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { access_token } = JSON.parse(auth);

      const request = new Request(apiUrl + "/logout", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        }),
      });

      fetch(request);
    }
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkAuth: async () => {
    let auth = localStorage.getItem("auth");

    if (!auth) {
      return Promise.reject({ message: "login.required" });
    }

    const access_token = auth;

    const request = new Request(apiUrl + "/me", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      }),
    });

    return fetch(request).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        localStorage.removeItem("auth");
        return Promise.reject({ message: "login.required" });
      }
      return Promise.resolve();
    });
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      return Promise.resolve();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: () => {
    const { name } = JSON.parse(localStorage.getItem("auth"));
    const fullName = name;
    return Promise.resolve({ fullName });
  },

  getPermissions: () => {
    const authToken = localStorage.getItem("auth");
    if (authToken) {
      const { abilities } = JSON.parse(localStorage.getItem("auth"));
      return abilities ? Promise.resolve(abilities) : Promise.reject();
    } else {
      return Promise.reject();
    }
  },
};

export default authProvider;
