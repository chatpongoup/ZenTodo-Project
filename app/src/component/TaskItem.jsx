import React from 'react';
import { Trash2, CheckCircle2, Circle, Clock, Tag, GripVertical, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const getPriorityColor = (p) => {
    switch(p) {
      case 'High': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Low': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  const getCategoryColor = (c) => {
    const colors = {
      Personal: 'bg-purple-500/20 text-purple-200 border-purple-500/30',
      Work: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
      Fitness: 'bg-orange-500/20 text-orange-200 border-orange-500/30',
      Study: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
      Health: 'bg-rose-500/20 text-rose-200 border-rose-500/30'
    };
    return colors[c] || 'bg-slate-500/20 text-slate-200 border-slate-500/30';
  };

  const diff = task.dueDate ? new Date(task.dueDate) - new Date() : null;
  const isOverdue = diff !== null && diff < 0 && !task.completed;
  const isDueSoon = diff !== null && diff > 0 && diff <= 86400000 && !task.completed; // 24 hours

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.005 }}
      className={`group glass flex items-center gap-4 p-5 rounded-3xl transition-all border border-slate-200/50 dark:border-white/10 hover:border-purple-200 dark:hover:border-white/30 relative overflow-hidden ${task.completed ? 'opacity-60 bg-slate-50 dark:bg-white/5' : ''} ${isDueSoon ? 'border-rose-400 dark:border-rose-500 bg-rose-50 dark:bg-rose-500/10 shadow-lg dark:shadow-[0_0_20px_rgba(244,63,94,0.15)]' : ''}`}
    >
      {isDueSoon && (
        <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500 animate-pulse shadow-[0_0_15px_#f43f5e]"></div>
      )}
      <button className="text-slate-300 dark:text-white/20 cursor-grab active:cursor-grabbing">
        <GripVertical className="w-5 h-5" />
      </button>

      <button 
        onClick={onToggle}
        className="flex-shrink-0 transition-transform active:scale-90"
      >
        {task.completed ? (
          <CheckCircle2 className="w-6 h-6 text-emerald-500 dark:text-emerald-400 fill-emerald-500/20 dark:fill-emerald-400/20" />
        ) : (
          <Circle className="w-6 h-6 text-slate-300 dark:text-white/30 group-hover:text-slate-500 dark:group-hover:text-white/60 transition-colors" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <h3 className={`text-base md:text-xl font-black tracking-tight mb-2 ${task.completed ? 'line-through text-slate-400 dark:text-white/30' : 'text-slate-800 dark:text-white'}`}>
          {task.text}
        </h3>
        
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-[10px] px-3 py-1 rounded-full border-2 font-black uppercase tracking-widest ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${getCategoryColor(task.category)}`}>
            {task.category}
          </span>
          {task.dueDate && (
            <span className={`text-[11px] flex items-center gap-2 px-4 py-2 rounded-xl font-black tracking-tight border ${isOverdue ? 'text-rose-500 border-rose-200 dark:text-rose-400 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10' : isDueSoon ? 'text-rose-700 border-rose-300 dark:text-rose-600 dark:border-rose-500/50 bg-rose-100 dark:bg-rose-500/15' : 'text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/5'}`}>
              <Tag className="w-4 h-4" />
              <span className="opacity-50 text-[9px]">DUE ON:</span>
              {new Date(task.dueDate).toLocaleString(undefined, { 
                weekday: 'short',
                day: 'numeric',
                month: 'short', 
                year: 'numeric',
                hour: '2-digit', 
                minute: '2-digit' 
              })}
              {isOverdue && ' [OVERDUE]'}
              {isDueSoon && ' [URGENT]'}
            </span>
          )}
        </div>
      </div>

      <button 
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-500/10 hover:text-rose-500 dark:hover:bg-rose-500/20 dark:hover:text-rose-400 text-slate-300 dark:text-white/30 rounded-xl transition-all active:scale-95"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default TaskItem;
