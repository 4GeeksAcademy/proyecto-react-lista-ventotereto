
import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { deleteContact } from "../services/contactService.js";

export const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar a ${contact.name}?`
    );

    if (isConfirmed) {
      const success = await deleteContact(dispatch, contact.id);
      if (success) {
        console.log("Contacto eliminado con éxito.");
      }
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <img
            src={`https://picsum.photos/seed/${contact.id}/100`} 
            className="rounded-circle me-3"
            alt="Profile"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <h5 className="card-title mb-1">{contact.name}</h5>
            <p className="card-text mb-1">
              <i className="fas fa-envelope me-2"></i>
              {contact.email}
            </p>
            <p className="card-text mb-1">
              <i className="fas fa-phone me-2"></i>
              {contact.phone}
            </p>
            <p className="card-text">
              <i className="fas fa-map-marker-alt me-2"></i>
              {contact.address}
            </p>
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between bg-light">
        <button
          className="btn btn-warning"
          onClick={() => navigate(`/single/${contact.id}`)}
        >
          <i className="fas fa-edit"></i> Editar
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i> Eliminar
        </button>
      </div>
    </div>
  );
};