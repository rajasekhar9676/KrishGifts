export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  description: string
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
  badge?: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Personalized Photo Frame',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1550535424-fd4382da050c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Home & Living',
    rating: 4.8,
    reviews: 127,
    description: 'Beautiful wooden photo frame with custom engraving',
    inStock: true,
    isNew: true,
    isFeatured: true,
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Custom Jewelry Box',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1578632297758-3a6c6de14be8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Jewelry',
    rating: 4.9,
    reviews: 89,
    description: 'Elegant jewelry box with personalized monogram',
    inStock: true,
    isFeatured: true,
    badge: 'Popular'
  },
  {
    id: '3',
    name: 'Personalized Mug Set',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1605714196241-00bf7a8fe7bb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Kitchen',
    rating: 4.7,
    reviews: 203,
    description: 'Set of 4 ceramic mugs with custom designs',
    inStock: true,
    badge: 'New'
  },
  {
    id: '4',
    name: 'Custom T-Shirt',
    price: 499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Clothing',
    rating: 4.6,
    reviews: 156,
    description: 'Premium cotton t-shirt with personalized print',
    inStock: true
  },
  {
    id: '5',
    name: 'Personalized Notebook',
    price: 299,
    image: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=400&h=400&fit=crop',
    category: 'Stationery',
    rating: 4.5,
    reviews: 78,
    description: 'Leather-bound notebook with custom embossing',
    inStock: true
  },
  {
    id: '6',
    name: 'Custom Phone Case',
    price: 399,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.4,
    reviews: 234,
    description: 'Durable phone case with personalized design',
    inStock: true,
    isNew: true
  },
  {
    id: '7',
    name: 'Personalized Candle',
    price: 349,
    image: 'https://images.unsplash.com/photo-1512697005862-447218ec070e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Home & Living',
    rating: 4.8,
    reviews: 95,
    description: 'Scented candle with custom label',
    inStock: true
  },
  {
    id: '8',
    name: 'Custom Keychain',
    price: 149,
    image: 'https://images.unsplash.com/photo-1694649639728-f35eb86bdbf4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Accessories',
    rating: 4.3,
    reviews: 167,
    description: 'Metal keychain with engraved text',
    inStock: true
  },
  {
    id: '9',
    name: 'Personalized Wall Art',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Home & Living',
    rating: 4.9,
    reviews: 45,
    description: 'Canvas print with custom text or image',
    inStock: true,
    isFeatured: true,
    badge: 'Premium'
  },
  {
    id: '10',
    name: 'Custom Water Bottle',
    price: 399,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Sports',
    rating: 4.7,
    reviews: 123,
    description: 'Stainless steel bottle with personalized design',
    inStock: true,
    isFeatured: true,
    badge: 'Trending'
  },
  {
    id: '11',
    name: 'Personalized Pillow',
    price: 699,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uYWxpc2VkJTIwcGlsbG93fGVufDB8fDB8fHww',
    category: 'Home & Living',
    rating: 4.6,
    reviews: 89,
    description: 'Soft pillow with custom embroidery',
    inStock: true
  },
  {
    id: '12',
    name: 'Custom Watch',
    price: 2999,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1619946928632-abefa12506e2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Accessories',
    rating: 4.8,
    reviews: 67,
    description: 'Elegant watch with engraved case back',
    inStock: true,
    isNew: true,
    isFeatured: true,
    badge: 'Limited'
  }
]

export const getProductById = (id: string) => products.find(p => p.id === id)



