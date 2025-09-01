import { SensorVisualization } from "@/components/SensorVisualization";
import { ForceChart } from "@/components/ForceChart";
import { ContactParameters } from "@/components/ContactParameters";
import { SpectrumAnalysis } from "@/components/SpectrumAnalysis";
import { SurfaceRecognition } from "@/components/SurfaceRecognition";
import { AccuracyMetrics } from "@/components/AccuracyMetrics";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-foreground">触觉传感器分析系统</h2>
              <div className="flex bg-secondary rounded-lg px-3 py-1 gap-2">
                <span className="text-xs font-mono text-muted-foreground">DP-S2716</span>
                <span className="text-xs font-mono text-muted-foreground">DP-M2626</span>
                <span className="text-xs font-mono bg-primary text-primary-foreground px-2 py-0.5 rounded">DP-L3530</span>
                <span className="text-xs font-mono text-muted-foreground">IP-L5325</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                连接设备
              </button>
              <button className="bg-gradient-to-r from-cyan-bright to-blue-bright hover:from-cyan-bright/90 hover:to-blue-bright/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg">
                开始采集
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="flex-1 flex">
          {/* Left Panel */}
          <div className="w-80 p-6 space-y-6 overflow-y-auto">
            <ForceChart />
            <ContactParameters />
          </div>

          {/* Center - Sensor Visualization */}
          <div className="flex-1 p-6">
            <SensorVisualization />
          </div>

          {/* Right Panel */}
          <div className="w-80 p-6 space-y-6 overflow-y-auto">
            <SpectrumAnalysis />
            <SurfaceRecognition />
            <AccuracyMetrics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;