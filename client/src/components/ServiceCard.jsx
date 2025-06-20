import React from 'react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ title, description, link }) {
  return (
    <div className="border rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4 text-gray-700">{description}</p>
      <Link
        to={link}
        className="text-blue-700 hover:underline font-medium"
      >
        Use Service
      </Link>
    </div>
  );
}
