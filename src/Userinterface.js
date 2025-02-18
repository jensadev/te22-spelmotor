export default class Userinterface {
  constructor(game) {
    this.game = game;
    this.width = game.width;
    this.height = game.height;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(`Room: ${this.game.level.getCurrentRoom().id}`, 10, 20);
    ctx.fillText(`Player: ${this.game.player.x}, ${this.game.player.y}`, 10, 40);
    ctx.fillText(`Keys: ${Array.from(this.game.input.keys).join(", ")}`, 10, 60);
    ctx.fillText(`Debug: ${this.game.debug}`, 10, 80);

    if (this.game.debug) {
      ctx.fillText(`Projectiles: ${this.game.projectiles.length}`, 10, 100);
    }

    this.drawMiniMap(ctx);
  }

  drawMiniMap(ctx) {
    const miniMapSize = 100;
    const roomSize = 20;
    const offsetX = this.width - miniMapSize - 10;
    const offsetY = 10;

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(offsetX, offsetY, miniMapSize, miniMapSize);

    const roomPositions = this.calculateRoomPositions();

    const currentRoom = this.game.level.getCurrentRoom();
    const centerX = offsetX + miniMapSize / 2 - roomSize / 2;
    const centerY = offsetY + miniMapSize / 2 - roomSize / 2;

    this.game.level.rooms.forEach((room) => {
      const { x, y } = roomPositions[room.id];

      const roomX = centerX + x * roomSize;
      const roomY = centerY + y * roomSize;

      // Skip drawing rooms outside the mini-map boundaries
      if (
        roomX < offsetX ||
        roomX + roomSize > offsetX + miniMapSize ||
        roomY < offsetY ||
        roomY + roomSize > offsetY + miniMapSize
      ) {
        return;
      }

      ctx.fillStyle = room === currentRoom ? "yellow" : "gray";
      ctx.fillRect(roomX, roomY, roomSize, roomSize);

      ctx.strokeStyle = "white";
      ctx.strokeRect(roomX, roomY, roomSize, roomSize);

      if (room.exits.north) {
        ctx.beginPath();
        ctx.moveTo(roomX + roomSize / 2, roomY);
        ctx.lineTo(roomX + roomSize / 2, roomY - 5);
        ctx.stroke();
      }
      if (room.exits.south) {
        ctx.beginPath();
        ctx.moveTo(roomX + roomSize / 2, roomY + roomSize);
        ctx.lineTo(roomX + roomSize / 2, roomY + roomSize + 5);
        ctx.stroke();
      }
      if (room.exits.east) {
        ctx.beginPath();
        ctx.moveTo(roomX + roomSize, roomY + roomSize / 2);
        ctx.lineTo(roomX + roomSize + 5, roomY + roomSize / 2);
        ctx.stroke();
      }
      if (room.exits.west) {
        ctx.beginPath();
        ctx.moveTo(roomX, roomY + roomSize / 2);
        ctx.lineTo(roomX - 5, roomY + roomSize / 2);
        ctx.stroke();
      }
    });
  }

  calculateRoomPositions() {
    const positions = {};
    const visited = new Set();
    const queue = [{ room: this.game.level.getCurrentRoom(), x: 0, y: 0 }];

    while (queue.length > 0) {
      const { room, x, y } = queue.shift();
      if (visited.has(room.id)) continue;

      visited.add(room.id);
      positions[room.id] = { x, y };

      if (room.exits.north && !visited.has(room.exits.north.id)) {
        queue.push({ room: room.exits.north, x, y: y - 1 });
      }
      if (room.exits.south && !visited.has(room.exits.south.id)) {
        queue.push({ room: room.exits.south, x, y: y + 1 });
      }
      if (room.exits.east && !visited.has(room.exits.east.id)) {
        queue.push({ room: room.exits.east, x: x + 1, y });
      }
      if (room.exits.west && !visited.has(room.exits.west.id)) {
        queue.push({ room: room.exits.west, x: x - 1, y });
      }
    }

    return positions;
  }
}