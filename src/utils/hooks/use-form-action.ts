import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

import { IFailed } from "@/utils/types/api";

export type FormActionResult = Omit<IFailed, "status_code">;

const initialState: FormActionResult = {
  success: false,
  status_message: "",
};

export function useFormAction(
  props: (
    prevState: FormActionResult,
    formData: FormData
  ) => Promise<FormActionResult>
): [state: Awaited<FormActionResult>, dispatch: (payload: FormData) => void] {
  const [state, formAction] = useFormState(props, initialState);

  useEffect(() => {
    if (state.status_message !== "") {
      if (!state.success) {
        toast.error(state.status_message);
      } else {
        toast.success(state.status_message);
      }
    }
  }, [state]);

  return [state, formAction];
}
