import PageClient from './pageClient'
import PageClientById from './pageClientById'
import PageClientCreate from './pageClientcreate'

const Page = () => {
  return (
    <div style={{ display: 'flex' }}>
      <PageClient></PageClient>
      <PageClientById></PageClientById>
      <PageClientCreate></PageClientCreate>
    </div>
  )
}

export default Page
