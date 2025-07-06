import { useRef, useEffect } from "react";

export default function BrainCoreCanvas({ size = 200 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set size
    canvas.width = size;
    canvas.height = size;


    const maxDistance = size / 2.5;
    const centerX = size / 2;
    const centerY = size / 2;

    class Particle {
      constructor() {
        this.radius = Math.max(0.5, size / 100); // scale dot size
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.4 + 0.2;
        this.distance = Math.random() * maxDistance;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
      }

      update() {
        this.angle += this.speed * 0.01;
        this.x = centerX + Math.cos(this.angle) * this.distance;
        this.y = centerY + Math.sin(this.angle) * this.distance;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
const particleCount = Math.max(10, Math.floor(size));
    const particles = Array.from({ length: particleCount }, () => new Particle());

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        boxShadow: "0 0 25px #00ffff",
        background: "#000",
      }}
    />
  );
}
