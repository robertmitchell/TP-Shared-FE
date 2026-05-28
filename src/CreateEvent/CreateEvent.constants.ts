export const BRACKET_TEXT = {
  NAME: `The name of the bracket.
Useful for easily distinguishing between brackets.`,
  PAYOUTS: `Use these fields if you want Tournament Planet to calculate payouts for you.
Payout calculations can be found by opening the Bracket's Alive List Print Modal.`,
  PRIZES: `This field can be used for misc prizes like swag, food, etc.
If you want Tournament Planet to calculate the payouts use the "Payouts" fields.`,
  SCORING: `Denotes how games played will have their scores are applied to different rounds of the bracket.
We'll automatically try to assign games to brackets based on your choice.

Standard - Games played will match the order scores are applied. IE: The first game's score will apply to the first round of the bracket.

Reverse - Games played will apply to the bracket in reverse order. IE: Bracket round 1's score will come from the last game played.

Mystery - Games played will apply to the bracket in an uncertain order. IE: Bracket round 1's score can come from the second or third round. 
*NOTE: If you choose "Mystery" you will have to apply the games to all rounds yourself.`,
  TYPE: `The type of bracket determines some of the details of how the bracket operates.

Eliminator - All players are matched together. The top half of scorers advance to the next round.

Singles - Players compete individually.

Double Elimination Singles - Players compete individually but must lose twice to lose completely.

Teams - Players compete as a group.`,
}
