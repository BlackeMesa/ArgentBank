import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, updateProfile } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { setUserProfile } from "../../store/reducers/userSlice";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [userProfile, setUserProfileState] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Pour afficher le formulaire d'édition

  // Utilisez useSelector pour récupérer le token du store Redux

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Rediriger si aucun token n'est trouvé
      return;
    }

    fetchUserProfile(token)
      .then((profile) => {
        dispatch(setUserProfile(profile));

        setUserProfileState(profile);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate, token, dispatch]);

  const user = useSelector((state) => state.user?.userProfile?.body);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const updatedProfile = await updateProfile(token, { firstName: firstName, lastName: lastName });
      dispatch(setUserProfile(updatedProfile)); // Mettre à jour l'état global avec le profil mis à jour
      setIsEditing(false); // Cacher le formulaire d'édition
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleNameChange = (e) => {
    const { value, name } = e.target;
    const regex = /^[A-Za-z]+$/; // Regex pour valider les lettres uniquement

    // Permet la suppression si le champ est vide (pour gérer les backspaces)
    if (value === "" || regex.test(value)) {
      name === "firstName" ? setFirstName(value) : setLastName(value);
    }
  };

  if (!userProfile || !user) return <div>Loading profile...</div>;

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <div>
            <h1>Welcome back</h1>
            <>
              <div className="edit-container">
                <div>
                  <input type="text" value={firstName} onChange={handleNameChange} name="firstName" placeholder="First Name" />
                  <input type="text" value={lastName} onChange={handleNameChange} name="lastName" placeholder="Last Name" />
                </div>
                <div>
                  <button className="edit-button" onClick={handleSave}>
                    Save
                  </button>
                  <button className="edit-button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </>
          </div>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {user.firstName} {user.lastName}
            </h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
