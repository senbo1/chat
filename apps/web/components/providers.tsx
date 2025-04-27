'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SocketProvider } from '@/context/SocketContext';
import { Toaster } from '@chat/ui/components/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <SocketProvider>{children}</SocketProvider>
      <Toaster />
    </NextThemesProvider>
  );
}
