// Timer Code Start. Tip o' the hat: https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/

function formatTimeLeft(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
  }

  // Start with an initial value of 20 seconds
  const TIME_LIMIT = 15;

  // Initially, no time has passed, but this will count up
  // and subtract from the TIME_LIMIT
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  const $timeRemaining = document.getElementById('base-timer-label');

  $timeRemaining.innerHTML = `${formatTimeLeft(timeLeft)}`;

  let timerInterval = null;

  function startTimer() {
    timerInterval = setInterval(() => {

      // The amount of time passed increments by one
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;

      // The time left label is updated
      document.getElementById("base-timer-label").innerHTML = `${formatTimeLeft(timeLeft)}`;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        $startRound.textContent = 'Start The Round!';
        $celeb.textContent = 'Your Turn Is Over';
        $hint.textContent = `You got ${soloRoundState.score} on your turn`;
      }
      setCircleDasharray();
      setRemainingPathColor(timeLeft)
    }, 1000);
  }

  // Warning occurs at 10s
  const WARNING_THRESHOLD = 10;
  // Alert occurs at 5s
  const ALERT_THRESHOLD = 5;

  const COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD
    }
  };

  let remainingPathColor = COLOR_CODES.info.color;

  document.getElementById('base-timer-path-remaining').classList.add(remainingPathColor);

  // Divides time left by the defined time limit.
  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  const FULL_DASH_ARRAY = 283;
  // Update the dasharray value as time passes, starting with 283
  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;

    // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);

    // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }
