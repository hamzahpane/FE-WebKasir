import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Index() {
  const [loading, setLoading] = useState(true); // Ubah initial state menjadi true agar loading ditampilkan saat pertama kali rendering

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Setelah 5 detik, loading akan diatur menjadi false
    }, 5000);

    return () => clearTimeout(timer); // Membersihkan timeout saat komponen unmount
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {loading ? (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <ClipLoader
            color={"#D0021B"}
            loading={loading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        // Tambahkan konten situs web di sini
        <h1>Selamat datang!</h1>
      )}
    </div>
  );
}

export default Index;
