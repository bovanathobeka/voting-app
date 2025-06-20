import { useState, useRef } from "react";
import { Camera, User } from "lucide-react";

export default function ProfileHost() {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setShowProfileMenu(false);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      setShowCoverMenu(false);
    }
  };

  const handleRemoveProfile = () => {
    setProfileImage(null);
    setShowProfileMenu(false);
  };

  const handleRemoveCover = () => {
    setCoverImage(null);
    setShowCoverMenu(false);
  };

  const getCompanyName = () => "OpenAI";

  return (
    <div style={styles.profileContainer}>
      <div style={styles.coverPhoto}>
        {coverImage && <img src={coverImage} alt="Cover" style={styles.coverImage} />}
        <div style={styles.coverCameraContainer}>
          <button onClick={() => setShowCoverMenu(!showCoverMenu)} style={styles.cameraButton}>
            <Camera style={styles.icon} />
          </button>
          {showCoverMenu && (
            <div style={styles.menuDropdown}>
              <button onClick={() => coverInputRef.current?.click()} style={styles.menuItem}>
                {coverImage ? "Change Cover" : "Add Cover"}
              </button>
              {coverImage && (
                <button onClick={handleRemoveCover} style={{ ...styles.menuItem, ...styles.remove }}>
                  Remove Cover
                </button>
              )}
            </div>
          )}
        </div>
        <input type="file" accept="image/*" onChange={handleCoverChange} ref={coverInputRef} style={styles.hidden} />
      </div>

      <div style={styles.profilePictureContainer}>
        {profileImage ? (
          <img src={profileImage} alt="Profile" style={styles.profileImage} />
        ) : (
          <div style={styles.defaultIcon}>
            <User style={styles.iconLarge} />
          </div>
        )}
        <div style={styles.profileCameraContainer}>
          <button onClick={() => setShowProfileMenu(!showProfileMenu)} style={styles.cameraButton}>
            <Camera style={styles.icon} />
          </button>
          {showProfileMenu && (
            <div style={styles.menuDropdown}>
              <button onClick={() => fileInputRef.current?.click()} style={styles.menuItem}>
                {profileImage ? "Change Profile" : "Add Profile"}
              </button>
              {profileImage && (
                <button onClick={handleRemoveProfile} style={{ ...styles.menuItem, ...styles.remove }}>
                  Remove Profile
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={styles.companyName}>{getCompanyName()}</div>

      <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={styles.hidden} />
    </div>
  );
}

const styles = {
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  coverPhoto: {
    position: "relative",
    width: "100%",
    height: "240px",
    backgroundColor: "#ccc",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  profilePictureContainer: {
    position: "relative",
    marginTop: "-72px",
    width: "144px",
    height: "144px",
    borderRadius: "50%",
    border: "4px solid white",
    backgroundColor: "white",
    overflow: "visible",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
  },
  defaultIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  iconLarge: {
    width: "64px",
    height: "64px",
    color: "#9ca3af",
  },
  cameraButton: {
    backgroundColor: "white",
    padding: "8px",
    borderRadius: "9999px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    border: "none",
  },
  coverCameraContainer: {
    position: "absolute",
    bottom: "16px",
    right: "16px",
  },
  profileCameraContainer: {
    position: "absolute",
    bottom: "0",
    right: "0",
  },
  icon: {
    width: "20px",
    height: "20px",
    color: "#4b5563",
  },
  iconSmall: {
    width: "16px",
    height: "16px",
    color: "#4b5563",
  },
  companyName: {
    marginTop: "16px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1f2937",
  },
  hidden: {
    display: "none",
  },
  menuDropdown: {
    position: "absolute",
    top: "40px",
    right: 0,
    width: "160px",
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
    zIndex: 10,
  },
  menuItem: {
    width: "100%",
    padding: "8px 16px",
    textAlign: "left",
    backgroundColor: "white",
    border: "none",
    cursor: "pointer",
  },
  remove: {
    color: "#ef4444",
  },
};
