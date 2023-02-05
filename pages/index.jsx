import React, { useState } from "react";
import Head from "next/head";

import app from "@/fb";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore(app);

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [username, setUsername] = useState("");

  const [urlId, setUrlId] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [showError, setShowError] = useState(false);

  class RandomID {
    constructor() {
      this.id = "";
      this.char =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      this.charLength = this.char.length;
      for (let i = 0; i < 6; i++) {
        this.id += this.char.charAt(
          Math.floor(Math.random() * this.charLength)
        );
      }
    }
  }

  const shorten = async () => {
    setShowError(false);
    const result = new RandomID().id;

    if (username == "") {
      setUrlId(result);
      await setDoc(doc(db, "short", result), {
        longurl: longUrl,
        shorturl: "/" + result,
        id: result,
        click: 0,
      })
        .then(() => {
          setShowUrl(true);
        })
        .catch((error) => {
          console.error(error);
          setShowUrl(false);
        });
    } else {
      const querySnapshot = await getDoc(doc(db, "short", username));
      if (querySnapshot.exists()) {
        setShowError(true);
      } else {
        setUrlId(username);
        await setDoc(doc(db, "short", username), {
          longurl: longUrl,
          shorturl: "/" + username,
          id: username,
          click: 0,
        })
          .then(() => {
            setShowUrl(true);
          })
          .catch((error) => {
            console.error(error);
            setShowUrl(false);
          });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Spotify Link Shortener - sptfy.tech</title>
        <meta name="description" content="Spotify URL Shortener!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">sptfy.tech</h1>
            <p className="py-6">Free Spotify URL Shortener just for you.</p>
          </div>
          {username != "" && (
            <div className="alert shadow-lg">
              <div>
                <span className="font-bold">Preview: </span>
                <span>sptfy.tech/{username}</span>
              </div>
            </div>
          )}
          {showError && (
            <div className="alert alert-error shadow-lg">
              <div>
                <span>
                  URL with that id already exists. use another id or left it
                  blank for random id
                </span>
              </div>
            </div>
          )}
          {showUrl && (
            <div className="alert alert-success shadow-lg">
              <div>
                <span className="font-bold">Success!</span>
                <span>
                  Your URL is{" "}
                  <a className="link link-hover" href={"/" + urlId}>
                    sptfy.tech/{urlId}
                  </a>
                </span>
              </div>
            </div>
          )}
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Spotify Link</span>
                </label>
                <input
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  type="text"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Your Custom ID / Spotify Username {"(Optional)"}
                  </span>
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button
                  disabled={longUrl == ""}
                  onClick={shorten}
                  className="btn btn-primary"
                >
                  Shorten!
                </button>
              </div>
            </div>
          </div>

          <footer className="footer-center p-4 text-base-content">
            <div>
              <p>
                made with ♥️ by{" "}
                <a
                  className="link link-hover"
                  href="https://www.instagram.com/razikdontcare"
                >
                  razikdontcare
                </a>
                .
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
