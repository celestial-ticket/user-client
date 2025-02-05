import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, Modal, ActivityIndicator } from "react-native";
import { Suspense, useState, useEffect } from "react";
import { Canvas, extend } from "@react-three/fiber";
import useControls from "r3f-native-orbitcontrols";
import { PlaneGeometry, DoubleSide } from "three";
import * as THREE from "three";
import Model from "../../components/SeatModel";
import TextModel from "../../components/TextModel";
import CustomTextModel from "../../components/CustomTextModel";
import AngelModel from "../../components/AngelModel";
extend({ PlaneGeometry });

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

export default function View3D() {
  const params = useLocalSearchParams();
  const { seats } = params;
  console.log("🚀 ~ View3D ~ seats:", seats);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const parsedSeats = Array.isArray(seats)
    ? JSON.parse(seats[0])
    : JSON.parse(seats);
  console.log("🚀 ~ View3D ~ parsedSeats:", parsedSeats[0]);

  const flattenSeats = (arrangedSeats) => {
    const flatSeats = [];

    arrangedSeats.forEach((row: {}) => {
      ["left", "middle", "right"].forEach((section) => {
        row[section].forEach((seat: []) => {
          flatSeats.push(seat);
        });
      });
    });

    return flatSeats;
  };

  const seatStatus = flattenSeats(parsedSeats).reduce(
    (acc: {}, [seat, status]) => {
      acc[seat] = status;
      return acc;
    },
    {},
  );

  const seatCodes = "EDCBA";
  const seatNumbers = {};

  const rows = 5;
  const sections = [
    { columns: 2, xOffset: 0 },
    { columns: 8, xOffset: 5 },
    { columns: 2, xOffset: 19 },
  ];
  const [OrbitControls, events] = useControls();

  const allPositions = sections.flatMap((section) =>
    createRowPositions(rows, section.columns, section.xOffset),
  );
  return (
    <View style={styles.container}>
      {isLoading && (
        <View className="absolute flex items-center justify-center">
          <ActivityIndicator size={100} color="#0000ff" />
        </View>
      )}
      <Text style={styles.text}>3D Cinema Viewer</Text>
      <View style={styles.canvas} {...events}>
        <Canvas
          camera={{
            position: [-14, 15, 8], // Adjust position (x, y, z) to match the cinema angle
            fov: 70, // Set field of view for a wider perspective
            near: 0.1, // Near clipping plane
            far: 50, // Far clipping plane
          }}
          shadows
        >
          {/* <Sky sunPosition={[100, 20, 100]} /> */}
          <ambientLight intensity={0.5} />
          {/* <directionalLight color="red" intensity={2} position={[0, 10, 5]} /> */}
          {/* <directionalLight
            color="white"
            intensity={0.8}
            position={[2, 0, -4]}
          /> */}
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <OrbitControls />
          {!isLoading && (
            <Suspense fallback={null}>
              {/* Cinema Seats */}
              {allPositions.map((pos, index) => {
                const [colIndex, rowIndex] = pos;
                const seatCode = seatCodes[rowIndex / 0.5];
                if (seatNumbers[seatCode] === undefined) {
                  seatNumbers[seatCode] = 1;
                } else {
                  seatNumbers[seatCode]++;
                }
                const seatPosition = `${seatCode}${seatNumbers[seatCode]}`;
                const status = seatStatus[seatPosition] || "Available";

                return (
                  <group key={index} position={pos}>
                    {/* Cinema Seat */}
                    <Model color={status === "booked" ? "blue" : "red"} />
                    {/* Angel Model */}
                    {status === "booked" && (
                      <AngelModel position={[-0.02, 0.8, 0.2]} />
                    )}
                    {/* seat number */}
                    {status !== "booked" && (
                      <CustomTextModel
                        meshProps={{
                          position: [
                            seatNumbers[seatCode] < 10 ? -0.33 : -0.4,
                            0.9,
                            0.4,
                          ],
                          scale: [0.004, 0.004, 0.004],
                          rotation: [-Math.PI / 2, 0, 0],
                        }}
                        text={seatPosition}
                        color={status === "available" ? "white" : "black"}
                      />
                    )}
                  </group>
                );
              })}

              {/* Cinema Screen */}
              <mesh position={[10, 4.8, 7]}>
                <planeGeometry args={[25, 10]} />
                <meshStandardMaterial color="#87CEF3" side={DoubleSide} />
              </mesh>

              {/* Floor */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, -0.2, -2]}>
                <planeGeometry args={[35, 20]} />
                <meshBasicMaterial color="#87CEE3" side={DoubleSide} />
              </mesh>

              {/* Text Spotlight */}
              <TextModel position={[19, 4.5, 6.7]} />
            </Suspense>
          )}
        </Canvas>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB",
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
