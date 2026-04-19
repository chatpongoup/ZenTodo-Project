import React, { useState, useEffect } from 'react';
import { Plus, Search, Moon, Sun, Filter, Trash2, CheckCircle2, Circle, Clock, Tag, ChevronDown, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import Dashboard from './components/Dashboard';
import Filters from './components/Filters';
import EmptyState from './components/EmptyState';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const [sortBy, setSortBy] = useState('Newest');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Notification System
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const checkDeadlines = () => {
      const now = new Date();
      tasks.forEach(task => {
        if (!task.completed && task.dueDate && !task.notified) {
          const deadline = new Date(task.dueDate);
          const diff = deadline - now;
          if (diff > 0 && diff <= 86400000) { // 24 hours
            if (Notification.permission === "granted") {
              new Notification("Task Reminder", {
                body: `Goal "${task.text}" is due within 24 hours!`,
                icon: "https://cdn-icons-png.flaticon.com/512/1043/1043310.png"
              });
              setTasks(prev => prev.map(t => t.id === task.id ? {...t, notified: true} : t));
            }
          }
        }
      });
    };
    const interval = setInterval(checkDeadlines, 60000);
    checkDeadlines();
    return () => clearInterval(interval);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addTask = (task) => {
    setTasks([{ ...task, id: Date.now(), completed: false, createdAt: new Date() }, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'All' ? true :
      filter === 'Active' ? !task.completed :
      filter === 'Completed' ? task.completed :
      task.priority === filter || task.category === filter;
    
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-[#0f111a] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter">ZenTodo</h1>
              <p className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px]">Strategic Command</p>
            </div>
            <div className="h-10 w-[2px] bg-slate-200 dark:bg-white/10 hidden md:block"></div>
            <div className="hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30 mb-1">Current Sector Time</p>
              <p className="text-xl font-black tracking-tight text-slate-700 dark:text-white/80">
                {currentTime.toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                <span className="text-blue-500 ml-2">{currentTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-4 glass rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-blue-500/10"
          >
            {isDarkMode ? <Sun className="text-yellow-300 w-6 h-6" /> : <Moon className="text-blue-500 w-6 h-6" />}
          </button>
        </header>

        <Dashboard tasks={tasks} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Input and Filters */}
          <aside className="md:col-span-4 space-y-6">
            <div className="glass-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Task
              </h2>
              <TaskInput onAdd={addTask} />
            </div>

            <div className="glass-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" /> Filters
              </h2>
              <Filters 
                current={filter} 
                setFilter={setFilter} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
              />
            </div>
          </aside>

          {/* Right Column: Task List */}
          <main className="md:col-span-8 space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-sm font-medium text-slate-400 dark:text-white/50">{filteredTasks.length} Tasks</span>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400 dark:text-white/40">Sort by:</span>
                <select 
                  className="bg-transparent text-slate-600 dark:text-white border-0 cursor-pointer focus:ring-0"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option className="bg-slate-800" value="Newest">Newest</option>
                  <option className="bg-slate-800" value="Priority">Priority</option>
                  <option className="bg-slate-800" value="Due Date">Due Date</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      onToggle={() => toggleTask(task.id)} 
                      onDelete={() => deleteTask(task.id)} 
                    />
                  ))
                ) : (
                  <EmptyState query={searchQuery} />
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
