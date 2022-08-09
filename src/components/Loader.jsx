import React, { useEffect, useRef} from 'react'

function Loader() {
    const animateRef= useRef()

    const refCallback= ()=>{
        animateRef.current!==undefined&&animateRef.current.animate(keyframes, timingOptions)
    }

    useEffect(
        ()=>{
            refCallback()
        },[animateRef]
    )

    const keyframes = 
        [
            {
                transform: 'scale(0.15)',
                opacity: 0,
            },
            {
                opacity: 1,
            },
            {
                transform: 'scale(1)',
                opacity: 0,
            }
        ]
    
    const timingOptions = 
        {
            duration: 850,
            iterations: Infinity,
            animationTimingFunction: 'linear'
        }
    
    const styles={
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        background: "rgb(225, 125, 141)",
    }
    
  return (
    <div style={styles} ref={animateRef} />
  )
}

export default Loader