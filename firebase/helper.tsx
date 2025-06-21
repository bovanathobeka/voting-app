import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const saveUserProfile = async (
  uid: string,
  email: string,
  fullName: string,
  role: 'artist' | 'hoster' | 'voter'
) => {
  await setDoc(doc(db, "users", uid), {
    uid,
    email,
    fullName,
    role,
    createdAt: new Date(),
  });
};
