const axios = require('axios');

module.exports = async ({ method, url, headers = null, params = null, data = null, proxy = null }) => {
  return await axios(
    {
      method,
      url,
      headers,
      params,
      data,
      responseType: null,
      proxy
    }
  );
};
