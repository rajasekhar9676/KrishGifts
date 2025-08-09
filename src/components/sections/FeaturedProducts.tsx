'use client'

import { motion } from 'framer-motion'
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/components/providers/CartProvider'
import { products as allProducts } from '@/data/products'
import { useWishlist } from '@/components/providers/WishlistProvider'

const productsFallback = [
  {
    id: 1,
    name: 'Vintage Photo Frame',
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1515288207449-100e125abccb?q=80&w=769&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Photo Frames',
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Custom Wedding Album',
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 89,
    image: 'https://plus.unsplash.com/premium_photo-1696863123113-08ce22ca133b?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Photo Albums',
    badge: 'Popular'
  },
  {
    id: 3,
    name: 'Digital Portrait Art',
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Custom Art',
    badge: 'New'
  },
  {
    id: 4,
    name: 'Luxury Gift Box Set',
    price: 1899,
    originalPrice: 2299,
    rating: 4.6,
    reviews: 67,
    image: 'https://plus.unsplash.com/premium_photo-1698846872520-848fff91a056?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGx1eHVyeSUyMGdpZnQlMjBib3glMjBzZXR8ZW58MHx8MHx8fDA%3D',
    category: 'Premium Collection',
    badge: 'Limited'
  },
  {
    id: 5,
    name: 'Birthday Memory Book',
    price: 999,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Photo Albums',
    badge: 'Trending'
  },
  {
    id: 6,
    name: 'Handcrafted Wood Frame',
    price: 1599,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1593986338340-6f7361d756da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGhhbmQlMjBjcmFmdGVkJTIwd29vZGVuJTIwZnJhbWV8ZW58MHx8MHx8fDA%3D',
    category: 'Photo Frames',
    badge: 'Premium'
  }
]

const FeaturedProducts = () => {
  const { addToCart } = useCart()
  const { toggle, contains } = useWishlist()
  const products = allProducts.length ? allProducts.filter(p => p.isFeatured).slice(0, 6) : productsFallback
  return (
    <section className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Featured{' '}
            <span className="text-gradient">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our most loved handcrafted gifts, carefully selected for their quality and beauty
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.badge}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button onClick={() => toggle({ id: String(product.id), name: product.name, price: product.price, originalPrice: product.originalPrice, image: product.image, category: product.category })} className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200">
                    <Heart className={`w-5 h-5 ${contains(String(product.id)) ? 'text-red-500' : 'text-gray-600'} transition-colors`} />
                  </button>

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200">
                      <Eye className="w-5 h-5 text-gray-600 hover:text-primary-600 transition-colors" />
                    </button>
                    <button onClick={() => addToCart({ id: String(product.id), name: product.name, price: product.price, image: product.image, category: product.category })} className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-all duration-200">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-primary-600 font-medium">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-lg text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-green-600 font-medium">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button onClick={() => addToCart({ id: String(product.id), name: product.name, price: product.price, image: product.image, category: product.category })} className="flex-1 btn-primary text-sm py-2">
                      Add to Cart
                    </button>
                    <Link href={`/product/${product.id}`} className="btn-outline text-sm py-2">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/products" className="btn-primary">
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts 