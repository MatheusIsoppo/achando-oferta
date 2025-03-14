import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        return;
      }

      // Verifica se o usuário tem role de admin
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Erro ao verificar permissões:', error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(data?.role === 'admin');
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute; 