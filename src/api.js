const url = 'https://api.coincap.io/v2'

const getAssets = async () => {
  try {
    const response = await fetch(`${url}/assets?limit=20`)
    const result = await response.json()
    return result.data
  } catch (error) {
    return error
  }
}

const getAsset = async coin => {
  try {
    const response = await fetch(`${url}/assets/${coin}`)
    const result = await response.json()
    return result.data
  } catch (error) {
    return error
  }
}

const getAssetHistory = async coin => {
  try {
    const now = new Date()
    const end = now.getTime()
    now.setDate(now.getDate() - 1)
    const start = now.getTime()
    const response = await fetch(
      `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
    )
    const result = await response.json()
    return result.data
  } catch (error) {
    return error
  }
}

export default {
  getAssets,
  getAsset,
  getAssetHistory
}
