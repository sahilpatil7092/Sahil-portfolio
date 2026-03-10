import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import * as THREE from 'three';

// Convert Lat/Lon to 3D Cartesian coordinates on a sphere
const latLongToVector3 = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

// Key tech hubs
const cities = [
  { name: "Pune", lat: 18.5204, lon: 73.8567, highlight: true },
  { name: "San Francisco", lat: 37.7749, lon: -122.4194, highlight: false },
  { name: "London", lat: 51.5074, lon: -0.1278, highlight: false },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, highlight: false },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946, highlight: false },
  { name: "New York", lat: 40.7128, lon: -74.0060, highlight: false },
  { name: "Singapore", lat: 1.3521, lon: 103.8198, highlight: false },
];

const GlobeWireframe = () => {
  const globeRef = useRef();
  
  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
      // Slight tilt
      globeRef.current.rotation.x = 0.2;
      globeRef.current.rotation.z = 0.1;
    }
  });

  const radius = 2.5;

  const points = useMemo(() => {
    return cities.map(city => latLongToVector3(city.lat, city.lon, radius + 0.05));
  }, [radius]);

  return (
    <group ref={globeRef}>
      {/* Dark core */}
      <mesh>
        <sphereGeometry args={[radius * 0.98, 32, 32]} />
        <meshBasicMaterial color="#020204" />
      </mesh>
      
      {/* Glowing wireframe outer */}
      <mesh>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial 
          color="#1e293b" 
          wireframe 
          transparent 
          opacity={0.4} 
        />
      </mesh>

      {/* Nodes mapping */}
      {cities.map((city, i) => (
        <mesh key={i} position={points[i]}>
          <sphereGeometry args={[city.highlight ? 0.08 : 0.04, 16, 16]} />
          <meshBasicMaterial 
            color={city.highlight ? "#f59e0b" : "#00f5d4"} 
            toneMapped={false}
          />
          {/* Node glow */}
          <mesh scale={2.5}>
            <sphereGeometry args={[city.highlight ? 0.08 : 0.04, 16, 16]} />
            <meshBasicMaterial 
              color={city.highlight ? "#f59e0b" : "#00f5d4"} 
              transparent 
              opacity={0.3} 
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </mesh>
      ))}
      
      {/* Arching connecting line from Pune to some other nodes to simulate network */}
      <LineArc 
        start={latLongToVector3(18.5204, 73.8567, radius)} 
        end={latLongToVector3(37.7749, -122.4194, radius)} 
      />
      <LineArc 
        start={latLongToVector3(18.5204, 73.8567, radius)} 
        end={latLongToVector3(51.5074, -0.1278, radius)} 
      />
      <LineArc 
        start={latLongToVector3(18.5204, 73.8567, radius)} 
        end={latLongToVector3(35.6762, 139.6503, radius)} 
      />
    </group>
  );
};

const LineArc = ({ start, end }) => {
  const lineGeom = useMemo(() => {
    // Basic cubic bezier control points calculation for a sphere arc
    const startVec = start.clone();
    const endVec = end.clone();
    
    // Midpoint
    const mid = startVec.clone().lerp(endVec, 0.5);
    // Push midpoint out
    mid.normalize().multiplyScalar(startVec.length() * 1.3);

    const curve = new THREE.QuadraticBezierCurve3(startVec, mid, endVec);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [start, end]);

  return (
    <line geometry={lineGeom}>
      <lineBasicMaterial color="#00f5d4" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
    </line>
  );
};

export default function GlobeScene() {
  const isDev = import.meta.env.DEV;
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      {isDev && <Stats className="hidden" />}
      <color attach="background" args={['#050508']} />
      <GlobeWireframe />
    </Canvas>
  );
}
