import { Suspense } from 'react'
import Hero from '@/components/sections/Hero'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import Categories from '@/components/sections/Categories'
import Testimonials from '@/components/sections/Testimonials'
import Newsletter from '@/components/sections/Newsletter'
import Loading from '@/components/ui/Loading'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Testimonials />
        <Newsletter />
      </Suspense>
    </main>
  )
} 