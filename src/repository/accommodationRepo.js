import axiosInstance from "../axios/axios";

export const accommodationRepo = {
  findAll: async () => {
    return await axiosInstance.get("/all");
  },
  findById: async (id) => {
    return await axiosInstance.get(`/${id}`);
  },
  create: async (p) => {
    return await axiosInstance.post("/accommodations", p);
  },
  deleteById: async (id) => {
    return await axiosInstance.delete(`/${id}`);
  },
  update: async (id, accommodation) => {
    return await axiosInstance.put(`${id}`, accommodation);
  },

  addTempReservation: async (data) => {
    return await axiosInstance.post("/temp-reservation", data);
  },

  getTempReservationsByUser: async (userId) => {
    return await axiosInstance.get(`/temp-reservation/${userId}`);
  },
};
