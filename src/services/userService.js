export async function fetchUserProfile(token) {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST", // Ou GET, selon la méthode attendue par votre backend
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attacher le token JWT ici
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Could not fetch user profile.");
    }
    return data; // Contient les informations de profil de l'utilisateur
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
export async function updateProfile(token, userData) {
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Could not update user profile");
  }
  return response.json();
}
