import axios from "axios";
import { getAuthData } from "./dataStorage";

// Api requist for Register

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = "AIzaSyDWCCeidjdaSPKoon9908QGnQUddufi4rM";
const registerURL = `/accounts:signUp?key=${API_KEY}`;

export const RegisterAPI = (inputs) => {
  let data = {
    displayName: inputs.name,
    email: inputs.email,
    password: inputs.password,
  };
  return axios.post(registerURL, data);
};

// Api request for Login

const loginURL = `/accounts:signInWithPassword?key=${API_KEY}`;

export const loginAPI = (inputs) => {
  let data = { email: inputs.email, password: inputs.password };
  return axios.post(loginURL, data);
};

// Api request for User Details

const userDataURL = `/accounts:lookup?key=${API_KEY}`;

export const UserDataAPI = () => {
  let data = { idToken: getAuthData() };
  return axios.post(userDataURL, data);
};
