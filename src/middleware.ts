import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/auth(.*)", "/portals(.*)", "/images(.*)"],
  ignoredRoutes: ["/chatbot"],
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}