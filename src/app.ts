import { CustomEventListenerType, StyleType } from "../types/types"

class Game {
    private cards: NodeListOf<Element> | any;
    private classList: { add: (arg0: string) => void; };
    private static hasFlippedCard: boolean;
    private static lockBoard: boolean;
    private static select_1: any;
    private static select_2: any;
  
    constructor() {
      this.cards = document.querySelectorAll(".memory-card");
      this.shuffle();
      this.resetBoard();
      this.initializeListenersForEachCard();
    }
  
    initializeListenersForEachCard(): void {
      this.cards.forEach((card: CustomEventListenerType) => {
        return card.addEventListener("click", this.openCard);
      });
    }
  
    openCard(): void {
      if (Game.lockBoard) return;
      if (this === Game.select_1) return;

      this.classList.add("flip");
        if (!Game.hasFlippedCard) {
        Game.hasFlippedCard = true;
        Game.select_1 = this;
        return;
      }
      Game.select_2 = this;
      Game.prototype.checkForMatch();
    }
  
    checkForMatch(): void {
      if (Game.select_1.dataset.icon === Game.select_2.dataset.icon) {
        Game.select_1.removeEventListener("click", this.openCard);
        Game.select_2.removeEventListener("click", this.openCard);
        this.resetBoard();
      } else {
        Game.lockBoard = true;
  
        setTimeout(() => {
          Game.select_1.classList.remove("flip");
          Game.select_2.classList.remove("flip");
          this.resetBoard();
        }, 1000);
      }
    }
  
    resetBoard(): void {
      Game.hasFlippedCard = false;
      Game.lockBoard = false;
      Game.select_1 = null;
      Game.select_2 = null;
    }
  
    shuffle(): void {
      this.cards.forEach((card: StyleType): void => {
        card.style.order = Math.floor(Math.random() * 30);
      });
    }
  }
  
  const game = new Game();
  