import mondaySdk from "monday-sdk-js";
import { Dropbox } from "dropbox";


// Monday.com SDK
const monday = mondaySdk();
monday.setToken(
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjUzMzQ5MTkzNiwiYWFpIjoxMSwidWlkIjozODk4NjMyMiwiaWFkIjoiMjAyNS0wNy0wMVQxNjoxODo0Mi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTM2NDg4MDgsInJnbiI6InVzZTEifQ.0YxDOYQRzQwTZdIUhRFaSktOITLMiTOmDZqhuayxUr0"
);

// Dropbox SDK setup
const dbx = new Dropbox({
  clientId: "dn1fonf385f2hv4",
  clientSecret: "o65a046lmb7atu7",
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
    dbx.auth.setRefreshToken(
      "k8Qx88vKZIoAAAAAAAAAAXAYz3aXdLQwSsk3y9UeemcPOXbKJu2WnE7gfiFf8bnF"
    );
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