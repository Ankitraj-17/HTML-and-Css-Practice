const APP = {

    state: 'MENU',
    bestTime: 99.999,
    startTime: 0,
    timers: [],


    dom: {
        msg: document.getElementById('main-msg'),
        resultBox: document.getElementById('result-box'),
        resTime: document.getElementById('res-time'),
        resRank: document.getElementById('res-rank'),
        resBest: document.getElementById('res-best'),
        clickLayer: document.getElementById('click-layer'),
        cols: [
            document.getElementById('col-1'),
            document.getElementById('col-2'),
            document.getElementById('col-3'),
            document.getElementById('col-4'),
            document.getElementById('col-5')
        ]
    },

    init() {
        this.bindEvents();
        this.resetGame();
    },

    bindEvents() {

        this.dom.clickLayer.onmousedown = (e) => this.handleInput(e);
        document.onkeydown = (e) => {
            if (e.code === 'Space' || e.code === 'Enter') this.handleInput(e);
        };
        

    },

    handleInput(e) {
        if (e.type === 'keydown') e.preventDefault();
        
        if (this.state === 'MENU' || this.state === 'RESULT') {
            this.startSequence();
        } else if (this.state === 'WAITING' || this.state === 'READY') {
            this.triggerJumpStart();
        } else if (this.state === 'ACTIVE') {
            this.finish();
        }
    },

    startSequence() {
        this.resetGame();
        this.dom.msg.textContent = 'FORMATION LAP COMPLETE';
        this.state = 'WAITING';
        

        this.timers.push(setTimeout(() => {
            this.runLights();
        }, 1000));
    },

    runLights() {
        this.dom.msg.textContent = 'HOLD CLUTCH';
        let colIndex = 0;
        

        const fillSpeed = 600 + Math.random() * 800;
        

        const lightInterval = setInterval(() => {
            if (colIndex < 5) {
                this.dom.cols[colIndex].classList.add('on');

                colIndex++;
            } else {
                clearInterval(lightInterval);
                const randomDelay = 200 + Math.random() * 2800;
                
                this.timers.push(setTimeout(() => {
                    this.lightsOut();
                }, randomDelay));
                
                this.state = 'READY';
            }
        }, fillSpeed);

        this.timers.push(lightInterval);
    },

    lightsOut() {

        this.dom.cols.forEach(c => {
            c.classList.remove('on');
            c.classList.add('green');
        });
        
        this.startTime = performance.now();
        this.state = 'ACTIVE';
        this.dom.msg.textContent = 'GO GO GO';
    },

    finish() {
        const endTime = performance.now();
        const diff = (endTime - this.startTime) / 1000;
        this.state = 'RESULT';
        

        this.dom.cols.forEach(c => c.classList.remove('green'));
        
        this.showResult(diff);
    },

    triggerJumpStart() {
        this.clearTimers();
        this.state = 'RESULT';
        this.dom.msg.textContent = 'JUMP START!';
        this.dom.msg.classList.add('jump');
        

        this.dom.cols.forEach(c => {
            c.classList.remove('on');
            c.classList.remove('green');
        });
        

        this.dom.resTime.textContent = "JUMP START";
        this.dom.resRank.textContent = "PENALTY +10s";
        this.dom.resRank.style.color = "#ffee00";
        this.dom.resultBox.classList.add('visible');
    },

    showResult(seconds) {
        const timeStr = seconds.toFixed(3);
        
        this.dom.resTime.textContent = timeStr + 's';
        

        if (seconds < this.bestTime) {
            this.bestTime = seconds;
            this.dom.resBest.textContent = timeStr + 's';
            this.dom.resRank.textContent = "NEW LAP RECORD";
            this.dom.resRank.style.color = "#00ff00";
        } else {
            const diff = (seconds - this.bestTime).toFixed(3);
            this.dom.resBest.textContent = this.bestTime.toFixed(3) + 's';
            this.dom.resRank.textContent = `+${diff}s to PB`;
            this.dom.resRank.style.color = "#e10600";
        }


        setTimeout(() => {
            this.dom.resultBox.classList.add('visible');
            this.dom.msg.textContent = 'TAP TO RETRY';
        }, 100);
    },

    retry() {
        this.startSequence();
    },

    resetGame() {
        this.clearTimers();
        this.dom.cols.forEach(c => {
            c.classList.remove('on');
            c.classList.remove('green');
        });
        this.dom.msg.textContent = 'TAP TO START SEQUENCE';
        this.dom.msg.classList.remove('jump');
        this.dom.resultBox.classList.remove('visible');
    },

    clearTimers() {
        this.timers.forEach(t => {
            clearTimeout(t);
            clearInterval(t);
        });
        this.timers = [];
    }
};


APP.init();
