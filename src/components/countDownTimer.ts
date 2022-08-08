class CountDownTimer {

    totalSeconds: number
    intervalId?: number | null

    isRunning!: boolean
    constructor() {

        this.totalSeconds = 0

    }
    startTimer() {
        if (this.validateInput()) {
            this.intervalId = setInterval(this.displayTimer, 1000);

            //making the input elements as read only;
            let hoursElement = document.getElementById("hoursInput") as HTMLInputElement;
            let minsElement = document.getElementById("minutesInput") as HTMLInputElement;
            let secondElement = document.getElementById("secondsInput") as HTMLInputElement;
            hoursElement.readOnly = true
            minsElement.readOnly = true
            secondElement.readOnly = true
            //changing the DOM
            let pauseBtn = document.getElementById("pauseResume") as HTMLButtonElement;
            pauseBtn.disabled = false;
            let startBtn = document.getElementById("startButton") as HTMLButtonElement;
            startBtn.disabled = true;
            let stopButton = document.getElementById("stopButton") as HTMLButtonElement;
            stopButton.disabled = false;
        };



    }
    pauseTimer() {
        //pause if running & resume if paused.
        //if running
        if (this.intervalId) {
            // stop the this.interval
            clearInterval(this.intervalId);
            //make it null 
            this.intervalId = null;

            //changing the DOM
            console.log("PASUED");
            let pauseBtn = document.getElementById("pauseResume") as HTMLElement;
            pauseBtn.innerText = "Resume";
        }
        else {
            this.intervalId = setInterval(this.displayTimer, 1000);
            //changing the DOM
            console.log("RESUMED");
            let resumeBtn = document.getElementById("pauseResume") as HTMLElement;
            resumeBtn.innerText = "Pause";
        }
    }

    stopTimer() {
        if (this.intervalId) {
            // stop the this.interval
            clearInterval(this.intervalId);
            //make it null 
            this.intervalId = null;
            console.log("STOPPED");
        }
        this.reset();
    }


    displayTimer = () => {
        let hoursElement = document.getElementById("hoursInput") as HTMLInputElement;
        let minsElement = document.getElementById("minutesInput") as HTMLInputElement;
        let secondElement = document.getElementById("secondsInput") as HTMLInputElement;
        let hourValue = hoursElement.valueAsNumber;
        console.log("hourValue", hourValue);
        let minsValue = minsElement.valueAsNumber;
        console.log("minsValue", minsValue);
        let secsValue = secondElement.valueAsNumber!;
        console.log("secsValue", secsValue);

        if (hourValue == 0 && minsValue == 0 && secsValue == 1) {
            // var audio = new Audio("../../audio/Analog-alarm-clock-bell-rings-short-sound-effect.mp3");
            // audio.play();
            this.timerEnded();
            return;
        }

        // this.totalSeconds = 5;

        this.totalSeconds = (hourValue * 3600) + (minsValue * 60) + (secsValue);
        console.log("totalSeconds", this.totalSeconds);

        //its work is to decrement the seconds.
        this.totalSeconds -= 1;
        console.log("totalSeconds-1", this.totalSeconds);

        //convert the total seconds in HH MM SS
        // console.log(this);     
        const convertedTime = this.convertDisplayTime(this.totalSeconds);
        // console.log(convertedTime);
        console.log("convertedTime", convertedTime);

        //display on DOM
        hoursElement.valueAsNumber = convertedTime[0];
        minsElement.valueAsNumber = convertedTime[1];
        secondElement.valueAsNumber = convertedTime[2];
    }

    convertDisplayTime(seconds: number) {
        let hrs = 0;
        let mins = 0;
        let secs = 0;
        hrs = Math.floor(seconds / 3600);
        if (hrs < 0) { hrs = 0 };
        console.log("in convert fnctn:hrs", hrs);
        mins = Math.floor((seconds - hrs * 3600) / 60)
        if (mins < 0) { mins = 0 };
        console.log("in convert fnctn:mins", mins);
        secs = seconds - hrs * 3600 - mins * 60;
        if (secs < 0) { secs = 0 }
        console.log("in convert fnctn:secs", secs);
        const time = [hrs, mins, secs];
        // console.log(time);
        return time;
    }

    timerEnded() {
        var audio = new Audio("../../audio/music.mp3");
        audio.play();
        if (this.intervalId) {
            // stop the this.interval
            clearInterval(this.intervalId);
            //make it null 
            this.intervalId = null;
            console.log("ENDED");
        }

        setTimeout(this.reset, 3000)
        // this.reset()
    }

    reset() {
        let hoursElement = document.getElementById("hoursInput") as HTMLInputElement;
        let minsElement = document.getElementById("minutesInput") as HTMLInputElement;
        let secondElement = document.getElementById("secondsInput") as HTMLInputElement;

        //resetting hh mm ss
        this.totalSeconds = 0;
        hoursElement.valueAsNumber = 0;
        minsElement.valueAsNumber = 0
        secondElement.valueAsNumber = 0;

        //making the input elements as read only;         
        hoursElement.readOnly = false
        minsElement.readOnly = false
        secondElement.readOnly = false

        //changing the DOM
        let startBtn = document.getElementById("startButton") as HTMLButtonElement;
        startBtn.disabled = false;
        let resumeBtn = document.getElementById("pauseResume") as HTMLButtonElement;
        resumeBtn.disabled = true;
        let stopButton = document.getElementById("stopButton") as HTMLButtonElement;
        stopButton.disabled = true;
    }

    validateInput() {
        let isvalid = false
        let hoursElement = document.getElementById("hoursInput") as HTMLInputElement;
        let minsElement = document.getElementById("minutesInput") as HTMLInputElement;
        let secondElement = document.getElementById("secondsInput") as HTMLInputElement;
        
        if(!(Number.isNaN(hoursElement.valueAsNumber) || Number.isNaN(minsElement.valueAsNumber) || Number.isNaN(secondElement.valueAsNumber) )){
            isvalid = true
        }
        else{
            alert("Please enter all the feilds");
            return isvalid;
        }
        if(hoursElement.valueAsNumber == 0 && minsElement.valueAsNumber == 0 &&secondElement.valueAsNumber == 0){
            alert("minimum countDown of 1 second Required")
            isvalid = false
        }
        
        console.log("isvalid", isvalid);
        return isvalid;
    }

    render() {
        const countDownContainer = document.createElement("div");
        const header = document.createElement("h1");
        const container = document.createElement("div");
        const displayUnitContainer = document.createElement("div");
        const hoursInput = document.createElement("input");
        const minsInput = document.createElement("input");
        const secondsInput = document.createElement("input");
        const hoursLabel = document.createElement("label");
        const minsLabel = document.createElement("label");
        const secondsLabel = document.createElement("label");
        const hoursWrapper = document.createElement("div");
        const minsWrapper = document.createElement("div");
        const secondsWrapper = document.createElement("div");
        const buttonsContainer = document.createElement("div");
        const startBtn = document.createElement("button");
        const pauseBtn = document.createElement("button");
        const stopBtn = document.createElement("button");

        //id
        startBtn.id = "startButton"
        hoursInput.id = "hoursInput"
        minsInput.id = "minutesInput"
        secondsInput.id = "secondsInput"
        pauseBtn.id = "pauseResume"
        stopBtn.id = "stopButton"

        //pause btn disabled
        pauseBtn.disabled = true;
        stopBtn.disabled = true;


        //class
        countDownContainer.classList.add("timerContainer");
        header.classList.add("heading");
        container.classList.add("timer")
        displayUnitContainer.classList.add("displayUnit");
        buttonsContainer.classList.add("buttonsContainer");
        hoursInput.classList.add("hours");
        minsInput.classList.add("minutes");
        secondsInput.classList.add("seconds");
        startBtn.classList.add("startBtn");
        pauseBtn.classList.add("pauseBtn");
        stopBtn.classList.add("stopBtn");
        hoursWrapper.classList.add("wrapper");
        minsWrapper.classList.add("wrapper");
        secondsWrapper.classList.add("wrapper");

        //innertext
        header.innerText = "Count Down"
        startBtn.innerText = "Start";
        pauseBtn.innerText = "Pause";
        stopBtn.innerText = "Stop";
        hoursLabel.innerText = "Hours";
        minsLabel.innerText = "Minutes";
        secondsLabel.innerText = "Seconds";

        //
        hoursInput.type = "number";
        minsInput.type = "number"
        secondsInput.type = "number"

        // hoursInput.min = "0";
        // minsInput.min = "0";
        // secondsInput.min = "0";

        // minsInput.max = "60";
        // secondsInput.max = "60";

        hoursInput.pattern = "[0-9]{2}";
        minsInput.pattern = "[0-9]{2}";
        secondsInput.pattern = "[0-9]{2}";

        hoursInput.placeholder = "HH";
        minsInput.placeholder = "MM";
        secondsInput.placeholder = "SS";

        hoursInput.value = "0";
        minsInput.value = "0";
        secondsInput.value = "5";

        hoursInput.maxLength = 2;
        minsInput.maxLength = 2;
        secondsInput.maxLength = 2;

        hoursLabel.htmlFor = "hoursInput";
        minsLabel.htmlFor = "minsInput";
        secondsLabel.htmlFor = "secondsInput";


        //onclick
        startBtn.onclick = this.startTimer.bind(this)
        pauseBtn.onclick = this.pauseTimer.bind(this)
        stopBtn.onclick = this.stopTimer.bind(this)

        //appendchild
        buttonsContainer.appendChild(startBtn)
        buttonsContainer.appendChild(pauseBtn)
        buttonsContainer.appendChild(stopBtn)
        hoursWrapper.appendChild(hoursLabel);
        hoursWrapper.appendChild(hoursInput)
        minsWrapper.appendChild(minsLabel);
        minsWrapper.appendChild(minsInput)
        secondsWrapper.appendChild(secondsLabel);
        secondsWrapper.appendChild(secondsInput);
        displayUnitContainer.appendChild(hoursWrapper)
        displayUnitContainer.appendChild(minsWrapper)
        displayUnitContainer.appendChild(secondsWrapper)
        container.appendChild(displayUnitContainer)
        container.appendChild(buttonsContainer)
        countDownContainer.appendChild(header)
        countDownContainer.appendChild(container)

        return countDownContainer
    }

    mount(el: HTMLElement) {
        el.appendChild(this.render())
    }



}

export default CountDownTimer



