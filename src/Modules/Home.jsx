import React from 'react'
import Services from '../Components/Home/Services/Service'
import FeatureSection from '../Components/Home/Feature/FeatureSection'
import Testimonials from '../Components/Home/Testimonial/Testimonials'
import Pricing from '../Components/Home/Pricings/Pricing'
import TopContent from '../Components/Home/Topcontent/TopContent'
import Documentation from './Documentation'

export default function Home() {
  return (
    <div>
      <TopContent/>
      <Services/>
      <FeatureSection/>
      <Testimonials/>
      <Pricing/>
    </div>
  )
}
