import { fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import apiUrl from "./apiUrl";
import exportProvider from "./exportProvider";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  // const { access_token } = JSON.parse(localStorage.getItem("auth"));
  // options.headers.set("Authorization", `Bearer ${access_token}`);

  return fetchUtils.fetchJson(url, options).catch((err) => {
    const { error, message } = err.body;

    const response = { status: err.status, message: error };

    if (
      typeof error === "object" &&
      (error !== null) & (Object.values(error).length > 0)
    ) {
      response.message = Object.values(error)[0]?.[0];
    } else {
      if (message) {
        response.message = message;
      }
    }

    throw response;
  });
};

let dataProvider = simpleRestProvider(apiUrl, httpClient);
let exportDataProvider = exportProvider(apiUrl, httpClient);

const appDataProvider = {
  ...dataProvider,
  getOne: (resource, params) => dataProvider.getOne(resource, params),
  getList: async (resource, params) => dataProvider.getList(resource, params),
  update: async (resource, params) => dataProvider.update(resource, params),
  getMany: async (resource, params) => dataProvider.getMany(resource, params),
  ...exportDataProvider,
};

export default appDataProvider;
export { httpClient };