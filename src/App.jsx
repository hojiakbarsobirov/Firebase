import './App.css'
import { getDocs, collection } from 'firebase/firestore'
import { db } from './store/config'
import { useEffect, useState } from 'react'

function App() {

  const [info, setInfo] = useState()

  const students = collection(db, 'students')

  const getInfo = async() => {
    const data = await getDocs(students)
    const list = (data.docs.map((d) => ({...d.data(), id : d.id})))
    console.log(list)
  }

  useEffect(() => {
    const fetchData = async () => {
      await getInfo()
    }
    fetchData()
  },[])

  return (
    <>
    </>
  )
}

export default App
