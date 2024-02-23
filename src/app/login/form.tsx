"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useFormState } from "react-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { onSubmitLogin } from "@/utils/actions/auth";
import { SubmitButton } from "./submit-btn";

const initialState = {
  message: "",
};

export default function Form() {
  const [state, formAction] = useFormState(onSubmitLogin, initialState);

  return (
    <Card className="w-full md:w-3/4 lg:w-1/2">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login into your account to explore the cineverse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4 items-center">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="johndoe"
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
      {state.message.length !== 0 ? (
        <CardFooter>
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        </CardFooter>
      ) : null}
    </Card>
  );
}
