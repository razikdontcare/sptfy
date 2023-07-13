import app from "@/fb";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore(app);

export default async function handler(req, res) {
  const { longurl, rid, cid } = req.body;

  const id = cid == "" ? rid : cid;

  switch (req.method) {
    case "POST":
      try {
        const querySnapshot = await getDoc(doc(db, "short", cid));
        if (querySnapshot.exists()) {
          return res.status(403).json({ exists: true });
        } else {
          await setDoc(doc(db, "short", id), {
            longurl,
            shorturl: "/" + id,
            id,
            click: 0,
          }).then(() => {
            return res.status(200).json({
              longurl,
              id,
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
