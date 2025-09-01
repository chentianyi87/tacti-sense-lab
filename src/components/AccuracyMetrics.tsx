export const AccuracyMetrics = () => {
  const metrics = [
    {
      label: "信噪比 (SNR)",
      value: "42.3",
      unit: "dB",
      status: "excellent",
      description: "信号质量优秀"
    },
    {
      label: "灵敏度",
      value: "0.025",
      unit: "mN",
      status: "good",
      description: "检测精度良好"
    },
    {
      label: "空间分辨率",
      value: "0.8",
      unit: "mm",
      status: "good",
      description: "位置精度适中"
    },
    {
      label: "频率响应",
      value: "500",
      unit: "Hz",
      status: "excellent",
      description: "动态响应优秀"
    },
    {
      label: "线性度",
      value: "0.12",
      unit: "%FS",
      status: "excellent",
      description: "线性误差很小"
    },
    {
      label: "重复性",
      value: "±0.05",
      unit: "%",
      status: "good",
      description: "测量一致性良好"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-force-vector";
      case "good":
        return "text-cyan-bright";
      case "warning":
        return "text-sensor-active";
      case "error":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-force-vector";
      case "good":
        return "bg-cyan-bright";
      case "warning":
        return "bg-sensor-active";
      case "error":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-secondary/50 border border-border rounded-xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-foreground">精度指标</h3>
          </div>
          <div className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
            系统性能
          </div>
        </div>
        
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-secondary/30 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  {metric.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-mono font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {metric.unit}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {metric.description}
                </span>
                <div className={`w-2 h-2 rounded-full ${getStatusIndicator(metric.status)}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall System Status */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-foreground">系统状态</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">运行正常</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-3 border border-border/50">
              <div className="flex justify-between">
                <span className="text-muted-foreground">校准状态</span>
                <span className="text-green-400 font-mono">已校准</span>
              </div>
            </div>
            <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-3 border border-border/50">
              <div className="flex justify-between">
                <span className="text-muted-foreground">上次校准</span>
                <span className="text-primary font-mono">2024-09-01</span>
              </div>
            </div>
            <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-3 border border-border/50">
              <div className="flex justify-between">
                <span className="text-muted-foreground">运行时间</span>
                <span className="text-primary font-mono">02:34:56</span>
              </div>
            </div>
            <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-3 border border-border/50">
              <div className="flex justify-between">
                <span className="text-muted-foreground">温度补偿</span>
                <span className="text-green-400 font-mono">已启用</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};