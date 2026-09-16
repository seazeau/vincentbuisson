"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Floating3DMedalProps {
  className?: string;
}

export default function Floating3DMedal({ className = "" }: Floating3DMedalProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 260;
    const height = currentMount.clientHeight || 260;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    currentMount.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0d0, 3.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4ff00, 2.5); // Volt specular accent
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Master Group for rotation & physics
    const medalGroup = new THREE.Group();
    scene.add(medalGroup);

    // PBR Metallic Gold Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5be38,
      metalness: 0.92,
      roughness: 0.18,
    });

    const darkGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xb8860b,
      metalness: 0.88,
      roughness: 0.3,
    });

    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x181816,
      roughness: 0.85,
    });

    const voltAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4ff00,
      emissive: 0xd4ff00,
      emissiveIntensity: 0.3,
      roughness: 0.4,
    });

    // 1. Medal Outer Coin (Cylinder with bevel)
    const coinGeom = new THREE.CylinderGeometry(1.25, 1.25, 0.14, 64);
    const coin = new THREE.Mesh(coinGeom, goldMaterial);
    coin.rotation.x = Math.PI / 2;
    medalGroup.add(coin);

    // 2. Outer Rim Ring
    const rimGeom = new THREE.TorusGeometry(1.22, 0.06, 24, 64);
    const rim = new THREE.Mesh(rimGeom, darkGoldMaterial);
    medalGroup.add(rim);

    // 3. Inner Concentric Groove
    const innerGrooveGeom = new THREE.TorusGeometry(0.95, 0.04, 20, 64);
    const innerGroove = new THREE.Mesh(innerGrooveGeom, voltAccentMaterial);
    innerGroove.position.z = 0.04;
    medalGroup.add(innerGroove);

    // 4. Center Star / Emblem
    const starShape = new THREE.Shape();
    const points = 8;
    const outerR = 0.45;
    const innerR = 0.22;
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i / (points * 2)) * Math.PI * 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const starExtrude = new THREE.ExtrudeGeometry(starShape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    const starMesh = new THREE.Mesh(starExtrude, goldMaterial);
    starMesh.position.z = 0.02;
    medalGroup.add(starMesh);

    // 5. Medal Top Loop / Ring
    const loopGeom = new THREE.TorusGeometry(0.22, 0.05, 16, 32);
    const loopMesh = new THREE.Mesh(loopGeom, goldMaterial);
    loopMesh.position.set(0, 1.35, 0);
    medalGroup.add(loopMesh);

    // 6. Hanging Technical Ribbon
    const ribbonGeom = new THREE.BoxGeometry(0.42, 1.1, 0.03);
    const ribbonMesh = new THREE.Mesh(ribbonGeom, ribbonMaterial);
    ribbonMesh.position.set(0, 1.9, -0.02);
    ribbonMesh.rotation.z = 0.05;
    medalGroup.add(ribbonMesh);

    // Ribbon Volt Stripe
    const stripeGeom = new THREE.BoxGeometry(0.08, 1.12, 0.04);
    const stripeMesh = new THREE.Mesh(stripeGeom, voltAccentMaterial);
    stripeMesh.position.set(0, 1.9, -0.015);
    stripeMesh.rotation.z = 0.05;
    medalGroup.add(stripeMesh);

    // Tilt medal forward slightly
    medalGroup.rotation.x = 0.25;

    // Mouse Interaction & Drag State
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0.35;
    let targetRotationX = 0.25;
    let velocityY = 0;
    let velocityX = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        // Subtle tilt towards cursor when hovering
        const rect = currentMount.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = normX * 0.6;
        targetRotationX = 0.25 + normY * 0.4;
        return;
      }

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      velocityY = deltaX * 0.012;
      velocityX = deltaY * 0.012;

      targetRotationY += velocityY;
      targetRotationX += velocityX;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    currentMount.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      velocityY = deltaX * 0.015;
      velocityX = deltaY * 0.015;

      targetRotationY += velocityY;
      targetRotationX += velocityX;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    currentMount.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Pause when off-screen to preserve resources
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(currentMount);

    // Render loop with physics & pendular floating
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Natural pendulum idle floating
      if (!isDragging) {
        targetRotationY += 0.008; // Continuous slow spin
        velocityY *= 0.94; // Inertia damping
        velocityX *= 0.94;
        targetRotationY += velocityY;
        targetRotationX += velocityX;
      }

      medalGroup.position.y = Math.sin(elapsedTime * 2.2) * 0.08;
      medalGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.05;

      // Smooth lerp rotation
      medalGroup.rotation.y += (targetRotationY - medalGroup.rotation.y) * 0.08;
      medalGroup.rotation.x += (targetRotationX - medalGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      currentMount.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      currentMount.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={mountRef} className="w-full h-full" />
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[9px] font-mono-tech uppercase tracking-wider text-neutral-300 pointer-events-none transition-opacity duration-300 backdrop-blur-md ${
          isHovered ? "opacity-100" : "opacity-40"
        }`}
      >
        <span>Faire pivoter en 3D</span>
      </div>
    </div>
  );
}
