import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getData = (setData: (text: string) => void, slateId: string) => {
  const slateCollectionRef = doc(db, "slates", slateId);

  getDoc(slateCollectionRef).then((doc) => {
    if (!doc.exists()) {
      setDoc(slateCollectionRef, {
        text: "",
      });
    }
  });

  const unsubscribe = onSnapshot(slateCollectionRef, (snapshot) => {
    setData(snapshot.data()?.text);
  });

  return unsubscribe;
};

export const saveData = async (text: string, slateId: string) => {
  const slateCollectionRef = doc(db, "slates", slateId);
  await updateDoc(slateCollectionRef, {
    text,
  });
};
