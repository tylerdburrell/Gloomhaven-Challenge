var positiveEffectsArray = Array ("Every kill gains 1 experience point",
"Gold picked up in the scenario is worth its value +1",
"Player gains 5 gold per door they open up during the scenario",
"Player may take two battle cards into the scenario",
"Every healing action gains 1 experience point",
"If you draw a blessing, gain 5 gold",
"At the end of the scenario you must take two gold pieces from a teammate",
"Every time you kill a monster they drop 2 gold",
"Take battle card from  one teammate");

var negativeEffectsArray = Array ("Start scenario with one lost card chosen by a teammate",
"Start scenario with two discarded cards at random",
"Have one item taken from your item selection chosen by your teammate for the scenario",
"Add one elite ooze to a room of your choice",
"Player starts scenario with poison & disarm",
"Player starts scenario with immobilize & wound",
"Spawn a random elite demon in a room of your choice",
"Spawn one normal bandit gaurd adjacent to self at the beginning of the scenario",
"Replace your highest-level card with a level 1 or x card",
"Remove the 2x modifier card in your deck and add a curse",
"Player gains disadvantage on all attacks for the first five rounds",
"Player may not long rest during the scenario",
"Enter the game at the beginning of round two",
"Increase initiative by 10 for every round",
"spent items are now consumed items",
"Player can take no hand item cards into the scenario",
"Player can take no head item cards into the scenario",
"Player can take no chest item cards into the scenario",
"Player can take no feet item cards into the scenario",
"Player must take one less small item card into the scenario",
"Make one normal enemy elite");


function randomEffects() {
  var randomPositive = positiveEffectsArray[Math.floor(Math.random()*positiveEffectsArray.length)];
  var randomNegative = negativeEffectsArray[Math.floor(Math.random()*negativeEffectsArray.length)];
  document.getElementById('positiveEffect').innerHTML = randomPositive;
  document.getElementById('negativeEffect').innerHTML = randomNegative;
}
