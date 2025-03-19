import Image from 'next/image'
import styles from './page.module.css'

const Home = async () => {
  const fetchData = async () => {
    try {
      const data = await fetch('http://localhost:3001/image/13', {
        method: 'GET',
      })

      return data.json()
    } catch (e) {}
  }

  const data = await fetchData()
  return (
    <>
      {data?.data && (
        <img
          src={`data:image/png;base64,${data?.data}`}
          alt='Фото'
        />
      )}
    </>
  )
}

export default Home
