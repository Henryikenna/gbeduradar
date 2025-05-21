import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-9xl font-extrabold text-brand-primary">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-500 max-w-md text-center">
        The page you&#39;re looking for doesn&#39;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-bg text-white font-medium rounded-lg shadow-md hover:bg-cyan-400 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFoundPage