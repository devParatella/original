// components/ReservationList.js
import React, { useEffect, useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllReservations, updateReservation } from "../../services/reservationService";
import { getAllPaymentConditions } from '../../services/paymentConditionService';
import Swal from 'sweetalert2';
import "./ReservationList.css";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [paymentConditions, setPaymentConditions] = useState([]);
  const [updatedReservations, setUpdatedReservations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationsResponse = await getAllReservations();
        const paymentConditionsResponse = await getAllPaymentConditions();

        setReservations(reservationsResponse.data);
        setPaymentConditions(paymentConditionsResponse.data);

        const storedUpdatedReservations = JSON.parse(localStorage.getItem('updatedReservations')) || [];
        setUpdatedReservations(storedUpdatedReservations);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao buscar reservas ou condições de pagamento'
        });
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
  };

  const handleCancel = async (reservationID) => {
    const isConfirmed = await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você realmente deseja cancelar esta reserva?',
      icon: 'warning',
      showCancelButton: 'true',
      cancelButtonText: 'Não',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    });

    if (!isConfirmed.isConfirmed) return;

    try {
      const data = {
        status: 'Cancelada',
        cancelled: true
      };

      await updateReservation(reservationID, data);
      const updatedReservationsList = reservations.map(reservation => {
        if (reservation.id === reservationID) {
          return { ...reservation, ...data };
        }
        return reservation;
      });
      setReservations(updatedReservationsList);

      const newUpdatedReservations = [...updatedReservations, reservationID];
      setUpdatedReservations(newUpdatedReservations);
      localStorage.setItem('updatedReservations', JSON.stringify(newUpdatedReservations));

      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Reserva cancelada com sucesso!'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao cancelar reserva.'
      });
    }
  };

  const handleFinish = async (reservationID) => {
    const isConfirmed = await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você realmente deseja marcar esta reserva como finalizada?',
      icon: 'warning',
      showCancelButton: 'true',
      cancelButtonText: 'Não',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    });

    if (!isConfirmed.isConfirmed) return;

    try {
      const data = {
        status: 'Finalizada'
      };

      await updateReservation(reservationID, data);
      const updatedReservationsList = reservations.map(reservation => {
        if (reservation.id === reservationID) {
          return { ...reservation, ...data };
        }
        return reservation;
      });
      setReservations(updatedReservationsList);

      const newUpdatedReservations = [...updatedReservations, reservationID];
      setUpdatedReservations(newUpdatedReservations);
      localStorage.setItem('updatedReservations', JSON.stringify(newUpdatedReservations));

      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Reserva marcada como finalizada!'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao marcar reserva como finalizada.'
      });
    }
  };

  const getPaymentConditionName = (id) => {
    const condition = paymentConditions.find(condition => condition.id === id);
    return condition ? condition.name : "Desconhecido";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <NavBar isOpen={isSidebarOpen} />
      <main id="main" className="main">
        <div className="breadcrumb-container">
          <h1>Listar Reservas</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Movimentações</li>
              <li className="breadcrumb-item active">Listar Reservas</li>
            </ol>
          </nav>
        </div>
        <div className="reservations-container">
          {reservations.map((reservation) => (
            <div className={`reservation-card ${reservation.cancelled ? 'cancelled' : ''}`} key={reservation.id}>
              <p className="id">ID: {reservation.id} </p>
              <p>Check-in: {formatDate(reservation.checkin)}</p>
              <p>Check-out: {formatDate(reservation.checkout)}</p>
              <p className={`status-view ${reservation.status === 'Cancelada' ? 'cancelled-status' : ''}`}>
                Status: {reservation.status}
              </p>
              <p className="payment-method">
                Método de Pagamento: {getPaymentConditionName(reservation.paymentConditionId)}
              </p>
              <p>Diárias Reservadas: {reservation.duration} {reservation.duration === 1 ? "Diária" : "Diárias"}</p>
              <p className="totalValue">Valor Total: R${reservation.totalValue.toFixed(2)}</p>
              <ul className="products-list">
                {reservation.products && reservation.products.map((product) => (
                  <li className="product-item" key={product.id}>
                    <p className="product-name">Acomodação: {product.name}</p>
                    <p className="dayly-rate">Valor por Diária: R${product.daylyRate.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <hr />
              <div className="reservation-footer">
                <div className="reservation-buttons">
                  {reservation.cancelled || updatedReservations.includes(reservation.id) ? (
                    <>
                      <button className="reservation-finish-button finished" disabled>Finalizada</button>
                      <button className="reservation-cancel-button cancelled" disabled>Cancelado</button>
                    </>
                  ) : (
                    <>
                      <button className="reservation-finish-button" onClick={() => handleFinish(reservation.id)}>Finalizar</button>
                      <button className="reservation-cancel-button" onClick={() => handleCancel(reservation.id)}>Cancelar</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReservationList;
