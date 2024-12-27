import { useState, useEffect } from 'react'
import CampaignCard from '../components/CampaignCard'
import DonateButton from '../components/DonateButton'

export default function Home() {
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    // Fetch active campaigns
    fetchCampaigns()
  }, [])

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Active Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <CampaignCard 
            key={campaign.id}
            campaign={campaign}
          />
        ))}
      </div>
    </div>
  )
}
