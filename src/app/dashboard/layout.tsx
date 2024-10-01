import { LoggedOutAuthGuard } from '@/auth-guards';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoggedOutAuthGuard>{children}</LoggedOutAuthGuard>
    </>
  );
}
