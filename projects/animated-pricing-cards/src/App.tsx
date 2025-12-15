import './App.css'
import { PRICING_TIERS } from './constants'
import Card from './components/Card'

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Choose the perfect plan for your needs
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {PRICING_TIERS.map((tier, index) => (
            <Card key={tier.id} tier={tier} index={index} />
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-4xl mx-auto text-center mt-16">
        <p className="text-gray-600 text-sm">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </main>
  )
}

export default App
