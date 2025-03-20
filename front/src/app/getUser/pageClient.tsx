'use client'
import { useState } from 'react'

export default function UserFetcher() {
  const [state, setState] = useState(NaN)
  const [stateData, setStateData] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/getById`, {
        body: JSON.stringify({
          id: state,
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
        type='number'
        onChange={(e) => setState(Number(e.target.value))}
        placeholder='Введите ID'
      />
      <button onClick={fetchData}>Получить пользователя по id</button>

      {stateData && (
        <div style={{ color: 'white' }}>
          <h3>Данные пользователя по id:</h3>
          <pre>{JSON.stringify(stateData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
