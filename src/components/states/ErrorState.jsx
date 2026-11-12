import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState = ({ onRetry }) => {
  return (
    <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-[#16192C] border border-rose-500/30 text-center space-y-4 shadow-2xl">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
        <AlertCircle className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-black text-white font-display">
        Unable to Load Level Progress
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed">
        We couldn't load your level information right now. Please check your network connection and try again.
      </p>

      <button
        onClick={onRetry}
        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-amber-500/20"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
};
export default ErrorState;
