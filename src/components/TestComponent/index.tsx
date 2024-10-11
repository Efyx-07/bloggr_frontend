'use client';
import useAdminStore from '@/stores/adminStore';

export default function TestComponent() {
  const { admin, token, isLogged } = useAdminStore();
  return (
    <div
      className="visible
            fixed bottom-0 left-0 z-50 max-w-[15rem] bg-black75 text-whiteRelief overflow-hidden p-4 text-sm"
    >
      {admin && (
        <div className="flex flex-col gap-2">
          <p>id: {admin.id}</p>
          <p>firstname: {admin.firstName}</p>
          <p>lasname: {admin.lastName}</p>
          <p>email: {admin.email}</p>
          <p>token: {token ? token : 'null'}</p>
          <p>is logged: {isLogged ? 'true' : 'false'}</p>
        </div>
      )}
    </div>
  );
}
