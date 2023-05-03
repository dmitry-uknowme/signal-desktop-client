import axios from "axios";
import store from "../store";

const getCargoCategories = async () => {
  const API_URL = store.getState().settings.API_URL;
  const { data, status } = await axios.get(`${API_URL}/getWasteCategories`);
  if (data.status !== "success")
    throw new Error(`Response failed with status ${data?.status || status}`);
  return data;
};
export default getCargoCategories;
