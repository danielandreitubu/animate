import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Text } from "@react-three/drei";

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "purple"}
      />
    </mesh>
  );
}

export default function App() {
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    getRandomWord();
  }, []);

  const getRandomWord = async () => {
    let content = [];

    for (let i = 0; i <= 100; i++) {
      const result = await fetch("https://random-word-api.herokuapp.com/word");
      const word = await result.json();

      content.push(word[0]);
    }

    setDisplay(content);
  };

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  console.log(display);

  return (
    <div style={{ width: "100%", height: "800px" }}>
      <Canvas>
        {display &&
          display.map((item) => {
            return (
              <Text
                position={[
                  Math.ceil(Math.random() * 99) *
                    (Math.round(Math.random()) ? 1 : -1),
                  Math.ceil(Math.random() * 99) *
                    (Math.round(Math.random()) ? 1 : -1),
                  Math.ceil(Math.random() * 99) *
                    (Math.round(Math.random()) ? 1 : -1),
                ]}
                color={getRandomColor()}
                fontSize={5}
                maxWidth={1000}
                lineHeight={5}
                letterSpacing={0.5}
                textAlign={"center"}
                font={
                  "https://fonts.gstatic.com/s/indieflower/v13/m8JVjfNVeKWVnh3QMuKkFcZG.ttf"
                }
              >
                {item}
              </Text>
            );
          })}
        {}
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
        <pointLight position={[40, 20, 10]} />
        <ambientLight intensity={0.5} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
