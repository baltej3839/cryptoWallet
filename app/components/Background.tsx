"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CryptoBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf5f5f5, 1, 15);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Crypto-themed colors - darker/more saturated for white background
    const cryptoColors = [
      new THREE.Color("#00cc33"), // Green
      new THREE.Color("#0099ff"), // Blue
      new THREE.Color("#cc00cc"), // Magenta
      new THREE.Color("#ff9900"), // Orange
      new THREE.Color("#ff3366"), // Pink
      new THREE.Color("#6600ff"), // Purple
      new THREE.Color("#00ccaa"), // Teal
    ];

    // Particles (nodes in blockchain network)
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const color = cryptoColors[Math.floor(Math.random() * cryptoColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.08 + 0.02;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.NormalBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);



    // Rotating blockchain cubes
    const cubes: THREE.Mesh[] = [];
    const cubeCount = 8;

    for (let i = 0; i < cubeCount; i++) {
      const size = Math.random() * 0.3 + 0.2;
      const cubeGeometry = new THREE.BoxGeometry(size, size, size);
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: cryptoColors[Math.floor(Math.random() * cryptoColors.length)],
        transparent: true,
        opacity: 0.4,
        wireframe: true,
      });

      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      );
      
      cubes.push(cube);
      scene.add(cube);
    }

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.001;

      // Rotate particle cloud
      particles.rotation.y += 0.0008;
      particles.rotation.x = Math.sin(time * 0.3) * 0.1;

      // Animate cubes
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01 * (i % 2 === 0 ? 1 : -1);
        cube.rotation.y += 0.015 * (i % 2 === 0 ? -1 : 1);
        cube.position.y += Math.sin(time * 2 + i) * 0.003;
      });

      // Pulse particle sizes
      const sizes = particleGeometry.attributes.size.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        sizes[i] = (Math.sin(time * 3 + i * 0.01) * 0.02 + 0.05);
      }
      particleGeometry.attributes.size.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      cubes.forEach(cube => {
        cube.geometry.dispose();
        (cube.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div
        ref={mountRef}
        className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-br from-gray-50 via-white to-gray-100"
      />
      {/* Subtle overlay for depth */}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-b from-white/40 via-transparent to-white/60" />
    </>
  );
}