import React from "react";
import {
  RiPhoneLine,
  RiTimeLine,
  RiMapPinLine,
  RiMailLine,
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
} from "react-icons/ri";
import "./Styles/Footer.css";

export default function Footer({
  bgImage = "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg", // cambia por tu imagen
}) {
  return (
    <>
      {/* NEWSLETTER */}
      <section
        className="nl-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(5,40,80,.65), rgba(5,40,80,.65)), url(${bgImage})`,
        }}
      >
        <div className="container">
          <h2 className="nl-title">NEWSLETTER</h2>
          <p className="nl-subtitle">
            Suscríbete y mantente informado acerca de nuestras ofertas, noticias
            y eventos.
          </p>

          <form
  className="nl-form"
  onSubmit={(e) => {
    e.preventDefault();
    alert("¡Gracias por suscribirte!");
  }}
>
  <div className="nl-field">
    <input
      type="email"
      required
      className="nl-input"
      placeholder="Ingresar correo"
    />
    <button className="nl-btn" type="submit">
      Registrarse
    </button>
  </div>
</form>

<label className="nl-terms">
  <input type="checkbox" required /> <span>*Aceptar</span>{" "}
  <a href="#" className="nl-terms-link">Términos y condiciones</a>
</label>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <h4>Sobre Nosotros</h4>
            <ul>
              <li><a href="#">Acerca de nosotros</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">Políticas de Privacidad</a></li>
              <li><a href="#">Trabaja con Nosotros</a></li>
            </ul>

            <h5>Síguenos</h5>
            <div className="social">
              <a href="#" aria-label="Facebook"><RiFacebookFill /></a>
              <a href="#" aria-label="Instagram"><RiInstagramLine /></a>
              <a href="#" aria-label="LinkedIn"><RiLinkedinBoxFill /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Holding EPYSA CHILE</h4>
            <ul>
              <li><a href="#">EPYSA Buses</a></li>
              <li><a href="#">EPYSA Equipos</a></li>
              <li><a href="#">Servi Bus</a></li>
              <li><a href="#">FITRANS</a></li>
              <li><a href="#">Mundo LCV</a></li>
              <li><a href="#">Bus Market</a></li>
              <li><a href="#">Implementos Perú</a></li>
              <li><a href="#">Implementos España</a></li>
              <li><a href="#">Mercobus</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Mi cuenta</h4>
            <ul>
              <li><a href="#">Mi cuenta</a></li>
              <li><a href="#">Mis pedidos</a></li>
              <li><a href="#">Mis cotizaciones</a></li>
              <li><a href="#">Seguimiento de compra</a></li>
              <li><a href="#">Cerrar sesión</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contáctanos</h4>
            <div className="contact-item">
              <RiPhoneLine />
              <div>
                <div>Para ventas:</div>
                <strong>800 330 088</strong> <span>(Opción 1)</span>
              </div>
            </div>

            <div className="contact-item">
              <RiPhoneLine />
              <div>
                <div>Para servicio al cliente:</div>
                <strong>800 330 088</strong> <span>(Opción 3)</span>
              </div>
            </div>

            <div className="contact-item">
              <RiTimeLine />
              <div>
                <div>Horario: Lu a Vi 9:00 a 18:30 hrs.</div>
                <div>Sab 9:00 a 13:00 hrs.</div>
              </div>
            </div>

            <div className="contact-item">
              <RiMapPinLine />
              <div>Av. Gral. Velásquez N° 10701, San Bernardo, Santiago.</div>
            </div>

            <a href="#" className="contact-btn">
              <RiMailLine /> Contacto
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          Implementos es la red de repuestos, insumos y accesorios para
          camiones, buses y remolques más grande del país.
        </div>
      </footer>
    </>
  );
}