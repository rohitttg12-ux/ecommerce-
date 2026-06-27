export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  bestSeller: boolean;
  category: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  wishlist: string[];
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  _id: string;
  user: string;
  products: OrderProduct[];
  totalAmount: number;
  shippingAddress: Address & { name: string; phone: string };
  orderStatus: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "COD";
  orderNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  product: string;
  quantity: number;
  price: number;
}

export interface Review {
  _id: string;
  product: string;
  user: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}
