import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-900 text-white '>
      <div className="myContainer flex  justify-between items-center px-4 h-12 py-8">
        <div className=' font-bold text-2xl'>
        <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
          
          </div>
        {/* <ul>
            <li className=' gap-3 flex'>
            <a className=' hover:font-bold' href="/">Home</a>
            <a className=' hover:font-bold' href="/">Contact</a>
            <a className=' hover:font-bold' href="/">login</a>
            </li>
        </ul> */}
        <div className='button'>
          <button className='bg-green-700 flex rounded-full justify-between items-center gap-2 '>
            <img  width={30} src="/images/github.png" alt="" className=' invert py-1  '/>
            <span className='px-1 font-bold'>GitHub</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 
