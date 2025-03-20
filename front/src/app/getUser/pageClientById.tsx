'use client'
import { useState } from 'react'

export default function UserFetcher() {
  const [state, setState] = useState('')
  const [stateData, setStateData] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/getByNick`, {
        body: JSON.stringify({
          nick_name: state,
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
        onChange={(e) => setState(e.target.value)}
        placeholder='Введите Nick'
      />
      <button onClick={fetchData}>Получить пользователя по nick</button>

      {stateData && (
        <div style={{ color: 'white' }}>
          <h3>Данные пользователя по nick:</h3>
          <pre>{JSON.stringify(stateData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
