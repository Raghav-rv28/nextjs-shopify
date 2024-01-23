'use client';

import { useAuth, useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrismaClient } from '@prisma/client';
import { signUpSchema, signUpSchemaType } from 'Schema/authentication';
import { Button } from 'components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Input } from 'components/ui/input';
import { toast } from 'components/ui/use-toast';
import { createCustomerFunction } from 'lib/shopify';
import { createCustomerInput } from 'lib/shopify/types';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import * as z from 'zod';

export default function Page() {
  const { isLoaded: signUpStatus, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [values, setValues] = React.useState<createCustomerInput>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: ''
  });
  const [code, setCode] = React.useState('');
  const router = useRouter();
  const prisma = new PrismaClient();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema)
  });
  const { isLoaded, userId } = useAuth();

  // Send user to home page if already signed in.
  React.useEffect(() => {
    if (userId !== null && isLoaded) {
      router.push('/');
    }
  }, [userId, isLoaded, router]);
  // This function will handle the user submitting their email and password
  const onSubmit = async (values: signUpSchemaType) => {
    if (!signUpStatus) return;
    const { email, password, firstName, lastName } = values;
    // SHOPIFY ADD ON
    setValues({
      firstName,
      lastName,
      email,
      password,
      phone: '+18036165148'
    });
    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code'
      });

      // Set 'verifying' true to display second form and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  // This function will handle the user submitting a code for verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpStatus) return;

    try {
      // Submit the code that the user provides to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code
      });

      if (completeSignUp.status !== 'complete') {
        // The status can also be `abandoned` or `missing_requirements`
        // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      // Check the status to see if it is complete
      // If complete, the user has been created -- set the session active
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        // SHOPIFY ADD ON
        const valReturned = await createCustomerFunction(values);
        if (valReturned === undefined)
          await prisma.user.create({
            data: {
              firstName: values.firstName,
              email: values.email,
              lastName: values.lastName
            }
          });
        // Redirect the user to a post sign-up route
        router.push(`/`);
      }
    } catch (err: any) {
      err.errors.map((error: any) => {
        toast({
          title: `${err.status} | ${error.message}`,
          description: error.longMessage,
          variant: 'destructive'
        });
      });
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  // Once the sign-up form was submitted, verifying was set to true and as a result, this verification form is presented to the user to input their verification code.
  if (verifying) {
    return (
      <form onSubmit={handleVerify}>
        <label id="code">Code</label>
        <input value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} />
        <button type="submit">Complete Sign Up</button>
      </form>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <div className="flex-column mt-10 flex min-h-[50vh] w-full justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-row justify-between">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input className="w-[225px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input className="w-[225px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="w-[500px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center pt-5">
            <Button className="w-[75%]" type="submit" disabled={form.formState.isSubmitting}>
              {!form.formState.isSubmitting && <span>Sign Up</span>}
              {form.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
