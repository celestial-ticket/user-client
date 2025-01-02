import React, { Suspense } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Canvas } from "@react-three/fiber";
import useControls from "r3f-native-orbitcontrols";
import Model from "./components/Model";

const createRowPositions = (rows: number, columns: number, xOffset: number) => {
  const positions: [number, number, number][] = [];
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      positions.push([
        colIndex * 1.5 + xOffset, // X-axis offset
        rowIndex * 0.5, // Y-axis elevation
        rowIndex * -2, // Z-axis row spacing
      ]);
    }
  }
  return positions;
};

export default function App() {
  const rows = 5;
  const sections = [
    { columns: 5, xOffset: 0 },
    { columns: 8, xOffset: 10 },
    { columns: 2, xOffset: 24 },
  ];

  const allPositions = sections.flatMap((section) =>
    createRowPositions(rows, section.columns, section.xOffset)
  );
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
          <directionalLight color="red" intensity={3} position={[10, 10, 5]} />

          {/* <spotLight
            position={[10, 20, 10]}
            angle={0.3}
            intensity={1}
            color={"red"}
          /> */}
          <Suspense fallback={<Text>Loading model...</Text>}>
            {allPositions.map((pos, index) => (
              <Model key={index} position={pos} />
            ))}
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
