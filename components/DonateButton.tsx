interface DonateButtonProps {
    campaignId: string
  }
  
  export default function DonateButton({ campaignId }: DonateButtonProps) {
    const handleDonate = () => {
      // Logic for handling donations, such as interacting with a smart contract
      console.log(`Donate to campaign: ${campaignId}`)
      // Example: Trigger a blockchain transaction or show a payment modal
    }
  
    return (
      <button
        onClick={handleDonate}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Donate Now
      </button>
    )
  }
  