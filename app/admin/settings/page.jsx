"use client";

import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Lock, 
  Bell, 
  Save, 
  KeyRound,
  Check
} from "lucide-react";

export default function SettingsPage() {
  // Profile Form State
  const [profile, setProfile] = useState({
    fullName: "Mazhar",
    email: "admin@servicehub.com",
    phone: "+1 (555) 019-2834",
    role: "Super Admin",
  });

  // Password Form State
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    bookingUpdates: true,
  });

  // Handlers
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile information updated successfully!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#030712] text-slate-100 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Admin Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your account profile, credentials, and system notification preferences.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* 1. ADMIN PROFILE INFORMATION */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-start gap-3 border-b border-slate-800/80 pb-4">
            <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Admin Profile Information</h2>
              <p className="text-xs text-slate-400">Update your personal details and contact email</p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500 transition"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Role
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type="text"
                    disabled
                    value={profile.role}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#030712]/50 border border-slate-800/80 rounded-xl text-xs text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition text-xs shadow-lg shadow-teal-500/20"
              >
                <Save size={15} /> Save Profile Changes
              </button>
            </div>
          </form>
        </div>

        {/* 2. CHANGE PASSWORD */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-start gap-3 border-b border-slate-800/80 pb-4">
            <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Change Password</h2>
              <p className="text-xs text-slate-400">Ensure your account uses a strong, secure password</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500 transition"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500 transition"
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500 transition"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-2.5 rounded-xl transition text-xs border border-slate-700"
              >
                <KeyRound size={15} /> Update Password
              </button>
            </div>
          </form>
        </div>

        {/* 3. NOTIFICATION PREFERENCES */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-start gap-3 border-b border-slate-800/80 pb-4">
            <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl">
              <Bell size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Notification Preferences</h2>
              <p className="text-xs text-slate-400">Choose what system alerts you receive</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Email Alerts Switch */}
            <div className="flex items-center justify-between p-3 bg-[#030712] border border-slate-800/80 rounded-xl">
              <div>
                <div className="text-xs font-bold text-white">Email Alerts</div>
                <div className="text-[11px] text-slate-400">Receive system notifications via email</div>
              </div>
              <button
                type="button"
                onClick={() => setNotifications({ ...notifications, emailAlerts: !notifications.emailAlerts })}
                className={`w-6 h-6 rounded-md flex items-center justify-center border transition ${
                  notifications.emailAlerts
                    ? "bg-teal-500 border-teal-400 text-slate-950"
                    : "bg-slate-900 border-slate-700 text-transparent"
                }`}
              >
                <Check size={14} strokeWidth={3} />
              </button>
            </div>

            {/* Booking Updates Switch */}
            <div className="flex items-center justify-between p-3 bg-[#030712] border border-slate-800/80 rounded-xl">
              <div>
                <div className="text-xs font-bold text-white">Booking Updates</div>
                <div className="text-[11px] text-slate-400">Get notified when a new booking is created or modified</div>
              </div>
              <button
                type="button"
                onClick={() => setNotifications({ ...notifications, bookingUpdates: !notifications.bookingUpdates })}
                className={`w-6 h-6 rounded-md flex items-center justify-center border transition ${
                  notifications.bookingUpdates
                    ? "bg-teal-500 border-teal-400 text-slate-950"
                    : "bg-slate-900 border-slate-700 text-transparent"
                }`}
              >
                <Check size={14} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}