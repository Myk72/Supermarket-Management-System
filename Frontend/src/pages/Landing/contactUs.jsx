import React from "react";

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 text-blue-900 font-serif">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-6 max-w-xl">
        We'd love to hear from you. Whether you have questions, feedback, or need support,
        feel free to reach out.
      </p>
      <div className="text-base space-y-2">
        <p><strong>Email:</strong> Mbs@test.com</p>
        <p><strong>Phone:</strong> +251-912345678</p>
        <p><strong>Address:</strong> Addis Ababa, Ethiopia</p>
      </div>
    </div>
  );
};

export default ContactUs;
