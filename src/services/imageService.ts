import { supabase } from '@/lib/supabase';

export const imageService = {
  // Upload de imagem
  async uploadImage(file: File, postId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${postId}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('post-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Gerar URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('post-images')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  // Deletar imagem
  async deleteImage(imageUrl: string) {
    const fileName = imageUrl.split('/').pop();
    if (!fileName) return;

    const { error } = await supabase.storage
      .from('post-images')
      .remove([fileName]);

    if (error) throw error;
  }
}; 