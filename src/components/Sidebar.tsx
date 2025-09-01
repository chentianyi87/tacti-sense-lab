import { Home, Settings, BarChart3, Activity, Layers, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { YimuLogo } from "./YimuLogo";

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
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-variant flex items-center justify-center text-white">
            <YimuLogo size="md" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">YIMU-一目</h1>
            <p className="text-xs text-muted-foreground">触觉传感分析</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 ${
                item.active 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-sidebar-border">
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