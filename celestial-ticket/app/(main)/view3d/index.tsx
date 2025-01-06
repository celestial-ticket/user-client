import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, Modal } from "react-native";
import { Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import useControls from "r3f-native-orbitcontrols";
import { PlaneGeometry, DoubleSide } from "three";
import Model from "../../components/Model";
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
    {}
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
    createRowPositions(rows, section.columns, section.xOffset)
  );
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
          shadows
        >
          <OrbitControls />
          <ambientLight intensity={0.3} />
          <directionalLight color="red" intensity={2} position={[0, 10, 5]} />
          <directionalLight
            color="white"
            intensity={0.8}
            position={[2, 0, -4]}
          />

          <Suspense
            fallback={
              <CustomTextModel
                meshProps={{
                  position: [0, 0, 0],
                  scale: [0.1, 0.1, 0.1],
                  rotation: [0, 0, 0],
                }}
                text="Loading..."
                color="white"
              />
            }
          >
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
                  <Model />
                  {/* Angel Model */}
                  {status === "Booked" && (
                    <AngelModel position={[-0.02, 0.8, 0.2]} />
                  )}
                  {/* seat number */}
                  {status !== "Booked" && (
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
                      color={"white"}
                    />
                  )}
                </group>
              );
            })}

            {/* Cinema Screen */}
            <mesh position={[10, 5, 7]}>
              <planeGeometry args={[25, 10]} />
              <meshStandardMaterial color="white" side={DoubleSide} />
            </mesh>

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0, -2]}>
              <planeGeometry args={[35, 20]} />
              <meshBasicMaterial color="#3d3d3d" />
            </mesh>

            {/* Text Spotlight */}
            <TextModel position={[19, 4.5, 6.7]} />
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
