import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/api/uploadthing",
]);

export default clerkMiddleware((auth, req: NextRequest) => {
  const { userId, redirectToSignIn } = auth();

  if (userId) {
    return NextResponse.next();
  }

  if (!userId && !isPublicRoute(req))
    return redirectToSignIn({ returnBackUrl: req.url });
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
