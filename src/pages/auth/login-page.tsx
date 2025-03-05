import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LockIcon, MailIcon } from "lucide-react";
import { Link } from "react-router";

export default function LoginPage() {
  return (
    <div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className={cn("flex flex-col gap-6", "")}>
            <Card className="rounded-none border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center mx-auto">
                  <Logo className="text-3xl"/>
                </CardTitle>
                <CardDescription className="text-center mx-auto mt-3 text-base">
                  Sign in to start your session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <div className="relative">
                        <div className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                          <MailIcon className="h-4 w-4" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          className="w-full rounded bg-background pr-8"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <div className="relative">
                        <div className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                          <LockIcon className="h-4 w-4" />
                        </div>
                        <Input
                          id="password"
                          type="password"
                          required
                          placeholder="Password"
                          className="w-full rounded bg-background pr-8"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="remember"
                            className="rounded-none w-5 h-5"
                          />
                          <label htmlFor="remember" className="text-gray-500">
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <Button type="submit" className="rounded px-6">
                        Sign In
                      </Button>
                    </div>

                    <div className="flex items-center">
                      <Link
                        to="/forgot-password"
                        className="mr-auto inline-block text-sm underline-offset-4 underline"
                      >
                        I forgot my password
                      </Link>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
