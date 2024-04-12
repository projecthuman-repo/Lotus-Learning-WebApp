import React from 'react'

const OnHoverExtraHud = ({name}) => {

  // To use this component add .hover-parent className on the parent div
  return (
    <div className="hover-children absolute z-[30] border-none top-full left-1/2 transform -translate-x-1/2 bg-stone-700 text-white  py-1 px-3 rounded-full">
        <p className="text-xs text-center">
            {name}
        </p>
    </div>
  )
}

export default OnHoverExtraHud