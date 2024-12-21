import React from "react";

function Footer() {
  return (
    <footer className="bg-dark fixed-bottom text-center text-white p-4">
      Copyright &copy; {new Date().getFullYear()} DevConnector
    </footer>
  );
}

export default Footer;
