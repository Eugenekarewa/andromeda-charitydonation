import { JsonRpcProvider, Contract, formatEther } from 'ethers';

const CONTRACT_ADDRESS = '0xYourContractAddressHere';
const CONTRACT_ABI = [
  {
    inputs: [],
    name: 'getCampaigns',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'string', name: 'title', type: 'string' },
          { internalType: 'string', name: 'description', type: 'string' },
          { internalType: 'uint256', name: 'goal', type: 'uint256' },
          { internalType: 'uint256', name: 'current', type: 'uint256' },
        ],
        internalType: 'struct Campaign[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

async function fetchCampaignsFromChain() {
  // Use the updated syntax for JsonRpcProvider in ethers.js v6
  const provider = new JsonRpcProvider(
    'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'
  );

  // Use the updated syntax for Contract in ethers.js v6
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    // Call the contract method to fetch campaigns
    const campaigns = await contract.getCampaigns();

    // Format the campaigns data
    return campaigns.map((campaign: any) => ({
      id: campaign.id.toString(),  // Convert BigNumber to string
      title: campaign.title,
      description: campaign.description,
      goal: parseFloat(formatEther(campaign.goal.toString())),  // Ensure BigNumber is converted
      current: parseFloat(formatEther(campaign.current.toString())),  // Ensure BigNumber is converted
    }));
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    throw error;
  }
}
