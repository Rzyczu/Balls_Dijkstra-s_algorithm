import pathFinder from "./pathFinder"


/**
 * 
 * @interface Size zawierający wielkość tabeli
 *  
 * 
 */
interface Size {
    n: number,
}

/**
 *  
 * @interface Ball zawierający budowę kulki
 * @param id id kulki
 * @param x zawiera pozycję x kulki w tablicy array
 * @param y zawiera pozycję y kulki w tablicy array
 * @param color zawiera kolor kulki
 * 
 */
interface Ball {
    id: number;
    x: number;
    y: number;
    color: string;
}

/** 
 *
 * @class Game Klasa w któej jest zawarta cała gra. 
 * @implements rozmiar mapy
 * 
 * */
export default class Game implements Size {
    /**
     * @public
     */
    array: (number | string)[][] = [];
    readonly n: number
    colors = ["red", 'blue', 'green', 'black'];
    startBall: HTMLDivElement | null;
    metaBall: HTMLDivElement | null;
    private Balls: Object[] = [];
    nextBallsColors: number[] = []


    constructor(n: number) {
        this.n = n;

        for (let i = 0; i < 3; i++) {
            this.nextBallsColors[i] = Math.floor(Math.random() * this.colors.length);

        }

        let nextBallsDiv: HTMLDivElement = document.createElement("div");
        nextBallsDiv.style.position = "absolute";
        nextBallsDiv.className = "nextBallsDiv"
        nextBallsDiv.id = "nextBallsDiv";
        nextBallsDiv.style.left = 50 * n + 100 + "px";
        nextBallsDiv.style.top = 50 + "px";
        document.getElementById("gameBoard").appendChild(nextBallsDiv)

        let title: HTMLDivElement = document.createElement("h1");
        title.id = "nextBallsTitle";
        title.className = "nextBallsTitle";
        title.innerHTML = "Next Balls:";
        document.getElementById("nextBallsDiv").appendChild(title)

        let BallsDiv: HTMLDivElement = document.createElement("div");
        BallsDiv.className = "ballsDiv"
        BallsDiv.id = "ballsDiv";
        document.getElementById("nextBallsDiv").appendChild(BallsDiv)

        let tableDiv: HTMLDivElement = document.createElement("div");
        tableDiv.className = "tableDiv"
        tableDiv.id = "tableDiv";
        document.getElementById("gameBoard").appendChild(tableDiv)

        let circleDiv: HTMLDivElement = document.createElement("div");
        circleDiv.className = "circleDiv"
        circleDiv.id = "circleDiv";
        document.getElementById("gameBoard").appendChild(circleDiv)

        this.createArr();

    }
    /**
     * 
     * @function updateNextBalls  uzupełnia kolory NextBalls 
     * 
     */
    updateNextBalls(): void {
        document.getElementById("ballsDiv").innerHTML = ''

        let nextBall1: HTMLDivElement = document.createElement("div");
        nextBall1.className = "circle nextBall"
        nextBall1.id = "nextBall1";
        nextBall1.style.backgroundColor = this.colors[this.nextBallsColors[0]]
        document.getElementById("ballsDiv").appendChild(nextBall1)

        let nextBall2: HTMLDivElement = document.createElement("div");
        nextBall2.className = "circle nextBall"
        nextBall2.id = "nextBall2";
        nextBall2.style.backgroundColor = this.colors[this.nextBallsColors[1]]
        document.getElementById("ballsDiv").appendChild(nextBall2)

        let nextBall3: HTMLDivElement = document.createElement("div");
        nextBall3.className = "circle nextBall"
        nextBall3.id = "nextBall1";
        nextBall3.style.backgroundColor = this.colors[this.nextBallsColors[2]]
        document.getElementById("ballsDiv").appendChild(nextBall3)
    }
    /**
     * 
     * @function tworzy this.array[] która zawiera całą planszę, 
     * w miejscach kulek są wpisane ich kolory,
     * a w miejscach pustych 0.
     * 
     * "A" jest kulką aktywną, klikniętą
     * "Z" jest miescem do którego ma znaleźc trasę i przenieść kulkę 
     * 
     */
    createArr(): void {
        const style = 'font-weight: bold; font-size: 30px;color: red; text-shadow: 3px 3px 0 rgb(0,0,38)';
        console.log('%c[y, x]', style)
        for (let i = 0; i < this.n + 2; i++) {
            this.array[i] = [];
            for (let j = 0; j < this.n + 2; j++) {
                if (j == 0 || j == this.n + 1 || i == 0 || i == this.n + 1)
                    this.array[i][j] = 'X';
                else
                    this.array[i][j] = 0;
            }
        }

        for (let i = 0; i < 3; i++) {
            this.randomBall(i)
        }
        for (let i = 0; i < 3; i++) {
            this.nextBallsColors[i] = Math.floor(Math.random() * this.colors.length);
        }
        this.updateNextBalls()

        this.createTable();
    }

    /**
     * @function randomBall tworzy jedną Kulkę-Obiekt implementując interfejs Ball. Kulka ma losowe x,y.
     * 
     * @param i Zawiera numer koloru, podany z nextBalls[]
     */
    randomBall(i: number) {
        let CordX = Math.floor(Math.random() * this.n);
        let CordY = Math.floor(Math.random() * this.n);
        let Color = this.nextBallsColors[i];
        if (this.array[CordX][CordY] == 0) {
            this.array[CordX][CordY] = this.colors[Color];
            let ball: Ball = { id: this.Balls.length, x: CordX, y: CordY, color: this.colors[Color] };
            this.Balls.push(ball)
            let div: HTMLDivElement = document.createElement("div");
            div.style.position = "absolute";
            div.className = "circle"
            div.id = CordX + "_" + CordY;
            div.style.top = 50 * CordX + 12.5 + "px";
            div.style.left = 50 * CordY + 12.5 + "px";
            div.style.backgroundColor = this.colors[Color];
            document.getElementById("circleDiv").appendChild(div)
        } else {
            this.randomBall(i);
        }

    }

    /**
     * 
     * @function createTable tworzy Tabelę HTML na stronie w których zawarte są kulli oraz cała plansza
     * 
     */
    createTable() {
        // this.divBoard = document.getElementById("gameBoard");
        for (let i = 1; i < this.n + 1; i++) {
            for (let j = 1; j < this.n + 1; j++) {

                let div: HTMLDivElement = document.createElement("div");
                div.style.position = "absolute";
                div.className = "table"
                div.id = i + "_" + j;
                div.style.left = 50 * j + "px";
                div.style.top = 50 * i + "px";
                document.getElementById("tableDiv").appendChild(div)

            }
        }

        this.clickBallListener();
        this.mouseoverListener();
        this.clickTableListener();

    }

    /**
     * 
     * @function clickTableListener wydarza się po kliknięciu w element tabeli 
     * (Nie kulkę - Element klasy "table)"
     * 
     */
    clickTableListener(): void {
        document.getElementById("tableDiv").addEventListener("click", (e) => {
            if (this.metaBall != null && this.startBall != null) {
                this.moveBall((e.target as HTMLDivElement))
            }
        })
    }
    /**
  * 
  * @function clickBallListener która wydarza się po kliknięciu w element kulki. 
  * Służy do wybrania kulki aktywnej.)"
  * 
  */
    clickBallListener(): void {
        document.getElementById("circleDiv").addEventListener("click", (e) => {
            let tableDivs = document.getElementsByClassName("table")
            Array.from(tableDivs).forEach(div => {
                div.className = "table"
            });
            if (this.startBall == null) {
                this.metaBall = null;

                this.startBall = (e.target as HTMLDivElement);
                this.startBall.className = "circle active"
                this.startBall.style.left = (parseInt(this.startBall.style.left) - 12) + "px"
                this.startBall.style.top = (parseInt(this.startBall.style.top) - 12) + "px"
            } else if (this.startBall == e.target as HTMLDivElement) {
                this.metaBall = null;
                this.startBall.className = "circle"
                this.startBall.style.left = (parseInt(this.startBall.style.left) + 12.5) + "px"
                this.startBall.style.top = (parseInt(this.startBall.style.top) + 12.5) + "px"
                this.startBall = null
            } else {
                this.metaBall = null;
                this.startBall.className = "circle"
                this.startBall.style.left = (parseInt(this.startBall.style.left) + 12.5) + "px"
                this.startBall.style.top = (parseInt(this.startBall.style.top) + 12.5) + "px"
                this.startBall = (e.target as HTMLDivElement);

                this.startBall.className = "circle active"
                this.startBall.style.left = (parseInt((e.target as HTMLDivElement).style.left) - 12) + "px"
                this.startBall.style.top = (parseInt((e.target as HTMLDivElement).style.top) - 12) + "px"
            }
        })
    }
    /**
     * @function moveBall wydarza się po wywołaniu funkcji kliknięcia w Tabelę Divów, 
     * jeśli wszystkie warunki są spełnione - jest metaBall i startBall).
     * To tutaj następuje przenoszenie kulki 
     * oraz tworzenia 3 nowych kulek - randomBall() w forze
     * oraz wylosowania trzech kolejnych kulek 
     * i zmiany NextBalls - updateNextBalls()
     * 
     * @param metaPoint obiekt HTML mety
     * 
     */
    moveBall(metaPoint: HTMLDivElement) {

        this.startBall.className = "circle"

        let startID = [parseInt(this.startBall.id.split('_')[0]), parseInt(this.startBall.id.split('_')[1])]
        let metaID = [parseInt(metaPoint.id.split('_')[0]), parseInt(metaPoint.id.split('_')[1])]


        this.array[startID[0]][startID[1]] = 0
        this.array[metaID[0]][metaID[1]] = this.startBall.style.backgroundColor

        this.startBall.id = metaID[0] + "_" + metaID[1]

        this.startBall.style.top = metaID[0] * 50 + 12.5 + "px"
        this.startBall.style.left = metaID[1] * 50 + 12.5 + "px"
        this.startBall = null

        let tableDivs = document.getElementsByClassName("table")
        Array.from(tableDivs).forEach(div => {
            div.className = "table"
        });

        //Tworzenie 3 kulek po ruchu
        for (let i = 0; i < 3; i++) {
            this.randomBall(i)
        }
        for (let i = 0; i < 3; i++) {
            this.nextBallsColors[i] = Math.floor(Math.random() * this.colors.length);
        }
        this.updateNextBalls()
    }
    /**
  * 
  * @function mouseoverListener wydarza się po najechaniu tabeli (Nie kulek - Element klasy "table")
  * Przy każdym najechaniu jeśli jest startBall występuje klasa patchFinfing,
  * któa wyszukuje najkrótszą klasię z punktu 'A' do punktu 'Z'
  * oraz ją koloruje - daje divom klasę "step".
  * 
  * Pzry każdym nowym najechaniu tabeli wszystkie divy przyjmują na nowo klasę "table"
  * kasując przy tym niektóre klasy "step"
  * 
  */
    mouseoverListener() {

        let circleDivs = document.getElementsByClassName("circle")

        let tableDivs = document.getElementsByClassName("table")
        Array.from(tableDivs).forEach(div => {
            div.addEventListener("mouseover", (e) => {
                if (this.startBall != null) {

                    //Sprawdza czy na klikanym divie nie ma kółka
                    let notBall = 1;

                    Array.from(circleDivs).forEach(circle => {
                        if ((e.target as HTMLDivElement).id == circle.id) {
                            notBall--
                        }
                    })

                    Array.from(tableDivs).forEach(div => {
                        div.className = "table"
                    });

                    if (notBall) {
                        this.metaBall = (e.target as HTMLDivElement);
                        let wayFinfing = new pathFinder(JSON.parse(JSON.stringify(this.array)), this.startBall, this.metaBall)
                        console.log(wayFinfing["way"])
                        if (wayFinfing["way"].length > 0) {
                            Array.from(tableDivs).forEach(div => {
                                for (let i = 0; i < wayFinfing['way'].length; i++) {
                                    if (wayFinfing['way'][i]["y"] + "_" + wayFinfing['way'][i]["x"] == div.id) {
                                        div.className = "table step"
                                    }

                                }

                            });
                        } else {
                            this.metaBall = null;
                            this.startBall.className = "circle"
                            this.startBall.style.left = (parseInt(this.startBall.style.left) + 12.5) + "px"
                            this.startBall.style.top = (parseInt(this.startBall.style.top) + 12.5) + "px"
                            this.startBall = null;
                        }

                    }
                }
            });
        })
    }
}