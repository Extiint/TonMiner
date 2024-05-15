
export async function getTokenPrice() {
    const baseUrl = 'https://api.geckoterminal.com/api/v2';
    const url = `${baseUrl}/networks/eth/tokens/0x582d872a1b094fc48f5de31d3b73f2d9be47def1`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data.attributes.price_usd;
    } catch (error) {
      console.error('Failed to fetch token price:', error);
    }
  }
  