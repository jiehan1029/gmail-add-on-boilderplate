function buildInfoWidgetCard(e){
	// multi-line key value
  var btnAction = CardService.newAction().setFunctionName('navToButtonCard');
	var btn = CardService.newTextButton()
    .setText("nav button")
    .setOnClickAction(btnAction);
	var kvBtn = CardService.newKeyValue()
    .setTopLabel("Top label - single line")
    .setContent("<font color=\"#ea9999\">Multi-line content<br/>next line</font>")
    .setMultiline(true)
    .setBottomLabel("Bottom label - single line")
    .setButton(btn);

	var txt = CardService.newTextParagraph()
    .setText("This is a <b>text paragraph</b> widget.<br/><u>Multiple</u> lines are allowed if needed.");

	var img = CardService.newImage()
		.setAltText("A nice image")
		.setImageUrl("https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100");

	// Create a section for that contains all user Labels.
  var section = CardService.newCardSection()
    .setHeader("<font color=\"#fcba03\"><b>Info Widget</b></font>")
  section
  	.addWidget(kvBtn)
  	.addWidget(txt)
  	.addWidget(img)

  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Informative Widget')
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png')
    )
    .addSection(section)
    .build();

  return card;
}

function navToButtonCard(e){
  // pushCard => push the card to stack
  var navigation = CardService.newNavigation().pushCard(buildButtonCard(e));
  return CardService.newActionResponseBuilder().setNavigation(navigation).build();
}