import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLogs from './pages/admin/AdminLogs';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminNav from './components/layout/AdminNav';
import NotFoundPage from './pages/NotFoundPage';

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requireAdmin>
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Header isAdmin />
      <main className="flex-grow p-4 lg:p-8">
        <AdminNav />
        {children}
      </main>
    </div>
  </ProtectedRoute>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/products" element={<PublicLayout><CatalogPage /></PublicLayout>} />
        <Route path="/products/:id" element={<PublicLayout><ProductPage /></PublicLayout>} />
        <Route path="/cart" element={<PublicLayout><CartPage /></PublicLayout>} />
        <Route path="/checkout" element={<PublicLayout><CheckoutPage /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
        
        <Route path="/account" element={<PublicLayout><AccountPage /></PublicLayout>} />
        <Route path="/account/orders" element={<PublicLayout><OrdersPage /></PublicLayout>} />
        <Route path="/account/orders/:id" element={<PublicLayout><OrderDetailPage /></PublicLayout>} />

        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
        <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
        <Route path="/admin/logs" element={<AdminLayout><AdminLogs /></AdminLayout>} />

        <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
