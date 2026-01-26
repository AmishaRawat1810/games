[ ] The Ball Movement :
 - [ ] Ball movement should be independent of the vaus movement and user input. I.e ball should keep moving.
- [ ] Ball will first fall on the vaus center and then reflects based on :
       1) if it is closer to center of vaus the angle will be bigger (50,55,etc)
       2) If it is further from the center of vaus the angle will be steeper ( 10,30,20,etc).
       3) If it hits on the center of vaus it reflects at the same angle.

 - [ ] Create a ball that moves at an angle
        - [ ] First try to just move it from one coordinate to another
        - [ ] Move it till the wall 
        - [ ] If it touches anything that is not empty reflect ( angle of incidence = angle of reflection )
        - [ ] If it touches the coordinates where the coordY is 0 and there's no platform there game ends

--------------------------------------

Instead of recursive "guessing," use an Index Filtering approach. This ensures you only pick from valid cells in a single pass.
   -> [ ] Filter Valid Cells: Iterate through your grid once and push the coordinates of all
          non-empty (" ") cells and boundaries into a temporary array.
 -> [ ] Select Randomly: Pick one index from that list. This is much faster and never fails.

 ----------------------

 Run ball updates in a separate loop using setInterval or a continuous while loop with a small delay.
For ball physics:

The ball has a position (x, y) and velocity (dx, dy).
Each frame: x += dx, y += dy.
On wall collision:
Left/right → reverse dx.
Top → reverse dy.
Bottom → game over.
When hitting the platform:
Find where the ball hits relative to the center.
Calculate a hit ratio: (ballX - paddleCenter) / (paddleWidth / 2) → this gives a value from -1 (left edge) to 1 (right edge).
Set dx = hitRatio * maxSpeed, dy = -abs(dy) (always bounce up).
Near center → small dx (shallow angle).
Near edge → large dx (steep angle)

=------------
Instead, think in terms of dx (horizontal speed) and dy (vertical speed).  The ball moves by adding dx and dy to its position each frame.

When the ball hits the paddle:

Find how far the ball is from the center of the paddle. 
Turn that into a number between -1 (left edge) and 1 (right edge).
Multiply that number by a maximum horizontal speed (e.g., 2) → this becomes the new dx.
Near center → small number → shallow bounce.
Near edge → large number → steep bounce.
Always set dy = -abs(dy) → ball bounces upward. 
Example:

Paddle center at x = 5.
Ball hits at x = 3 → offset = -2.
Normalize: hitRatio = (ballX - paddleCenter) / (paddleWidth / 2) → say, -0.4.
Set dx = hitRatio * maxDx → -0.4 * 2 = -0.8.
Set dy = -1.5. 
Now the ball moves with dx = -0.8, dy = -1.5 — a gentle leftward bounce

-----------

For wall collisions:

Check if the ball hits the left/right edges (x ≈ 0 or x ≈ 51) → reverse dx.
Check if it hits the top (y ≈ 0) → reverse dy.
If it hits the bottom (y ≥ 19) and no platform → game over.
For brick collisions:

Loop through all bricks.
If the ball’s position overlaps a brick’s position → it hit.
Reverse dy and remove that brick (set to _ and clear from screen).
Use the same grid-checking method as with the platform. 
Each frame:

Update ball position: x += dx, y += dy.
Check all collisions in order: walls → bricks → platform.
If any collision occurs, reverse dy (or dx for side walls) and adjust position. 
