import type { GameSetting, GameStatus } from ".";

interface WordleState {
  settings: GameSetting;

  /**
   * Các lượt từ đã đoán
   */
  guesses: string[];

  /**
   * Từ đang đoán hiện tại
   */
  currentGuess: string;

  /**
   * Trạng thái hiện tại của game
   */
  gameStatus: GameStatus;

  /**
   * Dùng để kích hoạt rung lỗi khi input nhập vào không hợp lệ
   */
  isShake: boolean;
}

export default WordleState;
