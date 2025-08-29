import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthGuard from "@/components/authguard";

export default function BusinessProfileSetup() {
  return (
   <AuthGuard> 
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center w-12 h-12 mx-auto bg-gradient-to-r from-purple-400 to-blue-400 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7h18M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mt-3">
            Set Up Your Business Profile
          </h2>
          <p className="text-gray-500 text-sm">
            Tell us about your business to get started
          </p>
        </div>

        {/* Business Information */}
        <div>
          <h3 className="font-semibold mb-4">Business Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Business Name *
                </label>
                <input
                  type="text"
                  placeholder="Your Business Name"
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Industry *
                </label>
                <select className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Select your industry</option>
                  <option>E-commerce & Retail</option>
                  <option>Technology & Software</option>
                  <option>Healthcare & Medical</option>
                  <option>Finance & Banking</option>
                  <option>Education & Training</option>
                  <option>Real Estate</option>
                  <option>Professional Services</option>
                  <option>Manufacturing</option>
                  <option>Food & Beverage</option>
                  <option>Travel & Tourism</option>
                  <option>Non Profit</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Website
                </label>
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Business Location
                </label>
                <input
                  type="text"
                  placeholder="City, Country"
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Company Size
              </label>
              <select className="w-[46%] mt-1 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Select company size</option>
                <option>Just me</option>
                <option>2-10 Employees</option>
                <option>11-50 Employees</option>
                <option>51-200 Employees</option>
                <option>200+ Employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Business Description
              </label>
              <textarea
                placeholder="Tell us about your business, products, or services..."
                rows={3}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Brand Identity */}
        <div className="mt-8">
          <h3 className="font-semibold mb-4">Brand Identity</h3>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Logo Upload
              </label>
              <button className="mt-1 w-full border rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                {/* Upload icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                Upload Logo
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Brand Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  defaultValue="#382BF6"
                  className="w-12 h-10 border rounded"
                />
                <input
                  type="text"
                  defaultValue="#382BF6"
                  className="flex-1 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-md font-medium"
          >
            <Link href="/dashboard">
              Complete Setup & Continue to Dashboard
            </Link>
          </Button>
          <p className="text-gray-500 text-xs mt-2 text-center">
            You can update this information later in your settings
          </p>
        </div>
      </div>
    </div>
   </AuthGuard> 
  );
}
