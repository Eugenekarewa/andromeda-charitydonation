import ProgressBar from './ProgressBar'
import DonateButton from './DonateButton'
interface CampaignProps {
  campaign: {
    id: string
    title: string
    description: string
    goal: number
    current: number
  }
}

export default function CampaignCard({ campaign }: CampaignProps) {
  const progress = (campaign.current / campaign.goal) * 100

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-2xl font-bold">{campaign.title}</h2>
      <p className="my-2">{campaign.description}</p>
      <ProgressBar progress={progress} />
      <div className="mt-4">
        <span className="font-bold">${campaign.current}</span> raised of ${campaign.goal}
      </div>
      <DonateButton campaignId={campaign.id} />
    </div>
  )
}
