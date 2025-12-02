
import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-3 text-center bg-light">
      <p className="text-muted mb-0">
        © {currentYear} Mi Agenda de Contactos. Hecho con React.
      </p>
    </footer>
  );
};