import React from 'react';
import { Target, CheckCircle, ListTodo, TrendingUp } from 'lucide-react';

const Dashboard = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const stats = [
    { label: 'Total Tasks', value: total, icon: ListTodo, color: 'text-blue-500 dark:text-blue-400' },
    { label: 'Completed', value: completed, icon: CheckCircle, color: 'text-emerald-500 dark:text-emerald-400' },
    { label: 'Efficiency', value: `${percentage}%`, icon: TrendingUp, color: 'text-purple-500 dark:text-purple-400' },
  ];

  const strokeDasharray = 251.2; // 2 * pi * r (where r=40)
  const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 glass-card flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Daily Progress</h2>
          <p className="text-slate-500 dark:text-white/40 text-sm max-w-[200px]">
            {percentage === 100 
              ? "Amazing! You've crushed all your tasks for today." 
              : `You've finished ${completed} out of ${total} tasks.`}
          </p>
        </div>

        {/* Circular Progress Bar */}
        <div className="relative flex items-center justify-center w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="40"
              stroke="currentColor"
              className="text-slate-200 dark:text-white/10"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              style={{ 
                strokeDashoffset: strokeDashoffset,
                transition: 'stroke-dashoffset 1s ease-in-out'
              }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl font-black text-slate-800 dark:text-white">{percentage}%</span>
          </div>
        </div>
        
        {/* Background Accent */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-600/10 blur-[50px] rounded-full pointer-events-none"></div>
      </div>

      <div className="glass-card flex flex-col justify-between">
        <div className="space-y-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
              <div className="flex items-center gap-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-sm text-slate-500 dark:text-white/60">{stat.label}</span>
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-white">{stat.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] uppercase font-bold text-slate-300 dark:text-white/30 tracking-wider">Goal</span>
            <Target className="w-3 h-3 text-slate-300 dark:text-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
