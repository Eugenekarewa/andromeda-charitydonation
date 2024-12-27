import { useEffect, useState } from 'react';
import { connectWallet } from '../lib/blockchain/contracts';

export default function Dashboard() {
  const [donations, setDonations] = useState<any[]>([]); // You can replace `any` with a more specific type
  const [address, setAddress] = useState<string>(''); // Explicitly define type for `address`

  // Fix: Explicit type for userAddress
  const fetchDonations = async (userAddress: string) => {
    // Replace with real API or blockchain call
    const mockDonations = [
      { id: '1', campaign: 'Save the Forests', amount: '0.5', date: '2024-12-01' },
      { id: '2', campaign: 'Clean the Oceans', amount: '1.0', date: '2024-12-15' },
    ];
    return mockDonations;
  };

  const handleConnect = async () => {
    try {
      const userAddress: string = await connectWallet(); // Specify that userAddress is a string
      setAddress(userAddress);

      const userDonations = await fetchDonations(userAddress);
      setDonations(userDonations);
    } catch (error) {
      alert('Failed to connect wallet. Please ensure MetaMask is installed.');
      console.error(error);
    }
  };

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
          {donations.length === 0 ? (
            <p className="text-gray-500">You haven't made any donations yet.</p>
          ) : (
            donations.map(donation => (
              <div key={donation.id} className="border p-4 mb-4 rounded">
                <p>Campaign: {donation.campaign}</p>
                <p>Amount: {donation.amount} ETH</p>
                <p>Date: {donation.date}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}