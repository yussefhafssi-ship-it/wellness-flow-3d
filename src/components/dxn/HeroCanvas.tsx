import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function FloatingOrb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} emissive={color} emissiveIntensity={0.15} />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#fff8e1" />
      <pointLight position={[-5, -3, -2]} intensity={1} color="#0B5D3B" />
      <FloatingOrb position={[-3, 1.5, 0]} color="#D4AF37" scale={0.6} />
      <FloatingOrb position={[3.5, -0.5, -1]} color="#0B5D3B" scale={0.9} />
      <FloatingOrb position={[2, 2, -2]} color="#D4AF37" scale={0.4} />
      <FloatingOrb position={[-2.5, -1.8, 1]} color="#1a8a5c" scale={0.5} />
      <Sparkles count={80} scale={12} size={3} speed={0.4} color="#D4AF37" />
      <Environment preset="sunset" />
    </Canvas>
  );
}
