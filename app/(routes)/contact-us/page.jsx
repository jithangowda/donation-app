import React from "react";

function ContactUs() {
  const contactUsDetails = {
    title: "Contact Us",
    sections: [
      {
        heading: "Get in Touch",
        content: `We'd love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out to us. Here’s how you can contact us:`,
      },
      {
        heading: "Email",
        content: `You can email us at: <span class="text-blue-500">support@donatory.com</span>. We aim to respond to all inquiries within 24-48 hours.`,
      },
      {
        heading: "Phone",
        content: `For urgent matters, you can call us at: <span class="text-blue-500">+91 123 456 7890</span>. Our support team is available Monday through Friday, 9 AM to 5 PM.`,
      },
      {
        heading: "Address",
        content: `Visit us at our office: <br/>
          <strong>Donatory Inc.</strong><br/>
          123 Charity Lane<br/>
          Generosity City, GC 56789<br/>
          Country`,
      },
      {
        heading: "Follow Us",
        content: `Stay updated and follow us on social media:<br/>
          <span class="text-blue-500">Facebook</span> | <span class="text-blue-500">Twitter</span> | <span class="text-blue-500">Instagram</span>`,
      },
    ],
  };

  const renderHTML = (text) => {
    return { __html: text }; // Directly render HTML
  };

  return (
    <div className="p-4 md:px-32 md:my-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {contactUsDetails.title}
        </h1>
        {contactUsDetails.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{section.heading}</h2>
            <div
              className="text-lg text-gray-700 text-justify"
              dangerouslySetInnerHTML={renderHTML(section.content)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactUs;
