import React from "react";
import app from "@/fb";
import { getFirestore, getDoc, doc } from "firebase/firestore";

const db = getFirestore(app);

export async function getServerSideProps({ params }) {
  const hash = params.short;
  const docSnap = await getDoc(doc(db, "short", `${hash}`));
  const docData = docSnap.data();

  if (docSnap.exists()) {
    return {
      redirect: {
        destination: docData.longurl,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}

const Short = () => {
  return <></>;
};

export default Short;
