'use client'

import { KeyDialog } from '@/components/KeyInject'
import Layout from '@/components/Layout'
import useKeyStore, { clearKey } from '@/domain/key/store'
import { APIProvider } from '@vis.gl/react-google-maps'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loading = useKeyStore(s => s.loading)
  const key = useKeyStore(s => s.key)

  const handleKeyError = (e: unknown) => {
    console.error('Google Maps API Error:', e)
    clearKey()
  }

  return loading ? null : key ? (
    <APIProvider
      apiKey={key}
      libraries={['maps', 'marker']}
      region='zh-TW'
      language='zh-TW'
      onError={handleKeyError}
    >
      <Layout>{children}</Layout>
    </APIProvider>
  ) : (
    <KeyDialog open={true} />
  )
}

export default MainLayout
