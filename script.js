function generateQRCode() {
  const qrCodeBox = document.getElementById("qrCodeBox");
  const errorMessage = document.getElementById("errorMessage");
  const copyQRCode = document.getElementById("copyQRCode");
  const downloadQRCode = document.getElementById("downloadQRCode");
  let qrCode = document.getElementById("qrCode");
  let qrCodeData = document.getElementById("qrCodeData").value;

  // Check if the input is empty
  if(qrCodeData === "") {
    qrCodeBox.classList.add("error");
    setTimeout(() => {
      qrCodeBox.classList.remove("error");
    }, 500);
    errorMessage.innerHTML = "Please enter a valid URL";
    errorMessage.classList.add("active");
    return;
  }
  qrCode.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrCodeData;
  errorMessage.classList.remove("active");
  qrCodeBox.classList.add("active");

  setTimeout(() => {
    copyQRCode.classList.add("active");
    downloadQRCode.classList.add("active");
  }, 500);
}

// Copy and download QR code functions
async function copyQRCode() {
  const qrCodeSrc = await fetch(document.getElementById("qrCode").src);
  const blob = await qrCodeSrc.blob();
  navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
  alert("Copied to clipboard");
}

async function downloadQRCode() {
  const qrCodeSrc = await fetch(document.getElementById("qrCode").src);
  const blob = await qrCodeSrc.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "QRCode.png";
  link.click();
  URL.revokeObjectURL(url);
}

// Event listeners
document.getElementById("qrCodeData").addEventListener("keyup", (e) => {
  if(e.key === "Enter") {
    generateQRCode();
  }
});
document.getElementById("generateQRCode").addEventListener("click", generateQRCode);
document.getElementById("copyQRCode").addEventListener("click", copyQRCode);
document.getElementById("downloadQRCode").addEventListener("click", downloadQRCode);