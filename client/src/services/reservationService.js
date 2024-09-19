import axios from "axios";

const API_URL = "/reservations";

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(API_URL, reservationData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Erro ao criar reserva: ${error.response?.data?.error || error.message}`
    );
  }
};

export const getAllReservations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(
      `Erro ao buscar reservas: ${error.response?.data?.error || error.message}`
    );
  }
};

export const getReservationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Erro ao buscar reserva por ID: ${
        error.response?.data?.error || error.message
      }`
    );
  }
};

export const updateReservation = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Erro ao atualizar reserva: ${
        error.response?.data?.error || error.message
      }`
    );
  }
};

export const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Erro ao deletar reserva: ${error.response?.data?.error || error.message}`
    );
  }
};
