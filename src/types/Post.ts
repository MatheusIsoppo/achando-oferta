export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  content_initial?: string;
  excerpt: string;
  image_url: string;
  categories?: string[];
  created_at: string;
  updated_at: string;
  store_name?: string;
  store_url?: string;
  product_url?: string;
  price?: number;
  sale_price?: number;
  affiliate_url?: string;
} 