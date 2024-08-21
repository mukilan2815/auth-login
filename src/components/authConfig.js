import { createAuth0Client } from "@auth0/auth0-spa-js";

const config = {
  domain: "dev-cf1cjp3iu1s35b55.us.auth0.com",
  client_id: "BKE3LGQHPz6U8HQ4LULneObKwWuiGcc9",
  redirect_uri: window.location.origin,
};

export const initAuth0 = async () => {
  return await createAuth0Client(config);
};
