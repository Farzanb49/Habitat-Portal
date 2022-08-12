/**
 * Contains information about documents present in documentsToSign.js, including
 * recipients/signers and date signed DocuSign Tabs
 *
 * @author Farzan Bhuiyan.
 */

 const { DocumentsApi } = require("docusign-rooms");

 const documentInfo = exports,
   docusign = require("docusign-esign"),
   documents = require("./documents").documents;
 
 /**
  * Creates a prefilled tab to add to a Habitat for Humanity application form
  * @param {String} anchorString place tab matching this string
  * @param {Number} xOffset x offset from center of string, inches
  * @param {Number} xWidth width of tab in pixels
  * @param {String} value value for this tab to take
 selected
  * @returns a DocuSign tab
  */
 function makePrefilledTextTab(anchorString, tabLabel, xOffset, xWidth, value) {
   return docusign.Text.constructFromObject({
     anchorString: anchorString,
     anchorUnits: "inches",
     anchorCaseSensitive: false,
     anchorYOffset: "-0.12",
     anchorXOffset: xOffset,
     font: "helvetica",
     fontSize: "size11",
     bold: "false",
     value: value,
     locked: "false",
     tabId: anchorString,
     tabLabel: tabLabel,
     width: xWidth,
   });
 }
 
 /**
  * Creates a tab to add to a Habitat for Humanity Signature Form
  * Uses anchor tagging for positioning and anchor strings for identifying text in documents
  * @param {String} anchorString place tab matching this string
  * @param {Number} xOffset x offset from center of string, inches
  * @param {Number} xWidth width of tab in pixels
  * @returns a DocuSign tab
  */
 function makeTextTab(anchorString, tabLabel, xOffset, xWidth) {
   return docusign.Text.constructFromObject({
     anchorString: anchorString,
     anchorUnits: "inches",
     anchorCaseSensitive: false,
     anchorYOffset: "-0.12",
     anchorXOffset: xOffset,
     font: "helvetica",
     fontSize: "size11",
     bold: "false",
     locked: "false",
     tabId: anchorString,
     tabLabel: tabLabel,
     width: xWidth,
   });
 }
 
 /**
  * Creates a tab to add to a form, with an x and y offset
  * @param {String} anchorString place tab matching this string
  * @param {Number} xOffset x offset from center of string, inches
  * @param {Number} yOffset offset from center of string, inches
  * @param {Number} xWidth width of tab in pixels
  * @returns a DocuSign tab
  */
 function makeYTextTab(anchorString, tabLabel, xOffset, yOffset, xWidth) {
   return docusign.Text.constructFromObject({
     anchorString: anchorString,
     anchorUnits: "inches",
     anchorCaseSensitive: false,
     anchorYOffset: yOffset,
     anchorXOffset: xOffset,
     font: "helvetica",
     fontSize: "size11",
     bold: "false",
     locked: "false",
     tabId: anchorString,
     tabLabel: anchorString,
     width: xWidth,
   });
 }
 
 /**
  * Formats object of DocuSign envelope details with multiple documents
  * @param {Array} docs array of document enums to be included in this envelope
  * @param {object} req request
  * @param {object} res result
  */
 documentInfo.makeEnvelopeDetails = (docs, req, res) => {
   // extract values request
   const body = req.body;
 
   const prefillVals = {};
   const dsTabs = {
     parentTabs: {
       //   signHereTabs: [],
       //   dateSignedTabs: []
     },
     socWorkTabs: {
       //   signHereTabs: [],
       //   dateSignedTabs: []
     },
   };
   const recipients = {
     signers: [],
   };
   let displayName = body.parentName + "'s Habitat for Humanity Home Application";
 
   docs.forEach((doc) => {
     switch (doc) {
       case documents.FAMILY:
        prefillVals.parentName = body.parentName;
        prefillVals.parentAddress = body.parentAddress;
        prefillVals.parentCity = body.parentCity;
        prefillVals.parentZip = body.parentZip;
        prefillVals.parentPhone = body.parentPhone;
        prefillVals.parentCell = body.parentCell;
        prefillVals.parentEmail = body.parentEmail;

 
         // document recipients, must have at least name and email
         recipients.signers.push({
           name: body.parentName,
           email: body.parentEmail,
         });
 
         // docusign tabs
         dsTabs.parentTabs.signHereTabs = [
           docusign.SignHere.constructFromObject({
             anchorString: "Applicant Signature",
             anchorYOffset: "-0.2",
             anchorIgnoreIfNotPresent: "false",
             anchorUnits: "inches",
           }),
         ];
         dsTabs.parentTabs.dateSignedTabs = [
           docusign.DateSigned.constructFromObject({
             anchorString: "Date",
             anchorYOffset: "0",
             anchorXOffset: "0.3",
             anchorUnits: "inches",
             tabLabel: "Date",
           }),
         ];
 
         break;

         case documents.ADMIN:
  
          // document recipients, currently preset to my email as I am the acting admin/reviewer
          recipients.signers.push({
            name: "Farzan Bhuiyan",
            email: "farzanishrak@gmail.com",
          });
  
          // docusign tabs
          dsTabs.socWorkTabs.signHereTabs = [
            docusign.SignHere.constructFromObject({
              anchorString: "Sign",
              anchorXOffset: "3",
              anchorUnits: "inches",
            }),
          ];
          dsTabs.socWorkTabs.dateSignedTabs = [
            docusign.DateSigned.constructFromObject({
              anchorString: "Sign",
              anchorYOffset: "0.40",
              anchorXOffset: "0.45",
              anchorUnits: "inches",
              tabLabel: "Date Signed",
            }),
            docusign.DateSigned.constructFromObject({
              anchorString: "deserving families",
              anchorYOffset: "0.3",
              anchorUnits: "inches",
              fontColor: "White",
              tabLabel: "Date Signed",
            }),
          ];
          break;

       default:
         throw new Error("Document not found");
     }
   });
   return {
     docPaths: docs,
     displayName: displayName,
     prefillVals: prefillVals,
     dsTabs: dsTabs, // signHereTabs, dateSignedTabs, checkboxTabs, textTabs
     recipients: recipients, // signers
   };
 };
