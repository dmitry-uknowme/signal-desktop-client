import axios from "axios";
import store from "../store";

const getAutoRelations = async (numberPlate: string) => {
  const API_URL = store.getState().settings.API_URL;
  const { data, status } = await axios.post(`${API_URL}/getAutoRelations`, {
    number: numberPlate,
  });
  if (data.status !== "success")
    throw new Error(`Response failed with status ${data?.status || status}`);
  return data;
};
export default getAutoRelations;
