// to change the button disable state, re-build UI upon callback
function buildButtonCard(e, disableBtn3){
  // by default, disable btn3
  if(typeof disableBtn3 === 'undefined'){
    disableBtn3 = true;
  }
  
  // filled button, open link directly
  var btn1 = CardService.newTextButton()
    .setText("Open Link")
    .setBackgroundColor('#a05bcf')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setOpenLink(CardService.newOpenLink()
        .setUrl("https://www.google.com"));

  // do sth else besides open link, eg. change other btn's state
  var btn2Action = CardService.newAction().setFunctionName('btn2OnClickCallback');
  var btn2 = CardService.newTextButton()
    .setText("onClick Action")
    .setOnClickAction(btn2Action);
  
  // onclick callback
  var btn3Action = CardService.newAction().setFunctionName('btn3OnClickCallback');
  var btn3 = CardService.newTextButton()
    .setText("Disabled")
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setDisabled(disableBtn3)
    .setOnClickAction(btn3Action);
  
  // image button
  var btn4 = CardService.newImageButton()
    .setAltText("An image button with an airplane icon.")
    .setIcon(CardService.Icon.AIRPLANE)
    .setOpenLink(CardService.newOpenLink()
        .setUrl("https://airplane.com"));

  // trigger compose
  var btn5Action = CardService.newAction().setFunctionName('btn5OnClickCallback');
  var btn5 = CardService.newTextButton()
    .setText("Compose Action")
    .setComposeAction(btn5Action, CardService.ComposedEmailType.REPLY_AS_DRAFT)
  
  var buttonSet = CardService.newButtonSet()
    .addButton(btn1)
    .addButton(btn2)
    .addButton(btn3)
    .addButton(btn4)
    .addButton(btn5)
  
  // Create a section for that contains all user Labels.
  var section = CardService.newCardSection()
    .setHeader("<font color=\"#a05bcf\"><b>Buttons</b></font>")
  section.addWidget(buttonSet);

  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Button UI')
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png')
    )
    .addSection(section)
    .build();

  return card;
}

function btn2OnClickCallback(e){
  // enable btn3 by rebuilding the whole UI
  // updateCard => update in-place
  var navigation = CardService.newNavigation().updateCard(buildButtonCard(e, false));
  return CardService.newActionResponseBuilder().setNavigation(navigation).build();
}

function btn3OnClickCallback(){
  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification()
        .setText("Some info to display to user"))
    .build();
}

function btn5OnClickCallback(e) {
  // Activate temporary Gmail add-on scopes.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);
  // find thread by message
  var messageId = e.messageMetadata.messageId;
  var message = GmailApp.getMessageById(messageId);
  var thread = message.getThread();
  // build draft
  var draft = thread.createDraftReply('This is a reply');
  return CardService.newComposeActionResponseBuilder()
      .setGmailDraft(draft)
      .build();
}
