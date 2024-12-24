import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-center text-white p-3">
      Copyright &copy; {new Date().getFullYear()} DevConnector
    </footer>
  );
}

export default Footer;
