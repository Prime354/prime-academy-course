/**
 * ============================================================================
 * PRIME ACADEMY — GOOGLE APPS SCRIPT LEAD CAPTURE WEBHOOK
 * ============================================================================
 * 
 * Fields recorded:
 * 1. Timestamp (Indian Standard Time - Asia/Kolkata)
 * 2. Full Name
 * 3. Phone Number
 * 4. Location / City
 * 5. Course Selected
 *
 * HOW TO SET UP:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Rename the document (e.g., "Prime Academy Leads")
 * 3. In the top menu, click: Extensions -> Apps Script
 * 4. Delete any code in Code.gs and paste this entire file content.
 * 5. Click the Save icon (Ctrl + S).
 * 6. Click the blue "Deploy" button (top right) -> "New deployment".
 * 7. Click the gear icon (Select type) -> choose "Web app".
 * 8. Set the configuration:
 *      - Description: Prime Academy Leads Webhook
 *      - Execute as: "Me" (your email)
 *      - Who has access: "Anyone"  <-- CRITICAL! Must be "Anyone" so visitors can submit without login.
 * 9. Click "Deploy".
 * 10. Click "Authorize access", choose your Google account, click "Advanced" -> "Go to Prime Academy Leads (unsafe)" -> "Allow".
 * 11. Copy the "Web app URL" (it starts with https://script.google.com/macros/s/...)
 * 12. Paste the Web App URL here in the chat and I will link and verify it!
 * ============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent submissions
  lock.tryLock(30000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Leads");

    // If "Leads" sheet doesn't exist, create it or use active sheet
    if (!sheet) {
      sheet = ss.getActiveSheet();
      sheet.setName("Leads");
    }

    // Auto-create Header Row on first submission if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp (IST)", "Full Name", "Phone Number", "Location", "Course Selected"]);
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#FEA707"); // Prime Academy Brand Yellow
      headerRange.setFontColor("#0A0A0A");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);

      // Auto-set optimal column widths
      sheet.setColumnWidth(1, 210); // Timestamp
      sheet.setColumnWidth(2, 200); // Full Name
      sheet.setColumnWidth(3, 170); // Phone Number
      sheet.setColumnWidth(4, 180); // Location
      sheet.setColumnWidth(5, 230); // Course Selected
    }

    // Parse incoming data payload (supports JSON or form-encoded POSTs)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Format timestamp in Indian Standard Time (IST)
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MMM-yyyy hh:mm:ss a");
    var name = (data.name || data.fullName || "").toString().trim();
    var number = (data.number || data.phone || "").toString().trim();
    var location = (data.location || data.city || "").toString().trim();
    var course = (data.course || "").toString().trim();

    // Append the lead row (' prefix ensures phone numbers retain formatting)
    sheet.appendRow([timestamp, name, "'" + number, location, course]);

    // Align new row cells
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 3).setHorizontalAlignment("center");

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Lead captured successfully!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Health check GET endpoint to verify web app is deployed and live
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "online",
      service: "Prime Academy Google Sheet Leads Webhook",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
