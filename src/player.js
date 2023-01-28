export const Player = {
    first: 1,
    second: 2,
    getOther(player) {
        if (player === this.first) return Player.second;
        else return Player.first;
    }
};