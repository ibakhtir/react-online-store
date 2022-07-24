import React from "react";

const data = {
  address: "Украина, Одесса",
  email: "info@example.com",
  phone: "+38 _ _ _ _ _ _ _ _ _ _"
};

const Footer = () => (
  <div className="container py-2">
    <footer>
      <section className="mb-1">
        <div className="bg-light rounded p-2">
          <div className="row align-items-center text-md-center text-muted mx-2">
            <p className="col-md-4 mb-0 mt-1">
              <i className="bi bi-house-door-fill text-warning me-1" />
              {data.address}
            </p>
            <p className="col-md-4 mb-0 mt-1">
              <i className="bi bi-envelope-fill text-warning me-1" />
              {data.email}
            </p>
            <p className="col-md-4 mb-0 mt-1">
              <i className="bi bi-telephone-fill text-warning me-1" />
              {data.phone}
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-dark rounded text-end p-2">
          <a
            href="https://github.com/"
            target="_blanc"
            className="text-warning mx-2"
          >
            <i className="bi bi-github" />
          </a>
        </div>
      </section>
    </footer>
  </div>
);

export default Footer;
