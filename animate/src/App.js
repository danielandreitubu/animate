import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Text } from "@react-three/drei";
import { Color } from "three";

function Box(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial attach="material" color={props.color} />
    </mesh>
  );
}

export default function App() {
  const [display, setDisplay] = useState([]);
  const [boxData, setBoxData] = useState({ positions: [], colors: [] });
  const [textPositions, setTextPositions] = useState([]);

  useEffect(() => {
    getRandomWord();
    generateBoxData();
    generateTextPositions();
  }, []);

  const getRandomWord = async () => {
    try {
      const numWords = 100;
      const fetchPromises = [];

      for (let i = 0; i < numWords; i++) {
        fetchPromises.push(fetch("https://random-word-api.herokuapp.com/word").then(response => response.json()));
      }

      const words = await Promise.all(fetchPromises);
      setDisplay(words);
    } catch (error) {
      console.error("Error fetching random words:", error);
    }
  };

  const generateBoxData = () => {
    const numBoxes = 2000;
    const boxPositions = [];
    const boxColors = [];

    for (let i = 0; i < numBoxes; i++) {
      const x = (Math.random() * 200 - 100) * 2; // Wider spacing (-40 to 40)
      const y = (Math.random() * 200 - 100) * 2; // Wider spacing (-40 to 40)
      const z = (Math.random() * 200 - 100) * 2; // Wider spacing (-40 to 40)
      const color = new Color(Math.random(), Math.random(), Math.random());

      boxPositions.push([x, y, z]);
      boxColors.push(color);
    }

    setBoxData({ positions: boxPositions, colors: boxColors });
  };

  const generateTextPositions = () => {
    const numWords = 1000;
    const positions = [];

    for (let i = 0; i < numWords; i++) {
      const x = (Math.random() * 60 - 30) * 2; // Wider spacing (-40 to 40)
      const y = (Math.random() * 60 - 30) * 2; // Wider spacing (-40 to 40)
      const z = (Math.random() * 60 - 30) * 2; // Wider spacing (-40 to 40)
      
      positions.push([x, y, z]);
    }

    setTextPositions(positions);
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "black" }}>
      <Canvas>
        {boxData.positions.map((position, index) => (
          <Box key={index} position={position} color={boxData.colors[index]} />
        ))}

        {display.map((item, index) => (
          <Text
            key={index}
            position={textPositions[index]}
            color={new Color(Math.random(), Math.random(), Math.random())}
            fontSize={1}
            maxWidth={1000}
            lineHeight={1}
            letterSpacing={0.1}
            textAlign="center"
            font="https://fonts.gstatic.com/s/indieflower/v13/m8JVjfNVeKWVnh3QMuKkFcZG.ttf"
          >
            {item}
          </Text>
        ))}
 
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
        <pointLight position={[40, 20, 10]} />
        <ambientLight intensity={0.5} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
