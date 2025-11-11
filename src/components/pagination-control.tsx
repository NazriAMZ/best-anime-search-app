import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  current: number;
  total: number;
  onPage: (p: number) => void;
}

export default function PaginationControls({
  current,
  total,
  onPage,
}: PaginationControlsProps) {
  if (total <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPage(current - 1)}
        disabled={current === 1}
      >
        Prev
      </Button>

      {start > 1 && (
        <>
          <Button variant="ghost" size="sm" onClick={() => onPage(1)}>
            1
          </Button>
          {start > 2 && <span className="text-gray-400">…</span>}
        </>
      )}

      {pages.map((p) => (
        <Button
          key={p}
          variant={p === current ? "default" : "outline"}
          size="sm"
          onClick={() => onPage(p)}
          aria-current={p === current ? "page" : undefined}
        >
          {p}
        </Button>
      ))}

      {end < total - 1 && <span className="text-gray-400">…</span>}
      {end < total && (
        <Button variant="ghost" size="sm" onClick={() => onPage(total)}>
          {total}
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPage(current + 1)}
        disabled={current === total}
      >
        Next
      </Button>
    </div>
  );
}
