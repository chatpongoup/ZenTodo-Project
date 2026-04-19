import React from 'react';
import { Search, Hash } from 'lucide-react';

const Filters = ({ current, setFilter, searchQuery, setSearchQuery }) => {
  const mainFilters = ['All', 'Active', 'Completed'];
  const priorityFilters = ['High', 'Medium', 'Low'];
  const categories = ['Personal', 'Work', 'Fitness', 'Study', 'Health'];

  const FilterButton = ({ label, value }) => (
    <button
      onClick={() => setFilter(value)}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        current === value 
          ? 'bg-purple-600 dark:bg-purple-500 text-white shadow-lg shadow-purple-500/30 ring-1 ring-purple-400' 
          : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/30" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full glass-input pl-10 placeholder:text-slate-300 dark:placeholder:text-white/20 text-sm"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 dark:text-white/30 mb-2 ml-1">Status</label>
          <div className="flex flex-wrap gap-2">
            {mainFilters.map(f => <FilterButton key={f} label={f} value={f} />)}
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 dark:text-white/30 mb-2 ml-1">Priority</label>
          <div className="flex flex-wrap gap-2">
            {priorityFilters.map(f => <FilterButton key={f} label={f} value={f} />)}
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 dark:text-white/30 mb-2 ml-1">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                  current === c 
                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5'
                }`}
              >
                <Hash className="w-3 h-3" />
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
