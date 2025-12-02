
const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "ventoreto";

export const getContacts = async (dispatch) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`);

    if (!response.ok) {
      if (response.status === 404) {
        dispatch({ type: "get_contacts", payload: [] });
        return;
      }
      throw new Error(
        `Error al obtener los contactos: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    const contactsArray = data.contacts || [];

    dispatch({ type: "get_contacts", payload: contactsArray });
  } catch (error) {
    dispatch({ type: "set_error", payload: error.message });
  } finally {
    dispatch({ type: "set_loading", payload: false });
  }
};

export const createContact = async (dispatch, contactData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      }
    );
    if (!response.ok) {
      throw new Error("Error al crear el contacto.");
    }
    getContacts(dispatch);
    return true;
  } catch (error) {
    dispatch({ type: "set_error", payload: error.message });
    return false;
  }
};
export const updateContact = async (dispatch, contactId, contactData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      }
    );
    if (!response.ok) {
      throw new Error("Error al actualizar el contacto.");
    }
    getContacts(dispatch);
    return true;
  } catch (error) {
    dispatch({ type: "set_error", payload: error.message });
    return false;
  }
};

export const deleteContact = async (dispatch, contactId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Error al eliminar el contacto.");
    }
    getContacts(dispatch);
    return true;
  } catch (error) {
    dispatch({ type: "set_error", payload: error.message });
    return false;
  }
};
