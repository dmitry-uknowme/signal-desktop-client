import axios from "axios";
import store from "../store";

interface IFilter {
  role?: string;
  status?: string;
}

const getOrganizations = async (filter: IFilter, page = 1, limit = 100) => {
  const API_URL = store.getState().settings.API_URL;
  const { data, status } = await axios.get(
    `${API_URL}/getUsers?page=${page}&limit=${limit}${
      filter.role ? `&role=${filter.role}` : ""
    }${filter.status ? `&status=${filter.status}` : "&status=STATUS_ACTIVE"}`
  );
  if (data.status !== "success")
    throw new Error(`Response failed with status ${data?.status || status}`);
  return data;
};
export default getOrganizations;
