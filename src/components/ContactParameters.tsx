export const ContactParameters = () => {
  const parameters = [
    { label: "接触面积", value: "12.5", unit: "mm²" },
    { label: "平均压力", value: "2.34", unit: "kPa" },
    { label: "峰值压力", value: "4.78", unit: "kPa" },
    { label: "接触刚度", value: "156.2", unit: "N/m" },
    { label: "接触中心", value: "(2.1, -0.8)", unit: "mm" },
    { label: "形心偏移", value: "0.42", unit: "mm" }
  ];

  return (
    <div className="bg-gradient-to-br from-card to-secondary/50 border border-border rounded-xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-bright/5 to-transparent pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-bright rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-foreground">接触参数</h3>
          </div>
          <div className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
            实时更新
          </div>
        </div>
        
        <div className="space-y-4">
          {parameters.map((param, index) => (
            <div key={index} className="bg-secondary/30 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{param.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary font-mono">
                    {param.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{param.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Status indicators */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">系统状态</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400">稳定接触</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">采样率</span>
            <span className="text-primary font-mono">1000 Hz</span>
          </div>
        </div>
      </div>
    </div>
  );
};