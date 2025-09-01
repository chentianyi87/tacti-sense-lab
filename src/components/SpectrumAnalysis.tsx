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
    <div className="bg-gradient-to-br from-card to-secondary/50 border border-border rounded-xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-bright/5 to-transparent pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-bright rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-foreground">频谱分析</h3>
          </div>
          <div className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
            FFT实时
          </div>
        </div>
        
        <div className="h-32 bg-card/50 rounded-lg border border-border/30 mb-4 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">主频</span>
              <span className="text-primary font-mono font-bold">52.3 Hz</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">峰值幅度</span>
              <span className="text-primary font-mono font-bold">0.78</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">带宽</span>
              <span className="text-primary font-mono font-bold">15.6 Hz</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">谐波失真</span>
              <span className="text-primary font-mono font-bold">2.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};