async function login(email, password) {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Une erreur est survenue");
    }
  } catch (error) {
    console.error("Erreur de connexion", error);
    throw error;
  }
}

export { login };
