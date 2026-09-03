'use client';

import { useState } from 'react';
import { User, Mail, Lock, Phone, Save, Bell, Shield, CheckCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  // Admin Info State
  const [adminData, setAdminData] = useState({
    name: 'Mazhar',
    email: 'admin@servicehub.com',
    phone: '+1 (555) 019-2834',
    role: 'Super Admin',
  });

  // Password State
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    bookingUpdates: true,
    systemReports: false,
  });

  const [savedMessage, setSavedMessage] = useState('');

  // Handle Info Submit
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setSavedMessage('Admin information updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  // Handle Password Submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    setSavedMessage('Password changed successfully!');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your account profile, credentials, and system notification preferences.
        </p>
      </div>

      {/* Success Banner */}
      {savedMessage && (
        <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {savedMessage}
        </div>
      )}

      {/* Card 1: Admin Profile Information */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-100">
          <User className="w-5 h-5 text-teal-600" />
          <div>
            <h2 className="text-base font-bold text-slate-800">Admin Profile Information</h2>
            <p className="text-xs text-slate-500">Update your personal details and contact email</p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={adminData.name}
                  onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={adminData.phone}
                  onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
              <div className="relative">
                <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled
                  value={adminData.role}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg text-xs bg-slate-50 text-slate-500 cursor-not-allowed font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Card 2: Security & Password */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-100">
          <Lock className="w-5 h-5 text-teal-600" />
          <div>
            <h2 className="text-base font-bold text-slate-800">Change Password</h2>
            <p className="text-xs text-slate-500">Ensure your account uses a strong, secure password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Current Password</label>
            <input
              type="password"
              required
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">New Password</label>
            <input
              type="password"
              required
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Confirm New Password</label>
            <input
              type="password"
              required
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            Update Password
          </button>
        </form>
      </div>

      {/* Card 3: Notification Preferences */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-100">
          <Bell className="w-5 h-5 text-teal-600" />
          <div>
            <h2 className="text-base font-bold text-slate-800">Notification Preferences</h2>
            <p className="text-xs text-slate-500">Choose what system alerts you receive</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Email Alerts</span>
              <span className="text-[11px] text-slate-500">Receive system notifications via email</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailAlerts}
              onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
              className="w-4 h-4 accent-teal-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Booking Updates</span>
              <span className="text-[11px] text-slate-500">Get notified when a new booking is created or modified</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.bookingUpdates}
              onChange={(e) => setNotifications({ ...notifications, bookingUpdates: e.target.checked })}
              className="w-4 h-4 accent-teal-600 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}