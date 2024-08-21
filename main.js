  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwZk_BSxdm6_VJsVPI2Ne8S3RO5pi0-lg",
  authDomain: "paisal-abret.firebaseapp.com",
  projectId: "paisal-abret",
  storageBucket: "paisal-abret.appspot.com",
  messagingSenderId: "368318578592",
  appId: "1:368318578592:web:491e88e8b6eee503d72ec5",
  measurementId: "G-7Q534CCZNV"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarmapel() {
  const refDokumen = collection(db, "jadwal-mapel");
  const kueri = query(refDokumen, orderBy("mapel"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      hari: dok.data().hari,
      waktu: dok.data().waktu,
      kelas: dok.data().kelas,
      mapel: dok.data().mapel,
      gurumapel:dok.data().gurumapel
    });
  });


  return hasil
}

//export function formatAngka(x) {
//return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
  
  export async function tambahjadwalmapel(hari, waktu, kelas, mapel, gurumapel) {
  try {
    const dokRef = await addDoc(collection(db, 'jadwal-mapel'), {
      hari: hari,
      waktu: waktu,
      kelas: kelas,
      mapel: mapel,
     gurumapel:gurumapel
    });
    console.log('berhasil menembah jadwal ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah jadwal' + e);
  }
}

//fungsi untuk hapus data
export async function hapusmapel(docId) {
  await deleteDoc(doc(db, "jadwal-mapel", docId));
}
//fungsi untuk ubah data
export async function ubahdaftarmapel(docId, hari, waktu, kelas, mapel, gurumapel) {
  await updateDoc(doc(db, "jadwal-mapel", docId), {
    hari: hari,
    waktu: waktu,
    kelas: kelas,
    mapel: mapel,
    gurumapel: gurumapel
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambildaftarmapel(docId) {
  const docRef = await doc(db, "jadwal-mapel", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}