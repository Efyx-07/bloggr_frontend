import LoggedOutAuthGuard from './auth-gard';

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
