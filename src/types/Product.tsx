// src/types/Product.ts
import { ObjectId } from "mongodb"; // Importa o tipo ObjectId

// Tipo para produtos criados (sem _id)
export interface ProductWithoutId {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Tipo para produtos carregados (com _id)
export interface Product extends ProductWithoutId {
  _id: ObjectId;
}
