import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "text-2xl font-medium font-stretch-125% tracking-widest",
          className
        )}
      >
        NEXT
      </span>
      <span className={cn("text-2xl font-thin tracking-widest", className)}>
        SOURCING
      </span>
    </div>
  );
}
