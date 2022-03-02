import axios from "axios";
const { REACT_APP_LOCAL_SERVER } = process.env;
export async function login({ password, userName }) {
  return axios({
    method: "POST",
    url: `${REACT_APP_LOCAL_SERVER}users/signin`,
    data: {
      password: password,
      userName: userName,
    },
  });
}
export async function register({ email, password, phone, userName }) {
  return axios({
    method: "POST",
    url: `${REACT_APP_LOCAL_SERVER}users/signup`,
    data: {
      email: email,
      password: password,
      userName: userName,
      phone: phone,
    },
  });
}
