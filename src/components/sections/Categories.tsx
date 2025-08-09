'use client'

import { motion } from 'framer-motion'
import { Heart, Camera, BookOpen, Palette, Gift, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    id: 1,
    name: 'Photo Frames',
    description: 'Beautiful handcrafted frames for your precious memories',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: 'from-blue-400 to-purple-500',
    bgColor: 'bg-blue-50',
    count: '50+ Designs'
  },
  {
    id: 2,
    name: 'Photo Albums',
    description: 'Custom albums to preserve your special moments',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1595981234058-a9302fb97229?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: 'from-green-400 to-teal-500',
    bgColor: 'bg-green-50',
    count: '30+ Styles'
  },
  {
    id: 3,
    name: 'Custom Art',
    description: 'Personalized artwork and digital paintings',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
    count: '100+ Designs'
  },
  {
    id: 4,
    name: 'Wedding Gifts',
    description: 'Special gifts for the most important day',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-red-400 to-pink-500',
    bgColor: 'bg-red-50',
    count: '25+ Collections'
  },
  {
    id: 5,
    name: 'Birthday Gifts',
    description: 'Personalized gifts for every age',
    icon: Gift,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-yellow-50',
    count: '40+ Options'
  },
  {
    id: 6,
    name: 'Premium Collection',
    description: 'Exclusive handcrafted luxury items',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-purple-400 to-indigo-500',
    bgColor: 'bg-purple-50',
    count: '20+ Luxury'
  }
]

const Categories = () => {
  return (
    <section className="py-20 bg-white">
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
            Explore Our{' '}
            <span className="text-gradient">Collections</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover handcrafted gifts for every occasion, made with love and attention to detail
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className={`${category.bgColor} rounded-2xl p-6 h-full transition-all duration-300 group-hover:shadow-xl`}>
                {/* Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent`} />
                  
                  {/* Icon */}
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium text-primary-600">
                      {category.count}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            View All Collections
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Categories 