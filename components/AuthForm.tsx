'use client';

import {
  useForm,
  type DefaultValues,
  type SubmitHandler,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { FIELD_NAMES, FIELD_TYPES } from '@/app/constants';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface Props<T extends FieldValues> {
  schema: ZodType<T, any, any>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: 'sign-in' | 'sign-up';
}

const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) => {
  const router = useRouter();

  const isSignIn = type === 'sign-in';
  // 1. Define your form.
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success){
      toast({
        title : 'Success',
        description : isSignIn ? 'You are signed in successfully' : 'You are signed up successfully',
      });
      router.push('/');
    }else {
      toast({
        title : `Error ${isSignIn ? 'signing in' : 'signing up'}`,
        description : result.error,
        variant : 'destructive',
      })
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? 'Welcome Back to BookWise' : 'Create your account'}
      </h1>
      <p className="text-base text-light-100">
        {isSignIn
          ? 'Access the vast collection of resources, and stay updated'
          : 'Please complete all fields and upload a valid university ID card to gain access to the library'}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === 'universityCard' ? (
                    <ImageUpload onFileChange={field.onChange}/>
                    ) : (
                      <Input
                        required
                        type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                        className="form-input"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? 'Sign in' : 'Sign up'}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "Don't have an account? " : 'Already have an account? '}
        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className="text-primary text-bold hover:underline"
        >
          {isSignIn ? 'Sign up' : 'Sign in'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
