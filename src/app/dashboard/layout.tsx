import AuthGuard from './auth-guard';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGuard>{children}</AuthGuard>
    </>
  );
}
