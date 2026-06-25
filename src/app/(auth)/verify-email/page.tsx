"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setStatus("error");
      setMessage("No verification token provided");
    }
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Your email has been verified successfully!");
      } else {
        setStatus("error");
        setMessage(data.error || "Verification failed");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An error occurred during verification");
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center animate-pulse">
                <RefreshCw className="w-8 h-8 text-purple-600 animate-spin" />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Verifying Email</h1>
              <p className="text-gray-600 dark:text-gray-400">Please wait while we verify your email address...</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Email Verified!</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
              <Button href="/login" variant="primary" size="lg">
                Continue to Login
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Verification Failed</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
              <div className="flex flex-col gap-3">
                <Button href="/register" variant="primary" size="lg">
                  Create New Account
                </Button>
                <Link href="/login" className="text-purple-600 hover:underline">
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-12">Loading...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}
