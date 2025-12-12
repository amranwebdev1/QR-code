import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { encode as utf8Encode } from "utf8";
const App = () => {
  const [text, setText] = useState("");
  const [logo, setLogo] = useState(null);
  const svgRef = useRef();
const [qrColor, setQrColor] = useState("#000000");
const [qrBg, setQrBg] = useState("#ffffff");
  // === Logo Upload Handler ===
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setLogo(imgURL);
    } else {
      setLogo(null);
    }
  };

  // === QR Download Function ===
  const downloadQRCode = () => {
    const svg = svgRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qr_code.png";
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div style={{
      textAlign: "center",
      width: '100%',
      height: '100vh',
      color: 'white',
      fontFamily: "Arial",
      padding: "10px",
      backgroundImage:`url(${"/img.jpg"})`,
      backgroundSize:"cover"
    }}>

      <h1 style={{ color: "#FF5733", fontSize: "28px", marginBottom: "20px" }}>
        Smart QR Code Generator
      </h1>

      {/* === MULTI-LINE TEXT AREA === */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="এখানে যেকোনো টেক্সট বা লিংক লিখুন..."
        rows="4"
        style={{
          width: "90%",
          maxWidth: "350px",
          padding: "12px",
          fontSize: "15px",
          borderRadius: "10px",
          border: "2px solid #FF5733",
          outline: "none",
          marginBottom: "20px"
        }}
      />

      {/* === LOGO UPLOAD === */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          style={{
            padding: "8px",
            border: "2px solid #FF5733",
            borderRadius: "8px"
          }}
        />
      </div>

      {/* === QR CODE WRAPPER === */}
      <div
        ref={svgRef}
        style={{
          display: "inline-block",
          position: "relative",
          padding: "15px",
          background: "#fff",
          borderRadius: "15px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
        }}
      >
       
      
      <QRCode
        value={utf8Encode(text)}
        size={250}
        fgColor={qrColor}
        bgColor={qrBg}
      />

        {/* === DYNAMIC LOGO OVERLAY (only if provided) === */}
        {logo && (
          <img
            src={logo}
            alt="Logo"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "60px",
              height: "60px",
              transform: "translate(-50%, -50%)",
              borderRadius: "12px"
            }}
          />
        )}
      </div>

      {/* === DOWNLOAD BUTTON === */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={downloadQRCode}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#FF5733",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.3)"
          }}
        >
          Download QR
        </button>
      </div>
    </div>
  );
};

export default App;
