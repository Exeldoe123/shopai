import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import { adminService, AdminUser } from '../../services/adminService';
import { useAuthStore } from '../../store/authStore';

export default function AdminUsers() {
  const qc = useQueryClient();
  const currentUser = useAuthStore((s) => s.user);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', role: 'client' as 'client' | 'admin' });

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: adminService.getUsers,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin', 'users'] });

  const toggle = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => adminService.updateUserStatus(id, isActive),
    onSuccess: () => { toast.success('Statut mis à jour'); invalidate(); },
    onError: () => toast.error('Échec de la mise à jour'),
  });

  const save = useMutation({
    mutationFn: () => adminService.updateUser(editing!.id, form),
    onSuccess: () => { toast.success('Utilisateur modifié'); setEditing(null); invalidate(); },
    onError: (e: any) => toast.error(e?.response?.data?.error || 'Échec de la modification'),
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminService.deleteUser(id),
    onSuccess: () => { toast.success('Utilisateur supprimé'); invalidate(); },
    onError: (e: any) => toast.error(e?.response?.data?.error || 'Suppression impossible'),
  });

  const openEdit = (u: AdminUser) => {
    setEditing(u);
    setForm({ firstName: u.firstName, lastName: u.lastName, email: u.email, role: u.role });
  };
  const set = (k: string) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (isLoading) return <div className="flex justify-center py-20"><Spinner size={40} /></div>;
  if (isError || !users) return <p className="text-red-400">Impossible de charger les utilisateurs.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Utilisateurs ({users.length})</h1>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-700">
                <th className="px-6 py-4 text-sm font-medium text-slate-300">Nom</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-300">Email</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-300">Rôle</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-300">Statut</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {users.map((u) => {
                const isSelf = u.id === currentUser?.id;
                return (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{u.firstName} {u.lastName}</td>
                    <td className="px-6 py-4 text-slate-400">{u.email}</td>
                    <td className="px-6 py-4"><Badge variant={u.role === 'admin' ? 'info' : 'default'}>{u.role}</Badge></td>
                    <td className="px-6 py-4"><Badge variant={u.isActive ? 'success' : 'danger'}>{u.isActive ? 'Actif' : 'Désactivé'}</Badge></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="sm"
                          variant={u.isActive ? 'ghost' : 'secondary'}
                          isLoading={toggle.isPending && toggle.variables?.id === u.id}
                          onClick={() => toggle.mutate({ id: u.id, isActive: !u.isActive })}
                        >
                          {u.isActive ? 'Désactiver' : 'Activer'}
                        </Button>
                        <button onClick={() => openEdit(u)} className="p-2 text-slate-400 hover:text-primary transition-colors" title="Modifier">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { if (!isSelf && confirm(`Supprimer ${u.email} ?`)) remove.mutate(u.id); }}
                          disabled={isSelf}
                          className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title={isSelf ? 'Vous ne pouvez pas vous supprimer' : 'Supprimer'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Modifier l'utilisateur">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Prénom" value={form.firstName} onChange={set('firstName')} />
            <Input label="Nom" value={form.lastName} onChange={set('lastName')} />
          </div>
          <Input label="Email" type="email" value={form.email} onChange={set('email')} />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Rôle</label>
            <select
              value={form.role}
              onChange={set('role')}
              className="w-full h-10 rounded-lg bg-slate-800/50 border border-slate-700 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="client">client</option>
              <option value="admin">admin</option>
            </select>
            {editing?.id === currentUser?.id && (
              <p className="text-xs text-amber-400 mt-1">Vous ne pouvez pas retirer votre propre rôle admin.</p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setEditing(null)}>Annuler</Button>
            <Button isLoading={save.isPending} onClick={() => save.mutate()}>Enregistrer</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
