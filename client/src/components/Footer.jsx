import { Shield } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black py-12 px-6">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-white" />
            <span className="text-xl font-semibold text-white">
              Sentinel
            </span>
          </div>
          <p className="text-gray-400">
            The most trusted password manager for individuals and businesses
            worldwide.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-white">Product</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Security
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Business
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Sentinel. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
