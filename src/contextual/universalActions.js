/**
 * Create a collection of cards to control the add-on settings and
 * present other information. These cards are displayed in a list when
 * the user selects the associated "Open settings" universal action.
 *
 * @param {Object} e an event object
 * @return {UniversalActionResponse}
 */
function createSettingsResponse(e) {
  return CardService.newUniversalActionResponseBuilder()
      .displayAddOnCards(
          [createSettingCard(), createAboutCard()])
      .build();
}

/**
 * Create and return a built settings card.
 * @return {Card}
 */
function createSettingCard() {
  var section = CardService.newCardSection()
        .setHeader("<font color=\"#1257e0\"><b>section header</b></font>")
        .addWidget(CardService.newSelectionInput()
            .setType(CardService.SelectionInputType.CHECK_BOX)
            .setFieldName('settings')
            .addItem("Ask before deleting contact", "contact", false)
            .addItem("Ask before deleting cache", "cache", false)
            .addItem("Preserve contact ID after deletion", "contactId", false));
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Settings Dummy')
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png'))
    .addSection(section)
    .build();
  return card;
}

/**
 * Create and return a built 'About' informational card.
 * @return {Card}
 */
function createAboutCard() {
  var section = CardService.newCardSection()
        .addWidget(CardService.newTextParagraph()
            .setText('This add-on manages contact information. For more '
                + 'details see the <a href="https://www.google.com/help">'
                + 'help page</a>.'));
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('About Dummy'))
    .addSection(section)
    .build();
  return card;
}


function showErrorUIexample() {
  try{
    throw 'this is an error!';
  }
  catch(e){
    // render an error UI
    return buildErrorUI();
  }
}

function buildErrorUI() {
  var section = CardService.newCardSection()
        .setHeader("<font color=\"#1257e0\"><b>Custom Error UI</b></font>")
        .addWidget(CardService.newTextParagraph()
            .setText('Define user friendly UI whenever error happened.'));
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Error Handling')
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png'))
    .addSection(section)
    .build();
  return [card];
}