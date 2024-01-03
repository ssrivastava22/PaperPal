import React, { useEffect } from 'react';

const GoogleSignIn = () => {
  useEffect(() => {
    // Load the Google Platform Library
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => initGoogleSignIn();
    document.body.appendChild(script);
  }, []);

  const initGoogleSignIn = () => {
    // Initialize Google Sign-In
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
        // Add other config options here
      }).then(() => {
        // Render the sign-in button and set up the listener
        window.gapi.signin2.render('google-signin-button', {
          onsuccess: onSignIn,
        });
      });
    });
  };

  // Define the onSignIn function inside your component
  const onSignIn = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); 
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); 

    // Implement further actions here (e.g., updating state, calling Redux actions)
  };

  const signOut = () => {
    // Handle sign out
    // Implementation for signing out goes here
  };

  return (
    <div>
      <div id="google-signin-button"></div> {/* Google Sign-In button */}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default GoogleSignIn;
