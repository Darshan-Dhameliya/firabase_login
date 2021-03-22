const imgname = event.target.files[0].name;
const img = event.target.files[0];
const uploadTask = storage.ref(`images/${imgname}`).put(img);
uploadTask.on(
  "state_changed",
  (snapshot) => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
  },
  (error) => {
    console.log(error);
  },
  () => {
    storage
      .ref("images")
      .child(imgname)
      .getDownloadURL()
      .then((url) => {
        const id = localStorage.getItem("id");
        const body = { id: id, imageurl: url };
        axios.post("http://localhost:3020/changephoto", body).then((res) => {
          getdata();
        });
      });
  }
);
