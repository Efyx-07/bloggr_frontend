'use client'
import useAdminStore from "@/stores/adminStore"

export default function TestComponent () {
    const {admin, token} = useAdminStore();
    return (
        <div className="
            fixed top-0 left-0 z-50 bg-black text-whiteRelief"
        >
            Test component
            {admin && 
                <div className="flex flex-col">
                    <p>id: {admin.id}</p>
                    <p>firstname: {admin.firstName}</p>
                    <p>lasname: {admin.lastName}</p>
                    <p>email: {admin.email}</p>
                    <p>token: {token}</p>
                </div>
            }
        </div>
    )
}