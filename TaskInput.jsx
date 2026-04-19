import React, { useState } from 'react';
import { Calendar, Tag, Flag, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskInput = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ text, priority, category, dueDate });
    setText('');
    setPriority('Medium');
    setCategory('Personal');
    setDueDate('');
  };

  const categories = ['Personal', 'Work', 'Fitness', 'Study', 'Health'];
  const priorities = ['Low', 'Medium', 'High'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full glass-input pr-12 placeholder:text-white/30"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-500 rounded-lg text-white hover:bg-purple-600 transition-colors shadow-lg"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Category Selector */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-[10px] uppercase font-bold text-white/40 mb-1 ml-1">Category</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/50" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-8 glass-input py-1.5 text-xs appearance-none"
            >
              {categories.map(c => <option key={c} className="bg-slate-800" value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Priority Selector */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-[10px] uppercase font-bold text-white/40 mb-1 ml-1">Priority</label>
          <div className="relative">
            <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/50" />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full pl-8 glass-input py-1.5 text-xs appearance-none"
            >
              {priorities.map(p => <option key={p} className="bg-slate-800" value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-[10px] uppercase font-bold text-white/40 mb-1 ml-1">Due Date</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full pl-9 glass-input py-1.5 text-xs text-white/60"
          />
        </div>
      </div>
    </form>
  );
};

export default TaskInput;
