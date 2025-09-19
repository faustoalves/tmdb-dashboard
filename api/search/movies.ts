import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { q, page = '1' } = req.query
    
    if (!q || Array.isArray(q)) {
      return res.status(400).json({ error: 'Search query is required' })
    }
    
    const response = await fetch(
      `${process.env.TMDB_BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(q)}&page=${page}&language=pt-BR`
    )
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    res.status(200).json(data)
  } catch (error) {
    console.error('Error searching movies:', error)
    res.status(500).json({ error: 'Failed to search movies' })
  }
}
