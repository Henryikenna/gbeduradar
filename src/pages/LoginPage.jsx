import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import logo from "../assets/logo.svg";
import { toast } from 'sonner';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      // Sign in with Firebase
      // await signInWithEmailAndPassword(auth, email, password);

      // On successful login, Firebase auth state listener (which we'll set up later, e.g., in App.js or a context)
      // will typically handle redirecting the user or updating the UI.
      // For now, we can navigate directly.
      navigate('/home'); // Redirect to homepage after login
    } catch (err) {
      // Handle specific Firebase errors
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Failed to log in. Please try again later.');
        console.error("Firebase login error:", err);
        toast.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-bg to-bg px-4 py-12">
      <div className="w-full max-w-md space-y-8 p-8 sm:p-10 bg-card rounded-xl shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/" className="text-4xl font-bold text-brand-primary">
            <img src={logo} alt="GbeduRadar Logo" className="h-12" />
            {/* GbeduRadar */}
          </Link>
        </div>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Sign in to access your music radar.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-bg text-text sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-baseline">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Password
              </label>
              <Link
                to="/forgot-password" // We'll need to create this page later if desired
                className="text-xs sm:text-sm text-brand-primary hover:text-brand-primary-hover hover:text-brand-accent"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-bg text-text sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-brand-primary hover:text-brand-accent">
            Register Here
          </Link>
        </p>
      </div>
       {/* <Link to="/" className="mt-8 text-xs text-brand-primary hover:underline dark:text-dark-text-secondary dark:hover:text-dark-text">
        &larr; Back to Landing Page
      </Link> */}
    </div>
  );
}

export default LoginPage;