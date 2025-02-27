import React from 'react';

const Contact = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-gray-700">
        If you have any inquiries, feel free to reach out to us:
      </p>
      <div className="mt-4 space-y-2">
        <p>
          <span className="font-semibold">Merchant:</span> DEEPAK RAMBABU MAHATO
        </p>
        <p>
          <span className="font-semibold">Address:</span> Shop No. 9, Block 11, Transit Camp, Mahatma Gandhi Road, 
          Rajiv Gandhi Nagar, Near Dharavi Police Station, Dharavi, Mumbai - 400017, Maharashtra
        </p>
        <p>
          <span className="font-semibold">Phone:</span> 8591328442
        </p>
        <p>
          <span className="font-semibold">Email:</span>{' '}
          <a href="mailto:vishnuvogue1@gmail.com" className="text-blue-600 hover:underline">
            vishnuvogue1@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
