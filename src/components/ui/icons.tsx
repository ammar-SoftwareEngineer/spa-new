import {
  Award,
  Building,
  Building2,
  CheckCircle2,
  CheckSquare,
  Eye,
  FileCheck,
  Flame,
  GraduationCap,
  Hotel,
  Landmark,
  Leaf,
  Network,
  Package,
  PenTool,
  Plane,
  Radio,
  Server,
  ShieldAlert,
  ShieldCheck,
  Target,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const iconMap = {
  Award,
  Building,
  Building2,
  CheckCircle2,
  CheckSquare,
  Eye,
  FileCheck,
  Flame,
  GraduationCap,
  Hotel,
  Landmark,
  Leaf,
  Network,
  Package,
  PenTool,
  Plane,
  Radio,
  Server,
  ShieldAlert,
  ShieldCheck,
  Target,
  Users,
  Wallet,
  Wrench,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

type DynamicIconProps = LucideProps & {
  name: string;
};

// icon name comes from the API as a string, unknown names fall back to Building
export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = iconMap[name as IconName] ?? Building;
  return <Icon {...props} />;
}
