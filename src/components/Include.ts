enum Direction {
        Up,
        Down,
        Left,
        Right,
}

class C {
        static log(){
                console.log.apply(console, arguments)
        }

        static warn(){
                console.log.apply(console, arguments)
        }

        static err(){
                console.log.apply(console, arguments)
        }
}

export default {
        Direction: Direction,
        C: C
}