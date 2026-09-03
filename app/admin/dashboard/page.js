'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar as CalendarIcon, 
  DollarSign, 
  UserPlus, 
  Plus,
  Edit2,
  Trash2,
  HelpCircle,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

export default function AdminDashboard() {
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Sept 2026

  // Services / Categories State
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
  ]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', price: '' });

  // Question Modal States
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');

  // Service Provider State
  const [providers, setProviders] = useState([
    { id: 1, name: 'Alex Rivera', category: 'Plumbing', rating: '4.9 ⭐', jobsDone: 124, status: 'Active', email: 'alex@servicehub.com' },
    { id: 2, name: 'Elena Rostova', category: 'House Cleaning', rating: '4.8 ⭐', jobsDone: 98, status: 'Active', email: 'elena@servicehub.com' },
    { id: 3, name: 'Marcus Vance', category: 'Electrician', rating: '4.7 ⭐', jobsDone: 45, status: 'Pending Approval', email: 'marcus@servicehub.com' },
  ]);

  // Revenue Analytics Data
  const revenueData = [
    { month: 'Oct', amount: 8200, height: '40%', percentage: '+8%' },
    { month: 'Nov', amount: 10400, height: '55%', percentage: '+12%' },
    { month: 'Dec', amount: 12800, height: '70%', percentage: '+18%' },
    { month: 'Jan', amount: 11200, height: '60%', percentage: '-4%' },
    { month: 'Feb', amount: 14500, height: '85%', percentage: '+22%' },
    { month: 'Mar', amount: 16800, height: '100%', percentage: '+15%' },
  ];

  // --- Handlers for Services ---
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

  // --- Handlers for Questions ---
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

  // Calendar Helper Logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-xs text-slate-500 mt-1">Overview of system operations, bookings calendar, and services management</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Total Revenue</span>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">$16,800</h3>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +15% vs last month
            </span>
          </div>
          <div className="p-3 bg-teal-50 text-teal-600 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Total Bookings</span>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">1,248</h3>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8.4% growth
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <CalendarIcon className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Active Services</span>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{services.filter(s => s.status === 'Active').length}</h3>
            <span className="text-[11px] font-semibold text-teal-600 flex items-center gap-0.5 mt-1">
              Ready for Booking
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Satisfaction</span>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">98.4%</h3>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-1">
              High Customer Rating
            </span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Analytics & Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Bar Graph */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Revenue & Growth Report</h2>
              <p className="text-xs text-slate-500">Monthly revenue trends with percentage performance</p>
            </div>
            <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
              <span className="w-3 h-3 bg-teal-600 rounded-sm"></span> Monthly Revenue
            </span>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 pt-8 pb-2 border-b border-slate-200 px-2">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-semibold py-1 px-2 rounded shadow-md pointer-events-none whitespace-nowrap z-10">
                  ${data.amount.toLocaleString()} ({data.percentage})
                </div>
                <span className={`text-[10px] font-bold mb-1 ${data.percentage.startsWith('+') ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {data.percentage}
                </span>
                <div 
                  style={{ height: data.height }} 
                  className="w-full max-w-[48px] bg-teal-600 group-hover:bg-teal-500 transition-all rounded-t-lg"
                />
                <span className="text-xs font-semibold text-slate-600 mt-3">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Admin Calendar */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-teal-600" /> Bookings Calendar
            </h2>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                className="p-1 text-slate-500 hover:bg-slate-100 rounded-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-700">
                {currentDate.toLocaleString('default', { month: 'short', year: 'numeric' })}
              </span>
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                className="p-1 text-slate-500 hover:bg-slate-100 rounded-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 mb-2">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs text-center flex-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 15; // Example highlighted day
              return (
                <div 
                  key={day} 
                  className={`p-2 rounded-lg flex items-center justify-center font-medium transition-colors cursor-pointer ${
                    isToday ? 'bg-teal-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services & Categories Management Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Manage Services & Categories</h2>
            <p className="text-xs text-slate-500">Add, edit, deactivate services and configure booking questionnaires</p>
          </div>
          <button 
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Service
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Service Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price Rate</th>
                <th className="p-4">Status</th>
                <th className="p-4">Questions</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{service.name}</td>
                  <td className="p-4 text-slate-600 font-medium">{service.category}</td>
                  <td className="p-4 font-semibold text-slate-900">{service.price}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      service.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleOpenQuestions(service)}
                      className="flex items-center gap-1.5 text-teal-600 hover:text-teal-800 font-semibold text-xs cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Manage ({service.questions.length})
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => handleOpenEditModal(service)}
                      className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleToggleStatus(service.id)}
                      className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer ${
                        service.status === 'Active' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {service.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      onClick={() => handleDeleteService(service.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
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
                {editingService ? 'Edit Service' : 'Add New Service'}
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
                  placeholder="e.g. Lawn Mowing"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                <input 
                  type="text" required 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
                  placeholder="e.g. Outdoor / Gardening"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Price Rate</label>
                <input 
                  type="text" required 
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
                  placeholder="e.g. $50/hr"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg text-xs transition-colors cursor-pointer"
              >
                Save Service
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Service Questions Manager */}
      {isQuestionModalOpen && selectedService && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">Booking Questions</h3>
                <p className="text-xs text-slate-500">Service: {selectedService.name}</p>
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
                placeholder="Add a custom question for customer..." 
                className="flex-1 px-3 py-2 border rounded-lg text-xs focus:outline-none focus:border-teal-500"
              />
              <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer">
                Add
              </button>
            </form>

            <div className="space-y-2 max-h-56 overflow-y-auto">
              {selectedService.questions.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-4">No custom questions added yet.</p>
              ) : (
                selectedService.questions.map((q, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border rounded-lg text-xs">
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