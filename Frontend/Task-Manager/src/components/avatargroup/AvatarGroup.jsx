import React from 'react'

function AvatarGroup({avatars,maxVisible}) {
  console.log("avatars",avatars)
  return (
    <div className='flex mt-3 items-center gap-3 '>
      {avatars?.slice(0,maxVisible).map((avatar)=>(
        <img className=' h-8 w-8 rounded-full' src={avatar} alt="" /> 
      ))}
    </div>
  )
}

export default AvatarGroup