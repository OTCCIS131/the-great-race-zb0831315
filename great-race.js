$(function () {
    let vm = new Vue({
        el: '#app',
        data: {
            racing: false,
            winner: null,
            rammus: 0,
            volibear: 0,
            tick: 0,
            interval: null
        },
        computed: {
            winning() {
                if (this.rammus == this.volibear) return null

                return this.rammus > this.volibear ? 'Rammus' : 'Volibear'
            },
            rammusStyle() {
                return {
                    left: `${this.rammus}vw`
                }
            },
            rammusClass() {
                if (!this.winner) return
                return this.winner == 'Rammus' ? 'animated bounceInUp infinite winner' : 'animated fadeOutDownBig'
            },
            voliStyle() {
                return {
                    left: `${this.volibear}vw`
                }
            },
            voliClass() {
                if (!this.winner) return
                return this.winner == 'Volibear' ? 'animated bounceInUp infinite winner' : 'animated fadeOutDownBig'
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
                this.rammus += (Math.random() >= Math.random()) ? 1 : 0
                this.volibear += (Math.random() >= Math.random()) ? 1 : 0
                this.checkVictory()
            },
            checkVictory() {
                if (this.rammus == this.volibear) return

                if (this.rammus >= 85) {
                    this.declareVictory('Rammus')
                }

                if (this.volibear >= 85) {
                    this.declareVictory('Volibear')
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
                this.rammus = 0
                this.volibear = 0
                this.tick = 0
            }
        }
    })
});