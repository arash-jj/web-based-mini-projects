import type { CardState } from '../constants';
import { CardState as CardStateValue, STATE_PROGRESSION } from '../constants';

export interface Card {
  id: number;
  title: string;
  state: CardState;
  blocked: boolean;
}
export const getNextState = (currentState: CardState): CardState => {
  const currentIndex = STATE_PROGRESSION.indexOf(currentState);
  const nextIndex = currentIndex + 1;
  
  if (nextIndex < STATE_PROGRESSION.length) {
    return STATE_PROGRESSION[nextIndex];
  }
  
  return currentState;
};
export const moveCardToNextState = (card: Card): Card => {
  return {
    ...card,
    state: getNextState(card.state),
  };
};
export const isCardBlocked = (card: Card): boolean => {
  return card.blocked || card.state === CardStateValue.DONE;
};
export const toggleCardBlocked = (card: Card): Card => {
  return {
    ...card,
    blocked: !card.blocked,
  };
};
export const resetCard = (card: Card): Card => {
  return {
    ...card,
    state: CardStateValue.TODO,
    blocked: false,
  };
};
