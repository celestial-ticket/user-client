import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import myFont from "../../assets/fonts/Roboto Condensed_Regular.json";
import { MeshProps } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { extend, Object3DNode } from "@react-three/fiber";
import { useMemo } from "react";

extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}
interface CustomTextProps {
  meshProps: MeshProps;
  text: string;
  color: string;
}

export default function CustomTextModel({
  meshProps,
  text,
  color,
}: CustomTextProps) {
  const font = useMemo(() => {
    try {
      return new FontLoader().parse(myFont as any);
    } catch (error) {
      console.error("Error loading font:", error);
      return null;
    }
  }, []);

  return (
    <mesh {...meshProps}>
      <textGeometry args={[text, { font }]} />{" "}
      <meshLambertMaterial attach="material" color={color} />
    </mesh>
  );
}
