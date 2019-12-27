function buildComposeAddOn(e) {
	Logger.log('buildComposeAddOn', e)
  var infoWidgetCard = buildInfoWidgetCard(e);
  var externalCard = buildExternalCard(e);
  var draftCard = buildDraftCard(e);

  return [infoWidgetCard, externalCard, draftCard];
}



function buildDraftCard(e, status){
	var txt = CardService.newTextParagraph()
    .setText("Click on the button to send message or create a draft");

	var textareaInput1 = CardService.newTextInput()
    .setFieldName("message_to")
    .setTitle("to (recipient)")

  var textareaInput2 = CardService.newTextInput()
    .setFieldName("message_sl")
    .setTitle("subject line")

  var textareaInput3 = CardService.newTextInput()
    .setFieldName("message_body")
    .setTitle("message body")
    .setMultiline(true)

  var sendBtnAction = CardService.newAction().setFunctionName('sendMessage');
  var sendBtn = CardService.newTextButton()
    .setText("Send Message")
    .setOnClickAction(sendBtnAction);
  // setParameters key-value pair must all be string
  var draftBtnAction = CardService.newAction().setFunctionName('draftnSend').setParameters({'send': 'false'});;
  var draftBtn = CardService.newTextButton()
    .setText("Draft & Save")
    .setOnClickAction(draftBtnAction);
  var draftSendBtnAction = CardService.newAction().setFunctionName('draftnSend').setParameters({'send': 'true'});
  var draftnSendBtn = CardService.newTextButton()
    .setText("Draft & Send")
    .setOnClickAction(draftSendBtnAction);
  var buttonSet = CardService.newButtonSet()
    .addButton(sendBtn)
    .addButton(draftBtn)
    .addButton(draftnSendBtn)

  var section = CardService.newCardSection()
  	.addWidget(txt)
  	.addWidget(textareaInput1)
  	.addWidget(textareaInput2)
  	.addWidget(textareaInput3)
  	.addWidget(buttonSet)

  var successNotice = CardService.newTextParagraph()
    .setText("<font>your request is processed!</font>");
  var failureNotice = CardService.newTextParagraph()
    .setText("<font color='#f54263'>an error occured, please try again later.</font>");
  if(status === 'success'){
  	section.addWidget(successNotice);
  }
  else if(status === 'failure'){
  	section.addWidget(failureNotice)
  }
  var card = CardService.newCardBuilder()
  	.setHeader(CardService.newCardHeader()
      .setTitle('Create Draft via Gmail API')
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png')
    )
    .addSection(section)
    .build();

  return card;
}


function draftnSend(e){
	Logger.log(e)
	var body = e.formInputs.message_body[0];
	var sl = e.formInputs.message_sl[0];
	var to = e.formInputs.message_to;
  var draftInfo = createDraft(sl, to, body);
  var res = draftInfo;
  if(e.parameters.send === 'true'){
  	var draftId = draftInfo.id;
  	res = sendDraft(draftId);
  }
  console.log('res = ', res)
  if(res.error){
		var navigation = CardService.newNavigation().updateCard(buildDraftCard(e, 'failure'));
  	return CardService.newActionResponseBuilder().setNavigation(navigation).build();
  }
  else{
  	var navigation = CardService.newNavigation().updateCard(buildDraftCard(e, 'success'));
  	return CardService.newActionResponseBuilder().setNavigation(navigation).build();
  }
}

// https://stackoverflow.com/questions/17660601/create-draft-mail-using-google-apps-script
/**
 * Create an email in draft box.
 *
 * @param  {String} subjecct, subject line
 * @param  {array} to, an array of string of email addresses of recipients
 * @param  {String} body, email body
 */
function createDraft(subject, to, body) {
  var raw = 'Subject: ' + subject + '\n';
  for(var i=0; i<to.length; i++){
  	raw += 'To: ' + to[i] + '\n';
  }
  raw += 'From: ' + 'me\n';
  raw += 'Content-Type: multipart/alternative; boundary=1234567890123456789012345678\n' +
    body + '\n' + 
  	'--1234567890123456789012345678--\n';
  var draftBody = Utilities.base64Encode(raw);
  var params = {
  	muteHttpExceptions: true,
  	method:"post",
	  contentType: "application/json",
	  headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
	  muteHttpExceptions:true,
	  payload:JSON.stringify({
	    "message": {
	      "raw": draftBody
	    }
	  })
  };
  var resp = UrlFetchApp.fetch("https://www.googleapis.com/gmail/v1/users/me/drafts", params);
  return JSON.parse(resp.getContentText());
}

// debug - mail delivery system error
function sendDraft(draftId){
  var params = {
  	muteHttpExceptions: true,
  	method:"post",
	  contentType: "application/json",
	  headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
	  muteHttpExceptions:true,
	  payload:JSON.stringify({
	    "id": draftId
	  })
  };
  var resp = UrlFetchApp.fetch("https://www.googleapis.com/gmail/v1/users/me/drafts/send", params);
  return JSON.parse(resp.getContentText());	
}

// debug - mail delivery system error
function sendMessage(e){
	var body = e.formInputs.message_body[0];
	var subject = e.formInputs.message_sl[0];
	var to = e.formInputs.message_to;

  var raw = 'Subject: ' + subject + '\n';
  for(var i=0; i<to.length; i++){
  	raw += 'To: ' + to[i] + '\n';
  }
  raw += 'From: ' + 'me\n';
  raw += 'Content-Type: multipart/alternative; boundary=1234567890123456789012345678\n' +
    body + '\n' + 
  	'--1234567890123456789012345678--\n';
  var draftBody = Utilities.base64Encode(raw);
  var params = {
  	muteHttpExceptions: true,
  	method:"post",
	  contentType: "application/json",
	  headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
	  muteHttpExceptions:true,
	  payload:JSON.stringify({
	    "raw": draftBody
	  })
  };
  var resp = UrlFetchApp.fetch("https://www.googleapis.com/gmail/v1/users/me/messages/send", params);
  var jsonResp = JSON.parse(resp.getContentText());
  return jsonResp;
}