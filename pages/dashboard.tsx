import { useEffect, useState } from 'react'
import { connectWallet } from '../lib/blockchain/contracts'

export default function Dashboard() {
  const [donations, setDonations] = useState([])
  const [address, setAddress] = useState('')

  const handleConnect = async () => {
    const userAddress = await connectWallet()
    setAddress(userAddress)
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">User Dashboard</h1>
      {!address ? (
        <button 
          onClick={handleConnect}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <h2 className="text-2xl mb-4">Your Donations</h2>
          {donations.map(donation => (
            <div key={donation.id} className="border p-4 mb-4 rounded">
              <p>Campaign: {donation.campaign}</p>
              <p>Amount: {donation.amount} ETH</p>
              <p>Date: {donation.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
