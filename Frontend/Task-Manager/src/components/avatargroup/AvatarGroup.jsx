import React from 'react'

function AvatarGroup({avatars,maxVisible}) {
  console.log("avatars",avatars)
  return (
    <div className='flex mt-3 h-12 w-24 items-center -space-x-3  '>
      {avatars?.slice(0,maxVisible).map((avatar)=>(
        <img className=' h-8 w-8 rounded-full border-2 border-white ' src={avatar} alt="" /> 
      ))}
    </div>
  )
}

export default AvatarGroup