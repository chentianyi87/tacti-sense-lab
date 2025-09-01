import { SensorVisualization } from "@/components/SensorVisualization";
import { ForceChart } from "@/components/ForceChart";
import { ContactParameters } from "@/components/ContactParameters";
import { SpectrumAnalysis } from "@/components/SpectrumAnalysis";
import { SurfaceRecognition } from "@/components/SurfaceRecognition";
import { AccuracyMetrics } from "@/components/AccuracyMetrics";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex bg-secondary rounded px-3 py-1">
              <span className="text-sm font-mono text-muted-foreground mr-2">DP-S2716</span>
              <span className="text-sm font-mono text-muted-foreground mr-2">DP-M2626</span>
              <span className="text-sm font-mono bg-primary text-primary-foreground px-2 rounded">DP-L3530</span>
              <span className="text-sm font-mono text-muted-foreground ml-2">IP-L5325</span>
              <span className="text-sm font-mono text-muted-foreground ml-2">IP-M3025</span>
              <span className="text-sm font-mono text-muted-foreground ml-2">IP-M2324</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-medium">
              打开
            </button>
            <button className="bg-cyan-bright text-background px-4 py-2 rounded text-sm font-medium">
              开始
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Center - Sensor Visualization */}
        <div className="flex-1 p-6">
          <SensorVisualization />
        </div>

        {/* Right Panel */}
        <div className="w-96 bg-card border-l border-border p-4 space-y-4 overflow-y-auto">
          {/* Data Sampling Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">数据采样</span>
              <div className="flex gap-2">
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">
                  升级
                </button>
                <button className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm">
                  设置
                </button>
                <button className="bg-cyan-bright text-background px-3 py-1 rounded text-sm">
                  打开文件夹
                </button>
              </div>
            </div>
            
            {/* Port Selection */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">端口</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((port) => (
                  <button
                    key={port}
                    className={`w-6 h-6 text-xs rounded ${
                      port === 5 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-muted'
                    }`}
                  >
                    {port}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Force Charts */}
          <ForceChart />

          {/* Contact Parameters */}
          <ContactParameters />

          {/* Spectrum Analysis */}
          <SpectrumAnalysis />

          {/* Surface Recognition */}
          <SurfaceRecognition />

          {/* Accuracy Metrics */}
          <AccuracyMetrics />
        </div>
      </div>
    </div>
  );
};

export default Index;