'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js';

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x4f46e5, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xff0066, 2, 50);
    pointLight1.position.set(-10, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ff66, 2, 50);
    pointLight2.position.set(10, -5, 5);
    scene.add(pointLight2);

    // Camera position
    camera.position.z = 5;

    // Controls
    const controls = new OrbitControlsImpl(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    (controls as any).autoRotate = true;
    (controls as any).autoRotateSpeed = 0.5;

    // Create vinyl record
    const vinylGeometry = new THREE.TorusGeometry(1, 0.1, 32, 100);
    const vinylMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x000000,
      metalness: 0.8,
      roughness: 0.2
    });
    const vinyl = new THREE.Mesh(vinylGeometry, vinylMaterial);
    scene.add(vinyl);

    // Create grooves on the vinyl
    const groovesGeometry = new THREE.TorusGeometry(0.9, 0.001, 32, 100);
    const groovesMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    for (let i = 0; i < 20; i++) {
      const groove = new THREE.Mesh(groovesGeometry, groovesMaterial);
      groove.scale.set(1 - i * 0.03, 1 - i * 0.03, 1);
      vinyl.add(groove);
    }

    // Create dynamic sound waves
    const waveCount = 3;
    const waves: THREE.Line[] = [];
    const waveSegments = 100;

    for (let w = 0; w < waveCount; w++) {
      const waveGeometry = new THREE.BufferGeometry();
      const wavePositions = new Float32Array(waveSegments * 3);
      
      for (let i = 0; i < waveSegments; i++) {
        const x = (i / waveSegments) * 10 - 5;
        wavePositions[i * 3] = x;
        wavePositions[i * 3 + 1] = 0;
        wavePositions[i * 3 + 2] = w * 0.5 - 1;
      }
      
      waveGeometry.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
      const waveMaterial = new THREE.LineBasicMaterial({ 
        color: new THREE.Color().setHSL(w * 0.1, 1, 0.5),
        transparent: true,
        opacity: 0.7
      });
      const wave = new THREE.Line(waveGeometry, waveMaterial);
      waves.push(wave);
      scene.add(wave);
    }

    // Mouse interaction with parallax effect
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotation.x = mouse.y * 0.5;
      targetRotation.y = mouse.x * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth rotation
      vinyl.rotation.x += (targetRotation.x - vinyl.rotation.x) * 0.05;
      vinyl.rotation.y += (targetRotation.y - vinyl.rotation.y) * 0.05;
      vinyl.rotation.z += 0.005;

      // Animate waves
      frame += 0.03;
      waves.forEach((wave, wIndex) => {
        const positions = wave.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < waveSegments; i++) {
          const x = (i / waveSegments) * 10 - 5;
          positions[i * 3 + 1] = 
            Math.sin(x * 0.5 + frame + wIndex) * 0.5 + 
            Math.sin(x * 0.3 + frame * 0.7 + wIndex) * 0.3;
        }
        wave.geometry.attributes.position.needsUpdate = true;
      });

      // Animate lights
      pointLight1.position.x = Math.sin(frame * 0.5) * 10;
      pointLight1.position.y = Math.cos(frame * 0.3) * 5;
      pointLight2.position.x = Math.cos(frame * 0.5) * 10;
      pointLight2.position.y = Math.sin(frame * 0.3) * 5;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    setIsLoaded(true);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    />
  );
} 