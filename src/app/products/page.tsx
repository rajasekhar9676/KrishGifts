"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingCart,
  Search,
  SlidersHorizontal
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/providers/CartProvider'
import { products as allProducts } from '@/data/products'
import { useWishlist } from '@/components/providers/WishlistProvider'

type Product = (typeof allProducts)[number]
const products: Product[] = allProducts

const categories = [
  'All',
  'Home & Living',
  'Jewelry',
  'Kitchen',
  'Clothing',
  'Stationery',
  'Electronics',
  'Accessories',
  'Sports'
]

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const maxProductPrice = Math.max(...products.map(p => p.price))
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxProductPrice])
  const [showFilters, setShowFilters] = useState(false)
  const { addToCart } = useCart()
  const { toggle: toggleWishlist, contains: wishlistContains } = useWishlist()

  useEffect(() => {
    let filtered = [...products];
  
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
  
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  
    console.log("Filtered products:", filtered);
    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy, searchQuery, priceRange]);
  

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover unique personalized gifts for every occasion</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Categories</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={maxProductPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                      <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-64 object-cover"
                      />
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                      <button onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: product.image, category: product.category, rating: product.rating, reviews: product.reviews, description: product.description, inStock: product.inStock, isNew: product.isNew, isFeatured: product.isFeatured })} className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                        <Heart className={`w-4 h-4 ${wishlistContains(product.id) ? 'text-red-500' : 'text-gray-600'}`} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.originalPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        {product.isNew && (
                          <span className="absolute -top-1 -left-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                            {product.originalPrice && (
                              <span className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: product.image, category: product.category, rating: product.rating, reviews: product.reviews, description: product.description, inStock: product.inStock, isNew: product.isNew, isFeatured: product.isFeatured })} className="p-2 hover:text-red-500">
                              <Heart className={`w-5 h-5 ${wishlistContains(product.id) ? 'text-red-500' : 'text-gray-500'}`} />
                            </button>
                            <Link href={`/product/${product.id}`} className="btn-outline text-sm py-2">
                              View Details
                            </Link>
                            <button
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.inStock}
                              className="btn-primary text-sm px-4 py-2"
                            >
                              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 