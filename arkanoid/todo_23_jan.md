[ ] The Ball Movement :
 - [ ] Ball movement should be independent of the vaus movement and user input. I.e ball should keep moving.
- [ ] Ball will first fall on the vaus center and then reflects based on : 1) if it is closer to center of vaus the angle will be bigger (50,55,etc) 2) If it is further from the center of vaus the angle will be steeper ( 10,30,20,etc). If it hits on the center of vaus it reflects at the same angle.

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