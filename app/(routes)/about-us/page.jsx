import React from "react";

function AboutUs() {
  const aboutUsDetails = {
    title: "About Us",
    sections: [
      {
        heading: "Who We Are",
        content: `Welcome to Donatory, a platform dedicated to making it easier for people to give and receive. Our mission is to connect those who have something to offer with those who need it, creating a community where generosity and support thrive. Whether you're looking to donate items or are in need of something specific, Donatory is here to bridge the gap.`,
      },
      {
        heading: "Our Vision",
        content: `At Donatory, we believe that everyone has something valuable to give. Our vision is to create a world where no resource goes to waste and where people can effortlessly share what they have with others. We aim to build a network of kindness, where people help each other not just out of necessity, but out of a shared desire to improve lives.`,
      },
      {
        heading: "How It Works",
        content: `
          Using Donatory is simple and intuitive. Here’s how it works:
          <ol>
            <li><strong>1. Sign Up:</strong> Create an account to get started. It’s quick, easy, and free.</li>
            <li><strong>2. Post or Browse Listings:</strong> If you have something to donate, create a listing with details and location. If you’re looking for something, browse available listings in your area.</li>
            <li><strong>3. Connect and Share:</strong> Once you find a match, connect with the other user to arrange a pickup or drop-off. It’s that simple!</li>
            <li><strong>4. Make a Difference:</strong> By using Donatory, you’re not just decluttering your space—you’re making a positive impact in someone else’s life.</li>
          </ol>
        `,
      },
      {
        heading: "Why We Do It",
        content: `We started Donatory because we believe in the power of community and the importance of sharing. In a world where resources can sometimes be scarce, we want to make it easier for people to help one another. Our goal is to reduce waste, support those in need, and create a platform that fosters generosity and connection.`,
      },
      {
        heading: "Join Us",
        content: `We invite you to become part of the Donatory community. Whether you’re here to give or to receive, you’ll find a place where your contributions matter. Together, we can build a more connected, caring, and compassionate world.`,
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
          {aboutUsDetails.title}
        </h1>
        {aboutUsDetails.sections.map((section, index) => (
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

export default AboutUs;
