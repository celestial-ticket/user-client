import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Node1: THREE.Mesh;
  };
  materials: {
    x1: THREE.MeshStandardMaterial;
  };
};

export default function TextModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    require("../../assets/text-model.glb"),
  ) as GLTFResult;

  // console.log("🚀 ~ TextModel ~ nodes:", nodes);
  // console.log("🚀 ~ TextModel ~ materials:", materials);

  // if (!nodes || !materials) {
  //   console.log("Failed to load GLTF model");
  //   return null;
  // }

  return (
    <group
      {...props}
      dispose={null}
      scale={0.06}
      rotation={[0, -Math.PI / 1, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node1.geometry}
        material={materials.x1}
      />
    </group>
  );
}

useGLTF.preload(require("../../assets/text-model.glb"));
