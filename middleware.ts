import { authMiddleware } from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  debug: false,
  publicRoutes: (req) => {
    let returnVal = false;
    if (
      req.url === 'https://dj-teststore-nextjs-rupq.vercel.app/' ||
      req.url === 'http://localhost:3000/'
    )
      return !returnVal;
    ['/sign-in', '/sign-up', '/product', '/search', '/collection', '/pages'].forEach((val) => {
      if (req.url.includes(val)) {
        returnVal = true;
      }
    });
    return returnVal;
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
