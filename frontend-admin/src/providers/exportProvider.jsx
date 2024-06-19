import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import getCookie from "../utils/getCookie";

const exportProvider = (apiUrl, httpClient = fetchUtils.fetchJson) => ({
  exportList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const rangeStart = (page - 1) * perPage;
    const rangeEnd = page * perPage - 1;

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([rangeStart, rangeEnd]),
      filter: JSON.stringify(params.filter),
    };

    if (params.justification) {
      query.justification = params.justification;
    }

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url, {
      headers: new Headers({
        Range: `${resource}=${rangeStart}-${rangeEnd}`,
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      }),
    }).then(({ headers, json }) => {
      if (!headers.has("content-range")) {
        throw new Error(
          "The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?"
        );
      }
      return {
        data: json,
        total: parseInt(headers.get("content-range").split("/").pop(), 10),
      };
    });
  },
});

export default exportProvider;
