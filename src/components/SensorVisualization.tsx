import { useEffect, useRef } from "react";

export const SensorVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawSensorGrid = () => {
      // Clear canvas
      ctx.fillStyle = 'hsl(220, 20%, 8%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const gridSize = 20;
      const rows = 25;
      const cols = 25;

      // Draw 3D grid effect
      ctx.strokeStyle = 'hsl(180, 80%, 40%)';
      ctx.lineWidth = 1;

      // Create perspective grid
      for (let i = 0; i <= rows; i++) {
        const y = centerY - (rows * gridSize) / 2 + i * gridSize;
        const perspective = 1 - Math.abs(i - rows/2) * 0.02;
        
        ctx.beginPath();
        ctx.moveTo(centerX - (cols * gridSize * perspective) / 2, y);
        ctx.lineTo(centerX + (cols * gridSize * perspective) / 2, y);
        ctx.stroke();
      }

      for (let j = 0; j <= cols; j++) {
        const x = centerX - (cols * gridSize) / 2 + j * gridSize;
        const perspective = 1 - Math.abs(j - cols/2) * 0.02;
        
        ctx.beginPath();
        ctx.moveTo(x, centerY - (rows * gridSize * perspective) / 2);
        ctx.lineTo(x, centerY + (rows * gridSize * perspective) / 2);
        ctx.stroke();
      }

      // Draw sensor points with intensity
      const sensorData = generateSensorData();
      
      sensorData.forEach(point => {
        const { x, y, intensity, forceX, forceY } = point;
        const screenX = centerX + x * gridSize;
        const screenY = centerY + y * gridSize;

        // Draw sensor point
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, 8);
        if (intensity > 0.7) {
          gradient.addColorStop(0, 'hsl(60, 100%, 70%)');
          gradient.addColorStop(1, 'hsl(60, 100%, 40%)');
        } else if (intensity > 0.3) {
          gradient.addColorStop(0, 'hsl(180, 100%, 65%)');
          gradient.addColorStop(1, 'hsl(180, 100%, 40%)');
        } else {
          gradient.addColorStop(0, 'hsl(180, 30%, 30%)');
          gradient.addColorStop(1, 'hsl(180, 30%, 15%)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(2, intensity * 6), 0, Math.PI * 2);
        ctx.fill();

        // Draw force vectors as arrows
        if (intensity > 0.3) {
          ctx.strokeStyle = 'hsl(120, 100%, 60%)';
          ctx.lineWidth = 2;
          
          const arrowLength = 20;
          const endX = screenX + forceX * arrowLength;
          const endY = screenY + forceY * arrowLength;

          // Arrow line
          ctx.beginPath();
          ctx.moveTo(screenX, screenY);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // Arrow head
          const angle = Math.atan2(forceY, forceX);
          const headLength = 6;
          
          ctx.beginPath();
          ctx.moveTo(endX, endY);
          ctx.lineTo(
            endX - headLength * Math.cos(angle - Math.PI / 6),
            endY - headLength * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(endX, endY);
          ctx.lineTo(
            endX - headLength * Math.cos(angle + Math.PI / 6),
            endY - headLength * Math.sin(angle + Math.PI / 6)
          );
          ctx.stroke();
        }
      });

      // Draw coordinate axes labels
      ctx.fillStyle = 'hsl(180, 100%, 85%)';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      
      // X-axis labels
      for (let i = 0; i <= 5; i++) {
        const x = centerX - 200 + i * 100;
        const value = (i * 5).toString();
        ctx.fillText(value, x, canvas.height - 20);
      }
      
      // Y-axis labels (left side)
      ctx.textAlign = 'right';
      for (let i = 0; i <= 5; i++) {
        const y = centerY + 200 - i * 80;
        const value = (i * 5).toString();
        ctx.fillText(value, 40, y + 4);
      }
    };

    const generateSensorData = () => {
      const data = [];
      for (let i = -8; i <= 8; i++) {
        for (let j = -8; j <= 8; j++) {
          const distance = Math.sqrt(i * i + j * j);
          const intensity = Math.max(0, 1 - distance / 8) * (0.3 + Math.random() * 0.7);
          
          // Simulate contact area with higher intensity in center
          const contactIntensity = distance < 3 ? intensity * 1.5 : intensity * 0.3;
          
          data.push({
            x: i,
            y: j,
            intensity: Math.min(1, contactIntensity),
            forceX: (Math.random() - 0.5) * intensity,
            forceY: (Math.random() - 0.5) * intensity
          });
        }
      }
      return data;
    };

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    drawSensorGrid();

    // Animation loop
    const animate = () => {
      drawSensorGrid();
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative bg-background border border-border rounded-lg overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* Version indicator */}
        <div className="absolute bottom-4 left-4 text-xs font-mono text-muted-foreground">
          V1.1.9
        </div>
      </div>
    </div>
  );
};