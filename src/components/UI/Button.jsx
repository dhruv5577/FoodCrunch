import React from 'react'

export default function Button({children,textOnly,className,...props}) {

  let cssclass= textOnly? 'text-button' : 'button';
  cssclass+=' '+ className;

  return (
    <button className={cssclass} {...props}>
      {children}
    </button>
  )
}
