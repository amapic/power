
import React, { useEffect, useState, useRef } from "react";
import { useFrame, Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useSpring, animated,config} from "@react-spring/three";

function Cylinder(props) {
  const myref = useRef();

  // useFrame(() => (myref.current.rotation.x = myref.current.rotation.y += 0.01));

  return (
    <mesh {...props} ref={myref}>
      <cylinderBufferGeometry attach="geometry" args={props.cylprops} />
      <meshBasicMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function Box(props) {
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
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={props.boxSize} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
export default function Tank({xFinal,  yFinal }) {
  const ref = useRef<THREE.Mesh>(null!);
  // const [posxfinal, setXFinal] = useState(xFinal);
  const [posx, setX] = useState(0);
  const [posy, setY] = useState(0);
  if (posx==0 && posy==0){
    var yInit=0;
    var xInit=0;
  }else{
    var yInit=posy;
    var xInit=posx;
  }

  var tan = (yFinal - yInit) / (xFinal - xInit);
  var ang = Math.atan(tan);
  console.log((180 * ang) / Math.PI);

  // const [compteur, setC] = useState(0);
  const [{ x,y }] = useSpring(
    () => ({ from: { x: xInit,y:yInit },config: config.wobbly, to: { x: xFinal,y:yFinal },onRest : () => {setX(xFinal);setY(yFinal)}}),
    [xFinal]
  );

  console.log(xFinal);
  console.log(xInit);
  // const contentProps = useSpring({
  //   opacity: x ? 1 : 0,
  //   marginTop: x ? 0 : -500
  // });
  // useFrame((state,delta) => {
  //   // if (typeof ref.current != "undefined")
  //   // return (ref.current.rotation.y += 0.01);

  //   console.log(x);

  //   if (ref.current.position.x <= 50) {
  //     // setC(compteur + 1);
  //     if (
  //       (ref.current.position.x! < xFinal && xFinal - xInit > 0) ||
  //       (ref.current.position.x! > xFinal && xFinal - xInit < 0)
  //     ) {
  //       let difx =
  //         xFinal - xInit > 0
  //           ? 10 / Math.abs(yFinal - yInit)
  //           : -10 / Math.abs(yFinal - yInit);
  //       let dify =
  //         yFinal - yInit > 0
  //           ? 10 / Math.abs(xFinal - xInit)
  //           : -10 / Math.abs(xFinal - xInit);
  //       if (ref.current.rotation.z != -(ang + Math.PI / 2)) {
  //         return (ref.current.rotation.z = -(ang + Math.PI / 2));
  //       }
  //       return [
  //         (ref.current.position.x += difx),
  //         (ref.current.position.y += dify),
  //       ];
  //     }
  //   }
  // });

  return (
    <>
      <animated.mesh
        ref={ref}
        position-x={x}
        position-y={y}
        position-z={0}
        rotation={[0, 0, Math.PI / 2]}
      >
        {/* <group ref={ref} position={[xInit, 0, 0]} rotation={[0, 0, Math.PI / 2]}> */}
        <Cylinder
          cylprops={[2, 10, 7, 6]}
          position={[0, 5, 11]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Cylinder cylprops={[3, 3, 3, 30]} position={[-5, 10, 2]} />
        {/* <Box boxSize={[18, 5, 5]} position={[0, 1, 10]} /> */}
        <Box boxSize={[18, 5, 6]} position={[0, 1, 5]} />
        <Cylinder cylprops={[3, 3, 3, 30]} position={[-5, -1, 2]} />
        <Cylinder cylprops={[3, 3, 3, 30]} position={[5, -1, 2]} />
        {/* </group> */}
      </animated.mesh>
    </>
  );
}