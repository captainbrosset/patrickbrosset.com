(() => {
  const gameContainer = document.querySelector(".whack-a-dialog");

  const MIN_SHOW_TIME = 900;
  const MAX_SHOW_TIME = 1200;
  const MIN_ROUND_WAIT = 900;
  const MAX_ROUND_WAIT = 2500;

  class Score {
    constructor(element, dialogs, player) {
      this.element = element;
      this.dialogs = dialogs;
      this.player = player;
      this.update();
    }

    playerScores() {
      this.player += 1;
      this.update();
    }

    dialogScores() {
      this.dialogs += 1;
      this.update();
    }

    reset() {
      this.player = 0;
      this.dialogs = 0;
      this.update();
    }

    update() {
      this.element.textContent = `You: ${this.player} | Dialogs: ${this.dialogs}`;
    }
  }

  const dialogs = [
    gameContainer.querySelector("#dialog1"),
    gameContainer.querySelector("#dialog2"),
    gameContainer.querySelector("#dialog3"),
    gameContainer.querySelector("#dialog4"),
    gameContainer.querySelector("#dialog5")
  ];

  const score = new Score(gameContainer.querySelector(".scores"), 0, 0);

  function getRandomClosedDialog() {
    const closedDialogs = dialogs.filter(dialog => !dialog.open);
    const index = Math.floor(Math.random() * closedDialogs.length);
    return closedDialogs[index];
  }

  dialogs.forEach(d => d.addEventListener("close", (event) => {
    // TIL: since I use commandfor/command, I don't have JS code I can use to count scores.
    // So I can use the returnValue on the general close event instead. Set via the `value` attribute on buttons.
    // Also can be set via close(returnValue) in JS.
    if (d.returnValue === "closed-by-timeout") {
      score.dialogScores();
    }

    if (d.returnValue === "closed-by-player") {
      score.playerScores();
    }
  }));

  let gameRunning = false;
  let timeoutIds = [];

  function loop() {
    if (!gameRunning) {
      return;
    }

    const randomNumberOfDialogs = Math.floor(Math.random() * 2) + 1;

    for (let i = 0; i < randomNumberOfDialogs; i++) {
      const dialog = getRandomClosedDialog();
      if (!dialog) {
        continue;
      }

      dialog.show();
      const randomShowTime = Math.random() * (MAX_SHOW_TIME - MIN_SHOW_TIME) + MIN_SHOW_TIME;
      const timeoutId = setTimeout(() => {
        if (!dialog.open) {
          return;
        }
        dialog.close("closed-by-timeout");
      }, randomShowTime);
      timeoutIds.push(timeoutId);
    }

    // After a random time, loop again.
    const randomWaitTime = Math.random() * (MAX_ROUND_WAIT - MIN_ROUND_WAIT) + MIN_ROUND_WAIT;
    const loopTimeoutId = setTimeout(() => {
      loop();
    }, randomWaitTime);
    timeoutIds.push(loopTimeoutId);
  }

  const startButton = gameContainer.querySelector("#start");
  const stopButton = gameContainer.querySelector("#stop");

  startButton.addEventListener("click", () => {
    // Reset score when starting a new game
    score.reset();

    startButton.style.display = "none";
    stopButton.style.display = "block";
    gameRunning = true;
    loop();
  });

  stopButton.addEventListener("click", () => {
    gameRunning = false;

    // Clear all pending timeouts
    timeoutIds.forEach(id => clearTimeout(id));
    timeoutIds = [];

    // Close all open dialogs
    dialogs.forEach(dialog => {
      if (dialog.open) {
        dialog.close();
      }
    });

    // Show start button and hide stop button
    stopButton.style.display = "none";
    startButton.style.display = "block";
  });
})();
