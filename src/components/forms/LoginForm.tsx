'use client';

import { useState } from 'react';
import type { LoginResult } from '@/types/loginResult';

export default function LoginForm({
  action,
}: {
  action: (formData: FormData) => Promise<LoginResult>;
}) {
  const [error, setError] = useState('');

  return (
    <form
      action={async (formData) => {
        const result = await action(formData);
        if (!result.success) {
          setError(result.message || 'Inloggning misslyckades');
        } else {
          window.location.href = '/dashboard';
        }
      }}
      className="flex flex-col gap-2"
    >
      <h2>Logga in</h2>
      <input name="email" type="email" placeholder="Email" required className="bg-white p-1 rounded" />
      <input name="password" type="password" placeholder="Password" required className="bg-white p-1 rounded" />
      <button type="submit" className="bg-purple-700 border-2 border-purple-700 text-white rounded-md py-2 font-bold hover:border-purple-900 hover:bg-purple-600">
        Logga in
      </button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
}
