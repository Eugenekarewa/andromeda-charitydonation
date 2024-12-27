import { ethers } from 'ethers'
import CampaignABI from './abis/Campaign.json'

export const connectWallet = async (): Promise<string | undefined> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.Web3Provider(window.ethereum)  // Use Web3Provider
      const accounts = await provider.send('eth_requestAccounts', [])
      return accounts[0]
    } catch (error) {
      throw new Error('Failed to connect wallet')
    }
  } else {
    throw new Error('MetaMask is not installed')
  }
}

export const donate = async (campaignId: string, amount: string) => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed')
  }

  const provider = new ethers.Web3Provider(window.ethereum)  // Use Web3Provider
  const signer = provider.getSigner()
  const contract = new ethers.Contract(campaignId, CampaignABI, signer)

  try {
    const tx = await contract.donate({ value: ethers.utils.parseEther(amount) }) // Use ethers.utils.parseEther
    return await tx.wait()
  } catch (error) {
    throw new Error('Failed to make donation')
  }
}
