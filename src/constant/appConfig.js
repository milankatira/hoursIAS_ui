const env = process.env.ENV;
console.log(env);
const masterConfig = {
  local: {
    serverUrl: "http://localhost:5000/api/v1",
  },
  staging: {
    serverUrl: "https://revolttv-api.revoltcreator.com/api/v1",
  },
  prod: {
    serverUrl: "https://revolttv-api.revoltcreator.com",
  },
  test: {
    serverUrl: "http://localhost:4000/api/v1",
  },
};

export const serverUrl = masterConfig['local'].serverUrl;
