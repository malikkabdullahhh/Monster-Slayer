new Vue({ 
    el: '#app',
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameRunning: false,
        turns: []
    },
    methods:{
        startGame: function(){
            this.gameRunning = true;
            this.playerHealth = 
            100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){ 
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.checkWin();
            this.attackLog(true, damage, false);

            damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage ;
            this.checkLoss();
            this.attackLog(false, damage, false);

        },
        specialAttack: function(){
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.attackLog(true, damage, true);
            this.checkWin();

            damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.attackLog(false, damage, false);
            this.checkLoss();
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                heal: true,
                special: false,
                text: `Player heals for 10`
            });

        },
        giveUp: function(){
            this.turns = [];
            alert("oops! Looks like you gave up...");
            this.gameRunning = false;
            
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(){
            if(this.monsterHealth<= 0){
                this.monsterHealth = 0;
                setTimeout(() => {
                    if(confirm("YOU WON! New Game?")){
                        this.startGame();
                    }else{
                        this.gameRunning = false;
                    }
                    }, 500);
                return;
            };
        },
        checkLoss: function(){
            if(this.playerHealth<= 0){
                this.playerHealth = 0;
                setTimeout(() => {
                    if(confirm("YOU LOST!  New Game?")){
                        this.startGame();
                    }else{
                        this.gameRunning = false;
                    }
                    }, 500);
                return;
            };
        },
        attackLog: function(bool, damage, hard){
            one = '';
            two = '';
            hardHit = '';
            if(bool === true && hard === true){
                one = 'Player';
                two = 'Monster';
                hardHit = " HARD";
            } else if(bool === true){
                one = 'Player';
                two = 'Monster';
            } else{
                one = 'Monster';
                two = 'Player';
            }
            this.turns.unshift({
                isPlayer: bool,
                special: hard,
                heal: false,
                text: `${one} hits ${two}${hardHit} for ` + damage
            });
        }
    }
});