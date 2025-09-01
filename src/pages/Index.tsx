
import { SensorVisualization } from "@/components/SensorVisualization";
import { ForceChart } from "@/components/ForceChart";
import { ContactParameters } from "@/components/ContactParameters";
import { SpectrumAnalysis } from "@/components/SpectrumAnalysis";
import { SurfaceRecognition } from "@/components/SurfaceRecognition";
import { AccuracyMetrics } from "@/components/AccuracyMetrics";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="h-screen bg-background text-foreground flex overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-foreground">触觉传感器分析系统</h2>
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
        <div className="flex-1 flex min-h-0">
          {/* Left Panel */}
          <div className="w-72 p-4 space-y-4 overflow-y-auto">
            <div className="h-[45%]">
              <ForceChart />
            </div>
            <div className="h-[45%]">
              <ContactParameters />
            </div>
          </div>

          {/* Center - Sensor Visualization */}
          <div className="flex-1 p-4 flex flex-col min-w-0">
            <div className="bg-gradient-to-br from-card to-secondary/50 border border-border rounded-xl p-4 shadow-xl relative overflow-hidden flex-1 min-h-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-bright/5 to-transparent pointer-events-none"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-bright rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-semibold text-foreground">触觉传感器可视化</h3>
                  </div>
                  <div className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-lg">
                    实时监测
                  </div>
                </div>
                <div className="flex-1 min-h-0 bg-card/30 rounded-lg border border-border/50 backdrop-blur-sm">
                  <SensorVisualization />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-72 p-4 space-y-4 overflow-y-auto">
            <div className="h-[30%]">
              <SpectrumAnalysis />
            </div>
            <div className="h-[30%]">
              <SurfaceRecognition />
            </div>
            <div className="h-[30%]">
              <AccuracyMetrics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
