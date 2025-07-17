import client from "./client";

const userCount = async (options?: string): Promise<number> => {
  try {
    const response = await client.get(`/users${options}`);
    return response.data.count as number;
  } catch (error) {
    return 0;
  }
};
export default userCount;
