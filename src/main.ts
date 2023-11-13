import './style.css'
import { ticTacToeIn } from "./tic-tac-toe";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="player-computer">
      <div>
        <p id="player-1-turn"></p>
        <h2 id="player-1-label">Player #1 (x) </h2>
      </div>
      <div>
        <p id="player-2-turn"></p>
        <h2 id="player-2-label">Player #2 (o) </h2>
      </div>
    </div>

    <table>
      <tr id="r1">
        <td id="r1c1"> </td>
        <td id="r1c2"> </td>
        <td id="r1c3"> </td>
      </tr>
      <tr id="r2">
        <td id="r2c1"> </td>
        <td id="r2c2"> </td>
        <td id="r2c3"> </td>
      </tr>
      <tr id="r3">
        <td id="r3c1"> </td>
        <td id="r3c2"> </td>
        <td id="r3c3"> </td>
      </tr>
    </table>
  </div>
`

ticTacToeIn(document.querySelector("table")!);
