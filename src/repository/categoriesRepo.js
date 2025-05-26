import axiosInstance from "../axios/axios.js";

const categoriesRepository = {
  findAll: async () => {
    return await axiosInstance.get("/api/category");
  },
};

export default categoriesRepository;
