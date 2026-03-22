'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const baseUrl = process.env.API_BASE_URL || 'http://127.0.0.1:8787';

  try {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      if (res.status === 401) {
        return { error: 'Invalid credentials' };
      }
      return { error: 'Failed to connect to authentication server' };
    }

    const json = await res.json();
    const token = json.data?.token;

    if (token) {
      // Store the token in an HttpOnly cookie
      (await cookies()).set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
    } else {
      return { error: 'Invalid response from server' };
    }
  } catch (err) {
    return { error: 'An unexpected error occurred' };
  }

  // Redirect on success
  redirect('/');
}

export async function logoutAction() {
  (await cookies()).delete('auth-token');
  redirect('/login');
}
