import React from 'react';
import Card from '../ui/Card';

export default function ProductFilters() {
  return (
    <Card className="p-5">
      <h3 className="font-semibold text-white mb-4">Filtres</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-3">Catégories</h4>
          <div className="space-y-2">
            {['Audio', 'Wearables', 'Informatique', 'Maison'].map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-background" />
                <span className="text-sm text-slate-400 hover:text-white transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-3">Prix</h4>
          <div className="px-2">
            <input type="range" min="0" max="1000" className="w-full accent-primary bg-slate-700 h-1 rounded-lg appearance-none cursor-pointer" />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>0 €</span>
              <span>1000 €</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-3">Note minimale</h4>
          <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-slate-300 focus:outline-none focus:border-primary">
            <option value="0">Toutes les notes</option>
            <option value="4">4 étoiles et +</option>
            <option value="3">3 étoiles et +</option>
          </select>
        </div>
      </div>
    </Card>
  );
}
