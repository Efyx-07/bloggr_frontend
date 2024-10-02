import { AuthGuard } from '@/auth-guards';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGuard redirectPath="/" shouldBeLoggedIn={true}>
        {children}
      </AuthGuard>
    </>
  );
}
