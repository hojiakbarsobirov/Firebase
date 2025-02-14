import './App.css'
import { getDocs, collection, addDoc } from 'firebase/firestore'
import { db } from './store/config'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function App() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const [info, setInfo] = useState([])
  const students = collection(db, 'students')

  // Firebase dan ma'lumot olish
  const getInfo = async () => {
    const data = await getDocs(students)
    const list = data.docs.map((d) => ({ ...d.data(), id: d.id }))
    setInfo(list)
  }

  useEffect(() => {
    getInfo()
  }, [])

  // Form yuborilganda ishlaydigan funksiya
  const onSubmit = async (data) => {
    await addDoc(students, data) // Firebase ga jo'natish
    reset() // Formni tozalash
    getInfo() // Yangi ma'lumotlarni olish
  }

  return (
    <section className='w-full h-auto py-14'>
      <div className="max-w-md mx-auto p-6 text-center font-sans rounded-lg shadow-lg bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Student Registration</h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

          {/* Name input */}
          <div className='w-full h-14'>
            <input type="text"
              {...register('name', { required: 'Ism kiriting!' })}
              placeholder="Name"
              className="p-2 w-full border border-gray-300 rounded-md" />
            {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
          </div>

          {/* Surname input */}
          <div className='w-full h-14'>
            <input type="text"
              {...register('surname', { required: 'Familya kiriting!' })}
              placeholder="Surname"
              className="p-2 w-full border border-gray-300 rounded-md" />
            {errors.surname && <span className='text-red-500 text-sm'>{errors.surname.message}</span>}
          </div>

          {/* Age input */}
          <div className='w-full h-14'>
            <input type="number"
              {...register('age', { required: 'Yosh kiriting!', min: { value: 1, message: "Yosh 1 dan katta bo'lishi kerak" } })}
              placeholder="Age"
              className="p-2 w-full border border-gray-300 rounded-md" />
            {errors.age && <span className='text-red-500 text-sm'>{errors.age.message}</span>}
          </div>

          {/* Address input */}
          <div className='w-full h-14'>
            <input type="text"
              {...register('address', { required: 'Manzil kiriting!' })}
              placeholder="Address"
              className="p-2 w-full border border-gray-300 rounded-md" />
            {errors.address && <span className='text-red-500 text-sm'>{errors.address.message}</span>}
          </div>

          {/* Submit button */}
          <button type="submit" className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600">Send</button>

        </form>

        {/* Student List */}
        <h3 className="text-lg font-semibold mt-6">Student List</h3>
        <ul className="list-none p-0">
          {info.map((student) => (
            <li key={student.id} className="bg-white p-3 rounded-md shadow-md my-2">
              {student.name} {student.surname}, {student.age} years old, {student.address}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default App
