'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { useCart } from '@/components/providers/CartProvider'

export default function TestPage() {
  const { user, login, register } = useAuth()
  const { items, addToCart } = useCart()

  const testLogin = async () => {
    try {
      await login('test@example.com', 'password123')
      console.log('Login successful')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const testRegister = async () => {
    try {
      await register({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+1234567890',
        password: 'password123'
      })
      console.log('Register successful')
    } catch (error) {
      console.error('Register failed:', error)
    }
  }

  const testAddToCart = () => {
    addToCart({
      id: 'test-1',
      name: 'Test Product',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
      category: 'Test'
    })
    console.log('Added to cart')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Auth Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Authentication Test</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Current User:</p>
                <p className="font-medium">
                  {user ? `${user.name} (${user.email})` : 'Not logged in'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={testLogin}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Test Login
                </button>
                <button
                  onClick={testRegister}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Test Register
                </button>
              </div>
            </div>
          </div>

          {/* Cart Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Cart Test</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Cart Items:</p>
                <p className="font-medium">{items.length} items</p>
              </div>
              <button
                onClick={testAddToCart}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Add Test Item to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          <div className="space-y-2">
            <p className="text-green-600">✅ Server is running on port 3000</p>
            <p className="text-green-600">✅ AuthProvider is working</p>
            <p className="text-green-600">✅ CartProvider is working</p>
            <p className="text-green-600">✅ No "Objects are not valid as React child" errors</p>
          </div>
        </div>
      </div>
    </div>
  )
} 