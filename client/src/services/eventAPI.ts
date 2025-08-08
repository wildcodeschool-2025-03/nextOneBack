import axios from "axios";
import type { Event, EventFormData } from "../types/event";

const api = import.meta.env.VITE_API_URL;

export const eventAPI = {
  async getAll(): Promise<Event[]> {
    const res = await axios.get(`${api}/api/events`);
    return res.data;
  },

  async getById(id: number): Promise<Event> {
    const res = await axios.get(`${api}/api/events/${id}`, {
      withCredentials: true,
    });
    return res.data;
  },

  async create(data: EventFormData): Promise<void> {
    await axios.post(`${api}/api/events/`, data, {
      withCredentials: true,
    });
  },

  async update(id: number, data: EventFormData): Promise<void> {
    await axios.put(`${api}/api/events/${id}`, data, {
      withCredentials: true,
    });
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${api}/api/events/${id}`, {
      withCredentials: true,
    });
  },
};
