
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { createContact, updateContact } from "../services/contactService.js";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { theId } = useParams(); 

  const isEditMode = !!theId;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const contactToEdit = store.contacts.find(c => c.id === parseInt(theId));
      if (contactToEdit) {
        setFormData(contactToEdit);
      } else {
        navigate("/");
      }
    }
  }, [theId, store.contacts, navigate, isEditMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    let success;
    if (isEditMode) {
      success = await updateContact(dispatch, theId, formData);
    } else {
      success = await createContact(dispatch, formData);
    }

    if (success) {
      navigate("/");
    } else {
      setSubmitError("No se pudo guardar el contacto. Revisa los datos e intenta de nuevo.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>{isEditMode ? "Editar Contacto" : "Añadir Nuevo Contacto"}</h3>
            </div>
            <div className="card-body">
              {submitError && <div className="alert alert-danger">{submitError}</div>}
              {store.error && <div className="alert alert-danger">Error de API: {store.error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={store.loading}>
                    {store.loading ? "Guardando..." : (isEditMode ? "Actualizar Contacto" : "Crear Contacto")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};