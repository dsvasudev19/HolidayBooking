import React, { useEffect, useRef } from 'react';
import Lottie, { AnimationConfigWithPath, AnimationItem } from 'lottie-web'; 
import animationData from '../../images/Successful.json'; 

function Success() {
  const container = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    let anim: AnimationItem | undefined; 

    if (container.current) {
      anim = Lottie.loadAnimation({
        container: container.current,
        renderer: 'svg', 
        loop: true,
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
      style={{
        width: '250px',
      }}
    ></div>
  );
}

export default Success;
