import { supabase } from './supabase';

export const backupDatabase = async () => {
  try {
    // Busca todos os posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*');

    if (postsError) throw postsError;

    // Busca todas as categorias
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*');

    if (categoriesError) throw categoriesError;

    // Cria o objeto de backup
    const backup = {
      timestamp: new Date().toISOString(),
      posts,
      categories
    };

    // Salva o backup no storage do Supabase
    const { error: uploadError } = await supabase
      .storage
      .from('backups')
      .upload(
        `backup-${backup.timestamp}.json`,
        JSON.stringify(backup, null, 2),
        {
          contentType: 'application/json',
          cacheControl: '3600'
        }
      );

    if (uploadError) throw uploadError;

    console.log('Backup realizado com sucesso:', backup.timestamp);
    return { success: true, timestamp: backup.timestamp };

  } catch (error) {
    console.error('Erro ao realizar backup:', error);
    return { success: false, error };
  }
};

export const listBackups = async () => {
  try {
    const { data, error } = await supabase
      .storage
      .from('backups')
      .list();

    if (error) throw error;

    return { success: true, backups: data };
  } catch (error) {
    console.error('Erro ao listar backups:', error);
    return { success: false, error };
  }
};

export const restoreBackup = async (backupFileName: string) => {
  try {
    // Download do arquivo de backup
    const { data, error: downloadError } = await supabase
      .storage
      .from('backups')
      .download(backupFileName);

    if (downloadError) throw downloadError;

    // Converte o arquivo para JSON
    const backupData = JSON.parse(await data.text());

    // Limpa as tabelas existentes
    await supabase.from('posts').delete().neq('id', 0);
    await supabase.from('categories').delete().neq('id', 0);

    // Restaura os posts
    if (backupData.posts?.length > 0) {
      const { error: postsError } = await supabase
        .from('posts')
        .insert(backupData.posts);

      if (postsError) throw postsError;
    }

    // Restaura as categorias
    if (backupData.categories?.length > 0) {
      const { error: categoriesError } = await supabase
        .from('categories')
        .insert(backupData.categories);

      if (categoriesError) throw categoriesError;
    }

    return { success: true, timestamp: backupData.timestamp };
  } catch (error) {
    console.error('Erro ao restaurar backup:', error);
    return { success: false, error };
  }
}; 