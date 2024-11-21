import ContactForm from "../../components/ContactForm";

export function Contact() {
  return (
    <div className="px-5 py-5">
      <h1 className="ml-2 py-2 font-Playfair text-3xl text-tiner font-semibold">
        Contact Us
      </h1>
      <p className="font-Montserrat ml-4 text-gray-500 font-normal text-md mt-2 max-w-4xl lg:max-w-4xl">
        We'd love to hear from you! Whether you have questions, feedback, or
        need help with your booking, we're here to assist. Fill out the form
        below, and we'll get back to you as soon as possible.
      </p>
      <p className="font-Montserrat ml-4 text-gray-500 font-normal text-md mt-2 max-w-4xl lg:max-w-4xl">
        <strong>How to Get in Touch:</strong>
      </p>
      <ul className="font-Montserrat ml-8 text-gray-500 font-normal text-md mt-2 max-w-4xl lg:max-w-4xl list-disc">
        <li>
          <strong>Contact Form:</strong> Simply fill out the form with your
          details and message, and our team will respond promptly.
        </li>
        <li>
          <strong>Email:</strong> Prefer email? Reach us at{" "}
          <a
            href="mailto:your-email@example.com"
            className="text-tiner hover:underline"
          >
            holidaze@gmail.com
          </a>{" "}
          for direct communication.
        </li>
      </ul>
      <p className="font-Montserrat ml-4 text-gray-500 font-normal text-md mt-2 max-w-4xl lg:max-w-4xl">
        Your satisfaction is our priority, and we're committed to making your
        Holidaze experience smooth and enjoyable. Let's connect!
      </p>
      <div>
        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;
