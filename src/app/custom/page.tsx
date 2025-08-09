'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  Type, 
  Palette, 
  Image as ImageIcon, 
  Download,
  RotateCcw,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'

interface DesignElement {
  id: string
  type: 'text' | 'image'
  content: string
  x: number
  y: number
  fontSize?: number
  color?: string
  fontFamily?: string
  width?: number
  height?: number
}

export default function CustomDesignPage() {
  const [selectedProduct, setSelectedProduct] = useState('mug')
  const [designElements, setDesignElements] = useState<DesignElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [textInput, setTextInput] = useState('')
  const [fontSize, setFontSize] = useState(24)
  const [textColor, setTextColor] = useState('#000000')
  const [fontFamily, setFontFamily] = useState('Arial')
  const [showPreview, setShowPreview] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const products = [
    { id: 'mug', name: 'Coffee Mug', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop' },
    { id: 'tshirt', name: 'T-Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
    { id: 'phonecase', name: 'Phone Case', image: 'https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?w=200&h=200&fit=crop' },
    { id: 'notebook', name: 'Notebook', image: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=200&h=200&fit=crop' },
    { id: 'pillow', name: 'Pillow', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' }
  ]

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ]

  const fonts = [
    'Arial', 'Times New Roman', 'Courier New', 'Georgia', 
    'Verdana', 'Helvetica', 'Comic Sans MS', 'Impact'
  ]

  const handleAddText = () => {
    if (textInput.trim()) {
      const newElement: DesignElement = {
        id: Date.now().toString(),
        type: 'text',
        content: textInput,
        x: 100,
        y: 100,
        fontSize,
        color: textColor,
        fontFamily
      }
      setDesignElements([...designElements, newElement])
      setTextInput('')
      setSelectedElement(newElement.id)
    }
  }

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newElement: DesignElement = {
          id: Date.now().toString(),
          type: 'image',
          content: e.target?.result as string,
          x: 100,
          y: 100,
          width: 100,
          height: 100
        }
        setDesignElements([...designElements, newElement])
        setSelectedElement(newElement.id)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleElementClick = (elementId: string) => {
    setSelectedElement(elementId)
  }

  const handleElementDrag = (elementId: string, x: number, y: number) => {
    setDesignElements(elements =>
      elements.map(el =>
        el.id === elementId ? { ...el, x, y } : el
      )
    )
  }

  const handleDeleteElement = () => {
    if (selectedElement) {
      setDesignElements(elements => elements.filter(el => el.id !== selectedElement))
      setSelectedElement(null)
    }
  }

  const handleUpdateElement = (updates: Partial<DesignElement>) => {
    if (selectedElement) {
      setDesignElements(elements =>
        elements.map(el =>
          el.id === selectedElement ? { ...el, ...updates } : el
        )
      )
    }
  }

  const selectedElementData = designElements.find(el => el.id === selectedElement)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Custom Design Studio</h1>
          <p className="text-gray-600">Create your own personalized gifts with our easy-to-use design tool</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Design Canvas */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Design Canvas</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    <Save className="w-4 h-4" />
                    <span>Save Design</span>
                  </button>
                </div>
              </div>

              {/* Product Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Choose Product</h3>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product.id)}
                      className={`flex-shrink-0 p-3 rounded-lg border-2 transition-all ${
                        selectedProduct === product.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas Area */}
              <div className="relative bg-gray-100 rounded-lg p-4">
                <div
                  ref={canvasRef}
                  className="relative w-full h-96 bg-white rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
                  style={{ backgroundImage: `url(${products.find(p => p.id === selectedProduct)?.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  {designElements.map((element) => (
                    <div
                      key={element.id}
                      className={`absolute cursor-move ${
                        selectedElement === element.id ? 'ring-2 ring-primary-500' : ''
                      }`}
                      style={{
                        left: element.x,
                        top: element.y,
                        fontSize: element.fontSize,
                        color: element.color,
                        fontFamily: element.fontFamily,
                        width: element.width,
                        height: element.height
                      }}
                      onClick={() => handleElementClick(element.id)}
                      draggable
                      onDragEnd={(e) => {
                        const rect = canvasRef.current?.getBoundingClientRect()
                        if (rect) {
                          const x = e.clientX - rect.left
                          const y = e.clientY - rect.top
                          handleElementDrag(element.id, x, y)
                        }
                      }}
                    >
                      {element.type === 'text' ? (
                        <span>{element.content}</span>
                      ) : (
                        <img
                          src={element.content}
                          alt="Uploaded"
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Design Tools */}
          <div className="lg:w-1/3">
            <div className="space-y-6">
              {/* Text Tool */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Text</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Enter your text..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                    <input
                      type="range"
                      min="12"
                      max="72"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{fontSize}px</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {fonts.map((font) => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <div className="flex space-x-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setTextColor(color)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            textColor === color ? 'border-gray-900' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={handleAddText}
                    disabled={!textInput.trim()}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Text
                  </button>
                </div>
              </div>

              {/* Image Tool */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Image</h3>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAddImage}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="btn-primary cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>
                </div>
              </div>

              {/* Element Properties */}
              {selectedElementData && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Element Properties</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={selectedElementData.x}
                          onChange={(e) => handleUpdateElement({ x: parseInt(e.target.value) })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="X"
                        />
                        <input
                          type="number"
                          value={selectedElementData.y}
                          onChange={(e) => handleUpdateElement({ y: parseInt(e.target.value) })}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Y"
                        />
                      </div>
                    </div>
                    {selectedElementData.type === 'text' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                          <input
                            type="range"
                            min="12"
                            max="72"
                            value={selectedElementData.fontSize || 24}
                            onChange={(e) => handleUpdateElement({ fontSize: parseInt(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                          <div className="flex space-x-2">
                            {colors.map((color) => (
                              <button
                                key={color}
                                onClick={() => handleUpdateElement({ color })}
                                className={`w-6 h-6 rounded-full border ${
                                  selectedElementData.color === color ? 'border-gray-900' : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    <button
                      onClick={handleDeleteElement}
                      className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      Delete Element
                    </button>
                  </div>
                </div>
              )}

              {/* Design Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Design</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                    <span>Download Design</span>
                  </button>
                  <button className="w-full btn-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 