function doGet(e) {
  const sheet = SpreadsheetApp.openById("1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348")
                .getSheets()[0];

  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1); // Skip header

  const result = rows.map(row => {
    return {
      tanggal: row[0],              // A: Tanggal Pelaporan
      deskripsi: row[1],            // B: Deskripsi
      rekomendasi: row[2],          // C: Rekomendasi
      fotoUrl: convertToDriveViewLink(row[9]), // J: Foto
      tglPerbaikan: row[4],         // E: Tanggal Perbaikan
      pelapor: row[5],              // F: Nama Pelapor
      status: row[11]               // L: Status (Open / Close)
    };
  });

  return ContentService
         .createTextOutput(JSON.stringify(result))
         .setMimeType(ContentService.MimeType.JSON);
}

function convertToDriveViewLink(link) {
  if (typeof link !== "string" || link.trim() === "") return "";
  const match = link.match(/[-\w]{25,}/);
  if (match) {
    return "https://drive.google.com/uc?id=" + match[0];
  }
  return "";
}
