import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  redirect(request.url.replace('account/login', 'sign-in'));
}
