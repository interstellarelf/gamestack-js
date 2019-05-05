var module = module || {};


module.exports = function(Skeleton) {

var right_arm = Skeleton.right_arm,
left_arm = Skeleton.left_arm,
right_leg = Skeleton.right_leg,
left_leg = Skeleton.left_leg;

  (function() {

      right_leg.promise = left_leg.promise = function(callback, done) {

        callback = callback.bind(this);

        done = done.bind(this);

        var interval = interval || setInterval(function() {

          var complete = callback();

          if (complete) {
            done();
            clearInterval(interval);
          }

        }, 20);

      };

      right_leg.back = left_leg.back = function(speed) {

        this.promise(function() {

          if (this === left_leg) {
            //right arm forward, left arm back
            if (right_arm.sprites[0].rotation.x < 45) {
              var dist = 45 - right_arm.sprites[0].rotation.x;

              right_arm.sprites[0].rotation.x += dist * speed * 0.01;
            }

            if (right_arm.sprites[1].rotation.x < 0) {
              var dist = 0 - right_arm.sprites[1].rotation.x;

              right_arm.sprites[1].rotation.x += dist * speed * 0.01;
            }

            if (left_arm.sprites[0].rotation.x > -35) {
              var dist = Math.abs(-35 - left_arm.sprites[0].rotation.x);

              left_arm.sprites[0].rotation.x -= dist * speed * 0.005;
            }

            if (left_arm.sprites[1].rotation.x > -110) {

              var dist = Math.abs(-110 + left_arm.sprites[1].rotation.x);

              left_arm.sprites[1].rotation.x -= dist * speed * 0.005;
            }
          }

          this.sprites[0].rotation.x += 0.4 * speed;

          if (this.sprites[0].rotation.x > 0 && this.sprites[1].rotation.x < 120) {
            this.sprites[1].rotation.x += 1.4 * speed;
          } else if (this.sprites[0].rotation.x < 0) {
            this.sprites[1].rotation.x -= 0.2 * speed;
          }

          return this.sprites[0].rotation.x >= 35;

        }, function() {

          this.forward(speed);

        });

      };

      right_leg.forward = left_leg.forward = function(speed) {

        this.promise(function() {

          if (this === left_leg) {
            //left arm forward, right arm back

            if (left_arm.sprites[0].rotation.x < 45) {

              var dist = 45 - left_arm.sprites[0].rotation.x;

              left_arm.sprites[0].rotation.x += dist * speed * 0.01;

            }

            if (left_arm.sprites[1].rotation.x < 0) {
              var dist = 0 - left_arm.sprites[1].rotation.x;
              left_arm.sprites[1].rotation.x += dist * speed * 0.01;
            }


            if (right_arm.sprites[0].rotation.x > -35) {
              var dist = Math.abs(-35 - right_arm.sprites[0].rotation.x);
              right_arm.sprites[0].rotation.x -= dist * speed * 0.005;

            }

            if (right_arm.sprites[1].rotation.x > -110) {
              var dist = Math.abs(-110 + right_arm.sprites[1].rotation.x);
              right_arm.sprites[1].rotation.x -= dist * speed * 0.005;
            }

            if (false && left_arm) {
              if (left_arm.sprites[0].rotation.x > -45) {
                left_arm.sprites[0].rotation.x -= 1 * speed;
              }

              if (left_arm.sprites[1].rotation.x > 0) {
                left_arm.sprites[1].rotation.x -= 1 * speed;
              }
            }
          }


          this.sprites[0].rotation.x -= 0.4 * speed;

          if (this.sprites[0].rotation.x < 0 && this.sprites[0].rotation.x > -35 && this.sprites[1].rotation.x > 40) {
            this.sprites[1].rotation.x -= 0.2 * speed;
          } else if (this.sprites[0].rotation.x < -35) {
            this.sprites[1].rotation.x -= 0.4 * speed;
          } else if (this.sprites[0].rotation.x > -10) {
            this.sprites[1].rotation.x -= 0.2 * speed;
          }

          if (this.sprites[0].rotation.x < 0 && this.sprites[2].rotation.x > 0) {
            //        this.sprites[2].rotation.x -= 1;
          } else {
            //          this.sprites[2].rotation.x = this.sprites[1].rotation.x;

          }

          //  this.sprites[2].rotation.x -= 0.9;

          return this.sprites[0].rotation.x <= -75;

        }, function() {

          this.back(speed);

        });

      };

      right_leg.run = function() {
        //start run
        this.back(3.9);
      };

      left_leg.run = function() {
        //delay, then start_run
        var leg = this;

        window.setTimeout(function() {

          leg.back(3.9);

        }, 1500)

      };


  })();

  Object.assign(Skeleton, {
    do_run: function() {
      //start running::
        right_leg.run();
        left_leg.run();
    }
  });


};
