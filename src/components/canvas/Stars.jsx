import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import styled from "styled-components";

const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  inset: 0;
  pointer-events: none;
  will-change: transform;
  transform: translateZ(0);
`;

const Stars = React.memo((props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    // generate positions and sanitize any NaN values to avoid BufferGeometry errors
    (() => {
      const arr = random.inSphere(new Float32Array(2000), { radius: 1.2 });
      for (let i = 0; i < arr.length; i++) {
        if (!Number.isFinite(arr[i]) || Number.isNaN(arr[i])) arr[i] = 0;
      }
      return arr;
    })()
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
});

const StyledStarsCanvas = () => {
  return (
    <StyledCanvasWrapper>
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: false
        }}
      >
        <Suspense fallback={null}>
          <Stars />
          <ShootingStar intervalMs={6000} />
        </Suspense>
      </Canvas>
    </StyledCanvasWrapper>
  );
};

export default StyledStarsCanvas;

// Simple shooting star that periodically streaks across the sky
const ShootingStar = ({ intervalMs = 8000 }) => {
  const starRef = useRef();
  const [active, setActive] = useState(false);
  // use a ref to keep a mutable state for the animation loop and mirror to React state when needed
  const stateRef = React.useRef({
    position: [-1.4, 0.9, 0],
    velocity: [0.9, -0.6, 0],
    opacity: 0,
    ttl: 0,
  });
  const [, setTick] = React.useState(0); // tiny state to trigger re-renders when necessary

  useEffect(() => {
    let timer;
    const schedule = () => {
      timer = setTimeout(() => {
        // Randomize start near top-left or top-right
        const startLeft = Math.random() < 0.5;
        const startX = startLeft ? -1.4 : 1.4;
        const startY = 0.9 - Math.random() * 0.4; // near top
        // Diagonal velocity with slight variation
        const speed = 1.2 + Math.random() * 0.6;
        const vx = (startLeft ? 1 : -1) * speed;
        const vy = -0.8 * speed;
          const next = {
            position: [startX, startY, 0],
            velocity: [vx, vy, 0],
            opacity: 0.9,
            ttl: 1.4, // seconds on screen
          };
          stateRef.current = next;
          // trigger a render so UI reflects initial star position
          setTick((t) => t + 1);
        setActive(true);
        schedule(); // schedule next run again for continuous streaks
      }, intervalMs);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [intervalMs]);

  useFrame((_, delta) => {
    if (!active || !starRef.current) return;
    // Update position from mutable ref to avoid stale closures
    const s = stateRef.current;
    const [x, y, z] = s.position;
    const [vx, vy, vz] = s.velocity;
    const nx = x + vx * delta;
    const ny = y + vy * delta;
    const nz = z + vz * delta;
    // Fade out
    const nextTTL = s.ttl - delta;
    const nextOpacity = Math.max(0, s.opacity - delta * 0.8);
    const next = {
      position: [nx, ny, nz],
      velocity: [vx, vy, vz],
      opacity: nextOpacity,
      ttl: nextTTL,
    };
    stateRef.current = next;
    // occasional re-render to update any UI/props bound to state
    setTick((t) => t + 1);
    starRef.current.position.set(nx, ny, nz);
    starRef.current.material.opacity = nextOpacity;
    // Deactivate when off-screen or ttl expired
    if (nextTTL <= 0 || Math.abs(nx) > 2 || ny < -1.6) {
      setActive(false);
    }
  });

  // Render a thin streak (box) with additive blending
  const rot = stateRef.current?.velocity && Number.isFinite(stateRef.current.velocity[0]) && Number.isFinite(stateRef.current.velocity[1])
    ? Math.atan2(stateRef.current.velocity[1], stateRef.current.velocity[0])
    : 0;

  return (
    <mesh ref={starRef} position={stateRef.current.position} rotation={[0, 0, rot]}>
      <boxGeometry args={[0.12, 0.004, 0.004]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={stateRef.current.opacity} />
    </mesh>
  );
};
