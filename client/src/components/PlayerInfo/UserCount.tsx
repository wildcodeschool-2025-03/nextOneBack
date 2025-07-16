import type { AxiosRequestConfig } from "axios";
import client from "../../services/client";

const UserCount = async (data?: AxiosRequestConfig): Promise<number> => {
  try {
    const response = await client.get("/users?type=user&format=count", data);
    return response.data.count;
  } catch (error) {
    return 0;
  }
};
export default UserCount;
