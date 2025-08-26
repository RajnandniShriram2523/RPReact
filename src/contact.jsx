import React from "react";
import "./contact.css";

export default function Contact() {
  return (
    <main className="contact-wrapper" role="main" aria-label="Contact Us Section">
      <h3>Contact Us</h3>
      <p className="intro">
        Have questions or need assistance? We're here to help!
      </p>

      <section className="contact-info" aria-label="Library Contact Information">
        <article className="contact-item" tabIndex="0">
          <h2>📍 Address</h2>
          <address>
            123 Book Lane, <br />
            Library Hub, <br />
            BK 45678
          </address>
        </article>

        <article className="contact-item" tabIndex="0">
          <h2>📞 Phone</h2>
          <p>+91 58765 43210</p>
        </article>

        <article className="contact-item" tabIndex="0">
          <h2>✉️ Email</h2>
          <p>libraryhub@bookmanagement.com</p>
        </article>
      </section>

      <section className="contact-form-section" aria-label="Send Us a Message">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()} noValidate>
          <h2>Send Us a Message</h2>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            autoComplete="name"
            aria-required="true"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
            autoComplete="email"
            aria-required="true"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Write your message here..."
            required
            aria-required="true"
          ></textarea>

          <button type="submit" aria-label="Send Message to Library Hub">
            Send Message
          </button>
        </form>
      </section>

      <section className="additional-info" aria-label="Additional Contact Information">
        <h2>Office Hours</h2>
        <p>Monday - Friday: 9:00 AM to 6:00 PM</p>
        <p>Saturday: 10:00 AM to 4:00 PM</p>
        <p>Sunday: Closed</p>

        <h2>Follow Us</h2>
        <p>Facebook | Twitter | Instagram</p>
      </section>

      <footer className="footer" role="contentinfo">
        <p>© 2025 LibraryHub. All rights reserved.</p>
        <p>Designed & Developed by the LibraryHub Team</p>
      </footer>
    </main>
  );
}