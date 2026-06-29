import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import BuyerDashboard from '@/pages/dashboard/BuyerDashboard';
import SellerDashboard from '@/pages/dashboard/SellerDashboard';
import AdminDashboard from '@/pages/dashboard/AdminDashboard';
import AffiliateDashboard from '@/pages/dashboard/AffiliateDashboard';
import AgencyDashboard from '@/pages/dashboard/AgencyDashboard';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin': return <AdminDashboard />;
      case 'seller': return <SellerDashboard />;
      case 'affiliate': return <AffiliateDashboard />;
      case 'agency': return <AgencyDashboard />;
      default: return <BuyerDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}
