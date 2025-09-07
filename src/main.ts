import { format } from "date-fns";
(function () {
  const inputWork = document.getElementById("work-time") as HTMLInputElement;
  const inputRest = document.getElementById("rest-time") as HTMLInputElement;
  // let inputWorkValue = parseInt(inputWork.value);
  // let inputRestValue = parseInt(inputRest.value);
  const TIME_LIMIT = 3540;

  let isWork = true;
  const timeDisplay = document.getElementById("timer");
  const buttonContainer = document.getElementById("button-container");
  let isLoop = false;

  buttonContainer?.addEventListener("click", eventHandler);

  function eventHandler(e: Event) {
    e.preventDefault();
    const eventTarget = e.target as HTMLButtonElement;
    const eventTargetId = eventTarget.getAttribute("id");
    switch (eventTargetId) {
      case "button-start":
        if (!isLoop) {
          isLoop = true;
          timerHandler();
        }
        break;
      case "button-reset":
        isLoop = false;
        isWork = true;
        break;
    }
  }

  function timer(duration: number = 1) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const dateFromSecond = new Date(duration * 1000); //second to milisecond
        const timeNow = format(dateFromSecond, "mm:ss");
        duration--;
        if (timeDisplay) {
          timeDisplay.textContent = timeNow;
        }
        if (duration < 0) {
          isWork = !isWork;
          clearInterval(interval);
          resolve("Timer Done");
        }
        if (!isLoop) {
          clearInterval(interval);
          if (timeDisplay) {
            timeDisplay.textContent = "00:00";
            resetInput();
          }
        }
      }, 1000);
    });
  }

  async function timerHandler() {
    const workTime = parseInt(inputWork.value) * 60;
    const restTime = parseInt(inputRest.value) * 60;
    console.log(workTime + " dan " + restTime)

    if (workTime && restTime) {
      if (workTime > TIME_LIMIT && restTime > TIME_LIMIT) {
        invalidInput("TIME CANNOT EXCEED 59 MINUTES");
      }
      while (isLoop) {
        if (isWork) {
          await timer(workTime);
        } else {
          await timer(restTime);
        }
      }
    } else {
      invalidInput("INVALID INPUT");
    }
  }

  function resetInput() {
    inputWork.value = "";
    inputRest.value = "";
  }

  function invalidInput(error: string) {
    alert(error);
    resetInput();
    isLoop = false;
  }
})();
