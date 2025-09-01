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
    <div className="bg-secondary rounded-lg p-3">
      <h3 className="text-sm font-semibold text-foreground mb-3 border-b border-border pb-2">
        接触参数
      </h3>
      <div className="space-y-2">
        {parameters.map((param, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{param.label}</span>
            <div className="flex items-center gap-1">
              <span className="text-cyan-bright font-mono font-medium">
                {param.value}
              </span>
              <span className="text-muted-foreground text-xs">{param.unit}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Status indicators */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">状态</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-force-vector rounded-full"></div>
            <span className="text-force-vector">稳定接触</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-muted-foreground">采样率</span>
          <span className="text-cyan-bright font-mono">1000 Hz</span>
        </div>
      </div>
    </div>
  );
};