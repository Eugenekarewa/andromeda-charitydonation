import { ethers } from 'ethers'
import CampaignABI from './abis/Campaign.json'

export const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.send('eth_requestAccounts', [])
      return accounts[0]
    } catch (error) {
      throw new Error('Failed to connect wallet')
    }
  }
}

export const donate = async (campaignId: string, amount: string) => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = new ethers.Contract(campaignId, CampaignABI, signer)
  
  const tx = await contract.donate({ value: ethers.parseEther(amount) })
  return tx.wait()
}