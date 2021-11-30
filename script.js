const firebaseConfig = {
  apiKey: "AIzaSyC50O-cyXYmYOn_UFoMZhHXTYSUJjXzkZU",
  authDomain: "voting-system-2.firebaseapp.com",
  projectId: "voting-system-2",
  storageBucket: "voting-system-2.appspot.com",
  messagingSenderId: "1022740023077",
  appId: "1:1022740023077:web:6a196dec813c3fe0d9fccc",
  measurementId: "G-96EGH4DC8B",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const FormSubmit = () => {
  const addUserData = () => {
    const candidate1 = "Lionsmith";
    const candidate2 = "Bearman";
    const candidate3 = "Runter";
    const candidate4 = "Bullseye";
    const selectValue = document.getElementById("voting_option").value;

    db.collection("users")
      .add({
        firstName: document.getElementById("user_form_first_name").value,
        lastName: document.getElementById("user_form_last_name").value,
        age: document.getElementById("user_form_age").value,
        livingIn: document.getElementById("user_form_lving").value,
        voted: true,
        votedFor: selectValue,
      })
      .then((docRef) => {
        console.log("Document Writen width ID : ", docRef.id);
      })
      .catch((error) => {
        console.log("Error adding document : ", error);
      });
  };
  addUserData();

  //Candidates votes
  const select_value = document.getElementById("voting_option").value;

  const setCandidatesVotes = () => {
    const candidatesCollectionRef = db
      .collection("candidates")
      .doc(select_value);
    candidatesCollectionRef.get().then((doc) => {
      const votingFieldRef = doc.data().votes;
      db.collection("candidates")
        .doc(select_value)
        .update({
          votes: votingFieldRef + 1,
        });
    });
  };
  setCandidatesVotes();
  document.getElementById("form").style.display = "none";
  window.open("ty_page.html");
};
