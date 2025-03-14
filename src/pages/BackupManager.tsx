import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { backupDatabase, listBackups, restoreBackup } from '@/lib/backup';

interface BackupFile {
  name: string;
  created_at: string;
  id: string;
}

export default function BackupManager() {
  const [backups, setBackups] = useState<BackupFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const fetchBackups = async () => {
    try {
      const result = await listBackups();
      if (result.success && result.backups) {
        setBackups(result.backups);
      } else {
        setError('Erro ao carregar backups');
      }
    } catch (err) {
      setError('Erro ao carregar backups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    setError(null);
    try {
      const result = await backupDatabase();
      if (result.success) {
        await fetchBackups();
      } else {
        setError('Erro ao criar backup');
      }
    } catch (err) {
      setError('Erro ao criar backup');
    } finally {
      setIsCreatingBackup(false);
    }
  };

  const handleRestoreBackup = async (fileName: string) => {
    if (!window.confirm('Tem certeza que deseja restaurar este backup? Isso irá substituir todos os dados atuais.')) {
      return;
    }

    setIsRestoring(true);
    setError(null);
    try {
      const result = await restoreBackup(fileName);
      if (result.success) {
        alert('Backup restaurado com sucesso!');
      } else {
        setError('Erro ao restaurar backup');
      }
    } catch (err) {
      setError('Erro ao restaurar backup');
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Gerenciador de Backups - Achando Oferta</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Gerenciador de Backups
          </h1>
          <Button
            onClick={handleCreateBackup}
            disabled={isCreatingBackup}
            className="bg-primary hover:bg-primary/90"
          >
            {isCreatingBackup ? 'Criando...' : 'Criar Backup'}
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Carregando backups...</div>
        ) : backups.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum backup encontrado.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome do Arquivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Criação
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {backups.map((backup) => (
                  <tr key={backup.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {backup.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(backup.created_at).toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Button
                        onClick={() => handleRestoreBackup(backup.name)}
                        disabled={isRestoring}
                        variant="outline"
                        size="sm"
                      >
                        {isRestoring ? 'Restaurando...' : 'Restaurar'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 