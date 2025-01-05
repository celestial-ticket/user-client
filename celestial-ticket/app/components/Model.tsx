import * as THREE from "three";
import React, { useEffect, useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
// import CustomTextModel from "./CustomTextModel";

type GLTFResult = GLTF & {
  nodes: {
    Node1: THREE.Mesh;
    Node2: THREE.Mesh;
    Node3: THREE.Mesh;
    Node4: THREE.Mesh;
    Node5: THREE.Mesh;
  };
  materials: {
    x1: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    require("../../assets/model.glb")
  ) as GLTFResult;

  // console.log("nodes:", nodes);
  // console.log("materials:", materials);

  if (!nodes || !materials) {
    console.log("Failed to load GLTF model");
    return null;
  }

  /**
   * Optimize materials and geometry
   * 1. `material.clone()` avoids sharing the same material across instances.
   * 2. `useMemo` ensures expensive calculations like material modification are reused.
   */
  const optimizedMaterial = useMemo(() => {
    const mat = materials.x1.clone();
    mat.roughness = 0.8; // Reduce reflections
    mat.metalness = 0.1; // Simplify lighting response
    mat.color.set("gray"); // Use a simpler base color
    return mat;
  }, [materials]);

  const geometryList = useMemo(
    () => [
      nodes.Node1.geometry,
      nodes.Node2.geometry,
      nodes.Node3.geometry,
      nodes.Node4.geometry,
      nodes.Node5.geometry,
    ],
    [nodes]
  );

  return (
    <group {...props} dispose={null} scale={2}>
      {geometryList.map((geometry, index) => (
        <mesh
          key={index}
          geometry={geometry}
          material={optimizedMaterial}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
}

useGLTF.preload(require("../../assets/model.glb"));
