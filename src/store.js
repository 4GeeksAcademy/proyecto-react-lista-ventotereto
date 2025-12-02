
export const initialStore = () => {
  return {
    contacts: [], 
    loading: false, 
    error: null, 
  };
};
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_loading':
      return { ...store, loading: action.payload };
    case 'set_error':
      return { ...store, error: action.payload, loading: false };
    case 'get_contacts':
      return { ...store, contacts: action.payload, loading: false, error: null };
    case 'add_contact':
      return { ...store, contacts: [...store.contacts, action.payload], error: null };
    case 'update_contact':
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        error: null,
      };
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== action.payload),
        error: null,
      };
    default:
      return store;
  }
}