const { default: axiosClient } = require("./axiosClient");

const addToCart = (payload) => axiosClient.post("/carts", payload);

const getUserCartItems = (email) =>
  axiosClient.get(
    `/carts?populate[products][populate]=image&filters[email][$eq]=${email}`
  );
const DeleteCartsItems = (id) => axiosClient.delete(`/carts/${id}`);

export default {
  addToCart,
  getUserCartItems,
  DeleteCartsItems,
};
