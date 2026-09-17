"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type ShaderMode = "neon" | "hologram" | "plasma" | "obsidian";

interface TechCanvasProps {
  isInspecting?: boolean;
  shaderMode?: ShaderMode;
  onSceneReady?: () => void;
  theme?: "dark" | "light";
}

export default function TechCanvas({
  isInspecting = false,
  shaderMode = "neon",
  onSceneReady,
  theme = "dark",
}: TechCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInspectingRef = useRef(isInspecting);
  const shaderModeRef = useRef(shaderMode);
  const themeRef = useRef(theme);
  const sceneRef = useRef<THREE.Scene | null>(null);

  // Keep refs in sync with props
  useEffect(() => {
    isInspectingRef.current = isInspecting;
  }, [isInspecting]);

  useEffect(() => {
    shaderModeRef.current = shaderMode;
  }, [shaderMode]);

  useEffect(() => {
    themeRef.current = theme;
    if (sceneRef.current) {
      const isLight = theme === "light";
      sceneRef.current.fog = new THREE.FogExp2(isLight ? 0xf8fafc : 0x030712, 0.04);
    }
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const initialFogColor = themeRef.current === "light" ? 0xf8fafc : 0x030712;
    scene.fog = new THREE.FogExp2(initialFogColor, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f2fe, 2.5);
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 2.0);
    dirLight2.position.set(-5, -3, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // --- PARTICLES (Starfield & Cyber Dust) ---
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 30;
      particlePositions[i + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;

      const c = Math.random();
      if (c > 0.66) {
        // Cyan
        particleColors[i] = 0.0;
        particleColors[i + 1] = 0.95;
        particleColors[i + 2] = 1.0;
      } else if (c > 0.33) {
        // Purple
        particleColors[i] = 0.65;
        particleColors[i + 1] = 0.35;
        particleColors[i + 2] = 0.97;
      } else {
        // Amber/White
        particleColors[i] = 0.9;
        particleColors[i + 1] = 0.8;
        particleColors[i + 2] = 1.0;
      }
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 3D REVOLUTION MODELS GROUP ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 0: GENESIS CORE (Hero)
    const genesisGroup = new THREE.Group();
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    genesisGroup.add(coreMesh);

    // Inner glowing solid crystal
    const innerGeo = new THREE.OctahedronGeometry(0.8, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0xa855f7,
      emissiveIntensity: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    genesisGroup.add(innerMesh);

    // Orbiting Gimbal Rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.3,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.02, 16, 100), ringMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.02, 16, 100), ringMat);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.02, 16, 100), ringMat);
    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;
    genesisGroup.add(ring1, ring2, ring3);
    mainGroup.add(genesisGroup);

    // 1: NEURAL AI SYNAPTIC NETWORK
    const neuralGroup = new THREE.Group();
    const nodeCount = 45;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 1.0,
    });

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 3.5
      );
      nodePositions.push(pos);
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      neuralGroup.add(nodeMesh);
    }

    // Connect close nodes with lines
    const lineIndices: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.4) {
          lineIndices.push(i, j);
        }
      }
    }
    const linePositions = new Float32Array(lineIndices.length * 3);
    for (let i = 0; i < lineIndices.length; i++) {
      const p = nodePositions[lineIndices[i]];
      linePositions[i * 3] = p.x;
      linePositions[i * 3 + 1] = p.y;
      linePositions[i * 3 + 2] = p.z;
    }
    const neuralLineGeo = new THREE.BufferGeometry();
    neuralLineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const neuralLineMat = new THREE.LineBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const neuralLines = new THREE.LineSegments(neuralLineGeo, neuralLineMat);
    neuralGroup.add(neuralLines);
    mainGroup.add(neuralGroup);

    // 2: QUANTUM COMPUTING (Bloch Sphere & Entangled Rings)
    const quantumGroup = new THREE.Group();
    const blochWireGeo = new THREE.SphereGeometry(1.6, 24, 16);
    const blochWireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const blochWire = new THREE.Mesh(blochWireGeo, blochWireMat);
    quantumGroup.add(blochWire);

    // Entangled Rings
    const qRingGeo = new THREE.TorusGeometry(1.8, 0.04, 16, 80);
    const qRingMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 0.8,
      metalness: 0.9,
    });
    const qRingA = new THREE.Mesh(qRingGeo, qRingMat);
    const qRingB = new THREE.Mesh(qRingGeo, qRingMat);
    qRingA.rotation.x = Math.PI / 2;
    qRingB.rotation.y = Math.PI / 3;
    quantumGroup.add(qRingA, qRingB);

    // Superposition Qubit Core
    const qubitGeo = new THREE.DodecahedronGeometry(0.7, 1);
    const qubitMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xda70d6,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    });
    const qubitMesh = new THREE.Mesh(qubitGeo, qubitMat);
    quantumGroup.add(qubitMesh);
    mainGroup.add(quantumGroup);

    // 3: FUSION TOKAMAK DYNAMO
    const fusionGroup = new THREE.Group();
    // Toroidal plasma chamber
    const torusGeo = new THREE.TorusGeometry(1.5, 0.45, 24, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.7,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const tokamak = new THREE.Mesh(torusGeo, torusMat);
    fusionGroup.add(tokamak);

    // High temp plasma particle coil
    const plasmaCoilGeo = new THREE.TorusGeometry(1.5, 0.15, 16, 60);
    const plasmaCoilMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xf43f5e,
      emissiveIntensity: 1.5,
      roughness: 0.1,
    });
    const plasmaCoil = new THREE.Mesh(plasmaCoilGeo, plasmaCoilMat);
    fusionGroup.add(plasmaCoil);

    // Vertical magnetic field coils
    const coilGroup = new THREE.Group();
    for (let c = 0; c < 8; c++) {
      const angle = (c / 8) * Math.PI * 2;
      const cRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.75, 0.03, 12, 40),
        new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: 0.95,
          roughness: 0.1,
          emissive: 0xb45309,
        })
      );
      cRing.position.set(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5);
      cRing.rotation.y = -angle;
      coilGroup.add(cRing);
    }
    fusionGroup.add(coilGroup);
    mainGroup.add(fusionGroup);

    // 4: SYNTHETIC BIOLOGY (DNA Double Helix)
    const bioGroup = new THREE.Group();
    const dnaRadius = 1.0;
    const dnaHeight = 4.0;
    const pairs = 28;
    const sphereGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const strandAMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.9,
    });
    const strandBMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.9,
    });
    const rungMat = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.5,
    });

    const rungPositions: number[] = [];
    for (let p = 0; p < pairs; p++) {
      const y = (p / pairs - 0.5) * dnaHeight;
      const angle = (p / pairs) * Math.PI * 4;

      const xA = Math.cos(angle) * dnaRadius;
      const zA = Math.sin(angle) * dnaRadius;
      const xB = Math.cos(angle + Math.PI) * dnaRadius;
      const zB = Math.sin(angle + Math.PI) * dnaRadius;

      const nodeA = new THREE.Mesh(sphereGeo, strandAMat);
      nodeA.position.set(xA, y, zA);
      bioGroup.add(nodeA);

      const nodeB = new THREE.Mesh(sphereGeo, strandBMat);
      nodeB.position.set(xB, y, zB);
      bioGroup.add(nodeB);

      // Rung line
      rungPositions.push(xA, y, zA, xB, y, zB);
    }
    const rungGeo = new THREE.BufferGeometry();
    rungGeo.setAttribute("position", new THREE.Float32BufferAttribute(rungPositions, 3));
    const rungLines = new THREE.LineSegments(rungGeo, rungMat);
    bioGroup.add(rungLines);
    mainGroup.add(bioGroup);

    // 5: INTERSTELLAR WARP & MULTI-PLANETARY
    const spaceGroup = new THREE.Group();
    const warpRingGeo = new THREE.TorusGeometry(1.9, 0.05, 16, 100);
    const warpRingMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x6366f1,
      emissiveIntensity: 1.0,
      metalness: 0.9,
    });
    for (let w = 0; w < 4; w++) {
      const wRing = new THREE.Mesh(warpRingGeo, warpRingMat);
      wRing.position.z = (w - 1.5) * 0.8;
      wRing.scale.setScalar(1 - w * 0.15);
      spaceGroup.add(wRing);
    }

    // Mars / Exo-planet sphere in center
    const planetGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0x7c2d12,
      emissiveIntensity: 0.6,
      roughness: 0.7,
      wireframe: false,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    spaceGroup.add(planetMesh);

    // Atmosphere halo
    const atmoGeo = new THREE.SphereGeometry(0.95, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    spaceGroup.add(atmoMesh);
    mainGroup.add(spaceGroup);

    // Store array of groups for easy indexing
    const chapterGroups = [
      genesisGroup,
      neuralGroup,
      quantumGroup,
      fusionGroup,
      bioGroup,
      spaceGroup,
    ];

    // --- INTERACTION & MOUSE PARALLAX ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Drag-to-orbit for Inspector Mode
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let inspectorRotationX = 0;
    let inspectorRotationY = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (!isInspectingRef.current) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onInspectMove = (e: MouseEvent) => {
      if (!isInspectingRef.current || !isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      inspectorRotationY += deltaX * 0.008;
      inspectorRotationX += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onInspectMove);

    // --- SECTION-AWARE SCROLL CALCULATION ---
    let currentScrollIndex = 0;
    let targetScrollIndex = 0;

    const sectionIds = [
      "hero",
      "chapter-ai",
      "chapter-quantum",
      "chapter-fusion",
      "chapter-biotech",
      "chapter-space",
      "simulator",
    ];

    const updateScrollProgress = () => {
      const viewportCenter = window.scrollY + window.innerHeight * 0.5;

      const centers: number[] = [];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const absCenter = rect.top + window.scrollY + rect.height * 0.5;
          centers.push(absCenter);
        } else {
          centers.push(centers.length > 0 ? centers[centers.length - 1] + window.innerHeight : 0);
        }
      });

      if (viewportCenter <= centers[0]) {
        targetScrollIndex = 0;
      } else if (viewportCenter >= centers[centers.length - 1]) {
        targetScrollIndex = centers.length - 1;
      } else {
        for (let i = 0; i < centers.length - 1; i++) {
          if (viewportCenter >= centers[i] && viewportCenter < centers[i + 1]) {
            const span = centers[i + 1] - centers[i];
            const progress = span > 0 ? (viewportCenter - centers[i]) / span : 0;
            targetScrollIndex = i + progress;
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    // Update after slight delay to ensure DOM heights are calculated
    updateScrollProgress();
    setTimeout(updateScrollProgress, 300);
    setTimeout(updateScrollProgress, 1000);

    // --- RESIZE HANDLER ---
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    if (onSceneReady) {
      onSceneReady();
    }

    // --- ANIMATION LOOP ---
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;


      // Starfield subtle rotation & pulsation
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      // Update shader appearance based on shaderMode prop
      const mode = shaderModeRef.current;
      if (mode === "hologram") {
        coreMat.wireframe = true;
        coreMat.color.setHex(0x10b981);
        coreMat.emissive.setHex(0x059669);
        dirLight1.color.setHex(0x10b981);
        dirLight2.color.setHex(0x06b6d4);
      } else if (mode === "plasma") {
        coreMat.wireframe = false;
        coreMat.color.setHex(0xf59e0b);
        coreMat.emissive.setHex(0xef4444);
        dirLight1.color.setHex(0xf59e0b);
        dirLight2.color.setHex(0xef4444);
      } else if (mode === "obsidian") {
        coreMat.wireframe = false;
        coreMat.color.setHex(0x1e1b4b);
        coreMat.emissive.setHex(0x4338ca);
        dirLight1.color.setHex(0x6366f1);
        dirLight2.color.setHex(0x38bdf8);
      } else {
        // Neon default
        coreMat.wireframe = true;
        coreMat.color.setHex(0x00f2fe);
        coreMat.emissive.setHex(0x0284c7);
        dirLight1.color.setHex(0x00f2fe);
        dirLight2.color.setHex(0xa855f7);
      }

      // Continuous individual animations
      // 0: Genesis
      coreMesh.rotation.x = elapsedTime * 0.2;
      coreMesh.rotation.y = elapsedTime * 0.25;
      innerMesh.rotation.x = -elapsedTime * 0.3;
      innerMesh.rotation.z = elapsedTime * 0.3;
      ring1.rotation.z += 0.01;
      ring2.rotation.x += 0.008;
      ring3.rotation.y += 0.012;

      // 1: Neural AI
      neuralGroup.rotation.y = elapsedTime * 0.15;
      neuralGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;

      // 2: Quantum
      blochWire.rotation.y = elapsedTime * 0.2;
      qRingA.rotation.z += 0.015;
      qRingB.rotation.x += 0.018;
      qubitMesh.rotation.y = -elapsedTime * 0.4;
      qubitMesh.scale.setScalar(0.9 + Math.sin(elapsedTime * 3) * 0.12);

      // 3: Fusion Tokamak
      tokamak.rotation.z = elapsedTime * 0.3;
      plasmaCoil.rotation.z = -elapsedTime * 0.6;
      coilGroup.rotation.y = elapsedTime * 0.1;

      // 4: DNA
      bioGroup.rotation.y = elapsedTime * 0.4;
      bioGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      // 5: Space
      spaceGroup.rotation.z = elapsedTime * 0.1;
      planetMesh.rotation.y = elapsedTime * 0.15;
      atmoMesh.rotation.y = -elapsedTime * 0.1;

      // --- CONTINUOUS SCROLL INTERPOLATION ---
      currentScrollIndex += (targetScrollIndex - currentScrollIndex) * 0.08;

      chapterGroups.forEach((group, idx) => {
        const dist = Math.abs(currentScrollIndex - idx);
        
        if (dist < 1.0) {
          // Visible and active
          const factor = 1 - dist;
          group.visible = true;
          group.scale.setScalar(factor * 1.05 + 0.001);
          // Only zoom along Z; do NOT translate along X inside individual groups
          group.position.set(0, 0, (1 - factor) * -6);
        } else {
          group.visible = false;
          group.scale.setScalar(0.0001);
        }
      });

      // Overall group transforms & Mouse responsiveness
      if (isInspectingRef.current) {
        // Full manual user orbit
        mainGroup.rotation.y = inspectorRotationY;
        mainGroup.rotation.x = inspectorRotationX;
        mainGroup.position.set(0, 0, 0);
        camera.position.set(0, 0, 7.5);
      } else {
        // Smooth parallax based on mouse
        mainGroup.rotation.y = mouseX * 0.4;
        mainGroup.rotation.x = -mouseY * 0.4;
        
        // Exact coordinate alignment matching the user's requirement:
        // "if the section is on the left side show the image on the right side,
        //  if the section is on the right side show the image on the left side"
        // Section 0 (Hero): Centered -> x = 0
        // Section 1 (Chapter 01 AI): Content on LEFT -> 3D on RIGHT (+3.1)
        // Section 2 (Chapter 02 Quantum): Content on RIGHT -> 3D on LEFT (-3.1)
        // Section 3 (Chapter 03 Fusion): Content on LEFT -> 3D on RIGHT (+3.1)
        // Section 4 (Chapter 04 Biotech): Content on RIGHT -> 3D on LEFT (-3.1)
        // Section 5 (Chapter 05 Space): Content on LEFT -> 3D on RIGHT (+3.1)
        // Section 6 (Simulator / Grid): Centered -> x = 0
        let targetX = 0;
        if (window.innerWidth >= 1024) {
          const xPositions = [0, 3.6, -3.6, 3.6, -3.6, 3.6, 0];
          const i = Math.floor(currentScrollIndex);
          const frac = currentScrollIndex - i;
          if (i < 0) {
            targetX = xPositions[0];
          } else if (i >= xPositions.length - 1) {
            targetX = xPositions[xPositions.length - 1];
          } else {
            targetX = xPositions[i] * (1 - frac) + xPositions[i + 1] * frac;
          }
        } else if (window.innerWidth >= 768) {
          const xPositions = [0, 2.7, -2.7, 2.7, -2.7, 2.7, 0];
          const i = Math.floor(currentScrollIndex);
          const frac = currentScrollIndex - i;
          if (i < 0) {
            targetX = xPositions[0];
          } else if (i >= xPositions.length - 1) {
            targetX = xPositions[xPositions.length - 1];
          } else {
            targetX = xPositions[i] * (1 - frac) + xPositions[i + 1] * frac;
          }
        } else {
          // Mobile: Centered
          targetX = 0;
        }

        mainGroup.position.x += (targetX - mainGroup.position.x) * 0.1;
        mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.15;
        camera.position.z = 8;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onInspectMove);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-full z-0 transition-opacity duration-1000 ${
        isInspecting ? "pointer-events-auto cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
      aria-hidden="true"
    />
  );
}
