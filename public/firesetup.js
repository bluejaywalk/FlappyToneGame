// const config = {
//     apiKey: "AIzaSyCKHYhmb1Am0O-e8JbV4Pyyaq2wLORaZ-g",
//     authDomain: "firetest-v1-d8248.firebaseapp.com",
//     projectId: "firetest-v1-d8248",
//     storageBucket: "firetest-v1-d8248.appspot.com",
//     databaseURL: "https://firetest-v1-d8248-default-rtdb.firebaseio.com/",
//     messagingSenderId: "438571408099",
//     appId: "1:438571408099:web:280ec101b296c8ccddc3d6",
//     measurementId: "G-JVD3ZXJEKP"
//   };

const config = {
    apiKey: "AIzaSyCCi_NOkupqEBmG8mBwH6G7ClU7ZOQWOrA",
    authDomain: "flappy-tone-game.firebaseapp.com",
    databaseURL: "https://flappy-tone-game-default-rtdb.firebaseio.com",
    projectId: "flappy-tone-game",
    storageBucket: "flappy-tone-game.appspot.com",
    messagingSenderId: "692285837946",
    appId: "1:692285837946:web:93df222e964de23a3961c3"
  };
  firebase.initializeApp(config);
  console.log(firebase);
  database = firebase.database()
  
  var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          var user = authResult.user;
          var credential = authResult.credential;
          var isNewUser = authResult.additionalUserInfo.isNewUser;
          var providerId = authResult.additionalUserInfo.providerId;
          var operationType = authResult.operationType;
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect
          // automatically or whether we leave that to developer to handle.
          return false;
        }
    },
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: 'www.google.com',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
          window.location.assign('www.google.com');
        }
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      // ui.start('#firebaseui-auth-container', uiConfig);
    
    ui.start('#firebaseui-auth-container', uiConfig);
      