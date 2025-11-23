interface WordleActions {
  /**
   * Xử lý khi người dùng nhập phím trên bàn phím
   *
   * @param key : Phím mà người dùng vừa nhập
   */
  handleKeyup: (key: string) => void;

  /**
   * Thiết lập lại trạng thái rung của ô chữ
   *
   * Trạng thái rung của ô chữ sẽ xảy ra khi người dùng nhập input không hợp lệ
   */
  resetShake: () => void;

  /**
   * Thiết lập lại trạng thái của trò chơi
   */
  resetGame: () => void;
}

export default WordleActions;
