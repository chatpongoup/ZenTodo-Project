import React from 'react';
import { Sparkles, ClipboardX } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = ({ query }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center glass-card border-dashed border-2"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"></div>
        {query ? (
          <ClipboardX className="w-16 h-16 text-white/20 relative z-10" />
        ) : (
          <Sparkles className="w-16 h-16 text-white/20 relative z-10" />
        )}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">
        {query ? 'No matches found' : 'All caught up!'}
      </h3>
      <p className="text-white/40 max-w-xs mx-auto text-sm leading-relaxed">
        {query 
          ? `We couldn't find any tasks matching "${query}". Try adjusting your filters or search.` 
          : 'Your schedule is clear. Take a moment to breathe or plan something brand new!'}
      </p>
      
      {!query && (
        <button className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium transition-all text-white/60">
          Plan Your Day
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
