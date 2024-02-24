import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:30001/api/1",
  headers: {
    "Content-type": "application/json",
  },
});
