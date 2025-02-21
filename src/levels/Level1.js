import Level from "../Level.js"
import Room from "../Room.js"

const level1 = new Level("Level 1 - The Dysfunctional Grotto")

const room1 = new Room("r1", "red")
const room2 = new Room("r2", "green")
const room3 = new Room("r3", "blue")
const room4 = new Room("r4", "pink")
const room5 = new Room("r5", "purple")
const room6 = new Room("r6", "yellow")
const room7 = new Room("r7", "teal")
const room8 = new Room("r8", "orange")

room1.addExit("east", room2)
room1.addExit("south", room4)

room2.addExit("west", room1)
room2.addExit("south", room3)

room3.addExit("north", room2)
room3.addExit("south", room6)

room4.addExit("north", room1)
room4.addExit("east", room5)

room5.addExit("west", room4)
room5.addExit("south", room8)

room6.addExit("north", room3)
room6.addExit("east", room7)

room7.addExit("west", room6)

level1.addRoom(room1)
level1.addRoom(room2)
level1.addRoom(room3)
level1.addRoom(room4)
level1.addRoom(room5)
level1.addRoom(room6)
level1.addRoom(room7)
level1.addRoom(room8)

level1.currentRoom = room1

export default level1