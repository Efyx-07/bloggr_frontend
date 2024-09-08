// Décode le token et récupère adminId
// ===========================================================================================
export default function decodeTokenAndGetAdminId(token: string) {
  const tokenParts: string[] = token.split('.');
  const tokenPayload = JSON.parse(atob(tokenParts[1]));
  const adminId: number = tokenPayload.adminId;
  return adminId;
}
