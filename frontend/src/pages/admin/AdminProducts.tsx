import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import { adminService } from '../../services/adminService';

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const emptyForm = { name: '', keywords: '', description: '', price: '', stock: '', imageUrl: '', categoryId: '' };

export default function AdminProducts() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['admin', 'products'],
    queryFn: adminService.getProducts,
  });
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: adminService.getCategories,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ['admin', 'products'] });
    qc.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
  };

  const save = useMutation({
    mutationFn: () => {
      const payload = {
        name: form.name,
        slug: slugify(form.name),
        description: form.description,
        price: parseFloat(form.price) || 0,
        stock: parseInt(form.stock) || 0,
        imageUrl: form.imageUrl,
        categoryId: form.categoryId || undefined,
      };
      return editingId ? adminService.updateProduct(editingId, payload) : adminService.createProduct(payload);
    },
    onSuccess: () => {
      toast.success(editingId ? 'Produit modifié' : 'Produit créé');
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error('Échec de l\'enregistrement'),
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminService.deleteProduct(id),
    onSuccess: () => { toast.success('Produit supprimé'); invalidate(); },
    onError: () => toast.error('Échec de la suppression'),
  });

  const generate = useMutation({
    mutationFn: () => adminService.generateProductContent(form.name, form.keywords),
    onSuccess: (g) => {
      setForm((f) => ({
        ...f,
        description: `${g.description}\n\n• ${g.features.join('\n• ')}`,
      }));
      toast.success(g.source === 'openai' ? 'Fiche générée par IA ✨' : 'Fiche générée (mode démo)');
    },
    onError: () => toast.error('Génération IA impossible'),
  });

  const openCreate = () => { setEditingId(null); setForm({ ...emptyForm }); setOpen(true); };
  const openEdit = (p: any) => {
    setEditingId(p.id);
    setForm({
      name: p.name || '', keywords: '', description: p.description || '',
      price: String(p.price ?? ''), stock: String(p.stock ?? ''),
      imageUrl: p.imageUrl || '', categoryId: p.categoryId || '',
    });
    setOpen(true);
  };

  const set = (k: string) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Gestion des produits</h1>
        <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" /> Nouveau Produit</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner size={40} /></div>
      ) : isError || !products ? (
        <p className="text-red-400">Impossible de charger les produits.</p>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-700">
                  <th className="px-6 py-4 text-sm font-medium text-slate-300">Produit</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-300">Prix</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-300">Stock</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {products.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">Aucun produit. Créez-en un !</td></tr>
                )}
                {products.map((p: any) => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                          {p.imageUrl && <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <span className="font-medium text-white">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{Number(p.price).toFixed(2)} €</td>
                    <td className="px-6 py-4 text-slate-400">{p.stock}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openEdit(p)} className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { if (confirm(`Supprimer "${p.name}" ?`)) remove.mutate(p.id); }}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal isOpen={open} onClose={() => setOpen(false)} title={editingId ? 'Modifier le produit' : 'Nouveau produit'}>
        <div className="space-y-4">
          <Input label="Nom du produit" value={form.name} onChange={set('name')} placeholder="Ex: Casque Audio Pro" />

          {/* AI generation block */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <Input
              label="Mots-clés (pour l'IA)"
              value={form.keywords}
              onChange={set('keywords')}
              placeholder="sans-fil, réduction de bruit, autonomie 30h"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="mt-2 w-full"
              isLoading={generate.isPending}
              disabled={!form.name}
              onClick={() => generate.mutate()}
            >
              <Sparkles className="w-4 h-4 mr-2" /> Générer la fiche avec l'IA
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={set('description')}
              rows={4}
              className="w-full rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Description marketing…"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Prix (€)" type="number" value={form.price} onChange={set('price')} />
            <Input label="Stock" type="number" value={form.stock} onChange={set('stock')} />
          </div>

          <Input label="URL de l'image" value={form.imageUrl} onChange={set('imageUrl')} placeholder="https://…" />

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Catégorie</label>
            <select
              value={form.categoryId}
              onChange={set('categoryId')}
              className="w-full h-10 rounded-lg bg-slate-800/50 border border-slate-700 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">— Sélectionner —</option>
              {(categories || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Annuler</Button>
            <Button isLoading={save.isPending} disabled={!form.name} onClick={() => save.mutate()}>
              {editingId ? 'Enregistrer' : 'Créer'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
