import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Busca todos os posts
    const { data: posts, error: postsError } = await supabaseClient
      .from('posts')
      .select('*')

    if (postsError) throw postsError

    // Busca todas as categorias
    const { data: categories, error: categoriesError } = await supabaseClient
      .from('categories')
      .select('*')

    if (categoriesError) throw categoriesError

    // Cria o objeto de backup
    const backup = {
      timestamp: new Date().toISOString(),
      posts,
      categories
    }

    // Salva o backup no storage
    const { error: uploadError } = await supabaseClient
      .storage
      .from('backups')
      .upload(
        `backup-${backup.timestamp}.json`,
        JSON.stringify(backup, null, 2),
        {
          contentType: 'application/json',
          cacheControl: '3600'
        }
      )

    if (uploadError) throw uploadError

    return new Response(
      JSON.stringify({ success: true, timestamp: backup.timestamp }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
}) 