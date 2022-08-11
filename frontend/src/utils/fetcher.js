const makeUrl = (url) => `${process.env.API_URL}${url}`;

const fetcher = async (url, method, input) => {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = localStorage.getItem(process.env.TOKEN_KEY);
    if (token) {
      headers.append("authorization", `Bearer ${token}`);
    }
    const options = {
      method: method.toUpperCase(),
      headers,
      credentials: "same-origin",
    };
    if (method === "POST" || method === "PUT" || method === "DELETE") {
      if (input) {
        options.body = JSON.stringify(input);
      } else {
        options.body = JSON.stringify({});
      }
    }
    const res = await fetch(makeUrl(url), options);

    return await res.json();
  } catch (err) {
    return {
      status: "FAILED",
      message: "Network Called Failed",
    };
  }
};

const makeRequest = async (url, method, input) => {
  try {
    const response = await fetcher(url, method, input);
    if (response.status === "SUCCESS") {
      return {
        data: response.data,
        success: true,
      };
    }
    return {
      data: response.data,
      success: false,
    };
  } catch (e) {
    return {
      data: e,
      success: false,
    };
  }
};

export { fetcher, makeRequest };
