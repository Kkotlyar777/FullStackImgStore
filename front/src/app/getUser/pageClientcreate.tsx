'use client'
import { useState } from 'react'

export default function pageClientcreate() {
  const [stateimage_id_list, setStateimage_id_list] = useState<Array<number>>(
    []
  )
  const [stateavatar_url, setStateavatar_url] = useState('')
  const [statepassword, setStatepassword] = useState('')
  const [stateemail, setStateemail] = useState('')
  const [statenick, setStatenick] = useState('')

  const [state, setState] = useState('')
  const [stateData, setStateData] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/create`, {
        body: JSON.stringify({
          image_id_list: stateimage_id_list,
          avatar_url: stateavatar_url,
          password: statepassword,
          email: stateemail,
          nick_name: statenick,
        }),
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`)
      }

      const data = await response.json()
      setStateData(data)
    } catch (error) {
      console.error('Ошибка при запросе:', error)
    }
  }

  return (
    <div>
      <input
        type='text'
        onChange={(e) =>
          setStateimage_id_list(
            e.target.value.split('').map((el) => Number(el))
          )
        }
        placeholder='Введите image_id_list'
      />
      <input
        type='text'
        onChange={(e) => setStateavatar_url(e.target.value)}
        placeholder='Введите avatar_url'
      />
      <input
        type='text'
        onChange={(e) => setStatepassword(e.target.value)}
        placeholder='Введите password'
      />
      <input
        type='text'
        onChange={(e) => setStateemail(e.target.value)}
        placeholder='Введите email'
      />
      <input
        type='text'
        onChange={(e) => setStatenick(e.target.value)}
        placeholder='Введите nick'
      />
      <button onClick={fetchData}>зарегестрировать пользователя</button>
      {stateData && (
        <div style={{ color: 'white' }}>
          <h3>Данные пользователя:</h3>
          <pre>{JSON.stringify(stateData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
