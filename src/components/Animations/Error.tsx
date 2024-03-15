import React, { useEffect, useRef } from 'react';
import Lottie, { AnimationConfigWithPath, AnimationItem } from 'lottie-web'; 
import animationData from '../../images/Error.json'; 

function Error() {
  const container = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    let anim: AnimationItem | undefined; 

    if (container.current) {
      anim = Lottie.loadAnimation({
        container: container.current,
        renderer: 'svg', 
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice' 
        }
      } as AnimationConfigWithPath<"svg">); 

      anim.addEventListener('error', (error) => {
        console.error('Lottie Animation Error:', error);
      });
    }

    return () => {
      if (anim) {
        anim.destroy(); 
      }
    };
  }, []);

  return (
    <div 
      ref={container} 
      className='flex justify-center items-center' 
      style={{
        width: '250px',
        position: 'relative', // Ensure positioning context for absolute centering
      }}
    ></div>
  );
}

export default Error;
