import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stats, Html } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  // Inner ring (Core)
  { id: 1, name: "Python", icon: "🐍", ring: 1 },
  { id: 2, name: "Machine Learning", icon: "🤖", ring: 1 },
  { id: 3, name: "Data Analysis", icon: "📊", ring: 1 },
  // Middle ring (Strong)
  { id: 4, name: "SQL", icon: "🗄️", ring: 2 },
  { id: 5, name: "Power BI", icon: "📈", ring: 2 },
  { id: 6, name: "JavaScript", icon: "⚡", ring: 2 },
  { id: 7, name: "HTML/CSS", icon: "🎨", ring: 2 },
  // Outer ring (Familiar)
  { id: 8, name: "Excel", icon: "📋", ring: 3 },
  { id: 9, name: "Scikit-learn", icon: "🔬", ring: 3 },
  { id: 10, name: "Pandas", icon: "🐼", ring: 3 },
  { id: 11, name: "NumPy", icon: "🔢", ring: 3 },
];

// Helper to create texture from canvas
const createSkillTexture = (name, icon) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#0f172a'; // slate-900
  ctx.beginPath();
  ctx.roundRect(0, 0, 512, 128, 32);
  ctx.fill();

  // Border
  ctx.strokeStyle = '#00f5d4';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  
  // Add icon and name
  ctx.fillText(`${icon} ${name}`, 50, 64);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const OrbitingCard = ({ skill, angle, radius, speed, isHovered, setHovered }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  
  const texture = useMemo(() => createSkillTexture(skill.name, skill.icon), [skill]);
  const currentAngle = useRef(angle);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    
    // Orbit logic
    if (!isHovered) {
      currentAngle.current += speed * delta;
    }
    
    const x = Math.cos(currentAngle.current) * radius;
    const z = Math.sin(currentAngle.current) * radius;
    // Slight vertical bobbing
    const y = Math.sin(state.clock.elapsedTime * 2 + angle) * 0.2;

    groupRef.current.position.set(x, y, z);
    
    // Always face camera but maybe rotate up on hover
    groupRef.current.lookAt(0, 0, 10);
    
    // Scale on hover
    const targetScale = isHovered ? 1.5 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group ref={groupRef}>
      <mesh 
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(skill.id);
          document.body.style.cursor = 'pointer'; // standard fallback, though we use custom
        }}
        onPointerOut={() => {
          setHovered(null);
          document.body.style.cursor = 'none';
        }}
      >
        <planeGeometry args={[2.5, 0.625]} />
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const Core = () => {
  const coreRef = useRef();
  
  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.2;
      coreRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#00f5d4" wireframe transparent opacity={0.6} />
      {/* Glow effect hack via slightly larger sphere */}
      <mesh scale={1.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#00f5d4" wireframe transparent opacity={0.1} />
      </mesh>
    </mesh>
  );
};

const OrbitSystem = () => {
  const [hoveredId, setHoveredId] = useState(null);
  
  // Distribute skills evenly on rings
  const ring1 = skills.filter(s => s.ring === 1);
  const ring2 = skills.filter(s => s.ring === 2);
  const ring3 = skills.filter(s => s.ring === 3);

  const renderRing = (ringSkills, radius, speedBase) => {
    return ringSkills.map((skill, index) => {
      const angle = (index / ringSkills.length) * Math.PI * 2;
      return (
        <OrbitingCard 
          key={skill.id} 
          skill={skill} 
          angle={angle} 
          radius={radius} 
          speed={speedBase} 
          isHovered={hoveredId === skill.id}
          setHovered={setHoveredId}
        />
      );
    });
  };

  return (
    <group rotation={[0.4, 0, 0]}>
      <Core />
      {/* Core ring */}
      {renderRing(ring1, 2.5, 0.4)}
      {/* Middle ring */}
      {renderRing(ring2, 4.5, -0.2)}
      {/* Outer ring */}
      {renderRing(ring3, 6.5, 0.1)}
    </group>
  );
};

export default function SkillsScene() {
  const isDev = import.meta.env.DEV;
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      {isDev && <Stats className="hidden" />}
      <color attach="background" args={['#050508']} />
      <ambientLight intensity={1} />
      <OrbitSystem />
    </Canvas>
  );
}
