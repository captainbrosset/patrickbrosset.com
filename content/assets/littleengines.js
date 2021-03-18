(function(root) {
    var sets = new Set();
  
    // Start the animation loop that will be used by all sets
    function animLoop(render) {
      var running, lastFrame = +new Date;
      root.requestAnimFrame = (function() {
        return root.requestAnimationFrame || root.webkitRequestAnimationFrame || root.mozRequestAnimationFrame || function(callback) {
          root.setTimeout(callback, 1000 / 60);
        };
      })();
  
      function loop(now) {
        if (running !== false) {
          requestAnimFrame(loop);
          running = render(now - lastFrame);
          lastFrame = now;
        }
      }
      loop(lastFrame);
    };
    animLoop(function() {
      for (var set of sets) {
        if(set.isRunning) {
          set.next();
        }
      }
    });
  
    function drawDot(x, y, color, size, ctx) {
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };
  
    /**
     * Construct a new set in a given DOM element. 2 canvas elements will be created within, it's then up to you
     * to position them as you wish using CSS.
     * @constructor
     * @param {HTMLElement} rootEl
     * @param {Number} width
     * @param {Number} height
     */
    var LittleEnginesSet = function(rootEl, width, height, color, size) {
      this._rootEl = rootEl || root.document.body;
      this._engineCtx = this._trailCtx = null;
      this._width = width || 400;
      this._height = height || 400;
      this._color = color || 'rgba(255,105,200,.5)';
      this._size = size || 1;
      this._engines = new Set();
      this.isRunning = false;
  
      this._init();
  
      sets.add(this);
    };
  
    LittleEnginesSet.prototype = {
      _init: function() {
        var engineCanvas = root.document.createElement('canvas');
        engineCanvas.setAttribute('width', this._width);
        engineCanvas.setAttribute('height', this._height);
        engineCanvas.setAttribute('class', 'engine');
        this._engineCtx = engineCanvas.getContext('2d');
        this._rootEl.appendChild(engineCanvas);
  
        var trailCanvas = root.document.createElement('canvas');
        trailCanvas.setAttribute('width', this._width);
        trailCanvas.setAttribute('height', this._height);
        trailCanvas.setAttribute('class', 'trail');
        this._trailCtx = trailCanvas.getContext('2d');
        this._rootEl.appendChild(trailCanvas);
      },
  
      /**
       * Stop and remove this set from the root DOM element
       */
      destroy: function() {
        sets.delete(this);
        this._rootEl.removeChild(this._engineCtx.canvas);
        this._rootEl.removeChild(this._trailCtx.canvas);
        this._rootEl = null;
        this._engines.clear();
      },
  
      _isCircleEngine: function(e) {
        return e.x !== undefined &&
               e.y !== undefined &&
               e.r !== undefined &&
               e.a !== undefined &&
               e.s !== undefined;
      },
  
      _isCustomEngine: function(e) {
        return e.x !== undefined &&
               e.y !== undefined &&
               e.getXY !== undefined;
      },
  
      /**
       * Add a new engine to the set
       * @param {Object} The engine configuration object.
       * The most usual way to add an engine is to pass the following properties:
       * {x,y,r,a,s} with x/y being the coordinates of the center of the engine,
       * r being the radius, a the start angle and s the rotation speed. In this case
       * the engine will describe a circle. If you want something else, pass:
       * {x,y,getXY} with x/y being the center and getXY being a function.
       * This function will be called at each step of the animation in the scope
       * of the engine, so up to you to add state properties to the engine object
       * @return {Object} The engine object, to be used with removeEngine
       */
      addEngine: function(engine) {
        if(this._isCircleEngine(engine) || this._isCustomEngine(engine)) {
          return this._engines.add(engine) || engine;
        } else {
          throw new Error('Engine is neither a circle nor custom');
        }
      },
  
      removeEngine: function(engine) {
        this._engines.delete(engine);
      },
  
      clearTrail: function() {
        this._trailCtx.clearRect(0, 0, this._trailCtx.canvas.width, this._trailCtx.canvas.height);
      },
  
      start: function() {
        this.isRunning = true;
      },
  
      stop: function() {
        this.isRunning = false;
      },
  
      toggle: function() {
        this.isRunning = !this.isRunning;
      },
  
      next: function() {
        this._engineCtx.clearRect(0, 0, this._engineCtx.canvas.width, this._engineCtx.canvas.height);
  
        var linksCoordinates = [], posX, posY;
  
        // Engines
        this._engineCtx.strokeStyle = 'rgba(255,255,255,.5)';
        this._engineCtx.lineWidth = 2;
        for(var engine of this._engines) {
          if(this._isCustomEngine(engine)) {
            var posXY = engine.getXY();
            posX = posXY.x;
            posY = posXY.y;
          } else {
            posX = engine.x + (engine.r * Math.cos(engine.a));
            posY = engine.y + (engine.r * Math.sin(engine.a));
            engine.a += engine.s;
          }
  
          this._engineCtx.beginPath();
          this._engineCtx.moveTo(engine.x, engine.y);
          this._engineCtx.lineTo(posX, posY);
          this._engineCtx.closePath();
          this._engineCtx.stroke();
  
          drawDot(engine.x, engine.y, 'rgba(255,255,255,.5)', 1, this._engineCtx);
          drawDot(posX, posY, 'rgba(255,255,255,.5)', 1, this._engineCtx);
  
          linksCoordinates.push({
            x: posX,
            y: posY
          });
        }
  
        if(linksCoordinates.length) {
          // Links
          this._engineCtx.strokeStyle = 'rgba(255,105,180,.5)';
          this._engineCtx.beginPath();
          this._engineCtx.moveTo(linksCoordinates[0].x, linksCoordinates[0].y);
          linksCoordinates.forEach(function(point, index) {
            if (index !== 0) {
              this._engineCtx.lineTo(point.x, point.y);
            }
          }.bind(this));
          this._engineCtx.closePath();
          this._engineCtx.stroke();
  
          // Links mid-points
          linksCoordinates.forEach(function(point, index, points) {
            var start = point, end = points[index + 1] || points[0];
            var midX = (start.x + end.x) / 2, midY = (start.y + end.y) / 2;
            drawDot(midX, midY, 'red', 1, this._engineCtx);
            drawDot(midX, midY, this._color, this._size, this._trailCtx);
          }.bind(this));
        }
      }
    };
  
    root.LittleEnginesSet = LittleEnginesSet;
  })(window);