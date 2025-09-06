import { format } from "date-fns";
(function () {
  const inputWork = document.getElementById("work-time") as HTMLInputElement;
  const inputRest = document.getElementById("rest-time") as HTMLInputElement;

  let isWork = true;
  const timeDisplay = document.getElementById("timer");
  const buttonContainer = document.getElementById("button-container");
  let isLoop = true;

  buttonContainer?.addEventListener("click", eventHandler);

  function eventHandler(e: Event) {
    e.preventDefault();
    const eventTarget = e.target as HTMLButtonElement;
    const eventTargetId = eventTarget.getAttribute("id");
    switch (eventTargetId) {
      case "button-start":
        isLoop = true;
        timerHandler();
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
          }
          inputWork.value = "";
          inputRest.value = "";
        }
      }, 1000);
    });
  }

  async function timerHandler() {
    const workTime = parseInt(inputWork.value) * 60;
    const restTime = parseInt(inputRest.value) * 60;
    while (isLoop) {
      if (isWork) {
        await timer(workTime);
      } else {
        await timer(restTime);
      }
    }
  }
})();
