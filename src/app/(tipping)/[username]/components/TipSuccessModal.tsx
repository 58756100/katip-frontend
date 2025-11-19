"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function TipSuccessModal() {
  const open = false; // TODO: connect to tip store

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tip Sent Successfully! 🎉</DialogTitle>
        </DialogHeader>

        <p className="text-center mt-2 text-muted-foreground">
          Thank you for supporting this provider.
        </p>

        <Button className="mt-6 w-full">Close</Button>
      </DialogContent>
    </Dialog>
  );
}
