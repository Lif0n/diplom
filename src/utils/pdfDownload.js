export default function pdfDownload(base64) {
    const binaryString = atob(base64);
    const uint8Array = new Uint16Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], {
        type: "application/pdf"
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = 'расписание';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}