$(function () {
    let vm = new Vue({
        el: '#app',
        data: {
            racing: false,
            winner: null,
            volibear: 0,
            rammus: 0,
            tick: 0,
            interval: null
        },
        computed: {
            winning() {
                if (this.volibear == this.rammus) return null

                return this.volibear > this.rammus ? 'Volibear' : 'Rammus'
            },
            rammusStyle() {
                return {
                    left: `${this.rammus}vw`
                }
            },
            rammusClass() {
                if (!this.winner) return
                return this.winner == 'Rammus'
            },
            voliStyle() {
                return {
                    left: `${this.volibear}vw`
                }
            },
            voliClass() {
                if (!this.winner) return
                return this.winner == 'Volibear'
            }
        },
        methods: {
            startRace() {
                if (this.winner) {
                    this.restart()
                    return
                }
            this.racing = true

            this.interval = setInterval(() => {
                this.progressPlayers()
            }, 50)
        },
        progressPlayers() {
            this.tick++
            this.volibear += (Math.random() >= Math.random()) ? 1 : 0
            this.rammus += (Math.random() >= Math.random()) ? 1 : 0
            this.checkVicktory()
        },
        checkVictory() {
            if (this.volibear == this.rammus) return

            if (this.volibear >= 90) {
                this.declareVictory('Volibear')
            }

            if (this.rammus >= 90) {
                this.declareVictory('Rammus')
            }
        },
        declareVictory(player) {
            clearInterval(this.interval)
            this.interval = null
            this.racing = false
            this.winner = player
        },
        restart() {
            this.racing = false
            this.winner = null 
            this.volibear = 0
            this.rammus = 0
            this.tick = 0
        }
    }
})
});