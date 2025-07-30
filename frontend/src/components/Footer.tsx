import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <div className="mb-2">
          <a href="/about" className="text-white mx-2 text-decoration-none">About</a>
          <a href="/contact" className="text-white mx-2 text-decoration-none">Contact</a>
          <a href="/privacy" className="text-white mx-2 text-decoration-none">Privacy</a>
        </div>

        <div className="mb-3">
          <a href="https://facebook.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://instagram.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
        </div>

        <small>&copy; {new Date().getFullYear()} Recipe-Room. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;