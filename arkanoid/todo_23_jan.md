[ ] PLATFORM
 - [ ] Stop the platform if it reaches boundary (validation : can be done later)

[ ] The Bullet
 - [ ] Create a bullet that moves at an angle
        - [ ] First try to just move it from one coordinate to another
        - [ ] Move it till the wall 
        - [ ] If it touches anything that is not empty reflect 
        - [ ] If it touches the coordinates where the coordY is 0 and there's no platform there game ends

--------------------------------------

Instead of recursive "guessing," use an Index Filtering approach. This ensures you only pick from valid cells in a single pass.
   -> [ ] Filter Valid Cells: Iterate through your grid once and push the coordinates of all
          non-empty (" ") cells and boundaries into a temporary array.
 -> [ ] Select Randomly: Pick one index from that list. This is much faster and never fails.


[ ] Break the "Diagonal-Only" Movement :
     -> To move at angles other than 45degree : 
       [ ] stop simply negating velocities (dx = -dx)
       [ ] modify the angle based on where the ball hits the surface. 

       Method A: The Paddle "Hit Position" Offset
           -> Center Hit: [ ] Ball bounces straight up.
              -> [ ] Calculate the distance from the center of the paddle: offset = ballX - paddleCenter.
              -> [ ] Normalize this to a range (e.g., -10 to 10)
              -> [ ] Set the new angle: angle = (offset * maxAngle) - 90deg

           -> Edge Hit: [ ] Ball bounces at a sharp, shallow angle.