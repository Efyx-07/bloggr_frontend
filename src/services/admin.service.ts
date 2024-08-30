import Admin from "@/interfaces/admin.interface";

const backendUrl: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

// Connecte l'Admin avec son email et son mot de passe - endpoint: .../admins/login
// ===========================================================================================
export async function login(email: Admin['email'], password: Admin['password']) {
    try {
        const response: Response = await fetch(`${backendUrl}/admins/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }) 
        });
        if(response.ok) {
            const data = await response.json();
            return data
        } else {
            throw new Error('Error while connecting: ' + response.statusText);
        }
    } catch (error){
        throw new Error('Error while connecting: ' + error);
    }
}