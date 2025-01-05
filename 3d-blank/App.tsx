import React, { Suspense } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import useControls from "r3f-native-orbitcontrols";
import Model from "./components/Model";
import { PlaneGeometry, DoubleSide } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import TextModel from "./components/TextModel";
import myFont from "./assets/fonts/Roboto Condensed_Regular.json";

extend({ PlaneGeometry, TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}
const createRowPositions = (rows: number, columns: number, xOffset: number) => {
  const positions: [number, number, number][] = [];
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      positions.push([
        colIndex * 1.5 + xOffset - 2, // X-axis offset
        rowIndex * 0.5, // Y-axis elevation
        rowIndex * -2 - 2.3, // Z-axis row spacing
      ]);
    }
  }
  return positions;
};

export default function App() {
  // const font = useLoader(FontLoader, require("./assets/fonts/lobster.json"));
  const font = new FontLoader().parse(myFont);
  const rows = 5;
  const sections = [
    { columns: 2, xOffset: 0 },
    { columns: 8, xOffset: 5 },
    { columns: 2, xOffset: 19 },
  ];

  const allPositions = sections.flatMap((section) =>
    createRowPositions(rows, section.columns, section.xOffset)
  );

  //seat code
  const seatCodes = "ABCDEF";
  const seatNumbers = {};
  const [OrbitControls, events] = useControls();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>3D Cinema Viewer</Text>
      <View style={styles.canvas} {...events}>
        <Canvas
          camera={{
            position: [-14, 15, 8], // Adjust position (x, y, z) to match the cinema angle
            fov: 70, // Set field of view for a wider perspective
            near: 0.1, // Near clipping plane
            far: 50, // Far clipping plane
          }}
        >
          <OrbitControls />

          <ambientLight intensity={0.5} />
          <directionalLight color="red" intensity={4} position={[0, 10, 5]} />
          <directionalLight color="white" intensity={1} position={[2, 0, -4]} />

          <Suspense fallback={<Text>Loading model...</Text>}>
            {/* Cinema Seats */}
            {allPositions.map((pos, index) => {
              const [colIndex, rowIndex] = pos;
              const seatCode = seatCodes[rowIndex / 0.5];
              //use object to store current seat number, increment when changing seat in same row
              if (seatNumbers[seatCode] === undefined) {
                seatNumbers[seatCode] = 1;
              } else {
                seatNumbers[seatCode]++;
              }
              // console.log(seatNumbers);

              return (
                <group key={index} position={pos}>
                  <Model />
                  {/* seat number */}
                  <mesh
                    position={[
                      seatNumbers[seatCode] < 10 ? -0.33 : -0.4,
                      0.9,
                      0.4,
                    ]}
                    scale={0.004}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <textGeometry
                      args={[`${seatCode}${seatNumbers[seatCode]}`, { font }]}
                    />
                    <meshLambertMaterial attach="material" color={"white"} />
                  </mesh>
                </group>
              );
            })}

            {/* Cinema Screen */}
            <mesh position={[10, 5, 7]}>
              <planeGeometry args={[25, 10]} />
              <meshStandardMaterial color="white" side={DoubleSide} />
            </mesh>
            <TextModel position={[19, 4.5, 7]} />

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0, -2]}>
              <planeGeometry args={[35, 20]} />
              <meshBasicMaterial color="#3d3d3d" />
            </mesh>

            {/* Text Spotlight */}
          </Suspense>
        </Canvas>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  canvas: {
    width: "100%",
    height: "80%",
  },
});
