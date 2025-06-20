// Google Apps Script untuk Hazard Report
// Spreadsheet ID: 1CoDdbIszvS7mbw6dODlHsC8jRrjc3NXnk-CPgKxMliM
// Sheet GID: 700684871

function doPost(e) {
  try {
    console.log("=== HAZARD REPORT SUBMISSION ===")
    console.log("Request received:", e)

    // Get form data
    const formData = e.parameter
    console.log("Form data:", formData)

    // Spreadsheet configuration - UPDATE dengan ID baru
    const SPREADSHEET_ID = "1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348"
    const SHEET_NAME = "Sheet1" // Atau nama sheet yang sesuai

    // Open spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
    let sheet

    try {
      sheet = spreadsheet.getSheetByName(SHEET_NAME)
    } catch (error) {
      // Jika sheet tidak ada, gunakan sheet pertama
      sheet = spreadsheet.getSheets()[0]
      console.log("Using first sheet:", sheet.getName())
    }

    // Generate Report ID
    const reportId = "HR-" + Utilities.formatDate(new Date(), "GMT+7", "yyyyMMdd-HHmmss")
    console.log("Generated Report ID:", reportId)

    // Handle file uploads
    const imageUrls = []
    const imageNames = []

    // Process uploaded files
    for (let i = 0; i < 10; i++) {
      // Check up to 10 files
      const fileKey = `file${i}`
      const fileNameKey = `fileName${i}`

      if (formData[fileKey] && formData[fileNameKey]) {
        try {
          console.log(`Processing file ${i}:`, formData[fileNameKey])

          // Get base64 data
          const base64Data = formData[fileKey]
          const fileName = formData[fileNameKey]

          // Create blob from base64
          let blob
          if (base64Data.includes(",")) {
            // Remove data URL prefix
            const base64 = base64Data.split(",")[1]
            blob = Utilities.newBlob(Utilities.base64Decode(base64), "image/jpeg", `${reportId}-${fileName}`)
          } else {
            blob = Utilities.newBlob(Utilities.base64Decode(base64Data), "image/jpeg", `${reportId}-${fileName}`)
          }

          // Save to Google Drive
          const folder = getOrCreateFolder("Hazard Report Images")
          const file = folder.createFile(blob)

          // Make file publicly viewable
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)

          imageUrls.push(file.getUrl())
          imageNames.push(fileName)

          console.log(`File ${i} uploaded:`, file.getUrl())
        } catch (fileError) {
          console.error(`Error uploading file ${i}:`, fileError)
        }
      }
    }

    // Prepare data for spreadsheet
    const timestamp = new Date()
    const rowData = [
      timestamp, // Timestamp
      reportId, // Report ID
      formData.reporterName || "", // Nama Pelapor
      formData.reportDate || "", // Tanggal Pelaporan
      formData.location || "", // Lokasi
      formData.hazardType || "", // Jenis Hazard
      formData.priority || "", // Prioritas
      formData.description || "", // Deskripsi
      formData.recommendation || "", // Rekomendasi
      imageUrls.join(", "), // Image URLs
      imageNames.join(", "), // Image Names
      "Open", // Status
      "", // Follow Up Date
      "", // Assigned To
    ]

    console.log("Prepared row data:", rowData)

    // Check if sheet has headers, if not create them
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Timestamp",
        "Report ID",
        "Nama Pelapor",
        "Tanggal Pelaporan",
        "Lokasi",
        "Jenis Hazard",
        "Prioritas",
        "Deskripsi",
        "Rekomendasi",
        "Image URLs",
        "Image Names",
        "Status",
        "Follow Up Date",
        "Assigned To",
      ]
      sheet.getRange(1, 1, 1, headers.length).setValues([headers])
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold")
      sheet.setFrozenRows(1)
      console.log("Headers created")
    }

    // Add data to sheet
    sheet.appendRow(rowData)
    console.log("Data added to sheet successfully")

    // Send email notification (optional)
    try {
      sendEmailNotification(formData, reportId, imageUrls)
      console.log("Email notification sent")
    } catch (emailError) {
      console.error("Email notification failed:", emailError)
    }

    console.log("=== SUBMISSION COMPLETED SUCCESSFULLY ===")
    return ContentService.createTextOutput("success: Report saved successfully").setMimeType(
      ContentService.MimeType.TEXT,
    )
  } catch (error) {
    console.error("=== ERROR IN SUBMISSION ===")
    console.error("Error details:", error)
    console.error("Error stack:", error.stack)

    return ContentService.createTextOutput("error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT)
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  if (e.parameter.test) {
    return ContentService.createTextOutput(
      "Google Apps Script is working! Ready to receive hazard reports.",
    ).setMimeType(ContentService.MimeType.TEXT)
  }

  return ContentService.createTextOutput("Hazard Report API is running").setMimeType(ContentService.MimeType.TEXT)
}

function getOrCreateFolder(folderName) {
  // Get or create folder for storing images
  const folders = DriveApp.getFoldersByName(folderName)

  if (folders.hasNext()) {
    return folders.next()
  } else {
    return DriveApp.createFolder(folderName)
  }
}

function sendEmailNotification(formData, reportId, imageUrls) {
  // Email configuration
  const emailTo = "hse@primajaya.com" // Ganti dengan email yang sesuai
  const subject = `🚨 New Hazard Report: ${reportId}`

  // Priority color
  const priorityColor = {
    high: "#dc3545",
    medium: "#ffc107",
    low: "#17a2b8",
  }

  const color = priorityColor[formData.priority] || "#6c757d"

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: ${color}; color: white; padding: 20px; text-align: center;">
        <h2>🚨 New Hazard Report</h2>
        <h3>${reportId}</h3>
      </div>
      
      <div style="padding: 20px; border: 1px solid #ddd;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Reporter:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.reporterName || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Date:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.reportDate || "N/A"}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Location:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.location || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Hazard Type:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.hazardType || "N/A"}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Priority:</td>
            <td style="padding: 8px; border: 1px solid #ddd; color: ${color}; font-weight: bold;">
              ${(formData.priority || "N/A").toUpperCase()}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Description:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.description || "N/A"}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Recommendation:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formData.recommendation || "N/A"}</td>
          </tr>
        </table>
        
        ${
          imageUrls.length > 0
            ? `
          <h3 style="color: #007bff; margin-top: 20px;">📷 Attached Images:</h3>
          <ul>
            ${imageUrls.map((url, index) => `<li><a href="${url}" target="_blank">View Image ${index + 1}</a></li>`).join("")}
          </ul>
        `
            : '<p style="margin-top: 20px;"><em>No images attached</em></p>'
        }
        
        <div style="margin-top: 30px; padding: 15px; background-color: #e3f2fd; border-radius: 5px; text-align: center;">
          <p><strong>📊 View Full Report in Google Sheets:</strong></p>
          <a href="https://docs.google.com/spreadsheets/d/1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348/edit#gid=0" 
             style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Open Google Sheets
          </a>
        </div>
      </div>
      
      <div style="padding: 10px; text-align: center; color: #6c757d; font-size: 12px;">
        <em>This is an automated notification from PT. Prima Jaya Hazard Report System</em>
      </div>
    </div>
  `

  try {
    MailApp.sendEmail({
      to: emailTo,
      subject: subject,
      htmlBody: htmlBody,
    })
  } catch (emailError) {
    console.error("Failed to send email:", emailError)
    throw emailError
  }
}

// Test function
function testSpreadsheetAccess() {
  try {
    const SPREADSHEET_ID = "1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348"
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
    const sheet = spreadsheet.getSheets()[0]

    console.log("✅ Spreadsheet access: OK")
    console.log("Spreadsheet name:", spreadsheet.getName())
    console.log("Sheet name:", sheet.getName())
    console.log("Last row:", sheet.getLastRow())

    return "Test successful!"
  } catch (error) {
    console.error("❌ Test failed:", error)
    return "Test failed: " + error.toString()
  }
}

// Declare variables
var SpreadsheetApp
var Utilities
var DriveApp
var ContentService
var MailApp
