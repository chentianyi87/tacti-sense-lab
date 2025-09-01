import { useEffect, useRef, useState } from "react";

interface ForceData {
  time: number;
  fx: number;
  fy: number;
  fz: number;
}

export const ForceChart = () => {
  const [forceData, setForceData] = useState<ForceData[]>([]);
  const canvasRefs = {
    fx: useRef<HTMLCanvasElement>(null),
    fy: useRef<HTMLCanvasElement>(null),
    fz: useRef<HTMLCanvasElement>(null)
  };

  const currentValues = {
    fx: forceData.length > 0 ? forceData[forceData.length - 1].fx : -0.1,
    fy: forceData.length > 0 ? forceData[forceData.length - 1].fy : 0.9,
    fz: forceData.length > 0 ? forceData[forceData.length - 1].fz : 3.7
  };

  useEffect(() => {
    // Generate realistic force data
    const generateData = () => {
      const newData: ForceData[] = [];
      for (let i = 0; i < 100; i++) {
        const time = i * 0.1;
        newData.push({
          time,
          fx: -0.1 + Math.sin(time * 2) * 0.05 + (Math.random() - 0.5) * 0.02,
          fy: 0.9 + Math.cos(time * 1.5) * 0.1 + (Math.random() - 0.5) * 0.03,
          fz: 3.7 + Math.sin(time * 0.8) * 0.3 + (Math.random() - 0.5) * 0.1
        });
      }
      setForceData(newData);
    };

    generateData();
    const interval = setInterval(() => {
      setForceData(prev => {
        const newPoint: ForceData = {
          time: prev.length * 0.1,
          fx: -0.1 + Math.sin(prev.length * 0.2) * 0.05 + (Math.random() - 0.5) * 0.02,
          fy: 0.9 + Math.cos(prev.length * 0.15) * 0.1 + (Math.random() - 0.5) * 0.03,
          fz: 3.7 + Math.sin(prev.length * 0.08) * 0.3 + (Math.random() - 0.5) * 0.1
        };
        return [...prev.slice(-99), newPoint];
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const drawChart = (
    canvas: HTMLCanvasElement,
    data: number[],
    color: string,
    range: { min: number; max: number }
  ) => {
    const ctx = canvas.getContext('2d');
    if (!ctx || data.length === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = 'hsl(220, 25%, 10%)';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'hsl(220, 25%, 20%)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = (i / 4) * height;
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

    // Draw data line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const normalizedValue = (value - range.min) / (range.max - range.min);
      const y = height - (normalizedValue * height);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw current value indicator
    if (data.length > 0) {
      const lastValue = data[data.length - 1];
      const normalizedValue = (lastValue - range.min) / (range.max - range.min);
      const y = height - (normalizedValue * height);
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(width - 5, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    if (forceData.length === 0) return;

    const fxData = forceData.map(d => d.fx);
    const fyData = forceData.map(d => d.fy);
    const fzData = forceData.map(d => d.fz);

    Object.entries(canvasRefs).forEach(([key, ref]) => {
      const canvas = ref.current;
      if (!canvas) return;

      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }

      let data: number[], color: string, range: { min: number; max: number };
      
      switch (key) {
        case 'fx':
          data = fxData;
          color = 'hsl(0, 75%, 60%)';
          range = { min: -0.2, max: 0.2 };
          break;
        case 'fy':
          data = fyData;
          color = 'hsl(120, 75%, 60%)';
          range = { min: 0.5, max: 1.3 };
          break;
        case 'fz':
          data = fzData;
          color = 'hsl(240, 75%, 60%)';
          range = { min: 0, max: 8 };
          break;
        default:
          return;
      }

      drawChart(canvas, data, color, range);
    });
  }, [forceData]);

  const forceCharts = [
    { key: 'fx', label: 'Fx', value: currentValues.fx, color: 'text-chart-fx' },
    { key: 'fy', label: 'Fy', value: currentValues.fy, color: 'text-chart-fy' },
    { key: 'fz', label: 'Fz', value: currentValues.fz, color: 'text-chart-fz' }
  ];

  return (
    <div className="space-y-3">
      {forceCharts.map(({ key, label, value, color }) => (
        <div key={key} className="bg-secondary rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-mono font-semibold ${color}`}>{label}</span>
            <span className={`text-lg font-mono ${color}`}>
              {value.toFixed(1)}
            </span>
          </div>
          <div className="h-12 bg-card rounded border border-border">
            <canvas
              ref={canvasRefs[key as keyof typeof canvasRefs]}
              className="w-full h-full"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};