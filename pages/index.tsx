import { useState, useEffect } from 'react';
import CampaignCard from '../components/CampaignCard';

type Campaign = {
  id: string;
  title: string;
  description: string;
  goal: number;
  current: number;
};

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }
      const data: Campaign[] = await response.json();
      setCampaigns(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Active Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.length > 0 ? (
          campaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))
        ) : (
          <p>No campaigns found</p>
        )}
      </div>
    </div>
  );
}
