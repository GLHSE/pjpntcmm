# 🚀 Setup Instructions - Hazard Report ke Google Sheet

## 📋 **Langkah Setup:**

### **Step 1: Persiapkan Google Sheet**

1. **Buat Google Sheet baru atau gunakan yang sudah ada:**
   - Buka [Google Sheets](https://sheets.google.com)
   - Buat spreadsheet baru atau akses yang sudah ada
   - Pastikan ID spreadsheet: `1CoDdbIszvS7mbw6dODlHsC8jRrjc3NXnk-CPgKxMliM`

2. **Setup Headers (jika belum ada):**
   \`\`\`
   A1: Timestamp
   B1: Report ID  
   C1: Nama Pelapor
   D1: Tanggal Pelaporan
   E1: Lokasi
   F1: Jenis Hazard
   G1: Prioritas
   H1: Deskripsi
   I1: Rekomendasi
   J1: Image URLs
   K1: Image Names
   L1: Status
   M1: Follow Up Date
   N1: Assigned To
   \`\`\`

3. **Set Permissions:**
   - Share spreadsheet dengan akun yang akan menjalankan Apps Script
   - Set permission minimal "Editor"

### **Step 2: Setup Google Apps Script**

1. **Buka Google Apps Script:**
   - Pergi ke [script.google.com](https://script.google.com)
   - Klik "New Project"
   - Nama project: "Hazard Report API"

2. **Paste Code:**
   - Hapus code default
   - Copy-paste code dari file `google-apps-script.js`
   - Save (Ctrl+S)

3. **Set Permissions:**
   - Klik "Review permissions"
   - Allow access ke Sheets, Drive, dan Gmail

### **Step 3: Deploy sebagai Web App**

1. **Deploy:**
   - Klik "Deploy" > "New deployment"
   - Type: "Web app"
   - Description: "Hazard Report API v1"

2. **Configuration:**
   - Execute as: "Me"
   - Who has access: "Anyone" ⚠️ **PENTING!**

3. **Get Web App URL:**
   - Copy URL yang muncul
   - Format: `https://script.google.com/macros/s/SCRIPT_ID/exec`

### **Step 4: Update Website**

1. **Update hazard-report.html:**
   \`\`\`javascript
   // Ganti baris ini:
   const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   
   // Dengan URL Web App Anda:
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   \`\`\`

2. **Update Email (opsional):**
   - Di Google Apps Script, ganti `hse@primajaya.com` dengan email yang sesuai

### **Step 5: Test Integration**

1. **Test Connection:**
   - Buka website hazard report
   - Klik "Test Connection"
   - Harus muncul "Connected"

2. **Test Form Submission:**
   - Isi form hazard report
   - Submit
   - Check data di Google Sheet

## 🔧 **Troubleshooting:**

### **❌ "Sorry, the file you have requested does not exist"**
**Solusi:**
1. Pastikan spreadsheet ID benar
2. Check sharing permissions
3. Buat spreadsheet baru jika perlu

### **❌ "Script function not found"**
**Solusi:**
1. Pastikan code sudah di-save di Apps Script
2. Re-deploy Web App
3. Check function name `doPost` ada

### **❌ "Permission denied"**
**Solusi:**
1. Re-authorize Apps Script permissions
2. Check spreadsheet sharing settings
3. Deploy dengan "Execute as: Me"

### **❌ Connection status "Error"**
**Solusi:**
1. Check Web App URL di website
2. Test Apps Script dengan function `testSpreadsheetAccess()`
3. Check browser console untuk error details

## 📊 **Data Structure:**

| Column | Description | Example |
|--------|-------------|---------|
| Timestamp | Auto-generated | 2025-01-19 10:30:00 |
| Report ID | Auto-generated | HR-20250119-103000 |
| Nama Pelapor | From form | John Doe |
| Tanggal Pelaporan | From form | 2025-01-19 |
| Lokasi | From form | Area Tambang Blok A |
| Jenis Hazard | From form | unsafe_condition |
| Prioritas | From form | high |
| Deskripsi | From form | Lubang terbuka... |
| Rekomendasi | From form | Pasang pagar... |
| Image URLs | Auto-generated | https://drive.google.com/... |
| Image Names | Auto-generated | image1.jpg, image2.jpg |
| Status | Default: "Open" | Open |
| Follow Up Date | Manual input | - |
| Assigned To | Manual input | - |

## ✅ **Features:**

- ✅ **Real-time sync** ke Google Sheet
- ✅ **File upload** ke Google Drive
- ✅ **Email notifications** otomatis
- ✅ **Auto-generated Report ID**
- ✅ **Connection status** indicator
- ✅ **Error handling** yang baik
- ✅ **Mobile responsive**
- ✅ **Drag & drop** file upload

## 🎯 **Next Steps:**

1. **Setup Google Sheet** dengan headers yang benar
2. **Deploy Google Apps Script** sebagai Web App
3. **Update website** dengan Script URL
4. **Test integration** end-to-end
5. **Configure email** notifications
6. **Train users** cara menggunakan sistem

**Total setup time: ~15-20 menit**
**Maintenance: Minimal**
**Cost: FREE**
