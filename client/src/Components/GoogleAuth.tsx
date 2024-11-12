// import React from "react";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { FaGoogle } from "react-icons/fa";
// import { app } from "../Common/firebase";

// // Define props type
// type GoogleAuthProps = {
//   endPoint: string;
// };

// export const GoogleAuth = ({ endPoint }: GoogleAuthProps) => {
//   const handleGoogleClick = async (e: React.FormEvent) => {
//     e.preventDefault();
//     let googleLogger = null;
//     const auth = getAuth(app);
//     const provider = new GoogleAuthProvider();

//     provider.setCustomParameters({ prompt: "select_account" });
//     try {
//       await signInWithPopup(auth, provider).then((result) => {
//         googleLogger = result.user;

//        // Retrieve the ID token by awaiting the promise
//       const idToken = await googleLogger.getIdToken();

//       console.log(idToken); // Now you'll see the resolved token value

//       let googleFormData = { access_token: idToken };
//         // Send the token to your backend
//         // await axios.post(
//         //   `${process.env.REACT_APP_WIKI_API_URL}/google-auth/${endPoint}`,
//         //   googleFormData
//         //   // let googleFormData = { access_token: googleLogger.accessToken };
//         //   // axios.post(
//         //   //   `${process.env.REACT_APP_WIKI_API_URL}/google-auth/${endPoint}`,
//         //   //   googleFormData
//         // );
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <button onClick={handleGoogleClick}>
//       <FaGoogle /> Continue with Google
//     </button>
//   );
// };
import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import axios from "axios"; // Ensure axios is imported
import { app } from "../Common/firebase";
import { storeInSession } from "../utils/session";
import { useUser } from "../utils/UserContext";
import { UserAuthType } from "../utils/useAuthForm";
import { toast } from "react-toastify";

export const GoogleAuth = () => {
  const { signedUser, setSignedUser } = useUser();

  const handleGoogleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider); // Await sign-in result
      const googleLogger = result.user;

      // Await the ID token resolution
      const idToken = await googleLogger.getIdToken();
      console.log(idToken); // Now you have the resolved ID token

      let googleFormData = { access_token: idToken };

      // Send the token to your backend
      try {
        const response = await axios.post<UserAuthType>(
          `${process.env.REACT_APP_WIKI_API_URL}/google-auth`, //
          googleFormData
        );

        //storing data in the session
        storeInSession("user", JSON.stringify(response.data));
        setSignedUser(response.data);
        toast.success("Google authentication successfull");
        // console.log("Backend response:", response.data); // Handle response data
      } catch (err) {
        console.error(err);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {" "}
      <button onClick={handleGoogleClick}>
        <FaGoogle /> Continue with Google
      </button>
    </>
  );
};
