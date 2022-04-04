const BASE_URL = "http://localhost:8080";
export function fetchUrl(url, { ...options }, ...otherParams) {
  if (options.data) {
    options.body = JSON.stringify({ ...options.data });
  }
  options.headers = {
    ...options.headers,
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };
  return url.startsWith("/")
    ? fetch(BASE_URL + url, options, ...otherParams)
    : fetch(url, options, ...otherParams);
}
