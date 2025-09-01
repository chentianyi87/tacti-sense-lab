import { useEffect, useRef } from "react";

export const SpectrumAnalysis = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawSpectrum = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = 'hsl(220, 25%, 10%)';
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'hsl(220, 25%, 20%)';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = (i / 5) * height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical grid lines
      for (let i = 0; i <= 10; i++) {
        const x = (i / 10) * width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Generate spectrum data (simulate FFT)
      const frequencies = [];
      const numPoints = 100;
      
      for (let i = 0; i < numPoints; i++) {
        const freq = i * 500 / numPoints; // 0-500 Hz
        let amplitude = 0;
        
        // Add some characteristic peaks
        amplitude += Math.exp(-Math.pow((freq - 50) / 10, 2)) * 0.8; // 50Hz peak
        amplitude += Math.exp(-Math.pow((freq - 120) / 15, 2)) * 0.6; // 120Hz peak
        amplitude += Math.exp(-Math.pow((freq - 200) / 8, 2)) * 0.4; // 200Hz peak
        
        // Add noise floor
        amplitude += Math.random() * 0.1;
        
        frequencies.push(amplitude);
      }

      // Draw spectrum bars
      const barWidth = width / frequencies.length;
      
      frequencies.forEach((amplitude, index) => {
        const x = index * barWidth;
        const barHeight = amplitude * height * 0.8;
        
        // Create gradient for bars
        const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
        gradient.addColorStop(0, 'hsl(180, 100%, 50%)');
        gradient.addColorStop(1, 'hsl(180, 100%, 30%)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
      });

      // Draw frequency labels
      ctx.fillStyle = 'hsl(180, 100%, 85%)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      
      const freqLabels = [0, 100, 200, 300, 400, 500];
      freqLabels.forEach((freq, index) => {
        const x = (freq / 500) * width;
        ctx.fillText(`${freq}`, x, height - 5);
      });
    };

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    drawSpectrum();

    // Update spectrum periodically
    const interval = setInterval(drawSpectrum, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-secondary rounded-lg p-3">
      <h3 className="text-sm font-semibold text-foreground mb-3 border-b border-border pb-2">
        频谱分析 (FFT)
      </h3>
      
      <div className="h-24 bg-card rounded border border-border mb-3">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">主频</span>
            <span className="text-cyan-bright font-mono">52.3 Hz</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">峰值幅度</span>
            <span className="text-cyan-bright font-mono">0.78</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">带宽</span>
            <span className="text-cyan-bright font-mono">15.6 Hz</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">谐波失真</span>
            <span className="text-cyan-bright font-mono">2.1%</span>
          </div>
        </div>
      </div>
    </div>
  );
};