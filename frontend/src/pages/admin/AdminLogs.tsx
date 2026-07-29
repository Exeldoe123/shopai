import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { adminService } from '../../services/adminService';

export default function AdminLogs() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'logs', page],
    queryFn: () => adminService.getLogs(page, 20),
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Journal d'activité</h1>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner size={40} /></div>
      ) : isError || !data ? (
        <p className="text-red-400">Impossible de charger le journal.</p>
      ) : (
        <>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/50 border-b border-slate-700">
                    <th className="px-6 py-4 text-sm font-medium text-slate-300">Date</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-300">Action</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-300">Utilisateur</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-300">Détails</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.data.length === 0 && (
                    <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">Aucune entrée.</td></tr>
                  )}
                  {data.data.map((log: any) => (
                    <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {log.createdAt ? new Date(log.createdAt).toLocaleString('fr-FR') : '—'}
                      </td>
                      <td className="px-6 py-4 font-medium text-white">{log.action}</td>
                      <td className="px-6 py-4 text-slate-400">{log.userId ?? 'système'}</td>
                      <td className="px-6 py-4 text-slate-400 max-w-xs truncate">{log.details ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex items-center justify-between mt-4">
            <span className="text-slate-400 text-sm">Page {page} / {data.pages || 1}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Précédent</Button>
              <Button variant="outline" size="sm" disabled={page >= (data.pages || 1)} onClick={() => setPage((p) => p + 1)}>Suivant</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
