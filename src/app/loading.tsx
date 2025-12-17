import { Box } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <Box className="w-12 h-12 text-slate-300" />
        <div className="h-4 w-32 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}
