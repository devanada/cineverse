"use client";

import { Button } from "@/components/ui/button";

import { FormActionResult, useFormAction } from "@/utils/hooks/use-form-action";

interface Props {
  actionFn: (
    prevState: FormActionResult,
    formData: FormData
  ) => Promise<FormActionResult>;
  label: string;
  inputValue: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
}

export default function ActionBtn(props: Props) {
  const [errorMsg, formAction] = useFormAction(props.actionFn);

  return (
    <form className="w-full" action={formAction}>
      <input type="hidden" name="media_id" value={props.inputValue} />
      <Button className="w-full" variant={props.variant} type="submit">
        {props.label}
      </Button>
    </form>
  );
}
