"use client";

import { Coffee, User, Clock, AlertCircle } from "lucide-react";

export default function ComingSoon({ featureName, description, icon }: { 
  featureName: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 max-w-lg text-center">
        <div className="flex justify-center mb-6 text-primary">
          <div className="w-20 h-20 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300 text-4xl">
            {icon}
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {featureName} – Coming Soon!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        <p className="flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500">
          <Clock size={16} /> Stay tuned! We’re working hard to launch this feature.
        </p>
      </div>
    </div>
  );
}
