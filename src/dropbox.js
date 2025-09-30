import mondaySdk from "monday-sdk-js";
import { Dropbox } from "dropbox";

// Load environment variables (Vite style)
const MONDAY_API_TOKEN = import.meta.env.VITE_MONDAY_API_TOKEN;
const DROPBOX_CLIENT_ID = import.meta.env.VITE_DROPBOX_CLIENT_ID;
const DROPBOX_CLIENT_SECRET = import.meta.env.VITE_DROPBOX_CLIENT_SECRET;
const DROPBOX_REFRESH_TOKEN = import.meta.env.VITE_DROPBOX_REFRESH_TOKEN;


// Monday.com SDK
const monday = mondaySdk();
if (MONDAY_API_TOKEN) {
  monday.setToken(MONDAY_API_TOKEN);
} else {
  console.warn("MONDAY_API_TOKEN is not set in environment variables.");
}

// Dropbox SDK setup
const dbx = new Dropbox({
  clientId: DROPBOX_CLIENT_ID,
  clientSecret: DROPBOX_CLIENT_SECRET,
});


const mondayColumnId = "link_mkstez30";


// Accepts: fileBuffer (ArrayBuffer, Blob, or File), dropboxTargetPath, mondayItemId
export async function uploadAndLinkToMonday(
  fileBuffer,
  dropboxTargetPath = '/Upload Testing/sample3.pdf',
  mondayItemId = 9542442798
) {
  try {
    // Step 1: Refresh Dropbox token
    dbx.auth.setRefreshToken(DROPBOX_REFRESH_TOKEN);
    await dbx.auth.refreshAccessToken();
    console.log("✅ Dropbox Access Token Refreshed");

    // Step 2: Query Monday.com
    const query = `query {
      items(ids: ${mondayItemId}) {
        column_values(ids: "${mondayColumnId}") {
          text
        }
      }
    }`;

    const mondayResponse = await monday.api(query);
    const text = mondayResponse.data.items[0].column_values[0].text;
    console.log("📄 Monday Column Text:", text);

    if (!text) {
      console.log("⚠️ Column is empty. Uploading file to Dropbox...");

      // Upload file (browser: Blob/File/ArrayBuffer)
      await dbx.filesUpload({
        path: dropboxTargetPath,
        contents: fileBuffer,
        mode: "overwrite",
      });
      console.log("✅ File uploaded to Dropbox");

      // Get shareable link
      const sharedLinkResult = await dbx.sharingCreateSharedLinkWithSettings({
        path: dropboxTargetPath,
      });

      const shareableLink = sharedLinkResult.result.url.replace(
        "?dl=0",
        "?dl=1"
      );
      console.log("🔗 Shareable Link:", shareableLink);

      // Step 3: Update Monday column with link
      const mutation = `mutation {
        change_column_value(board_id: 3329596763, item_id: ${mondayItemId}, column_id: "${mondayColumnId}", value: "${JSON.stringify(
        {
          url: shareableLink,
          text: "Download File",
        }
      ).replace(/"/g, '\\"')}") {
          id
        }
      }`;

      const updateResponse = await monday.api(mutation);
      console.log(
        "✅ Monday column updated with Dropbox link:",
        updateResponse
      );
    } else {
      console.log("✅ Column is not empty. No upload needed.");
    }
  } catch (err) {
    console.error("❌ Error occurred:", err);
  }
}

// Example usage:
// uploadAndLinkToMonday('./sample3.txt', '/Upload Testing/sample3.txt', 9542442798);