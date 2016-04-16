/*
 * Author: Vincent Helmreich
 * created on: 15.04.2016
 * last edit: 16.04.2016
 */


/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function (util, vec2, Scene, PointDragger) {

        "use strict";

        /**
         *  A simple circle or point that can be dragged
         *  around by its middle point.
         *  Parameters:
         *  - point0: array object representing [x,y] coordinates of the middle
         *  - lineStyle: object defining width and color attributes for line drawing,
         *       begin of the form { width: 2, color: "#00FF00" }
         *  - radius: the radius of the circle
         *  - circleOrPoint: if it's a circle or point (true: circle, false: point)
         */

        var Circle = function (point0, radius, lineStyle, bool) {

            if(bool)
                console.log("creating circle with middle point at: " + point0[0] + "," + point0[1] + ", radius: " + radius);
            else
                console.log("creating point with middle point at: " + point0[0] + "," + point0[1] + ", radius: " + radius);

            // draw style for drawing the line
            this.lineStyle = lineStyle || {width: "2", color: "#0000AA"};
            
            // initial point in case either point is undefined
            this.p0 = point0 || [10, 10];
            
            //the radius of the circle
            this.radius = radius;
            
            //if it's a circle or point (true: circle, false: point)
            this.circleOrPoint = bool ||false;
            
        };

        // draw this line into the provided 2D rendering context
        Circle.prototype.draw = function (context) {

            // draw actual line
            context.beginPath();

            // set points to be drawn
            context.arc(this.p0[0],this.p0[1], this.radius, 0, Math.PI*2);
           

            // set drawing style
            

            
            // actually start drawing
            if(this.circleOrPoint){
                context.lineWidth = this.lineStyle.width;
                context.strokeStyle = this.lineStyle.color;
                context.stroke();
            }else{
                context.fillStyle= this.lineStyle.color;
                context.fill();
            }
            
            

        };

        // test whether the mouse position is on this line segment
        Circle.prototype.isHit = function (context, pos) {
            
            //calculate the length between middle point and click position
            var t = vec2.length([this.p0[0]-pos[0],this.p0[1]-pos[1]]);
            
            //first line: return for points
            //second line: return for circles
            return ((!this.circleOrPoint && t<this.radius+2)||
                    ( this.radius-this.lineStyle.width-2<t && t<this.radius+this.lineStyle.width+2 ));
        };

        // return list of draggers to manipulate this line
        Circle.prototype.createDraggers = function () {
            
            var draggerStyle = {radius: 4, color: this.lineStyle.color, width: 0, fill: true}
            var draggers = [];

            // create closure and callbacks for dragger
            var _circle = this;
            var getP0 = function () {
                return _circle.p0;
            };
           
            var setP0 = function (dragEvent) {
                _circle.p0 = dragEvent.position;
            };
           
            draggers.push(new PointDragger(getP0, setP0, draggerStyle));

            return draggers;
            
        };


        // this module only exports the constructor for StraightLine objects
        return Circle;

    })); // define

    
