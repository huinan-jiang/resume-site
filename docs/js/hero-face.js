import * as THREE from '../vendor/three.module.js';

(function () {
  const canvas = document.getElementById('hero-face-canvas');
  const hero = document.querySelector('.face-hero');
  if (!canvas || !hero) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initThree(THREE);

  function initThree(THREE) {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020304, 0.055);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0.22, 0.05, 5.45);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.75;

    const face = new THREE.Group();
    face.rotation.y = -0.18;
    scene.add(face);

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0x21130f,
      roughness: 0.66,
      metalness: 0.02,
      emissive: 0x0d0706,
      emissiveIntensity: 0.72
    });

    const headGeometry = new THREE.SphereGeometry(1.06, 72, 72);
    sculptHead(headGeometry);
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.scale.set(0.72, 1.08, 0.58);
    head.position.y = 0.18;
    face.add(head);

    const headGlow = new THREE.Mesh(
      headGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xff7a23,
        transparent: true,
        opacity: 0.055,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
      })
    );
    headGlow.scale.set(head.scale.x * 1.08, head.scale.y * 1.06, head.scale.z * 1.08);
    headGlow.position.copy(head.position);
    face.add(headGlow);

    const headWire = new THREE.Mesh(
      headGeometry,
      new THREE.MeshBasicMaterial({
        color: 0x8fb3ff,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending
      })
    );
    headWire.scale.copy(head.scale);
    headWire.position.copy(head.position);
    face.add(headWire);

    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.31, 0.44, 1.08, 48),
      skinMaterial
    );
    neck.position.y = -1.12;
    neck.scale.z = 0.82;
    face.add(neck);

    const shoulder = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.78, 1.58, 10, 42),
      skinMaterial
    );
    shoulder.position.set(0, -1.86, -0.08);
    shoulder.rotation.z = Math.PI / 2;
    shoulder.scale.set(1.48, 0.36, 0.26);
    face.add(shoulder);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(headGeometry),
      new THREE.LineBasicMaterial({
        color: 0x7fa8ff,
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending
      })
    );
    wire.scale.copy(head.scale);
    wire.position.copy(head.position);
    face.add(wire);

    addFaceLines(THREE, face);
    addHairStrands(THREE, face);

    const ambient = new THREE.HemisphereLight(0x7897c8, 0x261008, 0.34);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffa34b, 2.8);
    key.position.set(2.2, 1.1, 2.4);
    const fill = new THREE.DirectionalLight(0x90b6ff, 2.3);
    fill.position.set(-2.4, 1.0, 2.2);
    const blue = new THREE.PointLight(0x7fa8ff, 74, 9, 1.35);
    const amber = new THREE.PointLight(0xff7a23, 82, 9.5, 1.32);
    const rim = new THREE.SpotLight(0xe8f3ff, 18, 10, 0.28, 0.42, 1);
    rim.position.set(1.35, -0.08, 2.25);
    rim.target = head;
    scene.add(key, fill, blue, amber, rim);

    const lightMarkers = new THREE.Group();
    scene.add(lightMarkers);

    let width = 0;
    let height = 0;
    const clock = new THREE.Clock();

    function sculptHead(geometry) {
      const position = geometry.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const z = position.getZ(i);
        const jaw = y < -0.28 ? 1 + y * 0.22 : 1;
        const crown = y > 0.48 ? 1 - (y - 0.48) * 0.12 : 1;
        position.setXYZ(i, x * jaw * crown, y * (y < -0.58 ? 1.08 : 1), z);
      }
      geometry.computeVertexNormals();
    }

    function curveLine(points, color, opacity, widthScale) {
      const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p[0], p[1], p[2])));
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(46));
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: Math.min(opacity * 2.1, 0.72),
        depthTest: false,
        blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(geometry, material);
      line.scale.setScalar(widthScale || 1);
      line.renderOrder = 5;
      face.add(line);
      return line;
    }

    function addFaceLines(THREE, target) {
      const cool = 0x93b8ff;
      const warm = 0xff9a3d;
      [
        [[-0.28, 0.42, 0.67], [-0.12, 0.49, 0.72], [0.05, 0.48, 0.72], [0.25, 0.4, 0.67], cool, 0.42],
        [[-0.34, 0.2, 0.71], [-0.2, 0.15, 0.8], [-0.03, 0.19, 0.79], cool, 0.42],
        [[0.08, 0.2, 0.8], [0.24, 0.16, 0.79], [0.38, 0.21, 0.7], warm, 0.42],
        [[0.01, 0.42, 0.82], [-0.03, 0.16, 0.94], [0.05, -0.08, 0.86], [-0.1, -0.18, 0.78], cool, 0.45],
        [[-0.2, -0.36, 0.78], [-0.04, -0.41, 0.86], [0.16, -0.36, 0.78], warm, 0.45],
        [[-0.52, 0.02, 0.48], [-0.42, -0.42, 0.54], [-0.14, -0.72, 0.48], cool, 0.22],
        [[0.48, 0.04, 0.5], [0.38, -0.42, 0.54], [0.12, -0.72, 0.49], warm, 0.22],
        [[-0.44, 0.62, 0.36], [-0.58, 0.16, 0.48], [-0.38, -0.54, 0.42], [-0.06, -0.82, 0.35], cool, 0.22],
        [[0.42, 0.62, 0.36], [0.58, 0.14, 0.48], [0.38, -0.54, 0.42], [0.08, -0.82, 0.35], warm, 0.22]
      ].forEach(item => {
        const color = item[item.length - 2];
        const opacity = item[item.length - 1];
        curveLine(item.slice(0, -2), color, opacity, 1);
      });
      target.add(new THREE.Points(
        new THREE.SphereGeometry(1.01, 22, 22),
        new THREE.PointsMaterial({
        color: 0xd8b85a,
          size: 0.01,
          transparent: true,
          opacity: 0.22,
          blending: THREE.AdditiveBlending
        })
      ));
    }

    function addHairStrands(THREE, target) {
      const blueMaterial = new THREE.LineBasicMaterial({
        color: 0x7fa8ff,
        transparent: true,
        opacity: 0.24,
        blending: THREE.AdditiveBlending
      });
      const amberMaterial = new THREE.LineBasicMaterial({
        color: 0xff7a23,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending
      });

      for (let i = 0; i < 34; i++) {
        const side = i % 2 === 0 ? -1 : 1;
        const y = 0.58 + Math.random() * 0.72;
        const x = side * (0.34 + Math.random() * 0.34);
        const points = [
          new THREE.Vector3(x, y, 0.22),
          new THREE.Vector3(x + side * (0.18 + Math.random() * 0.24), y + 0.12, -0.08),
          new THREE.Vector3(x + side * (0.26 + Math.random() * 0.38), y - 0.14 - Math.random() * 0.42, 0.04)
        ];
        const curve = new THREE.CatmullRomCurve3(points);
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(28)),
          side < 0 ? blueMaterial : amberMaterial
        );
        target.add(line);
      }
    }

    function resize() {
      const rect = hero.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.x = width < 780 ? 0.08 : 0.1;
      camera.position.z = width < 780 ? 6.0 : 5.45;
      face.position.x = width < 780 ? 0.48 : 1.18;
      face.position.y = width < 780 ? 0.04 : 0.1;
      face.scale.setScalar(width < 780 ? 1.05 : 1.22);
      camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    function render() {
      const elapsed = reduceMotion ? 1.2 : clock.getElapsedTime();
      const spin = elapsed * 0.58;
      blue.position.set(Math.cos(spin) * 2.6 - 0.3, 0.55 + Math.sin(spin * 0.7) * 0.35, 1.8 + Math.sin(spin) * 0.8);
      amber.position.set(Math.cos(spin + Math.PI) * 2.9 + 0.7, 0.2 + Math.cos(spin * 0.6) * 0.42, 1.7 + Math.cos(spin) * 0.72);
      face.rotation.y = -0.2 + Math.sin(elapsed * 0.25) * 0.035;
      face.rotation.x = Math.sin(elapsed * 0.18) * 0.018;
      renderer.render(scene, camera);
      if (!reduceMotion) requestAnimationFrame(render);
    }

    render();
  }

  function initFallback() {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let start = performance.now();

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = hero.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw(now) {
      const t = reduceMotion ? 1 : (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#030405';
      ctx.fillRect(0, 0, width, height);

      const cx = width * (width < 780 ? 0.58 : 0.62);
      const cy = height * 0.44;
      const size = Math.min(width, height) * (width < 780 ? 0.42 : 0.5);
      const blueX = cx + Math.cos(t * 0.8) * size * 0.72;
      const amberX = cx + Math.cos(t * 0.8 + Math.PI) * size * 0.82;

      const blue = ctx.createRadialGradient(blueX, cy - size * 0.2, 0, blueX, cy, size * 0.92);
      blue.addColorStop(0, 'rgba(120, 162, 255, 0.52)');
      blue.addColorStop(1, 'rgba(120, 162, 255, 0)');
      ctx.fillStyle = blue;
      ctx.fillRect(0, 0, width, height);

      const amber = ctx.createRadialGradient(amberX, cy, 0, amberX, cy, size);
      amber.addColorStop(0, 'rgba(255, 112, 32, 0.46)');
      amber.addColorStop(1, 'rgba(255, 112, 32, 0)');
      ctx.fillStyle = amber;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = '#050505';
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.28, size * 0.43, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-size * 0.1, size * 0.34, size * 0.2, size * 0.36);
      ctx.strokeStyle = 'rgba(130, 170, 255, 0.36)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-size * 0.05, -size * 0.14);
      ctx.quadraticCurveTo(size * 0.04, size * 0.02, -size * 0.04, size * 0.11);
      ctx.moveTo(-size * 0.12, -size * 0.08);
      ctx.quadraticCurveTo(-size * 0.02, -size * 0.12, size * 0.1, -size * 0.08);
      ctx.moveTo(-size * 0.09, size * 0.22);
      ctx.quadraticCurveTo(size * 0.01, size * 0.26, size * 0.12, size * 0.21);
      ctx.stroke();
      ctx.restore();

      if (!reduceMotion) requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    draw(start);
  }
})();
