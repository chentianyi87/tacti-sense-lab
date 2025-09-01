export const SurfaceRecognition = () => {
  const materials = [
    { name: "玻璃", confidence: 89.2, isActive: true },
    { name: "金属", confidence: 6.8, isActive: false },
    { name: "塑料", confidence: 2.3, isActive: false },
    { name: "木材", confidence: 1.1, isActive: false },
    { name: "纸张", confidence: 0.6, isActive: false }
  ];

  const surfaceProperties = [
    { label: "表面粗糙度", value: "Ra 0.12", unit: "μm" },
    { label: "摩擦系数", value: "0.45", unit: "" },
    { label: "弹性模量", value: "70.5", unit: "GPa" },
    { label: "硬度", value: "550", unit: "HV" }
  ];

  return (
    <div className="bg-gradient-to-br from-card to-secondary/50 border border-border rounded-xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-deep/5 to-transparent pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-deep rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-foreground">表面识别</h3>
          </div>
          <div className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
            AI分析
          </div>
        </div>
        
        {/* Material Recognition */}
        <div className="space-y-3 mb-6">
          <div className="text-sm text-muted-foreground mb-3">检测材料类型</div>
          {materials.map((material, index) => (
            <div key={index} className="bg-secondary/30 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${material.isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {material.name}
                </span>
                <span className={`text-lg font-bold font-mono ${material.isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {material.confidence.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-card/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    material.isActive 
                      ? 'bg-gradient-to-r from-primary to-cyan-bright' 
                      : 'bg-muted'
                  }`}
                  style={{ width: `${material.confidence}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Surface Properties */}
        <div className="border-t border-border/50 pt-4">
          <div className="text-sm text-muted-foreground mb-3">表面特性</div>
          <div className="space-y-3">
            {surfaceProperties.map((prop, index) => (
              <div key={index} className="bg-secondary/30 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{prop.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-mono font-bold">
                      {prop.value}
                    </span>
                    {prop.unit && (
                      <span className="text-muted-foreground text-sm">{prop.unit}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">识别状态</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400">实时识别</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">处理时间</span>
            <span className="text-primary font-mono">23.5 ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};