<template>
  <div
    ref="ctnDom"
    :class="cn('block size-full', props?.class)"
  ></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, type HTMLAttributes } from "vue";
import { Renderer, Program, Mesh, Color, Triangle, type OGLRenderingContext } from "ogl";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();

const ctnDom = ref<HTMLDivElement | null>(null);

let animateId: number;
let renderer: Renderer;
let gl: OGLRenderingContext;
let mesh: Mesh;

// Vertex Shader (Tidak berubah)
const vert = `
  attribute vec2 uv;
  attribute vec2 position;
  
  varying vec2 vUv;
  
  void main() {
      vUv = uv;
      gl_Position = vec4(position, 0, 1);
  }
`;

// Fragment Shader (DIUBAH UNTUK DARK MODE)
const frag = `
  precision highp float;
  
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uResolution;
  
  varying vec2 vUv;
  
  void main() {
      float mr = min(uResolution.x, uResolution.y);
      vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;
  
      float d = -uTime * 1.2;
      float a = 0.0;
      for (float i = 0.0; i < 8.0; ++i) {
          a += cos(i - d - a * uv.x);
          d += sin(uv.y * i + a);
      }
      d += uTime * 1.0;
      vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
      col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
            col = mix(uColor, col, 0.5);

      // LOGIKA DARK MODE:
      // col * 0.25 -> Mengurangi kecerahan animasi menjadi 25%
      // + uColor -> Menambahkan base color gelap (biru tua/hitam)
      gl_FragColor = vec4(col * 0.25 + uColor, 1.0);
  }
`;

function resize() {
  if (!ctnDom.value) return;
  const scale = 1;
  renderer.setSize(ctnDom.value.offsetWidth * scale, ctnDom.value.offsetHeight * scale);
  if (mesh) {
    mesh.program.uniforms.uResolution.value = [
      gl.canvas.width,
      gl.canvas.height,
      gl.canvas.width / gl.canvas.height,
    ];
  }
}

function update(t: number) {
  animateId = requestAnimationFrame(update);
  if (mesh) {
    mesh.program.uniforms.uTime.value = t * 0.001;
    renderer.render({ scene: mesh });
  }
}

onMounted(() => {
  if (!ctnDom.value) return;

  renderer = new Renderer();
  gl = renderer.gl;
  
  // UBAH: Clear color jadi hitam (0,0,0,1)
  gl.clearColor(0, 0, 0, 1);

  window.addEventListener("resize", resize, false);
  resize();

  const geometry = new Triangle(gl);

  const program = new Program(gl, {
    vertex: vert,
    fragment: frag,
    uniforms: {
      uTime: { value: 0 },
      // Warna dasar gelap (Dark Blue/Grey)
      uColor: { value: new Color(0.02, 0.05, 0.1) }, 
      uResolution: {
        value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height],
      },
    },
  });

  mesh = new Mesh(gl, { geometry, program });
  animateId = requestAnimationFrame(update);

  ctnDom.value.appendChild(gl.canvas);
});

onUnmounted(() => {
  cancelAnimationFrame(animateId);
  window.removeEventListener("resize", resize);
  if (ctnDom.value && gl?.canvas) {
    ctnDom.value.removeChild(gl.canvas);
  }
  gl?.getExtension("WEBGL_lose_context")?.loseContext();
});
</script>