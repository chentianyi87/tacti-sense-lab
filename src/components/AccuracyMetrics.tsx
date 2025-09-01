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
    <div className="bg-secondary rounded-lg p-3">
      <h3 className="text-sm font-semibold text-foreground mb-3 border-b border-border pb-2">
        精度指标
      </h3>
      
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-card rounded-lg p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground">
                {metric.label}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-mono font-semibold ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground">
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
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">系统状态</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-force-vector rounded-full animate-pulse"></div>
            <span className="text-sm text-force-vector">运行正常</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">校准状态</span>
            <span className="text-force-vector font-mono">已校准</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">上次校准</span>
            <span className="text-cyan-bright font-mono">2024-09-01</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">运行时间</span>
            <span className="text-cyan-bright font-mono">02:34:56</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">温度补偿</span>
            <span className="text-force-vector font-mono">已启用</span>
          </div>
        </div>
      </div>
    </div>
  );
};