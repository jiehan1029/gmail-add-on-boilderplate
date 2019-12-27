/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns the array of cards that should be rendered for the current
 * e-mail thread. The name of this function is specified in the
 * manifest 'onTriggerFunction' field, indicating that this function
 * runs every time the add-on is started.
 *
 * @param {Object} e The data provided by the Gmail UI.
 * @return {Card[]}
 */
function buildContextualAddOn(e, disabledBtn3) {
  Logger.log('buildContextualAddOn, ', e, disabledBtn3)

  var labelCard = buildLabelCard(e);
  var buttonCard = buildButtonCard(e, disabledBtn3);
  var infoWidgetCard = buildInfoWidgetCard(e);
  var externalCard = buildExternalCard(e);

  return [labelCard, buttonCard, infoWidgetCard, externalCard];
}