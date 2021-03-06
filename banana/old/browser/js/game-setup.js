
var Recorder = (function() {
  var recorder;
  var init = 'reproduce=';
  var initLocation = window.location.search.indexOf(init);
  var replaying = initLocation >= 0;
  var raf = window['requestAnimationFrame'] ||
            window['mozRequestAnimationFrame'] ||
            window['webkitRequestAnimationFrame'] ||
            window['msRequestAnimationFrame'] ||
            window['oRequestAnimationFrame'];
  if (!replaying) {
    // Prepare to record
    recorder = {};
    // Start
    recorder.frameCounter = 0; // the frame counter is used to know when to replay events
    recorder.start = function() {
      alert("Starting recording! Don't forget to Recorder.finish() afterwards!");
      function count() {
        recorder.frameCounter++;
        raf(count);
      }
      count();
      recorder.started = true;
    };
    // Math.random
    recorder.randoms = [];
    recorder.random = Math.random;
    Math.random = function() {
      var ret = recorder.random();
      recorder.randoms.push(ret);
      return ret;
    };
    // Date.now, performance.now
    recorder.dnows = [];
    recorder.dnow = Date.now;
    Date.now = function() {
      var ret = recorder.dnow();
      recorder.dnows.push(ret);
      return ret;
    };
    recorder.pnows = [];
    var pnow = performance.now || performance.webkitNow || performance.mozNow || performance.oNow || performance.msNow;
    recorder.pnow = function() { return pnow.call(performance) };
    performance.now = function() {
      var ret = recorder.pnow();
      recorder.pnows.push(ret);
      return ret;
    };
    // Events
    recorder.devents = []; // document events
    recorder.onEvent = function(which, callback) {
      document['on' + which] = function(event) {
        if (!recorder.started) return true;
        event.frameCounter = recorder.frameCounter;
        recorder.devents.push(event);
        return callback(event); // XXX do we need to record the return value?
      };
    };
    recorder.tevents = []; // custom-target events. Currently we assume a single such custom target (aside from document), e.g., a canvas for the game.
    recorder.addListener = function(target, which, callback, arg) {
      target.addEventListener(which, function(event) {
        if (!recorder.started) return true;
        event.frameCounter = recorder.frameCounter;
        recorder.tevents.push(event);
        return callback(event); // XXX do we need to record the return value?
      }, arg);
    };
    // Finish
    recorder.finish = function() {
      // Reorder data because pop() is faster than shift()
      recorder.randoms.reverse();
      recorder.dnows.reverse();
      recorder.pnows.reverse();
      recorder.devents.reverse();
      recorder.tevents.reverse();
      // Make JSON.stringify work on data from native event objects (and only store relevant ones)
      var importantProperties = {
        type: 1,
        movementX: 1, mozMovementX: 1, webkitMovementX: 1,
        movementY: 1, mozMovementY: 1, webkitMovementY: 1,
        detail: 1,
        wheelDelta: 1,
        pageX: 1,
        pageY: 1,
        button: 1,
        keyCode: 1,
        frameCounter: 1
      };
      function importantize(event) {
        var ret = {};
        for (var prop in importantProperties) {
          if (prop in event) {
            ret[prop] = event[prop];
          }
        }
        return ret;
      }
      recorder.devents = recorder.devents.map(importantize);
      recorder.tevents = recorder.tevents.map(importantize);
      // Write out
      alert('Writing out data, remember to save!');
      setTimeout(function() {
        document.open();
        document.write(JSON.stringify(recorder));
        document.close();
      }, 0);
      return '.';
    };
  } else {
    // Load recording
    var dataPath = window.location.search.substring(initLocation + init.length);
    var baseURL = window.location.toString().replace('://', 'cheez999').split('?')[0].split('/').slice(0, -1).join('/').replace('cheez999', '://');
    if (baseURL[baseURL.length-1] != '/') baseURL += '/';
    var path = baseURL + dataPath;
    alert('Loading replay from ' + path);
    var request = new XMLHttpRequest();
    request.open('GET', path, false);
    request.send();
    var raw = request.responseText;
    raw = raw.substring(raw.indexOf('{'), raw.lastIndexOf('}')+1); // remove <html> etc
    recorder = JSON.parse(raw);
    // prepare to replay
    // Start
    recorder.frameCounter = 0; // the frame counter is used to know when to replay events
    recorder.start = function() {
      function count() {
        recorder.frameCounter++;
        raf(count);
        // replay relevant events for this frame
        while (recorder.devents.length && recorder.devents[recorder.devents.length-1].frameCounter <= recorder.frameCounter) {
          var event = recorder.devents.pop();
          recorder['on' + event.type](event);
        }
        while (recorder.tevents.length && recorder.tevents[recorder.tevents.length-1].frameCounter <= recorder.frameCounter) {
          var event = recorder.tevents.pop();
          recorder['event' + event.type](event);
        }
      }
      count();
    };
    // Math.random
    recorder.random = Math.random;
    Math.random = function() {
      if (recorder.randoms.length > 0) {
        return recorder.randoms.pop();
      } else {
        recorder.finish();
        throw 'consuming too many random values!';
      }
    };
    // Date.now, performance.now
    recorder.dnow = Date.now;
    Date.now = function() {
      if (recorder.dnows.length > 0) {
        return recorder.dnows.pop();
      } else {
        recorder.finish();
        throw 'consuming too many Date.now values!';
      }
    };
    var pnow = performance.now || performance.webkitNow || performance.mozNow || performance.oNow || performance.msNow;
    recorder.pnow = function() { return pnow.call(performance) };
    performance.now = function() {
      if (recorder.pnows.length > 0) {
        return recorder.pnows.pop();
      } else {
        recorder.finish();
        throw 'consuming too many performance.now values!';
      }
    };
    // Events
    recorder.onEvent = function(which, callback) {
      recorder['on' + which] = callback;
    };
    recorder.eventCallbacks = {};
    recorder.addListener = function(target, which, callback, arg) {
      recorder['event' + which] = callback;
    };
    recorder.onFinish = [];
    // Benchmarking hooks - emscripten specific
    setTimeout(function() {
      var totalTime = 0;
      var totalSquared = 0;
      var iterations = 0;
      var maxTime = 0;
      var curr = 0;
      Module.preMainLoop = function() {
        curr = recorder.pnow();
      }
      Module.postMainLoop = function() {
        var time = recorder.pnow() - curr;
        totalTime += time;
        totalSquared += time*time;
        maxTime = Math.max(maxTime, time);
        iterations++;
      };
      recorder.onFinish.push(function() {
        var mean = totalTime / iterations;
        var meanSquared = totalSquared / iterations;
        console.log('mean frame   : ' + mean + ' ms');
        console.log('frame std dev: ' + Math.sqrt(meanSquared - (mean*mean)) + ' ms');
        console.log('max frame    : ' + maxTime + ' ms');
      });    
    });
    // Finish
    recorder.finish = function() {
      recorder.onFinish.forEach(function(finish) {
        finish();
      });
    };
  }
  recorder.replaying = replaying;
  return recorder;
})();


// Setup compiled code parameters and interaction with the web page
var Module = {
  failed: false,
  preRun: [],
  postRun: [],
  preloadPlugins: [],
  print: function(text) {
    console.log('[STDOUT] ' + text);
  },
  printErr: function(text) {
    console.log(text);
  },
  canvas: document.getElementById('canvas'),
  statusMessage: 'Starting...',
  setStatus: function(text) {
    if (Module.setStatus.interval) clearInterval(Module.setStatus.interval);
    var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
    var statusElement = document.getElementById('status-text');
    var progressElement = document.getElementById('progress');
    if (m) {
      text = m[1];
      progressElement.value = parseInt(m[2])*100;
      progressElement.max = parseInt(m[4])*100;
      progressElement.hidden = false;
    } else {
      progressElement.value = null;
      progressElement.max = null;
      progressElement.hidden = true;
    }
    statusElement.innerHTML = text;
  },
  totalDependencies: 0,
  monitorRunDependencies: function(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
  },
  onFullScreen: function(isFullScreen) {
    if (isFullScreen) {
      Module.resumeMainLoop();
      Module.setOpacity(1);
      Module.setStatus('');
      document.querySelector('.status .ingame').classList.add( 'hide' );
      document.querySelector('canvas').classList.remove( 'paused' );
      //BananaBread.execute('musicvol $oldmusicvol'); // XXX TODO: need to restart the music by name here
    } else {
      Module.pauseMainLoop();
      Module.setOpacity(0.333);
      Module.setStatus('<b>paused (enter fullscreen to resume)</b>');
      document.querySelector('canvas').classList.add( 'paused' );
      document.querySelector('.status .ingame').classList.remove( 'hide' );
      //BananaBread.execute('oldmusicvol = $musicvol ; musicvol 0');
    }
  }
};

// Checks for features we cannot run without
// Note: Modify this for your needs. If your level does not use
//       texture compression, remove the check for it here.

(function() {
  function fail(text) {
    Module._main = null;
    document.querySelector('.status-content.error .details').innerHTML = text + ' is missing.';
    document.querySelector('.status-content.loading .progress-container').classList.add('hide');
    document.querySelector('.status-content.error').classList.remove('hide');
    Module.failed = true;
    throw text;
  }
  try {
    var canvas = document.createElement('canvas');
  } catch(e){}
  if (!canvas) fail('canvas element');
  try {
    var context = canvas.getContext('experimental-webgl');
  } catch(e){}
  if (!context) fail('WebGL');
  var s3tc = context.getExtension('WEBGL_compressed_texture_s3tc') ||
             context.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
             context.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
  if (!s3tc) fail('texture compression');
  var pointerLock = canvas['requestPointerLock'] ||
                    canvas['mozRequestPointerLock'] ||
                    canvas['webkitRequestPointerLock'];
  if (!pointerLock) fail('pointer lock/mouse lock');
})();

// Loading music. Will be stopped once the first frame of the game runs

Module.loadingMusic = new Audio();
Module.loadingMusic.src = 'assets/OutThere_0.ogg';
Module.loadingMusic.play();

Module.readySound = new Audio();
Module.readySound.src = 'assets/alarmcreatemiltaryfoot_1.ogg';

// Pre-unzip ogz files, we can do this in parallel in a worker during preload

(function() {
  var zeeWorker = new Worker('game/zee-worker.js');

  var zeeCallbacks = [];

  zeeWorker.onmessage = function(msg) {
    zeeCallbacks[msg.data.callbackID](msg.data.data);
    console.log("zee'd " + msg.data.filename + ' in ' + msg.data.time + ' ms, ' + msg.data.data.length + ' bytes');
    zeeCallbacks[msg.data.callbackID] = null;
  };

  function requestZee(filename, data, callback) {
    zeeWorker.postMessage({
      filename: filename,
      data: data,
      callbackID: zeeCallbacks.length
    });
    zeeCallbacks.push(callback);
  }

  Module.postRun.push(function() {
    zeeWorker.terminate();
  });

  Module.preloadPlugins.push({
    canHandle: function(name) {
      return name.substr(-4) == '.ogz';
    },
    handle: function(byteArray, name, onload, onerror) {
      requestZee(name, byteArray, function(byteArray) {
        onload(byteArray);
      });
    }
  });
})();

// Hooks

Module.setOpacity = function(opacity) {
  var rule = 'canvas.emscripten';
  var more = 'border: 1px solid black';
  var styleSheet = document.styleSheets[0];
  var rules = styleSheet.cssRules;
  for (var i = 0; i < rules.length; i++) {
    if (rules[i].cssText.substr(0, rule.length) == rule) {
      styleSheet.deleteRule(i);
      i--;
    }
  }
  styleSheet.insertRule(rule + ' { opacity: ' + opacity + '; ' + (more || '') + ' }', 0);
}

Module.setOpacity(0.1);

Module.fullscreenCallbacks = [];

Module.postLoadWorld = function() {
  document.title = 'BananaBread';

  if (Module.loadingMusic) {
    Module.loadingMusic.pause();
    Module.loadingMusic = null;
  }
  Module.tweakDetail();

  BananaBread.execute('sensitivity 10');
  BananaBread.execute('clearconsole');

  setTimeout(function() {
    BananaBread.execute('oldmusicvol = $musicvol ; musicvol 0');
  }, 1); // Do after startup finishes so music will be prepared up

  // Pause and fade out until the user presses fullscreen

  Module.pauseMainLoop();
  setTimeout(function() {
    document.querySelector('.status-content.loading').classList.add('hide');
    document.querySelector('.status-content.fullscreen-buttons').classList.remove('hide');
  }, 0);

  Module.resume = function() {
    Module.requestFullScreen();
    Module.setOpacity(1);
    Module.setStatus('');
    Module.resumeMainLoop();
 };

  Module.fullscreenLow = function() {
    document.querySelector('.status-content.fullscreen-buttons').classList.add('hide');
    document.querySelector('canvas').classList.remove('hide');
    Module.requestFullScreen();
    Module.setOpacity(1);
    Module.setStatus('');
    Module.resumeMainLoop();
    Module.fullscreenCallbacks.forEach(function(callback) { callback() });
  };

  Module.fullscreenHigh = function() {
    document.querySelector('.status-content.fullscreen-buttons').classList.add('hide');
    document.querySelector('canvas').classList.remove('hide');
    Module.requestFullScreen();
    Module.setOpacity(1);
    Module.setStatus('');
    BananaBread.execute('screenres ' + screen.width + ' ' + screen.height);
    Module.resumeMainLoop();
    Module.fullscreenCallbacks.forEach(function(callback) { callback() });
  };

  // All set!
  Module.readySound.play();
  Module.readySound = null;

  if (replayingRecording) {
    Module.startupFinish = Recorder.pnow();
  }
};

Module.autoexec = function(){}; // called during autoexec on load, so useful to tweak settings that require gl restart
Module.tweakDetail = function(){}; // called from postLoadWorld, so useful to make changes after the map has been loaded

(function() {
  var fraction = 0.70;
  var desired = Math.min(fraction*screen.availWidth, fraction*screen.availHeight, 600);
  var w, h;
  if (screen.width >= screen.height) {
    h = desired;
    w = Math.floor(desired * screen.width / screen.height);
  } else {
    w = desired;
    h = Math.floor(desired * screen.height / screen.width);
  }
  Module.desiredWidth = w;
  Module.desiredHeight = h;
})();

// Public API

var BananaBread = {
  init: function() {
    BananaBread.setPlayerModelInfo = Module.cwrap('_ZN4game18setplayermodelinfoEPKcS1_S1_S1_S1_S1_S1_S1_S1_S1_S1_S1_b', null,
      ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'number']);
    BananaBread.execute = Module.cwrap('_Z7executePKc', 'number', ['string']);
    BananaBread.executeString = Module.cwrap('_Z10executestrPKc', 'string', ['string']);

    var forceCamera = Module.cwrap('setforcecamera', null, ['number', 'number', 'number', 'number', 'number', 'number']);
    BananaBread.forceCamera = function(position, orientation) {
      forceCamera(position[0], position[1], position[2], orientation[0], orientation[1], orientation[2]);
    };

    BananaBread.PARTICLE = {};
    var i = 0;
    BananaBread.PARTICLE.BLOOD = (i++);
    BananaBread.PARTICLE.WATER = (i++);
    BananaBread.PARTICLE.SMOKE = (i++);
    BananaBread.PARTICLE.STEAM = (i++);
    BananaBread.PARTICLE.FLAME = (i++);
    BananaBread.PARTICLE.FIREBALL1 = (i++);
    BananaBread.PARTICLE.FIREBALL2 = (i++);
    BananaBread.PARTICLE.FIREBALL3 = (i++);
    BananaBread.PARTICLE.STREAK = (i++);
    BananaBread.PARTICLE.LIGHTNING = (i++);
    BananaBread.PARTICLE.EXPLOSION = (i++);
    BananaBread.PARTICLE.EXPLOSION_BLUE = (i++);
    BananaBread.PARTICLE.SPARK = (i++);
    BananaBread.PARTICLE.EDIT = (i++);
    BananaBread.PARTICLE.SNOW = (i++);
    BananaBread.PARTICLE.MUZZLE_FLASH1 = (i++);
    BananaBread.PARTICLE.MUZZLE_FLASH2 = (i++);
    BananaBread.PARTICLE.MUZZLE_FLASH3 = (i++);
    BananaBread.PARTICLE.HUD_ICON = (i++);
    BananaBread.PARTICLE.HUD_ICON_GREY = (i++);
    BananaBread.PARTICLE.TEXT = (i++);
    BananaBread.PARTICLE.METER = (i++);
    BananaBread.PARTICLE.METER_VS = (i++);
    BananaBread.PARTICLE.LENS_FLARE = (i++);
    var splash = Module.cwrap('bb_splash', null, ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
    BananaBread.splash = function(type, color, radius, num, fade, p, size, gravity) {
      splash(type, color, radius, num, fade, p[0], p[1], p[2], size, gravity);
    };

    var playSoundName = Module.cwrap('bb_playsoundname', null, ['string', 'number', 'number', 'number']);
    BananaBread.playSound = function(name, position) {
      playSoundName(name, position[0], position[1], position[2]);
    };
  },
};

Module.postRun.push(BananaBread.init);
Module.postRun.push(function() {
  var n = 0;
  for (var x in Module.preloadedAudios) n++;
  console.log('successfully preloaded audios: ' + n);
  if (n == 0) alert('Your browser could not load the audio files. Running will continue without sound effects.');
});

// Additional APIs

BananaBread.Utils = {
  randomPick: function(items) {
    return items[Math.floor(Math.random()*items.length)];
  },
};

BananaBread.Event = function(data) {
  this.run = function() {
    var start = Date.now();
    var last = start;
    function iteration() {
      var now = Date.now();
      var ms = now - last;
      last = now;
      if (ms > data.totalMs) return;
      data.onFrame(ms);
      Module.requestAnimationFrame(iteration);
    }
    iteration();
  };
  if (data.onInit) data.onInit(data);
}

BananaBread.Effects = {
  Fireworks: function(shots) {
    var event = new BananaBread.Event({
      totalMs: Infinity,

      onFrame: function(ms) {

        var secs = ms/1000;
        var newShots = [];

        shots = shots.filter(function(shot) {
          LinearMath.vec3.add(shot.position, LinearMath.vec3.scale(LinearMath.vec3.create(shot.velocity), secs));
          shot.velocity[2] -= secs * 200; // gravity
          shot.msLeft -= ms;
          if (shot.msLeft > 0) {
            BananaBread.splash(BananaBread.PARTICLE.SPARK, 0xffffff, 1, 20, Math.max(50, ms*2), shot.position, 1, 1);
            return true;
          } else {
            var size = Math.ceil(Math.random()*3); // 1, 2 or 3
            var color;
            for (var i = 0; i < 2; i++) {
              color = Math.floor(Math.random()*255) + (Math.floor(Math.random()*255) << 8) + (Math.floor(Math.random()*255) << 16);
              BananaBread.splash(BananaBread.PARTICLE.SPARK, color, 100+25*size, 7+3*size, Math.max(300, ms*7), shot.position, 1+size, 1);
            }
            if (size > 1) {
              BananaBread.splash(BananaBread.PARTICLE.EXPLOSION, color, 0, 1, Math.max(175, ms*3), shot.position, 5*size, 0);
            }
            BananaBread.playSound(size == 3 ? 'q009/explosion.ogg' : 'olpc/MichaelBierylo/sfx_DoorSlam.wav', shot.position);
            return false;
          }
        });
      
        shots.push.apply(shots, newShots);

        if (shots.length == 0) this.totalMs = 0;
      },
    });

    event.run();
  }
};

function CameraPath(data) { // TODO: namespace this
  var steps = data.steps;
  var n = data.steps.length;
  var timeScale = data.timeScale;
  var position = LinearMath.vec3.create();
  var temp = LinearMath.vec3.create();
  var orientation = LinearMath.vec3.create();
  var cancelled = false;
  var sigma = data.sigma || 0.75;
  var lasti = -1;
  var debug = data.debug;
  var loop = data.loop;

  if (!data.uncancellable) addEventListener('keydown', function() { cancelled = true });

  this.execute = function() {
    var startTime = null;
    function moveCamera() {
      if (!startTime) startTime = Date.now();
      if (cancelled) return;
      var now = Date.now();
      var t = (Date.now() - startTime)/(timeScale*1000);
      if (t > n-1 && !loop) return;
      var i = Math.round(t);
      if (debug && i != lasti) {
        lasti = i;
        alert('now on ' + i);
        startTime += (Date.now() - now); // ignore alert wait time
      }
      var factors = 0;
      position[0] = position[1] = position[2] = orientation[0] = orientation[1] = orientation[2] = 0;
      for (var j = i-2; j <= i+2; j++) {
        var jj = j;
        if (loop && jj >= n) jj = jj % n;
        var curr = steps[jj];
        if (!curr) continue;
        var factor = Math.exp(-Math.pow((j-t)/sigma, 2));
        LinearMath.vec3.scale(curr.position, factor, temp);
        LinearMath.vec3.add(position, temp);
        LinearMath.vec3.scale(curr.orientation, factor, temp);
        LinearMath.vec3.add(orientation, temp);
        factors += factor;
      }
      LinearMath.vec3.scale(position, 1/factors);
      LinearMath.vec3.scale(orientation, 1/factors);
      BananaBread.forceCamera(position, orientation);
      Module.requestAnimationFrame(moveCamera);
    }
    Module.fullscreenCallbacks.push(moveCamera);
  }
}

// Benchmarking glue

var replayingRecording = false;

if (typeof Recorder != 'undefined') {
  Module.fullscreenCallbacks.push(function() {
    Recorder.start();
  });

  replayingRecording = Recorder.replaying;

  if (replayingRecording) {
    Recorder.onFinish.push(function() {
      console.log('startup   : ' + (Module.startupFinish - Module.startupStart) + ' ms');
    });

    Module.startupStart = Recorder.pnow();
  }
}

// Load scripts

(function() {
  function loadChildScript(name, then) {
    var js = document.createElement('script');
    if (then) js.onload = then;
    js.src = name;
    document.body.appendChild(js);
  }

  var queryString = window.location.search ? window.location.search.substring(1) : "";
  var urlParts, debug;

  try {
    urlParts = queryString.split(',');
    debug = queryString.indexOf('debug') >= 0;
  }
  catch(e){
    // default to sanity if url parsing fails
    urlParts = ['low','low'];
    debug = false;
  }

  var setup = urlParts[0], preload = urlParts[1];

  var levelTitleContainer = document.querySelector('.level-title span');
  var levelTitle = setup === 'high' ? 'Lava Chamber' : setup === 'medium' ? 'Two Towers' : 'Arena'; 
  levelTitleContainer.innerHTML = levelTitle;

  var previewContainer = document.querySelector('.preview-content.' + setup );
  previewContainer.classList.add('show');

  if(!Module.failed){
    loadChildScript('game/gl-matrix.js', function() {
      loadChildScript('game/setup_' + setup + '.js', function() {
        loadChildScript('game/preload_' + preload + '.js', function() {
          loadChildScript('game/bb' + (debug ? '.debug' : '') + '.js');
        });
      });
    });
  }
})();

(function(){
  var lowResButton = document.querySelector('.fullscreen-button.low-res');
  var highResButton = document.querySelector('.fullscreen-button.high-res');
  var resumeButton = document.querySelector('.fullscreen-button.resume');
  var quitButton = document.querySelector('.fullscreen-button.quit');
  lowResButton.addEventListener('click', function(e){
    Module.fullscreenLow();
  }, false);
  highResButton.addEventListener('click', function(e){
    Module.fullscreenHigh();
  }, false);
  resumeButton.addEventListener('click', function(e){
    Module.resume();
  }, false);
  quitButton.addEventListener('click', function(e){
    window.location = 'index.html';
  }, false);
})();

