const PYTHON_URL = "http://localhost:8000";
const JAVA_URL = "http://localhost:8080";
export function fetchUrl(url, { ...options }, language, ...otherParams) {
  if (options.data) {
    options.body = JSON.stringify({ ...options.data });
  }
  options.headers = {
    ...options.headers,
    // Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };
  const baseURL = language === "java" ? JAVA_URL : PYTHON_URL;
  return url.startsWith("/")
    ? fetch(baseURL + url, options, ...otherParams)
    : fetch(url, options, ...otherParams);
}
