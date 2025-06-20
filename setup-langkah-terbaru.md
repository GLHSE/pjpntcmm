# 🚀 Setup Hazard Report - Langkah Terbaru

## **Spreadsheet ID Baru:** 
`1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348`

## **Link Google Sheet:**
https://docs.google.com/spreadsheets/d/1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348/edit#gid=0

---

## **Step 1: Setup Google Sheet** ⏱️ (5 menit)

### **1.1 Akses Google Sheet**
1. **Login** ke Google account Anda
2. Buka link: https://docs.google.com/spreadsheets/d/1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348/edit#gid=0
3. Jika diminta permission, **request access** atau pastikan Anda punya akses edit

### **1.2 Setup Headers di Sheet**
Pastikan baris pertama (row 1) memiliki headers berikut:

| A1 | B1 | C1 | D1 | E1 | F1 | G1 |
|----|----|----|----|----|----|----| 
| Timestamp | Report ID | Nama Pelapor | Tanggal Pelaporan | Lokasi | Jenis Hazard | Prioritas |

| H1 | I1 | J1 | K1 | L1 | M1 | N1 |
|----|----|----|----|----|----|----| 
| Deskripsi | Rekomendasi | Image URLs | Image Names | Status | Follow Up Date | Assigned To |

### **1.3 Format Headers**
1. Select baris 1 (A1:N1)
2. **Bold** (Ctrl+B)
3. Background color: Light blue
4. **Freeze** baris 1: View > Freeze > 1 row

---

## **Step 2: Setup Google Apps Script** ⏱️ (10 menit)

### **2.1 Buka Google Apps Script**
1. Dari Google Sheet, klik **Extensions** > **Apps Script**
2. Atau buka [script.google.com](https://script.google.com) dan buat project baru
3. Rename project: **"Hazard Report API"**

### **2.2 Paste Code**
1. **Hapus** semua code default
2. **Copy** code dari file `google-apps-script.js` (sudah diupdate dengan ID baru)
3. **Paste** ke Apps Script editor
4. **Save** (Ctrl+S)

### **2.3 Test Function**
1. Pilih function **`testSpreadsheetAccess`**
2. Klik **"Run"**
3. **Authorize** permissions jika diminta:
   - Allow access to Google Sheets
   - Allow access to Google Drive
   - Allow access to Gmail
4. Check logs: harus muncul "✅ Spreadsheet access: OK"

---

## **Step 3: Deploy sebagai Web App** ⏱️ (5 menit)

### **3.1 Deploy**
1. Klik **"Deploy"** > **"New deployment"**
2. **Type:** Web app
3. **Description:** "Hazard Report API v1"

### **3.2 Configuration**
- **Execute as:** Me (your-email@gmail.com)
- **Who has access:** **Anyone** ⚠️ **PENTING!**

### **3.3 Authorize & Deploy**
1. Klik **"Deploy"**
2. **Authorize access** jika diminta
3. Copy **Web App URL** yang muncul
4. Format: `https://script.google.com/macros/s/AKfycbx.../exec`

**SIMPAN URL INI!** Anda akan membutuhkannya untuk step berikutnya.

---

## **Step 4: Update Website** ⏱️ (2 menit)

### **4.1 Update hazard-report.html**
Buka file `hazard-report.html`, cari baris:
\`\`\`javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
\`\`\`

**Ganti dengan Web App URL Anda:**
\`\`\`javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
\`\`\`

### **4.2 Verify Spreadsheet ID**
Pastikan Spreadsheet ID sudah benar:
\`\`\`javascript
const SPREADSHEET_ID = '1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348';
\`\`\`

---

## **Step 5: Test Integration** ⏱️ (5 menit)

### **5.1 Test Connection**
1. Buka website hazard report
2. Klik **"Test Connection"**
3. Status harus berubah menjadi **"Connected"** (hijau)

### **5.2 Test Form Submission**
1. Isi form hazard report dengan data test:
   - **Nama:** Test User
   - **Tanggal:** Hari ini
   - **Lokasi:** Test Location
   - **Jenis Hazard:** Unsafe Condition
   - **Prioritas:** High
   - **Deskripsi:** Test hazard report submission
2. Klik **"Kirim ke Google Sheet"**
3. Harus muncul pesan **"Laporan berhasil dikirim ke Google Sheet!"**

### **5.3 Verify Data**
1. Refresh Google Sheet
2. Check apakah data baru muncul di baris 2
3. Verify Report ID ter-generate otomatis (format: HR-YYYYMMDD-HHMMSS)

---

## **🔧 Quick Troubleshooting**

### **❌ "Permission denied" di Apps Script**
**Solusi:**
1. Pastikan Anda punya akses edit ke Google Sheet
2. Re-run authorization di Apps Script
3. Check sharing settings di Google Sheet

### **❌ "Connection Error" di website**
**Solusi:**
1. Pastikan Web App URL sudah benar di website
2. Pastikan deployment "Who has access: Anyone"
3. Test Apps Script function `testSpreadsheetAccess()` dulu

### **❌ Data tidak masuk ke Sheet**
**Solusi:**
1. Check headers di Google Sheet (harus sesuai persis)
2. Check execution transcript di Apps Script untuk error
3. Pastikan sheet name benar (default: "Sheet1")

---

## **✅ Checklist Setup**

- [ ] Google Sheet bisa diakses dan memiliki headers yang benar
- [ ] Google Apps Script dibuat dan code di-paste
- [ ] Function `testSpreadsheetAccess()` berhasil dijalankan
- [ ] Web App di-deploy dengan permissions "Anyone"
- [ ] Website di-update dengan Web App URL yang benar
- [ ] Test connection berhasil (status "Connected")
- [ ] Test form submission berhasil
- [ ] Data test muncul di Google Sheet dengan Report ID

**🎯 Setelah semua checklist selesai, sistem hazard report siap digunakan!**

---

## **📞 Support**

Jika ada masalah:
1. **Check browser console** untuk error messages
2. **Check Apps Script execution transcript** untuk backend errors
3. **Verify permissions** di Google Sheet dan Apps Script
4. **Test step by step** mulai dari Apps Script function test

**Link Penting:**
- **Google Sheet:** https://docs.google.com/spreadsheets/d/1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348/edit#gid=0
- **Apps Script:** https://script.google.com (project: "Hazard Report API")
