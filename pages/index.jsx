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

  const isDisabled =
    longUrl == "" ? true : longUrl.includes("spotify.com") ? false : true;
  const isSpotify = longUrl.includes("spotify.com");

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

  const createUrl = async () => {
    setShowError(false);
    const result = new RandomID().id;

    setUrlId(result);
    const res = await fetch("/api/create", {
      method: "post",
      body: JSON.stringify({
        longurl: longUrl,
        rid: result,
        cid: username || "",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    try {
      if (res.ok) {
        setShowUrl(true);
        setUrlId(data.id);
      } else {
        if (res.status == 403) {
          setShowError(true);
        } else {
          throw res.status;
        }
      }
    } catch (error) {
      console.error(error);
      setShowUrl(false);
    }
  };

  return (
    <>
      <Head>
        <title>Spotify Link Shortener - sptfy.tech</title>
        <meta name="description" content="Free " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="title" content="Spotify Link Shortener - sptfy.tech" />
        <meta
          name="description"
          content="sptfy.tech is the ultimate solution for all your Spotify URL shortening needs. "
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sptfy.tech/" />
        <meta
          property="og:title"
          content="Spotify Link Shortener - sptfy.tech"
        />
        <meta
          property="og:description"
          content="sptfy.tech is the ultimate solution for all your Spotify URL shortening needs. "
        />
        <meta property="og:image" content="logo.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sptfy.tech/" />
        <meta
          property="twitter:title"
          content="Spotify Link Shortener - sptfy.tech"
        />
        <meta
          property="twitter:description"
          content="sptfy.tech is the ultimate solution for all your Spotify URL shortening needs. "
        />
        <meta property="twitter:image" content="logo.png" />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="max-w-md">
            <div className="text-center">
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
            {!isSpotify && longUrl != "" && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <span>{"Your URL doesn't seem to be a Spotify Link."}</span>
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
                    disabled={isDisabled}
                    onClick={createUrl}
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
      </div>
    </>
  );
}
