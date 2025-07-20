export interface CabinAPIData {
  id: number;
  created_at?: string;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description?: string;
  image?: string;
}

export interface CabinData {
  id?: number;
  created_at?: string;
  name?: string;
  max_capacity?: number;
  regular_price?: number;
  discount?: number;
  description?: string;
  image?: string;
}