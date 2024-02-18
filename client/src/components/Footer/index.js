import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <span className="copyright">
          &copy; Made by{" "}
          <a
            href="https://dhruvermafz.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="author-link"
          >
            Dhruv Verma
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
