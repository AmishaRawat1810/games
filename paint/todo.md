# Input --> { text: "\x1b[MC1:" }

**\x1b[** -> The CSI (Control Sequence Introducer) starting of each escape sequence
**M** ->  X11 mouse tracking report.
**C** -> Represents the Button byte (Cb). The terminal adds 32 to the actual value to ensure it is a printable character.
**1** -> Represents the X-coordinate (Cx).
**:** -> Represents the Y-coordinate (Cy).


# PLAN
-> Get the coords of the terminal : 
  - take the Cx, Cy and subtract 32 to get the actual coords: Tx = Cx - 32, Ty = Cy - 32
  - move the cursor :  CSI{row};{col}H ---> \x1b[23;14H
  - add color : x1b[{code}m --> \x1b[41m \x1b[0m (changes to red and then reset it)

  - move to the row and move the cursor and add the color : \x1b[26;17H\x1b[41m \x1b[0m

# Cursor
// const HIDE_CURSOR = "\x1b[?25l";
// const SHOW_CURSOR = "\x1b[?25h";

# COLORS: 
Reset : \x1b[0m

-> Black: \x1b[40m
-> Red: \x1b[41m
-> Green: \x1b[42m
-> Yellow: \x1b[43m
-> Blue: \x1b[44m
-> Magenta: \x1b[45m
-> Cyan: \x1b[46m
-> White: \x1b[47m

# Color position
-> red: { row: 35, col: [ 2, 5 ] },
-> green: { row: 35, col: [ 7, 7 ] },
-> yellow: { row: 35, col: [ 14, 8 ] },
-> blue: { row: 35, col: [ 22, 6 ] },
-> magenta: { row: 35, col: [ 28, 9 ] },
-> cyan: { row: 35, col: [ 37, 6 ] },
-> white: { row: 35, col: [ 43, 7 ] }
-> reset: { row: 35, col: [ 52, 57 ] }