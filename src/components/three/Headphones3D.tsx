'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Headphones3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(300, 300);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create headphones geometry
    const headband = new THREE.TorusGeometry(0.8, 0.1, 16, 100, Math.PI);
    const headbandMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      shininess: 100
    });
    const headbandMesh = new THREE.Mesh(headband, headbandMaterial);
    headbandMesh.rotation.x = Math.PI / 2;
    scene.add(headbandMesh);

    // Create ear cups
    const earCupGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32);
    const earCupMaterial = new THREE.MeshPhongMaterial({
      color: 0x666666,
      shininess: 100
    });
    
    const leftEarCup = new THREE.Mesh(earCupGeometry, earCupMaterial);
    leftEarCup.position.set(-0.8, 0, 0);
    leftEarCup.rotation.x = Math.PI / 2;
    scene.add(leftEarCup);

    const rightEarCup = new THREE.Mesh(earCupGeometry, earCupMaterial);
    rightEarCup.position.set(0.8, 0, 0);
    rightEarCup.rotation.x = Math.PI / 2;
    scene.add(rightEarCup);

    // Camera position
    camera.position.z = 3;

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Rotate headphones based on mouse position
      headbandMesh.rotation.y = x * 0.5;
      leftEarCup.rotation.y = x * 0.5;
      rightEarCup.rotation.y = x * 0.5;

      headbandMesh.rotation.z = y * 0.2;
      leftEarCup.rotation.z = y * 0.2;
      rightEarCup.rotation.z = y * 0.2;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="w-[300px] h-[300px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    />
  );
} 