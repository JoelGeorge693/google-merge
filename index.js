const express = require('express');
const { google } = require("googleapis");

const app = express();

app.get("/", async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',

        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // creating client instance for authorisation
    const client = await auth.getClient();

    //Instance of Google Sheets API
    const googleSheets = google.sheets({
        version: 'v4',
        auth: "client"
    });

    const outputSpreadSheetId = "1yCe4mjgXdwyKtdLjoupsXoJ-Om06wHqC6uQFkAlXbbs";
    const inputSpreadSheetId = "1rY1k45tQv8N830zqfnmJMifFgq4MOS3yYcYwN-xrdec"
    // Get metadata about spreadsheets
    // const metadataForOP = await googleSheets.spreadsheets.get({
    //     auth,
    //     spreadsheetId:outputSpreadSheetId,
    // })

    // const metadataForIP = await googleSheets.spreadsheets.get({
    //     auth,
    //     spreadsheetId:inputSpreadSheetId,
    // })

    async function merge() {
        const sheetIdArr = [0, 1064167689, 961837592];
        for (let [value, index] of sheetIdArr.entries()) {
            const request = {
                // The ID of the spreadsheet containing the sheet to copy.
                spreadsheetId: inputSpreadSheetId,  // TODO: Update placeholder value.

                // The ID of the sheet to copy.
                sheetId: index,  // TODO: Update placeholder value.

                resource: {
                    // The ID of the spreadsheet to copy the sheet to.
                    destinationSpreadsheetId: outputSpreadSheetId,  // TODO: Update placeholder value.

                    // TODO: Add desired properties to the request body.
                },

                auth,
            };
            try {
                const response = (await googleSheets.spreadsheets.sheets.copyTo(request)).data;
                // TODO: Change code below to process the `response` object:
                console.log(JSON.stringify(response, null, 2));
            } catch (err) {
                console.error(err);
            }
        }
    }



    merge();



    res.send("Merge");
});



app.listen(1337, (req, res) => console.log('running on 1337'));

