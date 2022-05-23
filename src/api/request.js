import axios from "axios";

const client = (() => {
  return axios.create({
    baseURL: "http://localhost:4000",
  });
})();

const request = async function (options, store) {
  const onSuccess = function (response) {
    return response;
  };

  const onError = function (error) {
    return Promise.reject(error);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
