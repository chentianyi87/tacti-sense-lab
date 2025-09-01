import { useEffect, useRef } from "react";

export const SensorVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFingerTactileSensor = () => {
      // Clear canvas
      ctx.fillStyle = 'hsl(220, 20%, 8%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Define finger outline (elliptical/oval shape)
      const fingerWidth = 200;
      const fingerHeight = 320;
      
      // Draw finger outline
      ctx.strokeStyle = 'hsl(180, 80%, 40%)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, fingerWidth/2, fingerHeight/2, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Generate sensor grid within finger area
      const sensorData = generateFingerSensorData(centerX, centerY, fingerWidth, fingerHeight);
      
      // Draw background grid within finger outline
      ctx.strokeStyle = 'hsl(180, 30%, 25%)';
      ctx.lineWidth = 0.5;
      
      const gridSpacing = 15;
      for (let i = -Math.floor(fingerWidth/gridSpacing/2); i <= Math.floor(fingerWidth/gridSpacing/2); i++) {
        for (let j = -Math.floor(fingerHeight/gridSpacing/2); j <= Math.floor(fingerHeight/gridSpacing/2); j++) {
          const x = centerX + i * gridSpacing;
          const y = centerY + j * gridSpacing;
          
          // Check if point is inside finger ellipse
          const dx = (x - centerX) / (fingerWidth/2);
          const dy = (y - centerY) / (fingerHeight/2);
          if (dx*dx + dy*dy <= 1) {
            ctx.strokeRect(x - gridSpacing/2, y - gridSpacing/2, gridSpacing, gridSpacing);
          }
        }
      }

      // Draw sensor data points and force vectors
      sensorData.forEach(sensor => {
        const { x, y, pressure, forceX, forceY, isActive } = sensor;

        if (isActive) {
          // Draw pressure visualization (heat map style)
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
          
          if (pressure > 0.8) {
            // High pressure - bright yellow/orange
            gradient.addColorStop(0, 'hsl(60, 100%, 70%)');
            gradient.addColorStop(0.5, 'hsl(45, 100%, 60%)');
            gradient.addColorStop(1, 'hsl(30, 80%, 40%)');
          } else if (pressure > 0.5) {
            // Medium pressure - cyan/blue
            gradient.addColorStop(0, 'hsl(180, 100%, 65%)');
            gradient.addColorStop(0.5, 'hsl(180, 90%, 50%)');
            gradient.addColorStop(1, 'hsl(180, 70%, 35%)');
          } else if (pressure > 0.2) {
            // Low pressure - teal
            gradient.addColorStop(0, 'hsl(175, 80%, 45%)');
            gradient.addColorStop(1, 'hsl(175, 60%, 25%)');
          } else {
            // Very low pressure - dark cyan
            gradient.addColorStop(0, 'hsl(180, 50%, 30%)');
            gradient.addColorStop(1, 'hsl(180, 40%, 15%)');
          }

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(3, pressure * 10), 0, Math.PI * 2);
          ctx.fill();

          // Draw force vectors (shear forces)
          if (pressure > 0.3) {
            ctx.strokeStyle = 'hsl(120, 100%, 60%)';
            ctx.lineWidth = 2;
            
            const arrowLength = 25 * pressure;
            const endX = x + forceX * arrowLength;
            const endY = y + forceY * arrowLength;

            // Arrow line
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            // Arrow head
            const angle = Math.atan2(forceY, forceX);
            const headLength = 8;
            
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

          // Draw sensor ID for active high-pressure sensors
          if (pressure > 0.6) {
            ctx.fillStyle = 'hsl(180, 100%, 85%)';
            ctx.font = '8px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`S${Math.floor(Math.random() * 99)}`, x, y - 15);
          }
        } else {
          // Inactive sensor - small dot
          ctx.fillStyle = 'hsl(180, 20%, 20%)';
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw coordinate system
      ctx.strokeStyle = 'hsl(180, 100%, 50%)';
      ctx.lineWidth = 2;
      
      // X-axis
      ctx.beginPath();
      ctx.moveTo(centerX - fingerWidth/2 - 30, centerY + fingerHeight/2 + 30);
      ctx.lineTo(centerX + fingerWidth/2 + 30, centerY + fingerHeight/2 + 30);
      ctx.stroke();
      
      // Y-axis
      ctx.beginPath();
      ctx.moveTo(centerX - fingerWidth/2 - 30, centerY + fingerHeight/2 + 30);
      ctx.lineTo(centerX - fingerWidth/2 - 30, centerY - fingerHeight/2 - 30);
      ctx.stroke();

      // Coordinate labels
      ctx.fillStyle = 'hsl(180, 100%, 85%)';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      
      // X-axis labels (mm)
      const xLabels = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25];
      xLabels.forEach((label, index) => {
        const x = centerX - fingerWidth/2 + (index / (xLabels.length - 1)) * fingerWidth;
        ctx.fillText(label.toString(), x, centerY + fingerHeight/2 + 50);
      });
      
      // Y-axis labels (mm)
      ctx.textAlign = 'right';
      const yLabels = [0, 5, 10, 15, 20, 25];
      yLabels.forEach((label, index) => {
        const y = centerY + fingerHeight/2 - (index / (yLabels.length - 1)) * fingerHeight;
        ctx.fillText(label.toString(), centerX - fingerWidth/2 - 40, y + 4);
      });

      // Add axis labels
      ctx.textAlign = 'center';
      ctx.fillText('X (mm)', centerX, centerY + fingerHeight/2 + 70);
      ctx.save();
      ctx.translate(centerX - fingerWidth/2 - 70, centerY);
      ctx.rotate(-Math.PI/2);
      ctx.fillText('Y (mm)', 0, 0);
      ctx.restore();
    };

    const generateFingerSensorData = (centerX: number, centerY: number, fingerWidth: number, fingerHeight: number) => {
      const sensors = [];
      const rows = 20;
      const cols = 12;
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = centerX - fingerWidth/2 + (j / (cols - 1)) * fingerWidth;
          const y = centerY - fingerHeight/2 + (i / (rows - 1)) * fingerHeight;
          
          // Check if sensor is within finger ellipse
          const dx = (x - centerX) / (fingerWidth/2);
          const dy = (y - centerY) / (fingerHeight/2);
          const isInside = dx*dx + dy*dy <= 1;
          
          if (isInside) {
            // Simulate contact pressure - higher in center, varying patterns
            const distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
            const basePressure = Math.max(0, 1 - distanceFromCenter);
            
            // Add some realistic contact patterns
            let pressure = basePressure * (0.2 + Math.random() * 0.8);
            
            // Simulate finger pad contact - higher pressure in certain areas
            if (distanceFromCenter < 0.4) {
              pressure *= 1.8; // Central contact area
            }
            if (dy > -0.2 && dy < 0.3) {
              pressure *= 1.4; // Finger pad main contact zone
            }
            
            const isActive = pressure > 0.1;
            
            sensors.push({
              x,
              y,
              pressure: Math.min(1, pressure),
              forceX: (Math.random() - 0.5) * pressure * 2,
              forceY: (Math.random() - 0.5) * pressure * 2,
              isActive
            });
          }
        }
      }
      
      return sensors;
    };

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    drawFingerTactileSensor();

    // Animation loop
    const animate = () => {
      drawFingerTactileSensor();
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