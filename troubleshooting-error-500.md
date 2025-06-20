# 🚨 Troubleshooting Error 500 - Apps Script

## **Step 1: Test Apps Script Function** ⏱️ (2 menit)

### **1.1 Test Function di Editor**
1. Buka Google Apps Script editor
2. Ganti semua code dengan code dari `google-apps-script-debug.js`
3. **Save** (Ctrl+S)
4. Pilih function **`simpleTest`**
5. Klik **"Run"** 
6. Check **Execution transcript** - harus muncul "Simple test successful!"

### **1.2 Test Spreadsheet Access**
1. Pilih function **`testSpreadsheetAccess`**
2. Klik **"Run"**
3. **Authorize** jika diminta permissions
4. Check logs - harus muncul "✅ All tests passed!"

**Jika gagal di step ini = masalah permission/spreadsheet access**

---

## **Step 2: Check Permissions** ⏱️ (3 menit)

### **2.1 Apps Script Permissions**
1. Di Apps Script editor, klik **"Review permissions"**
2. Pastikan sudah authorized untuk:
   - ✅ Google Sheets
   - ✅ Google Drive  
   - ✅ Gmail (untuk notifications)

### **2.2 Spreadsheet Permissions**
1. Buka Google Sheet: https://docs.google.com/spreadsheets/d/1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348/edit#gid=0
2. Klik **"Share"**
3. Pastikan akun yang menjalankan Apps Script punya akses **"Editor"**
4. Atau set "Anyone with the link" = "Editor" (sementara untuk testing)

---

## **Step 3: Re-Deploy Web App** ⏱️ (2 menit)

### **3.1 Create New Deployment**
1. Di Apps Script, klik **"Deploy"** > **"New deployment"**
2. **Type:** Web app
3. **Description:** "Hazard Report API v2 - Debug"
4. **Execute as:** Me
5. **Who has access:** Anyone ⚠️
6. Klik **"Deploy"**

### **3.2 Update Website**
Ganti URL di website dengan deployment URL yang baru.

---

## **Step 4: Test Step by Step** ⏱️ (5 menit)

### **4.1 Test GET Request**
Buka di browser:
\`\`\`
https://script.google.com/macros/s/YOUR_NEW_DEPLOYMENT_ID/exec?test=true
\`\`\`

**Expected result:** JSON dengan info spreadsheet

### **4.2 Test dari Website**
1. Buka hazard report page
2. Klik **"Test Connection"**
3. Harus muncul status **"Connected"**

### **4.3 Test Form Submission**
1. Isi form dengan data minimal
2. Submit
3. Check Google Sheet untuk data baru

---

## **Common Error 500 Causes:**

### **❌ "Exception: You do not have permission"**
**Solusi:**
- Re-authorize Apps Script permissions
- Check spreadsheet sharing settings
- Make sure same Google account for both

### **❌ "Exception: Requested entity was not found"**
**Solusi:**
- Verify Spreadsheet ID benar
- Check spreadsheet tidak di-delete
- Pastikan spreadsheet accessible

### **❌ "Exception: Service invoked too many times"**
**Solusi:**
- Wait 1-2 menit sebelum test lagi
- Reduce frequency of testing

### **❌ "Exception: Script function not found"**
**Solusi:**
- Make sure `doPost` function exists
- Re-save and re-deploy Apps Script
- Check function name spelling

---

## **Debug Checklist:**

- [ ] Apps Script function `simpleTest()` berhasil
- [ ] Apps Script function `testSpreadsheetAccess()` berhasil  
- [ ] Permissions sudah di-authorize
- [ ] Spreadsheet bisa diakses dan di-edit
- [ ] Web App di-deploy dengan "Anyone" access
- [ ] GET request test berhasil (browser test)
- [ ] Website "Test Connection" berhasil
- [ ] Form submission berhasil

---

## **Quick Fix Commands:**

### **Reset Permissions:**
1. Apps Script > Settings > "Reset permissions"
2. Re-run `testSpreadsheetAccess()`
3. Re-authorize semua permissions

### **Create New Spreadsheet (if needed):**
1. Buat Google Sheet baru
2. Copy Spreadsheet ID
3. Update di Apps Script dan website
4. Re-test

### **Minimal Working Test:**
Jika masih error, coba code minimal ini di Apps Script:

\`\`\`javascript
function doGet(e) {
  return ContentService.createTextOutput("Hello World").setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  return ContentService.createTextOutput("POST received").setMimeType(ContentService.MimeType.TEXT);
}
\`\`\`

Deploy dan test - jika ini work, masalahnya di spreadsheet access.
