import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/database';
import { User, Category, Product, Order, OrderItem, Address, ActivityLog } from './models';

const slug = (s: string) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Date située il y a N mois (utile pour le graphique des ventes). */
const monthsAgo = (n: number, day = 15) => {
  const d = new Date();
  d.setMonth(d.getMonth() - n);
  d.setDate(day);
  d.setHours(10, 0, 0, 0);
  return d;
};

const pick = <T>(arr: T[], i: number) => arr[i % arr.length];

async function seed() {
  console.log('⏳ Connexion à la base…');
  await sequelize.authenticate();

  console.log('⚠️  Recréation du schéma (sync force: true)…');
  await sequelize.sync({ force: true });

  // ── Utilisateurs ──────────────────────────────────────────────────────────
  const admin = await User.create({
    email: 'admin@shopai.ma', password: 'Admin123!',
    firstName: 'Super', lastName: 'Admin', role: 'admin',
  } as any);

  const clientsData = [
    { email: 'client@shopai.ma', firstName: 'Yassine', lastName: 'El Amrani' },
    { email: 'sara@shopai.ma',   firstName: 'Sara',    lastName: 'Bennani' },
    { email: 'omar@shopai.ma',   firstName: 'Omar',    lastName: 'Tazi' },
    { email: 'fatima@shopai.ma', firstName: 'Fatima',  lastName: 'Idrissi' },
    { email: 'mehdi@shopai.ma',  firstName: 'Mehdi',   lastName: 'Alaoui' },
  ];
  const clients: any[] = [];
  for (const c of clientsData) {
    clients.push(await User.create({
      email: c.email, password: 'Client123!', firstName: c.firstName, lastName: c.lastName, role: 'client',
    } as any));
  }
  // Un compte désactivé pour démontrer la gestion des utilisateurs
  await User.create({
    email: 'compte.bloque@shopai.ma', password: 'Client123!',
    firstName: 'Karim', lastName: 'Zouiten', role: 'client', isActive: false,
  } as any);

  // ── Catégories ────────────────────────────────────────────────────────────
  const catNames = ['High-Tech', 'Mode & Accessoires', 'Maison Connectée', 'Sport & Santé', 'Gaming'];
  const categories: any[] = [];
  for (const name of catNames) {
    categories.push(await Category.create({ name, slug: slug(name), description: `Catégorie ${name}` } as any));
  }
  const [hitech, mode, maison, sport, gaming] = categories;

  // ── Produits (24) ─────────────────────────────────────────────────────────
  const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=800`;
  const productsData = [
    { name: 'Casque Audio Premium IA', price: 299.99, stock: 42, categoryId: hitech.id, imageUrl: img('photo-1505740420928-5e560c06d30e'), description: "Casque à réduction de bruit active avec ajustement sonore par IA. Autonomie 30h." },
    { name: 'Enceinte Bluetooth 360', price: 89.99, stock: 100, categoryId: hitech.id, imageUrl: img('photo-1608043152269-423dbba4e7e1'), description: "Son immersif à 360 degrés, résistante aux éclaboussures." },
    { name: 'Écouteurs Sans Fil Pro', price: 149.99, stock: 65, categoryId: hitech.id, imageUrl: img('photo-1590658268037-6bf12165a8df'), description: "Écouteurs true wireless avec boîtier de charge rapide." },
    { name: 'Clavier Mécanique RGB', price: 119.99, stock: 30, categoryId: hitech.id, imageUrl: img('photo-1587829741301-dc798b83add3'), description: "Switches mécaniques, rétroéclairage RGB personnalisable." },
    { name: 'Souris Ergonomique Sans Fil', price: 49.99, stock: 80, categoryId: hitech.id, imageUrl: img('photo-1527864550417-7fd91fc51a46'), description: "Design ergonomique, capteur haute précision 16000 DPI." },
    { name: 'Webcam Full HD 1080p', price: 69.99, stock: 4, categoryId: hitech.id, imageUrl: img('photo-1587826080692-f439cd0b70da'), description: "Webcam avec micro intégré et correction automatique de lumière." },
    { name: 'Disque SSD Externe 1To', price: 129.99, stock: 55, categoryId: hitech.id, imageUrl: img('photo-1531492746076-161ca9bcad58'), description: "Stockage ultra-rapide USB-C, robuste et compact." },
    { name: 'Chargeur Rapide 65W GaN', price: 39.99, stock: 120, categoryId: hitech.id, imageUrl: img('photo-1583863788434-e58a36330cf0'), description: "Chargeur compact 3 ports, technologie GaN." },
    { name: 'Sneakers SmartFit', price: 129.99, stock: 7, categoryId: mode.id, imageUrl: img('photo-1542291026-7eec264c27ff'), description: "Chaussures s'adaptant à votre foulée, semelle amortissante." },
    { name: 'Sac à dos Urbain Tech', price: 59.99, stock: 75, categoryId: mode.id, imageUrl: img('photo-1553062407-98eeb64c6a62'), description: "Sac ergonomique avec port USB et compartiment laptop 15\"." },
    { name: 'Lunettes Anti-Lumière Bleue', price: 34.99, stock: 90, categoryId: mode.id, imageUrl: img('photo-1511499767150-a48a237f0083'), description: "Protection des yeux pour le travail sur écran." },
    { name: 'Portefeuille Cuir RFID', price: 44.99, stock: 60, categoryId: mode.id, imageUrl: img('photo-1627123424574-724758594e93'), description: "Cuir véritable avec protection anti-piratage RFID." },
    { name: 'Casquette Streetwear', price: 24.99, stock: 110, categoryId: mode.id, imageUrl: img('photo-1588850561407-ed78c282e89b'), description: "Coupe classique, broderie premium." },
    { name: 'Ceinture Cuir Classique', price: 29.99, stock: 3, categoryId: mode.id, imageUrl: img('photo-1624222247344-550fb60583dc'), description: "Cuir pleine fleur, boucle acier inoxydable." },
    { name: 'Ampoule Connectée RGB', price: 24.99, stock: 5, categoryId: maison.id, imageUrl: img('photo-1550985616-10810253b84d'), description: "Éclairage intelligent 16M couleurs, contrôle vocal." },
    { name: 'Caméra Surveillance WiFi', price: 79.99, stock: 45, categoryId: maison.id, imageUrl: img('photo-1558002038-1055907df827'), description: "Vision nocturne, détection de mouvement, alertes mobiles." },
    { name: 'Thermostat Intelligent', price: 189.99, stock: 25, categoryId: maison.id, imageUrl: img('photo-1567925086783-a0e9f6b8b9a7'), description: "Régulation automatique, économies d'énergie jusqu'à 30%." },
    { name: 'Aspirateur Robot Laser', price: 349.99, stock: 18, categoryId: maison.id, imageUrl: img('photo-1589006833888-3a6c9b6dcb1f'), description: "Cartographie laser, vidage automatique, contrôle app." },
    { name: 'Prise Connectée WiFi', price: 19.99, stock: 150, categoryId: maison.id, imageUrl: img('photo-1544006659-f0b21884ce1d'), description: "Programmation horaire et suivi de consommation." },
    { name: 'Montre Connectée Health+', price: 199.99, stock: 200, categoryId: sport.id, imageUrl: img('photo-1523275335684-37898b6baf30'), description: "Suivi cardiaque, sommeil, SpO2 et 100+ modes sportifs." },
    { name: 'Tapis de Yoga Premium', price: 39.99, stock: 85, categoryId: sport.id, imageUrl: img('photo-1601925260368-ae2f83cf8b7f'), description: "Antidérapant, épaisseur 6mm, matériau écologique." },
    { name: 'Haltères Réglables 20kg', price: 159.99, stock: 12, categoryId: sport.id, imageUrl: img('photo-1638536532686-d610adfc8e5c'), description: "Poids ajustable de 2 à 20kg, gain de place." },
    { name: 'Manette Gaming Pro', price: 69.99, stock: 40, categoryId: gaming.id, imageUrl: img('photo-1592840496694-26d035b52b48'), description: "Retour haptique, gâchettes adaptatives, sans fil." },
    { name: 'Casque Gaming Surround 7.1', price: 99.99, stock: 2, categoryId: gaming.id, imageUrl: img('photo-1599669454699-248893623440'), description: "Son surround 7.1, micro antibruit détachable." },
  ];

  const products: any[] = [];
  for (const p of productsData) {
    products.push(await Product.create({ ...p, slug: slug(p.name) } as any));
  }

  // ── Adresses ──────────────────────────────────────────────────────────────
  const villes = [
    { street: '12 Bd Mohammed V',    city: 'Casablanca', postalCode: '20000' },
    { street: '45 Av. Hassan II',    city: 'Rabat',      postalCode: '10000' },
    { street: '8 Rue de la Liberté', city: 'Marrakech',  postalCode: '40000' },
    { street: '23 Bd Zerktouni',     city: 'Tanger',     postalCode: '90000' },
    { street: '77 Av. des FAR',      city: 'Agadir',     postalCode: '80000' },
  ];
  const addresses: any[] = [];
  for (let i = 0; i < clients.length; i++) {
    addresses.push(await Address.create({
      userId: clients[i].id, ...pick(villes, i), country: 'Maroc',
    } as any));
  }

  // ── Commandes réparties sur 6 mois, tous statuts ─────────────────────────
  const statuses = ['delivered', 'delivered', 'shipped', 'confirmed', 'pending', 'cancelled'];
  const plan = [
    { m: 5, items: [0, 19], qty: [1, 1] },
    { m: 5, items: [8, 12], qty: [1, 2] },
    { m: 4, items: [1, 4, 7], qty: [1, 1, 2] },
    { m: 4, items: [17], qty: [1] },
    { m: 3, items: [2, 10], qty: [1, 1] },
    { m: 3, items: [22, 3], qty: [1, 1] },
    { m: 2, items: [16], qty: [1] },
    { m: 2, items: [6, 18], qty: [1, 3] },
    { m: 1, items: [19, 20], qty: [2, 1] },
    { m: 1, items: [9], qty: [1] },
    { m: 0, items: [0, 5], qty: [1, 1] },
    { m: 0, items: [21, 11], qty: [1, 2] },
  ];

  let orderCount = 0;
  for (let i = 0; i < plan.length; i++) {
    const { m, items, qty } = plan[i];
    const client = pick(clients, i);
    const address = addresses[clients.indexOf(client)];
    const status = pick(statuses, i);
    const created = monthsAgo(m, 5 + (i % 20));

    let total = 0;
    const lines = items.map((idx, k) => {
      const prod = products[idx];
      const price = Number(prod.price);
      total += price * qty[k];
      return { productId: prod.id, quantity: qty[k], price };
    });

    const order = await Order.create({
      userId: client.id, addressId: address.id, status,
      totalAmount: Number(total.toFixed(2)),
      createdAt: created, updatedAt: created,
    } as any, { silent: true });

    for (const line of lines) {
      await OrderItem.create({
        orderId: order.id, ...line, createdAt: created, updatedAt: created,
      } as any, { silent: true });
    }
    orderCount++;
  }

  // ── Journal d'activité ────────────────────────────────────────────────────
  const logs: any[] = [
    { userId: admin.id,      action: 'LOGIN',          details: 'Connexion administrateur' },
    { userId: admin.id,      action: 'PRODUCT_CREATE', details: 'Création du produit "Manette Gaming Pro"' },
    { userId: admin.id,      action: 'ORDER_UPDATE',   details: 'Statut de commande passé à "shipped"' },
    { userId: clients[0].id, action: 'LOGIN',          details: 'Connexion client' },
    { userId: clients[0].id, action: 'ORDER_CREATE',   details: 'Nouvelle commande passée' },
    { userId: clients[1].id, action: 'LOGIN',          details: 'Connexion client' },
    { userId: null,          action: 'LOGIN_FAILED',   details: 'Tentative échouée pour admin@shopai.ma' },
    { userId: admin.id,      action: 'USER_UPDATE',    details: 'Compte "compte.bloque@shopai.ma" désactivé' },
  ];
  for (let i = 0; i < logs.length; i++) {
    const when = monthsAgo(0, Math.max(1, 28 - i * 3));
    await ActivityLog.create({
      ...logs[i], ip: `196.75.${10 + i}.${20 + i}`,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      createdAt: when, updatedAt: when,
    } as any, { silent: true });
  }

  const lowStock = products.filter((p: any) => p.stock < 20).length;

  console.log('\n✅ Base initialisée avec succès.');
  console.log('──────────────────────────────────────────────');
  console.log('👤 Admin  : admin@shopai.ma  / Admin123!');
  console.log('👤 Client : client@shopai.ma / Client123!');
  console.log('   (aussi : sara@ · omar@ · fatima@ · mehdi@shopai.ma / Client123!)');
  console.log('   (désactivé : compte.bloque@shopai.ma)');
  console.log('──────────────────────────────────────────────');
  console.log(`📦 ${products.length} produits · ${categories.length} catégories`);
  console.log(`🧾 ${orderCount} commandes réparties sur 6 mois (tous statuts)`);
  console.log(`⚠️  ${lowStock} produits en stock faible · 📝 ${logs.length} entrées de journal`);
  console.log('──────────────────────────────────────────────\n');

  await sequelize.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Échec du seed :', err);
  process.exit(1);
});
