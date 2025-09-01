
import { Home, Settings, BarChart3, Activity, Layers, Zap } from "lucide-react";
import { Button } from "./ui/button";

export const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "概览", active: true },
    { icon: Activity, label: "实时监控", active: false },
    { icon: BarChart3, label: "数据分析", active: false },
    { icon: Layers, label: "传感器", active: false },
    { icon: Zap, label: "校准", active: false },
    { icon: Settings, label: "设置", active: false },
  ];

  return (
    <div className="w-44 bg-sidebar border-r border-sidebar-border flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-bright flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-sidebar-foreground">TactileSense</h1>
            <p className="text-xs text-muted-foreground">Pro Analysis</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-10 text-sm ${
                item.active 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </nav>

      {/* Status */}
      <div className="p-3 border-t border-sidebar-border flex-shrink-0">
        <div className="bg-sidebar-accent rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-sidebar-foreground">系统状态</span>
          </div>
          <p className="text-xs text-muted-foreground">传感器正常运行</p>
        </div>
      </div>
    </div>
  );
};
