// Monday.com API configuration
const MONDAY_API_URL = "https://api.monday.com/v2";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMxNDAxNzQyMCwiYWFpIjoxMSwidWlkIjozODk4NjMyMiwiaWFkIjoiMjAyNC0wMS0yNVQwNTo1NToxMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTM2NDg4MDgsInJnbiI6InVzZTEifQ.GhKnLHjPCWff1y3zEN6q1202RK1wCGVKByFfFlxsT8s"; // Replace with your actual API token

// Function to make API calls to Monday.com using fetch
const mondayApiCall = async (query) => {
  try {
    const response = await fetch(MONDAY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_TOKEN,
      },
      body: JSON.stringify({
        query: query,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error(`GraphQL Error: ${data.errors[0].message}`);
    }

    return data;
  } catch (error) {
    console.error("Error making Monday API call:", error);
    throw error;
  }
};

// Function to get item ID from URL query parameters
const getItemIdFromParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("id");
  return itemId ? parseInt(itemId) : null;
};

// Main function to get item with parent board relation using query params
export const getItemWithParentBoardRelation = async () => {
  const itemId = getItemIdFromParams();

  if (!itemId) {
    throw new Error(
      "Item ID not found in query parameters. Please add ?id=YOUR_ITEM_ID to the URL"
    );
  }

  try {
    const query = `
      query {
        items(ids: ${itemId}) {
          name
          column_values(ids:["numbers","numbers5"]) {
            text
          }
          parent_item {
            column_values(ids: "board_relation_mkpbszp6") {
              ... on BoardRelationValue {
                display_value
              }
            }
          }
        }
      }
    `;

    const response = await mondayApiCall(query);
    console.log("API response:", response);

    return response.data.items;
  } catch (error) {
    console.error("Error fetching item data:", error);
    throw error;
  }
};