(() => {
  const gameContainer = document.querySelector('.pongrid');

  const gridEl = gameContainer.querySelector('.screen');
  const ballEl = gameContainer.querySelector('.ball');
  const leftPaddleEl = gameContainer.querySelector('.left-paddle');
  const leftScoreEl = gameContainer.querySelector('.left-score');
  const rightPaddleEl = gameContainer.querySelector('.right-paddle');
  const rightScoreEl = gameContainer.querySelector('.right-score');

  const width = parseInt(getComputedStyle(gridEl).getPropertyValue('--width'), 10);
  const height = parseInt(getComputedStyle(gridEl).getPropertyValue('--height'), 10);

  const paddleHeight = 10;
  const ballSize = 4;
  const paddleSpeed = 1;
  const ballSpeed = .6;

  const leftPaddle = {
    x: 1,
    y: height / 2 - paddleHeight / 2,
    width: 2,
    height: paddleHeight,
    dy: 0,
    score: 0
  };

  const rightPaddle = {
    x: width - 3,
    y: height / 2 - paddleHeight / 2,
    width: 2,
    height: paddleHeight,
    dy: 0,
    score: 0
  };

  const ball = {
    x: width / ballSize - 1,
    y: height / ballSize - 1,
    width: ballSize,
    height: ballSize,
    dx: ballSpeed,
    dy: -ballSpeed
  };

  function collides(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y;
  }

  function drawLeftPaddle() {
    const x = Math.round(leftPaddle.x + 1);
    const y = Math.round(leftPaddle.y + 1);
    const w = leftPaddle.width;
    const h = leftPaddle.height;

    leftPaddleEl.style.gridColumn = `${x} / span ${w}`;
    leftPaddleEl.style.gridRow = `${y} / span ${h}`;
  }

  function drawRightPaddle() {
    const x = Math.round(rightPaddle.x + 1);
    const y = Math.round(rightPaddle.y + 1);
    const w = rightPaddle.width;
    const h = rightPaddle.height;

    rightPaddleEl.style.gridColumn = `${x} / span ${w}`;
    rightPaddleEl.style.gridRow = `${y} / span ${h}`;
  }

  function drawBall() {
    const x = Math.round(ball.x + 1);
    const y = Math.round(ball.y + 1);
    const w = ball.width;
    const h = ball.height;

    // What I learned: doing this will set the grid-area property and its syntax is:
    // rowStart / colStart / rowEnd / colEnd. Pretty neat!
    ballEl.style.gridColumn = `${x} / span ${w}`;
    ballEl.style.gridRow = `${y} / span ${h}`;
  }

  function drawScore() {
    leftScoreEl.textContent = leftPaddle.score;
    rightScoreEl.textContent = rightPaddle.score;
  }

  let isPlaying = false;

  // game loop
  function loop() {
    isPlaying && requestAnimationFrame(loop);

    // move paddles by their velocity
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    const maxPaddleY = height - leftPaddle.height - 1;

    // prevent paddles from going through walls
    if (leftPaddle.y < 1) {
      leftPaddle.y = 1;
    }
    else if (leftPaddle.y > maxPaddleY) {
      leftPaddle.y = maxPaddleY;
    }

    if (rightPaddle.y < 1) {
      rightPaddle.y = 1;
    }
    else if (rightPaddle.y > maxPaddleY) {
      rightPaddle.y = maxPaddleY;
    }

    // draw paddles
    drawLeftPaddle();
    drawRightPaddle();

    // move ball by its velocity
    ball.x += ball.dx;
    ball.y += ball.dy;

    // prevent ball from going through walls by changing its velocity
    if (ball.y < 1) {
      ball.y = 1;
      ball.dy *= -1;
    }
    else if (ball.y + 1 > height - 1) {
      ball.y = height - 2;
      ball.dy *= -1;
    }

    // reset ball if it goes past paddle (but only if we haven't already done so)
    if (ball.x < 0 || ball.x > width) {
      // Count a point for the other player
      if (ball.x < 0) {
        rightPaddle.score += 1;
      } else {
        leftPaddle.score += 1;
      }

      drawScore();

      ball.x = width / 2;
      ball.y = height / 2;
    }

    // check to see if ball collides with paddle. if they do change x velocity
    if (collides(ball, leftPaddle)) {
      ball.dx *= -1;

      // move ball next to the paddle otherwise the collision will happen again
      // in the next frame
      ball.x = leftPaddle.x + leftPaddle.width;
    }
    else if (collides(ball, rightPaddle)) {
      ball.dx *= -1;

      // move ball next to the paddle otherwise the collision will happen again
      // in the next frame
      ball.x = rightPaddle.x - ball.width;
    }

    // draw ball
    drawBall();
  }

  // listen to keyboard events to move the paddles
  document.addEventListener('keydown', function (e) {
    if (e.key === 'o') {
      rightPaddle.dy = -paddleSpeed;
    } else if (e.key === 'l') {
      rightPaddle.dy = paddleSpeed;
    }

    if (e.key === 'w') {
      leftPaddle.dy = -paddleSpeed;
    } else if (e.key === 's') {
      leftPaddle.dy = paddleSpeed;
    }
  });

  // listen to keyboard events to stop the paddle if key is released
  document.addEventListener('keyup', function (e) {
    if (e.key === 'o' || e.key === 'l') {
      rightPaddle.dy = 0;
    }

    if (e.key === 'w' || e.key === 's') {
      leftPaddle.dy = 0;
    }
  });

  gameContainer.addEventListener('click', startStop);
  gameContainer.addEventListener('keypress', e => {
    if (e.key === ' ' || e.key === 'Enter') {
      startStop();
    }
  });

  function startStop() {
    if (!isPlaying) {
      isPlaying = true;
      loop();
    } else {
      isPlaying = false;
    }
  }

  drawBall();
  drawLeftPaddle();
  drawRightPaddle();
  drawScore();
})();
