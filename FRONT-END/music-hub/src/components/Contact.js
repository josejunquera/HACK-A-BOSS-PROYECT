import React from "react";

function Contact() {
  return (
    <section className="contact">
      <form action="post">
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Asunto" />
        <input type="textarea" placeholder="Mensaje" />
        <button type="submit">ENVIAR</button>
      </form>
    </section>
  );
}

export default Contact;
