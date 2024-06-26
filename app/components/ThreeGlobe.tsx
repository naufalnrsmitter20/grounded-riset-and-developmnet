"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Globe from "three-globe";
import WorldMap from "@/public/images/world-map-2.jpeg";

const ThreeGlobe = () => {
  const globeContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const container = globeContainer.current;

    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const globe = new Globe()
      .globeImageUrl(WorldMap.src)
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-bump.jpg")
      .showGraticules(true)
      .arcsData([])
      .labelsData([])
      .pointsData([])
      .pointLat("lat")
      .pointLng("lng")
      .pointColor("color")
      .pointAltitude("altitude")
      .pointRadius("radius")
      .onGlobeReady(() => {
        globe.rotation.y = -Math.PI / 2;
      });

    scene.add(globe);

    camera.position.z = 250;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(5, 3, 5).normalize();
    scene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={globeContainer} style={{ width: "100%", height: "100%" }} />;
};

export default ThreeGlobe;
