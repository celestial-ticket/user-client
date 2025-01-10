import * as THREE from "three";
import React, { useMemo } from "react";
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

  const optimizedMaterial = useMemo(() => {
    const mat = materials.x1.clone();
    mat.roughness = 0.8; // Reduce reflections
    mat.metalness = 0.5; // Simplify lighting response
    return mat;
  }, [materials]);

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
        material={optimizedMaterial}
      />
    </group>
  );
}

useGLTF.preload(require("../../assets/text-model.glb"));
