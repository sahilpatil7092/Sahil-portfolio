import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const NeuralNetwork = () => {
  const nodesRef = useRef();
  const linesRef = useRef();
  
  const layerCount = 5;
  const nodesPerLayer = 30;
  const totalNodes = layerCount * nodesPerLayer;

  // Generate node positions
  const { positions, layers, lineGeom } = useMemo(() => {
    const pos = new Float32Array(totalNodes * 3);
    const lays = [];
    
    let index = 0;
    const layerSpacing = 3;
    const spread = 6;
    
    for (let l = 0; l < layerCount; l++) {
      lays[l] = [];
      const x = (l - layerCount / 2 + 0.5) * layerSpacing;
      
      for (let n = 0; n < nodesPerLayer; n++) {
        const y = (Math.random() - 0.5) * spread;
        const z = (Math.random() - 0.5) * spread * 0.5;
        
        pos[index * 3] = x + (Math.random() - 0.5) * 0.5; // slight x jitter
        pos[index * 3 + 1] = y;
        pos[index * 3 + 2] = z;
        
        lays[l].push(index);
        index++;
      }
    }

    // Generate connections between adjacent layers
    const lineIndices = [];
    for (let l = 0; l < layerCount - 1; l++) {
      const currentLayer = lays[l];
      const nextLayer = lays[l + 1];
      
      currentLayer.forEach(nodeA => {
        // Connect each node to 3-5 random nodes in the next layer
        const connections = 3 + Math.floor(Math.random() * 3);
        const shuffledNext = [...nextLayer].sort(() => 0.5 - Math.random());
        
        for (let c = 0; c < connections; c++) {
          lineIndices.push(nodeA, shuffledNext[c]);
        }
      });
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geom.setIndex(lineIndices);

    return { positions: pos, layers: lays, lineGeom: geom };
  }, []);

  // Update instanced mesh
  useEffect(() => {
    if (!nodesRef.current) return;
    const mesh = nodesRef.current;
    
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const cyan = new THREE.Color('#00f5d4');
    const dark = new THREE.Color('#1e293b');

    // Initialize positions and colors
    for (let i = 0; i < totalNodes; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, dark);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;

    // GSAP Timeline for sequential firing
    const tl = gsap.timeline({ repeat: -1 });
    
    // Custom dummy object to animate layer highlights
    const animState = { highlightLayer: -1 };
    
    tl.to(animState, {
      highlightLayer: layerCount,
      duration: 3,
      ease: "none",
      onUpdate: () => {
        const currentL = Math.floor(animState.highlightLayer);
        // Fade logic
        for (let l = 0; l < layerCount; l++) {
          const dist = Math.abs(currentL - l);
          const intensity = Math.max(0, 1 - dist * 0.8);
          
          layers[l].forEach(idx => {
            color.copy(dark).lerp(cyan, intensity);
            mesh.setColorAt(idx, color);
          });
        }
        mesh.instanceColor.needsUpdate = true;
        
        // Also update line material opacity based on the forward pass
        if (linesRef.current) {
           // We can't color individual line segments easily with basic material, 
           // but we can pulse the global opacity slightly
           linesRef.current.material.opacity = 0.15 + Math.sin(animState.highlightLayer * Math.PI) * 0.15;
        }
      }
    });

    return () => tl.kill();
  }, [positions, layers, layerCount, totalNodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (nodesRef.current) {
      nodesRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
      nodesRef.current.rotation.x = Math.cos(t * 0.15) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
      linesRef.current.rotation.x = Math.cos(t * 0.15) * 0.1;
    }
  });

  return (
    <group>
      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <instancedMesh ref={nodesRef} args={[null, null, totalNodes]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
};

export default function HeroScene() {
  const isDev = import.meta.env.DEV;
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      {isDev && <Stats className="hidden" />}
      <color attach="background" args={['#050508']} />
      <fog attach="fog" args={['#050508', 5, 15]} />
      <NeuralNetwork />
    </Canvas>
  );
}
