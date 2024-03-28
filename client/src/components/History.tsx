import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { LogItem } from "./LogItem";
import { useActivityLog } from "@/hooks/useActivityLog";

export function History() {
  const { isLoading, error, activityLog } = useActivityLog();

  console.log({ activityLog });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>History</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>History</SheetTitle>
        </SheetHeader>

        {isLoading && <h2>Loading...</h2>}

        {error && <h2>Error: {error}</h2>}

        <ul className="p-5">
          {activityLog?.map((log) => (
            <LogItem key={log.id} log={log} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
