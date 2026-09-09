export type ProductCategory = 'all' | 'rings' | 'necklaces' | 'earrings' | 'bracelets';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'rings' | 'necklaces' | 'earrings' | 'bracelets';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  image: string;
  hoverImage: string;
  gallery: string[];
  description: string;
  craftsmanship: string;
  materialOptions: string[];
  sizeOptions?: string[];
  dimensions?: string;
  caratWeight?: string;
  inStock: boolean;
}

export interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
  selectedMaterial: string;
  selectedSize: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  pieceName: string;
  date: string;
}

export interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  shippingMethod: 'complimentary' | 'express';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  giftWrap: boolean;
  giftMessage?: string;
}
