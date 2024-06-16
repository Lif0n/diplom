export default function base64ToPdf(base64, name) {
    const binaryString = atob(base64);
    const uint8Array = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], {
        type: "application/pdf"
    });
    const url = URL.createObjectURL(blob);
    // window.open(url);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
}