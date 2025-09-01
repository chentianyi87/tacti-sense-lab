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
    <div className="bg-secondary rounded-lg p-3">
      <h3 className="text-sm font-semibold text-foreground mb-3 border-b border-border pb-2">
        表面识别
      </h3>
      
      {/* Material Recognition */}
      <div className="space-y-2 mb-4">
        <div className="text-xs text-muted-foreground mb-2">检测材料类型</div>
        {materials.map((material, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className={`text-sm ${material.isActive ? 'text-force-vector font-medium' : 'text-muted-foreground'}`}>
              {material.name}
            </span>
            <div className="flex items-center gap-2 flex-1 ml-3">
              <div className="flex-1 h-2 bg-card rounded overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    material.isActive 
                      ? 'bg-force-vector' 
                      : 'bg-grid-secondary'
                  }`}
                  style={{ width: `${material.confidence}%` }}
                />
              </div>
              <span className={`text-xs font-mono w-12 text-right ${
                material.isActive ? 'text-force-vector' : 'text-muted-foreground'
              }`}>
                {material.confidence.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Surface Properties */}
      <div className="border-t border-border pt-3">
        <div className="text-xs text-muted-foreground mb-2">表面特性</div>
        <div className="space-y-1">
          {surfaceProperties.map((prop, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{prop.label}</span>
              <div className="flex items-center gap-1">
                <span className="text-cyan-bright font-mono">
                  {prop.value}
                </span>
                {prop.unit && (
                  <span className="text-muted-foreground">{prop.unit}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">识别状态</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-force-vector rounded-full animate-pulse"></div>
            <span className="text-force-vector">实时识别</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-muted-foreground">处理时间</span>
          <span className="text-cyan-bright font-mono">23.5 ms</span>
        </div>
      </div>
    </div>
  );
};