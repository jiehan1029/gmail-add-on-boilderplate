function buildComposeAddOn(e) {
  console.info(e);

  var infoWidgetCard = buildInfoWidgetCard(e);
  var externalCard = buildExternalCard(e);

  return [infoWidgetCard, externalCard];
}