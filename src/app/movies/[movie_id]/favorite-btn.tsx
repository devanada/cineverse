"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface Props {
  actionFn: (state: {
    message: string;
  }) => { message: string } | Promise<{ message: string }>;
}

const initialState = {
  message: "",
};

export default function FavoriteBtn(props: Props) {
  const [state, formAction] = useFormState(props.actionFn, initialState);

  useEffect(() => {
    if (state.message.length !== 0) {
      toast(state.message);
    }
  }, [state]);

  return (
    <form className="w-full" action={formAction}>
      <Button className="w-full" variant="default">
        Add to favorite
      </Button>
    </form>
  );
}
