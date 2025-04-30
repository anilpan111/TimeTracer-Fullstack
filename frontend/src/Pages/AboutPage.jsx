import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-colorLevel4 min-h-screen p-6">
      <div className="max-w-4xl  mx-auto bg-colorLevel4 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          About Time Tracer
        </h1>
        <p className="text-gray-600 text-lg leading-7 mb-4">
          Time Tracer is your ultimate tool for managing daily routines and
          activities. Designed to help you make the most of every minute, our
          app lets you organize your tasks, track progress, and gain valuable
          insights through detailed summaries.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
          Why Choose Time Tracer?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Effortlessly track your daily tasks and routines.</li>
          <li>Visualize your time usage with intuitive charts.</li>
          <li>Get actionable insights to improve productivity.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
          Features
        </h2>
        <div className="space-y-3 text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Task Tracking:</span> Add, edit, and manage your tasks in one convenient place.
          </p>
          <p>
            <span className="font-medium text-gray-800">Progress Summaries:</span> Get clear insights into how your time is spent.
          </p>
          <p>
            <span className="font-medium text-gray-800">Responsive Design:</span> Use Time Tracer on any device, anywhere.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 font-medium">
            Ready to take control of your time?
          </p>
          <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 mt-4">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
