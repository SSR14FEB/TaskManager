import React from 'react'

function InfoCard({icon, label, value, color}) {
  return (
    <div className='flex items-center gap-3'>
        <div className={`w-2 md:w-2 h-3 md:h-3 ${color} rounded-full`}></div>
            <p className='text-xs md:text-[14px] text-gray-500'>
                <span className='text-xs md:text-[14px] text-black font-semibold'>{value}</span>  {label}
            </p>
    </div>
  )
}

export default InfoCard
