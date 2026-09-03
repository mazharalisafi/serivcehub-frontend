'use client';

import { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  HelpCircle, 
  X, 
  Grid, 
  Search,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState([
    { 
      id: 1, 
      name: 'Home Cleaning', 
      category: 'Cleaning', 
      price: '$80/hr', 
      status: 'Active',
      questions: ['How many bedrooms?', 'Do you have pets?', 'Deep clean or standard?']
    },
    { 
      id: 2, 
      name: 'Plumbing Repair', 
      category: 'Maintenance', 
      price: '$120/job', 
      status: 'Active',
      questions: ['What is leaking?', 'Is water currently turned off?']
    },
    { 
      id: 3, 
      name: 'AC Maintenance', 
      category: 'HVAC', 
      price: '$150/unit', 
      status: 'Deactivated',
      questions: ['Is the unit cooling at all?', 'Brand of AC?']
    },
    { 
      id: 4, 
      name: 'Electrical Inspection', 
      category: 'Electrical', 
      price: '$95/hr', 
      status: 'Active',
      questions: ['Are outlets sparking?', 'Is main circuit breaker tripping?']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Service Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', price: '' });

  // Question Modal States
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');

  // --- Service Handlers ---
  const handleOpenAddModal = () => {
    setEditingService(null);
    setFormData({ name: '', category: '', price: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setFormData({ name: service.name, category: service.category, price: service.price });
    setIsModalOpen(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...formData } : s));
    } else {
      setServices([...services, { id: Date.now(), ...formData, status: 'Active', questions: [] }]);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Deactivated' : 'Active' } : s));
  };

  const handleDeleteService = (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  // --- Question Handlers ---
  const handleOpenQuestions = (service) => {
    setSelectedService(service);
    setIsQuestionModalOpen(true);
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const updatedServices = services.map(s => {
      if (s.id === selectedService.id) {
        return { ...s, questions: [...s.questions, newQuestion] };
      }
      return s;
    });

    setServices(updatedServices);
    setSelectedService({ ...selectedService, questions: [...selectedService.questions, newQuestion] });
    setNewQuestion('');
  };

  const handleDeleteQuestion = (qIndex) => {
    const updatedQuestions = selectedService.questions.filter((_, idx) => idx !== qIndex);
    const updatedServices = services.map(s => {
      if (s.id === selectedService.id) {
        return { ...s, questions: updatedQuestions };
      }
      return s;
    });

    setServices(updatedServices);
    setSelectedService({ ...selectedService, questions: updatedQuestions });
  };

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Grid className="w-6 h-6 text-teal-600" />
            Manage Services & Categories
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Add new services, update pricing categories, toggle availability, and configure form questions.
          </p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Service / Category
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search by service or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-xs border border-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Total Services: <span className="font-bold text-slate-800">{filteredServices.length}</span>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Service Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price Rate</th>
                <th className="p-4">Status</th>
                <th className="p-4">Custom Questions</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No services found.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{service.name}</td>
                    <td className="p-4 text-slate-600 font-medium">{service.category}</td>
                    <td className="p-4 font-semibold text-slate-900">{service.price}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        service.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {service.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {service.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleOpenQuestions(service)}
                        className="flex items-center gap-1.5 text-teal-600 hover:text-teal-800 font-semibold text-xs cursor-pointer"
                      >
                        <HelpCircle className="w-4 h-4" />
                        Manage Questions ({service.questions.length})
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenEditModal(service)}
                        title="Edit Service"
                        className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(service.id)}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                          service.status === 'Active' ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {service.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        onClick={() => handleDeleteService(service.id)}
                        title="Delete Service"
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Add / Edit Service */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800">
                {editingService ? 'Edit Service' : 'Add New Service / Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Service Name</label>
                <input 
                  type="text" required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
                  placeholder="e.g. Deep House Cleaning"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                <input 
                  type="text" required 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
                  placeholder="e.g. Cleaning / Maintenance"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Price Rate</label>
                <input 
                  type="text" required 
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
                  placeholder="e.g. $80/hr or $150 fixed"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg text-xs transition-colors cursor-pointer"
              >
                Save Service
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Manage Service Questions */}
      {isQuestionModalOpen && selectedService && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Booking Form Questions</h3>
                <p className="text-xs text-slate-500">Service: <span className="font-semibold text-slate-700">{selectedService.name}</span></p>
              </div>
              <button onClick={() => setIsQuestionModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="flex gap-2 mb-4">
              <input 
                type="text" required 
                value={newQuestion} 
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter question for customer during booking..." 
                className="flex-1 px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
              />
              <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer shrink-0">
                Add Question
              </button>
            </form>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedService.questions.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-6">No custom questions added yet.</p>
              ) : (
                selectedService.questions.map((q, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                    <span className="text-slate-700 font-medium">{idx + 1}. {q}</span>
                    <button 
                      onClick={() => handleDeleteQuestion(idx)} 
                      className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}