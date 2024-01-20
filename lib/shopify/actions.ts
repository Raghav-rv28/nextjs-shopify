import { cookies } from 'next/headers';
import { getCustomerAccessToken } from '.';

export async function Login(props: { email: string; password: string }): Promise<string> {
  const data = await getCustomerAccessToken(props);
  const error = data.body.data.customerUserErrors;
  if (error?.code === undefined) {
    const { accessToken, expiresAt } = data.body.data.customerAccessToken;
    // Store data in cookies.
    cookies().set(`accessToken+${props.email}`, accessToken);
    cookies().set(`expiresAt+${props.email}`, expiresAt.toLocaleDateString());

    return 'Logged In';
  }
  return data.body.data.customerUserErrors.message;
}

export async function isLoggedIn({ email }: { email: string }) {
  const userSessionAccessToken = cookies().get(`accessToken+${email}`);
  const userSessionAccessTokenExp = cookies().get(`expiresAt+${email}`);
  if (userSessionAccessToken !== undefined && userSessionAccessTokenExp !== undefined) {
    console.log(userSessionAccessToken, userSessionAccessTokenExp);
    return true;
  }
  return false;
}
