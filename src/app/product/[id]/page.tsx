"use client"

import { useParams, useRouter } from 'next/navigation'
import { useCart } from '@/components/providers/CartProvider'
import Image from 'next/image'
import { getProductById } from '@/data/products'

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const product = getProductById(String(id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-8">Sorry, the product you are looking for does not exist.</p>
          <button onClick={() => router.push('/products')} className="btn-primary">Back to Products</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex items-center justify-center">
          <Image src={product.image} alt={product.name} width={400} height={400} className="rounded-lg object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 font-bold">{product.rating}★</span>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>
            <div className="mb-6">
              <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">{product.category}</span>
            </div>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="btn-primary text-lg py-3 mt-4"
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}