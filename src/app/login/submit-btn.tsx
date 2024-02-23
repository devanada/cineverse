"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" type="submit" disabled={pending} aria-disabled={pending}>
      Login
    </Button>
  );
}
