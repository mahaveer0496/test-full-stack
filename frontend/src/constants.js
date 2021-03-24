if (!import.meta.env.VITE_API_URL) {
  throw new Error('Add VITE_API_URL')
}

export default {
  API_URL: import.meta.env.VITE_API_URL,
}
