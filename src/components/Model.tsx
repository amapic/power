import React, { useEffect, useState, useRef } from "react";
import { useFrame, Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { Object3D } from "three/src/core/Object3D"; //Object3D types
import { AnimationClip } from "three/src/animation/AnimationClip"; //Animation types
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { CameraControls } from "./CameraControls";
import { useSpring, animated,config} from "@react-spring/three";
import Tank from "./Tank";

interface group {
  current: {
    rotation: {
      x: number;
      y: number;
    };
  };
}

interface actions {
  current: {
    idle: {
      play: () => void;
    };
  };
}



function Map(props) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const colorMap = useLoader(TextureLoader, "map.jpg");

  // const {boxSize, ...secondObject} = props
  // console.log(props.boxSize);
  return (
    <mesh
      {...props}
      ref={ref}
      // onClick={(event) => click(!clicked)}
      // onPointerOver={(event) => hover(true)}
      // onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[200, 200, 0]} />
      {/* <meshStandardMaterial color={hovered ? "hotpink" : "orange"} /> */}
      <meshBasicMaterial map={colorMap} />
    </mesh>
  );
}

// function Tank({xFinal,  yFinal }) {
//   const ref = useRef<THREE.Mesh>(null!);
//   // const [posxfinal, setXFinal] = useState(xFinal);
//   const [posx, setX] = useState(0);
//   const [posy, setY] = useState(0);
//   if (posx==0 && posy==0){
//     var yInit=0;
//     var xInit=0;
//   }else{
//     var yInit=posy;
//     var xInit=posx;
//   }

//   var tan = (yFinal - yInit) / (xFinal - xInit);
//   var ang = Math.atan(tan);
//   console.log((180 * ang) / Math.PI);

//   // const [compteur, setC] = useState(0);
//   const [{ x,y }] = useSpring(
//     () => ({ from: { x: xInit,y:yInit },config: config.wobbly, to: { x: xFinal,y:yFinal },onRest : () => {setX(xFinal);setY(yFinal)}}),
//     [xFinal]
//   );

//   console.log(xFinal);
//   console.log(xInit);
//   // const contentProps = useSpring({
//   //   opacity: x ? 1 : 0,
//   //   marginTop: x ? 0 : -500
//   // });
//   // useFrame((state,delta) => {
//   //   // if (typeof ref.current != "undefined")
//   //   // return (ref.current.rotation.y += 0.01);

//   //   console.log(x);

//   //   if (ref.current.position.x <= 50) {
//   //     // setC(compteur + 1);
//   //     if (
//   //       (ref.current.position.x! < xFinal && xFinal - xInit > 0) ||
//   //       (ref.current.position.x! > xFinal && xFinal - xInit < 0)
//   //     ) {
//   //       let difx =
//   //         xFinal - xInit > 0
//   //           ? 10 / Math.abs(yFinal - yInit)
//   //           : -10 / Math.abs(yFinal - yInit);
//   //       let dify =
//   //         yFinal - yInit > 0
//   //           ? 10 / Math.abs(xFinal - xInit)
//   //           : -10 / Math.abs(xFinal - xInit);
//   //       if (ref.current.rotation.z != -(ang + Math.PI / 2)) {
//   //         return (ref.current.rotation.z = -(ang + Math.PI / 2));
//   //       }
//   //       return [
//   //         (ref.current.position.x += difx),
//   //         (ref.current.position.y += dify),
//   //       ];
//   //     }
//   //   }
//   // });

//   return (
//     <>
//       <animated.mesh
//         ref={ref}
//         position-x={x}
//         position-y={y}
//         position-z={0}
//         rotation={[0, 0, Math.PI / 2]}
//       >
//         {/* <group ref={ref} position={[xInit, 0, 0]} rotation={[0, 0, Math.PI / 2]}> */}
//         <Cylinder
//           cylprops={[2, 10, 7, 6]}
//           position={[0, 5, 11]}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <Cylinder cylprops={[3, 3, 3, 30]} position={[-5, 10, 2]} />
//         {/* <Box boxSize={[18, 5, 5]} position={[0, 1, 10]} /> */}
//         <Box boxSize={[18, 5, 6]} position={[0, 1, 5]} />
//         <Cylinder cylprops={[3, 3, 3, 30]} position={[-5, -1, 2]} />
//         <Cylinder cylprops={[3, 3, 3, 30]} position={[5, -1, 2]} />
//         {/* </group> */}
//       </animated.mesh>
//     </>
//   );
// }

function Proutos(): JSX.Element {
  const [posCar, setPoseCar] = useState([50, 50]);
  
  function move() {
    setPoseCar([-50, -50]);
  }
  console.log(posCar);
  return (
    <>
      <div style={{ width: "100%", height: "800px" }}>
        <Canvas camera={{ fov: 45, position: [0, 0, 200] }}>
          <primitive position={[0, 0, 10]} object={new THREE.AxesHelper(40)} />

          <CameraControls />
          <Map />
          <Tank  yFinal={posCar[1]} xFinal={posCar[0]} />
          {/* <Tank /> */}
        </Canvas>
      </div>
      <button onClick={move}>AAAA</button>
      {/* <Model/> */}
    </>
  );
}

function Proutoss(): JSX.Element {
  return (
    <div style={{ width: "100%", height: "800px" }}>
      <Canvas>
        <Map />
        <CameraControls />
      </Canvas>
    </div>
  );
}
export default Proutos;
