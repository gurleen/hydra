import type { HexColor } from "@/shared/types";

export type RectProps = {
  width: number;
  height: number;
  color: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
};

export function ensureHexColor(rawColor: string): HexColor {
  return (rawColor.startsWith("#") ? rawColor : `#${rawColor}`) as HexColor;
}

export function Rect({ width, height, color, children, className, id }: RectProps) {
  return (
    <div id={id} className={className} 
      style={{ 
        width: `${width}px`, 
        height: `${height}px`, 
        backgroundColor: ensureHexColor(color), 
        overflow: "hidden" 
      }}
    >
      {children}
    </div>
  );
}