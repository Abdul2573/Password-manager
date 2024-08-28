import React, { useRef, useState, useEffect } from 'react'

import { Bounce, ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: " ", username: " ", password: " " })
  const [passwordArray, setpasswordArray] = useState([])



  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    // let passwordArray;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])





  const savePassword = () => {

    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    console.log([...passwordArray, form])
    setform({ site: " ", username: " ", password: " " })

  }

  const deletePassword = (id) => {
    let c = confirm("Do you want to delete thi entry?")
    console.log("Deleteing the password of id", id)
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    }
  }

  const editPassword = (id) => {
    console.log("Editing the password of id", id)
    setform(passwordArray.filter(i => i.id === id)[0])

    setpasswordArray(passwordArray.filter(item => item.id !== id))

  }


  const showPassword = () => {
    passwordRef.current.type = "text"

    if (ref.current.src.includes("images/eye-close.png")) {
      ref.current.src = "images/eye-open1.png"
      passwordRef.current.type = "password"
    }
    else {
      ref.current.src = "images/eye-close.png";
      passwordRef.current.type = "text"
    }

  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  const copyText = (text) => {
    toast.success('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text)

  }







  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 -z-10 h-full w-full bg-green-100"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(132,244,109,0.5)] opacity-50 blur-[80px]"></div></div>
      <div className=' p-2 md:myContainer px-2'>
        <h1 className='text-4xl text-center font-bold'>
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>

        </h1>
        <p className='text-green-800 text-lg text-center'> Your own password manager</p>
        <div className='text-black flex flex-col p-4 gap-6 items-center '>

          <input onChange={handleChange} placeholder="Enter website url" value={form.site} className=' rounded-2xl border border-green-700 w-full px-2' type="text" name="site" />

          <div className='flex justify-center items-center w-full gap-3'>
            <input onChange={handleChange} placeholder='Enter Username' value={form.username} className=' rounded-2xl border border-green-700 w-full px-2' type="text" name="username" />
            <div className="relative">
              <input ref={passwordRef} onChange={handleChange} placeholder="Enter Password" value={form.password} className='rounded-2xl border border-green-700 w-full px-2' type="password" name="password" />
              <span className=' absolute right-[8px] top-[8px] bottom-[1px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} width={15} src='images/eye-open1.png' alt="" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className='flex justify-center items-center gap-1 bg-green-600 hover:bg-green-500  rounded-full px-5 py-2 w-fit border-2 shadow-lg border-green-800'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>
        <div className="passwords">
          <h2 className='font-bold py-4 text-xl'>Your Passwords</h2>
          {passwordArray == 0 && <div>No password to show</div>}
          {passwordArray != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-green-600 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Passsword</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-200'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className=' px-14 text-center  py-2 border border-white gap-2'>
                    <div className='flex items-center justify-between'>
                      <a href={item.site} target='_blank'>{item.site}</a>

                      <div className=' cursor-pointer' onClick={() => copyText(item.site)} >
                        <lord-icon
                          src="https://cdn.lordicon.com/rbbnmpcf.json"
                          trigger="hover"
                        >
                        </lord-icon>
                      </div>
                    </div>
                  </td>

                  <td className='text-center px-14  py-2 border border-white'>
                    <div className='flex items-center justify-between'>{item.username}
                      <div className=' cursor-pointer' onClick={() => copyText(item.username)} >
                        <lord-icon
                          src="https://cdn.lordicon.com/rbbnmpcf.json"
                          trigger="hover"
                        >
                        </lord-icon>
                      </div>
                    </div>
                  </td>

                  <td className='text-center px-14  py-2 border border-white'>
                    <div className='flex items-center justify-between'>
                      {item.password}
                      <div className=' cursor-pointer' onClick={() => copyText(item.password)}  >
                        <lord-icon
                          src="https://cdn.lordicon.com/rbbnmpcf.json"
                          trigger="hover"
                        >
                        </lord-icon>
                      </div>
                    </div>
                  </td>

                  <td className='text-center px-14  py-2 border border-white'>
                    <div className='flex items-center justify-between'>
                      <span className=' cursor-pointer' onClick={() => { editPassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/pflszboa.json"
                          trigger="hover"
                        >
                        </lord-icon>
                      </span>
                      <span className=' cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/wpyrrmcq.json"
                          trigger="hover"
                        >
                        </lord-icon>
                      </span>

                    </div>
                  </td>


                </tr>
              })}

            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager