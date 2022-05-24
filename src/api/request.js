import axios from "axios";

const client = (() => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_END_POINT}`,
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
