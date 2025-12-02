// pages/Home.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getContacts } from "../services/contactService.js";
import { ContactCard } from "../components/ContactCard.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    getContacts(dispatch);
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Lista de Contactos</h1>
        <button 
          className="btn btn-success" 
          onClick={() => navigate('/demo')}
        >
          <i className="fas fa-plus-circle me-2"></i>
          Añadir Contacto
        </button>
      </div>

      {store.loading && <div className="text-center"><div className="spinner-border" role="status"></div></div>}
      {store.error && <div className="alert alert-danger">Error: {store.error}</div>}
      
      {!store.loading && !store.error && store.contacts.length === 0 && (
        <div className="text-center mt-5">
          <h3>No tienes contactos aún.</h3>
          <p>¡Haz clic en el botón "Añadir Contacto" para comenzar!</p>
        </div>
      )}

      <div className="row">
        {store.contacts.map((contact) => (
          <div key={contact.id} className="col-md-4 mb-4">
            <ContactCard contact={contact} />
          </div>
        ))}
      </div>
    </div>
  );
};