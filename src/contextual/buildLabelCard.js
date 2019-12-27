function buildLabelCard(e){
  // Activate temporary Gmail add-on scopes.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);
  var messageId = e.messageMetadata.messageId;
  var message = GmailApp.getMessageById(messageId);
  // Get user and thread labels as arrays to enable quick sorting and indexing.
  var threadLabels = message.getThread().getLabels();
  var labels = getLabelArray(GmailApp.getUserLabels());
  var labelsInUse = getLabelArray(threadLabels);
  
  // Create a section for that contains all user Labels.
  var section = CardService.newCardSection()
    .setHeader("<font color=\"#1257e0\"><b>Custom Labels</b></font>")

  // Create a checkbox group for user labels that are added to prior section.
  var checkboxGroup = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.CHECK_BOX)
    .setFieldName('labels')
    .setOnChangeAction(
      CardService.newAction()
      .setFunctionName('toggleLabel')
      .setLoadIndicator(CardService.LoadIndicator.SPINNER)
    )

  // Add checkbox with name and selected value for each User Label.
  for(var i = 0; i < labels.length; i++) {
    checkboxGroup.addItem(labels[i], labels[i], labelsInUse.indexOf(labels[i])!= -1);
  }
  // Add the checkbox group to the section.
  section.addWidget(checkboxGroup);

  // create a text input for user to add label
  var textInput = CardService.newTextInput()
    .setTitle("Add new label")
    .setFieldName("new_label")
    .setOnChangeAction(CardService.newAction().setFunctionName("handleNewLabelInput").setLoadIndicator(CardService.LoadIndicator.SPINNER));
  // add to the section
  section.addWidget(textInput);

  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Quick Label')
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png')
    )
    .addSection(section)
    .build();

  return card;
}

function handleNewLabelInput(e){
  var newLabel = e.formInputs.new_label[0];
  // Activate temporary Gmail add-on scopes.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  var messageId = e.messageMetadata.messageId;
  var message = GmailApp.getMessageById(messageId);
  var thread = message.getThread();

  var threadLabels = message.getThread().getLabels();
  var labels = getLabelArray(GmailApp.getUserLabels());
  var labelsInUse = getLabelArray(threadLabels);

  // create label if the input label does not already exist
  if(labels.indexOf(newLabel) == -1){
    var labelObj = GmailApp.createLabel(newLabel);
    thread.addLabel(labelObj);
  }
  // if label exists, just add to the thread
  else if(labelsInUse.indexOf(newLabel) == -1){
    var labelObj = GmailApp.getUserLabelByName(newLabel);
    thread.addLabel(labelObj);
  }

  // refresh the message so new labels will show up
  message.refresh();

  // clear input value and add the new label to checkboxes by updating the whole card
  var navigation = CardService.newNavigation().updateCard(buildLabelCard(e));
  return CardService.newActionResponseBuilder().setNavigation(navigation).build();
}


/**
 * Updates the labels on the current thread based on 
 * user selections. Runs via the OnChangeAction for
 * each CHECK_BOX created.
 *
 * @param {Object} e The data provided by the Gmail UI.
*/
function toggleLabel(e){
  Logger.log('****** toggleLabel, e = ', e);
  var selected = e.formInputs.labels;

  // Activate temporary Gmail add-on scopes.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  var messageId = e.messageMetadata.messageId;
  var message = GmailApp.getMessageById(messageId);
  var thread = message.getThread();

  if (selected != null){
     for each (var label in GmailApp.getUserLabels()) {
       if(selected.indexOf(label.getName()) != -1){
          thread.addLabel(label);
       }
       else {
         thread.removeLabel(label);
       }
     }
  }
  else {
    for each (var label in GmailApp.getUserLabels()) {
      thread.removeLabel(label);
    }
  }
}

/**
 * Converts an GmailLabel object to a array of strings. 
 * Used for easy sorting and to determine if a value exists.
 *
 * @param {labelsObjects} A GmailLabel object array.
 * @return {lables[]} An array of labels names as strings.
*/
function getLabelArray(labelsObjects){
  var labels = [];
  for(var i = 0; i < labelsObjects.length; i++) {
    labels[i] = labelsObjects[i].getName();
  }
  labels.sort();
  return labels;
}