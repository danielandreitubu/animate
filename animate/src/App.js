import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Text } from '@react-three/drei'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '1450px', height: '800px' }} camera={{ position: [1, 1, 5], fov: 80 }}>
      
    <Canvas>
    <Text
    position={[0, 12, 0]}
        color="red"
        fontSize={2}
        maxWidth={1000}
        lineHeight={5}
        letterSpacing={0.5}
        textAlign={'center'}
        font={'https://fonts.gstatic.com/s/indieflower/v13/m8JVjfNVeKWVnh3QMuKkFcZG.ttf'}
      >
        Ciao mondo!

      </Text>
      <Text
    position={[2, -10, 2]}
        color="blue"
        fontSize={2}
        maxWidth={5000}
        lineHeight={5}
        letterSpacing={0.5}
        textAlign={'center'}
        font={'https://fonts.gstatic.com/s/indieflower/v13/m8JVjfNVeKWVnh3QMuKkFcZG.ttf'}
      >
Moni Dziko Lapansi!
      </Text>
      <Text
    position={[20, -0, 6]}
        color="green"
        fontSize={2}
        maxWidth={5000}
        lineHeight={5}
        letterSpacing={0.5}
        textAlign={'center'}
        font={'https://fonts.gstatic.com/s/indieflower/v13/m8JVjfNVeKWVnh3QMuKkFcZG.ttf'}
      >
Pozdrav svijete!
      </Text>

     <Text
    position={[-20, -0, 20]}
        color="gray"
        fontSize={2}
        maxWidth={5000}
        lineHeight={5}
        letterSpacing={0.5}
        textAlign={'center'}
        font={'https://fonts.gstatic.com/s/indieflower/v13/m8JVjfNVeKWVnh3QMuKkFcZG.ttf'}
      >
Kumusta, Daigdig!
      </Text> 
      <Text
    position={[2, -6, 2]}
        color="yellow"
        fontSize={2}
        maxWidth={5000}
        lineHeight={5}
        letterSpacing={0.5}
        textAlign={'center'}
        font={'https://fonts.gstatic.com/s/indieflower/v13/m8JVjfNVeKWVnh3QMuKkFcZG.ttf'}
      >
Hallo Welt!
      </Text>
    <Text
    position={[0, 8, 0]}
        color="cyan"
        fontSize={2}
        maxWidth={5000}
        lineHeight={5}
        letterSpacing={0.5}
        textAlign={'center'}
        font={'https://fonts.gstatic.com/s/indieflower/v13/m8JVjfNVeKWVnh3QMuKkFcZG.ttf'}
      >
Bonjour monde!
      </Text>
    <Text
    position={[0, 4, 0]}
        color="purple"
        fontSize={2}
        maxWidth={1000}
        lineHeight={5}
        letterSpacing={0.5}
        textAlign={'center'}
        font={'https://fonts.gstatic.com/s/indieflower/v13/m8JVjfNVeKWVnh3QMuKkFcZG.ttf'}
      >
 HELLO, WORLD! 
      </Text>
     
      <ambientLight intensity={0.5} />
      <spotLight position={[30, 30, 30]} angle={0.15} penumbra={1} />
      <pointLight position={[40, 20, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls  />
    </Canvas>
</div>
  )
}
