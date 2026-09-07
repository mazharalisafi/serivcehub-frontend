"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  HelpCircle, 
  Pencil, 
  Trash2, 
  X, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Home Cleaning",
      category: "Cleaning",
      price: "$80/hr",
      status: "ACTIVE",
      questions: [
        "How many bedrooms/bathrooms?",
        "Do you have pets at home?",
        "Deep clean or standard?",
      ],
    },
    {
      id: 2,
      name: "Plumbing Repair",
      category: "Maintenance",
      price: "$120/job",
      status: "ACTIVE",
      questions: ["Describe the issue briefly", "Is it an emergency?"],
    },
    {
      id: 3,
      name: "AC Maintenance",
      category: "HVAC",
      price: "$150/unit",
      status: "DEACTIVATED",
      questions: ["What is the AC brand/model?", "Is it cooling properly?"],
    },
    {
      id: 4,
      name: "Electrical Inspection",
      category: "Electrical",
      price: "$95/hr",
      status: "ACTIVE",
      questions: ["Is it residential or commercial?", "Main breaker issues?"],
    },
  ]);

  // Modal States
  const [activeQuestionsModal, setActiveQuestionsModal] = useState(null);
  const [newQuestionInput, setNewQuestionInput] = useState("");
  
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [newService, setNewService] = useState({ name: "", category: "", price: "" });

  const [editingService, setEditingService] = useState(null); // Service object being edited

  // Toggle Service Status
  const toggleStatus = (id) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "ACTIVE" ? "DEACTIVATED" : "ACTIVE" }
          : s
      )
    );
  };

  // Delete Service
  const handleDeleteService = (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Questions Handlers
  const handleAddQuestion = () => {
    if (!newQuestionInput.trim()) return;
    const updatedServices = services.map((s) => {
      if (s.id === activeQuestionsModal.id) {
        return { ...s, questions: [...s.questions, newQuestionInput.trim()] };
      }
      return s;
    });
    setServices(updatedServices);
    setActiveQuestionsModal(
      updatedServices.find((s) => s.id === activeQuestionsModal.id)
    );
    setNewQuestionInput("");
  };

  const handleDeleteQuestion = (qIndex) => {
    const updatedServices = services.map((s) => {
      if (s.id === activeQuestionsModal.id) {
        return {
          ...s,
          questions: s.questions.filter((_, idx) => idx !== qIndex),
        };
      }
      return s;
    });
    setServices(updatedServices);
    setActiveQuestionsModal(
      updatedServices.find((s) => s.id === activeQuestionsModal.id)
    );
  };

  // Add Service Handler
  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newService.name || !newService.category || !newService.price) return;
    const created = {
      id: Date.now(),
      name: newService.name,
      category: newService.category,
      price: newService.price,
      status: "ACTIVE",
      questions: [],
    };
    setServices([...services, created]);
    setNewService({ name: "", category: "", price: "" });
    setIsAddServiceModalOpen(false);
  };

  // Edit Service Handler Modal Submit
  const handleUpdateService = (e) => {
    e.preventDefault();
    if (!editingService) return;

    setServices((prev) =>
      prev.map((s) => (s.id === editingService.id ? editingService : s))
    );
    setEditingService(null);
  };

  // Filtered Services
  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#030712] text-slate-100 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>🛠️</span> Manage Services & Categories
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add new services, update pricing categories, toggle availability, and configure form questions.
          </p>
        </div>

        <button
          onClick={() => setIsAddServiceModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition text-sm shadow-lg shadow-teal-500/20"
        >
          <Plus size={18} /> Add Service / Category
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search by service or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
          />
        </div>
        <div className="text-xs text-slate-400 font-semibold">
          Total Services: <span className="text-teal-400 font-bold">{services.length}</span>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-bold uppercase tracking-wider bg-slate-900/50">
                <th className="py-4 px-5">Service Name</th>
                <th className="py-4 px-5">Category</th>
                <th className="py-4 px-5">Price Rate</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">Custom Questions</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-4 px-5 font-semibold text-white">{service.name}</td>
                  <td className="py-4 px-5 text-slate-400">{service.category}</td>
                  <td className="py-4 px-5 font-bold text-teal-400">{service.price}</td>

                  {/* Status Badge */}
                  <td className="py-4 px-5">
                    {service.status === "ACTIVE" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 size={12} /> ACTIVE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <XCircle size={12} /> DEACTIVATED
                      </span>
                    )}
                  </td>

                  {/* Custom Questions Button */}
                  <td className="py-4 px-5">
                    <button
                      onClick={() => setActiveQuestionsModal(service)}
                      className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-semibold transition"
                    >
                      <HelpCircle size={15} />
                      Manage Questions ({service.questions.length})
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => setEditingService(service)}
                      title="Edit Service"
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition inline-block"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      onClick={() => toggleStatus(service.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                        service.status === "ACTIVE"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
                      }`}
                    >
                      {service.status === "ACTIVE" ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      onClick={() => handleDeleteService(service.id)}
                      title="Delete Service"
                      className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 transition inline-block"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. MANAGE QUESTIONS MODAL */}
      {activeQuestionsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">Booking Form Questions</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Service: <span className="text-teal-400 font-bold">{activeQuestionsModal.name}</span>
                </p>
              </div>
              <button
                onClick={() => setActiveQuestionsModal(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter question for customer..."
                value={newQuestionInput}
                onChange={(e) => setNewQuestionInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
              />
              <button
                onClick={handleAddQuestion}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs transition"
              >
                Add Question
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {activeQuestionsModal.questions.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No custom questions added yet.</p>
              ) : (
                activeQuestionsModal.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-[#030712] border border-slate-800/80 rounded-xl text-xs text-slate-200"
                  >
                    <span>{idx + 1}. {q}</span>
                    <button
                      onClick={() => handleDeleteQuestion(idx)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveQuestionsModal(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. EDIT SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleUpdateService}
            className="bg-[#0b0f19] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Edit Service</h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={editingService.category}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Price Rate</label>
                <input
                  type="text"
                  required
                  value={editingService.price}
                  onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. ADD SERVICE MODAL */}
      {isAddServiceModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleCreateService}
            className="bg-[#0b0f19] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Add New Service</h3>
              <button
                type="button"
                onClick={() => setIsAddServiceModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deep House Cleaning"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cleaning / Maintenance"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Price Rate</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. $80/hr or $150/unit"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddServiceModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs"
              >
                Add Service
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}