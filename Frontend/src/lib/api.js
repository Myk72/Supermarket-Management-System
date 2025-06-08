import axios from "axios";

export const api = axios.create({
  baseURL: "https://192.168.8.19:8000", // i need to configure everytime until i find a way to make it dynamic
});