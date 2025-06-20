// Google Apps Script untuk Hazard Report - DEBUG VERSION
// Spreadsheet ID: 1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348

function doPost(e) {
  try {
    console.log("=== HAZARD REPORT SUBMISSION START ===")

    // Log semua parameter yang diterima
    console.log("Raw event:", JSON.stringify(e))
    console.log("Parameters:", JSON.stringify(e.parameter))

    // Test basic functionality first
    const testMessage = "Apps Script is receiving data successfully"
    console.log(testMessage)

    // Get form data
    const formData = e.parameter || {}
    console.log("Form data extracted:", formData)

    // Spreadsheet configuration
    const SPREADSHEET_ID = "1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348"
    console.log("Using Spreadsheet ID:", SPREADSHEET_ID)

    // Test spreadsheet access
    let spreadsheet
    try {
      spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
      console.log("✅ Spreadsheet opened successfully:", spreadsheet.getName())
    } catch (spreadsheetError) {
      console.error("❌ Failed to open spreadsheet:", spreadsheetError)
      throw new Error("Cannot access spreadsheet: " + spreadsheetError.message)
    }

    // Get first sheet
    let sheet
    try {
      sheet = spreadsheet.getSheets()[0]
      console.log("✅ Sheet accessed successfully:", sheet.getName())
      console.log("Sheet has", sheet.getLastRow(), "rows")
    } catch (sheetError) {
      console.error("❌ Failed to access sheet:", sheetError)
      throw new Error("Cannot access sheet: " + sheetError.message)
    }

    // Generate Report ID
    const reportId = "HR-" + Utilities.formatDate(new Date(), "GMT+7", "yyyyMMdd-HHmmss")
    console.log("Generated Report ID:", reportId)

    // Prepare basic data (without file processing for now)
    const timestamp = new Date()
    const rowData = [
      timestamp,
      reportId,
      formData.reporterName || "Test User",
      formData.reportDate || "2025-01-19",
      formData.location || "Test Location",
      formData.hazardType || "unsafe_condition",
      formData.priority || "high",
      formData.description || "Test description",
      formData.recommendation || "Test recommendation",
      "", // Image URLs (empty for now)
      "", // Image Names (empty for now)
      "Open",
      "",
      "",
    ]

    console.log("Prepared row data:", rowData)

    // Check if headers exist
    if (sheet.getLastRow() === 0) {
      console.log("Creating headers...")
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

      try {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers])
        sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold")
        sheet.setFrozenRows(1)
        console.log("✅ Headers created successfully")
      } catch (headerError) {
        console.error("❌ Failed to create headers:", headerError)
        throw new Error("Cannot create headers: " + headerError.message)
      }
    }

    // Add data to sheet
    try {
      sheet.appendRow(rowData)
      console.log("✅ Data added to sheet successfully")
    } catch (appendError) {
      console.error("❌ Failed to append data:", appendError)
      throw new Error("Cannot append data: " + appendError.message)
    }

    console.log("=== SUBMISSION COMPLETED SUCCESSFULLY ===")
    return ContentService.createTextOutput("success: Report saved successfully with ID " + reportId).setMimeType(
      ContentService.MimeType.TEXT,
    )
  } catch (error) {
    console.error("=== CRITICAL ERROR ===")
    console.error("Error type:", error.name)
    console.error("Error message:", error.message)
    console.error("Error stack:", error.stack)

    return ContentService.createTextOutput("error: " + error.message).setMimeType(ContentService.MimeType.TEXT)
  }
}

function doGet(e) {
  try {
    console.log("=== GET REQUEST RECEIVED ===")
    console.log("Parameters:", e.parameter)

    if (e.parameter.test) {
      // Test spreadsheet access
      const SPREADSHEET_ID = "1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348"

      try {
        const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
        const sheet = spreadsheet.getSheets()[0]

        const testResult = {
          status: "success",
          spreadsheetName: spreadsheet.getName(),
          sheetName: sheet.getName(),
          lastRow: sheet.getLastRow(),
          timestamp: new Date().toISOString(),
        }

        console.log("Test result:", testResult)
        return ContentService.createTextOutput("success: " + JSON.stringify(testResult)).setMimeType(
          ContentService.MimeType.TEXT,
        )
      } catch (testError) {
        console.error("Test failed:", testError)
        return ContentService.createTextOutput("error: Test failed - " + testError.message).setMimeType(
          ContentService.MimeType.TEXT,
        )
      }
    }

    return ContentService.createTextOutput("Hazard Report API is running - " + new Date().toISOString()).setMimeType(
      ContentService.MimeType.TEXT,
    )
  } catch (error) {
    console.error("GET request error:", error)
    return ContentService.createTextOutput("error: " + error.message).setMimeType(ContentService.MimeType.TEXT)
  }
}

// Test function untuk debug
function testSpreadsheetAccess() {
  try {
    console.log("=== TESTING SPREADSHEET ACCESS ===")

    const SPREADSHEET_ID = "1HElxmXiZk4LdvnKPiV6os2miVomm3WdWg6hT0iZl348"
    console.log("Testing Spreadsheet ID:", SPREADSHEET_ID)

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
    console.log("✅ Spreadsheet opened:", spreadsheet.getName())

    const sheet = spreadsheet.getSheets()[0]
    console.log("✅ Sheet accessed:", sheet.getName())
    console.log("Last row:", sheet.getLastRow())
    console.log("Last column:", sheet.getLastColumn())

    // Test write permission
    const testCell = sheet.getRange("A1")
    const originalValue = testCell.getValue()
    testCell.setValue("TEST")
    testCell.setValue(originalValue)
    console.log("✅ Write permission: OK")

    return "✅ All tests passed!"
  } catch (error) {
    console.error("❌ Test failed:", error)
    console.error("Error details:", error.message)
    console.error("Error stack:", error.stack)
    return "❌ Test failed: " + error.message
  }
}

// Simple test function
function simpleTest() {
  console.log("Simple test running...")
  return "Simple test successful!"
}

// Declare variables to fix lint/correctness/noUndeclaredVariables errors
var SpreadsheetApp = SpreadsheetApp
var Utilities = Utilities
var ContentService = ContentService
