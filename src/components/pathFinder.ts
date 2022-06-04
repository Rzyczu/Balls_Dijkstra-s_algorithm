
/** 
 * @interface mustToFind  zawiera początkową kulkę i miejsce do którego
 * ma się dostać ta kulka.
 * 
 * Ten interfejs jest implementowany przez klasę patchfinder
 *  
 * */
interface mustToFind {
    //arrayA: (number | string)[][],
    startBall: HTMLDivElement,
    metaBall: HTMLDivElement
}

/** 
 * @class która jest wywoływana w celu znalezienia ścieżki Patch Findingu.
 *  
 * */
export default class pathFinder implements mustToFind {
    private arrayA: (number | string)[][] = [];
    start: number[];
    meta: number[];
    divTable: NodeList;
    startBall: HTMLDivElement;
    metaBall: HTMLDivElement
    divsTable: NodeList
    stepCount: number = 1
    way: any[] = []

    constructor(arrayA: (number | string)[][], startBall: HTMLDivElement, metaBall: HTMLDivElement) {
        this.arrayA = arrayA
        this.start = [parseInt(startBall.id.split('_')[0]), parseInt(startBall.id.split('_')[1])]
        this.meta = [parseInt(metaBall.id.split('_')[0]), parseInt(metaBall.id.split('_')[1])]
        this.divsTable = document.querySelectorAll(".table");
        this.arrayA[this.start[0]][this.start[1]] = "A"
        this.arrayA[this.meta[0]][this.meta[1]] = "Z"
        // this.fromWhere.push(this.start)
        // console.table(this.fromWhere)


        let arr: Number[][] = [this.start]
        this.step(arr)
        //this.start[0], this.start[1])



    }

    /**
     * 
     * @function step wpisuje w tablicę arrayA ścieżkę do patchfindingu 
     * 1. w sąsiednich polach tablicy (jeśli nie są zajęte) "S" wpisz 1
     * 2.  sąsiednim pozycją jedynek wpisz 2
     * 3. postępuj tak dalej aż do braku możliwości numerowania kolejnych ruchów lub trafienia na "Z"
     * Tu jest opisany jeden taki krok, który się powtarza w kółko jak zostało to opisane w punkcie 3
     * 
     * Gdy funkcja odnajdzie punkt "Z" - da się do niego dotrzeć
     * @param froWhere - tablia, która ma tablice z punktami  x,y - skąd zaczynać liczyć
     * 
     * 
     */
    step(froWhere: any[][]) {

        let arr: Number[][] = []

        let zFind: Boolean = false
        // for (let i = 0; i < froWhere.length; i++) {

        //     // console.log(x, y)

        //     if (this.arrayA[froWhere[i][0] - 1][froWhere[i][1]] == 'Z') {
        //         zFind = true
        //     } else if (this.arrayA[froWhere[i][0] - 1][froWhere[i][1]] == 0) {
        //         this.arrayA[froWhere[i][0] - 1][froWhere[i][1]] = this.stepCount
        //         arr.push([froWhere[i][0] - 1, froWhere[i][1]])
        //     }
        //     if (this.arrayA[froWhere[i][0] + 1][froWhere[i][1]] == 'Z') {
        //         zFind = true
        //     } else if (this.arrayA[froWhere[i][0] + 1][froWhere[i][1]] == 0) {
        //         this.arrayA[froWhere[i][0] + 1][froWhere[i][1]] = this.stepCount
        //         arr.push([froWhere[i][0] + 1, froWhere[i][1]])
        //     }
        //     if (this.arrayA[froWhere[i][0]][froWhere[i][1] - 1] == 'Z') {
        //         zFind = true
        //     } else if (this.arrayA[froWhere[i][0]][froWhere[i][1] - 1] == 0) {
        //         this.arrayA[froWhere[i][0]][froWhere[i][1] - 1] = this.stepCount
        //         arr.push([froWhere[i][0], froWhere[i][1] - 1])
        //     }

        //     if (this.arrayA[froWhere[i][0]][froWhere[i][1] + 1] == 'Z') {
        //         zFind = true
        //     } else if (this.arrayA[froWhere[i][0]][froWhere[i][1] + 1] == 0) {
        //         this.arrayA[froWhere[i][0]][froWhere[i][1] + 1] = this.stepCount
        //         arr.push([froWhere[i][0], froWhere[i][1] + 1])
        //     }
        // }

        froWhere.forEach((value) => {
            if (this.arrayA[value[0] - 1][value[1]] == 'Z') {
                zFind = true
            } else if (this.arrayA[value[0] - 1][value[1]] == 0) {
                this.arrayA[value[0] - 1][value[1]] = this.stepCount
                arr.push([value[0] - 1, value[1]])
            }
            if (this.arrayA[value[0] + 1][value[1]] == 'Z') {
                zFind = true
            } else if (this.arrayA[value[0] + 1][value[1]] == 0) {
                this.arrayA[value[0] + 1][value[1]] = this.stepCount
                arr.push([value[0] + 1, value[1]])
            }
            if (this.arrayA[value[0]][value[1] - 1] == 'Z') {
                zFind = true
            } else if (this.arrayA[value[0]][value[1] - 1] == 0) {
                this.arrayA[value[0]][value[1] - 1] = this.stepCount
                arr.push([value[0], value[1] - 1])
            }

            if (this.arrayA[value[0]][value[1] + 1] == 'Z') {
                zFind = true
            } else if (this.arrayA[value[0]][value[1] + 1] == 0) {
                this.arrayA[value[0]][value[1] + 1] = this.stepCount
                arr.push([value[0], value[1] + 1])
            }
        });


        this.stepCount++
        if (zFind) {
            let metaObj: Object = { y: this.meta[0], x: this.meta[1], val: "Z" }
            this.way.push(metaObj)
        }

        if (zFind || this.stepCount == 0)
            this.firstMatchWay(this.meta[0], this.meta[1])
        else if (arr.length != 0)
            this.step(arr)

    }

    /**
     * 
     *@function firstMatchWay wykonuje się tylko raz. 
     Od najwyższego numeru w tablicy (patrz funkcja step()) 
     funkcja wyszukuje dookoła niższego pola o jeden, 
     \kiedy go znajdzie wysyła parametry tego pola funkcji matchWay()
     i dodaje do way[] znalezione pole
     * 
     * @param y zawiera pozycję y "Z" w tablicy array
     * @param x zawiera pozycję x "Z" w tablicy array
     * 
     */
    firstMatchWay(y: any, x: any) {

        let arrAllChar: any[] = []
        let zFind: boolean = false
        let aFind: boolean = false
        let arrOnlyNum: Object[] = []


        arrAllChar.push({ y: y - 1, x: x, val: this.arrayA[y - 1][x] })
        arrAllChar.push({ y: y + 1, x: x, val: this.arrayA[y + 1][x] })
        arrAllChar.push({ y: y, x: x - 1, val: this.arrayA[y][x - 1] })
        arrAllChar.push({ y: y, x: x + 1, val: this.arrayA[y][x + 1] })




        for (let i = 0; i < arrAllChar.length; i++) {
            if (typeof arrAllChar[i]['val'] === 'string' || arrAllChar[i]['val'] instanceof String) {
                if (arrAllChar[i]['val'] == 'A') {
                    aFind = true
                }
            } else if (arrAllChar[i]['val'] != 0) {
                {
                    zFind = true
                    arrOnlyNum.push(arrAllChar[i])

                }
            }
        }
        arrOnlyNum = arrOnlyNum.sort(function (a: any, b: any) { return b['val'] - a['val'] })

        if (zFind || arrOnlyNum.length != 0) {
            this.way.push(arrOnlyNum[0])
        }

        if (aFind || arrOnlyNum.length != 0)
            this.matchWay(this.way[this.way.length - 1]['y'], this.way[this.way.length - 1]['x'])
    }

    /**
     * 
     * @function matchWay
     * Od najwyższego numeru w tablicy (patrz funkcja step()) 
     * funkcja wyszukuje dookoła niższego pola o jeden, 
     * kiedy go znajdzie wywołuje samą siebie z x,y znalezionego pola
     * by dojś do samego "A" cały czas dodając poprzednie pola do way[].
     * 
     * Tymsamym tworzy w way[] tworzy nam się cała ścieżka
     * @param y 
     * @param x 
     */
    matchWay(y: any, x: any) {
        let arr: any[] = []
        let isFind: boolean = false
        let aFind: boolean = false

        arr.push({ y: y - 1, x: x, val: this.arrayA[y - 1][x] })
        arr.push({ y: y + 1, x: x, val: this.arrayA[y + 1][x] })
        arr.push({ y: y, x: x - 1, val: this.arrayA[y][x - 1] })
        arr.push({ y: y, x: x + 1, val: this.arrayA[y][x + 1] })
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]['val'] == 'A') {
                aFind = true
            } else if (arr[i]['val'] == this.way[this.way.length - 1]['val'] - 1) {
                if (!isFind) {
                    this.way.push(arr[i])
                    isFind = true
                }
            }
        }
        if (!aFind && isFind)
            this.matchWay(this.way[this.way.length - 1]['y'], this.way[this.way.length - 1]['x'])
    }
}
