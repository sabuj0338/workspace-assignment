import { authApi } from "@/api";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router";
import { z } from "zod";

const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean().optional().default(false),
});

export default function LoginPage() {
  const navigate = useNavigate();

  const auth = useAuthStore((state) => state.auth);
  const updateAuth = useAuthStore((state) => state.update);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rememberMe: false,
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const output = await authApi.login({ ...data });
    if (output) {
      updateAuth(output);
      localStorage.setItem(ACCESS_TOKEN_KEY, output.tokens.access.token);
      navigate("/");
    }
  }

  if (auth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className={cn("flex flex-col gap-6", "")}>
            <Card className="rounded-none border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center mx-auto">
                  <Logo className="text-3xl" />
                </CardTitle>
                <CardDescription className="text-center mx-auto mt-3 text-base">
                  Sign in to start your session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="flex flex-col gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                                  <MailIcon className="h-4 w-4" />
                                </div>
                                <Input
                                  placeholder="Email"
                                  className="w-full rounded bg-background pr-8"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                                  <LockIcon className="h-4 w-4" />
                                </div>
                                <Input
                                  placeholder="Password"
                                  className="w-full rounded bg-background pr-8"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FormField
                            control={form.control}
                            name="rememberMe"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="rounded-none w-5 h-5"
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor="rememberMe"
                                  className="text-gray-500"
                                >
                                  Remember Me
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="rounded px-6"
                          disabled={form.formState.isSubmitting}
                        >
                          Sign In
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <Link
                          to="/forgot-password"
                          className="inline-block text-sm underline-offset-4 underline"
                        >
                          I forgot my password
                        </Link>
                        <Link
                          to="/register"
                          className="inline-block text-sm underline-offset-4 underline"
                        >
                          Create a new account?
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
