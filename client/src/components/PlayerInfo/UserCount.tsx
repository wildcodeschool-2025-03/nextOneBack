import client from "../../services/client";

const UserCount = async () => {
  try {
    const response = await client.get("/users?type=user&format=count");
    return response.data.count;
  } catch (error) {
    return 0;
  }
};
export default UserCount;
