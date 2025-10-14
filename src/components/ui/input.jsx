import React from 'react'

export function Input({ className = '', ...props }) {
  const base =
    'w-full bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-colors'

  return <input className={`${base} ${className}`.trim()} {...props} />
}

export default Input
