import React from 'react';
import Navbar from '../components/Navbar';

function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          {/* <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1> */}
          {/* <p className="text-gray-600">Traffic Management System Administrator</p> */}
        </div>

        {/* Profile Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {/* Profile Header with Blue Accent */}
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="/rose.jpg"
                  alt="Rose"
                  className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover"
                />
                <span className="absolute bottom-0 right-0 bg-green-400 rounded-full w-3.5 h-3.5 border-2 border-white"></span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Rose</h2>
                <p className="text-blue-100">Senior Traffic Administrator</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</p>
                  <p className="text-sm text-gray-700 mt-1">rose.doe@traffic.gov</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</p>
                  <p className="text-sm text-gray-700 mt-1">TMS-AD-0421</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Department</p>
                  <p className="text-sm text-gray-700 mt-1">Traffic Violation Monitoring</p>
                </div>
              </div>
            </div>

            {/* System Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">System Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</p>
                  <p className="text-sm text-gray-700 mt-1">October 15, 2023 at 09:30 AM</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Account Status</p>
                  <div className="flex items-center mt-1">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-700">Active</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Dashboard Access</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Violation Review</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Admin Controls</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-between">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Profile
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="bg-white px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-800">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { action: 'Reviewed violation case', time: '2 hours ago', case: 'TMS-VC-2023-1562' },
              { action: 'Approved violation report', time: '5 hours ago', case: 'TMS-VC-2023-1561' },
              { action: 'Updated system settings', time: 'Yesterday', case: 'System Configuration' },
              { action: 'Trained new staff member', time: '2 days ago', case: 'Officer John Doe' }
            ].map((activity, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">Case: {activity.case}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;