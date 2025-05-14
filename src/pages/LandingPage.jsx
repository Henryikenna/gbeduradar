import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { GrSelect } from "react-icons/gr";
import { GiRingingBell } from "react-icons/gi";
import { RxUpdate } from "react-icons/rx";
import { useAuth } from "../contexts/AuthContext";
import { FaArrowRightLong, FaArrowRightToBracket } from "react-icons/fa6";

const LandingPage = () => {
  const { profile, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      {/* Header */}
      <header className="py-6 px-4 sm:px-8 lg:px-16 shadow-lg shadow-brand-primary/10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-brand-primary">
            <img src={logo} alt="GbeduRadar Logo" className="h-12" />
            {/* GbeduRadar */}
          </Link>

          {profile ? (
            <div className="flex items-center gap-3">
              <Link
              to="/home"
              className="flex items-center gap-2 bg-brand-primary/50 px-4 py-2 rounded-full"
            >
              <div className="text-base">
                Welcome,{" "}
                <span className="font-semibold"> {profile.displayName}</span>
              </div>
              <FaArrowRightLong />
            </Link>

            <button onClick={logout} className="flex items-center gap-1 bg-red-500 px-3 py-1.5 rounded-full">Log out <FaArrowRightToBracket /></button>
            </div>
          ) : (
            <nav className="space-x-4">
              <Link
                to="/login"
                className="px-8 py-2 rounded-full text-base font-medium text-bg bg-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 rounded-full text-base font-medium text-white bg-brand-primary"
              >
                Register
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="px-4 py-20 text-center bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-accent/10">
          <div className="container mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-brand-primary font-poppins">
                Never Miss
              </span>{" "}
              a Beat!
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
              Get instant alerts when your favorite artists drop new music. Stay
              ahead, stay updated with GbeduRadar.
            </p>
            <Link
              to="/register"
              className="px-8 py-3 rounded-full text-lg font-medium text-white bg-brand-accent hover:bg-brand-accent-hover shadow-lg transform hover:scale-105 transition-transform duration-150"
            >
              Get Started Free
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-14 px-4 bg-card">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              How It <span className="text-brand-primary">Works</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6 rounded-lg ">
                {/* <IconPlaceholder /> */}
                <section className="w-16 h-16 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mb-3">
                  <GrSelect className="w-8 h-8" />
                </section>
                <h3 className="text-xl font-semibold mb-2">Select Artists</h3>
                <p className="text-text-secondary">
                  Choose the artists you love and want to follow. Build your
                  personalized radar.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg ">
                {/* <IconPlaceholder /> */}
                <section className="w-16 h-16 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mb-3">
                  <GiRingingBell className="w-8 h-8" />
                </section>
                <h3 className="text-xl font-semibold mb-2">Get Notified</h3>
                <p className="text-text-secondary">
                  Receive real-time alerts for announcements, pre-releases, and
                  official drops.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg ">
                {/* <IconPlaceholder /> */}
                <section className="w-16 h-16 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mb-3">
                  <RxUpdate className="w-8 h-8" />
                </section>
                <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
                <p className="text-text-secondary">
                  Track everything in one place. Vote on upcoming releases & new
                  songs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Packed with <span className="text-brand-accent">Features</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                "Real-time Release Alerts",
                "Track Announcements & Live Songs",
                "Vote on Excitement & Quality",
                "Free & Pro Tiers",
              ].map((feature) => (
                <div
                  key={feature}
                  className="p-6 bg-card rounded-lg shadow-md hover:shadow-brand-primary/20 transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-text">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback/Contact Section (Placeholder) */}
        <section className="py-16 px-4 bg-card">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-2">
              Got <span className="text-brand-primary">Feedback</span> or
              Questions?
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              We'd love to hear from you! Your input helps us make GbeduRadar
              better.
            </p>

            <form
              // action="/api/feedback"
              method="POST"
              className="flex flex-col items-center gap-6"
            >
              {/* Email Field */}
              <div className="w-full sm:w-3/4 md:w-1/2 text-left">
                <label
                  htmlFor="email"
                  className="block text-base font-semibold text-text"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="
            mt-2
            w-full
            rounded-md bg-white px-4 py-2
            text-base text-gray-900
            outline-none
            ring-1 ring-gray-300
            focus:ring-2 focus:ring-brand-accent
            placeholder-gray-400
          "
                  placeholder="you@example.com"
                />
              </div>

              {/* Message Field */}
              <div className="w-full sm:w-3/4 md:w-1/2 text-left">
                <label
                  htmlFor="message"
                  className="block text-base font-semibold text-text"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="
            mt-2
            w-full
            rounded-md bg-white px-4 py-2
            text-base text-gray-900
            outline-none
            ring-1 ring-gray-300
            focus:ring-2 focus:ring-brand-accent
            placeholder-gray-400
          "
                  placeholder="Let us know what’s on your mind..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="
          px-8 py-3 text-md font-semibold
          text-white bg-brand-accent hover:bg-brand-accent-hover
          rounded-lg shadow-md
          transition-transform transform hover:scale-105
        "
              >
                Send Feedback
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 text-center bg-card border-t border-bg">
        <div className="container mx-auto">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} GbeduRadar. All Rights Reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link
              to="/privacy"
              className="text-xs text-brand-primary hover:underline"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-brand-primary hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
