function buildExternalCard(e){
    // Create a section for that contains all user Labels.
  var section = CardService.newCardSection()
    .setHeader("<font color=\"#1257e0\"><b>Pass input to external API</b></font>")

  // Create dropdowns
  var dropdown1 = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.DROPDOWN)
    .setFieldName('dropdown1')
    .addItem('option 1', 'option1', false)
    .addItem('option 2', 'option2', false)
    .addItem('option 3', 'option3', false);

  var dropdown2 = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.DROPDOWN)
    .setFieldName('dropdown2')
    .addItem('option 1', 'option1', false)
    .addItem('option 2', 'option2', false)
    .addItem('option 3', 'option3', false);

  // Add the checkbox group to the section.
  section.addWidget(dropdown1);
  section.addWidget(dropdown2);

  var textInput = CardService.newTextInput()
    .setTitle("api key from News API")
    .setFieldName("api_key")
  // add to the section
  section.addWidget(textInput);

  var tp = CardService.newTextParagraph()
    .setText("To get api key, register at <a href=\"https://newsapi.org/\">here</a>.");
  section.addWidget(tp);

  // Add send button
  var btnAction = CardService.newAction().setFunctionName('onConfirmDropdown');
  var btn = CardService.newTextButton()
    .setText("Confirm")
    .setOnClickAction(btnAction);

  section.addWidget(btn);

  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Call External API')
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png')
    )
    .addSection(section)
    .build();
  return card;
}


function onConfirmDropdown(e){
  var field = {'dropdown1': e.formInputs.dropdown1[0], 'dropdown2': e.formInputs.dropdown2[0]};
  var apiKey = e.formInputs.api_key[0];
  Logger.log('onConfirmDropdown, field = ', field, ', apiKey = ', apiKey);

  // fetch a 3rd party api (no oauth needed)
  var key = '75dd6c8bfe4943928a057d46fecd73cc';
  var endpoint = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;
  var response = UrlFetchApp.fetch(endpoint);

  if(response.getResponseCode() === 200){
    var content = response.getContentText();
    return showSuccessCard(content);
  }
  else{
    return showFailureCard(response.getResponseCode());
  }
}

function showFailureCard(code){
  Logger.log('showFailureCard, ', code);
  var np = CardService.newTextParagraph()
    .setText(code);
  var section = CardService.newCardSection()
    .setHeader("<font color=\"#1257e0\"><b>Response code:</b></font>")
  section.addWidget(np);
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Call External API - result')
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png')
    )
    .addSection(section)
    .build();
  // navigation
  var navigation = CardService.newNavigation().pushCard(card);
  return CardService.newActionResponseBuilder().setNavigation(navigation).build();
}

function showSuccessCard(content){
  Logger.log('showSuccessCard');
  var np = CardService.newTextParagraph()
    .setText(content);
  var section = CardService.newCardSection()
    .setHeader("<font color=\"#1257e0\"><b>Response content:</b></font>")
  section.addWidget(np);
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Call External API - result')
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png')
    )
    .addSection(section)
    .build();
  // navigation
  var navigation = CardService.newNavigation().pushCard(card);
  return CardService.newActionResponseBuilder().setNavigation(navigation).build();
}