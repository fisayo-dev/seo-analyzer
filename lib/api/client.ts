import axios from 'axios'

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Before every request, grab the latest session token and set the Authorization header
apiClient.interceptors.request.use(
  async (config) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/session`, {
        method: 'GET'
    })
    const data = await response.json()
    const session = data.session

    if (session?.token) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${session.token}`;
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
