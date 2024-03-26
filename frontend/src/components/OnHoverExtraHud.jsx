import React from 'react'

const OnHoverExtraHud = ({name}) => {
  return (
    <div className="hover-children absolute top-full left-1/2 transform -translate-x-1/2 bg-stone-700 text-white border p-1 rounded-md">
        <p className="text-xs">
            {name}
        </p>
    </div>
  )
}

export default OnHoverExtraHud