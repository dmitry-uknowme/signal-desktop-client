import axios from "axios";
import store from "../../store";

interface CreateActPayload {
  payerPublicId: string;
  transporterPublicId: string;
  autoNumber: string;
  cargoTypePublicId: string;
  wasteCategoryPublicId: string;
  weight: number;
  comment: string;
  // apiClientSecretKey:string
}

const createAct = async (payload: CreateActPayload) => {
  const API_URL = store.getState().settings.API_URL;
  const { data, status } = await axios.post(`${API_URL}/createAct`, payload);
  if (data.status !== "success")
    throw new Error(`Response failed with status ${data?.status || status}`);
  return data;
};
export default createAct;
