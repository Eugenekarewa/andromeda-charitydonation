import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Fetch campaigns from blockchain
      const campaigns = await fetchCampaignsFromChain()
      res.status(200).json(campaigns)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch campaigns' })
    }
  }
}
