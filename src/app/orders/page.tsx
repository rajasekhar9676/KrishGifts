'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Eye,
  Download,
  Star,
  MapPin
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  shippingAddress: string
  trackingNumber?: string
  estimatedDelivery?: string
}

const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 89.97,
    items: [
      {
        id: '1',
        name: 'Personalized Photo Frame',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop'
      },
      {
        id: '2',
        name: 'Custom Jewelry Box',
        price: 45.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop'
      },
      {
        id: '3',
        name: 'Personalized Mug Set',
        price: 13.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop'
      }
    ],
    shippingAddress: '123 Main Street, New York, NY 10001',
    trackingNumber: '1Z999AA1234567890',
    estimatedDelivery: '2024-01-20'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 34.98,
    items: [
      {
        id: '4',
        name: 'Custom T-Shirt',
        price: 19.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop'
      },
      {
        id: '5',
        name: 'Personalized Notebook',
        price: 14.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=100&h=100&fit=crop'
      }
    ],
    shippingAddress: '123 Main Street, New York, NY 10001',
    trackingNumber: '1Z999AA1234567891',
    estimatedDelivery: '2024-01-25'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-25',
    status: 'processing',
    total: 15.99,
    items: [
      {
        id: '6',
        name: 'Custom Phone Case',
        price: 15.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?w=100&h=100&fit=crop'
      }
    ],
    shippingAddress: '123 Main Street, New York, NY 10001',
    estimatedDelivery: '2024-01-30'
  }
]

const statusConfig = {
  pending: { label: 'Pending', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: <Clock className="w-4 h-4" /> },
  processing: { label: 'Processing', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: <Package className="w-4 h-4" /> },
  shipped: { label: 'Shipped', color: 'text-purple-600', bgColor: 'bg-purple-100', icon: <Truck className="w-4 h-4" /> },
  delivered: { label: 'Delivered', color: 'text-green-600', bgColor: 'bg-green-100', icon: <CheckCircle className="w-4 h-4" /> },
  cancelled: { label: 'Cancelled', color: 'text-red-600', bgColor: 'bg-red-100', icon: <Clock className="w-4 h-4" /> }
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusStep = (status: Order['status']) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered']
    return steps.indexOf(status)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your orders and view order history</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Orders
            </button>
            {Object.entries(statusConfig).map(([status, config]) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
              <Link href="/products" className="btn-primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                      <p className="text-sm text-gray-500">Placed on {formatDate(order.date)}</p>
                    </div>
          <div className="flex items-center space-x-4">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig[order.status].bgColor}`}>
                        {statusConfig[order.status].icon}
                        <span className={`text-sm font-medium ${statusConfig[order.status].color}`}>
                          {statusConfig[order.status].label}
                        </span>
                      </div>
                      <div className="text-right">
              <p className="text-lg font-bold text-gray-900">₹{order.total.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="w-15 h-15 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{order.shippingAddress}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        {order.trackingNumber && (
                          <button className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                            <Truck className="w-4 h-4" />
                            <span className="text-sm">Track Package</span>
                          </button>
                        )}
                        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Download Invoice</span>
                        </button>
                        <button
                          onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Details (Expandable) */}
                  {selectedOrder?.id === order.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      {/* Order Progress */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-4">Order Progress</h4>
                        <div className="relative">
                          <div className="flex items-center justify-between">
                            {['pending', 'processing', 'shipped', 'delivered'].map((step, index) => {
                              const isCompleted = getStatusStep(order.status) >= index
                              const isCurrent = getStatusStep(order.status) === index
                              return (
                                <div key={step} className="flex flex-col items-center">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                                  }`}>
                                    {isCompleted ? (
                                      <CheckCircle className="w-5 h-5" />
                                    ) : (
                                      <span className="text-sm font-medium">{index + 1}</span>
                                    )}
                                  </div>
                                  <span className={`text-xs mt-2 text-center ${
                                    isCurrent ? 'text-primary-600 font-medium' : 'text-gray-500'
                                  }`}>
                                    {statusConfig[step as keyof typeof statusConfig].label}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                            <div 
                              className="h-full bg-green-500 transition-all duration-500"
                              style={{ width: `${(getStatusStep(order.status) / 3) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Shipping Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Shipping Information</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>Address:</strong> {order.shippingAddress}</p>
                            {order.trackingNumber && (
                              <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                            )}
                            {order.estimatedDelivery && (
                              <p><strong>Estimated Delivery:</strong> {formatDate(order.estimatedDelivery)}</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal:</span>
                              <span className="text-gray-900">₹{order.total.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Shipping:</span>
                              <span className="text-gray-900">Free</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tax:</span>
                              <span className="text-gray-900">₹{(order.total * 0.08).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between font-medium border-t border-gray-200 pt-2">
                              <span className="text-gray-900">Total:</span>
                              <span className="text-gray-900">₹{(order.total * 1.08).toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Review Button for Delivered Orders */}
                      {order.status === 'delivered' && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                            <Star className="w-4 h-4" />
                            <span>Write a Review</span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 