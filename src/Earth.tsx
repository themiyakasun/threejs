import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';
import StarField from './StarField';
import Fresnal from './Fresnal';

const Earth = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const earthGroup = new THREE.Group();

    earthGroup.rotation.z = (-23.4 * Math.PI) / 100;
    scene.add(earthGroup);

    new OrbitControls(camera, renderer.domElement);

    const detail = 12;
    const loader = new THREE.TextureLoader();

    const geo = new THREE.IcosahedronGeometry(1, detail);
    const mat = new THREE.MeshStandardMaterial({
      map: loader.load('earthmap1k.jpg'),
    });
    const earchMesh = new THREE.Mesh(geo, mat);
    earthGroup.add(earchMesh);

    const stars = StarField({ numStars: 5000 });
    scene.add(stars);

    const lightMat = new THREE.MeshBasicMaterial({
      map: loader.load('earthlights1k.jpg'),
      blending: THREE.AdditiveBlending,
    });
    const lightMesh = new THREE.Mesh(geo, lightMat);
    earthGroup.add(lightMesh);

    const cloudMet = new THREE.MeshStandardMaterial({
      map: loader.load('earthcloudmaptrans.jpg'),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const cloudMesh = new THREE.Mesh(geo, cloudMet);
    cloudMesh.scale.setScalar(1.003);
    earthGroup.add(cloudMesh);

    // const hemiLight = new THREE.HemisphereLight();
    // scene.add(hemiLight);

    const fresnalMet = Fresnal();
    const glowMesh = new THREE.Mesh(geo, fresnalMet);
    glowMesh.scale.setScalar(1.003);
    earthGroup.add(glowMesh);

    const sunLight = new THREE.DirectionalLight(0xffffff);
    sunLight.position.set(2, 0.5, 1.5);
    scene.add(sunLight);

    function animate() {
      requestAnimationFrame(animate);

      earchMesh.rotation.y += 0.002;
      lightMesh.rotation.y += 0.002;
      cloudMesh.rotation.y += 0.0025;
      glowMesh.rotation.y += 0.002;
      renderer.render(scene, camera);
    }

    animate();
  });
  return <div ref={mountRef}></div>;
};

export default Earth;
