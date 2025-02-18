import apiUrl from "../providers/apiUrl";

const login = ({ email, password }) => {
  const request = new Request(`${apiUrl}/admin/login`, {
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
      localStorage.setItem("admin_auth", JSON.stringify(auth));
    })
    .catch(() => {
      throw new Error("Erro de rede");
    });
};

const logout = () => {
  const request = new Request(`${apiUrl}/admin/logout`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "include",
  });
  return fetch(request)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      localStorage.removeItem("admin_auth");
      return Promise.resolve();
    })
    .catch(() => {
      localStorage.removeItem("admin_auth");
      return Promise.resolve();
    });
};

const checkAuth = () => {
  let token = localStorage.getItem("admin_auth");
  return token
    ? Promise.resolve()
    : Promise.reject({ message: "Login necessário" });
};

const checkError = (error) => {
  const status = error.status;
  if (status === 401 || status === 403) {
    localStorage.removeItem("admin_auth");
    return Promise.reject();
  }

  return Promise.resolve();
};

const getIdentity = () => {
  try {
    const identity = localStorage.getItem("admin_auth");
    return Promise.resolve(JSON.parse(identity));
  } catch {
    return Promise.reject();
  }
};

const getPermissions = () => {
  return Promise.resolve();
};

const authProvider = {
  login,
  logout,
  checkAuth,
  checkError,
  getPermissions,
  getIdentity,
};

export default authProvider;
