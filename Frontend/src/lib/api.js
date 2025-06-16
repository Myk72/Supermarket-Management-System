import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/", // https://192.168.172.131:8000, for scanner i need to configure everytime until i find a way to make it dynamic
});
