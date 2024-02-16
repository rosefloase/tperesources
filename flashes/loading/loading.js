(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.frame_00_delay015s = function() {
	this.initialize(img.frame_00_delay015s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,280);


(lib.frame_01_delay015s = function() {
	this.initialize(img.frame_01_delay015s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,280);


(lib.frame_02_delay015s = function() {
	this.initialize(img.frame_02_delay015s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,280);


(lib.frame_03_delay015s = function() {
	this.initialize(img.frame_03_delay015s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,280);


(lib.frame_04_delay015s = function() {
	this.initialize(img.frame_04_delay015s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,280);


(lib.frame_05_delay015s = function() {
	this.initialize(img.frame_05_delay015s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,280);


(lib.frame_06_delay015s = function() {
	this.initialize(img.frame_06_delay015s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,280);


(lib.frame_07_delay015s = function() {
	this.initialize(img.frame_07_delay015s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,280);


(lib.frame_08_delay015s = function() {
	this.initialize(img.frame_08_delay015s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,280);


(lib.frame_09_delay015s = function() {
	this.initialize(img.frame_09_delay015s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,280);


(lib.loadinguibar = function() {
	this.initialize(img.loadinguibar);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,500);


(lib.loadinguibox = function() {
	this.initialize(img.loadinguibox);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,493);


(lib.play = function() {
	this.initialize(img.play);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib.smallbox = function() {
	this.initialize(img.smallbox);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,507);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.sky = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.frame_00_delay015s();
	this.instance.setTransform(-248,-141);

	this.instance_1 = new lib.frame_01_delay015s();
	this.instance_1.setTransform(-248,-141);

	this.instance_2 = new lib.frame_02_delay015s();
	this.instance_2.setTransform(-248,-141);

	this.instance_3 = new lib.frame_03_delay015s();
	this.instance_3.setTransform(-248,-141);

	this.instance_4 = new lib.frame_04_delay015s();
	this.instance_4.setTransform(-248,-141);

	this.instance_5 = new lib.frame_05_delay015s();
	this.instance_5.setTransform(-248,-141);

	this.instance_6 = new lib.frame_06_delay015s();
	this.instance_6.setTransform(-248,-141);

	this.instance_7 = new lib.frame_07_delay015s();
	this.instance_7.setTransform(-248,-141);

	this.instance_8 = new lib.frame_08_delay015s();
	this.instance_8.setTransform(-248,-141);

	this.instance_9 = new lib.frame_09_delay015s();
	this.instance_9.setTransform(-248,-141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},6).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_3}]},4).to({state:[{t:this.instance_4}]},4).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_6}]},4).to({state:[{t:this.instance_7}]},4).to({state:[{t:this.instance_8}]},4).to({state:[{t:this.instance_9}]},4).to({state:[{t:this.instance_9}]},6).to({state:[{t:this.instance_8}]},2).to({state:[{t:this.instance_7}]},4).to({state:[{t:this.instance_6}]},4).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_4}]},4).to({state:[{t:this.instance_3}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance}]},4).wait(7));

	// Layer_2
	this.instance_10 = new lib.frame_00_delay015s();
	this.instance_10.setTransform(-248,-141);

	this.instance_11 = new lib.frame_01_delay015s();
	this.instance_11.setTransform(-248,-141);

	this.instance_12 = new lib.frame_02_delay015s();
	this.instance_12.setTransform(-248,-141);

	this.instance_13 = new lib.frame_03_delay015s();
	this.instance_13.setTransform(-248,-141);

	this.instance_14 = new lib.frame_04_delay015s();
	this.instance_14.setTransform(-248,-141);

	this.instance_15 = new lib.frame_05_delay015s();
	this.instance_15.setTransform(-248,-141);

	this.instance_16 = new lib.frame_06_delay015s();
	this.instance_16.setTransform(-248,-141);

	this.instance_17 = new lib.frame_07_delay015s();
	this.instance_17.setTransform(-248,-141);

	this.instance_18 = new lib.frame_08_delay015s();
	this.instance_18.setTransform(-248,-141);

	this.instance_19 = new lib.frame_09_delay015s();
	this.instance_19.setTransform(-248,-141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10}]}).to({state:[{t:this.instance_11}]},5).to({state:[{t:this.instance_12}]},4).to({state:[{t:this.instance_13}]},4).to({state:[{t:this.instance_14}]},4).to({state:[{t:this.instance_15}]},4).to({state:[{t:this.instance_16}]},4).to({state:[{t:this.instance_17}]},4).to({state:[{t:this.instance_18}]},4).to({state:[{t:this.instance_19}]},4).to({state:[{t:this.instance_19}]},7).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_17}]},4).to({state:[{t:this.instance_16}]},4).to({state:[{t:this.instance_15}]},4).to({state:[{t:this.instance_14}]},4).to({state:[{t:this.instance_13}]},4).to({state:[{t:this.instance_12}]},4).to({state:[{t:this.instance_11}]},4).to({state:[{t:this.instance_10}]},4).wait(8));

	// Layer_1
	this.instance_20 = new lib.frame_00_delay015s();
	this.instance_20.setTransform(-248,-141);

	this.instance_21 = new lib.frame_01_delay015s();
	this.instance_21.setTransform(-248,-141);

	this.instance_22 = new lib.frame_02_delay015s();
	this.instance_22.setTransform(-248,-141);

	this.instance_23 = new lib.frame_03_delay015s();
	this.instance_23.setTransform(-248,-141);

	this.instance_24 = new lib.frame_04_delay015s();
	this.instance_24.setTransform(-248,-141);

	this.instance_25 = new lib.frame_05_delay015s();
	this.instance_25.setTransform(-248,-141);

	this.instance_26 = new lib.frame_06_delay015s();
	this.instance_26.setTransform(-248,-141);

	this.instance_27 = new lib.frame_07_delay015s();
	this.instance_27.setTransform(-248,-141);

	this.instance_28 = new lib.frame_08_delay015s();
	this.instance_28.setTransform(-248,-141);

	this.instance_29 = new lib.frame_09_delay015s();
	this.instance_29.setTransform(-248,-141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_20}]}).to({state:[{t:this.instance_21}]},4).to({state:[{t:this.instance_22}]},4).to({state:[{t:this.instance_23}]},4).to({state:[{t:this.instance_24}]},4).to({state:[{t:this.instance_25}]},4).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_27}]},4).to({state:[{t:this.instance_28}]},4).to({state:[{t:this.instance_29}]},4).to({state:[{t:this.instance_28}]},8).to({state:[{t:this.instance_27}]},4).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_25}]},4).to({state:[{t:this.instance_24}]},4).to({state:[{t:this.instance_23}]},4).to({state:[{t:this.instance_22}]},4).to({state:[{t:this.instance_21}]},4).to({state:[{t:this.instance_20}]},4).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-248,-141,500,280);


(lib.playbutton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.play();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib.whitebg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EAK7AgoIgSgCIhuAAIhiAAIhhAAIh0AAQgrAAgqgCQgOgBgNgDIhZAAIhMAAIhOAAIhMAAIhEAAQgWgBgUgDIgDgBIgrAAIggAAIghAAIghAAIgZgBIgbgDIgJgBIgVAAIgfAAIgVAAIgVAAIgVAAIgVAAIgSAAIgHAAIgLgBIgLgCIgMgCIgKAAIgVAAIgTAAIgTAAIgRgBIgSgBIgRgCIgDgBIgKAAIgKAAIgJAAIgLAAIgKAAIgGAAIgGAAIgLgBIgKgCIgLgDIAAAAIgBAAIgJAAIgJgBIgIgBIgJgCIgDAAIgVAAIgUAAIgWAAIgLAAIgLAAIgLAAIgLAAIgGABIgKACIgIABIgJAAIgJAAIgDAAIgHACIgLACIgJABIgJABIgKAAIgGAAIgKACIgJABIgKABIgJABIgIAAIgBAAIgJABIgIACIgJABIgIABIgCAAQgUAFgUAAIgkAAIgpAAIgpAAIgpAAIgsgBIgLAAQgcAJgegCIg9gBIhAAAIg+AAIg9AAIgmAAIgBAAIgLACIgLACIgLACIgGAAIgHAAIgKAAIgKAAIgJAAIgIAAIgJAAIgIAAIgJABIgJACIgJABIgIAAIghAAIgnAAIgqAAIgpAAIggAAQgSAAgRgDIgGgBIgIAAIgKgBIgLgBIgKgCIgLgCIAAAAIgGAAIgGAAIgGAAIgGAAIgLgBIgKgCIgLgCIgBAAIgIAAIgIgBIgIgBIgJgBIgJgBIgIgBIgGgCIgKgDIgDAAIg3AAIgsAAIgrAAIgpAAIgrgBIgiAAIgHACIgIACIgIACIgGABIgHACIgHADIgHACIgIABIgEACIgKABIgJACIgKABIgJABIgHAAIgIgBIgKgBIgLgCIgKgCIgHgBIgHgEIgHgDIgIgEIgHgGIgGgFIgFgEIgGgHIgGgIIgFgIIgEgIIgDgIIgDgJIgBgGIgCgHIgCgGIgCgIIgCgIIgCgIIgDgJIgDgJIgCgGIgCgJIgBgKIgCgJIAAgCIgCgJIgBgKIgBgJIgBgKIAAgGIAAgHIAAgKIgCgKIgBgJIgBgKIAAgIIgBgJIAAgIIAAgIIAAgIIgEgWQgCgOABgNIAAgbIAAgbIAAgaQgBgOABgOQABgQAEgQIAAgpIAAgqIAAgqIAAgoIAAgpIAAgkQgFgSAAgUIAAggIAAgmIAAgkIAAgiQgBgPACgQIADgVIABgFIAAgKIAAgKIAAgJIABgJIAAgJIABgJIABgJIACgJIAAgJIAAgJIABgJIAAgFIABgIIABgJIACgJIACgIIAEgIIAEgIIAEgIIAFgIQAIgJAJgHIAAgoIAAg+IABg3IAAgoQgEgRgBgRQgBgUAAgTIAAgoIAAgmIADgbIACgOIAAgXIAAgYIAAgXIAAgbIAAgeIgCgJIgBgKIgBgKIgBgLIAAgKIAAgKIAAgOIgDgPQgCgKAAgLIAAgWIAAgVIAAgYIAAgNIgCgGIgBgJIgCgPQgBgHABgHIAAgQIAAgPIAAgLIgBgEIgBgFIgBgFIgBgFIAAgFIgBgEIgBgDIgBgGIgBgFIgBgGIgBgGIAAgFIAAgGIAAgGIgBgEIgBgEIgBgFIgBgDIAAgEIAAgDIgCgFIgBgFIgBgGIgBgEIAAgGIgBgGIgBgDIgBgEIgBgFIgBgFIgBgDIgBgDIgBgFIgBgDIgBgFIgCgFIgBgGIgBgEIgBgFIgBgFIAAgFIgCgEIgBgEIgBgEIgCgEIgBgEIgBgEIgCgFIgCgFIgBgEIAAgEIgBgEIgCgGIgCgFIgBgFIgBgGIgBgEIgBgFIgCgFIgBgGIgBgEIgBgDIgBgFIgBgGIgBgFIAAgGIgBgGIgBgEIAAgFIgBgFIgBgFQgHgUgBgXIAAgqIAAguIAAgqQAAgTADgSIACgMIAAgFIABgJIABgKIABgNIABgFIABgGIABgDIgBhNIAAhRIAAhLIAAg8QAAgbAFgYIAAgYIAAgdIAAgaQAAgOABgNIAEgYIAAgFIAAgJIABgJIABgJIABgJIACgLIABgEIAAgDIAAgEIAAgFIAAgGIABgGIABgFIAAgGIABgFIABgFIABgGIAAhGIAAhKIAAhCIAAg8IAAg1IgBgEIgBgGIgBgGIgBgGIgBgGIAAgGIAAgGQgEgOgBgPIgBgeIAAgfIAAgcIADgaIADgOIAAgLIAAgLIAAgKIABgLIABgMIACgMIABgFIAAgRIAAgRIAAgQIAAgPIABgSIADgOIABgEIAAgRIAAgRIAAgOIAAgQIABgQIAEgRIAAgJIAAgLIAAgJIABgJIABgIIABgHIABgFIACgGIAAgFIAAgGIABgEIABgGIABgFIABgFIABgFIACgEIABgGIABgEIABgGIACgEIABgFQAIgiAWgaQAUgWAggLQAegJAdAJIABAAIANAAIAxABIA2AAIA9gBQAigBAiAEIATADIAIAAIAJACIAJABIAJACIAIAAIAJABIAIABIAIACIADAAIBtAAIBtAAICXAAIBygBQAgAAAfAHIAVAAIAUAAIAIAAIAIAAIAIAAIAKABIAKACIAKACIATAAIATAAIALAAIALAAIAJAAIAIABIALABIAKABIAJACIAUAAIAUAAIAKAAIAKAAIAHAAIAIAAIALACIAKACIALABIA0AAIA0AAIA1AAIA3AAIA6AAIALAAQAOgEAPgBIAegBIAUABIAUAAIATAAIAeAAIAKAAQA5gIA6ABQBBACBBAAICxAAQBSAABSgCQAvgBAuAIIAGAAIAKAAIAKABIAKACIAKACIABAAIALABIAKABIALACIAHABIAIAAIAJAAIAGAAIAHAAIAJABIAJABIAJACIAIABIAFABIAKABIAJABIAKACIAIAAIAIAAIAIAAIAHABIALABIAKABIALACIAFAAIAIAAIAHAAIAIAAIAHAAIAIAAIAIABIAIABIAJABIAJABIAHACIAKAAIAKAAIAIAAIAIAAIAHABIAHAAIAHABIAHABIAGABIACABIA1AAIArAAIArAAIAsAAIA3AAIAWAAIAAgBIAGgBIALgBIALgBIAKgBIAKAAIAJAAIAIAAIAIAAIAJAAIAIgCIAJgBIAHgBIAHgBIAHgBIAIAAIAKAAIAHgBIAJgBIAJgBIAIgBIAJgBIAKAAIAGgBIAKgCIAIgBIAJAAIAIAAIALAAQATgEASgBIAegBIAdAAIAeAAIAcAAQAQAAAPADIAUADIBZAAIBZAAIBtAAIBygBQAaAAAaAFIAKAAIAKAAIAGAAIAGAAIAJABIAJABIAJABIAKACIAHABIALABIAKACIAKACIAgAAIAfAAIAgAAIAgAAIAfAAIAbABIADgBIAJgDIAJgBIAKgBIAJgBIAIAAIAIAAIAHAAIAGAAIAGgBIAKgBIAIgBIAIgBIAIgBIABAAIAGgBIAKgCIAIgBIAIAAIAIAAIABAAIAGgCIAIgBIAIgCIAIgCIAJgCIAKgBIAJgBIAHAAIAGAAIAGAAIAAAAIAGgBIALgDIAKgBIALAAIAGAAIAHAAIAHAAIAIAAIABAAIALgCIAKgBIALgCIAhAAIAcAAIAeAAIAdAAIAbAAQATgBATACIAYAEIAfAAIAeAAIAeAAIAdAAIAfAAIAVAAIAHgCIAHAAIAIgDIAIgCIAGgBIAGgBIAGgCIAHgBIAIgBIAFgDIAHgBIAGgBIAHgCIAHgCIAHgBIAHgCIADgBIAJgBIAJgCIAIAAIAJgBIAjAAIAcAAIAdAAIAcAAIAbAAQATgBATACIAYADIAKAAIAKAAIAJAAIAJAAIAIAAIAJAAIABAAIAJgCIAJgBQANgKAQgGQAMgFANAAQANgCAOADQANACAMAGQAMAFAKAIQANAMAJAOIAAABQAKAEAJAGQAZAQAKAbQAPAkgEAnQgBAUgEAUQgBATAAAVIAAAiIAAAeIAAAeIAAAXQAEAQABAQQABASgBARIAAAhIAAAeQAAAOgBAOIgEAUIAAAKIAAAOIgBALIgBALIgBAHIgBAFIgBAEIAAAJIgBAJIgBAJIgCAKIgBAEIAAAEIAAAKIgBAJIgBAJIgCAJIgBAEIAAAIIgBAMIAAAIIgBAJIgCAIIgBAJIAAARIgBAPIgBANIgCAPIgBAHIAAAnIAAAeIAAAcIAAAXIAAAXIAAAEIABAHIACAJIABAJIABAJIAAAJQAHAfgBAgIgBA1IAAAwIAAAvQAAAXgDAYIgCAMIAAAjIAAAeIAAAdIAAAYIgBAZIAAAFQAEAMABAMQABALAAALIAAAQIAAARIAAAOIAAAEIADAPIACANIAAAOIAAAMIAAAJIAAAFQAFAVAAAWIAAAiIAAAiIAAAdIAAAiQAHAfgBAfIgBA4IAAA7IAAA5QABAbgCAbQAPAEAMAIQAcATALAeQAIATgBAVIACAMIACAMIABAMIAAAMIAAAQIAAARIACAIIABAJIACAJIAAAJIAAAJIAAAJIAAAKIADAIIACAFIABAFIABAFIABAGIABAFIABANIABAMIAAADIABAEIABADIAAAEIABAEIAAADIABAFIAAAEIABAFIAAADIABAEIABAEIABAEIAAAEIACAEIABAFIABADIAAAEIABADIABADIABAEIABADIABAEIABAEIABAFIABADIABAEIABAFIABAEIABAEIAAAEIAAAFIACADIABAEIAAADIABADIABAEIAAAEIABAEIAAAEIAAAEIABAEIABAEIABAFIABAEIABAFIAAAFIAAAEIAAAEIAAAEIAAADIAFAaQABAPAAAQIAAApIAAAeQAAARgBAQQgBALgEAKIAAAKIAAAKIAAAJIgBAKIgCAJIgCAJIAAADIAAADIAAADIAAACIgBADIAAAEIAAADIgBADIAAAEIgBACIAAADIgBAEIgBAFIgBAEIgBAEIgBAGIAAAEIgCAFIgBAEIgBAFIgBAEIgBAFIgBADIgBAFIgBAEIgCAFIAAADIgBAFIgBADIgBAEIgCAEIAAADIgBAEIgBADIgBAEIgBAEIgCADIgBAEIgCAEIgCAEIAAACIgBADIgBAFIgCADIgBAFIgBAEIgBAFIgBADIgCAFIgCAEIgCAEIAAADIgBACIAAADIgBAEIgBADIgBADIAAAFIgBAEIgBAFIgBADIgBAFIgCADIgBAFIAAABIgCADIgBAFIgBACIgBADIAAAEIgBADIgBAFIgBAEIgCAFIAAADIgBAEIgBAFIgBAEIgCAFIAAADIgBAEIgBADIgBAFIgBADIgCAEIAAADIgBADIAAADIgBADIgCAMIgDAMIgEAOIgDAMIgEAQIgFAQIAAAEIgBAEIAAAEIgBAEIgBAEIAAADIgBAEIgBAEIAAAFIAAAEIgBAFIgBAEIAAAFIgBADIgBAEIgBAEIAAAFIgBAEIgBAFIAAAEIgBACIgBADIAAALIAAAJIAAAIIAAAJIgBAJIgCANIgCAKIAAAjIAAAjIAAApIAAAiIAAAdIABACIABAFIAAAFIABAEIABAFQAEAPACAQQABARAAAQIAAAmIAAAiIAAAiIAAAEIABAIIACALIABALIABAJIAAAQIAAATIAAAOQAHAngBAoQAAAagEAZQgDATgJAPQAJASACAVQACAfgQAbQgNAWgXANQgXAPgbAAIgVAAIgJACIgJABIgJABIgIAAIgJAAIgCAAQgtAJgugBQgwgCgwAAIhrAAIh7AAIhkAAIgWAAIgBABIgKABIgJABIgKACIgCAAIgIACIgJACIgJABIgJAAIgGABIgIABIgHABIgFACIgJADIgJABIgJABIgJAAIgGACIgJABIgJABIgIABIgIABIgGAAQgMADgMABQgNABgMgBIgSAAIgSAAIgSAAIgSAAIgTAAIgVAAIgLgBIgLgBIgLgCIgLAAIgWAAIgUAAIgGAAIgHgBIgLgBIgLgCIgLgCIhDAAIg3AAIg4AAIhEAAIhBAAIgWAAIgUADIgVADIgVAAIgVAAIgUAAIgUAAIgKAAIgKACIgKABIgKABIgLAAIgKABIgLgBIgLAAIgKAAIhPAAIhPAAIhLAAIhLABIgKAAQghAAgigDgEAa3AgiIABAAIgBAAIgBAAIABAAgEgjKAgeIABAAIgBgBgEgHzAgTIABAAIgBgBIgBAAIABABgAb/dmIABAAIgBgBIgBAAIABABgARUdmIABAAIABgBIgBAAIgBABgEghRAdmIABAAIgBgBIAAAAgAb7dlIABAAIgBAAIgBAAIABAAgEghUAdlIABAAIgBAAIgBAAIABAAgAGH8YIABAAIABgBIgBAAIgBABgAa/8yIABAAIABAAIgBAAgADx/QIABAAIABgBIgBAAIgBABgAja/fIABAAIABAAIgBAAIgBAAIgBAAIABAAgAjd/fIABAAIgBgBIgBAAIABABg");
	this.shape.setTransform(0.0063,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-292.4,-209.1,584.8,418.2);


(lib.skylong = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.frame_00_delay015s();
	this.instance.setTransform(-248,-141);

	this.instance_1 = new lib.frame_01_delay015s();
	this.instance_1.setTransform(-248,-141);

	this.instance_2 = new lib.frame_02_delay015s();
	this.instance_2.setTransform(-248,-141);

	this.instance_3 = new lib.frame_03_delay015s();
	this.instance_3.setTransform(-248,-141);

	this.instance_4 = new lib.frame_04_delay015s();
	this.instance_4.setTransform(-248,-141);

	this.instance_5 = new lib.frame_05_delay015s();
	this.instance_5.setTransform(-248,-141);

	this.instance_6 = new lib.frame_06_delay015s();
	this.instance_6.setTransform(-248,-141);

	this.instance_7 = new lib.frame_07_delay015s();
	this.instance_7.setTransform(-248,-141);

	this.instance_8 = new lib.frame_08_delay015s();
	this.instance_8.setTransform(-248,-141);

	this.instance_9 = new lib.frame_09_delay015s();
	this.instance_9.setTransform(-248,-141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance}]},7).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_1}]},7).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_3}]},7).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_4}]},7).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},7).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_6}]},7).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_7}]},7).to({state:[{t:this.instance_8}]},2).to({state:[{t:this.instance_9}]},9).to({state:[{t:this.instance_7}]},12).to({state:[{t:this.instance_6}]},9).to({state:[{t:this.instance_5}]},9).to({state:[{t:this.instance_4}]},9).to({state:[{t:this.instance_3}]},9).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_1}]},9).to({state:[{t:this.instance}]},9).to({state:[{t:this.instance}]},9).wait(7));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({_off:true},2).wait(147).to({_off:false},0).wait(16));

	// Layer_2
	this.instance_10 = new lib.frame_00_delay015s();
	this.instance_10.setTransform(-248,-141);

	this.instance_11 = new lib.frame_01_delay015s();
	this.instance_11.setTransform(-248,-141);

	this.instance_12 = new lib.frame_02_delay015s();
	this.instance_12.setTransform(-248,-141);

	this.instance_13 = new lib.frame_03_delay015s();
	this.instance_13.setTransform(-248,-141);

	this.instance_14 = new lib.frame_04_delay015s();
	this.instance_14.setTransform(-248,-141);

	this.instance_15 = new lib.frame_05_delay015s();
	this.instance_15.setTransform(-248,-141);

	this.instance_16 = new lib.frame_06_delay015s();
	this.instance_16.setTransform(-248,-141);

	this.instance_17 = new lib.frame_07_delay015s();
	this.instance_17.setTransform(-248,-141);

	this.instance_18 = new lib.frame_08_delay015s();
	this.instance_18.setTransform(-248,-141);

	this.instance_19 = new lib.frame_09_delay015s();
	this.instance_19.setTransform(-248,-141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10}]}).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},8).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},8).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},8).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},8).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_14}]},8).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},8).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},8).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_17}]},8).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},9).to({state:[{t:this.instance_17}]},12).to({state:[{t:this.instance_16}]},9).to({state:[{t:this.instance_15}]},9).to({state:[{t:this.instance_14}]},9).to({state:[{t:this.instance_13}]},9).to({state:[{t:this.instance_12}]},9).to({state:[{t:this.instance_11}]},9).to({state:[{t:this.instance_10}]},9).to({state:[{t:this.instance_10}]},9).wait(8));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(9).to({_off:true},1).wait(147).to({_off:false},0).wait(17));

	// Layer_1
	this.instance_20 = new lib.frame_00_delay015s();
	this.instance_20.setTransform(-248,-141);

	this.instance_21 = new lib.frame_01_delay015s();
	this.instance_21.setTransform(-248,-141);

	this.instance_22 = new lib.frame_02_delay015s();
	this.instance_22.setTransform(-248,-141);

	this.instance_23 = new lib.frame_03_delay015s();
	this.instance_23.setTransform(-248,-141);

	this.instance_24 = new lib.frame_04_delay015s();
	this.instance_24.setTransform(-248,-141);

	this.instance_25 = new lib.frame_05_delay015s();
	this.instance_25.setTransform(-248,-141);

	this.instance_26 = new lib.frame_06_delay015s();
	this.instance_26.setTransform(-248,-141);

	this.instance_27 = new lib.frame_07_delay015s();
	this.instance_27.setTransform(-248,-141);

	this.instance_28 = new lib.frame_08_delay015s();
	this.instance_28.setTransform(-248,-141);

	this.instance_29 = new lib.frame_09_delay015s();
	this.instance_29.setTransform(-248,-141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_20}]}).to({state:[{t:this.instance_21}]},9).to({state:[{t:this.instance_22}]},9).to({state:[{t:this.instance_23}]},9).to({state:[{t:this.instance_24}]},9).to({state:[{t:this.instance_25}]},9).to({state:[{t:this.instance_26}]},9).to({state:[{t:this.instance_27}]},9).to({state:[{t:this.instance_28}]},9).to({state:[{t:this.instance_29}]},9).to({state:[{t:this.instance_29}]},9).to({state:[{t:this.instance_28}]},3).to({state:[{t:this.instance_27}]},9).to({state:[{t:this.instance_26}]},9).to({state:[{t:this.instance_25}]},9).to({state:[{t:this.instance_24}]},9).to({state:[{t:this.instance_23}]},9).to({state:[{t:this.instance_22}]},9).to({state:[{t:this.instance_21}]},9).to({state:[{t:this.instance_20}]},9).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-248,-141,500,280);


(lib.Symbol51 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#323232").ss(4,1,1).p("AxRqmQBsn8J9hbQJ7hcGuISQGuIRgfJDQgfJElKG6");
	this.shape.setTransform(110.6043,129.1509);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,225.2,262.3);


(lib.psirightthrobber = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").p("ACWCWIkrAAIAAkrIErAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7D7D7D").s().p("AiVCWIAAkrIErAAIAAErg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.psirightthrobber, new cjs.Rectangle(-16,-16,32,32), null);


(lib.psirightfiller = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").p("AB4CWIjvAAIAAkrIDvAAg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7D7D7D").s().p("Ah3CWIAAkrIDvAAIAAErg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.psirightfiller, new cjs.Rectangle(-12.9,-16,25.9,32), null);


(lib.psiright = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").p("AEiHvIpDAAIAAvdIJDAAg");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7D7D7D").s().p("AkhHvIAAvdIJDAAIAAPdg");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.psiright, new cjs.Rectangle(-30,-50.5,60,101.1), null);


(lib.psileft = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").p("AEiKVIpDAAIAA0pIJDAAg");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7D7D7D").s().p("AkhKVIAA0pIJDAAIAAUpg");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.psileft, new cjs.Rectangle(-30,-67.1,60,134.3), null);


(lib.newsymbol = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#7D7D7D").p("ApiAAITFAA");
	this.shape.setTransform(0.475,18.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#7D7D7D").p("AEvC9Ipdl5");
	this.shape_1.setTransform(30.7,-0.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#7D7D7D").p("Ak0C9IJpl5");
	this.shape_2.setTransform(-30.425,-0.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7D7D7D").s().p("ApeC9IgCgDIJkl2IJdF5g");
	this.shape_3.setTransform(0.05,-0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.newsymbol, new cjs.Rectangle(-62.3,-19.9,124.9,39.8), null);


(lib.smallbox_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.smallbox();
	this.instance.setTransform(-396,-247);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-396,-247,800,507);


(lib.loadingguibox = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.loadinguibox();
	this.instance.setTransform(0,0,0.3438,0.3437);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,275,169.5);


(lib.loadingguibar = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.loadinguibar();
	this.instance.setTransform(0,0,0.3438,0.3438);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,275,171.9);


(lib.nocursor = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_1 = function() {
		canvas.style.cursor = "none";
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,204,0.549)").s().p("AjHAqQABgQAIgEQAFgDAGADQAGADACAGQAEAHgBAQQgODVAjDWQAFAeABAOQACAZgGASIgUADQgvkEANkNgArbIFQABgMAJgcQALgmABgyQABgegDg7QgUmbAAmxQAAgYANgCQAJgBAFAKQAEAJAAALQgDGqAYGgIAchDQARgkASgaQAuhEA/gWQAagJAQAGQAdALAKA2IA5EOQAJArgEAWIgXADQghixgwjBQg0AEgmAjQgPANgQAYQggAugVBDQgOAqgSBQIgdCAIgTACQgLgNACgXgAHKHJQg0gBghgKQgtgNgVgfQgGgJAAgLQABgLAJgCQAGgBAGAFIAKAMQAUAZAnAKQAbAGAvAAQA6AAAggCQAygDAngJIAigIQATgFAPABQAPAAADAHQADAHgGAHQgGAGgJADQg3AThHAGQghADgsAAIg0gBgAEXBnIAAgCIABgCIAEgFIADgBQAFgCADAAIAEAAIACACIADADIACACIAAADQAAAGgCAGIgSADQgFgHgCgGgAJhBJIAAgCIABgCIAEgFIADgBQAFgCADAAIAEAAIACACIADADIACACIAAADQAAAGgCAGIgSADQgFgHgCgGgAjZirQgtgBgVgKQgOgFgHgKQgPgUAQgtQAKgdAIgQQANgXARgNQAHAFACAKQADAJgDAJQgCAHgFAJIgJAPQgLASgFAVQgDAQAEAHQAHAKAXABIAYABQAMAAAFgCQALgEALgSQAagoAAgaQAAgSgJgIQgGgGgQgDQgPgDgGgFQgFARgJACQgJACgFgKQgEgGABgLQAAgNAGgHQAJgJAPADIAZAIIAUAEQANACAGAFQATAMAAAjQABAggMAeQgMAegWAXQgMANgLADQgGACgIAAIgHAAg");
	this.shape.setTransform(-226.3776,-81.2844);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-299.6,-138.3,146.50000000000003,114.10000000000001);


(lib.skaianportalanimation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {s1:4,p1:36,p2:51,p3:138,p4:153,f1:178};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_34 = function() {
		this.stop();
	}
	this.frame_50 = function() {
		this.gotoAndPlay(0);
	}
	this.frame_83 = function() {
		this.stop();
	}
	this.frame_152 = function() {
		this.stop();
	}
	this.frame_177 = function() {
		this.gotoAndPlay(0)
	}
	this.frame_225 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(34).call(this.frame_34).wait(16).call(this.frame_50).wait(33).call(this.frame_83).wait(69).call(this.frame_152).wait(25).call(this.frame_177).wait(48).call(this.frame_225).wait(15));

	// Layer_3
	this.instance = new lib.Symbol51("synched",0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#323232").ss(4,1,1).p("AxRqmQBsn8J9hbQJ7hcGuISQGuIRgfJDQgfJElKG6");
	this.shape.setTransform(110.6043,129.1509);
	this.shape._off = true;

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#323232").ss(4,1,1).p("AyoncQArrdKFjKQKDjKJFO4QJEO2iEHIQiDHGltD5");
	this.shape_1.setTransform(119.2652,109.0491);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#323232").ss(4,1,1).p("A0DkTQgWu9KMk5QKNk5LZVeQLbVdjoFKQjoFKmQA3");
	this.shape_2.setTransform(128.3561,88.9085);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#323232").ss(4,1,1).p("Az2kcQgUuzKMk1QKLk0LMVQQLLVOjkFPQjkFPl9A6");
	this.shape_3.setTransform(127.1001,89.823);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#323232").ss(4,1,1).p("AzpkmQgSupKNkwQKKkwK8VBQK9VAjgFVQjhFVlpA8");
	this.shape_4.setTransform(125.8408,90.7653);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#323232").ss(4,1,1).p("AzdkvQgOugKMkrQKKkrKtUzQKtUxjcFaQjdFalVA/");
	this.shape_5.setTransform(124.5833,91.6743);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#323232").ss(4,1,1).p("AzQk4QgMuXKLkmQKKknKeUkQKeUjjZFgQjYFflCBC");
	this.shape_6.setTransform(123.3186,92.6074);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#323232").ss(4,1,1).p("AzElBQgJuOKLkhQKKkiKOUWQKPUUjVFlQjUFlkvBE");
	this.shape_7.setTransform(122.0573,93.5087);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#323232").ss(4,1,1).p("Ay3lLQgGuEKLkcQKJkeJ/UIQKAUGjRFqQjRFqkbBH");
	this.shape_8.setTransform(120.7958,94.4591);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#323232").ss(4,1,1).p("AyqlUQgEt6KLkYQKJkZJwT5QJwT3jNFwQjNFwkHBJ");
	this.shape_9.setTransform(119.5337,95.3668);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#323232").ss(4,1,1).p("AyeldQgBtxKLkTQKIkUJhTqQJhTpjJF2QjKF1jzBL");
	this.shape_10.setTransform(118.2688,96.2679);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#323232").ss(4,1,1).p("AyRlmQACtoKKkOQKIkQJRTcQJSTajFF7QjGF7jfBO");
	this.shape_11.setTransform(117.0047,97.2173);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#323232").ss(4,1,1).p("AyElvQAEteKKkKQKIkLJCTNQJCTMjBGBQjCF/jLBR");
	this.shape_12.setTransform(115.7406,98.1181);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#323232").ss(4,1,1).p("Ax4l5QAItUKJkGQKHkGIzS/QI0S+i+GFQi+GGi4BT");
	this.shape_13.setTransform(114.4705,99.0512);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#323232").ss(4,1,1).p("AxrmCQAKtLKJkBQKHkBIkSwQIkSvi6GMQi6GKilBW");
	this.shape_14.setTransform(113.2067,99.9584);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#323232").ss(4,1,1).p("AxemLQANtCKIj8QKHj9IVSiQIUShi2GQQi2GQiRBZ");
	this.shape_15.setTransform(111.943,100.9009);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#323232").ss(4,1,1).p("AxSmUQAQs4KIj4QKHj4IFSUQIFSSiyGWQiyGVh9Bb");
	this.shape_16.setTransform(110.6794,101.8086);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#323232").ss(4,1,1).p("AxFmdQASsvKIjzQKGjzH2SFQH2SDiuGcQiuGbhqBd");
	this.shape_17.setTransform(109.4144,102.7154);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#323232").ss(4,1,1).p("Aw5mnQAWslKHjuQKGjvHnR3QHmR1iqGgQiqGhhWBg");
	this.shape_18.setTransform(108.1511,103.6577);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#323232").ss(4,1,1).p("AwsmwQAYscKIjpQKFjqHYRoQHXRmimGnQinGlhCBj");
	this.shape_19.setTransform(106.888,104.5641);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#323232").ss(4,1,1).p("Awfm5QAbsSKGjlQKGjlHIRZQHIRYijGsQiiGrgvBl");
	this.shape_20.setTransform(105.6194,105.4962);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#323232").ss(4,1,1).p("AwTnCQAesJKGjgQKFjgG5RLQG5RJifGxQifGxgbBn");
	this.shape_21.setTransform(104.3568,106.396);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#323232").ss(4,1,1).p("AwGnLQAhsAKGjbQKEjcGqQ8QGqQ7ibG3QibG2gIBq");
	this.shape_22.setTransform(103.0943,107.3442);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#323232").ss(4,1,1).p("Av5nVQAjr2KGjWQKEjXGaQtQGbQtiXG8QiYG7ANBt");
	this.shape_23.setTransform(101.8304,108.2507);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#323232").ss(4,1,1).p("AvtndQAmrtKGjSQKEjSGLQfQGLQeiTHBQiUHBAgBv");
	this.shape_24.setTransform(100.5685,109.1493);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#323232").ss(4,1,1).p("AvgnnQAorjKGjNQKDjOF8QRQF8QPiPHHQiQHGA0By");
	this.shape_25.setTransform(99.3068,110.0978);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#323232").ss(4,1,1).p("AvTnwQArraKFjIQKDjJFtQCQFsQBiLHMQiMHMBIB0");
	this.shape_26.setTransform(98.0437,110.9968);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#323232").ss(4,1,1).p("AvHn5QAurRKFjDQKDjFFdP0QFePyiIHSQiIHRBbB3");
	this.shape_27.setTransform(96.7798,111.9268);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#323232").ss(4,1,1).p("Au6oCQAxrHKEi/QKDjAFOPlQFOPkiEHXQiEHXBuB5");
	this.shape_28.setTransform(95.5195,112.8322);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#323232").ss(4,1,1).p("AuuoMQA0q9KEi6QKCi8E/PXQE/PViAHdQiBHcCDB8");
	this.shape_29.setTransform(94.2577,113.7726);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#323232").ss(4,1,1).p("AuhoVQA3q0KDi1QKCi3EwPIQEvPHh8HiQh9HiCXB+");
	this.shape_30.setTransform(92.9944,114.678);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#323232").ss(4,1,1).p("Av2pdQBRpYKAiJQJ/iJFvLtQFuLshNITQhOIThaEc");
	this.shape_31.setTransform(101.5264,121.9158);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#323232").ss(4,1,1).p("AwDpMQBaptICiRQIAiRHSKoQHRKnAIImQAIImjXGl");
	this.shape_32.setTransform(102.8394,120.25);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#323232").ss(4,1,1).p("Au+nzQBIrdGHjGQGGjIH0M+QH1M9AwIJQAvIJhkGP");
	this.shape_33.setTransform(95.8828,111.2996);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#323232").ss(4,1,1).p("AvIoCQBLrKGbi+QGai+HvMlQHvMjApIOQApIOh4GT");
	this.shape_34.setTransform(96.9237,112.785);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#323232").ss(4,1,1).p("AvToRQBOq3Gvi1QGvi1HpMMQHqMLAiISQAiITiLGW");
	this.shape_35.setTransform(98.0351,114.2946);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#323232").ss(4,1,1).p("AvfogQBRqkHEisQHEisHjLyQHjLzAcIWQAcIYieGa");
	this.shape_36.setTransform(99.1858,115.7785);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#323232").ss(4,1,1).p("AvrovQBUqSHZijQHXijHeLaQHdLZAVIcQAWIdixGd");
	this.shape_37.setTransform(100.3664,117.2615);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#323232").ss(4,1,1).p("Av3o+QBXp/HtiaQHsiaHYLAQHXLBAPIgQAPIijEGh");
	this.shape_38.setTransform(101.5783,118.7606);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#323232").ss(4,1,1).p("AwQpbQBdpaIWiIQIViIHMKOQHLKOACIrQABIrjqGp");
	this.shape_39.setTransform(104.1005,121.7301);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#323232").ss(4,1,1).p("AwdpqQBhpHIqh/QIpiAHGJ2QHGJ1gFIwQgFIwj9Gs");
	this.shape_40.setTransform(105.3777,123.2263);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#323232").ss(4,1,1).p("Awqp5QBko1I/h2QI+h2G/JcQHAJdgMI0QgLI1kQGw");
	this.shape_41.setTransform(106.6644,124.7039);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#323232").ss(4,1,1).p("Aw3qIQBnoiJThtQJThtG5JDQG6JEgSI5QgSI6kjGz");
	this.shape_42.setTransform(107.9603,126.1799);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#323232").ss(4,1,1).p("AxEqXQBqoPJohkQJnhkG0IqQGzIqgYI/QgZI/k2G2");
	this.shape_43.setTransform(109.2902,127.679);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#323232").ss(4,1,1).p("AygmVQE1wEKGh0QKFh1FhNUQFgNSA7LqQA7Lqo/Ak");
	this.shape_44.setTransform(118.529,101.8687);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#323232").ss(4,1,1).p("Az3i5QH94LKQiPQKQiOESSWQETSVCVOQQCWOQs0ly");
	this.shape_45.setTransform(127.1516,79.8806);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#323232").ss(4,1,1).p("AzZi/QHr3rKLiRQKKiSEMSGQELSGCHOGQCHOFrwlh");
	this.shape_46.setTransform(124.6018,80.8116);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#323232").ss(4,1,1).p("Ay8jEQHa3LKGiVQKGiVEER3QEER2B4N8QB5N6qslR");
	this.shape_47.setTransform(122.0024,81.7118);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#323232").ss(4,1,1).p("AyejKQHI2qKBiYQKBiZD9RoQD8RnBqNwQBqNxpolB");
	this.shape_48.setTransform(119.4526,82.6377);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#323232").ss(4,1,1).p("AyBjPQG32KJ9icQJ7icD2RZQD1RXBcNmQBbNmokkw");
	this.shape_49.setTransform(116.8791,83.5384);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#323232").ss(4,1,1).p("AxjjWQGl1pJ3ifQJ3igDuRKQDuRIBNNcQBONbnhkg");
	this.shape_50.setTransform(114.3127,84.4772);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#323232").ss(4,1,1).p("AxGjcQGT1JJziiQJyijDnQ6QDmQ5A/NRQA/NRmdkP");
	this.shape_51.setTransform(111.7608,85.4135);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#323232").ss(4,1,1).p("AwojiQGC0oJuimQJsinDgQrQDfQqAwNHQAxNGlZj/");
	this.shape_52.setTransform(109.1739,86.3509);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#323232").ss(4,1,1).p("AwLjoQFw0IJpipQJoiqDYQcQDYQaAiM8QAiM8kVjv");
	this.shape_53.setTransform(106.6356,87.3165);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#323232").ss(4,1,1).p("AvujuQFfzoJkisQJjitDRQMQDQQLAUMxQAUMyjSjf");
	this.shape_54.setTransform(104.0828,88.2673);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#323232").ss(4,1,1).p("AvRj0QFNzHJgiwQJeixDJP9QDJP8AFMnQAFMmiNjN");
	this.shape_55.setTransform(101.5585,89.2358);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#323232").ss(4,1,1).p("Au1j6QE8ynJai0QJaizDCPtQDBPtgJMcQgJMchKi9");
	this.shape_56.setTransform(99.12,90.1874);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#323232").ss(4,1,1).p("AuZkAQEqyHJVi3QJVi3C6PeQC7PdgYMSQgYMSgGit");
	this.shape_57.setTransform(96.7868,91.1844);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#323232").ss(4,1,1).p("AuHkHQEYxmJRi7QJPi6CzPPQCzPOgmMHQgmMHA+ic");
	this.shape_58.setTransform(95.4,92.1854);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#323232").ss(4,1,1).p("AuGkNQEGxHJMi9QJMi+CrPAQCsO+g1L9Qg1L8CCiM");
	this.shape_59.setTransform(95.6,93.1895);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#323232").ss(4,1,1).p("AuEkVQD1wlJHjBQJFjCClOxQCkOvhDLyQhDLyDGh7");
	this.shape_60.setTransform(95.85,94.224);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#323232").ss(4,1,1).p("AuDkcQDjwFJCjEQJBjFCeOhQCdOghSLoQhRLnEJhr");
	this.shape_61.setTransform(96.05,95.2564);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#323232").ss(4,1,1).p("AuBkjQDRvlI+jHQI8jJCWOSQCVORhfLdQhhLdFNhb");
	this.shape_62.setTransform(96.275,96.3191);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#323232").ss(4,1,1).p("AuAkqQDAvFI5jLQI3jMCOODQCPOChvLSQhuLSGRhK");
	this.shape_63.setTransform(96.525,97.4075);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#323232").ss(4,1,1).p("At+kxQCuulI0jOQIyjPCHNzQCHNzh8LIQh9LHHUg6");
	this.shape_64.setTransform(96.725,98.4789);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#323232").ss(4,1,1).p("At9k5QCduEIvjSQItjTCANlQCANjiMK9QiLK9IZgp");
	this.shape_65.setTransform(96.975,99.6101);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#323232").ss(4,1,1).p("At7lBQCLtjIqjWQIpjWB4NVQB4NUiZKzQiaKyJcgZ");
	this.shape_66.setTransform(97.175,100.7477);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#323232").ss(4,1,1).p("At6lJQB6tEIljYQIkjZBxNFQBxNEioKpQioKoKggJ");
	this.shape_67.setTransform(97.4,101.9475);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#323232").ss(4,1,1).p("At4lSQBosjIgjcQIfjcBqM2QBpM1i2KeQi3KdLkAI");
	this.shape_68.setTransform(97.625,103.1431);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#323232").ss(4,1,1).p("At3lbQBXsCIcjgQIajgBiMnQBiMmjFKTQjFKTMoAY");
	this.shape_69.setTransform(97.85,104.3666);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#323232").ss(4,1,1).p("At1lkQBFriIWjiQIVjkBbMYQBbMWjTKJQjUKINsAp");
	this.shape_70.setTransform(98.075,105.5854);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#323232").ss(4,1,1).p("At0lsQA0rCISjmQIPjnBUMJQBUMHjiJ+QjhJ+OvA5");
	this.shape_71.setTransform(98.3,106.762);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#323232").ss(4,1,1).p("Atyl1QAiqhINjqQILjqBML5QBML4jwJ0QjvJzPyBK");
	this.shape_72.setTransform(98.525,107.9734);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#323232").ss(4,1,1).p("Atxl9QARqBIHjtQIHjuBFLqQBFLqj/JoQj+JoQ3Ba");
	this.shape_73.setTransform(98.75,109.1574);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#323232").ss(4,1,1).p("AtvmGQgBpgIDjxQIBjwA+LaQA9LakNJeQkMJeR6Bq");
	this.shape_74.setTransform(98.9748,110.3574);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#323232").ss(4,1,1).p("AtwmLQABpeIFjuQIEjuBELWQBELXkJJdQkIJeRgBw");
	this.shape_75.setTransform(98.85,110.6886);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#323232").ss(4,1,1).p("AtxmQQADpdIHjrQIGjsBLLUQBKLTkEJdQkEJdRGB2");
	this.shape_76.setTransform(98.75,111.0477);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#323232").ss(4,1,1).p("AtxmVQAEpbIKjpQIIjpBRLQQBRLQkAJcQkAJcQrB9");
	this.shape_77.setTransform(98.625,111.3767);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#323232").ss(4,1,1).p("AtymaQAGpaIMjmQIKjmBYLMQBYLMj8JcQj7JcQQCD");
	this.shape_78.setTransform(98.5,111.729);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#323232").ss(4,1,1).p("AtzmgQAJpXIOjjQIMjkBeLIQBfLJj4JbQj3JcP2CI");
	this.shape_79.setTransform(98.375,112.0614);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#323232").ss(4,1,1).p("At0mlQALpWIQjgQIOjhBlLFQBlLFjzJaQjzJcPcCO");
	this.shape_80.setTransform(98.275,112.4149);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#323232").ss(4,1,1).p("At0mqQAMpUISjeQIRjeBrLCQBsLBjvJaQjvJbPBCU");
	this.shape_81.setTransform(98.175,112.7432);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#323232").ss(4,1,1).p("At1mvQAOpSIUjbQIUjcBxK+QBzK9jsJaQjqJbOnCa");
	this.shape_82.setTransform(98.05,113.0753);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#323232").ss(4,1,1).p("At2m0QAQpRIWjYQIWjZB5K6QB4K6jnJZQjmJaONCh");
	this.shape_83.setTransform(97.95,113.4282);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#323232").ss(4,1,1).p("At3m6QASpOIZjWQIXjWCAK2QB/K3jjJZQjjJZN0Cm");
	this.shape_84.setTransform(97.825,113.7546);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#323232").ss(4,1,1).p("At4m/QAUpNIbjTQIajUCFKzQCGKzjeJZQjfJZNaCs");
	this.shape_85.setTransform(97.7,114.1114);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#323232").ss(4,1,1).p("At4nEQAWpLIdjQQIbjRCNKvQCMKwjaJYQjaJYM+Cy");
	this.shape_86.setTransform(97.575,114.4388);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("#323232").ss(4,1,1).p("At5nJQAYpJIfjOQIejOCTKsQCTKrjWJYQjWJYMkC4");
	this.shape_87.setTransform(97.475,114.791);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#323232").ss(4,1,1).p("At6nOQAapIIijLQIgjLCZKoQCaKojSJXQjSJXMKC/");
	this.shape_88.setTransform(97.35,115.1314);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f().s("#323232").ss(4,1,1).p("At7nTQAcpGIkjIQIijJCgKkQCgKljNJXQjOJXLwDE");
	this.shape_89.setTransform(97.225,115.448);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#323232").ss(4,1,1).p("At8nYQAepEImjGQIkjGCnKhQCnKhjJJWQjKJWLWDL");
	this.shape_90.setTransform(97.125,115.7995);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#323232").ss(4,1,1).p("At9neQAgpCIojDQInjDCuKdQCtKdjFJWQjFJWK7DQ");
	this.shape_91.setTransform(97,116.1407);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#323232").ss(4,1,1).p("At9njQAipAIqjBQIpjBCzKaQC0KajAJVQjBJWKgDW");
	this.shape_92.setTransform(96.875,116.4818);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#323232").ss(4,1,1).p("At+noQAko/Isi+QIri+C6KWQC7KXi8JUQi9JVKGDd");
	this.shape_93.setTransform(96.75,116.8065);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#323232").ss(4,1,1).p("At/ntQAmo9Iui7QIti8DCKTQDAKSi4JUQi4JVJsDj");
	this.shape_94.setTransform(96.65,117.1722);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("#323232").ss(4,1,1).p("At/nyQAno7Ixi5QIvi5DIKQQDHKOizJUQi1JUJRDp");
	this.shape_95.setTransform(96.55,117.489);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#323232").ss(4,1,1).p("AuAn4QApo5Izi2QIxi2DPKMQDOKLiwJTQiwJUI3Du");
	this.shape_96.setTransform(96.425,117.813);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#323232").ss(4,1,1).p("AuBn9QAro3I1izQI0i0DVKIQDUKIirJTQisJTIdD0");
	this.shape_97.setTransform(96.325,118.1782);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#323232").ss(4,1,1).p("AuCoCQAto1I3ixQI3ixDbKFQDbKEinJSQinJTICD6");
	this.shape_98.setTransform(96.2,118.4932);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#323232").ss(4,1,1).p("AuDoHQAwo0I5iuQI4iuDiKBQDiKBijJRQijJTHoEA");
	this.shape_99.setTransform(96.075,118.8414);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#323232").ss(4,1,1).p("AuEoMQAyoyI7irQI6isDpJ9QDoJ9ieJSQifJSHOEG");
	this.shape_100.setTransform(95.95,119.1811);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#323232").ss(4,1,1).p("AuEoRQAzoxI+ioQI8ipDvJ6QDvJ5iaJRQibJRG0EN");
	this.shape_101.setTransform(95.85,119.5216);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#323232").ss(4,1,1).p("AuFoXQA1ouJAimQI/imD1J2QD2J2iWJQQiWJRGYES");
	this.shape_102.setTransform(95.725,119.8598);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("#323232").ss(4,1,1).p("AuGocQA3osJCijQJBikD9JyQD7JziSJQQiRJQF+EY");
	this.shape_103.setTransform(95.6,120.182);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#323232").ss(4,1,1).p("AuHohQA5orJEigQJDihEEJvQECJuiOJQQiNJQFkEe");
	this.shape_104.setTransform(95.5,120.5219);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f().s("#323232").ss(4,1,1).p("AuIomQA8opJGieQJFieEKJrQEJJriJJPQiKJQFKEk");
	this.shape_105.setTransform(95.375,120.8605);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f().s("#323232").ss(4,1,1).p("AuJorQA+ooJIibQJIibEQJnQEQJoiFJOQiFJPEvEr");
	this.shape_106.setTransform(95.25,121.2069);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("#323232").ss(4,1,1).p("AuJowQA/omJLiYQJJiZEXJkQEWJkiBJOQiAJPEUEw");
	this.shape_107.setTransform(95.125,121.52);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#323232").ss(4,1,1).p("AuKo1QBBokJNiWQJMiWEdJgQEdJgh9JOQh8JOD6E3");
	this.shape_108.setTransform(95.025,121.8829);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f().s("#323232").ss(4,1,1).p("AuLo7QBDoiJPiTQJOiTEkJdQEjJch4JNQh4JODgE8");
	this.shape_109.setTransform(94.925,122.2044);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f().s("#323232").ss(4,1,1).p("AuMpAQBFogJSiQQJPiRErJZQEqJZh0JNQh0JNDGFC");
	this.shape_110.setTransform(94.8,122.5168);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f().s("#323232").ss(4,1,1).p("AuNpFQBHoeJUiOQJSiOExJWQEwJVhvJMQhwJNCsFI");
	this.shape_111.setTransform(94.7,122.8789);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().s("#323232").ss(4,1,1).p("AuNpKQBJocJViLQJUiME4JSQE3JShrJMQhsJMCRFO");
	this.shape_112.setTransform(94.575,123.1985);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f().s("#323232").ss(4,1,1).p("AuTpPQBLobJYiIQJWiJE+JOQE+JPhnJLQhnJMB2FU");
	this.shape_113.setTransform(94.9457,123.535);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f().s("#323232").ss(4,1,1).p("AuepUQBNoZJaiGQJZiGFEJLQFFJKhjJLQhjJMBcFa");
	this.shape_114.setTransform(95.8321,123.8713);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f().s("#323232").ss(4,1,1).p("AuppZQBPoYJciDQJbiDFLJHQFLJHheJKQhfJLBCFh");
	this.shape_115.setTransform(96.7244,124.2158);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("#323232").ss(4,1,1).p("Au0peQBRoWJeiAQJdiBFSJEQFSJDhbJKQhaJLAnFm");
	this.shape_116.setTransform(97.6068,124.5339);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f().s("#323232").ss(4,1,1).p("Au+pkQBToTJgh+QJfh+FZJAQFYJAhXJJQhWJKANFs");
	this.shape_117.setTransform(98.494,124.8611);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().s("#323232").ss(4,1,1).p("AvKppQBVoSJjh7QJhh7FfI8QFfI8hSJJQhSJKgNFy");
	this.shape_118.setTransform(99.4023,125.2043);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f().s("#323232").ss(4,1,1).p("AvVpuQBXoQJlh4QJjh5FmI5QFlI5hNJIQhOJJgoF4");
	this.shape_119.setTransform(100.3162,125.522);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f().s("#323232").ss(4,1,1).p("AvgpzQBZoOJnh2QJmh2FsI1QFsI1hKJIQhJJJhCF+");
	this.shape_120.setTransform(101.2174,125.8735);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f().s("#323232").ss(4,1,1).p("Avrp4QBboMJphzQJoh0FzIyQFyIxhFJIQhFJIhdGE");
	this.shape_121.setTransform(102.1239,126.1898);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f().s("#323232").ss(4,1,1).p("Av2p9QBdoLJrhwQJqhxF5IuQF5IuhBJHQhBJIh2GK");
	this.shape_122.setTransform(103.0529,126.5312);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f().s("#323232").ss(4,1,1).p("AwBqCQBeoJJuhuQJshuGAIrQF/Iqg8JGQg9JIiRGQ");
	this.shape_123.setTransform(104.0122,126.8576);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f().s("#323232").ss(4,1,1).p("AwMqHQBgoHJwhrQJuhsGHInQGGIng5JGQg4JHisGW");
	this.shape_124.setTransform(104.9325,127.1725);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f().s("#323232").ss(4,1,1).p("AwYqMQBjoGJxhoQJxhpGNIkQGNIig0JGQg1JHjFGc");
	this.shape_125.setTransform(105.8765,127.5126);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f().s("#323232").ss(4,1,1).p("AwjqRQBkoEJ0hlQJzhnGUIgQGTIggwJFQgwJGjgGi");
	this.shape_126.setTransform(106.8054,127.8375);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f().s("#323232").ss(4,1,1).p("AwuqWQBmoCJ2hjQJ1hkGaIcQGaIcgsJFQgrJGj7Go");
	this.shape_127.setTransform(107.7382,128.1759);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f().s("#323232").ss(4,1,1).p("Aw6qbQBpoAJ4hhQJ3hgGhIYQGgIYgnJFQgoJFkVGu");
	this.shape_128.setTransform(108.6961,128.4894);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f().s("#323232").ss(4,1,1).p("AxGqgQBrn/J6hdQJ5hfGoIWQGnIUgjJEQgkJFkvG0");
	this.shape_129.setTransform(109.6587,128.839);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f().s("#323232").ss(4,1,1).p("AvEn9QBqoXHQk+QHOk+G1LZQG0LaAUJkQAVJmhhHH");
	this.shape_130.setTransform(96.4788,112.3231);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f().s("#323232").ss(4,1,1).p("AuclKQBnoyEjohQEiogG6OhQG7OiBIKGQBIKHCIHU");
	this.shape_131.setTransform(92.475,94.4001);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#323232").ss(4,1,1).p("AuMlhQBnotEeoBQEeoBHhOHQHiOGA5KAQA5KBBBHM");
	this.shape_132.setTransform(90.9,96.6925);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f().s("#323232").ss(4,1,1).p("At8l4QBnopEanhQEZnhIJNrQIINrAqJ7QApJ7gFHF");
	this.shape_133.setTransform(89.3272,98.994);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#323232").ss(4,1,1).p("AuImPQBookEVnBQEVnCIvNQQIwNQAaJ1QAaJ1hMG9");
	this.shape_134.setTransform(90.5469,101.2639);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f().s("#323232").ss(4,1,1).p("AuhmlQBpogEQmiQERmhJWM1QJWM0AMJvQAKJwiSG0");
	this.shape_135.setTransform(92.9572,103.513);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#323232").ss(4,1,1).p("Au7m8QBpobEMmCQELmCJ+MaQJ9MZgEJqQgFJqjYGs");
	this.shape_136.setTransform(95.6262,105.7839);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f().s("#323232").ss(4,1,1).p("AvXnSQBqoXEHliQEHliKlL+QKkL+gTJkQgUJlkfGk");
	this.shape_137.setTransform(98.3523,108.0305);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#323232").ss(4,1,1).p("AvynoQBqoTEDlCQEClCLLLjQLMLjgjJeQgjJfllGc");
	this.shape_138.setTransform(101.1066,110.2389);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f().s("#323232").ss(4,1,1).p("AwOn/QBroOD+kiQD+kiLyLHQLzLIgyJYQgzJZmsGV");
	this.shape_139.setTransform(103.8833,112.4639);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#323232").ss(4,1,1).p("AwqoUQBroKD6kCQD5kDMaKtQMaKshCJTQhCJTnyGM");
	this.shape_140.setTransform(106.6996,114.6319);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f().s("#323232").ss(4,1,1).p("AxGoqQBroFD1jiQD1jjNAKRQNBKRhQJNQhSJOo4GE");
	this.shape_141.setTransform(109.5047,116.7871);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#323232").ss(4,1,1).p("Axio/QBsoBDwjDQDwjCNoJ1QNoJ2hgJHQhhJJp/F8");
	this.shape_142.setTransform(112.326,118.9295);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f().s("#323232").ss(4,1,1).p("Ax+pUQBsn9DsiiQDrijOPJaQOPJahwJCQhwJDrFF0");
	this.shape_143.setTransform(115.1499,121.0091);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#323232").ss(4,1,1).p("AykkBQA8sxJAo6QI/o7JaXUQJZXUgoJwQgpJvj+lE");
	this.shape_144.setTransform(118.8528,87.1036);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f().s("#323232").ss(4,1,1).p("Az2g5QALxlIEwbUAIEgQaAMEAmYUAMFAmXgAyAKbQgzKbiyxC");
	this.shape_145.setTransform(127.0782,67.1312);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#323232").ss(4,1,1).p("AzuhJQAQxIIKvsUAIJgPtAL0Ak8UAL0Ak7gAxAKXQgxKXi6v5");
	this.shape_146.setTransform(126.299,68.7158);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f().s("#323232").ss(4,1,1).p("AzmhZQAVwrIPu+UAIPgO/ALjAjgUALlAjfgAxAKTQgwKTjBuw");
	this.shape_147.setTransform(125.4991,70.3367);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#323232").ss(4,1,1).p("AzehqQAZwNIVuRUAIVgORALTAiFUALUAiDgAwAKPQgvKPjIto");
	this.shape_148.setTransform(124.7212,71.9897);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f().s("#323232").ss(4,1,1).p("AzWh7QAdvwIbtjUAIbgNkALCAgpUALEAgogAuAKLQgvKKjPsf");
	this.shape_149.setTransform(123.9433,73.7069);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#323232").ss(4,1,1).p("AzPiNQAivSIhs2QIgs2KzfOQKzfLgtKHQguKGjXrV");
	this.shape_150.setTransform(123.1655,75.4815);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f().s("#323232").ss(4,1,1).p("AzHifQAnu1InsIQImsJKidyQKidwgsKDQgtKCjeqN");
	this.shape_151.setTransform(122.3627,77.3291);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#323232").ss(4,1,1).p("Ay/izQAsuXIsrbQIsraKRcVQKTcVgsJ+QgsJ+jlpD");
	this.shape_152.setTransform(121.5848,79.2784);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().s("#323232").ss(4,1,1).p("Ay3jHQAwt6IyqtQIxqtKCa6QKCa4grJ7QgrJ6jsn7");
	this.shape_153.setTransform(120.8069,81.3171);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#323232").ss(4,1,1).p("AyvjdQA1tdI3p/QI4p/JxZeQJxZdgqJ2QgqJ2jzmy");
	this.shape_154.setTransform(120.0071,83.4934);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().s("#323232").ss(4,1,1).p("Aynj0QA5tAI+pRQI8pSJhYDQJiYBgpJyQgpJyj7lp");
	this.shape_155.setTransform(119.2292,85.841);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("#323232").ss(4,1,1).p("AygkOQA+siJDojQJColJSWnQJRWmgoJuQgpJtkBkg");
	this.shape_156.setTransform(118.4514,88.3858);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f().s("#323232").ss(4,1,1).p("AyYkqQBDsEJJn2QJHn3JBVLQJBVKgnJqQgnJpkJjX");
	this.shape_157.setTransform(117.6735,91.1948);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().s("#323232").ss(4,1,1).p("AyQlJQBIroJOnIQJOnJIwTwQIxTugnJlQgmJlkQiN");
	this.shape_158.setTransform(116.8737,94.3324);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f().s("#323232").ss(4,1,1).p("AyIltQBMrKJVmbQJTmbIgSUQIgSSglJhQgmJhkXhF");
	this.shape_159.setTransform(116.0959,97.9043);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f().s("#323232").ss(4,1,1).p("AyAmXQBQqtJaltQJZltIQQ4QIQQ2gkJdQglJdkeAE");
	this.shape_160.setTransform(115.318,102.1291);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f().s("#323232").ss(4,1,1).p("Ax4nFQBVqPJgk/QJflAH/PcQH/PbgjJZQgkJZklBN");
	this.shape_161.setTransform(114.5153,106.6856);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f().s("#323232").ss(4,1,1).p("AxwnyQBapyJlkSQJlkSHvOAQHvN/gjJVQgiJVktCW");
	this.shape_162.setTransform(113.7375,111.2327);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f().s("#323232").ss(4,1,1).p("AxpogQBfpUJrjkQJqjlHfMlQHfMjgiJRQgiJQk0Dg");
	this.shape_163.setTransform(112.9596,115.7728);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f().s("#323232").ss(4,1,1).p("AxhpNQBjo3Jxi2QJwi3HPLJQHOLIggJMQghJMk7Eo");
	this.shape_164.setTransform(112.1818,120.2562);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f().s("#323232").ss(4,1,1).p("AxZp5QBooaJ3iJQJ2iJG+JtQG+JtggJIQggJIlCFx");
	this.shape_165.setTransform(111.3821,124.7369);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().s("#323232").ss(4,1,1).p("AtFirQnWpwKxnVQKwnVIpVBQIpVAjKDkQjLDjl2gc");
	this.shape_166.setTransform(140.7591,73.0159);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().s("#323232").ss(4,1,1).p("AnRAbQwYriLltPUALkgNPAKkAhxUAKlAhwgF2gB9Ql2h+mjny");
	this.shape_167.setTransform(160.5685,47.6201);
	this.shape_167._off = true;

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f().s("#323232").ss(4,1,1).p("AnbAXQwHraLrtBUALqgNCAKWAhTUAKWAhRgFygB1Qlzh2mhnY");
	this.shape_168.setTransform(160.2554,48.0102);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().s("#323232").ss(4,1,1).p("AnmAUQv1rSLxs0UALwgM0AKIAg0UAKIAgzgFvgBtQlwhumem/");
	this.shape_169.setTransform(159.909,48.3826);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f().s("#323232").ss(4,1,1).p("AnwARQvkrLL4smUAL2gMnAJ6AgWUAJ5AgUgFsgBlQlthmmbml");
	this.shape_170.setTransform(159.5768,48.7519);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().s("#323232").ss(4,1,1).p("An6AOQvTrDL+sZQL9sZJrf3QJrf2lphdQlphemYmL");
	this.shape_171.setTransform(159.2201,49.1132);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f().s("#323232").ss(4,1,1).p("AoEALQvBq8MEsLQMCsMJdfZQJdfXlmhVQlmhVmVly");
	this.shape_172.setTransform(158.8726,49.5005);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f().s("#323232").ss(4,1,1).p("AoPAIQuvq0MKr+QMJr+JPe6QJOe5ljhNQljhNmSlZ");
	this.shape_173.setTransform(158.5175,49.8656);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f().s("#323232").ss(4,1,1).p("AoYAFQueqsMQrxQMPrxJAecQJAealfhEQlghFmQk/");
	this.shape_174.setTransform(158.1454,50.2432);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f().s("#323232").ss(4,1,1).p("AoiABQuNqkMXrjQMVrjIyd9QIxd8lcg9Qldg9mNkl");
	this.shape_175.setTransform(157.7833,50.6367);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f().s("#323232").ss(4,1,1).p("AosgBQt7qeMdrVQMbrWIkdeQIjdelag1QlZg1mKkL");
	this.shape_176.setTransform(157.397,51.0085);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f().s("#323232").ss(4,1,1).p("Ao2gEQtqqWMjrIQMirJIVdAQIVc/lXgsQlWgtmHjy");
	this.shape_177.setTransform(157.0186,51.3936);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f().s("#323232").ss(4,1,1).p("ApAgHQtYqPMpq6QMoq7IHchQIGcglTgkQlTgkmEjZ");
	this.shape_178.setTransform(156.629,51.7826);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f().s("#323232").ss(4,1,1).p("ApKgLQtGqGMvquQMuqtH5cDQH3cClPgcQlRgdmBi/");
	this.shape_179.setTransform(156.229,52.1744);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f().s("#323232").ss(4,1,1).p("ApUgOQs0p/M1qgQM0qgHqbkQHqbklNgUQlNgUl+im");
	this.shape_180.setTransform(155.8248,52.5573);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f().s("#323232").ss(4,1,1).p("ApdgSQskp3M8qSQM7qTHbbGQHbbFlJgMQlKgMl8iM");
	this.shape_181.setTransform(155.4118,52.9667);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f().s("#323232").ss(4,1,1).p("ApngVQsSpwNCqFQNBqFHNaoQHNamlHgDQlHgFl4hy");
	this.shape_182.setTransform(155.0006,53.3681);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f().s("#323232").ss(4,1,1).p("ApwgZQsApnNIp4QNGp4G/aJQG/aIlEAFQlDAEl2hZ");
	this.shape_183.setTransform(154.5803,53.7694);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f().s("#323232").ss(4,1,1).p("Ap5gdQrvpgNOpqQNNpqGxZqQGwZplBANQlAAMlzg/");
	this.shape_184.setTransform(154.1477,54.2732);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f().s("#323232").ss(4,1,1).p("AqDgjQrdpYNUpdQNTpdGiZMQGiZLk9AVQk9AUlwgl");
	this.shape_185.setTransform(153.7049,54.9323);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f().s("#323232").ss(4,1,1).p("AqMgtQrMpRNbpPQNZpPGUYuQGTYsk6AdQk6AcltgM");
	this.shape_186.setTransform(153.2587,55.9891);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f().s("#323232").ss(4,1,1).p("AqWhAQq6pJNhpBQNgpCGFYPQGFYNk3AlQk3AllqAO");
	this.shape_187.setTransform(152.8108,57.904);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f().s("#323232").ss(4,1,1).p("AqfhUQqopBNno0QNlo1F3XxQF3Xvk0AtQk0AtlnAn");
	this.shape_188.setTransform(152.3587,59.9833);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f().s("#323232").ss(4,1,1).p("AqnhoQqYo6NuonQNsomFoXSQFoXQkwA2QkxA0llBB");
	this.shape_189.setTransform(151.8927,62.0741);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f().s("#323232").ss(4,1,1).p("Aqxh9QqFoyNzoZQNyoZFaWzQFaWyktA+QkuA9liBa");
	this.shape_190.setTransform(151.4189,64.1665);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f().s("#323232").ss(4,1,1).p("Aq5iRQp1oqN6oMQN5oMFLWVQFMWUkrBGQkqBFlfB0");
	this.shape_191.setTransform(150.94,66.2454);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f().s("#323232").ss(4,1,1).p("ArDilQpiojOAn+QN+n+E+V2QE8V1kmBOQkoBNlcCO");
	this.shape_192.setTransform(150.4523,68.3492);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f().s("#323232").ss(4,1,1).p("ArLi5QpRobOGnxQOEnxEvVYQEvVWkkBWQkkBWlZCn");
	this.shape_193.setTransform(149.9667,70.4278);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f().s("#323232").ss(4,1,1).p("ArUjOQpAoTONnjQOLnkEgU5QEgU4kgBeQkhBelXDB");
	this.shape_194.setTransform(149.4597,72.5197);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f().s("#323232").ss(4,1,1).p("ArdjiQouoMOTnWQORnWESUbQESUakeBmQkeBllTDb");
	this.shape_195.setTransform(148.9681,74.6095);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f().s("#323232").ss(4,1,1).p("Arlj2QodoEOZnJQOXnIEET8QEDT7kaBvQkbBtlRD0");
	this.shape_196.setTransform(148.4526,76.6875);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f().s("#323232").ss(4,1,1).p("ArukLQoLn8Ofm7QOem7D1TeQD1TckXB3QkYB2lOEN");
	this.shape_197.setTransform(147.9401,78.779);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f().s("#323232").ss(4,1,1).p("Ar2kfQn6n1OlmtQOkmuDnTAQDnS+kVB+QkUB+lLEn");
	this.shape_198.setTransform(147.4254,80.868);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f().s("#323232").ss(4,1,1).p("Ar/kzQnontOsmgQOqmhDYShQDYSgkQCGQkSCHlIFA");
	this.shape_199.setTransform(146.8841,82.9591);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f().s("#323232").ss(4,1,1).p("AsHlHQnXnmOymSQOwmTDKSCQDKSBkOCPQkOCOlFFb");
	this.shape_200.setTransform(146.3685,85.0362);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f().s("#323232").ss(4,1,1).p("AsQlcQnFndO4mFQO3mGC7RkQC8RjkLCWQkLCXlCF0");
	this.shape_201.setTransform(145.819,87.1381);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f().s("#323232").ss(4,1,1).p("AsYlwQmznWO9l4QO9l3CtRFQCuREkICfQkICek/GO");
	this.shape_202.setTransform(145.2921,89.2123);
	this.shape_202._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},4).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_184}]},1).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_187}]},1).to({state:[{t:this.shape_188}]},1).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_190}]},1).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_193}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_198}]},1).to({state:[{t:this.shape_199}]},1).to({state:[{t:this.shape_200}]},1).to({state:[{t:this.shape_201}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4).to({_off:false},0).to({_off:true},1).wait(31).to({_off:false},0).to({_off:true},1).wait(13).to({_off:false},0).wait(1).to({_off:true},1).wait(86).to({_off:false},0).to({_off:true},1).wait(14).to({_off:false},0).to({_off:true},1).wait(22).to({_off:false},0).wait(2).to({_off:true},1).wait(61));
	this.timeline.addTween(cjs.Tween.get(this.shape_167).wait(180).to({_off:false},0).wait(1).to({x:160.5762,y:47.6444},0).wait(8).to({x:160.5685,y:47.6201},0).to({_off:true},1).wait(50));
	this.timeline.addTween(cjs.Tween.get(this.shape_202).wait(224).to({_off:false},0).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.1,-189.6,272.70000000000005,513.6);


(lib.triange = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.newsymbol = new lib.newsymbol();
	this.newsymbol.name = "newsymbol";
	this.newsymbol.setTransform(0.1,0,1,1,0,0,0,0.1,0);

	this.timeline.addTween(cjs.Tween.get(this.newsymbol).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.triange, new cjs.Rectangle(-61.8,-19.4,123.9,38.8), null);


(lib.psitriangle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D7D7D").s().p("AhyDZIAAmxIDlAAIAAGxg");
	this.shape.setTransform(-43.8,-1.675);

	this.triange = new lib.triange();
	this.triange.name = "triange";
	this.triange.setTransform(0.1,3.9,1,1,0,0,0,0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.triange},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.8,-23.3,123.9,46.7);


(lib.darksky = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.skylong();
	this.instance.setTransform(-1.8,-1.95,1,1,0,0,0,2,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.skylong();
	this.instance_1.setTransform(-1.8,-1.95,1,1,0,0,180,2,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.darksky, new cjs.Rectangle(-251.8,-141.9,500,280), null);


(lib.psihouseai = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// static_idn
	this.psitrange = new lib.psitriangle("synched",0);
	this.psitrange.name = "psitrange";
	this.psitrange.setTransform(62.2,23.9,1,1,0,0,0,0.1,0);

	this.psileft = new lib.psileft();
	this.psileft.name = "psileft";
	this.psileft.setTransform(30.45,121.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.psileft},{t:this.psitrange}]}).wait(55));

	// right
	this.psiright = new lib.psiright();
	this.psiright.name = "psiright";
	this.psiright.setTransform(94.7,105.3);

	this.timeline.addTween(cjs.Tween.get(this.psiright).wait(8).to({scaleY:0.904,y:100.55},0).wait(1).to({scaleY:0.808,x:95.15,y:94.9},0).wait(1).to({x:94.7,y:95.8},0).wait(43).to({scaleY:0.904,y:100.55},0).wait(1).to({scaleY:1,x:94.25,y:105.75},0).wait(1));

	// throbfiller
	this.psirightfiller = new lib.psirightfiller();
	this.psirightfiller.name = "psirightfiller";
	this.psirightfiller.setTransform(111,172.5);

	this.timeline.addTween(cjs.Tween.get(this.psirightfiller).wait(8).to({scaleX:0.6862,scaleY:1.3,x:115,y:168.3},0).wait(1).to({regX:0.1,scaleX:0.3724,scaleY:1.6,x:120.4,y:162.7},0).wait(1).to({x:119.05,y:164.05},0).wait(43).to({regX:0,scaleX:0.6862,scaleY:1.3,x:115,y:168.3},0).wait(1).to({scaleX:1,scaleY:1,x:110.55,y:172.95},0).wait(1));

	// throbber
	this.psirightthrobber = new lib.psirightthrobber();
	this.psirightthrobber.name = "psirightthrobber";
	this.psirightthrobber.setTransform(87.7,165.3,0.9825,1.0009,7.4986);
	this.psirightthrobber._off = true;

	this.timeline.addTween(cjs.Tween.get(this.psirightthrobber).wait(9).to({_off:false},0).wait(1).to({rotation:151.4995},0).wait(1).to({rotation:295.4995},0).wait(1).to({rotation:439.4996},0).wait(1).to({rotation:583.4996},0).wait(1).to({rotation:727.4996},0).wait(1).to({rotation:871.4997},0).wait(1).to({rotation:1015.4997},0).wait(1).to({rotation:1159.4998},0).wait(1).to({rotation:1303.4998},0).wait(1).to({rotation:1447.4998},0).wait(1).to({rotation:1591.4999},0).wait(1).to({rotation:1735.4999},0).wait(1).to({rotation:1879.4999},0).wait(1).to({rotation:2023.5},0).wait(1).to({rotation:2167.5},0).to({_off:true},1).wait(30));

	// throbber
	this.psirightthrobber_1 = new lib.psirightthrobber();
	this.psirightthrobber_1.name = "psirightthrobber_1";
	this.psirightthrobber_1.setTransform(79.25,172.5);

	this.timeline.addTween(cjs.Tween.get(this.psirightthrobber_1).wait(8).to({scaleX:0.9825,scaleY:1.0009,rotation:7.4995,x:83.725,y:168.775},0).to({_off:true},1).wait(16).to({_off:false,rotation:7.4986,x:87.7,y:165.3},0).wait(2).to({scaleX:0.9824,scaleY:1.0008,rotation:-112.4988,x:87.75,y:165.25},0).wait(2).to({rotation:-232.5004,x:87.65},0).wait(3).to({rotation:-262.501,x:87.6},0).wait(7).to({scaleX:1,scaleY:1,rotation:-360,x:79.25,y:172.5},0).wait(1).to({x:77.65,y:174.2},0).wait(1).to({x:79.15,y:172.8},0).wait(14));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.2,0.6,125.2,189.6);


(lib.Symbol73 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {idle:0,drumhit:2,pian1:4,pian2:6,pian3:8,pian4:10,fag1:12};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_1 = function() {
		this.stop()
	}
	this.frame_2 = function() {
		var _this = this;
		
		_this.l1.gotoAndPlay('s1');
		_this.l2.gotoAndPlay('s1');
		_this.l3.gotoAndPlay('s1');
		_this.l4.gotoAndPlay('s1');
		_this.l5.gotoAndPlay('s1');
		_this.l6.gotoAndPlay('s1');
		_this.l7.gotoAndPlay('s1');
		_this.l8.gotoAndPlay('s1');
		_this.l9.gotoAndPlay('s1');
		_this.l10.gotoAndPlay('s1');
		_this.r1.gotoAndPlay('s1');
		_this.r2.gotoAndPlay('s1');
		_this.r3.gotoAndPlay('s1');
		_this.r4.gotoAndPlay('s1');
		_this.r5.gotoAndPlay('s1');
		_this.r6.gotoAndPlay('s1');
		_this.r7.gotoAndPlay('s1');
		_this.r8.gotoAndPlay('s1');
		_this.r9.gotoAndPlay('s1');
		_this.r10.gotoAndPlay('s1');
	}
	this.frame_3 = function() {
		this.stop();
	}
	this.frame_4 = function() {
		var _this = this;
		
		_this.l1.gotoAndPlay('p1');
		_this.l2.gotoAndPlay('p1');
		_this.l3.gotoAndPlay('p1');
		_this.l4.gotoAndPlay('p1');
		_this.l5.gotoAndPlay('p1');
		_this.l6.gotoAndPlay('p1');
		_this.l7.gotoAndPlay('p1');
		_this.l8.gotoAndPlay('p1');
		_this.l9.gotoAndPlay('p1');
		_this.l10.gotoAndPlay('p1');
		_this.r1.gotoAndPlay('p1');
		_this.r2.gotoAndPlay('p1');
		_this.r3.gotoAndPlay('p1');
		_this.r4.gotoAndPlay('p1');
		_this.r5.gotoAndPlay('p1');
		_this.r6.gotoAndPlay('p1');
		_this.r7.gotoAndPlay('p1');
		_this.r8.gotoAndPlay('p1');
		_this.r9.gotoAndPlay('p1');
		_this.r10.gotoAndPlay('p1');
	}
	this.frame_5 = function() {
		this.stop();
	}
	this.frame_6 = function() {
		var _this = this;
		
		_this.l1.gotoAndPlay('p2');
		_this.l2.gotoAndPlay('p2');
		_this.l3.gotoAndPlay('p2');
		_this.l4.gotoAndPlay('p2');
		_this.l5.gotoAndPlay('p2');
		_this.l6.gotoAndPlay('p2');
		_this.l7.gotoAndPlay('p2');
		_this.l8.gotoAndPlay('p2');
		_this.l9.gotoAndPlay('p2');
		_this.l10.gotoAndPlay('p2');
		_this.r1.gotoAndPlay('p2');
		_this.r2.gotoAndPlay('p2');
		_this.r3.gotoAndPlay('p2');
		_this.r4.gotoAndPlay('p2');
		_this.r5.gotoAndPlay('p2');
		_this.r6.gotoAndPlay('p2');
		_this.r7.gotoAndPlay('p2');
		_this.r8.gotoAndPlay('p2');
		_this.r9.gotoAndPlay('p2');
		_this.r10.gotoAndPlay('p2');
	}
	this.frame_7 = function() {
		this.stop();
	}
	this.frame_8 = function() {
		var _this = this;
		
		_this.l1.gotoAndPlay('p3');
		_this.l2.gotoAndPlay('p3');
		_this.l3.gotoAndPlay('p3');
		_this.l4.gotoAndPlay('p3');
		_this.l5.gotoAndPlay('p3');
		_this.l6.gotoAndPlay('p3');
		_this.l7.gotoAndPlay('p3');
		_this.l8.gotoAndPlay('p3');
		_this.l9.gotoAndPlay('p3');
		_this.l10.gotoAndPlay('p3');
		_this.r1.gotoAndPlay('p3');
		_this.r2.gotoAndPlay('p3');
		_this.r3.gotoAndPlay('p3');
		_this.r4.gotoAndPlay('p3');
		_this.r5.gotoAndPlay('p3');
		_this.r6.gotoAndPlay('p3');
		_this.r7.gotoAndPlay('p3');
		_this.r8.gotoAndPlay('p3');
		_this.r9.gotoAndPlay('p3');
		_this.r10.gotoAndPlay('p3');
	}
	this.frame_9 = function() {
		this.stop();
	}
	this.frame_10 = function() {
		var _this = this;
		
		_this.l1.gotoAndPlay('p4');
		_this.l2.gotoAndPlay('p4');
		_this.l3.gotoAndPlay('p4');
		_this.l4.gotoAndPlay('p4');
		_this.l5.gotoAndPlay('p4');
		_this.l6.gotoAndPlay('p4');
		_this.l7.gotoAndPlay('p4');
		_this.l8.gotoAndPlay('p4');
		_this.l9.gotoAndPlay('p4');
		_this.l10.gotoAndPlay('p4');
		_this.r1.gotoAndPlay('p4');
		_this.r2.gotoAndPlay('p4');
		_this.r3.gotoAndPlay('p4');
		_this.r4.gotoAndPlay('p4');
		_this.r5.gotoAndPlay('p4');
		_this.r6.gotoAndPlay('p4');
		_this.r7.gotoAndPlay('p4');
		_this.r8.gotoAndPlay('p4');
		_this.r9.gotoAndPlay('p4');
		_this.r10.gotoAndPlay('p4');
	}
	this.frame_11 = function() {
		this.stop();
	}
	this.frame_12 = function() {
		var _this = this;
		
		_this.l1.gotoAndPlay('f1');
		_this.l2.gotoAndPlay('f1');
		_this.l3.gotoAndPlay('f1');
		_this.l4.gotoAndPlay('f1');
		_this.l5.gotoAndPlay('f1');
		_this.l6.gotoAndPlay('f1');
		_this.l7.gotoAndPlay('f1');
		_this.l8.gotoAndPlay('f1');
		_this.l9.gotoAndPlay('f1');
		_this.l10.gotoAndPlay('f1');
		_this.r1.gotoAndPlay('f1');
		_this.r2.gotoAndPlay('f1');
		_this.r3.gotoAndPlay('f1');
		_this.r4.gotoAndPlay('f1');
		_this.r5.gotoAndPlay('f1');
		_this.r6.gotoAndPlay('f1');
		_this.r7.gotoAndPlay('f1');
		_this.r8.gotoAndPlay('f1');
		_this.r9.gotoAndPlay('f1');
		_this.r10.gotoAndPlay('f1');
	}
	this.frame_13 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1).call(this.frame_5).wait(1).call(this.frame_6).wait(1).call(this.frame_7).wait(1).call(this.frame_8).wait(1).call(this.frame_9).wait(1).call(this.frame_10).wait(1).call(this.frame_11).wait(1).call(this.frame_12).wait(1).call(this.frame_13).wait(342));

	// Layer_3
	this.l2 = new lib.skaianportalanimation();
	this.l2.name = "l2";
	this.l2.setTransform(344.85,131.6,1,1,0,35.9996,-144.0004);

	this.timeline.addTween(cjs.Tween.get(this.l2).wait(355));

	// Layer_4
	this.l3 = new lib.skaianportalanimation();
	this.l3.name = "l3";
	this.l3.setTransform(382.9,210.35,1,1,0,71.9997,-108.0003);

	this.timeline.addTween(cjs.Tween.get(this.l3).wait(355));

	// Layer_5
	this.l4 = new lib.skaianportalanimation();
	this.l4.name = "l4";
	this.l4.setTransform(367.55,297.9,1,1,0,108.0003,-71.9997);

	this.timeline.addTween(cjs.Tween.get(this.l4).wait(355));

	// Layer_6
	this.l5 = new lib.skaianportalanimation();
	this.l5.name = "l5";
	this.l5.setTransform(304.35,358.8,1,1,0,143.9999,-36.0001);

	this.timeline.addTween(cjs.Tween.get(this.l5).wait(355));

	// Layer_7
	this.l6 = new lib.skaianportalanimation();
	this.l6.name = "l6";
	this.l6.setTransform(217,370.65,1,1,0,180,0);

	this.timeline.addTween(cjs.Tween.get(this.l6).wait(355));

	// Layer_8
	this.l7 = new lib.skaianportalanimation();
	this.l7.name = "l7";
	this.l7.setTransform(138.2,328.65,1,1,0,-144.0009,35.9991);

	this.timeline.addTween(cjs.Tween.get(this.l7).wait(355));

	// Layer_9
	this.l8 = new lib.skaianportalanimation();
	this.l8.name = "l8";
	this.l8.setTransform(99.85,249.55,1,1,0,-107.9995,72.0005);

	this.timeline.addTween(cjs.Tween.get(this.l8).wait(355));

	// Layer_10
	this.l9 = new lib.skaianportalanimation();
	this.l9.name = "l9";
	this.l9.setTransform(115.2,163.05,1,1,0,-72.0002,107.9998);

	this.timeline.addTween(cjs.Tween.get(this.l9).wait(355));

	// Layer_11
	this.l10 = new lib.skaianportalanimation();
	this.l10.name = "l10";
	this.l10.setTransform(178.9,102.15,1,1,0,-35.9991,144.0009);

	this.timeline.addTween(cjs.Tween.get(this.l10).wait(355));

	// Layer_12
	this.l1 = new lib.skaianportalanimation();
	this.l1.name = "l1";
	this.l1.setTransform(267.35,89.85,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.l1).wait(355));

	// Layer_13
	this.r10 = new lib.skaianportalanimation();
	this.r10.name = "r10";
	this.r10.setTransform(138.45,131.6,1,1,-35.9996);

	this.timeline.addTween(cjs.Tween.get(this.r10).wait(355));

	// Layer_14
	this.r9 = new lib.skaianportalanimation();
	this.r9.name = "r9";
	this.r9.setTransform(100.4,210.35,1,1,-71.9997);

	this.timeline.addTween(cjs.Tween.get(this.r9).wait(355));

	// Layer_15
	this.r8 = new lib.skaianportalanimation();
	this.r8.name = "r8";
	this.r8.setTransform(115.75,297.9,1,1,-108.0003);

	this.timeline.addTween(cjs.Tween.get(this.r8).wait(355));

	// Layer_16
	this.r7 = new lib.skaianportalanimation();
	this.r7.name = "r7";
	this.r7.setTransform(178.95,358.8,1,1,-143.9999);

	this.timeline.addTween(cjs.Tween.get(this.r7).wait(355));

	// Layer_17
	this.r6 = new lib.skaianportalanimation();
	this.r6.name = "r6";
	this.r6.setTransform(266.3,370.65,1,1,180);

	this.timeline.addTween(cjs.Tween.get(this.r6).wait(355));

	// Layer_18
	this.r5 = new lib.skaianportalanimation();
	this.r5.name = "r5";
	this.r5.setTransform(345.1,328.65,1,1,144.0009);

	this.timeline.addTween(cjs.Tween.get(this.r5).wait(355));

	// Layer_19
	this.r4 = new lib.skaianportalanimation();
	this.r4.name = "r4";
	this.r4.setTransform(383.45,249.55,1,1,107.9995);

	this.timeline.addTween(cjs.Tween.get(this.r4).wait(355));

	// Layer_20
	this.r3 = new lib.skaianportalanimation();
	this.r3.name = "r3";
	this.r3.setTransform(368.1,163.05,1,1,72.0002);

	this.timeline.addTween(cjs.Tween.get(this.r3).wait(355));

	// Layer_21
	this.r2 = new lib.skaianportalanimation();
	this.r2.name = "r2";
	this.r2.setTransform(304.4,102.15,1,1,35.9991);

	this.timeline.addTween(cjs.Tween.get(this.r2).wait(355));

	// Layer_22
	this.r1 = new lib.skaianportalanimation();
	this.r1.name = "r1";
	this.r1.setTransform(215.95,89.85);

	this.timeline.addTween(cjs.Tween.get(this.r1).wait(355));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.8,-2.5,489,464.9);


(lib.spiningskaianportal = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.inner = new lib.Symbol73();
	this.inner.name = "inner";
	this.inner.setTransform(-10.95,4.1,0.8055,0.8043,0,0,0,241.2,229.5);

	
	var _tweenStr_0 = cjs.Tween.get(this.inner).wait(1).to({regX:241.7,regY:230.1,rotation:0.7516,x:-10.55,y:4.6},0).wait(1).to({scaleX:0.8056,rotation:1.5031,x:-10.5},0).wait(1).to({rotation:2.2547,x:-10.55},0).wait(1).to({rotation:3.0063},0).wait(1).to({rotation:3.7578},0).wait(1).to({scaleX:0.8055,rotation:4.5094},0).wait(1).to({rotation:5.261,y:4.65},0).wait(1).to({rotation:6.0125},0).wait(1).to({scaleX:0.8056,rotation:6.7641,x:-10.6,y:4.7},0).wait(1).to({rotation:7.5157,x:-10.55,y:4.65},0).wait(1).to({rotation:8.2672,x:-10.6},0).wait(1).to({scaleX:0.8055,rotation:9.0188},0).wait(1).to({rotation:9.7704,x:-10.65,y:4.7},0).wait(1).to({rotation:10.5219,y:4.65},0).wait(1).to({rotation:11.2735},0).wait(1).to({scaleX:0.8056,rotation:12.0251,x:-10.6},0).wait(1).to({rotation:12.7766,x:-10.65,y:4.7},0).wait(1).to({rotation:13.5282},0).wait(1).to({scaleX:0.8055,rotation:14.2797,y:4.65},0).wait(1).to({rotation:15.0313,y:4.7},0).wait(1).to({rotation:15.7829,x:-10.7},0).wait(1).to({rotation:16.5344,x:-10.65,y:4.65},0).wait(1).to({rotation:17.286,x:-10.7,y:4.7},0).wait(1).to({rotation:18.0376,x:-10.65},0).wait(1).to({scaleX:0.8056,rotation:18.7891,x:-10.7},0).wait(1).to({rotation:19.5407},0).wait(1).to({scaleX:0.8055,rotation:20.2923,x:-10.75},0).wait(1).to({scaleX:0.8056,rotation:21.0438,y:4.75},0).wait(1).to({scaleX:0.8055,rotation:21.7954,x:-10.7},0).wait(1).to({rotation:22.547,x:-10.75,y:4.7},0).wait(1).to({rotation:23.2985,x:-10.8,y:4.75},0).wait(1).to({scaleX:0.8056,rotation:24.0501,x:-10.75},0).wait(1).to({rotation:24.8017,x:-10.8,y:4.7},0).wait(1).to({scaleX:0.8055,rotation:25.5532,y:4.75},0).wait(1).to({scaleX:0.8056,rotation:26.3048,x:-10.75},0).wait(1).to({scaleX:0.8055,rotation:27.0564,x:-10.8,y:4.7},0).wait(1).to({rotation:27.8079,x:-10.85,y:4.75},0).wait(1).to({rotation:28.5595,x:-10.8},0).wait(1).to({rotation:29.3111,x:-10.85,y:4.7},0).wait(1).to({rotation:30.0626,x:-10.8,y:4.75},0).wait(1).to({rotation:30.8142,x:-10.85},0).wait(1).to({rotation:31.5658},0).wait(1).to({rotation:32.3173},0).wait(1).to({rotation:33.0689,x:-10.9,y:4.8},0).wait(1).to({rotation:33.8205,x:-10.85,y:4.75},0).wait(1).to({rotation:34.572,x:-10.9,y:4.8},0).wait(1).to({rotation:35.3236,y:4.75},0).wait(1).to({rotation:36.0752,x:-10.95,y:4.8},0).wait(1).to({rotation:36.8267,x:-10.9,y:4.75},0).wait(1).to({rotation:37.5783},0).wait(1).to({rotation:38.3299,y:4.8},0).wait(1).to({rotation:39.0814,y:4.75},0).wait(1).to({rotation:39.833,x:-10.95},0).wait(1).to({rotation:40.5846},0).wait(1).to({rotation:41.3361},0).wait(1).to({rotation:42.0877},0).wait(1).to({rotation:42.8392,x:-11},0).wait(1).to({rotation:43.5908,y:4.8},0).wait(1).to({rotation:44.3424,y:4.75},0).wait(1).to({rotation:45.0939},0).wait(1).to({rotation:45.8455,x:-11.05},0).wait(1).to({rotation:46.5971,x:-11},0).wait(1).to({rotation:47.3486},0).wait(1).to({rotation:48.1002},0).wait(1).to({rotation:48.8518,x:-11.1},0).wait(1).to({rotation:49.6033,y:4.8},0).wait(1).to({rotation:50.3549,x:-11.15,y:4.75},0).wait(1).to({rotation:51.1065,x:-11.1},0).wait(1).to({rotation:51.858,y:4.8},0).wait(1).to({rotation:52.6096},0).wait(1).to({rotation:53.3612,x:-11.15},0).wait(1).to({rotation:54.1127,y:4.75},0).wait(1).to({rotation:54.8643,y:4.7},0).wait(1).to({rotation:55.6159,x:-11.2,y:4.75},0).wait(1).to({rotation:56.3674,x:-11.15},0).wait(1).to({rotation:57.119,y:4.7},0).wait(1).to({rotation:57.8706,x:-11.2,y:4.8},0).wait(1).to({rotation:58.6221,y:4.7},0).wait(1).to({rotation:59.3737,y:4.75},0).wait(1).to({rotation:60.1253,y:4.7},0).wait(1).to({rotation:60.8768,y:4.75},0).wait(1).to({rotation:61.6284,x:-11.25,y:4.7},0).wait(1).to({scaleX:0.8056,rotation:62.38},0).wait(1).to({scaleX:0.8055,rotation:63.1315,y:4.75},0).wait(1).to({scaleX:0.8056,rotation:63.8831,y:4.7},0).wait(1).to({rotation:64.6347,x:-11.3,y:4.75},0).wait(1).to({rotation:65.3862,x:-11.25,y:4.7},0).wait(1).to({scaleX:0.8055,rotation:66.1378,x:-11.3},0).wait(1).to({scaleX:0.8056,rotation:66.8894},0).wait(1).to({scaleX:0.8055,rotation:67.6409},0).wait(1).to({rotation:68.3925},0).wait(1).to({scaleX:0.8056,rotation:69.1441,x:-11.35},0).wait(1).to({scaleX:0.8055,rotation:69.8956},0).wait(1).to({scaleX:0.8056,rotation:70.6472},0).wait(1).to({rotation:71.3987},0).wait(1).to({rotation:72.1503,x:-11.3,y:4.65},0).wait(1).to({scaleX:0.8055,rotation:72.9019,x:-11.35},0).wait(1).to({rotation:73.6534,y:4.7},0).wait(1).to({rotation:74.405},0).wait(1).to({rotation:75.1566,y:4.65},0).wait(1).to({rotation:75.9081,x:-11.4},0).wait(1).to({rotation:76.6597},0).wait(1).to({scaleX:0.8056,rotation:77.4113,x:-11.35},0).wait(1).to({rotation:78.1628,x:-11.4,y:4.6},0).wait(1).to({rotation:78.9144,y:4.65},0).wait(1).to({rotation:79.666,x:-11.35},0).wait(1).to({scaleX:0.8055,rotation:80.4175,x:-11.45},0).wait(1).to({rotation:81.1691,y:4.6},0).wait(1).to({rotation:81.9207},0).wait(1).to({rotation:82.6722,x:-11.4},0).wait(1).to({scaleX:0.8056,rotation:83.4238,x:-11.45},0).wait(1).to({rotation:84.1754},0).wait(1).to({rotation:84.9269,x:-11.5},0).wait(1).to({scaleX:0.8055,rotation:85.6785},0).wait(1).to({rotation:86.4301,y:4.55},0).wait(1).to({rotation:87.1816},0).wait(1).to({scaleX:0.8056,rotation:87.9332,y:4.5},0).wait(1).to({rotation:88.6848,y:4.55},0).wait(1).to({rotation:89.4363},0).wait(1).to({scaleX:0.8055,rotation:90.1879},0).wait(1).to({rotation:90.9395,y:4.5},0).wait(1).to({rotation:91.691,x:-11.55,y:4.55},0).wait(1).to({scaleX:0.8056,rotation:92.4426,x:-11.5,y:4.5},0).wait(1).to({rotation:93.1942,x:-11.55,y:4.55},0).wait(1).to({rotation:93.9457,y:4.5},0).wait(1).to({rotation:94.6973},0).wait(1).to({scaleX:0.8055,rotation:95.4489},0).wait(1).to({rotation:96.2004,x:-11.6},0).wait(1).to({rotation:96.952,x:-11.55,y:4.45},0).wait(1).to({scaleX:0.8056,rotation:97.7035,y:4.5},0).wait(1).to({rotation:98.4551},0).wait(1).to({rotation:99.2067,x:-11.6},0).wait(1).to({scaleX:0.8055,rotation:99.9582,x:-11.55,y:4.45},0).wait(1).to({rotation:100.7098,x:-11.6},0).wait(1).to({rotation:101.4614},0).wait(1).to({rotation:102.2129},0).wait(1).to({scaleX:0.8056,rotation:102.9645},0).wait(1).to({rotation:103.7161,y:4.4},0).wait(1).to({rotation:104.4676},0).wait(1).to({rotation:105.2192,y:4.35},0).wait(1).to({rotation:105.9708,y:4.45},0).wait(1).to({scaleX:0.8055,rotation:106.7223,y:4.4},0).wait(1).to({rotation:107.4739},0).wait(1).to({rotation:108.2255,x:-11.65},0).wait(1).to({rotation:108.977,x:-11.6,y:4.35},0).wait(1).to({rotation:109.7286},0).wait(1).to({rotation:110.4802},0).wait(1).to({rotation:111.2317,y:4.4},0).wait(1).to({rotation:111.9833,x:-11.65,y:4.35},0).wait(1).to({rotation:112.7349},0).wait(1).to({rotation:113.4864,y:4.3},0).wait(1).to({rotation:114.238},0).wait(1).to({rotation:114.9896,y:4.25},0).wait(1).to({rotation:115.7411,y:4.35},0).wait(1).to({rotation:116.4927,y:4.3},0).wait(1).to({rotation:117.2443,x:-11.7},0).wait(1).to({rotation:117.9958,x:-11.65},0).wait(1).to({rotation:118.7474,y:4.25},0).wait(1).to({rotation:119.499},0).wait(1).to({rotation:120.2505},0).wait(1).to({scaleX:0.8056,rotation:121.0021,x:-11.7,y:4.3},0).wait(1).to({scaleX:0.8055,rotation:121.7537,x:-11.65,y:4.2},0).wait(1).to({rotation:122.5052,x:-11.7,y:4.25},0).wait(1).to({rotation:123.2568,x:-11.65,y:4.2},0).wait(1).to({rotation:124.0084},0).wait(1).to({rotation:124.7599},0).wait(1).to({rotation:125.5115,x:-11.7},0).wait(1).to({rotation:126.263,x:-11.65},0).wait(1).to({rotation:127.0146},0).wait(1).to({rotation:127.7662,x:-11.7,y:4.15},0).wait(1).to({rotation:128.5177,x:-11.65},0).wait(1).to({rotation:129.2693,x:-11.7},0).wait(1).to({rotation:130.0209},0).wait(1).to({rotation:130.7724,x:-11.65},0).wait(1).to({rotation:131.524,y:4.1},0).wait(1).to({rotation:132.2756},0).wait(1).to({rotation:133.0271,x:-11.7},0).wait(1).to({rotation:133.7787,x:-11.65,y:4.05},0).wait(1).to({rotation:134.5303,x:-11.7,y:4.1},0).wait(1).to({rotation:135.2818,x:-11.65},0).wait(1).to({rotation:136.0334,x:-11.7,y:4},0).wait(1).to({rotation:136.785,x:-11.65,y:3.95},0).wait(1).to({rotation:137.5365,x:-11.7,y:4},0).wait(1).to({rotation:138.2881},0).wait(1).to({rotation:139.0397,x:-11.65},0).wait(1).to({rotation:139.7912,y:3.95},0).wait(1).to({rotation:140.5428,y:4},0).wait(1).to({rotation:141.2944,x:-11.7},0).wait(1).to({rotation:142.0459,x:-11.6,y:3.95},0).wait(1).to({rotation:142.7975,x:-11.7},0).wait(1).to({rotation:143.5491,x:-11.65},0).wait(1).to({rotation:144.3006,y:3.9},0).wait(1).to({rotation:145.0522,y:3.95},0).wait(1).to({rotation:145.8038,y:3.9},0).wait(1).to({rotation:146.5553,y:3.85},0).wait(1).to({rotation:147.3069,y:3.9},0).wait(1).to({rotation:148.0585,x:-11.6},0).wait(1).to({rotation:148.81,x:-11.65},0).wait(1).to({rotation:149.5616,x:-11.6},0).wait(1).to({rotation:150.3132,x:-11.65,y:3.8},0).wait(1).to({scaleX:0.8056,rotation:151.0647,y:3.85},0).wait(1).to({rotation:151.8163,x:-11.6,y:3.8},0).wait(1).to({scaleX:0.8055,rotation:152.5678,y:3.85},0).wait(1).to({rotation:153.3194,y:3.8},0).wait(1).to({rotation:154.071,y:3.85},0).wait(1).to({rotation:154.8225,x:-11.65,y:3.8},0).wait(1).to({rotation:155.5741,x:-11.6},0).wait(1).to({rotation:156.3257},0).wait(1).to({rotation:157.0772},0).wait(1).to({rotation:157.8288,y:3.75},0).wait(1).to({rotation:158.5804},0).wait(1).to({rotation:159.3319,x:-11.55},0).wait(1).to({scaleX:0.8056,rotation:160.0835,x:-11.6},0).wait(1).to({rotation:160.8351},0).wait(1).to({scaleX:0.8055,rotation:161.5866},0).wait(1).to({scaleX:0.8056,rotation:162.3382,x:-11.55,y:3.7},0).wait(1).to({rotation:163.0898,x:-11.6,y:3.75},0).wait(1).to({rotation:163.8413,x:-11.55},0).wait(1).to({rotation:164.5929,y:3.7},0).wait(1).to({rotation:165.3445},0).wait(1).to({rotation:166.096},0).wait(1).to({scaleX:0.8055,rotation:166.8476},0).wait(1).to({rotation:167.5992,y:3.65},0).wait(1).to({scaleX:0.8056,rotation:168.3507},0).wait(1).to({rotation:169.1023},0).wait(1).to({rotation:169.8539,y:3.7},0).wait(1).to({rotation:170.6054,y:3.65},0).wait(1).to({rotation:171.357},0).wait(1).to({scaleX:0.8055,rotation:172.1086,x:-11.5,y:3.7},0).wait(1).to({rotation:172.8601,x:-11.55,y:3.6},0).wait(1).to({rotation:173.6117,y:3.65},0).wait(1).to({scaleX:0.8056,rotation:174.3633,x:-11.5,y:3.6},0).wait(1).to({rotation:175.1148,y:3.65},0).wait(1).to({rotation:175.8664,y:3.6},0).wait(1).to({rotation:176.618,x:-11.45},0).wait(1).to({scaleX:0.8055,rotation:177.3695,x:-11.5,y:3.65},0).wait(1).to({rotation:178.1211,x:-11.45},0).wait(1).to({scaleX:0.8056,rotation:178.8727,y:3.6},0).wait(1).to({rotation:179.6242},0).wait(1).to({rotation:180.3758,x:-11.5,y:3.55},0).wait(1).to({rotation:181.1273,x:-11.45},0).wait(1).to({scaleX:0.8055,rotation:181.8789},0).wait(1).to({rotation:182.6305},0).wait(1).to({scaleX:0.8056,rotation:183.382},0).wait(1).to({rotation:184.1336,x:-11.4,y:3.5},0).wait(1).to({rotation:184.8852,x:-11.45},0).wait(1).to({rotation:185.6367,x:-11.4,y:3.55},0).wait(1).to({scaleX:0.8055,rotation:186.3883},0).wait(1).to({rotation:187.1399,y:3.5},0).wait(1).to({rotation:187.8914},0).wait(1).to({scaleX:0.8056,rotation:188.643,y:3.55},0).wait(1).to({rotation:189.3946,y:3.5},0).wait(1).to({rotation:190.1461,x:-11.35,y:3.55},0).wait(1).to({rotation:190.8977,y:3.5},0).wait(1).to({rotation:191.6493,x:-11.4},0).wait(1).to({scaleX:0.8055,rotation:192.4008,x:-11.35},0).wait(1).to({rotation:193.1524},0).wait(1).to({scaleX:0.8056,rotation:193.904,y:3.45},0).wait(1).to({rotation:194.6555,y:3.5},0).wait(1).to({rotation:195.4071},0).wait(1).to({rotation:196.1587,x:-11.3,y:3.45},0).wait(1).to({rotation:196.9102},0).wait(1).to({rotation:197.6618,x:-11.25,y:3.5},0).wait(1).to({scaleX:0.8055,rotation:198.4134,x:-11.3,y:3.45},0).wait(1).to({scaleX:0.8056,rotation:199.1649,y:3.5},0).wait(1).to({rotation:199.9165,x:-11.25},0).wait(1).to({scaleX:0.8055,rotation:200.6681},0).wait(1).to({rotation:201.4196,y:3.45},0).wait(1).to({rotation:202.1712},0).wait(1).to({rotation:202.9228,x:-11.2},0).wait(1).to({rotation:203.6743,x:-11.25,y:3.4},0).wait(1).to({rotation:204.4259,x:-11.2,y:3.45},0).wait(1).to({rotation:205.1775,y:3.4},0).wait(1).to({rotation:205.929,x:-11.25},0).wait(1).to({rotation:206.6806,x:-11.2,y:3.45},0).wait(1).to({rotation:207.4322},0).wait(1).to({scaleX:0.8056,rotation:208.1837,x:-11.15,y:3.4},0).wait(1).to({rotation:208.9353,y:3.45},0).wait(1).to({scaleX:0.8055,rotation:209.6868,x:-11.2},0).wait(1).to({rotation:210.4384,x:-11.15,y:3.4},0).wait(1).to({rotation:211.19},0).wait(1).to({rotation:211.9415},0).wait(1).to({rotation:212.6931,y:3.45},0).wait(1).to({rotation:213.4447,x:-11.1,y:3.4},0).wait(1).to({rotation:214.1962,x:-11.15,y:3.45},0).wait(1).to({rotation:214.9478,y:3.4},0).wait(1).to({rotation:215.6994,x:-11.1},0).wait(1).to({rotation:216.4509},0).wait(1).to({rotation:217.2025,y:3.45},0).wait(1).to({rotation:217.9541,x:-11.05,y:3.4},0).wait(1).to({rotation:218.7056,y:3.45},0).wait(1).to({rotation:219.4572,y:3.4},0).wait(1).to({rotation:220.2088,x:-11.1},0).wait(1).to({rotation:220.9603},0).wait(1).to({rotation:221.7119,x:-11.05},0).wait(1).to({rotation:222.4635},0).wait(1).to({rotation:223.215},0).wait(1).to({rotation:223.9666,x:-11,y:3.45},0).wait(1).to({rotation:224.7182,x:-10.95,y:3.4},0).wait(1).to({rotation:225.4697},0).wait(1).to({rotation:226.2213,y:3.45},0).wait(1).to({rotation:226.9729,x:-10.9,y:3.35},0).wait(1).to({rotation:227.7244,x:-10.85,y:3.4},0).wait(1).to({rotation:228.476,x:-10.9},0).wait(1).to({rotation:229.2276},0).wait(1).to({rotation:229.9791,x:-10.85,y:3.45},0).wait(1).to({rotation:230.7307,y:3.4},0).wait(1).to({rotation:231.4823},0).wait(1).to({rotation:232.2338},0).wait(1).to({rotation:232.9854,y:3.45},0).wait(1).to({rotation:233.737,y:3.4},0).wait(1).to({rotation:234.4885},0).wait(1).to({rotation:235.2401,x:-10.8,y:3.45},0).wait(1).to({rotation:235.9916,x:-10.85},0).wait(1).to({rotation:236.7432,x:-10.8},0).wait(1).to({rotation:237.4948},0).wait(1).to({rotation:238.2463},0).wait(1).to({scaleX:0.8056,rotation:238.9979},0).wait(1).to({scaleX:0.8055,rotation:239.7495,y:3.4},0).wait(1).to({rotation:240.501,x:-10.7,y:3.45},0).wait(1).to({rotation:241.2526,x:-10.8},0).wait(1).to({rotation:242.0042,x:-10.75,y:3.5},0).wait(1).to({rotation:242.7557,y:3.45},0).wait(1).to({rotation:243.5073,x:-10.7},0).wait(1).to({rotation:244.2589},0).wait(1).to({rotation:245.0104},0).wait(1).to({rotation:245.762,x:-10.75,y:3.4},0).wait(1).to({rotation:246.5136,x:-10.7,y:3.5},0).wait(1).to({rotation:247.2651},0).wait(1).to({rotation:248.0167,y:3.45},0).wait(1).to({rotation:248.7683,y:3.5},0).wait(1).to({rotation:249.5198,x:-10.65,y:3.45},0).wait(1).to({rotation:250.2714,y:3.5},0).wait(1).to({rotation:251.023},0).wait(1).to({rotation:251.7745,y:3.45},0).wait(1).to({rotation:252.5261,x:-10.6,y:3.55},0).wait(1).to({rotation:253.2777,y:3.5},0).wait(1).to({scaleX:0.8056,rotation:254.0292},0).wait(1).to({rotation:254.7808},0).wait(1).to({rotation:255.5324},0).wait(1).to({rotation:256.2839},0).wait(1).to({rotation:257.0355,y:3.55},0).wait(1).to({scaleX:0.8055,rotation:257.7871,y:3.5},0).wait(1).to({rotation:258.5386,y:3.55},0).wait(1).to({rotation:259.2902},0).wait(1).to({rotation:260.0418,x:-10.55},0).wait(1).to({scaleX:0.8056,rotation:260.7933},0).wait(1).to({rotation:261.5449,x:-10.6},0).wait(1).to({rotation:262.2965,x:-10.55},0).wait(1).to({scaleX:0.8055,rotation:263.048,y:3.6},0).wait(1).to({rotation:263.7996,y:3.55},0).wait(1).to({rotation:264.5511,y:3.6},0).wait(1).to({scaleX:0.8056,rotation:265.3027},0).wait(1).to({rotation:266.0543,x:-10.5,y:3.55},0).wait(1).to({rotation:266.8058,y:3.6},0).wait(1).to({rotation:267.5574},0).wait(1).to({scaleX:0.8055,rotation:268.309,y:3.65},0).wait(1).to({rotation:269.0605,y:3.6},0).wait(1).to({rotation:269.8121},0).wait(1).to({scaleX:0.8056,rotation:270.5637},0).wait(1).to({rotation:271.3152,y:3.65},0).wait(1).to({rotation:272.0668},0).wait(1).to({scaleX:0.8055,rotation:272.8184},0).wait(1).to({rotation:273.5699},0).wait(1).to({rotation:274.3215,x:-10.45},0).wait(1).to({scaleX:0.8056,rotation:275.0731},0).wait(1).to({rotation:275.8246,y:3.7},0).wait(1).to({rotation:276.5762},0).wait(1).to({scaleX:0.8055,rotation:277.3278},0).wait(1).to({rotation:278.0793},0).wait(1).to({rotation:278.8309,x:-10.4},0).wait(1).to({rotation:279.5825},0).wait(1).to({scaleX:0.8056,rotation:280.334},0).wait(1).to({rotation:281.0856,y:3.75},0).wait(1).to({rotation:281.8372,y:3.7},0).wait(1).to({rotation:282.5887,y:3.75},0).wait(1).to({scaleX:0.8055,rotation:283.3403,x:-10.45},0).wait(1).to({rotation:284.0919,x:-10.4},0).wait(1).to({rotation:284.8434,x:-10.35},0).wait(1).to({rotation:285.595,x:-10.4},0).wait(1).to({rotation:286.3466,x:-10.35},0).wait(1).to({rotation:287.0981},0).wait(1).to({scaleX:0.8056,rotation:287.8497,y:3.85},0).wait(1).to({rotation:288.6013,x:-10.4,y:3.8},0).wait(1).to({rotation:289.3528},0).wait(1).to({scaleX:0.8055,rotation:290.1044},0).wait(1).to({scaleX:0.8056,rotation:290.8559,x:-10.35},0).wait(1).to({scaleX:0.8055,rotation:291.6075,y:3.85},0).wait(1).to({rotation:292.3591,x:-10.4},0).wait(1).to({scaleX:0.8056,rotation:293.1106},0).wait(1).to({scaleX:0.8055,rotation:293.8622,x:-10.35},0).wait(1).to({scaleX:0.8056,rotation:294.6138,y:3.9},0).wait(1).to({rotation:295.3653,y:3.85},0).wait(1).to({rotation:296.1169,y:3.9},0).wait(1).to({scaleX:0.8055,rotation:296.8685,x:-10.3,y:3.85},0).wait(1).to({scaleX:0.8056,rotation:297.62,x:-10.35,y:3.9},0).wait(1).to({scaleX:0.8055,rotation:298.3716},0).wait(1).to({rotation:299.1232,y:3.85},0).wait(1);
	this.timeline.addTween(_tweenStr_0.to({rotation:299.8747,x:-10.3,y:3.95},0).wait(1).to({rotation:300.6263},0).wait(1).to({rotation:301.3779,x:-10.35},0).wait(1).to({rotation:302.1294,x:-10.3},0).wait(1).to({rotation:302.881,x:-10.35},0).wait(1).to({rotation:303.6326,x:-10.3},0).wait(1).to({rotation:304.3841},0).wait(1).to({rotation:305.1357,y:4},0).wait(1).to({rotation:305.8873},0).wait(1).to({rotation:306.6388},0).wait(1).to({rotation:307.3904},0).wait(1).to({rotation:308.142},0).wait(1).to({rotation:308.8935},0).wait(1).to({rotation:309.6451,x:-10.35,y:4.05},0).wait(1).to({rotation:310.3967,x:-10.3,y:4},0).wait(1).to({rotation:311.1482,x:-10.35,y:4.1},0).wait(1).to({rotation:311.8998,x:-10.3,y:4.05},0).wait(1).to({rotation:312.6514,x:-10.35},0).wait(1).to({rotation:313.4029,x:-10.3},0).wait(1).to({rotation:314.1545},0).wait(1).to({rotation:314.9061,y:4.1},0).wait(1).to({rotation:315.6576,y:4.05},0).wait(1).to({rotation:316.4092,x:-10.35,y:4.1},0).wait(1).to({rotation:317.1608,x:-10.3},0).wait(1).to({rotation:317.9123,y:4.2},0).wait(1).to({rotation:318.6639,y:4.15},0).wait(1).to({rotation:319.4154,x:-10.35,y:4.2},0).wait(1).to({rotation:320.167},0).wait(1).to({rotation:320.9186},0).wait(1).to({rotation:321.6701,x:-10.3,y:4.25},0).wait(1).to({rotation:322.4217,x:-10.35,y:4.2},0).wait(1).to({rotation:323.1733,x:-10.3,y:4.25},0).wait(1).to({rotation:323.9248},0).wait(1).to({rotation:324.6764,x:-10.35},0).wait(1).to({rotation:325.428},0).wait(1).to({rotation:326.1795,y:4.3},0).wait(1).to({rotation:326.9311,y:4.25},0).wait(1).to({rotation:327.6827,x:-10.3},0).wait(1).to({rotation:328.4342,y:4.3},0).wait(1).to({rotation:329.1858,x:-10.35},0).wait(1).to({rotation:329.9374,y:4.25},0).wait(1).to({rotation:330.6889,y:4.3},0).wait(1).to({rotation:331.4405,x:-10.4},0).wait(1).to({rotation:332.1921,x:-10.35},0).wait(1).to({rotation:332.9436,y:4.35},0).wait(1).to({scaleX:0.8056,rotation:333.6952,y:4.3},0).wait(1).to({scaleX:0.8055,rotation:334.4468},0).wait(1).to({scaleX:0.8056,rotation:335.1983,y:4.4},0).wait(1).to({rotation:335.9499,x:-10.4,y:4.35},0).wait(1).to({scaleX:0.8055,rotation:336.7015,y:4.4},0).wait(1).to({rotation:337.453,y:4.35},0).wait(1).to({rotation:338.2046,y:4.4},0).wait(1).to({scaleX:0.8056,rotation:338.9562,y:4.45},0).wait(1).to({scaleX:0.8055,rotation:339.7077},0).wait(1).to({scaleX:0.8056,rotation:340.4593},0).wait(1).to({rotation:341.2109,x:-10.45},0).wait(1).to({scaleX:0.8055,rotation:341.9624,x:-10.4,y:4.4},0).wait(1).to({rotation:342.714,y:4.45},0).wait(1).to({rotation:343.4656},0).wait(1).to({rotation:344.2171},0).wait(1).to({rotation:344.9687},0).wait(1).to({rotation:345.7203,y:4.5},0).wait(1).to({scaleX:0.8056,rotation:346.4718},0).wait(1).to({rotation:347.2234},0).wait(1).to({rotation:347.9749},0).wait(1).to({scaleX:0.8055,rotation:348.7265},0).wait(1).to({rotation:349.4781,x:-10.45},0).wait(1).to({rotation:350.2296,x:-10.5},0).wait(1).to({rotation:350.9812,x:-10.45,y:4.55},0).wait(1).to({scaleX:0.8056,rotation:351.7328,x:-10.5,y:4.5},0).wait(1).to({rotation:352.4843,x:-10.45,y:4.55},0).wait(1).to({rotation:353.2359},0).wait(1).to({scaleX:0.8055,rotation:353.9875},0).wait(1).to({rotation:354.739,x:-10.5},0).wait(1).to({rotation:355.4906},0).wait(1).to({scaleX:0.8056,rotation:356.2422,x:-10.45},0).wait(1).to({rotation:356.9937,x:-10.5},0).wait(1).to({rotation:357.7453,y:4.6},0).wait(1).to({rotation:358.4969},0).wait(1).to({scaleX:0.8055,rotation:359.2484},0).wait(1).to({rotation:360,x:-10.55,y:4.55},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-207.5,-182.5,393.9,374);


// stage content:
(lib.loading = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {buttonfinal:11,start:20};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,9,19,20,21,58,95,133,173,209,246,284,304,324,364,404,439,459,479,519,559,596,609,632,672,707,749,769,786,824,1785];
	this.streamSoundSymbolsList[20] = [{id:"sburban",startFrame:20,endFrame:1784,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_9 = function() {
		var _this = this;
		this.playbutton.addEventListener("click", startmovie.bind(this));
		
		function startmovie()
		{
		_this.gotoAndPlay('start');
		}
	}
	this.frame_19 = function() {
		this.gotoAndPlay('buttonfinal');
	}
	this.frame_20 = function() {
		var soundInstance = playSound("sburban",0);
		this.InsertIntoSoundStreamData(soundInstance,20,1784,1);
		this.skiport.stop();
	}
	this.frame_21 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('drumhit');
	}
	this.frame_58 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('drumhit');
	}
	this.frame_95 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('drumhit');
	}
	this.frame_133 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('drumhit');
	}
	this.frame_173 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('drumhit');
	}
	this.frame_209 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('drumhit');
	}
	this.frame_246 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('pian1');
	}
	this.frame_284 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('pian1');
	}
	this.frame_304 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('pian2');
	}
	this.frame_324 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('pian3');
	}
	this.frame_364 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('pian4');
	}
	this.frame_404 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('pian2');
		_this.skiport2.inner.gotoAndPlay('pian2');
	}
	this.frame_439 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('pian1');
		_this.skiport2.inner.gotoAndPlay('pian1');
	}
	this.frame_459 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('pian2');
		_this.skiport2.inner.gotoAndPlay('pian2');
	}
	this.frame_479 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('pian4');
		_this.skiport2.inner.gotoAndPlay('pian4');
	}
	this.frame_519 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('pian2');
		_this.skiport2.inner.gotoAndPlay('pian2');
	}
	this.frame_559 = function() {
		var _this = this; 
		_this.skiport.inner.gotoAndPlay('pian3');
	}
	this.frame_596 = function() {
		this.skiport.inner.gotoAndPlay('pian3');
	}
	this.frame_609 = function() {
		this.skiport.inner.gotoAndPlay('drumhit');
	}
	this.frame_632 = function() {
		this.skiport.inner.gotoAndPlay('pian4');
	}
	this.frame_672 = function() {
		this.skiport.inner.gotoAndPlay('pian3');
	}
	this.frame_707 = function() {
		this.skiport.inner.gotoAndPlay('pian1');
	}
	this.frame_749 = function() {
		this.skiport.inner.gotoAndPlay('drumhit');
	}
	this.frame_769 = function() {
		this.skiport.inner.gotoAndPlay('pian1');
	}
	this.frame_786 = function() {
		this.skiport.inner.gotoAndPlay('pian4');
	}
	this.frame_824 = function() {
		this.skiport.inner.gotoAndPlay('fag1');
	}
	this.frame_1785 = function() {
		createjs.Sound.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9).call(this.frame_9).wait(10).call(this.frame_19).wait(1).call(this.frame_20).wait(1).call(this.frame_21).wait(37).call(this.frame_58).wait(37).call(this.frame_95).wait(38).call(this.frame_133).wait(40).call(this.frame_173).wait(36).call(this.frame_209).wait(37).call(this.frame_246).wait(38).call(this.frame_284).wait(20).call(this.frame_304).wait(20).call(this.frame_324).wait(40).call(this.frame_364).wait(40).call(this.frame_404).wait(35).call(this.frame_439).wait(20).call(this.frame_459).wait(20).call(this.frame_479).wait(40).call(this.frame_519).wait(40).call(this.frame_559).wait(37).call(this.frame_596).wait(13).call(this.frame_609).wait(23).call(this.frame_632).wait(40).call(this.frame_672).wait(35).call(this.frame_707).wait(42).call(this.frame_749).wait(20).call(this.frame_769).wait(17).call(this.frame_786).wait(38).call(this.frame_824).wait(961).call(this.frame_1785).wait(34));

	// nomouse
	this.instance = new lib.nocursor();
	this.instance.setTransform(73.2,-72.95,1,1,0,0,0,-226.4,-81.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20).to({_off:false},0).wait(1799));

	// loading_bar
	this.instance_1 = new lib.loadingguibar("synched",0);
	this.instance_1.setTransform(252.1,748.3,0.0433,1,0,0,0,136.4,86.1);
	this.instance_1._off = true;

	
	var _tweenStr_1 = cjs.Tween.get(this.instance_1).wait(95).to({_off:false},0).wait(1).to({regX:137.5,regY:85.9,scaleX:0.0512,x:213.25,y:514.85},0).wait(1).to({scaleX:0.0592,x:174.35,y:281.6},0).wait(1).to({scaleX:0.0598,x:174.4},0).wait(1).to({scaleX:0.0603,x:174.45},0).wait(1).to({scaleX:0.0609,x:174.5},0).wait(1).to({scaleX:0.0615,x:174.55},0).wait(1).to({scaleX:0.062,x:174.6,y:281.65},0).wait(1).to({scaleX:0.0626,x:174.65},0).wait(1).to({scaleX:0.0631,x:174.75},0).wait(1).to({scaleX:0.0637},0).wait(1).to({scaleX:0.0642,x:174.85},0).wait(1).to({scaleX:0.0648,x:174.9,y:281.7},0).wait(1).to({scaleX:0.0654,x:174.95},0).wait(1).to({scaleX:0.0659,x:175},0).wait(1).to({scaleX:0.0665,x:175.05},0).wait(1).to({scaleX:0.067,x:175.1,y:281.75},0).wait(1).to({scaleX:0.0676,x:175.15},0).wait(1).to({scaleX:0.0681,x:175.2},0).wait(1).to({scaleX:0.0687,x:175.3},0).wait(1).to({scaleX:0.0693},0).wait(1).to({scaleX:0.0698,x:175.4,y:281.8},0).wait(1).to({scaleX:0.0704,x:175.45},0).wait(1).to({scaleX:0.0709,x:175.5},0).wait(1).to({scaleX:0.0715,x:175.55},0).wait(1).to({scaleX:0.0721,x:175.6},0).wait(1).to({scaleX:0.0726,x:175.65,y:281.85},0).wait(1).to({scaleX:0.0732,x:175.7},0).wait(1).to({scaleX:0.0737,x:175.8},0).wait(1).to({scaleX:0.0743},0).wait(1).to({scaleX:0.0748,x:175.9,y:281.9},0).wait(1).to({scaleX:0.0754},0).wait(1).to({scaleX:0.076,x:176},0).wait(1).to({scaleX:0.0765},0).wait(1).to({scaleX:0.0771,x:176.1},0).wait(1).to({scaleX:0.0776,x:176.15,y:281.95},0).wait(1).to({scaleX:0.0782,x:176.2},0).wait(1).to({scaleX:0.0787,x:176.3},0).wait(1).to({scaleX:0.0793},0).wait(1).to({scaleX:0.0799,x:176.4},0).wait(1).to({scaleX:0.0804,y:282},0).wait(1).to({scaleX:0.081,x:176.5},0).wait(1).to({scaleX:0.0815,x:176.55},0).wait(1).to({scaleX:0.0821,x:176.6},0).wait(1).to({scaleX:0.0827,x:176.65,y:282.05},0).wait(1).to({scaleX:0.0832,x:176.7},0).wait(1).to({scaleX:0.0838,x:176.75},0).wait(1).to({scaleX:0.0843,x:176.8},0).wait(1).to({scaleX:0.0849,x:176.85},0).wait(1).to({scaleX:0.0854,x:176.9,y:282.1},0).wait(1).to({scaleX:0.086,x:176.95},0).wait(1).to({scaleX:0.0866,x:177.05},0).wait(1).to({scaleX:0.0871,x:177.1},0).wait(1).to({scaleX:0.0877,x:177.15},0).wait(1).to({scaleX:0.0882,x:177.2,y:282.15},0).wait(1).to({scaleX:0.0888,x:177.25},0).wait(1).to({scaleX:0.0894,x:177.3},0).wait(1).to({scaleX:0.0899,x:177.35},0).wait(1).to({scaleX:0.0905,x:177.45,y:282.2},0).wait(1).to({scaleX:0.091},0).wait(1).to({scaleX:0.0916,x:177.55},0).wait(1).to({scaleX:0.0921},0).wait(1).to({scaleX:0.0927,x:177.65},0).wait(1).to({scaleX:0.0933,y:282.25},0).wait(1).to({scaleX:0.0938,x:177.75},0).wait(1).to({scaleX:0.0944},0).wait(1).to({scaleX:0.0949,x:177.85},0).wait(1).to({scaleX:0.0955,x:177.95},0).wait(1).to({scaleX:0.096,y:282.3},0).wait(1).to({scaleX:0.0966,x:178.05},0).wait(1).to({scaleX:0.0972},0).wait(1).to({scaleX:0.0977,x:178.15},0).wait(1).to({scaleX:0.0983,y:282.35},0).wait(1).to({scaleX:0.0988,x:178.25},0).wait(1).to({scaleX:0.0994,x:178.3},0).wait(1).to({scaleX:0.1,x:178.35},0).wait(1).to({scaleX:0.1005,x:178.4},0).wait(1).to({scaleX:0.1011,x:178.45,y:282.4},0).wait(1).to({scaleX:0.1016,x:178.5},0).wait(1).to({scaleX:0.1022,x:178.55},0).wait(1).to({scaleX:0.1027,x:178.65},0).wait(1).to({scaleX:0.1033},0).wait(1).to({scaleX:0.1039,x:178.75,y:282.45},0).wait(1).to({scaleX:0.1044,x:178.8},0).wait(1).to({scaleX:0.105,x:178.85},0).wait(1).to({scaleX:0.1055,x:178.9},0).wait(1).to({scaleX:0.1061,x:178.95,y:282.5},0).wait(1).to({scaleX:0.1066,x:179},0).wait(1).to({scaleX:0.1072,x:179.05},0).wait(1).to({scaleX:0.1078,x:179.1},0).wait(1).to({scaleX:0.1083,x:179.2},0).wait(1).to({scaleX:0.1089,y:282.55},0).wait(1).to({scaleX:0.1094,x:179.3},0).wait(1).to({scaleX:0.11},0).wait(1).to({scaleX:0.1106,x:179.4},0).wait(1).to({scaleX:0.1111,x:179.45,y:282.6},0).wait(1).to({scaleX:0.1117,x:179.5},0).wait(1).to({scaleX:0.1122,x:179.6},0).wait(1).to({scaleX:0.1128},0).wait(1).to({scaleX:0.1133,x:179.7},0).wait(1).to({scaleX:0.1139,y:282.65},0).wait(1).to({scaleX:0.1145,x:179.8},0).wait(1).to({scaleX:0.115},0).wait(1).to({scaleX:0.1156,x:179.9},0).wait(1).to({scaleX:0.1161},0).wait(1).to({scaleX:0.1167,x:180,y:282.7},0).wait(1).to({scaleX:0.1173,x:180.05},0).wait(1).to({scaleX:0.1178,x:180.1},0).wait(1).to({scaleX:0.1184,x:180.15},0).wait(1).to({scaleX:0.1189,x:180.2,y:282.75},0).wait(1).to({scaleX:0.1195,x:180.3},0).wait(1).to({scaleX:0.12},0).wait(1).to({scaleX:0.1206,x:180.4},0).wait(1).to({scaleX:0.1212,x:180.45},0).wait(1).to({scaleX:0.1217,x:180.5,y:282.8},0).wait(1).to({scaleX:0.1223,x:180.55},0).wait(1).to({scaleX:0.1228,x:180.6},0).wait(1).to({scaleX:0.1234,x:180.65},0).wait(1).to({scaleX:0.1239,x:180.7},0).wait(1).to({scaleX:0.1245,x:180.75,y:282.85},0).wait(1).to({scaleX:0.1251,x:180.8},0).wait(1).to({scaleX:0.1256,x:180.85},0).wait(1).to({scaleX:0.1262,x:180.95},0).wait(1).to({scaleX:0.1267,y:282.9},0).wait(1).to({scaleX:0.1273,x:181.05},0).wait(1).to({scaleX:0.1279,x:181.1},0).wait(1).to({scaleX:0.1284,x:181.15},0).wait(1).to({scaleX:0.129,x:181.2},0).wait(1).to({scaleX:0.1295,x:181.25,y:282.95},0).wait(1).to({scaleX:0.1301,x:181.35},0).wait(1).to({scaleX:0.1306},0).wait(1).to({scaleX:0.1312,x:181.45},0).wait(1).to({scaleX:0.1318},0).wait(1).to({scaleX:0.1323,x:181.55,y:283},0).wait(1).to({scaleX:0.1329},0).wait(1).to({scaleX:0.1334,x:181.65},0).wait(1).to({scaleX:0.134,x:181.7},0).wait(1).to({scaleX:0.1345,x:181.75,y:283.05},0).wait(1).to({scaleX:0.1351,x:181.85},0).wait(1).to({scaleX:0.1357},0).wait(1).to({scaleX:0.1362,x:181.95},0).wait(1).to({scaleX:0.1368},0).wait(1).to({scaleX:0.1373,x:182.05,y:283.1},0).wait(1).to({scaleX:0.1379},0).wait(1).to({scaleX:0.1385,x:182.15},0).wait(1).to({scaleX:0.139,x:182.2},0).wait(1).to({scaleX:0.1396,x:182.25},0).wait(1).to({scaleX:0.1401,x:182.3,y:283.15},0).wait(1).to({scaleX:0.1407,x:182.35},0).wait(1).to({scaleX:0.1412,x:182.4},0).wait(1).to({scaleX:0.1418,x:182.45},0).wait(1).to({scaleX:0.1424,x:182.5,y:283.2},0).wait(1).to({scaleX:0.1429,x:182.6},0).wait(1).to({scaleX:0.1435,x:182.65},0).wait(1).to({scaleX:0.144,x:182.7},0).wait(1).to({scaleX:0.1446,x:182.75},0).wait(1).to({scaleX:0.1452,x:182.8,y:283.25},0).wait(1).to({scaleX:0.1457,x:182.85},0).wait(1).to({scaleX:0.1463,x:182.9},0).wait(1).to({scaleX:0.1468,x:182.95},0).wait(1).to({scaleX:0.1474,x:183},0).wait(1).to({scaleX:0.1479,x:183.1,y:283.3},0).wait(1).to({scaleX:0.1485},0).wait(1).to({scaleX:0.1491,x:183.2},0).wait(1).to({scaleX:0.1496},0).wait(1).to({scaleX:0.1502,x:183.3,y:283.35},0).wait(1).to({scaleX:0.1507},0).wait(1).to({scaleX:0.1513,x:183.4},0).wait(1).to({scaleX:0.1518,x:183.5},0).wait(1).to({scaleX:0.1524},0).wait(1).to({scaleX:0.153,x:183.6,y:283.4},0).wait(1).to({scaleX:0.1535},0).wait(1).to({scaleX:0.1541,x:183.7},0).wait(1).to({scaleX:0.1546},0).wait(1).to({scaleX:0.1552,x:183.8},0).wait(1).to({scaleX:0.1558,y:283.45},0).wait(1).to({scaleX:0.1563,x:183.9},0).wait(1).to({scaleX:0.1569,x:183.95},0).wait(1).to({scaleX:0.1574,x:184},0).wait(1).to({scaleX:0.158,x:184.05,y:283.5},0).wait(1).to({scaleX:0.1585,x:184.1},0).wait(1).to({scaleX:0.1591,x:184.15},0).wait(1).to({scaleX:0.1597,x:184.2},0).wait(1).to({scaleX:0.1602,x:184.3},0).wait(1).to({scaleX:0.1608,x:184.35,y:283.55},0).wait(1).to({scaleX:0.1613,x:184.4},0).wait(1).to({scaleX:0.1619,x:184.45},0).wait(1).to({scaleX:0.1624,x:184.5},0).wait(1).to({scaleX:0.163,x:184.55,y:283.6},0).wait(1).to({scaleX:0.2726,scaleY:1.6682,x:134.5,y:337.9},0).wait(1).to({scaleX:0.2734,x:134.55},0).wait(1).to({scaleX:0.2742,x:134.65},0).wait(1).to({scaleX:0.275,x:134.7},0).wait(1).to({scaleX:0.2758,x:134.8},0).wait(1).to({scaleX:0.2766,x:134.9},0).wait(1).to({scaleX:0.2774,x:135},0).wait(1).to({scaleX:0.2782,x:135.05},0).wait(1).to({scaleX:0.279,x:135.1},0).wait(1).to({scaleX:0.2799,x:135.25},0).wait(1).to({scaleX:0.2807,x:135.3},0).wait(1).to({scaleX:0.2815,x:135.4},0).wait(1).to({scaleX:0.2823,x:135.45},0).wait(1).to({scaleX:0.2831,x:135.5},0).wait(1).to({scaleX:0.2839,x:135.65},0).wait(1).to({scaleX:0.2847,x:135.7},0).wait(1).to({scaleX:0.2855,x:135.8},0).wait(1).to({scaleX:0.2863,x:135.85},0).wait(1).to({scaleX:0.2871,x:136},0).wait(1).to({scaleX:0.2879,x:136.05},0).wait(1).to({scaleX:0.2888,x:136.1},0).wait(1).to({scaleX:0.2896,x:136.2},0).wait(1).to({scaleX:0.2904,x:136.25},0).wait(1).to({scaleX:0.2912,x:136.4},0).wait(1).to({scaleX:0.292,x:136.45},0).wait(1).to({scaleX:0.2928,x:136.55},0).wait(1).to({scaleX:0.2936,x:136.6},0).wait(1).to({scaleX:0.2944,x:136.7},0).wait(1).to({scaleX:0.2952,x:136.8},0).wait(1).to({scaleX:0.296,x:136.85},0).wait(1).to({scaleX:0.2968,x:136.95},0).wait(1).to({scaleX:0.2977,x:137.05},0).wait(1).to({scaleX:0.2985,x:137.15},0).wait(1).to({scaleX:0.2993,x:137.2},0).wait(1).to({scaleX:0.3001,x:137.25,y:337.95},0).wait(1).to({scaleX:0.3009,x:137.35},0).wait(1).to({scaleX:0.3017,x:137.45},0).wait(1).to({scaleX:0.3025,x:137.55},0).wait(1).to({scaleX:0.3033,x:137.6},0).wait(1).to({scaleX:0.3041,x:137.7},0).wait(1).to({scaleX:0.3049,x:137.8},0).wait(1).to({scaleX:0.3057,x:137.85},0).wait(1).to({scaleX:0.3066,x:137.95},0).wait(1).to({scaleX:0.3074,x:138},0).wait(1).to({scaleX:0.3082,x:138.1},0).wait(1).to({scaleX:0.309,x:138.2},0).wait(1).to({scaleX:0.3098,x:138.3},0).wait(1).to({scaleX:0.3106,x:138.35},0).wait(1).to({scaleX:0.3114,x:138.4},0).wait(1).to({scaleX:0.3122,x:138.55},0).wait(1).to({scaleX:0.313,x:138.6},0).wait(1).to({scaleX:0.3138,x:138.7},0).wait(1).to({scaleX:0.3146,x:138.75},0).wait(1).to({scaleX:0.3155,x:138.85},0).wait(1).to({scaleX:0.3163,x:138.95},0).wait(1).to({scaleX:0.3171,x:139},0).wait(1).to({scaleX:0.3179,x:139.1},0).wait(1).to({scaleX:0.3187,x:139.15},0).wait(1).to({scaleX:0.3195,x:139.3},0).wait(1).to({scaleX:0.3203,x:139.35},0).wait(1).to({scaleX:0.3211,x:139.45},0).wait(1).to({scaleX:0.3219,x:139.5},0).wait(1).to({scaleX:0.3227,x:139.55},0).wait(1).to({scaleX:0.3235,x:139.7},0).wait(1).to({scaleX:0.3244,x:139.75},0).wait(1).to({scaleX:0.3252,x:139.85},0).wait(1).to({scaleX:0.326,x:139.9},0).wait(1).to({scaleX:0.3268,x:140.05},0).wait(1).to({scaleX:0.3276,x:140.1},0).wait(1).to({scaleX:0.3284,x:140.15},0).wait(1).to({scaleX:0.3292,x:140.25},0).wait(1).to({scaleX:0.33,x:140.35},0).wait(1).to({scaleX:0.3308,x:140.45},0).wait(1).to({scaleX:0.3316,x:140.5},0).wait(1).to({scaleX:0.3324,x:140.6},0).wait(1).to({scaleX:0.3333,x:140.65},0).wait(1).to({scaleX:0.3341,x:140.75},0).wait(1).to({scaleX:0.3349,x:140.85},0).wait(1).to({scaleX:0.3357,x:140.9},0).wait(1).to({scaleX:0.3365,x:141},0).wait(1).to({scaleX:0.3373,x:141.1},0).wait(1).to({scaleX:0.3381,x:141.2},0).wait(1).to({scaleX:0.3389,x:141.25,y:338},0).wait(1).to({scaleX:0.3397,x:141.3},0).wait(1).to({scaleX:0.3405,x:141.4},0).wait(1).to({scaleX:0.3413,x:141.5},0).wait(1).to({scaleX:0.3422,x:141.6},0).wait(1).to({scaleX:0.343,x:141.65},0).wait(1).to({scaleX:0.3438,x:141.75},0).wait(1).to({scaleX:0.3446,x:141.85},0).wait(1).to({scaleX:0.3454,x:141.9},0).wait(1).to({scaleX:0.3462,x:142},0).wait(1).to({scaleX:0.347,x:142.05},0).wait(1).to({scaleX:0.3478,x:142.15},0).wait(1).to({scaleX:0.3486,x:142.25},0).wait(1).to({scaleX:0.3494,x:142.35},0).wait(1).to({scaleX:0.3502,x:142.4},0).wait(1).to({scaleX:0.3511,x:142.45},0).wait(1).to({scaleX:0.3519,x:142.6},0).wait(1).to({scaleX:0.3527,x:142.65},0).wait(1).to({scaleX:0.3535,x:142.75},0).wait(1).to({scaleX:0.3543,x:142.8},0).wait(1).to({scaleX:0.3551,x:142.9},0).wait(1).to({scaleX:0.3559,x:143},0).wait(1).to({scaleX:0.3567,x:143.05},0).wait(1).to({scaleX:0.3575,x:143.15},0).wait(1).to({scaleX:0.3583,x:143.2},0).wait(1).to({scaleX:0.3591,x:143.35},0).wait(1).to({scaleX:0.36,x:143.4},0).wait(1).to({scaleX:0.3608,x:143.5},0).wait(1).to({scaleX:0.3616,x:143.55},0).wait(1).to({scaleX:0.3624,x:143.65},0).wait(1).to({scaleX:0.3632,x:143.75},0).wait(1).to({scaleX:0.364,x:143.8},0).wait(1).to({scaleX:0.3648,x:143.9},0).wait(1).to({scaleX:0.3656,x:143.95},0).wait(1).to({scaleX:0.3664,x:144.1},0).wait(1).to({scaleX:0.3672,x:144.15},0).wait(1).to({scaleX:0.368,x:144.2},0).wait(1).to({scaleX:0.3689,x:144.3},0).wait(1).to({scaleX:0.3697,x:144.4},0).wait(1).to({scaleX:0.3705,x:144.5},0).wait(1).to({scaleX:0.3713,x:144.55},0).wait(1).to({scaleX:0.3721,x:144.6},0).wait(1).to({scaleX:0.3729,x:144.7},0).wait(1).to({scaleX:0.3737,x:144.8},0).wait(1).to({scaleX:0.3745,x:144.9},0).wait(1).to({scaleX:0.3753,x:144.95},0).wait(1).to({scaleX:0.3761,x:145.05},0).wait(1).to({scaleX:0.3769,x:145.15},0).wait(1).to({scaleX:0.3778,x:145.2},0).wait(1).to({scaleX:0.3786,x:145.3,y:338.05},0).wait(1).to({scaleX:0.3794,x:145.35},0).wait(1).to({scaleX:0.3802,x:145.45},0).wait(1).to({scaleX:0.381,x:145.55},0).wait(1).to({scaleX:0.3818,x:145.65},0).wait(1).to({scaleX:0.3826,x:145.7},0).wait(1).to({scaleX:0.3834,x:145.75},0).wait(1).to({scaleX:0.3842,x:145.9},0).wait(1).to({scaleX:0.385,x:145.95},0).wait(1).to({scaleX:0.3859,x:146.05},0).wait(1).to({scaleX:0.3867,x:146.1},0).wait(1).to({scaleX:0.3875,x:146.25},0).wait(1).to({scaleX:0.3883,x:146.3},0).wait(1).to({scaleX:0.3891,x:146.35},0).wait(1).to({scaleX:0.3899,x:146.45},0).wait(1).to({scaleX:0.3907,x:146.5},0).wait(1).to({scaleX:0.3915,x:146.65},0).wait(1).to({scaleX:0.3923,x:146.7},0).wait(1).to({scaleX:0.3931,x:146.8},0).wait(1).to({scaleX:0.3939,x:146.85},0).wait(1).to({scaleX:0.3948,x:146.95},0).wait(1).to({scaleX:0.3956,x:147.05},0).wait(1).to({scaleX:0.3964,x:147.1},0).wait(1).to({scaleX:0.3972,x:147.2},0).wait(1).to({scaleX:0.398,x:147.25},0).wait(1).to({scaleX:0.3988,x:147.4},0).wait(1).to({scaleX:0.3996,x:147.45},0).wait(1).to({scaleX:0.4004,x:147.5},0).wait(1).to({scaleX:0.4012,x:147.6},0).wait(1).to({scaleX:0.402,x:147.7},0).wait(1).to({scaleX:0.4028,x:147.8},0).wait(1).to({scaleX:0.4037,x:147.85},0).wait(1).to({scaleX:0.4045,x:147.95},0).wait(1).to({scaleX:0.4053,x:148},0).wait(1).to({scaleX:0.4061,x:148.1},0).wait(1).to({scaleX:0.4069,x:148.2},0).wait(1).to({scaleX:0.4077,x:148.25},0).wait(1).to({scaleX:0.4085,x:148.35},0).wait(1).to({scaleX:0.4093,x:148.45},0).wait(1).to({scaleX:0.4101,x:148.55},0).wait(1).to({scaleX:0.4109,x:148.6},0).wait(1).to({scaleX:0.4117,x:148.65},0).wait(1).to({scaleX:0.4126,x:148.8},0).wait(1).to({scaleX:0.4134,x:148.85},0).wait(1).to({scaleX:0.4142,x:148.95},0).wait(1).to({scaleX:0.415,x:149},0).wait(1).to({scaleX:0.4158,x:149.1},0).wait(1).to({scaleX:0.4166,x:149.2},0).wait(1).to({scaleX:0.4174,x:149.25,y:338.1},0).wait(1).to({scaleX:0.4182,x:149.35},0).wait(1).to({scaleX:0.419,x:149.4},0).wait(1).to({scaleX:0.4198,x:149.55},0).wait(1).to({scaleX:0.4206,x:149.6},0).wait(1).to({scaleX:0.4215,x:149.7},0).wait(1).to({scaleX:0.4223,x:149.75},0).wait(1).to({scaleX:0.4231,x:149.8},0).wait(1).to({scaleX:0.4239,x:149.95},0).wait(1).to({scaleX:0.4247,x:150},0).wait(1).to({scaleX:0.4255,x:150.1},0).wait(1).to({scaleX:0.4263,x:150.15},0).wait(1).to({scaleX:0.4271,x:150.3},0).wait(1).to({scaleX:0.4279,x:150.35},0).wait(1).to({scaleX:0.4287,x:150.4},0).wait(1).to({scaleX:0.4295,x:150.5},0).wait(1).to({scaleX:0.4304,x:150.55},0).wait(1).to({scaleX:0.4312,x:150.7},0).wait(1).to({scaleX:0.432,x:150.75},0).wait(1).to({scaleX:0.4328,x:150.85},0).wait(1).to({scaleX:0.4336,x:150.9},0).wait(1).to({scaleX:0.4344,x:151},0).wait(1).to({scaleX:0.4352,x:151.1},0).wait(1).to({scaleX:0.436,x:151.15},0).wait(1).to({scaleX:0.4368,x:151.25},0).wait(1).to({scaleX:0.4376,x:151.3},0).wait(1).to({scaleX:0.4384,x:151.45},0).wait(1).to({scaleX:0.4393,x:151.5},0).wait(1).to({scaleX:0.4401,x:151.55},0).wait(1).to({scaleX:0.4409,x:151.65},0).wait(1);
	var _tweenStr_2 = _tweenStr_1.to({scaleX:0.4417,x:151.75},0).wait(1).to({scaleX:0.4425,x:151.85},0).wait(1).to({scaleX:0.4433,x:151.9},0).wait(1).to({scaleX:0.4441,x:152},0).wait(1).to({scaleX:0.4449,x:152.1},0).wait(1).to({scaleX:0.4457,x:152.15},0).wait(1).to({scaleX:0.4465,x:152.25},0).wait(1).to({scaleX:0.4473,x:152.3},0).wait(1).to({scaleX:0.4482,x:152.4},0).wait(1).to({scaleX:0.449,x:152.5},0).wait(1).to({scaleX:0.4498,x:152.6},0).wait(1).to({scaleX:0.4506,x:152.65},0).wait(1).to({scaleX:0.4514,x:152.7},0).wait(1).to({scaleX:0.4522,x:152.85},0).wait(1).to({scaleX:0.453,x:152.9},0).wait(1).to({scaleX:0.4538,x:153},0).wait(1).to({scaleX:0.4546,x:153.05},0).wait(1).to({scaleX:0.4554,x:153.15},0).wait(1).to({scaleX:0.4562,x:153.25},0).wait(1).to({scaleX:0.4571,x:153.3,y:338.15},0).wait(1).to({scaleX:0.4579,x:153.4},0).wait(1).to({scaleX:0.4587,x:153.45},0).wait(1).to({scaleX:0.4595,x:153.6},0).wait(1).to({scaleX:0.4603,x:153.65},0).wait(1).to({scaleX:0.4611,x:153.7},0).wait(1).to({scaleX:0.4619,x:153.8},0).wait(1).to({scaleX:0.4627,x:153.85},0).wait(1).to({scaleX:0.4635,x:154},0).wait(1).to({scaleX:0.4643,x:154.05},0).wait(1).to({scaleX:0.4651,x:154.15},0).wait(1).to({scaleX:0.466,x:154.2},0).wait(1).to({scaleX:0.4668,x:154.3},0).wait(1).to({scaleX:0.4676,x:154.4},0).wait(1).to({scaleX:0.4684,x:154.45},0).wait(1).to({scaleX:0.4692,x:154.55},0).wait(1).to({scaleX:0.47,x:154.65},0).wait(1).to({scaleX:0.4708,x:154.75},0).wait(1).to({scaleX:0.4716,x:154.8},0).wait(1).to({scaleX:0.4724,x:154.85},0).wait(1).to({scaleX:0.4732,x:154.95},0).wait(1).to({scaleX:0.474,x:155.05},0).wait(1).to({scaleX:0.4749,x:155.15},0).wait(1).to({scaleX:0.4757,x:155.2},0).wait(1).to({scaleX:0.4765,x:155.3},0).wait(1).to({scaleX:0.4773,x:155.4},0).wait(1).to({scaleX:0.4781,x:155.45},0).wait(1).to({scaleX:0.4789,x:155.55},0).wait(1).to({scaleX:0.4797,x:155.6},0).wait(1).to({scaleX:0.4805,x:155.7},0).wait(1).to({scaleX:0.4813,x:155.8},0).wait(1).to({scaleX:0.4821,x:155.9},0).wait(1).to({scaleX:0.4829,x:155.95},0).wait(1).to({scaleX:0.4838,x:156},0).wait(1).to({scaleX:0.4846,x:156.15},0).wait(1).to({scaleX:0.4854,x:156.2},0).wait(1).to({scaleX:0.4862,x:156.3},0).wait(1).to({scaleX:0.487,x:156.35},0).wait(1).to({scaleX:0.4878,x:156.45},0).wait(1).to({scaleX:0.4886,x:156.55},0).wait(1).to({scaleX:0.4894,x:156.6},0).wait(1).to({scaleX:0.4902,x:156.7},0).wait(1).to({scaleX:0.491,x:156.75},0).wait(1).to({scaleX:0.4919,x:156.9},0).wait(1).to({scaleX:0.4927,x:156.95},0).wait(1).to({scaleX:0.4935,x:157.05},0).wait(1).to({scaleX:0.4943,x:157.1},0).wait(1).to({scaleX:0.4951,x:157.15},0).wait(1).to({scaleX:0.4959,x:157.3,y:338.2},0).wait(1).to({scaleX:0.4967,x:157.35},0).wait(1).to({scaleX:0.4975,x:157.45},0).wait(1).to({scaleX:0.4983,x:157.5},0).wait(1).to({scaleX:0.4991,x:157.65},0).wait(1).to({scaleX:0.4999,x:157.7},0).wait(1).to({scaleX:0.5008,x:157.75},0).wait(1).to({scaleX:0.5016,x:157.85},0).wait(1).to({scaleX:0.5024,x:157.95},0).wait(1).to({scaleX:0.5032,x:158.05},0).wait(1).to({scaleX:0.504,x:158.1},0).wait(1).to({scaleX:0.5048,x:158.2},0).wait(1).to({scaleX:0.5056,x:158.25},0).wait(1).to({scaleX:0.5064,x:158.35},0).wait(1).to({scaleX:0.5072,x:158.45},0).wait(1).to({scaleX:0.508,x:158.5},0).wait(1).to({scaleX:0.5088,x:158.6},0).wait(1).to({scaleX:0.5097,x:158.7},0).wait(1).to({scaleX:0.5105,x:158.8},0).wait(1).to({scaleX:0.5113,x:158.85},0).wait(1).to({scaleX:0.5121,x:158.9},0).wait(1).to({scaleX:0.5129,x:159},0).wait(1).to({scaleX:0.5137,x:159.1},0).wait(1).to({scaleX:0.5145,x:159.2},0).wait(1).to({scaleX:0.5153,x:159.25},0).wait(1).to({scaleX:0.5161,x:159.35},0).wait(1).to({scaleX:0.5169,x:159.45},0).wait(1).to({scaleX:0.5177,x:159.5},0).wait(1).to({scaleX:0.5186,x:159.6},0).wait(1).to({scaleX:0.5194,x:159.65},0).wait(1).to({scaleX:0.5202,x:159.75},0).wait(1).to({scaleX:0.521,x:159.85},0).wait(1).to({scaleX:0.5218,x:159.95},0).wait(1).to({scaleX:0.5226,x:160},0).wait(1).to({scaleX:0.5234,x:160.05},0).wait(1).to({scaleX:0.5242,x:160.2},0).wait(1).to({scaleX:0.525,x:160.25},0).wait(1).to({scaleX:0.5258,x:160.35},0).wait(1).to({scaleX:0.5266,x:160.4},0).wait(1).to({scaleX:0.5275,x:160.5},0).wait(1).to({scaleX:0.5283,x:160.6},0).wait(1).to({scaleX:0.5291,x:160.65},0).wait(1).to({scaleX:0.5299,x:160.75},0).wait(1).to({scaleX:0.5307,x:160.8},0).wait(1).to({scaleX:0.5315,x:160.95},0).wait(1).to({scaleX:0.5323,x:161},0).wait(1).to({scaleX:0.5331,x:161.1},0).wait(1).to({scaleX:0.5339,x:161.15},0).wait(1).to({scaleX:0.5347,x:161.25,y:338.25},0).wait(1).to({scaleX:0.5355,x:161.35},0).wait(1).to({scaleX:0.5364,x:161.4},0).wait(1).to({scaleX:0.5372,x:161.5},0).wait(1).to({scaleX:0.538,x:161.55},0).wait(1).to({scaleX:0.5388,x:161.7},0).wait(1).to({scaleX:0.5396,x:161.75},0).wait(1).to({scaleX:0.5404,x:161.8},0).wait(1).to({scaleX:0.5412,x:161.9},0).wait(1).to({scaleX:0.542,x:162},0).wait(1).to({scaleX:0.5428,x:162.1},0).wait(1).to({scaleX:0.5436,x:162.15},0).wait(1).to({scaleX:0.5444,x:162.25},0).wait(1).to({scaleX:0.5453,x:162.3},0).wait(1).to({scaleX:0.5461,x:162.4},0).wait(1).to({scaleX:0.5469,x:162.5},0).wait(1).to({scaleX:0.5477,x:162.55},0).wait(1).to({scaleX:0.5485,x:162.65},0).wait(1).to({scaleX:0.5493,x:162.75},0).wait(1).to({scaleX:0.5501,x:162.8},0).wait(1).to({scaleX:0.5509,x:162.9},0).wait(1).to({scaleX:0.5517,x:162.95},0).wait(1).to({scaleX:0.5525,x:163.05},0).wait(1).to({scaleX:0.5533,x:163.15},0).wait(1).to({scaleX:0.5542,x:163.25},0).wait(1).to({scaleX:0.555,x:163.3},0).wait(1).to({scaleX:0.5558,x:163.35},0).wait(1).to({scaleX:0.5566,x:163.5},0).wait(1).to({scaleX:0.5574,x:163.55},0).wait(1).to({scaleX:0.5582,x:163.65},0).wait(1).to({scaleX:0.559,x:163.7},0).wait(1).to({scaleX:0.5598,x:163.8},0).wait(1).to({scaleX:0.5606,x:163.9},0).wait(1).to({scaleX:0.5614,x:163.95},0).wait(1).to({scaleX:0.5622,x:164.05},0).wait(1).to({scaleX:0.5631,x:164.1},0).wait(1).to({scaleX:0.5639,x:164.25},0).wait(1).to({scaleX:0.5647,x:164.3},0).wait(1).to({scaleX:0.5655,x:164.4},0).wait(1).to({scaleX:0.5663,x:164.45},0).wait(1).to({scaleX:0.5671,x:164.55},0).wait(1).to({scaleX:0.5679,x:164.65},0).wait(1).to({scaleX:0.5687,x:164.7},0).wait(1).to({scaleX:0.5695,x:164.8},0).wait(1).to({scaleX:0.5703,x:164.85},0).wait(1).to({scaleX:0.5711,x:165},0).wait(1).to({scaleX:0.572,x:165.05},0).wait(1).to({scaleX:0.5728,x:165.1},0).wait(1).to({scaleX:0.5736,x:165.2},0).wait(1).to({scaleX:0.5744,x:165.3,y:338.3},0).wait(1).to({scaleX:0.5752,x:165.4},0).wait(1).to({scaleX:0.576,x:165.45},0).wait(1).to({scaleX:0.5768,x:165.55},0).wait(1).to({scaleX:0.5776,x:165.6},0).wait(1).to({scaleX:0.5784,x:165.7},0).wait(1).to({scaleX:0.5792,x:165.8},0).wait(1).to({scaleX:0.58,x:165.85},0).wait(1).to({scaleX:0.5809,x:165.95},0).wait(1).to({scaleX:0.5817,x:166.05},0).wait(1).to({scaleX:0.5825,x:166.15},0).wait(1).to({scaleX:0.5833,x:166.2},0).wait(1).to({scaleX:0.5841,x:166.25},0).wait(1).to({scaleX:0.5849,x:166.35},0).wait(1).to({scaleX:0.5857,x:166.45},0).wait(1).to({scaleX:0.5865,x:166.55},0).wait(1).to({scaleX:0.5873,x:166.6},0).wait(1).to({scaleX:0.5881,x:166.7},0).wait(1).to({scaleX:0.589,x:166.8},0).wait(1).to({scaleX:0.5898,x:166.85},0).wait(1).to({scaleX:0.5906,x:166.95},0).wait(1).to({scaleX:0.5914,x:167},0).wait(1).to({scaleX:0.5922,x:167.1},0).wait(1).to({scaleX:0.593,x:167.2},0).wait(1).to({scaleX:0.5938,x:167.3},0).wait(1).to({scaleX:0.5946,x:167.35},0).wait(1).to({scaleX:0.5954,x:167.4},0).wait(1).to({scaleX:0.5962,x:167.55},0).wait(1).to({scaleX:0.597,x:167.6},0).wait(1).to({scaleX:0.5979,x:167.7},0).wait(1).to({scaleX:0.5987,x:167.75},0).wait(1).to({scaleX:0.5995,x:167.9},0).wait(1).to({scaleX:0.6003,x:167.95},0).wait(1).to({scaleX:0.6011,x:168},0).wait(1).to({scaleX:0.6019,x:168.1},0).wait(1).to({scaleX:0.6027,x:168.15},0).wait(1).to({scaleX:0.6035,x:168.3},0).wait(1).to({scaleX:0.6043,x:168.35},0).wait(1).to({scaleX:0.6051,x:168.45},0).wait(1).to({scaleX:0.6059,x:168.5},0).wait(1).to({scaleX:0.6068,x:168.6},0).wait(1).to({scaleX:0.6076,x:168.7},0).wait(1).to({scaleX:0.6084,x:168.75},0).wait(1).to({scaleX:0.6092,x:168.85},0).wait(1).to({scaleX:0.61,x:168.9},0).wait(1).to({scaleX:0.6108,x:169.05},0).wait(1).to({scaleX:0.6116,x:169.1},0).wait(1).to({scaleX:0.6124,x:169.15},0).wait(1).to({scaleX:0.6132,x:169.25,y:338.35},0).wait(1).to({scaleX:0.614,x:169.35},0).wait(1).to({scaleX:0.6148,x:169.45},0).wait(1).to({scaleX:0.6157,x:169.5},0).wait(1).to({scaleX:0.6165,x:169.6},0).wait(1).to({scaleX:0.6173,x:169.65},0).wait(1).to({scaleX:0.6181,x:169.75},0).wait(1).to({scaleX:0.6189,x:169.85},0).wait(1).to({scaleX:0.6197,x:169.9},0).wait(1).to({scaleX:0.6205,x:170},0).wait(1).to({scaleX:0.6213,x:170.1},0).wait(1).to({scaleX:0.6221,x:170.2},0).wait(1).to({scaleX:0.6229,x:170.25},0).wait(1).to({scaleX:0.6237,x:170.3},0).wait(1).to({scaleX:0.6246,x:170.4},0).wait(1).to({scaleX:0.6254,x:170.5},0).wait(1).to({scaleX:0.6262,x:170.6},0).wait(1).to({scaleX:0.627,x:170.65},0).wait(1).to({scaleX:0.6278,x:170.75},0).wait(1).to({scaleX:0.6286,x:170.85},0).wait(1).to({scaleX:0.6294,x:170.9},0).wait(1).to({scaleX:0.6302,x:171},0).wait(1).to({scaleX:0.631,x:171.05},0).wait(1).to({scaleX:0.6318,x:171.2},0).wait(1).to({scaleX:0.6326,x:171.25},0).wait(1).to({scaleX:0.6335,x:171.35},0).wait(1).to({scaleX:0.6343,x:171.4},0).wait(1).to({scaleX:0.6351,x:171.45},0).wait(1).to({scaleX:0.6359,x:171.6},0).wait(1).to({scaleX:0.6367,x:171.65},0).wait(1).to({scaleX:0.6375,x:171.75},0).wait(1).to({scaleX:0.6383,x:171.8},0).wait(1).to({scaleX:0.6391,x:171.9},0).wait(1).to({scaleX:0.6399,x:172},0).wait(1).to({scaleX:0.6407,x:172.05},0).wait(1).to({scaleX:0.6415,x:172.15},0).wait(1).to({scaleX:0.6424,x:172.2},0).wait(1).to({scaleX:0.6432,x:172.35},0).wait(1).to({scaleX:0.644,x:172.4},0).wait(1).to({scaleX:0.6448,x:172.45},0).wait(1).to({scaleX:0.6456,x:172.55},0).wait(1).to({scaleX:0.6464,x:172.65},0).wait(1).to({scaleX:0.6472,x:172.75},0).wait(1).to({scaleX:0.648,x:172.8},0).wait(1).to({scaleX:0.6488,x:172.9},0).wait(1).to({scaleX:0.6496,x:172.95},0).wait(1).to({scaleX:0.6504,x:173.05},0).wait(1).to({scaleX:0.6513,x:173.15},0).wait(1).to({scaleX:0.6521,x:173.2,y:338.4},0).wait(1).to({scaleX:0.6529,x:173.3},0).wait(1).to({scaleX:0.6537,x:173.4},0).wait(1).to({scaleX:0.6545,x:173.5},0).wait(1).to({scaleX:0.6553,x:173.55},0).wait(1).to({scaleX:0.6561,x:173.6},0).wait(1).to({scaleX:0.6569,x:173.7},0).wait(1).to({scaleX:0.6577,x:173.8},0).wait(1).to({scaleX:0.6585,x:173.9},0).wait(1).to({scaleX:0.6593,x:173.95},0).wait(1).to({scaleX:0.6602,x:174.05},0).wait(1).to({scaleX:0.661,x:174.15},0).wait(1).to({scaleX:0.6618,x:174.2},0).wait(1).to({scaleX:0.6626,x:174.3},0).wait(1).to({scaleX:0.6634,x:174.35},0).wait(1).to({scaleX:0.6642,x:174.5},0).wait(1).to({scaleX:0.665,x:174.55},0).wait(1).to({scaleX:0.6658,x:174.65},0).wait(1).to({scaleX:0.6666,x:174.7},0).wait(1).to({scaleX:0.6674,x:174.75},0).wait(1).to({scaleX:0.6682,x:174.9},0).wait(1).to({scaleX:0.6691,x:174.95},0).wait(1).to({scaleX:0.6699,x:175.05},0).wait(1).to({scaleX:0.6707,x:175.1},0).wait(1).to({scaleX:0.6715,x:175.25},0).wait(1).to({scaleX:0.6723,x:175.3},0).wait(1).to({scaleX:0.6731,x:175.35},0).wait(1).to({scaleX:0.6739,x:175.45},0).wait(1).to({scaleX:0.6747,x:175.5},0).wait(1).to({scaleX:0.6755,x:175.65},0).wait(1).to({scaleX:0.6763,x:175.7},0).wait(1).to({scaleX:0.6771,x:175.8},0).wait(1).to({scaleX:0.678,x:175.85},0).wait(1).to({scaleX:0.6788,x:175.95},0).wait(1).to({scaleX:0.6796,x:176.05},0).wait(1).to({scaleX:0.6804,x:176.1},0).wait(1).to({scaleX:0.6812,x:176.2},0).wait(1).to({scaleX:0.682,x:176.25},0).wait(1).to({scaleX:0.6828,x:176.4},0).wait(1).to({scaleX:0.6836,x:176.45},0).wait(1).to({scaleX:0.6844,x:176.5},0).wait(1).to({scaleX:0.6852,x:176.6},0).wait(1).to({scaleX:0.686,x:176.7},0).wait(1).to({scaleX:0.6869,x:176.8},0).wait(1).to({scaleX:0.6877,x:176.85},0).wait(1).to({scaleX:0.6885,x:176.95},0).wait(1).to({scaleX:0.6893,x:177.05},0).wait(1).to({scaleX:0.6901,x:177.1},0).wait(1).to({scaleX:0.6909,x:177.2},0).wait(1).to({scaleX:0.6917,x:177.25,y:338.45},0).wait(1).to({scaleX:0.6925,x:177.35},0).wait(1).to({scaleX:0.6933,x:177.45},0).wait(1).to({scaleX:0.6941,x:177.55},0).wait(1).to({scaleX:0.695,x:177.6},0).wait(1).to({scaleX:0.6958,x:177.65},0).wait(1).to({scaleX:0.6966,x:177.8},0).wait(1).to({scaleX:0.6974,x:177.85},0).wait(1).to({scaleX:0.6982,x:177.95},0).wait(1).to({scaleX:0.699,x:178},0).wait(1).to({scaleX:0.6998,x:178.1},0).wait(1).to({scaleX:0.7006,x:178.2},0).wait(1).to({scaleX:0.7014,x:178.25},0).wait(1).to({scaleX:0.7022,x:178.35},0).wait(1).to({scaleX:0.703,x:178.4},0).wait(1).to({scaleX:0.7039,x:178.55},0).wait(1).to({scaleX:0.7047,x:178.6},0).wait(1).to({scaleX:0.7055,x:178.7},0).wait(1).to({scaleX:0.7063,x:178.75},0).wait(1).to({scaleX:0.7071,x:178.8},0).wait(1).to({scaleX:0.7079,x:178.95},0).wait(1).to({scaleX:0.7087,x:179},0).wait(1).to({scaleX:0.7095,x:179.1},0).wait(1).to({scaleX:0.7103,x:179.15},0).wait(1).to({scaleX:0.7111,x:179.3},0).wait(1).to({scaleX:0.7119,x:179.35},0).wait(1).to({scaleX:0.7128,x:179.4},0).wait(1).to({scaleX:0.7136,x:179.5},0).wait(1).to({scaleX:0.7144,x:179.55},0).wait(1).to({scaleX:0.7152,x:179.7},0).wait(1).to({scaleX:0.716,x:179.75},0).wait(1).to({scaleX:0.7168,x:179.85},0).wait(1).to({scaleX:0.7176,x:179.9},0).wait(1).to({scaleX:0.7184,x:180},0).wait(1).to({scaleX:0.7192,x:180.1},0).wait(1).to({scaleX:0.72,x:180.15},0).wait(1).to({scaleX:0.7208,x:180.25},0).wait(1).to({scaleX:0.7217,x:180.35},0).wait(1).to({scaleX:0.7225,x:180.45},0).wait(1).to({scaleX:0.7233,x:180.5},0).wait(1).to({scaleX:0.7241,x:180.55},0).wait(1).to({scaleX:0.7249,x:180.65},0).wait(1).to({scaleX:0.7257,x:180.75},0).wait(1).to({scaleX:0.7265,x:180.85},0).wait(1).to({scaleX:0.7273,x:180.9},0).wait(1).to({scaleX:0.7281,x:180.95},0).wait(1).to({scaleX:0.7289,x:181.1},0).wait(1).to({scaleX:0.7297,x:181.15},0).wait(1).to({scaleX:0.7306,x:181.25,y:338.5},0).wait(1).to({scaleX:0.7314,x:181.3},0).wait(1).to({scaleX:0.7322,x:181.4},0).wait(1).to({scaleX:0.733,x:181.5},0).wait(1).to({scaleX:0.7338,x:181.55},0).wait(1).to({scaleX:0.7346,x:181.65},0).wait(1).to({scaleX:0.7354,x:181.7},0).wait(1).to({scaleX:0.7362,x:181.85},0).wait(1).to({scaleX:0.737,x:181.9},0).wait(1).to({scaleX:0.7378,x:182},0).wait(1).to({scaleX:0.7386,x:182.05},0).wait(1).to({scaleX:0.7395,x:182.1},0).wait(1).to({scaleX:0.7403,x:182.25},0).wait(1).to({scaleX:0.7411,x:182.3},0).wait(1).to({scaleX:0.7419,x:182.4},0).wait(1).to({scaleX:0.7427,x:182.45},0).wait(1).to({scaleX:0.7435,x:182.6},0).wait(1).to({scaleX:0.7443,x:182.65},0).wait(1).to({scaleX:0.7451,x:182.7},0).wait(1).to({scaleX:0.7459,x:182.8},0).wait(1).to({scaleX:0.7467,x:182.9},0).wait(1).to({scaleX:0.7475,x:183},0).wait(1).to({scaleX:0.7484,x:183.05},0).wait(1).to({scaleX:0.7492,x:183.15},0).wait(1).to({scaleX:0.75,x:183.2},0).wait(1).to({scaleX:0.7508,x:183.3},0).wait(1).to({scaleX:0.7516,x:183.4},0).wait(1).to({scaleX:0.7524,x:183.45},0).wait(1).to({scaleX:0.7532,x:183.55},0).wait(1).to({scaleX:0.754,x:183.65},0).wait(1).to({scaleX:0.7548,x:183.75},0).wait(1).to({scaleX:0.7556,x:183.8},0).wait(1).to({scaleX:0.7564,x:183.85},0).wait(1).to({scaleX:0.7573,x:183.95},0).wait(1).to({scaleX:0.7581,x:184.05},0).wait(1).to({scaleX:0.7589,x:184.15},0).wait(1).to({scaleX:0.7597,x:184.2},0).wait(1).to({scaleX:0.7605,x:184.3},0).wait(1).to({scaleX:0.7613,x:184.4},0).wait(1).to({scaleX:0.7621,x:184.45},0).wait(1).to({scaleX:0.7629,x:184.55},0).wait(1).to({scaleX:0.7637,x:184.6},0).wait(1);
	var _tweenStr_3 = _tweenStr_2.to({scaleX:0.7645,x:184.7},0).wait(1).to({scaleX:0.7653,x:184.8},0).wait(1).to({scaleX:0.7662,x:184.9},0).wait(1).to({scaleX:0.767,x:184.95},0).wait(1).to({scaleX:0.7678,x:185},0).wait(1).to({scaleX:0.7686,x:185.15},0).wait(1).to({scaleX:0.7694,x:185.2},0).wait(1).to({scaleX:0.7702,x:185.3,y:338.55},0).wait(1).to({scaleX:0.771,x:185.35},0).wait(1).to({scaleX:0.7718,x:185.5},0).wait(1).to({scaleX:0.7726,x:185.55},0).wait(1).to({scaleX:0.7734,x:185.6},0).wait(1).to({scaleX:0.7742,x:185.7},0).wait(1).to({scaleX:0.7751,x:185.75},0).wait(1).to({scaleX:0.7759,x:185.9},0).wait(1).to({scaleX:0.7767,x:185.95},0).wait(1).to({scaleX:0.7775,x:186.05},0).wait(1).to({scaleX:0.7783,x:186.1},0).wait(1).to({scaleX:0.7791,x:186.2},0).wait(1).to({scaleX:0.7799,x:186.3},0).wait(1).to({scaleX:0.7807,x:186.35},0).wait(1).to({scaleX:0.7815,x:186.45},0).wait(1).to({scaleX:0.7823,x:186.5},0).wait(1).to({scaleX:0.7831,x:186.65},0).wait(1).to({scaleX:0.784,x:186.7},0).wait(1).to({scaleX:0.7848,x:186.75},0).wait(1).to({scaleX:0.7856,x:186.85},0).wait(1).to({scaleX:0.7864,x:186.95},0).wait(1).to({scaleX:0.7872,x:187.05},0).wait(1).to({scaleX:0.788,x:187.1},0).wait(1).to({scaleX:0.7888,x:187.2},0).wait(1).to({scaleX:0.7896,x:187.25},0).wait(1).to({scaleX:0.7904,x:187.35},0).wait(1).to({scaleX:0.7912,x:187.45},0).wait(1).to({scaleX:0.792,x:187.5},0).wait(1).to({scaleX:0.7929,x:187.6},0).wait(1).to({scaleX:0.7937,x:187.7},0).wait(1).to({scaleX:0.7945,x:187.8},0).wait(1).to({scaleX:0.7953,x:187.85},0).wait(1).to({scaleX:0.7961,x:187.9},0).wait(1).to({scaleX:0.7969,x:188},0).wait(1).to({scaleX:0.7977,x:188.1},0).wait(1).to({scaleX:0.7985,x:188.2},0).wait(1).to({scaleX:0.7993,x:188.25},0).wait(1).to({scaleX:0.8001,x:188.35},0).wait(1).to({scaleX:0.801,x:188.45},0).wait(1).to({scaleX:0.8018,x:188.5},0).wait(1).to({scaleX:0.8026,x:188.6},0).wait(1).to({scaleX:0.8034,x:188.65},0).wait(1).to({scaleX:0.8042,x:188.8},0).wait(1).to({scaleX:0.805,x:188.85},0).wait(1).to({scaleX:0.8058,x:188.95},0).wait(1).to({scaleX:0.8066,x:189},0).wait(1).to({scaleX:0.8074,x:189.05},0).wait(1).to({scaleX:0.8082,x:189.2},0).wait(1).to({scaleX:0.809,x:189.25,y:338.6},0).wait(1).to({scaleX:0.8099,x:189.35},0).wait(1).to({scaleX:0.8107,x:189.4},0).wait(1).to({scaleX:0.8115,x:189.55},0).wait(1).to({scaleX:0.8123,x:189.6},0).wait(1).to({scaleX:0.8131,x:189.65},0).wait(1).to({scaleX:0.8139,x:189.75},0).wait(1).to({scaleX:0.8147,x:189.8},0).wait(1).to({scaleX:0.8155,x:189.95},0).wait(1).to({scaleX:0.8163,x:190},0).wait(1).to({scaleX:0.8171,x:190.05},0).wait(1).to({scaleX:0.8179,x:190.15},0).wait(1).to({scaleX:0.8188,x:190.25},0).wait(1).to({scaleX:0.8196,x:190.35},0).wait(1).to({scaleX:0.8204,x:190.4},0).wait(1).to({scaleX:0.8212,x:190.5},0).wait(1).to({scaleX:0.822,x:190.55},0).wait(1).to({scaleX:0.8228,x:190.65},0).wait(1).to({scaleX:0.8236,x:190.75},0).wait(1).to({scaleX:0.8244,x:190.8},0).wait(1).to({scaleX:0.8252,x:190.9},0).wait(1).to({scaleX:0.826,x:191},0).wait(1).to({scaleX:0.8268,x:191.1},0).wait(1).to({scaleX:0.8277,x:191.15},0).wait(1).to({scaleX:0.8285,x:191.2},0).wait(1).to({scaleX:0.8293,x:191.3},0).wait(1).to({scaleX:0.8301,x:191.4},0).wait(1).to({scaleX:0.8309,x:191.5},0).wait(1).to({scaleX:0.8317,x:191.55},0).wait(1).to({scaleX:0.8325,x:191.65},0).wait(1).to({scaleX:0.8333,x:191.75},0).wait(1).to({scaleX:0.8341,x:191.8},0).wait(1).to({scaleX:0.8349,x:191.9},0).wait(1).to({scaleX:0.8357,x:191.95},0).wait(1).to({scaleX:0.8366,x:192.1},0).wait(1).to({scaleX:0.8374,x:192.15},0).wait(1).to({scaleX:0.8382,x:192.25},0).wait(1).to({scaleX:0.839,x:192.3},0).wait(1).to({scaleX:0.8398,x:192.35},0).wait(1).to({scaleX:0.8406,x:192.5},0).wait(1).to({scaleX:0.8414,x:192.55},0).wait(1).to({scaleX:0.8422,x:192.65},0).wait(1).to({scaleX:0.843,x:192.7},0).wait(1).to({scaleX:0.8438,x:192.85},0).wait(1).to({scaleX:0.8446,x:192.9},0).wait(1).to({scaleX:0.8455,x:192.95},0).wait(1).to({scaleX:0.8463,x:193.05},0).wait(1).to({scaleX:0.8471,x:193.1},0).wait(1).to({scaleX:0.8479,x:193.25,y:338.65},0).wait(1).to({scaleX:0.8487,x:193.3},0).wait(1).to({scaleX:0.8495,x:193.4},0).wait(1).to({scaleX:0.8503,x:193.45},0).wait(1).to({scaleX:0.8511,x:193.55},0).wait(1).to({scaleX:0.8519,x:193.65},0).wait(1).to({scaleX:0.8527,x:193.7},0).wait(1).to({scaleX:0.8535,x:193.8},0).wait(1).to({scaleX:0.8544,x:193.85},0).wait(1).to({scaleX:0.8552,x:194},0).wait(1).to({scaleX:0.856,x:194.05},0).wait(1).to({scaleX:0.8568,x:194.1},0).wait(1).to({scaleX:0.8576,x:194.2},0).wait(1).to({scaleX:0.8584,x:194.3},0).wait(1).to({scaleX:0.8592,x:194.4},0).wait(1).to({scaleX:0.86,x:194.45},0).wait(1).to({scaleX:0.8608,x:194.55},0).wait(1).to({scaleX:0.8616,x:194.6},0).wait(1).to({scaleX:0.8624,x:194.7},0).wait(1).to({scaleX:0.8633,x:194.8},0).wait(1).to({scaleX:0.8641,x:194.85},0).wait(1).to({scaleX:0.8649,x:194.95},0).wait(1).to({scaleX:0.8657,x:195.05},0).wait(1).to({scaleX:0.8665,x:195.15},0).wait(1).to({scaleX:0.8673,x:195.2},0).wait(1).to({scaleX:0.8681,x:195.25},0).wait(1).to({scaleX:0.8689,x:195.4},0).wait(1).to({scaleX:0.8697,x:195.45},0).wait(1).to({scaleX:0.8705,x:195.55},0).wait(1).to({scaleX:0.8713,x:195.6},0).wait(1).to({scaleX:0.8722,x:195.7},0).wait(1).to({scaleX:0.873,x:195.8},0).wait(1).to({scaleX:0.8738,x:195.85},0).wait(1).to({scaleX:0.8746,x:195.95},0).wait(1).to({scaleX:0.8754,x:196},0).wait(1).to({scaleX:0.8762,x:196.15},0).wait(1).to({scaleX:0.877,x:196.2},0).wait(1).to({scaleX:0.8778,x:196.3},0).wait(1).to({scaleX:0.8786,x:196.35},0).wait(1).to({scaleX:0.8794,x:196.4},0).wait(1).to({scaleX:0.8802,x:196.55},0).wait(1).to({scaleX:0.8811,x:196.6},0).wait(1).to({scaleX:0.8819,x:196.7},0).wait(1).to({scaleX:0.8827,x:196.75},0).wait(1).to({scaleX:0.8835,x:196.9},0).wait(1).to({scaleX:0.8843,x:196.95},0).wait(1).to({scaleX:0.8851,x:197},0).wait(1).to({scaleX:0.8859,x:197.1},0).wait(1).to({scaleX:0.8867,x:197.15},0).wait(1).to({scaleX:0.8875,x:197.3,y:338.7},0).wait(1).to({scaleX:0.8883,x:197.35},0).wait(1).to({scaleX:0.8891,x:197.45},0).wait(1).to({scaleX:0.89,x:197.5},0).wait(1).to({scaleX:0.8908,x:197.6},0).wait(1).to({scaleX:0.8916,x:197.7},0).wait(1).to({scaleX:0.8924,x:197.75},0).wait(1).to({scaleX:0.8932,x:197.85},0).wait(1).to({scaleX:0.894,x:197.9},0).wait(1).to({scaleX:0.8948,x:198.05},0).wait(1).to({scaleX:0.8956,x:198.1},0).wait(1).to({scaleX:0.8964,x:198.15},0).wait(1).to({scaleX:0.8972,x:198.25},0).wait(1).to({scaleX:0.898,x:198.35},0).wait(1).to({scaleX:0.8989,x:198.45},0).wait(1).to({scaleX:0.8997,x:198.5},0).wait(1).to({scaleX:0.9005,x:198.6},0).wait(1).to({scaleX:0.9013,x:198.7},0).wait(1).to({scaleX:0.9021,x:198.75},0).wait(1).to({scaleX:0.9029,x:198.85},0).wait(1).to({scaleX:0.9037,x:198.9},0).wait(1).to({scaleX:0.9045,x:199},0).wait(1).to({scaleX:0.9053,x:199.1},0).wait(1).to({scaleX:0.9061,x:199.2},0).wait(1).to({scaleX:0.907,x:199.25},0).wait(1).to({scaleX:0.9078,x:199.3},0).wait(1).to({scaleX:0.9086,x:199.45},0).wait(1).to({scaleX:0.9094,x:199.5},0).wait(1).to({scaleX:0.9102,x:199.6},0).wait(1).to({scaleX:0.911,x:199.65},0).wait(1).to({scaleX:0.9118,x:199.7},0).wait(1).to({scaleX:0.9126,x:199.85},0).wait(1).to({scaleX:0.9134,x:199.9},0).wait(1).to({scaleX:0.9142,x:200},0).wait(1).to({scaleX:0.915,x:200.05},0).wait(1).to({scaleX:0.9159,x:200.2},0).wait(1).to({scaleX:0.9167,x:200.25},0).wait(1).to({scaleX:0.9175,x:200.3},0).wait(1).to({scaleX:0.9183,x:200.4},0).wait(1).to({scaleX:0.9191,x:200.45},0).wait(1).to({scaleX:0.9199,x:200.6},0).wait(1).to({scaleX:0.9207,x:200.65},0).wait(1).to({scaleX:0.9215,x:200.75},0).wait(1).to({scaleX:0.9223,x:200.8},0).wait(1).to({scaleX:0.9231,x:200.9},0).wait(1).to({scaleX:0.9239,x:201},0).wait(1).to({scaleX:0.9248,x:201.05},0).wait(1).to({scaleX:0.9256,x:201.15},0).wait(1).to({scaleX:0.9264,x:201.2,y:338.75},0).wait(1).to({scaleX:0.9272,x:201.35},0).wait(1).to({scaleX:0.928,x:201.4},0).wait(1).to({scaleX:0.9288,x:201.45},0).wait(1).to({scaleX:0.9296,x:201.55},0).wait(1).to({scaleX:0.9304,x:201.65},0).wait(1).to({scaleX:0.9312,x:201.75},0).wait(1).to({scaleX:0.932,x:201.8},0).wait(1).to({scaleX:0.9328,x:201.9},0).wait(1).to({scaleX:0.9337,x:202},0).wait(1).to({scaleX:0.9345,x:202.05},0).wait(1).to({scaleX:0.9353,x:202.15},0).wait(1).to({scaleX:0.9361,x:202.2},0).wait(1).to({scaleX:0.9369,x:202.3},0).wait(1).to({scaleX:0.9377,x:202.4},0).wait(1).to({scaleX:0.9385,x:202.5},0).wait(1).to({scaleX:0.9393,x:202.55},0).wait(1).to({scaleX:0.9401,x:202.6},0).wait(1).to({scaleX:0.9409,x:202.75},0).wait(1).to({scaleX:0.9417,x:202.8},0).wait(1).to({scaleX:0.9426,x:202.9},0).wait(1).to({scaleX:0.9434,x:202.95},0).wait(1).to({scaleX:0.9442,x:203.05},0).wait(1).to({scaleX:0.945,x:203.15},0).wait(1).to({scaleX:0.9458,x:203.2},0).wait(1).to({scaleX:0.9466,x:203.3},0).wait(1).to({scaleX:0.9474,x:203.35},0).wait(1).to({scaleX:0.9482,x:203.5},0).wait(1).to({scaleX:0.949,x:203.55},0).wait(1).to({scaleX:0.9498,x:203.65},0).wait(1).to({scaleX:0.9506,x:203.7},0).wait(1).to({scaleX:0.9515,x:203.75},0).wait(1).to({scaleX:0.9523,x:203.9},0).wait(1).to({scaleX:0.9531,x:203.95},0).wait(1).to({scaleX:0.9539,x:204.05},0).wait(1).to({scaleX:0.9547,x:204.1},0).wait(1).to({scaleX:0.9555,x:204.25},0).wait(1).to({scaleX:0.9563,x:204.3},0).wait(1).to({scaleX:0.9571,x:204.35},0).wait(1).to({scaleX:0.9579,x:204.45},0).wait(1).to({scaleX:0.9587,x:204.5},0).wait(1).to({scaleX:0.9595,x:204.65},0).wait(1).to({scaleX:0.9604,x:204.7},0).wait(1).to({scaleX:0.9612,x:204.8},0).wait(1).to({scaleX:0.962,x:204.85},0).wait(1).to({scaleX:0.9628,x:204.95},0).wait(1).to({scaleX:0.9636,x:205.05},0).wait(1).to({scaleX:0.9644,x:205.1},0).wait(1).to({scaleX:0.9652,x:205.2},0).wait(1).to({scaleX:0.966,x:205.3,y:338.8},0).wait(1).to({scaleX:0.9668,x:205.4},0).wait(1).to({scaleX:0.9676,x:205.45},0).wait(1).to({scaleX:0.9684,x:205.5},0).wait(1).to({scaleX:0.9693,x:205.6},0).wait(1).to({scaleX:0.9701,x:205.7},0).wait(1).to({scaleX:0.9709,x:205.8},0).wait(1).to({scaleX:0.9717,x:205.85},0).wait(1).to({scaleX:0.9725,x:205.95},0).wait(1).to({scaleX:0.9733,x:206.05},0).wait(1).to({scaleX:0.9741,x:206.1},0).wait(1).to({scaleX:0.9749,x:206.2},0).wait(1).to({scaleX:0.9757,x:206.25},0).wait(1).to({scaleX:0.9765,x:206.35},0).wait(1).to({scaleX:0.9773,x:206.45},0).wait(1).to({scaleX:0.9782,x:206.55},0).wait(1).to({scaleX:0.979,x:206.6},0).wait(1).to({scaleX:0.9798,x:206.65},0).wait(1).to({scaleX:0.9806,x:206.8},0).wait(1).to({scaleX:0.9814,x:206.85},0).wait(1).to({scaleX:0.9822,x:206.95},0).wait(1).to({scaleX:0.983,x:207},0).wait(1).to({scaleX:0.9838,x:207.1},0).wait(1).to({scaleX:0.9846,x:207.2},0).wait(1).to({scaleX:0.9854,x:207.25},0).wait(1).to({scaleX:0.9862,x:207.35},0).wait(1).to({scaleX:0.9871,x:207.4},0).wait(1).to({scaleX:0.9879,x:207.55},0).wait(1).to({scaleX:0.9887,x:207.6},0).wait(1).to({scaleX:0.9895,x:207.7},0).wait(1).to({scaleX:0.9903,x:207.75},0).wait(1).to({scaleX:0.9911,x:207.8},0).wait(1).to({scaleX:0.9919,x:207.95},0).wait(1).to({scaleX:0.9927,x:208},0).wait(1).to({scaleX:0.9935,x:208.1},0).wait(1).to({scaleX:0.9943,x:208.15},0).wait(1).to({scaleX:0.9951,x:208.3},0).wait(1).to({scaleX:0.996,x:208.35},0).wait(1).to({scaleX:0.9968,x:208.4},0).wait(1).to({scaleX:0.9976,x:208.5},0).wait(1).to({scaleX:0.9984,x:208.6},0).wait(1).to({scaleX:0.9992,x:208.7},0).wait(1).to({scaleX:1,x:208.75},0).wait(1).to({scaleX:1.0008,x:208.8},0).wait(1).to({scaleX:1.0016,x:208.9},0).wait(1).to({scaleX:1.0024,x:209},0).wait(1).to({scaleX:1.0032,x:209.1},0).wait(1).to({scaleX:1.004,x:209.15},0).wait(1).to({scaleX:1.0049,x:209.25,y:338.85},0).wait(1).to({scaleX:1.0057,x:209.35},0).wait(1).to({scaleX:1.0065,x:209.4},0).wait(1).to({scaleX:1.0073,x:209.5},0).wait(1).to({scaleX:1.0081,x:209.55},0).wait(1).to({scaleX:1.0089,x:209.65},0).wait(1).to({scaleX:1.0097,x:209.75},0).wait(1).to({scaleX:1.0105,x:209.85},0).wait(1).to({scaleX:1.0113,x:209.9},0).wait(1).to({scaleX:1.0121,x:209.95},0).wait(1).to({scaleX:1.013,x:210.1},0).wait(1).to({scaleX:1.0138,x:210.15},0).wait(1).to({scaleX:1.0146,x:210.25},0).wait(1).to({scaleX:1.0154,x:210.3},0).wait(1).to({scaleX:1.0162,x:210.4},0).wait(1).to({scaleX:1.017,x:210.5},0).wait(1).to({scaleX:1.0178,x:210.55},0).wait(1).to({scaleX:1.0186,x:210.65},0).wait(1).to({scaleX:1.0194,x:210.7},0).wait(1).to({scaleX:1.0202,x:210.85},0).wait(1).to({scaleX:1.021,x:210.9},0).wait(1).to({scaleX:1.0219,x:211},0).wait(1).to({scaleX:1.0227,x:211.05},0).wait(1).to({scaleX:1.0235,x:211.15},0).wait(1).to({scaleX:1.0243,x:211.25},0).wait(1).to({scaleX:1.0251,x:211.3},0).wait(1).to({scaleX:1.0259,x:211.4},0).wait(1).to({scaleX:1.0267,x:211.45},0).wait(1).to({scaleX:1.0275,x:211.6},0).wait(1).to({scaleX:1.0283,x:211.65},0).wait(1).to({scaleX:1.0291,x:211.7},0).wait(1).to({scaleX:1.0299,x:211.8},0).wait(1).to({scaleX:1.0308,x:211.9},0).wait(1).to({scaleX:1.0316,x:212},0).wait(1).to({scaleX:1.0324,x:212.05},0).wait(1).to({scaleX:1.0332,x:212.15},0).wait(1).to({scaleX:1.034,x:212.2},0).wait(1).to({scaleX:1.0348,x:212.3},0).wait(1).to({scaleX:1.0356,x:212.4},0).wait(1).to({scaleX:1.0364,x:212.45},0).wait(1).to({scaleX:1.0372,x:212.55},0).wait(1).to({scaleX:1.038,x:212.65},0).wait(1).to({scaleX:1.0388,x:212.75},0).wait(1).to({scaleX:1.0397,x:212.8},0).wait(1).to({scaleX:1.0405,x:212.85},0).wait(1).to({scaleX:1.0413,x:212.95},0).wait(1).to({scaleX:1.0421,x:213.05},0).wait(1).to({scaleX:1.0429,x:213.15},0).wait(1).to({scaleX:1.0437,x:213.2,y:338.9},0).wait(1).to({scaleX:1.0445,x:213.3},0).wait(1).to({scaleX:1.0453,x:213.4},0).wait(1).to({scaleX:1.0461,x:213.45},0).wait(1).to({scaleX:1.0469,x:213.55},0).wait(1).to({scaleX:1.0477,x:213.6},0).wait(1).to({scaleX:1.0486,x:213.75},0).wait(1).to({scaleX:1.0494,x:213.8},0).wait(1).to({scaleX:1.0502,x:213.9},0).wait(1).to({scaleX:1.051,x:213.95},0).wait(1).to({scaleX:1.0518,x:214},0).wait(1).to({scaleX:1.0526,x:214.15},0).wait(1).to({scaleX:1.0534,x:214.2},0).wait(1).to({scaleX:1.0542,x:214.3},0).wait(1).to({scaleX:1.055,x:214.35},0).wait(1).to({scaleX:1.0558,x:214.5},0).wait(1).to({scaleX:1.0566,x:214.55},0).wait(1).to({scaleX:1.0575,x:214.6},0).wait(1).to({scaleX:1.0583,x:214.7},0).wait(1).to({scaleX:1.0591,x:214.75},0).wait(1).to({scaleX:1.0599,x:214.9},0).wait(1).to({scaleX:1.0607,x:214.95},0).wait(1).to({scaleX:1.0615,x:215.05},0).wait(1).to({scaleX:1.0623,x:215.1},0).wait(1).to({scaleX:1.0631,x:215.2},0).wait(1).to({scaleX:1.0639,x:215.3},0).wait(1).to({scaleX:1.0647,x:215.35},0).wait(1).to({scaleX:1.0655,x:215.45},0).wait(1).to({scaleX:1.0664,x:215.5},0).wait(1).to({scaleX:1.0672,x:215.65},0).wait(1).to({scaleX:1.068,x:215.7},0).wait(1).to({scaleX:1.0688,x:215.75},0).wait(1).to({scaleX:1.0696,x:215.85},0).wait(1).to({scaleX:1.0704,x:215.95},0).wait(1).to({scaleX:1.0712,x:216.05},0).wait(1).to({scaleX:1.072,x:216.1},0).wait(1).to({scaleX:1.0728,x:216.2},0).wait(1).to({scaleX:1.0736,x:216.25},0).wait(1).to({scaleX:1.0744,x:216.35},0).wait(1).to({scaleX:1.0753,x:216.45},0).wait(1).to({scaleX:1.0761,x:216.5},0).wait(1).to({scaleX:1.0769,x:216.6},0).wait(1).to({scaleX:1.0777,x:216.7},0).wait(1).to({scaleX:1.0785,x:216.8},0).wait(1).to({scaleX:1.0793,x:216.85},0).wait(1).to({scaleX:1.0801,x:216.9},0).wait(1).to({scaleX:1.0809,x:217.05},0).wait(1).to({scaleX:1.0817,x:217.1},0).wait(1).to({scaleX:1.0825,x:217.2},0).wait(1).to({scaleX:1.0833,x:217.25,y:338.95},0).wait(1).to({scaleX:1.0842,x:217.35},0).wait(1).to({scaleX:1.085,x:217.45},0).wait(1).to({scaleX:1.0858,x:217.5},0).wait(1).to({scaleX:1.0866,x:217.6},0).wait(1);
	var _tweenStr_4 = _tweenStr_3.to({scaleX:1.0874,x:217.65},0).wait(1).to({scaleX:1.0882,x:217.8},0).wait(1).to({scaleX:1.089,x:217.85},0).wait(1).to({scaleX:1.0898,x:217.9},0).wait(1).to({scaleX:1.0906,x:218},0).wait(1).to({scaleX:1.0914,x:218.05},0).wait(1).to({scaleX:1.0922,x:218.2},0).wait(1).to({scaleX:1.0931,x:218.25},0).wait(1).to({scaleX:1.0939,x:218.35},0).wait(1).to({scaleX:1.0947,x:218.4},0).wait(1).to({scaleX:1.0955,x:218.5},0).wait(1).to({scaleX:1.0963,x:218.6},0).wait(1).to({scaleX:1.0971,x:218.65},0).wait(1).to({scaleX:1.0979,x:218.75},0).wait(1).to({scaleX:1.0987,x:218.8},0).wait(1).to({scaleX:1.0995,x:218.95},0).wait(1).to({scaleX:1.1003,x:219},0).wait(1).to({scaleX:1.1011,x:219.05},0).wait(1).to({scaleX:1.102,x:219.15},0).wait(1).to({scaleX:1.1028,x:219.25},0).wait(1).to({scaleX:1.1036,x:219.35},0).wait(1).to({scaleX:1.1044,x:219.4},0).wait(1).to({scaleX:1.1052,x:219.5},0).wait(1).to({scaleX:1.106,x:219.6},0).wait(1).to({scaleX:1.1068,x:219.65},0).wait(1).to({scaleX:1.1076,x:219.75},0).wait(1).to({scaleX:1.1084,x:219.8},0).wait(1).to({scaleX:1.1092,x:219.9},0).wait(1).to({scaleX:1.11,x:220},0).wait(1).to({scaleX:1.1109,x:220.1},0).wait(1).to({scaleX:1.1117,x:220.15},0).wait(1).to({scaleX:1.1125,x:220.2},0).wait(1).to({scaleX:1.1133,x:220.35},0).wait(1).to({scaleX:1.1141,x:220.4},0).wait(1).to({scaleX:1.1149,x:220.5},0).wait(1).to({scaleX:1.1157,x:220.55},0).wait(1).to({scaleX:1.1165,x:220.65},0).wait(1).to({scaleX:1.1173,x:220.75},0).wait(1).to({scaleX:1.1181,x:220.8},0).wait(1).to({scaleX:1.119,x:220.9},0).wait(1).to({scaleX:1.1198,x:220.95},0).wait(1).to({scaleX:1.1206,x:221.1},0).wait(1).to({scaleX:1.1214,x:221.15},0).wait(1).to({scaleX:1.1222,x:221.25,y:339},0).wait(1).to({scaleX:1.123,x:221.3},0).wait(1).to({scaleX:1.1238,x:221.35},0).wait(1).to({scaleX:1.1246,x:221.5},0).wait(1).to({scaleX:1.1254,x:221.55},0).wait(1).to({scaleX:1.1262,x:221.65},0).wait(1).to({scaleX:1.127,x:221.7},0).wait(1).to({scaleX:1.1279,x:221.85},0).wait(1).to({scaleX:1.1287,x:221.9},0).wait(1).to({scaleX:1.1295,x:221.95},0).wait(1).to({scaleX:1.1303,x:222.05},0).wait(1).to({scaleX:1.1311,x:222.1},0).wait(1).to({scaleX:1.1319,x:222.25},0).wait(1).to({scaleX:1.1327,x:222.3},0).wait(1).to({scaleX:1.1335,x:222.4},0).wait(1).to({scaleX:1.1343,x:222.45},0).wait(1).to({scaleX:1.1351,x:222.55},0).wait(1).to({scaleX:1.1359,x:222.65},0).wait(1).to({scaleX:1.1368,x:222.7},0).wait(1).to({scaleX:1.1376,x:222.8},0).wait(1).to({scaleX:1.1384,x:222.9},0).wait(1).to({scaleX:1.1392,x:223},0).wait(1).to({scaleX:1.14,x:223.05},0).wait(1).to({scaleX:1.1408,x:223.1},0).wait(1).to({scaleX:1.1416,x:223.2},0).wait(1).to({scaleX:1.1424,x:223.3},0).wait(1).to({scaleX:1.1432,x:223.4},0).wait(1).to({scaleX:1.144,x:223.45},0).wait(1).to({scaleX:1.1448,x:223.55},0).wait(1).to({scaleX:1.1457,x:223.65},0).wait(1).to({scaleX:1.1465,x:223.7},0).wait(1).to({scaleX:1.1473,x:223.8},0).wait(1).to({scaleX:1.1481,x:223.85},0).wait(1).to({scaleX:1.1489,x:223.95},0).wait(1).to({scaleX:1.1497,x:224.05},0).wait(1).to({scaleX:1.1505,x:224.15},0).wait(1).to({scaleX:1.1513,x:224.2},0).wait(1).to({scaleX:1.1521,x:224.25},0).wait(1).to({scaleX:1.1529,x:224.4},0).wait(1).to({scaleX:1.1537,x:224.45},0).wait(1).to({scaleX:1.1546,x:224.55},0).wait(1).to({scaleX:1.1554,x:224.6},0).wait(1).to({scaleX:1.1562,x:224.7},0).wait(1).to({scaleX:1.157,x:224.8},0).wait(1).to({scaleX:1.1578,x:224.85},0).wait(1).to({scaleX:1.1586,x:224.95},0).wait(1).to({scaleX:1.1594,x:225},0).wait(1).to({scaleX:1.1602,x:225.15},0).wait(1).to({scaleX:1.161,x:225.2},0).wait(1).to({scaleX:1.1618,x:225.3,y:339.05},0).wait(1).to({scaleX:1.1626,x:225.35},0).wait(1).to({scaleX:1.1635,x:225.4},0).wait(1).to({scaleX:1.1643,x:225.55},0).wait(1).to({scaleX:1.1651,x:225.6},0).wait(1).to({scaleX:1.1659,x:225.7},0).wait(1).to({scaleX:1.1667,x:225.75},0).wait(1).to({scaleX:1.1675,x:225.9},0).wait(1).to({scaleX:1.1683,x:225.95},0).wait(1).to({scaleX:1.1691,x:226},0).wait(1).to({scaleX:1.1699,x:226.1},0).wait(1).to({scaleX:1.1707,x:226.2},0).wait(1).to({scaleX:1.1715,x:226.3},0).wait(1).to({scaleX:1.1724,x:226.35},0).wait(1).to({scaleX:1.1732,x:226.45},0).wait(1).to({scaleX:1.174,x:226.5},0).wait(1).to({scaleX:1.1748,x:226.6},0).wait(1).to({scaleX:1.1756,x:226.7},0).wait(1).to({scaleX:1.1764,x:226.75},0).wait(1).to({scaleX:1.1772,x:226.85},0).wait(1).to({scaleX:1.178,x:226.95},0).wait(1).to({scaleX:1.1788,x:227},0).wait(1).to({scaleX:1.1796,x:227.1},0).wait(1).to({scaleX:1.1804,x:227.15},0).wait(1).to({scaleX:1.1813,x:227.25},0).wait(1).to({scaleX:1.1821,x:227.35},0).wait(1).to({scaleX:1.1829,x:227.45},0).wait(1).to({scaleX:1.1837,x:227.5},0).wait(1).to({scaleX:1.1845,x:227.55},0).wait(1).to({scaleX:1.1853,x:227.7},0).wait(1).to({scaleX:1.1861,x:227.75},0).wait(1).to({scaleX:1.1869,x:227.85},0).wait(1).to({scaleX:1.1877,x:227.9},0).wait(1).to({scaleX:1.1885,x:228},0).wait(1).to({scaleX:1.1893,x:228.1},0).wait(1).to({scaleX:1.1902,x:228.15},0).wait(1).to({scaleX:1.191,x:228.25},0).wait(1).to({scaleX:1.1918,x:228.3},0).wait(1).to({scaleX:1.1926,x:228.45},0).wait(1).to({scaleX:1.1934,x:228.5},0).wait(1).to({scaleX:1.1942,x:228.6},0).wait(1).to({scaleX:1.195,x:228.65},0).wait(1).to({scaleX:1.1958,x:228.7},0).wait(1).to({scaleX:1.1966,x:228.85},0).wait(1).to({scaleX:1.1974,x:228.9},0).wait(1).to({scaleX:1.1982,x:229},0).wait(1).to({scaleX:1.1991,x:229.05},0).wait(1).to({scaleX:1.1999,x:229.2},0).wait(1).to({scaleX:1.2007,x:229.25,y:339.1},0).wait(1).to({scaleX:1.2015,x:229.3},0).wait(1).to({scaleX:1.2023,x:229.4},0).wait(1).to({scaleX:1.2031,x:229.5},0).wait(1).to({scaleX:1.2039,x:229.6},0).wait(1).to({scaleX:1.2047,x:229.65},0).wait(1).to({scaleX:1.2055,x:229.75},0).wait(1).to({scaleX:1.2063,x:229.8},0).wait(1).to({scaleX:1.2071,x:229.9},0).wait(1).to({scaleX:1.208,x:230},0).wait(1).to({scaleX:1.2088,x:230.05},0).wait(1).to({scaleX:1.2096,x:230.15},0).wait(1).to({scaleX:1.2104,x:230.25},0).wait(1).to({scaleX:1.2112,x:230.35},0).wait(1).to({scaleX:1.212,x:230.4},0).wait(1).to({scaleX:1.2128,x:230.45},0).wait(1).to({scaleX:1.2136,x:230.55},0).wait(1).to({scaleX:1.2144,x:230.65},0).wait(1).to({scaleX:1.2152,x:230.75},0).wait(1).to({scaleX:1.2161,x:230.8},0).wait(1).to({scaleX:1.2169,x:230.9},0).wait(1).to({scaleX:1.2177,x:231},0).wait(1).to({scaleX:1.2185,x:231.05},0).wait(1).to({scaleX:1.2193,x:231.15},0).wait(1).to({scaleX:1.2201,x:231.2},0).wait(1).to({scaleX:1.2209,x:231.3},0).wait(1).to({scaleX:1.2217,x:231.4},0).wait(1).to({scaleX:1.2225,x:231.5},0).wait(1).to({scaleX:1.2233,x:231.55},0).wait(1).to({scaleX:1.2241,x:231.6},0).wait(1).to({scaleX:1.225,x:231.75},0).wait(1).to({scaleX:1.2258,x:231.8},0).wait(1).to({scaleX:1.2266,x:231.9},0).wait(1).to({scaleX:1.2274,x:231.95},0).wait(1).to({scaleX:1.2282,x:232.05},0).wait(1).to({scaleX:1.229,x:232.15},0).wait(1).to({scaleX:1.2298,x:232.2},0).wait(1).to({scaleX:1.2306,x:232.3},0).wait(1).to({scaleX:1.2314,x:232.35},0).wait(1).to({scaleX:1.2322,x:232.5},0).wait(1).to({scaleX:1.233,x:232.55},0).wait(1).to({scaleX:1.2339,x:232.65},0).wait(1).to({scaleX:1.2347,x:232.7},0).wait(1).to({scaleX:1.2355,x:232.8},0).wait(1).to({scaleX:1.2363,x:232.9},0).wait(1).to({scaleX:1.2371,x:232.95},0).wait(1).to({scaleX:1.2379,x:233.05},0).wait(1).to({scaleX:1.2387,x:233.1},0).wait(1).to({scaleX:1.2395,x:233.25,y:339.15},0).wait(1).to({scaleX:1.2403,x:233.3},0).wait(1).to({scaleX:1.2411,x:233.35},0).wait(1).to({scaleX:1.2419,x:233.45},0).wait(1).to({scaleX:1.2428,x:233.55},0).wait(1).to({scaleX:1.2436,x:233.65},0).wait(1).to({scaleX:1.2444,x:233.7},0).wait(1).to({scaleX:1.2452,x:233.8},0).wait(1).to({scaleX:1.246,x:233.85},0).wait(1).to({scaleX:1.2468,x:233.95},0).wait(1).to({scaleX:1.2476,x:234.05},0).wait(1).to({scaleX:1.2484,x:234.1},0).wait(1).to({scaleX:1.2492,x:234.2},0).wait(1).to({scaleX:1.25,x:234.3},0).wait(1).to({scaleX:1.2508,x:234.4},0).wait(1).to({scaleX:1.2517,x:234.45},0).wait(1).to({scaleX:1.2525,x:234.5},0).wait(1).to({scaleX:1.2533,x:234.6},0).wait(1).to({scaleX:1.2541,x:234.7},0).wait(1).to({scaleX:1.2549,x:234.8},0).wait(1).to({scaleX:1.2557,x:234.85},0).wait(1).to({scaleX:1.2565,x:234.95},0).wait(1).to({scaleX:1.2573,x:235.05},0).wait(1).to({scaleX:1.2581,x:235.1},0).wait(1).to({scaleX:1.2589,x:235.2},0).wait(1).to({scaleX:1.2597,x:235.25},0).wait(1).to({scaleX:1.2606,x:235.35},0).wait(1).to({scaleX:1.2614,x:235.45},0).wait(1).to({scaleX:1.2622,x:235.55},0).wait(1).to({scaleX:1.263,x:235.6},0).wait(1).to({scaleX:1.2638,x:235.65},0).wait(1).to({scaleX:1.2646,x:235.8},0).wait(1).to({scaleX:1.2654,x:235.85},0).wait(1).to({scaleX:1.2662,x:235.95},0).wait(1).to({scaleX:1.267,x:236},0).wait(1).to({scaleX:1.2678,x:236.1},0).wait(1).to({scaleX:1.2686,x:236.2},0).wait(1).to({scaleX:1.2695,x:236.25},0).wait(1).to({scaleX:1.2703,x:236.35},0).wait(1).to({scaleX:1.2711,x:236.4},0).wait(1).to({scaleX:1.2719,x:236.55},0).wait(1).to({scaleX:1.2727,x:236.6},0).wait(1).to({scaleX:1.2735,x:236.65},0).wait(1).to({scaleX:1.2743,x:236.75},0).wait(1).to({scaleX:1.2751,x:236.85},0).wait(1).to({scaleX:1.2759,x:236.95},0).wait(1).to({scaleX:1.2767,x:237},0).wait(1).to({scaleX:1.2775,x:237.1},0).wait(1).to({scaleX:1.2784,x:237.15},0).wait(1).to({scaleX:1.2792,x:237.25,y:339.2},0).wait(1).to({scaleX:1.28,x:237.35},0).wait(1).to({scaleX:1.2808,x:237.4},0).wait(1).to({scaleX:1.2816,x:237.5},0).wait(1).to({scaleX:1.2824,x:237.6},0).wait(1).to({scaleX:1.2832,x:237.7},0).wait(1).to({scaleX:1.284,x:237.75},0).wait(1).to({scaleX:1.2848,x:237.8},0).wait(1).to({scaleX:1.2856,x:237.9},0).wait(1).to({scaleX:1.2864,x:238},0).wait(1).to({scaleX:1.2873,x:238.1},0).wait(1).to({scaleX:1.2881,x:238.15},0).wait(1).to({scaleX:1.2889,x:238.25},0).wait(1).to({scaleX:1.2897,x:238.35},0).wait(1).to({scaleX:1.2905,x:238.4},0).wait(1).to({scaleX:1.2913,x:238.5},0).wait(1).to({scaleX:1.2921,x:238.55},0).wait(1).to({scaleX:1.2929,x:238.65},0).wait(1).to({scaleX:1.2937,x:238.75},0).wait(1).to({scaleX:1.2945,x:238.85},0).wait(1).to({scaleX:1.2953,x:238.9},0).wait(1).to({scaleX:1.2962,x:238.95},0).wait(1).to({scaleX:1.297,x:239.1},0).wait(1).to({scaleX:1.2978,x:239.15},0).wait(1).to({scaleX:1.2986,x:239.25},0).wait(1).to({scaleX:1.2994,x:239.3},0).wait(1).to({scaleX:1.3002,x:239.45},0).wait(1).to({scaleX:1.301,x:239.5},0).wait(1).to({scaleX:1.3018,x:239.55},0).wait(1).to({scaleX:1.3026,x:239.65},0).wait(1).to({scaleX:1.3034,x:239.7},0).wait(1).to({scaleX:1.3042,x:239.85},0).wait(1).to({scaleX:1.3051,x:239.9},0).wait(1).to({scaleX:1.3059,x:240},0).wait(1).to({scaleX:1.3067,x:240.05},0).wait(1).to({scaleX:1.3075,x:240.15},0).wait(1).to({scaleX:1.3083,x:240.25},0).wait(1).to({scaleX:1.3091,x:240.3},0).wait(1).to({scaleX:1.3099,x:240.4},0).wait(1).to({scaleX:1.3107,x:240.45},0).wait(1).to({scaleX:1.3115,x:240.6},0).wait(1).to({scaleX:1.3123,x:240.65},0).wait(1).to({scaleX:1.3131,x:240.7},0).wait(1).to({scaleX:1.314,x:240.8},0).wait(1).to({scaleX:1.3148,x:240.9},0).wait(1).to({scaleX:1.3156,x:241},0).wait(1).to({scaleX:1.3164,x:241.05},0).wait(1).to({scaleX:1.3172,x:241.15},0).wait(1).to({scaleX:1.318,x:241.2,y:339.25},0).wait(1).to({scaleX:1.3188,x:241.3},0).wait(1).to({scaleX:1.3196,x:241.4},0).wait(1).to({scaleX:1.3204,x:241.45},0).wait(1).to({scaleX:1.3212,x:241.55},0).wait(1).to({scaleX:1.3221,x:241.65},0).wait(1).to({scaleX:1.3229,x:241.75},0).wait(1).to({scaleX:1.3237,x:241.8},0).wait(1).to({scaleX:1.3245,x:241.85},0).wait(1).to({scaleX:1.3253,x:242},0).wait(1).to({scaleX:1.3261,x:242.05},0).wait(1).to({scaleX:1.3269,x:242.15},0).wait(1).to({scaleX:1.3277,x:242.2},0).wait(1).to({scaleX:1.3285,x:242.3},0).wait(1).to({scaleX:1.3293,x:242.4},0).wait(1).to({scaleX:1.3301,x:242.45},0).wait(1).to({scaleX:1.331,x:242.55},0).wait(1).to({scaleX:1.3318,x:242.6},0).wait(1).to({scaleX:1.3326,x:242.75},0).wait(1).to({scaleX:1.3334,x:242.8},0).wait(1).to({scaleX:1.3342,x:242.9},0).wait(1).to({scaleX:1.335,x:242.95},0).wait(1).to({scaleX:1.3358,x:243},0).wait(1).to({scaleX:1.3366,x:243.15},0).wait(1).to({scaleX:1.3374,x:243.2},0).wait(1).to({scaleX:1.3382,x:243.3},0).wait(1).to({scaleX:1.339,x:243.35},0).wait(1).to({scaleX:1.3399,x:243.5},0).wait(1).to({scaleX:1.3407,x:243.55},0).wait(1).to({scaleX:1.3415,x:243.6},0).wait(1).to({scaleX:1.3423,x:243.7},0).wait(1).to({scaleX:1.3431,x:243.75},0).wait(1).to({scaleX:1.3439,x:243.9},0).wait(1).to({scaleX:1.3447,x:243.95},0).wait(1).to({scaleX:1.3455,x:244.05},0).wait(1).to({scaleX:1.3463,x:244.1},0).wait(1).to({scaleX:1.3471,x:244.2},0).wait(1).to({scaleX:1.3479,x:244.3},0).wait(1).to({scaleX:1.3488,x:244.35},0).wait(1).to({scaleX:1.3496,x:244.45},0).wait(1).to({scaleX:1.3504,x:244.5},0).wait(1).to({scaleX:1.3512,x:244.65},0).wait(1).to({scaleX:1.352,x:244.7},0).wait(1).to({scaleX:1.3528,x:244.75},0).wait(1).to({scaleX:1.3536,x:244.85},0).wait(1).to({scaleX:1.3544,x:244.95},0).wait(1).to({scaleX:1.3552,x:245.05},0).wait(1).to({scaleX:1.356,x:245.1},0).wait(1).to({scaleX:1.3568,x:245.15,y:339.3},0).wait(1).to({scaleX:1.3577,x:245.3},0).wait(1).to({scaleX:1.3585,x:245.35},0).wait(1).to({scaleX:1.3593,x:245.45},0).wait(1).to({scaleX:1.3601,x:245.5},0).wait(1).to({scaleX:1.3609,x:245.6},0).wait(1).to({scaleX:1.3617,x:245.7},0).wait(1).to({scaleX:1.3625,x:245.75},0).wait(1).to({scaleX:1.3633,x:245.85},0).wait(1).to({scaleX:1.3641,x:245.9},0).wait(1).to({scaleX:1.3649,x:246.05},0).wait(1).to({scaleX:1.3657,x:246.1},0).wait(1).to({scaleX:1.3666,x:246.2},0).wait(1).to({scaleX:1.3674,x:246.25},0).wait(1).to({scaleX:1.3682,x:246.3},0).wait(1).to({scaleX:1.369,x:246.45},0).wait(1).to({scaleX:1.3698,x:246.5},0).wait(1).to({scaleX:1.3706,x:246.6},0).wait(1).to({scaleX:1.3714,x:246.65},0).wait(1).to({scaleX:1.3722,x:246.8},0).wait(1).to({scaleX:1.373,x:246.85},0).wait(1).to({scaleX:1.3738,x:246.9},0).wait(1).to({scaleX:1.3746,x:247},0).wait(1).to({scaleX:1.3755,x:247.05},0).wait(1).to({scaleX:1.3763,x:247.2},0).wait(1).to({scaleX:1.3771,x:247.25},0).wait(1).to({scaleX:1.3779,x:247.35},0).wait(1).to({scaleX:1.3787,x:247.4},0).wait(1).to({scaleX:1.3795,x:247.5},0).wait(1).to({scaleX:1.3803,x:247.6},0).wait(1).to({scaleX:1.3811,x:247.65},0).wait(1).to({scaleX:1.3819,x:247.75},0).wait(1).to({scaleX:1.3827,x:247.85},0).wait(1).to({scaleX:1.3835,x:247.95},0).wait(1).to({scaleX:1.3844,x:248},0).wait(1).to({scaleX:1.3852,x:248.05},0).wait(1).to({scaleX:1.386,x:248.15},0).wait(1).to({scaleX:1.3868,x:248.25},0).wait(1).to({scaleX:1.3876,x:248.35},0).wait(1).to({scaleX:1.3884,x:248.4},0).wait(1).to({scaleX:1.3892,x:248.5},0).wait(1).to({scaleX:1.39,x:248.6},0).wait(1).to({scaleX:1.3908,x:248.65},0).wait(1).to({scaleX:1.3916,x:248.75},0).wait(1).to({scaleX:1.3924,x:248.8},0).wait(1).to({scaleX:1.3933,x:248.9},0).wait(1).to({scaleX:1.3941,x:249},0).wait(1).to({scaleX:1.3949,x:249.1},0).wait(1).to({scaleX:1.3957,x:249.15},0).wait(1).to({scaleX:1.3965,x:249.2,y:339.35},0).wait(1).to({scaleX:1.3973,x:249.35},0).wait(1).to({scaleX:1.3981,x:249.4},0).wait(1).to({scaleX:1.3989,x:249.5},0).wait(1).to({scaleX:1.3997,x:249.55},0).wait(1).to({scaleX:1.4005,x:249.65},0).wait(1).to({scaleX:1.4013,x:249.75},0).wait(1).to({scaleX:1.4022,x:249.8},0).wait(1).to({scaleX:1.403,x:249.9},0).wait(1).to({scaleX:1.4038,x:249.95},0).wait(1).to({scaleX:1.4046,x:250.1},0).wait(1).to({scaleX:1.4054,x:250.15},0).wait(1).to({scaleX:1.4062,x:250.25},0).wait(1).to({scaleX:1.407,x:250.3},0).wait(1).to({scaleX:1.4078,x:250.35},0).wait(1).to({scaleX:1.4086,x:250.5},0).wait(1).to({scaleX:1.4094,x:250.55},0).wait(1);
	this.timeline.addTween(_tweenStr_4.to({scaleX:1.4102,x:250.65},0).wait(1).to({scaleX:1.4111,x:250.7},0).wait(1).to({scaleX:1.4119,x:250.85},0).wait(1).to({scaleX:1.4127,x:250.9},0).wait(1).to({scaleX:1.4135,x:250.95},0).wait(1).to({scaleX:1.4143,x:251.05},0).wait(1).to({scaleX:1.4151,x:251.15},0).wait(1).to({scaleX:1.4159,x:251.25},0).wait(1).to({scaleX:1.4167,x:251.3},0).wait(1).to({scaleX:1.4175,x:251.4},0).wait(1).to({scaleX:1.4183,x:251.45},0).wait(1).to({scaleX:1.4191,x:251.55},0).wait(1).to({scaleX:1.42,x:251.65},0).wait(1).to({scaleX:1.4208,x:251.7},0).wait(1).to({scaleX:1.4216,x:251.8},0).wait(1).to({scaleX:1.4224,x:251.9},0).wait(1).to({scaleX:1.4232,x:252},0).wait(1).to({scaleX:1.424,x:252.05},0).wait(1).to({scaleX:1.4248,x:252.1},0).wait(1).to({scaleX:1.4256,x:252.2},0).wait(1).to({scaleX:1.4264,x:252.3},0).wait(1).to({scaleX:1.4272,x:252.4},0).wait(1).to({scaleX:1.4281,x:252.45},0).wait(1).to({scaleX:1.4289,x:252.55},0).wait(1).to({scaleX:1.4297,x:252.65},0).wait(1).to({scaleX:1.4305,x:252.7},0).wait(1).to({scaleX:1.4313,x:252.8},0).wait(1).to({scaleX:1.4321,x:252.85},0).wait(1).to({scaleX:1.4329,x:252.95},0).wait(1).to({scaleX:1.4337,x:253.05},0).wait(1).to({scaleX:1.4345,x:253.15},0).wait(1).to({scaleX:1.4353,x:253.2,y:339.4},0).wait(1).to({scaleX:1.4361,x:253.25},0).wait(1).to({scaleX:1.437,x:253.4},0).wait(1).to({scaleX:1.4378,x:253.45},0).wait(1).to({scaleX:1.4386,x:253.55},0).wait(1).to({scaleX:1.4394,x:253.6},0).wait(1).to({scaleX:1.4402,x:253.75},0).wait(1).to({scaleX:1.441,x:253.8},0).wait(1).to({scaleX:1.4418,x:253.85},0).wait(1).to({scaleX:1.4426,x:253.95},0).wait(1).to({scaleX:1.4434,x:254},0).wait(1).to({scaleX:1.4442,x:254.15},0).wait(1).to({scaleX:1.445,x:254.2},0).wait(1).to({scaleX:1.4459,x:254.25},0).wait(1).to({scaleX:1.4467,x:254.35},0).wait(1).to({scaleX:1.4475,x:254.45},0).wait(1).to({scaleX:1.4483,x:254.55},0).wait(1).to({scaleX:1.4491,x:254.6},0).wait(1).to({scaleX:1.4499,x:254.7},0).wait(1).to({scaleX:1.4507,x:254.75},0).wait(1).to({scaleX:1.4515,x:254.85},0).wait(1).to({scaleX:1.4523,x:254.95},0).wait(1).to({scaleX:1.4531,x:255},0).wait(1).to({scaleX:1.4539,x:255.1},0).wait(1).to({scaleX:1.4548,x:255.2},0).wait(1).to({scaleX:1.4556,x:255.3},0).wait(1).to({scaleX:1.4564,x:255.35},0).wait(1).to({scaleX:1.4572,x:255.4},0).wait(1).to({scaleX:1.458,x:255.5},0).wait(1).to({scaleX:1.4588,x:255.6},0).wait(1).to({scaleX:1.4596,x:255.7},0).wait(1).to({scaleX:1.4604,x:255.75},0).wait(1).to({scaleX:1.4612,x:255.85},0).wait(1).to({scaleX:1.462,x:255.95},0).wait(1).to({scaleX:1.4628,x:256},0).wait(1).to({scaleX:1.4637,x:256.1},0).wait(1).to({scaleX:1.4645,x:256.15},0).wait(1).to({scaleX:1.4653,x:256.25},0).wait(1).to({scaleX:1.4661,x:256.35},0).wait(1).to({scaleX:1.4669,x:256.45},0).wait(1).to({scaleX:1.4677,x:256.5},0).wait(1).to({scaleX:1.4685,x:256.55},0).wait(1).to({scaleX:1.4693,x:256.7},0).wait(1).to({scaleX:1.4701,x:256.75},0).wait(1).to({scaleX:1.4709,x:256.85},0).wait(1).to({scaleX:1.4717,x:256.9},0).wait(1).to({scaleX:1.4726,x:257.05},0).wait(1).to({scaleX:1.4734,x:257.1},0).wait(1).to({scaleX:1.4742,x:257.15},0).wait(1).to({scaleX:1.475,x:257.25,y:339.45},0).wait(1).to({scaleX:1.4758,x:257.3},0).wait(1).to({scaleX:1.4766,x:257.45},0).wait(1).to({scaleX:1.4774,x:257.5},0).wait(1).to({scaleX:1.4782,x:257.6},0).wait(1).to({scaleX:1.479,x:257.65},0).wait(1).to({scaleX:1.4798,x:257.75},0).wait(1).to({scaleX:1.4806,x:257.85},0).wait(1).to({scaleX:1.4815,x:257.9},0).wait(1).to({scaleX:1.4823,x:258},0).wait(1).to({scaleX:1.4831,x:258.05},0).wait(1).to({scaleX:1.4839,x:258.2},0).wait(1).to({scaleX:1.4847,x:258.25},0).wait(1).to({scaleX:1.4855,x:258.3},0).wait(1).to({scaleX:1.4863,x:258.4},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},1).wait(1));

	// loading_text
	this.text = new cjs.Text("coming up with jokes ...", "10px 'Myriad Web Pro Condensed'", "#0000FF");
	this.text.textAlign = "center";
	this.text.lineHeight = 13;
	this.text.lineWidth = 104;
	this.text.parent = this;
	this.text.setTransform(264.1,459.8);
	this.text._off = true;

	this.timeline.addTween(cjs.Tween.get(this.text).wait(95).to({_off:false},0).wait(1).to({x:263.3,y:382.7},0).wait(1).to({x:262.5,y:305.6},0).wait(1).to({y:306.35},0).wait(1).to({y:307.1},0).wait(185).to({x:252.5,y:354.6},0).wait(1533).to({_off:true},1).wait(1));

	// small_loading_box
	this.instance_2 = new lib.smallbox_1("synched",0);
	this.instance_2.setTransform(262.35,350.15,0.5112,0.5111,0,0,0,4.1,7);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(284).to({_off:false},0).wait(1).to({y:353.15},0).wait(1).to({y:352.15},0).wait(1533));

	// loading_box
	this.playbutton = new lib.playbutton();
	this.playbutton.name = "playbutton";
	this.playbutton.setTransform(343.65,211.65,1,1,0,0,0,150,150);
	new cjs.ButtonHelper(this.playbutton, 0, 1, 1);

	this.instance_3 = new lib.loadingguibox("synched",0);
	this.instance_3.setTransform(266.5,470.25,1,1,0,0,0,137.5,84.7);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.playbutton,p:{y:211.65}}]},9).to({state:[{t:this.playbutton,p:{y:227.65}}]},1).to({state:[{t:this.playbutton,p:{y:225.25}}]},1).to({state:[]},9).to({state:[{t:this.instance_3}]},75).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[]},1).wait(1));
	
	var _tweenStr_5 = cjs.Tween.get(this.instance_3).wait(95).to({_off:false},0).wait(1).to({y:392.95},0).wait(1).to({y:315.7},0).wait(1).to({y:316.45},0).wait(1).to({y:317.2},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({y:475.2},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1);
	var _tweenStr_6 = _tweenStr_5.to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1);
	var _tweenStr_7 = _tweenStr_6.to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1);
	var _tweenStr_8 = _tweenStr_7.to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1);
	this.timeline.addTween(_tweenStr_8.to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},1).wait(1));

	// Layer_4
	this.instance_4 = new lib.psihouseai();
	this.instance_4.setTransform(271.35,196.85,1,1,0,0,0,62.6,95.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({alpha:0},11).to({_off:true},9).wait(1799));

	// portal2
	this.skiport2 = new lib.spiningskaianportal();
	this.skiport2.name = "skiport2";
	this.skiport2.setTransform(-179.25,60.25,0.9788,0.9723,0,0,0,0,4.6);
	this.skiport2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.skiport2).wait(399).to({_off:false},0).wait(1).to({regX:-11,regY:4.1,scaleX:0.9859,scaleY:0.9804,x:-81.3,y:110.35},0).wait(1).to({scaleX:0.993,scaleY:0.9884,x:27.35,y:161},0).wait(1).to({scaleX:1.0001,scaleY:0.9964,x:136,y:211.6},0).wait(1).to({scaleX:1.0072,scaleY:1.0044,x:244.65,y:262.2},0).wait(1).to({scaleX:1.0144,scaleY:1.0125,x:353.4,y:312.85},0).wait(152).to({x:475.15,y:293.45},0).wait(1).to({x:596.9,y:274},0).wait(1).to({x:718.65,y:254.6},0).wait(1).to({x:840.45,y:235.2},0).to({_off:true},1).wait(1259));

	// portal
	this.skiport = new lib.spiningskaianportal();
	this.skiport.name = "skiport";
	this.skiport.setTransform(274.25,317.8,0.3698,0.3691,0,0,0,0,4.9);
	this.skiport._off = true;

	
	var _tweenStr_9 = cjs.Tween.get(this.skiport).wait(20).to({_off:false},0).wait(1).to({regX:-11,regY:4.1,scaleX:0.5932,scaleY:0.5921,rotation:-0.2635,x:267.65,y:124.05},0).wait(1).to({scaleX:0.9269,scaleY:0.9254,rotation:-0.5271,x:264.05,y:190.1},0).wait(1).to({scaleX:0.95,scaleY:0.9485,rotation:-0.7906,x:263.75,y:188.2},0).wait(1).to({scaleX:0.9498,scaleY:0.9483,rotation:-1.0541,y:188.25},0).wait(1).to({scaleX:0.9496,scaleY:0.9481,rotation:-1.3177,y:188.35},0).wait(1).to({scaleX:0.9494,scaleY:0.9479,rotation:-1.5812,y:188.4},0).wait(1).to({scaleX:0.9492,scaleY:0.9476,rotation:-1.8447,x:263.8,y:188.45},0).wait(1).to({scaleX:0.949,scaleY:0.9475,rotation:-2.1083,x:263.75,y:188.55},0).wait(1).to({scaleX:0.9488,scaleY:0.9472,rotation:-2.3718,y:188.6},0).wait(1).to({scaleX:0.9485,scaleY:0.947,rotation:-2.6353,x:263.8,y:188.65},0).wait(1).to({scaleX:0.9483,scaleY:0.9468,rotation:-2.8989,y:188.75},0).wait(1).to({scaleX:0.9481,scaleY:0.9466,rotation:-3.1624,x:263.75,y:188.8},0).wait(1).to({scaleX:0.9479,scaleY:0.9464,rotation:-3.426,x:263.8},0).wait(1).to({scaleX:0.9477,scaleY:0.9461,rotation:-3.6895,y:188.85},0).wait(1).to({scaleX:0.9475,scaleY:0.946,rotation:-3.953,x:263.75,y:188.95},0).wait(1).to({scaleX:0.9473,scaleY:0.9457,rotation:-4.2166,x:263.8,y:189},0).wait(1).to({scaleX:0.947,scaleY:0.9455,rotation:-4.4801,x:263.75,y:189.05},0).wait(1).to({scaleX:0.9468,scaleY:0.9453,rotation:-4.7436,y:189.15},0).wait(1).to({scaleX:0.9466,scaleY:0.9451,rotation:-5.0072,x:263.8,y:189.2},0).wait(1).to({scaleX:0.9464,scaleY:0.9449,rotation:-5.2707,y:189.3},0).wait(1).to({scaleX:0.9462,scaleY:0.9447,rotation:-5.5342,y:189.35},0).wait(1).to({scaleX:0.946,scaleY:0.9444,rotation:-5.7978,y:189.4},0).wait(1).to({scaleX:0.9458,scaleY:0.9442,rotation:-6.0613,y:189.5},0).wait(1).to({scaleX:0.9455,scaleY:0.944,rotation:-6.3248,y:189.55},0).wait(1).to({scaleX:0.9453,scaleY:0.9438,rotation:-6.5884,y:189.65},0).wait(1).to({scaleX:0.9451,scaleY:0.9436,rotation:-6.8519,y:189.7},0).wait(1).to({scaleX:0.9449,scaleY:0.9433,rotation:-7.1154,x:263.85,y:189.8},0).wait(1).to({scaleX:0.9447,scaleY:0.9432,rotation:-7.379,y:189.85},0).wait(1).to({scaleX:0.9445,scaleY:0.9429,rotation:-7.6425,x:263.8,y:189.9},0).wait(1).to({scaleX:0.9442,scaleY:0.9427,rotation:-7.906,x:263.85,y:190},0).wait(1).to({scaleX:0.944,scaleY:0.9425,rotation:-8.1696,x:263.8},0).wait(1).to({scaleX:0.9438,scaleY:0.9423,rotation:-8.4331,x:263.85,y:190.05},0).wait(1).to({scaleX:0.9436,scaleY:0.9421,rotation:-8.6966,x:263.9,y:190.1},0).wait(1).to({scaleX:0.9434,scaleY:0.9419,rotation:-8.9602,x:263.85,y:190.2},0).wait(1).to({scaleX:0.9432,scaleY:0.9417,rotation:-9.2237,y:190.25},0).wait(1).to({scaleX:0.943,scaleY:0.9414,rotation:-9.4873,y:190.35},0).wait(1).to({scaleX:0.9427,scaleY:0.9412,rotation:-9.7508,x:263.9,y:190.4},0).wait(1).to({scaleX:0.9426,scaleY:0.941,rotation:-10.0143,x:263.85,y:190.45},0).wait(1).to({scaleX:0.9423,scaleY:0.9408,rotation:-10.2779,x:263.9,y:190.55},0).wait(1).to({scaleX:0.9421,scaleY:0.9406,rotation:-10.5414,y:190.6},0).wait(1).to({scaleX:0.9419,scaleY:0.9404,rotation:-10.8049,x:263.85,y:190.7},0).wait(1).to({scaleX:0.9417,scaleY:0.9402,rotation:-11.0685,x:263.95,y:190.75},0).wait(1).to({scaleX:0.9415,scaleY:0.9399,rotation:-11.332,x:263.9,y:190.85},0).wait(1).to({scaleX:0.9413,scaleY:0.9397,rotation:-11.5955},0).wait(1).to({scaleX:0.941,scaleY:0.9395,rotation:-11.8591,x:263.95,y:190.95},0).wait(1).to({scaleX:0.9408,scaleY:0.9393,rotation:-12.1226},0).wait(1).to({scaleX:0.9406,scaleY:0.9391,rotation:-12.3861,x:264,y:191.05},0).wait(1).to({scaleX:0.9404,scaleY:0.9389,rotation:-12.6497,x:263.95,y:191.1},0).wait(1).to({scaleX:0.9402,scaleY:0.9386,rotation:-12.9132,y:191.2},0).wait(1).to({scaleX:0.94,scaleY:0.9384,rotation:-13.1767,x:264.05,y:191.25},0).wait(1).to({scaleX:0.9398,scaleY:0.9382,rotation:-13.4403,x:264,y:191.35},0).wait(1).to({scaleX:0.9395,scaleY:0.938,rotation:-13.7038,y:191.4},0).wait(1).to({scaleX:0.9393,scaleY:0.9378,rotation:-13.9673,y:191.5},0).wait(1).to({scaleX:0.9391,scaleY:0.9376,rotation:-14.2309,x:264.05,y:191.55},0).wait(1).to({scaleX:0.9389,scaleY:0.9374,rotation:-14.4944,y:191.6},0).wait(1).to({scaleX:0.9387,scaleY:0.9371,rotation:-14.7579,y:191.65},0).wait(1).to({scaleX:0.9385,scaleY:0.9369,rotation:-15.0215,x:264.1,y:191.7},0).wait(1).to({scaleX:0.9383,scaleY:0.9367,rotation:-15.285,x:264.05,y:191.75},0).wait(1).to({scaleX:0.938,scaleY:0.9365,rotation:-15.5486,x:264.1,y:191.8},0).wait(1).to({scaleX:0.9378,scaleY:0.9363,rotation:-15.8121,x:264.05,y:191.9},0).wait(1).to({scaleX:0.9376,scaleY:0.9361,rotation:-16.0756,x:264.1,y:191.95},0).wait(1).to({scaleX:0.9374,scaleY:0.9359,rotation:-16.3392,x:264.15,y:192.05},0).wait(1).to({scaleX:0.9372,scaleY:0.9356,rotation:-16.6027,x:264.1,y:192.1},0).wait(1).to({scaleX:0.937,scaleY:0.9354,rotation:-16.8662,x:264.15,y:192.15},0).wait(1).to({scaleX:0.9368,scaleY:0.9352,rotation:-17.1298,x:264.2,y:192.2},0).wait(1).to({scaleX:0.9365,scaleY:0.935,rotation:-17.3933,x:264.15,y:192.3},0).wait(1).to({scaleX:0.9363,scaleY:0.9348,rotation:-17.6568,x:264.2},0).wait(1).to({scaleX:0.9361,scaleY:0.9346,rotation:-17.9204,y:192.4},0).wait(1).to({scaleX:0.9359,scaleY:0.9343,rotation:-18.1839,y:192.5},0).wait(1).to({scaleX:0.9357,scaleY:0.9341,rotation:-18.4474,x:264.25,y:192.55},0).wait(1).to({scaleX:0.9355,scaleY:0.9339,rotation:-18.711,y:192.65},0).wait(1).to({scaleX:0.9352,scaleY:0.9337,rotation:-18.9745},0).wait(1).to({scaleX:0.9351,scaleY:0.9335,rotation:-19.238,y:192.75},0).wait(1).to({scaleX:0.9348,scaleY:0.9333,rotation:-19.5016,x:264.3,y:192.8},0).wait(1).to({scaleX:0.9346,scaleY:0.9331,rotation:-19.7651,y:192.9},0).wait(1).to({scaleX:0.9344,scaleY:0.9329,rotation:-20.0286},0).wait(1).to({scaleX:0.9342,scaleY:0.9326,rotation:-20.2922,x:264.35,y:193},0).wait(1).to({scaleX:0.934,scaleY:0.9324,rotation:-20.5557,y:193.05},0).wait(1).to({scaleX:0.9338,scaleY:0.9322,rotation:-20.8192,y:193.1},0).wait(1).to({scaleX:0.9336,scaleY:0.932,rotation:-21.0828,y:193.15},0).wait(1).to({scaleX:0.9333,scaleY:0.9318,rotation:-21.3463,x:264.4,y:193.25},0).wait(1).to({scaleX:0.9331,scaleY:0.9316,rotation:-21.6099,y:193.3},0).wait(1).to({scaleX:0.9329,scaleY:0.9313,rotation:-21.8734,y:193.35},0).wait(1).to({scaleX:0.9327,scaleY:0.9311,rotation:-22.1369,x:264.45,y:193.4},0).wait(1).to({scaleX:0.9325,scaleY:0.9309,rotation:-22.4005,y:193.5},0).wait(1).to({scaleX:0.9323,scaleY:0.9307,rotation:-22.664},0).wait(1).to({scaleX:0.932,scaleY:0.9305,rotation:-22.9275,x:264.5,y:193.6},0).wait(1).to({scaleX:0.9318,scaleY:0.9303,rotation:-23.1911,x:264.55,y:193.7},0).wait(1).to({scaleX:0.9316,scaleY:0.9301,rotation:-23.4546,x:264.5,y:193.75},0).wait(1).to({scaleX:0.9314,scaleY:0.9298,rotation:-23.7181,x:264.55,y:193.8},0).wait(1).to({scaleX:0.9312,scaleY:0.9296,rotation:-23.9817,y:193.85},0).wait(1).to({scaleX:0.931,scaleY:0.9294,rotation:-24.2452,y:193.9},0).wait(1).to({scaleX:0.9308,scaleY:0.9292,rotation:-24.5087,x:264.65,y:193.95},0).wait(1).to({scaleX:0.9306,scaleY:0.929,rotation:-24.7723,x:264.6,y:194.05},0).wait(1).to({scaleX:0.9303,scaleY:0.9288,rotation:-25.0358,x:264.65,y:194.1},0).wait(1).to({scaleX:0.9301,scaleY:0.9286,rotation:-25.2993,x:264.7,y:194.15},0).wait(1).to({scaleX:0.9299,scaleY:0.9284,rotation:-25.5629,x:264.65,y:194.25},0).wait(1).to({scaleX:0.9297,scaleY:0.9281,rotation:-25.8264,x:264.7,y:194.3},0).wait(1).to({scaleX:0.9295,scaleY:0.9279,rotation:-26.0899,y:194.35},0).wait(1).to({scaleX:0.9293,scaleY:0.9277,rotation:-26.3535,x:264.75,y:194.4},0).wait(1).to({scaleX:0.9291,scaleY:0.9275,rotation:-26.617,y:194.5},0).wait(1).to({scaleX:0.9289,scaleY:0.9273,rotation:-26.8805},0).wait(1).to({scaleX:0.9286,scaleY:0.9271,rotation:-27.1441,x:264.8,y:194.6},0).wait(1).to({scaleX:0.9284,scaleY:0.9268,rotation:-27.4076,x:264.85,y:194.65},0).wait(1).to({scaleX:0.9282,scaleY:0.9266,rotation:-27.6712,x:264.8,y:194.7},0).wait(1).to({scaleX:0.928,scaleY:0.9264,rotation:-27.9347,x:264.9,y:194.8},0).wait(1).to({scaleX:0.9278,scaleY:0.9262,rotation:-28.1982},0).wait(1).to({scaleX:0.9276,scaleY:0.926,rotation:-28.4618,y:194.9},0).wait(1).to({scaleX:0.9273,scaleY:0.9258,rotation:-28.7253,y:194.95},0).wait(1).to({scaleX:0.9271,scaleY:0.9256,rotation:-28.9888,x:265,y:195},0).wait(1).to({scaleX:0.9269,scaleY:0.9253,rotation:-29.2524,x:264.95,y:195.1},0).wait(1).to({scaleX:0.8127,scaleY:0.8113,rotation:-29.5159,x:266.1,y:159.4},0).wait(1).to({scaleX:0.6985,scaleY:0.6973,rotation:-29.7794,x:267.3,y:123.7},0).wait(1).to({scaleY:0.6972,rotation:-30.043,y:123.75},0).wait(1).to({scaleY:0.6973,rotation:-30.3065,y:123.8},0).wait(1).to({scaleY:0.6972,rotation:-30.57,x:267.35},0).wait(1).to({scaleY:0.6973,rotation:-30.8336,x:267.3,y:123.85},0).wait(1).to({rotation:-31.0971,x:267.35},0).wait(1).to({scaleY:0.6972,rotation:-31.3606,x:267.4,y:123.9},0).wait(1).to({scaleY:0.6973,rotation:-31.6242,y:123.95},0).wait(1).to({scaleY:0.6972,rotation:-31.8877,y:124},0).wait(1).to({scaleY:0.6973,rotation:-32.1512},0).wait(1).to({rotation:-32.4148,x:267.45},0).wait(1).to({scaleY:0.6972,rotation:-32.6783,x:267.5,y:124.05},0).wait(1).to({scaleY:0.6973,rotation:-32.9418,x:267.45,y:124.1},0).wait(1).to({scaleY:0.6972,rotation:-33.2054},0).wait(1).to({scaleY:0.6973,rotation:-33.4689,x:267.55,y:124.2},0).wait(1).to({scaleY:0.6972,rotation:-33.7325},0).wait(1).to({scaleY:0.6973,rotation:-33.996},0).wait(1).to({rotation:-34.2595,y:124.25},0).wait(1).to({scaleY:0.6972,rotation:-34.5231},0).wait(1).to({rotation:-34.7866,x:267.65,y:124.35},0).wait(1).to({rotation:-35.0501,x:267.6},0).wait(1).to({scaleY:0.6973,rotation:-35.3137,x:267.65,y:124.4},0).wait(1).to({scaleY:0.6972,rotation:-35.5772},0).wait(1).to({scaleY:0.6973,rotation:-35.8407,x:267.6},0).wait(1).to({rotation:-36.1043,x:267.7,y:124.45},0).wait(1).to({scaleY:0.6972,rotation:-36.3678,y:124.5},0).wait(1).to({scaleY:0.6973,rotation:-36.6313,x:267.75,y:124.55},0).wait(1).to({scaleY:0.6972,rotation:-36.8949,x:267.7},0).wait(1).to({scaleY:0.6973,rotation:-37.1584,x:267.8,y:124.6},0).wait(1).to({scaleY:0.6972,rotation:-37.4219,y:124.55},0).wait(1).to({scaleY:0.6973,rotation:-37.6855,y:124.65},0).wait(1).to({scaleY:0.6972,rotation:-37.949},0).wait(1).to({rotation:-38.2125,y:124.7},0).wait(1).to({scaleY:0.6973,rotation:-38.4761,x:267.9,y:124.75},0).wait(1).to({rotation:-38.7396},0).wait(1).to({scaleY:0.6972,rotation:-39.0031,y:124.8},0).wait(1).to({rotation:-39.2667},0).wait(1).to({rotation:-39.5302,y:124.85},0).wait(1).to({rotation:-39.7938,x:268},0).wait(1).to({rotation:-40.0573,y:124.9},0).wait(1).to({rotation:-40.3208,y:124.95},0).wait(1).to({rotation:-40.5844},0).wait(1).to({rotation:-40.8479,x:268.05,y:125},0).wait(1).to({rotation:-41.1114,x:268.1},0).wait(1).to({rotation:-41.375,y:125.05},0).wait(1).to({scaleY:0.6973,rotation:-41.6385,y:125.1},0).wait(1).to({rotation:-41.902,x:268.15,y:125.15},0).wait(1).to({scaleY:0.6972,rotation:-42.1656,y:125.1},0).wait(1).to({rotation:-42.4291,x:268.2,y:125.15},0).wait(1).to({rotation:-42.6926},0).wait(1).to({rotation:-42.9562,x:268.25,y:125.25},0).wait(1).to({rotation:-43.2197},0).wait(1).to({rotation:-43.4832},0).wait(1).to({rotation:-43.7468,x:268.3},0).wait(1).to({rotation:-44.0103,y:125.35},0).wait(1).to({rotation:-44.2738,x:268.35},0).wait(1).to({rotation:-44.5374,y:125.4},0).wait(1).to({scaleY:0.6973,rotation:-44.8009},0).wait(1).to({scaleY:0.6972,rotation:-45.0644},0).wait(1).to({rotation:-45.328,x:268.45,y:125.45},0).wait(1).to({rotation:-45.5915,y:125.5},0).wait(1).to({rotation:-45.8551},0).wait(1).to({rotation:-46.1186,y:125.55},0).wait(1).to({rotation:-46.3821,x:268.5},0).wait(1).to({scaleY:0.6973,rotation:-46.6457,x:268.6,y:125.6},0).wait(1).to({scaleY:0.6972,rotation:-46.9092},0).wait(1).to({rotation:-47.1727,y:125.65},0).wait(1).to({rotation:-47.4363},0).wait(1).to({rotation:-47.6998,x:268.65,y:125.7},0).wait(1).to({rotation:-47.9633},0).wait(1).to({rotation:-48.2269,x:268.75,y:125.75},0).wait(1).to({rotation:-48.4904,x:268.7},0).wait(1).to({rotation:-48.7539,x:268.75,y:125.85},0).wait(1).to({rotation:-49.0175,y:125.8},0).wait(1).to({rotation:-49.281,x:268.8},0).wait(1).to({rotation:-49.5445,x:268.85,y:125.85},0).wait(1).to({rotation:-49.8081,y:125.9},0).wait(1).to({rotation:-50.0716,y:125.95},0).wait(1).to({rotation:-50.3351,x:268.9,y:125.9},0).wait(1).to({rotation:-50.5987,y:125.95},0).wait(1).to({rotation:-50.8622,x:268.95,y:126},0).wait(1).to({scaleY:0.6973,rotation:-51.1257,x:269,y:126.05},0).wait(1).to({scaleY:0.6972,rotation:-51.3893},0).wait(1).to({rotation:-51.6528,x:269.05},0).wait(1).to({rotation:-51.9164,y:126.1},0).wait(1).to({rotation:-52.1799,x:269.1},0).wait(1).to({rotation:-52.4434,x:269.05,y:126.15},0).wait(1).to({rotation:-52.707,x:269.1},0).wait(1).to({scaleY:0.6973,rotation:-52.9705,x:269.15,y:126.2},0).wait(1).to({rotation:-53.234,x:269.2},0).wait(1).to({rotation:-53.4976,x:269.25,y:126.25},0).wait(1).to({scaleY:0.6972,rotation:-53.7611,x:269.2},0).wait(1).to({scaleY:0.6973,rotation:-54.0246,x:269.25,y:126.3},0).wait(1).to({scaleY:0.6972,rotation:-54.2882},0).wait(1).to({scaleY:0.6973,rotation:-54.5517,x:269.35},0).wait(1).to({scaleY:0.6972,rotation:-54.8152,y:126.35},0).wait(1).to({scaleY:0.6973,rotation:-55.0788,y:126.4},0).wait(1).to({rotation:-55.3423,x:269.4},0).wait(1).to({scaleY:0.6972,rotation:-55.6058},0).wait(1).to({scaleY:0.6973,rotation:-55.8694,x:269.45},0).wait(1).to({scaleY:0.6972,rotation:-56.1329,y:126.5},0).wait(1).to({scaleY:0.6973,rotation:-56.3964,x:269.55},0).wait(1).to({scaleY:0.6972,rotation:-56.66,y:126.45},0).wait(1).to({scaleY:0.6973,rotation:-56.9235,y:126.5},0).wait(1).to({rotation:-57.187,x:269.6,y:126.55},0).wait(1).to({scaleY:0.6972,rotation:-57.4506,y:126.6},0).wait(1).to({scaleY:0.6973,rotation:-57.7141,x:269.65},0).wait(1).to({scaleY:0.6972,rotation:-57.9777,x:269.7,y:126.55},0).wait(1).to({scaleY:0.6973,rotation:-58.2412,y:126.65},0).wait(1).to({rotation:-58.5047,x:269.75},0).wait(1).to({scaleX:0.8731,scaleY:0.8715,rotation:-58.7683,x:314.85,y:175.4},0).wait(1).to({scaleX:1.0477,scaleY:1.0458,rotation:-59.0318,x:360,y:224.2},0).wait(1).to({scaleX:1.2224,scaleY:1.2201,rotation:-59.2953,x:405.15,y:272.95},0).wait(1).to({scaleX:1.397,scaleY:1.3944,rotation:-59.5589,x:450.3,y:321.75},0).wait(1).to({scaleX:1.5716,scaleY:1.5687,rotation:-59.8224,x:495.5,y:370.55},0).wait(1).to({rotation:-60.0859,x:495.55,y:370.6},0).wait(1).to({rotation:-60.3495,x:495.65,y:370.65},0).wait(1).to({rotation:-60.613,x:495.7},0).wait(1).to({rotation:-60.8765,x:495.75,y:370.75},0).wait(1).to({rotation:-61.1401,x:495.85},0).wait(1).to({rotation:-61.4036,x:495.95,y:370.85},0).wait(1).to({rotation:-61.6671},0).wait(1).to({rotation:-61.9307,x:496.05,y:370.9},0).wait(1).to({rotation:-62.1942,x:496.15,y:370.95},0).wait(1).to({rotation:-62.4577,y:371},0).wait(1).to({rotation:-62.7213,x:496.25},0).wait(1).to({rotation:-62.9848,x:496.35,y:371.05},0).wait(1).to({rotation:-63.2483,y:371.1},0).wait(1).to({rotation:-63.5119,x:496.45},0).wait(1).to({rotation:-63.7754,x:496.5,y:371.2},0).wait(1).to({rotation:-64.039,x:496.6},0).wait(1).to({rotation:-64.3025,x:496.65,y:371.3},0).wait(1).to({rotation:-64.566,x:496.75},0).wait(1).to({rotation:-64.8296,y:371.35},0).wait(1).to({rotation:-65.0931,x:496.85,y:371.4},0).wait(1).to({rotation:-65.3566,x:496.95,y:371.45},0).wait(1).to({rotation:-65.6202},0).wait(1).to({rotation:-65.8837,x:497.05,y:371.55},0).wait(1).to({rotation:-66.1472,x:497.15},0).wait(1).to({rotation:-66.4108,x:497.25},0).wait(1).to({rotation:-66.6743,y:371.6},0).wait(1).to({rotation:-66.9378,x:497.35},0).wait(1).to({rotation:-67.2014,x:497.45,y:371.7},0).wait(1).to({rotation:-67.4649,x:497.5},0).wait(1).to({rotation:-67.7284,x:497.55,y:371.75},0).wait(1).to({rotation:-67.992,x:497.6,y:371.8},0).wait(1).to({rotation:-68.2555,x:497.7,y:371.85},0).wait(1).to({rotation:-68.519,x:497.75},0).wait(1).to({rotation:-68.7826,x:497.85,y:371.9},0).wait(1).to({rotation:-69.0461,x:497.9,y:371.95},0).wait(1).to({scaleX:1.171,scaleY:1.1688,rotation:-69.3096,x:350.1,y:257.4},0).wait(1).to({scaleX:0.7703,scaleY:0.7688,rotation:-69.5732,x:202.25,y:142.8},0).wait(1).to({scaleX:0.7704,rotation:-69.8367,x:202.3,y:142.85},0).wait(1).to({scaleX:0.7703,rotation:-70.1003,y:142.8},0).wait(1).to({rotation:-70.3638,x:202.35,y:142.85},0).wait(1).to({rotation:-70.6273,y:142.9},0).wait(1).to({rotation:-70.8909,x:202.45},0).wait(1).to({rotation:-71.1544,y:142.85},0).wait(1).to({rotation:-71.4179,x:202.5,y:142.95},0).wait(1).to({rotation:-71.6815,x:202.55},0).wait(1).to({rotation:-71.945},0).wait(1).to({scaleX:0.7704,rotation:-72.2085,x:202.6},0).wait(1).to({scaleX:0.7703,rotation:-72.4721,x:202.65,y:143},0).wait(1).to({rotation:-72.7356,x:202.7},0).wait(1).to({scaleX:0.7704,rotation:-72.9991,x:202.65},0).wait(1).to({scaleX:0.7703,rotation:-73.2627,x:202.7},0).wait(1).to({rotation:-73.5262,x:202.75,y:143.05},0).wait(1).to({rotation:-73.7897,x:202.85,y:143.1},0).wait(1).to({scaleX:0.7704,rotation:-74.0533,y:143.05},0).wait(1).to({scaleX:0.7703,rotation:-74.3168,x:202.9},0).wait(1).to({scaleX:0.7704,rotation:-74.5803,x:202.95,y:143.1},0).wait(1).to({rotation:-74.8439,x:203},0).wait(1).to({scaleX:0.7438,scaleY:0.7424,rotation:-75.1074,x:239.95,y:138.6},0).wait(1).to({scaleX:0.7173,scaleY:0.7159,rotation:-75.3709,x:276.85,y:134.15},0).wait(1).to({scaleX:0.6908,scaleY:0.6895,rotation:-75.6345,x:313.8,y:129.6},0).wait(1).to({scaleX:0.6642,scaleY:0.663,rotation:-75.898,x:350.75,y:125.15},0).wait(1).to({scaleX:0.6377,scaleY:0.6366,rotation:-76.1616,x:387.7,y:120.6},0).wait(1).to({scaleX:0.6112,scaleY:0.6102,rotation:-76.4251,x:424.6,y:116.2},0).wait(1).to({scaleX:0.6096,scaleY:0.6085,rotation:-76.6886,x:424.75,y:116},0).wait(1).to({scaleX:0.6079,scaleY:0.6069,rotation:-76.9522,x:424.85,y:115.95},0).wait(1).to({scaleX:0.6063,scaleY:0.6052,rotation:-77.2157,x:424.95,y:115.85},0).wait(1).to({scaleX:0.6046,scaleY:0.6036,rotation:-77.4792,x:425.1,y:115.75},0).wait(1).to({scaleX:0.6029,scaleY:0.6019,rotation:-77.7428,x:425.25,y:115.65},0).wait(1).to({scaleX:0.6013,scaleY:0.6003,rotation:-78.0063,x:425.4,y:115.5},0).wait(1).to({scaleX:0.5996,scaleY:0.5987,rotation:-78.2698,x:425.5,y:115.45},0).wait(1).to({scaleX:0.598,scaleY:0.597,rotation:-78.5334,x:425.65,y:115.35},0).wait(1).to({scaleX:0.5963,scaleY:0.5954,rotation:-78.7969,x:425.8,y:115.25},0).wait(1).to({scaleX:0.5947,scaleY:0.5937,rotation:-79.0604,x:425.9,y:115.1},0).wait(1).to({scaleX:0.593,scaleY:0.5921,rotation:-79.324,x:426.05,y:115},0).wait(1).to({scaleX:0.5914,scaleY:0.5904,rotation:-79.5875,x:426.15,y:114.95},0).wait(1).to({scaleX:0.5897,scaleY:0.5888,rotation:-79.851,x:426.3,y:114.85},0).wait(1).to({scaleX:0.5881,scaleY:0.5871,rotation:-80.1146,x:426.4,y:114.7},0).wait(1).to({scaleX:0.6154,scaleY:0.6144,rotation:-80.3781,x:328.85,y:158.5},0).wait(1).to({scaleX:0.6428,scaleY:0.6417,rotation:-80.6416,x:231.3,y:202.4},0).wait(1).to({scaleX:0.6701,scaleY:0.6689,rotation:-80.9052,x:133.8,y:246.2},0).wait(1).to({scaleX:0.701,scaleY:0.6996,rotation:-81.1687,x:138.6,y:245.25},0).wait(1).to({scaleX:0.7318,scaleY:0.7304,rotation:-81.4322,x:143.45,y:244.3},0).wait(1).to({scaleX:0.7626,scaleY:0.7611,rotation:-81.6958,x:148.3,y:243.35},0).wait(1).to({scaleX:0.7934,scaleY:0.7917,rotation:-81.9593,x:153.1,y:242.4},0).wait(1).to({scaleX:0.8243,scaleY:0.8225,rotation:-82.2229,x:157.95,y:241.5},0).wait(1).to({rotation:-82.4864,x:158},0).wait(1).to({rotation:-82.7499,x:158.05},0).wait(1).to({rotation:-83.0135},0).wait(1).to({rotation:-83.277,x:158.1},0).wait(1).to({rotation:-83.5405,x:158.15,y:241.55},0).wait(1).to({scaleY:0.8224,rotation:-83.8041,y:241.5},0).wait(1).to({scaleY:0.8225,rotation:-84.0676,x:158.2},0).wait(1).to({rotation:-84.3311,x:158.25,y:241.55},0).wait(1).to({rotation:-84.5947,x:158.3},0).wait(1).to({rotation:-84.8582,x:158.35},0).wait(1).to({rotation:-85.1217,x:158.4,y:241.6},0).wait(1).to({rotation:-85.3853,y:241.55},0).wait(1).to({rotation:-85.6488,x:158.45,y:241.6},0).wait(1).to({rotation:-85.9123,x:158.5},0).wait(1).to({rotation:-86.1759,x:158.55,y:241.55},0).wait(1).to({scaleY:0.8224,rotation:-86.4394,x:158.6,y:241.6},0).wait(1).to({scaleY:0.8225,rotation:-86.7029,x:158.65},0).wait(1).to({rotation:-86.9665},0).wait(1).to({rotation:-87.23,x:158.7},0).wait(1).to({rotation:-87.4935,x:158.75},0).wait(1).to({rotation:-87.7571,x:158.8,y:241.65},0).wait(1).to({rotation:-88.0206,x:158.85,y:241.6},0).wait(1).to({rotation:-88.2841,x:158.9},0).wait(1).to({rotation:-88.5477,y:241.65},0).wait(1).to({rotation:-88.8112,x:158.95,y:241.6},0).wait(1).to({scaleY:0.8224,rotation:-89.0748,x:159},0).wait(1).to({scaleY:0.8225,rotation:-89.3383,x:159.05,y:241.65},0).wait(1).to({rotation:-89.6018,x:159.1,y:241.6},0).wait(1).to({rotation:-89.8654,x:159.15},0).wait(1).to({rotation:-90.1289,y:241.65},0).wait(1).to({scaleX:0.8949,scaleY:0.8929,rotation:-90.3924,x:214,y:213.55},0).wait(1).to({scaleX:0.9656,scaleY:0.9633,rotation:-90.656,x:268.85,y:185.45},0).wait(1).to({rotation:-90.9195,x:267.6,y:186.1},0).wait(1).to({rotation:-91.183,x:267.65},0).wait(1).to({rotation:-91.4466,x:267.7},0).wait(1).to({rotation:-91.7101,x:267.75},0).wait(1).to({rotation:-91.9736,x:267.8},0).wait(1).to({rotation:-92.2372,x:267.85},0).wait(1).to({rotation:-92.5007,x:267.9,y:186.15},0).wait(1).to({rotation:-92.7642,x:267.95,y:186.1},0).wait(1).to({scaleY:0.9634,rotation:-93.0278,x:268,y:186.15},0).wait(1).to({scaleY:0.9633,rotation:-93.2913,x:268.05,y:186.1},0).wait(1).to({rotation:-93.5548,x:268.1,y:186.15},0).wait(1).to({scaleY:0.9634,rotation:-93.8184,x:268.15},0).wait(1).to({rotation:-94.0819,x:268.2,y:186.1},0).wait(1).to({scaleY:0.9633,rotation:-94.3454,x:268.25,y:186.15},0).wait(1).to({rotation:-94.609,x:268.35},0).wait(1).to({scaleY:0.9634,rotation:-94.8725,x:268.4},0).wait(1).to({scaleY:0.9633,rotation:-95.1361,x:268.45},0).wait(1).to({rotation:-95.3996,x:268.5},0).wait(1).to({scaleY:0.9634,rotation:-95.6631,x:268.55,y:186.1},0).wait(1).to({scaleY:0.9633,rotation:-95.9267,x:268.6},0).wait(1).to({rotation:-96.1902,x:268.65},0).wait(1).to({rotation:-96.4537},0).wait(1).to({rotation:-96.7173,x:268.7,y:186.15},0).wait(1).to({rotation:-96.9808,x:268.75,y:186.1},0).wait(1).to({rotation:-97.2443,x:268.8,y:186.15},0).wait(1).to({scaleY:0.9634,rotation:-97.5079,x:268.85},0).wait(1).to({scaleY:0.9633,rotation:-97.7714,x:268.9,y:186.05},0).wait(1).to({rotation:-98.0349,x:268.95,y:186.1},0).wait(1).to({scaleY:0.9634,rotation:-98.2985,x:269},0).wait(1).to({rotation:-98.562,x:269.05},0).wait(1).to({scaleY:0.9633,rotation:-98.8255,x:269.15},0).wait(1).to({rotation:-99.0891,x:269.2,y:186.15},0).wait(1).to({rotation:-99.3526,x:269.25,y:186.1},0).wait(1).to({rotation:-99.6161,y:186.05},0).wait(1).to({rotation:-99.8797,x:269.3},0).wait(1).to({scaleX:1.1843,scaleY:1.1816,rotation:-100.1432,x:242.35,y:137.5},0).wait(1).to({scaleX:1.4031,scaleY:1.3998,rotation:-100.4067,x:215.4,y:88.95},0).wait(1).to({scaleX:1.6218,scaleY:1.618,rotation:-100.6703,x:188.45,y:40.35},0).wait(1).to({scaleX:1.8406,scaleY:1.8363,rotation:-100.9338,x:161.6,y:-8.15},0).wait(1).to({scaleX:2.0594,scaleY:2.0546,rotation:-101.1974,x:134.7,y:-56.75},0).wait(1).to({scaleX:2.0593,scaleY:2.0545,rotation:-101.4609,x:134.05,y:-56.7},0).wait(1).to({scaleX:2.0594,rotation:-101.7244,x:133.4},0).wait(1).to({rotation:-101.988,x:132.75,y:-56.8},0).wait(1).to({rotation:-102.2515,x:132.15},0).wait(1).to({rotation:-102.515,x:131.45,y:-56.85},0).wait(1).to({scaleY:2.0546,rotation:-102.7786,x:130.8,y:-56.8},0).wait(1).to({scaleY:2.0545,rotation:-103.0421,x:130.15,y:-56.85},0).wait(1).to({rotation:-103.3056,x:129.5},0).wait(1).to({scaleY:2.0546,rotation:-103.5692,x:128.85,y:-56.9},0).wait(1).to({scaleY:2.0545,rotation:-103.8327,x:128.25,y:-56.85},0).wait(1).to({scaleX:2.0593,rotation:-104.0962,x:127.55,y:-56.9},0).wait(1).to({scaleX:2.0594,scaleY:2.0546,rotation:-104.3598,x:126.9},0).wait(1).to({rotation:-104.6233,x:126.25,y:-56.95},0).wait(1);
	var _tweenStr_10 = _tweenStr_9.to({scaleY:2.0545,rotation:-104.8868,x:125.6},0).wait(1).to({scaleY:2.0546,rotation:-105.1504,x:125,y:-57},0).wait(1).to({scaleY:2.0545,rotation:-105.4139,x:124.3},0).wait(1).to({rotation:-105.6774,x:123.65,y:-57.05},0).wait(1).to({scaleY:2.0546,rotation:-105.941,x:123,y:-57},0).wait(1).to({scaleY:2.0545,rotation:-106.2045,x:122.4,y:-57.05},0).wait(1).to({scaleX:2.0593,rotation:-106.468,x:121.75,y:-57.1},0).wait(1).to({scaleX:2.0594,rotation:-106.7316,x:121.05,y:-57.05},0).wait(1).to({scaleY:2.0546,rotation:-106.9951,x:120.4,y:-57.1},0).wait(1).to({scaleY:2.0545,rotation:-107.2587,x:119.8,y:-57.15},0).wait(1).to({rotation:-107.5222,x:119.15,y:-57.2},0).wait(1).to({scaleY:2.0546,rotation:-107.7857,x:118.45},0).wait(1).to({scaleY:2.0545,rotation:-108.0493,x:117.8},0).wait(1).to({rotation:-108.3128,x:117.2,y:-57.25},0).wait(1).to({rotation:-108.5763,x:116.55,y:-57.3},0).wait(1).to({rotation:-108.8399,x:115.85,y:-57.25},0).wait(1).to({rotation:-109.1034,x:115.2,y:-57.3},0).wait(1).to({scaleY:2.0546,rotation:-109.3669,x:114.6,y:-57.4},0).wait(1).to({scaleY:2.0545,rotation:-109.6305,x:113.95},0).wait(1).to({rotation:-109.894,x:113.25},0).wait(1).to({rotation:-110.1575,x:112.65,y:-57.45},0).wait(1).to({rotation:-110.4211,x:112},0).wait(1).to({rotation:-110.6846,x:113.15,y:-57.5},0).wait(1).to({rotation:-110.9481,x:114.3},0).wait(1).to({rotation:-111.2117,x:115.5,y:-57.55},0).wait(1).to({rotation:-111.4752,x:116.65,y:-57.6},0).wait(1).to({scaleY:2.0546,rotation:-111.7387,x:117.8},0).wait(1).to({scaleY:2.0545,rotation:-112.0023,x:119,y:-57.65},0).wait(1).to({rotation:-112.2658,x:120.15,y:-57.7},0).wait(1).to({scaleY:2.0546,rotation:-112.5293,x:121.35,y:-57.75},0).wait(1).to({scaleY:2.0545,rotation:-112.7929,x:122.5,y:-57.7},0).wait(1).to({rotation:-113.0564,x:123.6,y:-57.75},0).wait(1).to({rotation:-113.32,x:124.8,y:-57.85},0).wait(1).to({scaleX:2.0593,rotation:-113.5835,x:125.95},0).wait(1).to({scaleX:2.0594,rotation:-113.847,x:127.1,y:-57.9},0).wait(1).to({scaleY:2.0546,rotation:-114.1106,x:128.3},0).wait(1).to({scaleX:2.0593,scaleY:2.0545,rotation:-114.3741,x:129.45,y:-57.95},0).wait(1).to({scaleX:2.0594,rotation:-114.6376,x:130.6},0).wait(1).to({rotation:-114.9012,x:131.8,y:-58.05},0).wait(1).to({rotation:-115.1647,x:132.95,y:-58.1},0).wait(1).to({scaleY:2.0546,rotation:-115.4282,x:134.15},0).wait(1).to({scaleY:2.0545,rotation:-115.6918,x:135.25,y:-58.15},0).wait(1).to({rotation:-115.9553,x:136.4,y:-58.2},0).wait(1).to({rotation:-116.2188,x:137.6},0).wait(1).to({scaleX:2.0593,rotation:-116.4824,x:138.75,y:-58.25},0).wait(1).to({scaleX:2.0594,rotation:-116.7459,x:139.9,y:-58.3},0).wait(1).to({rotation:-117.0094,x:141.1,y:-58.35},0).wait(1).to({scaleX:2.0593,rotation:-117.273,x:142.3},0).wait(1).to({scaleX:2.0594,rotation:-117.5365,x:143.35,y:-58.4},0).wait(1).to({rotation:-117.8,x:144.55,y:-58.45},0).wait(1).to({rotation:-118.0636,x:145.75,y:-58.5},0).wait(1).to({rotation:-118.3271,x:146.9,y:-58.55},0).wait(1).to({rotation:-118.5906,x:148.05,y:-58.6},0).wait(1).to({rotation:-118.8542,x:149.25},0).wait(1).to({rotation:-119.1177,x:150.35,y:-58.65},0).wait(1).to({scaleX:2.0593,rotation:-119.3813,x:151.55,y:-58.75},0).wait(1).to({scaleX:2.0594,rotation:-119.6448,x:152.65},0).wait(1).to({rotation:-119.9083,x:153.85,y:-58.8},0).wait(1).to({rotation:-120.1719,x:155.05,y:-58.85},0).wait(1).to({rotation:-120.4354,x:156.2},0).wait(1).to({scaleX:2.0593,rotation:-120.6989,x:157.35,y:-58.95},0).wait(1).to({scaleX:2.0594,rotation:-120.9625,x:158.45,y:-59.05},0).wait(1).to({rotation:-121.226,x:159.65},0).wait(1).to({rotation:-121.4895,x:160.85,y:-59.1},0).wait(1).to({rotation:-121.7531,x:161.95,y:-59.15},0).wait(1).to({scaleX:2.0593,rotation:-122.0166,x:163.15,y:-59.2},0).wait(1).to({scaleX:2.0594,rotation:-122.2801,x:164.25,y:-59.25},0).wait(1).to({rotation:-122.5437,x:165.45,y:-59.3},0).wait(1).to({rotation:-122.8072,x:166.6},0).wait(1).to({rotation:-123.0707,x:167.75,y:-59.35},0).wait(1).to({rotation:-123.3343,x:168.95,y:-59.45},0).wait(1).to({rotation:-123.5978,x:170.05,y:-59.5},0).wait(1).to({rotation:-123.8613,x:171.2,y:-59.55},0).wait(1).to({rotation:-124.1249,x:172.35,y:-59.6},0).wait(1).to({scaleX:2.0593,rotation:-124.3884,x:173.55,y:-59.65},0).wait(1).to({scaleX:2.0594,rotation:-124.6519,x:174.75,y:-59.7},0).wait(1).to({rotation:-124.9155,x:175.85},0).wait(1).to({scaleX:2.0593,rotation:-125.179,x:177,y:-59.8},0).wait(1).to({scaleX:2.0594,rotation:-125.4426,x:178.15,y:-59.9},0).wait(1).to({scaleX:2.0593,rotation:-125.7061,x:179.3},0).wait(1).to({scaleX:2.0594,rotation:-125.9696,x:180.45,y:-59.95},0).wait(1).to({rotation:-126.2332,x:181.65,y:-60.05},0).wait(1).to({rotation:-126.4967,x:182.75,y:-60.1},0).wait(1).to({rotation:-126.7602,x:183.95,y:-60.15},0).wait(1).to({rotation:-127.0238,x:185.1},0).wait(1).to({rotation:-127.2873,x:186.2,y:-60.25},0).wait(1).to({scaleX:2.0593,rotation:-127.5508,x:187.4,y:-60.35},0).wait(1).to({scaleX:2.0594,rotation:-127.8144,x:188.55},0).wait(1).to({scaleX:2.0593,rotation:-128.0779,x:189.7,y:-60.4},0).wait(1).to({scaleX:2.0594,rotation:-128.3414,x:190.85,y:-60.5},0).wait(1).to({rotation:-128.605,x:192.05,y:-60.55},0).wait(1).to({rotation:-128.8685,x:193.15,y:-60.6},0).wait(1).to({scaleX:2.0593,rotation:-129.132,x:194.35,y:-60.65},0).wait(1).to({scaleX:2.0594,rotation:-129.3956,x:195.45,y:-60.75},0).wait(1).to({scaleX:2.0593,rotation:-129.6591,x:196.6,y:-60.8},0).wait(1).to({rotation:-129.9226,x:197.75,y:-60.85},0).wait(1).to({rotation:-130.1862,x:198.9,y:-60.9},0).wait(1).to({scaleX:2.0594,rotation:-130.4497,x:200.05,y:-60.95},0).wait(1).to({rotation:-130.7132,x:201.25,y:-61.05},0).wait(1).to({scaleX:2.0593,rotation:-130.9768,x:202.35},0).wait(1).to({rotation:-131.2403,x:203.55,y:-61.15},0).wait(1).to({scaleX:2.0594,rotation:-131.5039,x:204.65,y:-61.25},0).wait(1).to({scaleX:2.0593,rotation:-131.7674,x:204.75},0).wait(1).to({scaleX:2.0594,rotation:-132.0309,x:204.8,y:-61.35},0).wait(1).to({scaleX:2.0593,rotation:-132.2945,x:204.95,y:-61.4},0).wait(1).to({rotation:-132.558,y:-61.45},0).wait(1).to({scaleX:2.0594,rotation:-132.8215,x:205.1,y:-61.55},0).wait(1).to({scaleX:2.0593,rotation:-133.0851,y:-61.6},0).wait(1).to({scaleX:2.0594,rotation:-133.3486,x:205.25,y:-61.7},0).wait(1).to({scaleX:2.0593,rotation:-133.6121,x:205.35},0).wait(1).to({scaleX:2.0594,rotation:-133.8757,y:-61.8},0).wait(1).to({rotation:-134.1392,x:205.5,y:-61.85},0).wait(1).to({scaleX:2.0593,rotation:-134.4027,x:205.55,y:-61.9},0).wait(1).to({rotation:-134.6663,x:205.6,y:-62},0).wait(1).to({rotation:-134.9298,x:205.7,y:-62.05},0).wait(1).to({scaleX:2.0594,rotation:-135.1933,x:205.8,y:-62.15},0).wait(1).to({scaleX:2.0593,rotation:-135.4569,x:205.85,y:-62.2},0).wait(1).to({scaleX:2.0594,rotation:-135.7204,x:205.95,y:-62.3},0).wait(1).to({rotation:-135.9839,x:206.05,y:-62.35},0).wait(1).to({rotation:-136.2475,x:206.1,y:-62.45},0).wait(1).to({rotation:-136.511,x:206.2},0).wait(1).to({rotation:-136.7745,x:206.25,y:-62.6},0).wait(1).to({scaleX:2.0593,rotation:-137.0381,x:206.35},0).wait(1).to({rotation:-137.3016,x:206.4,y:-62.7},0).wait(1).to({scaleX:2.0594,rotation:-137.5652,x:206.5,y:-62.75},0).wait(1).to({scaleX:2.0593,rotation:-137.8287,x:206.55,y:-62.85},0).wait(1).to({scaleX:2.0594,rotation:-138.0922,x:206.65},0).wait(1).to({scaleX:2.0593,rotation:-138.3558,x:206.75,y:-63},0).wait(1).to({rotation:-138.6193,y:-63.05},0).wait(1).to({scaleX:2.0594,rotation:-138.8828,x:206.85,y:-63.15},0).wait(1).to({rotation:-139.1464,x:206.95,y:-63.2},0).wait(1).to({scaleX:2.0593,rotation:-139.4099,x:207,y:-63.25},0).wait(1).to({rotation:-139.6734,x:207.05,y:-63.35},0).wait(1).to({scaleX:2.0594,rotation:-139.937,x:207.15,y:-63.4},0).wait(1).to({rotation:-140.2005,x:207.25,y:-63.5},0).wait(1).to({scaleX:2.0593,rotation:-140.464,y:-63.6},0).wait(1).to({scaleX:2.0594,rotation:-140.7276,x:207.4},0).wait(1).to({scaleX:2.0593,rotation:-140.9911,x:207.45,y:-63.75},0).wait(1).to({scaleX:1.8488,scaleY:1.8444,rotation:-141.2546,x:228.05,y:4.15},0).wait(1).to({scaleX:1.6383,scaleY:1.6343,rotation:-141.5182,x:248.6,y:71.95},0).wait(1).to({scaleX:1.4277,scaleY:1.4243,rotation:-141.7817,x:269.2,y:139.8},0).wait(1).to({scaleX:1.2172,scaleY:1.2142,rotation:-142.0452,x:289.75,y:207.7},0).wait(1).to({scaleX:1.2209,scaleY:1.2179,rotation:-142.3088,y:207.6},0).wait(1).to({scaleX:1.2247,scaleY:1.2217,rotation:-142.5723,y:207.5},0).wait(1).to({scaleX:1.2285,scaleY:1.2254,rotation:-142.8358,x:289.7,y:207.35},0).wait(1).to({scaleX:1.2322,scaleY:1.2292,rotation:-143.0994,y:207.25},0).wait(1).to({scaleX:1.236,scaleY:1.2329,rotation:-143.3629,x:289.6,y:207.15},0).wait(1).to({scaleX:1.2397,scaleY:1.2367,rotation:-143.6265,y:207},0).wait(1).to({scaleX:1.2435,scaleY:1.2404,rotation:-143.89,y:206.9},0).wait(1).to({scaleX:1.2472,scaleY:1.2442,rotation:-144.1535,x:289.55,y:206.8},0).wait(1).to({scaleX:1.251,scaleY:1.2479,rotation:-144.4171,y:206.65},0).wait(1).to({scaleX:1.2548,scaleY:1.2517,rotation:-144.6806,x:289.45,y:206.55},0).wait(1).to({scaleX:1.2585,scaleY:1.2554,rotation:-144.9441,y:206.45},0).wait(1).to({scaleX:1.2623,scaleY:1.2592,rotation:-145.2077,y:206.25},0).wait(1).to({scaleX:1.266,scaleY:1.2629,rotation:-145.4712,x:289.4,y:206.2},0).wait(1).to({scaleX:1.2698,scaleY:1.2667,rotation:-145.7347,x:289.35,y:206.05},0).wait(1).to({scaleX:1.2735,scaleY:1.2704,rotation:-145.9983,x:289.3,y:205.95},0).wait(1).to({scaleX:1.2773,scaleY:1.2742,rotation:-146.2618,x:289.35,y:205.8},0).wait(1).to({scaleX:1.281,scaleY:1.2779,rotation:-146.5253,x:289.3,y:205.7},0).wait(1).to({scaleX:1.2848,scaleY:1.2816,rotation:-146.7889,x:289.25,y:205.55},0).wait(1).to({scaleX:1.2886,scaleY:1.2854,rotation:-147.0524,x:289.2,y:205.45},0).wait(1).to({scaleX:1.2923,scaleY:1.2891,rotation:-147.3159,y:205.35},0).wait(1).to({scaleX:1.2961,scaleY:1.2929,rotation:-147.5795,y:205.2},0).wait(1).to({scaleX:1.2998,scaleY:1.2966,rotation:-147.843,x:289.15,y:205.05},0).wait(1).to({scaleX:1.3036,scaleY:1.3004,rotation:-148.1065,x:289.05,y:204.95},0).wait(1).to({scaleX:1.3073,scaleY:1.3041,rotation:-148.3701,x:289.1,y:204.8},0).wait(1).to({scaleX:1.3111,scaleY:1.3079,rotation:-148.6336,x:289.05,y:204.65},0).wait(1).to({scaleX:1.3149,scaleY:1.3116,rotation:-148.8971,y:204.5},0).wait(1).to({scaleX:1.3186,scaleY:1.3154,rotation:-149.1607,x:288.95,y:204.4},0).wait(1).to({scaleX:1.3224,scaleY:1.3191,rotation:-149.4242,y:204.3},0).wait(1).to({scaleX:1.3261,scaleY:1.3229,rotation:-149.6878,y:204.1},0).wait(1).to({scaleX:1.3299,scaleY:1.3266,rotation:-149.9513,x:288.85,y:204},0).wait(1).to({scaleX:1.3336,scaleY:1.3304,rotation:-150.2148,x:288.9,y:203.9},0).wait(1).to({scaleX:1.3374,scaleY:1.3341,rotation:-150.4784,x:288.85,y:203.75},0).wait(1).to({scaleX:1.3411,scaleY:1.3378,rotation:-150.7419,x:288.8,y:203.6},0).wait(1).to({scaleX:1.3449,scaleY:1.3416,rotation:-151.0054,y:203.5},0).wait(1).to({scaleX:1.3487,scaleY:1.3453,rotation:-151.269,x:288.75,y:203.35},0).wait(1).to({scaleX:1.3524,scaleY:1.3491,rotation:-151.5325,y:203.25},0).wait(1).to({scaleX:1.3562,scaleY:1.3529,rotation:-151.796,x:288.65,y:203.1},0).wait(1).to({scaleX:1.3599,scaleY:1.3566,rotation:-152.0596,y:202.95},0).wait(1).to({scaleX:1.3637,scaleY:1.3603,rotation:-152.3231,y:202.8},0).wait(1).to({scaleX:1.3674,scaleY:1.3641,rotation:-152.5866,x:288.55,y:202.7},0).wait(1).to({scaleX:1.3712,scaleY:1.3678,rotation:-152.8502,y:202.55},0).wait(1).to({scaleX:1.375,scaleY:1.3716,rotation:-153.1137,y:202.45},0).wait(1).to({scaleX:1.3787,scaleY:1.3753,rotation:-153.3772,y:202.25},0).wait(1).to({scaleX:1.3825,scaleY:1.3791,rotation:-153.6408,x:288.5,y:202.15},0).wait(1).to({scaleX:1.3862,scaleY:1.3828,rotation:-153.9043,x:288.45,y:202},0).wait(1).to({scaleX:1.39,scaleY:1.3866,rotation:-154.1678,y:201.85},0).wait(1).to({scaleX:1.3937,scaleY:1.3903,rotation:-154.4314,x:288.4,y:201.7},0).wait(1).to({scaleX:1.3975,scaleY:1.3941,rotation:-154.6949,x:288.35,y:201.6},0).wait(1).to({scaleX:1.4012,scaleY:1.3978,rotation:-154.9584,y:201.4},0).wait(1).to({scaleX:1.405,scaleY:1.4016,rotation:-155.222,x:288.3,y:201.35},0).wait(1).to({scaleX:1.4088,scaleY:1.4053,rotation:-155.4855,x:288.25,y:201.15},0).wait(1).to({scaleX:1.4125,scaleY:1.4091,rotation:-155.7491,x:288.2,y:201.05},0).wait(1).to({scaleX:1.4163,scaleY:1.4128,rotation:-156.0126,y:200.9},0).wait(1).to({scaleX:1.42,scaleY:1.4165,rotation:-156.2761,y:200.75},0).wait(1).to({scaleX:1.4238,scaleY:1.4203,rotation:-156.5397,x:288.1,y:200.6},0).wait(1).to({scaleX:1.4276,scaleY:1.4241,rotation:-156.8032,y:200.5},0).wait(1).to({scaleX:1.4313,scaleY:1.4278,rotation:-157.0667,y:200.3},0).wait(1).to({scaleX:1.4351,scaleY:1.4316,rotation:-157.3303,x:288,y:200.2},0).wait(1).to({scaleX:1.4388,scaleY:1.4353,rotation:-157.5938,x:288.05,y:200},0).wait(1).to({scaleX:1.4426,scaleY:1.439,rotation:-157.8573,x:287.95,y:199.9},0).wait(1).to({scaleX:1.4463,scaleY:1.4428,rotation:-158.1209,y:199.75},0).wait(1).to({scaleX:1.4501,scaleY:1.4465,rotation:-158.3844,y:199.6},0).wait(1).to({scaleX:1.4538,scaleY:1.4503,rotation:-158.6479,x:287.85,y:199.4},0).wait(1).to({scaleX:1.4576,scaleY:1.454,rotation:-158.9115,y:199.25},0).wait(1).to({scaleX:1.4614,scaleY:1.4578,rotation:-159.175,x:287.75,y:199.1},0).wait(1).to({scaleX:1.4651,scaleY:1.4615,rotation:-159.4385,x:287.8,y:199},0).wait(1).to({scaleX:1.4689,scaleY:1.4653,rotation:-159.7021,x:287.75,y:198.8},0).wait(1).to({scaleX:1.4726,scaleY:1.469,rotation:-159.9656,x:287.7,y:198.7},0).wait(1).to({scaleX:1.4763,scaleY:1.4727,rotation:-160.2291,y:198.5},0).wait(1).to({scaleX:1.4801,scaleY:1.4765,rotation:-160.4927,x:287.65,y:198.4},0).wait(1).to({scaleX:1.4839,scaleY:1.4803,rotation:-160.7562,x:287.6,y:198.25},0).wait(1).to({scaleX:1.4876,scaleY:1.484,rotation:-161.0197,y:198.05},0).wait(1).to({scaleX:1.4914,scaleY:1.4878,rotation:-161.2833,x:287.55,y:197.9},0).wait(1).to({scaleX:1.4952,scaleY:1.4915,rotation:-161.5468,x:287.5,y:197.75},0).wait(1).to({scaleX:1.4989,scaleY:1.4952,rotation:-161.8104,x:287.45,y:197.65},0).wait(1).to({scaleX:1.5027,scaleY:1.499,rotation:-162.0739,y:197.5},0).wait(1).to({scaleX:1.5064,scaleY:1.5028,rotation:-162.3374,x:287.4,y:197.35},0).wait(1).to({scaleX:1.5102,scaleY:1.5065,rotation:-162.601,x:287.35,y:197.15},0).wait(1).to({scaleX:1.5139,scaleY:1.5102,rotation:-162.8645,x:287.3,y:197},0).wait(1).to({scaleX:1.5177,scaleY:1.514,rotation:-163.128,y:196.85},0).wait(1).to({scaleX:1.5214,scaleY:1.5177,rotation:-163.3916,y:196.7},0).wait(1).to({scaleX:1.5252,scaleY:1.5215,rotation:-163.6551,x:287.25,y:196.5},0).wait(1).to({scaleX:1.529,scaleY:1.5252,rotation:-163.9186,x:287.2,y:196.4},0).wait(1).to({scaleX:1.5327,scaleY:1.529,rotation:-164.1822,x:287.15,y:196.2},0).wait(1).to({scaleX:1.5365,scaleY:1.5327,rotation:-164.4457,y:196.1},0).wait(1).to({scaleX:1.5402,scaleY:1.5365,rotation:-164.7092,x:287.1,y:195.85},0).wait(1).to({scaleX:1.544,scaleY:1.5402,rotation:-164.9728,x:287.05,y:195.75},0).wait(1).to({scaleX:1.5477,scaleY:1.544,rotation:-165.2363,x:287,y:195.6},0).wait(1).to({scaleX:1.5515,scaleY:1.5477,rotation:-165.4998,x:286.95,y:195.4},0).wait(1).to({scaleX:1.5553,scaleY:1.5515,rotation:-165.7634,y:195.3},0).wait(1).to({scaleX:1.559,scaleY:1.5552,rotation:-166.0269,x:286.9,y:195.1},0).wait(1).to({scaleX:1.5628,scaleY:1.559,rotation:-166.2904,x:286.85,y:194.95},0).wait(1).to({scaleX:1.5665,scaleY:1.5627,rotation:-166.554,x:286.8,y:194.75},0).wait(1).to({scaleX:1.5703,scaleY:1.5664,rotation:-166.8175,x:286.75,y:194.65},0).wait(1).to({scaleX:1.5741,scaleY:1.5702,rotation:-167.081,x:286.8,y:194.45},0).wait(1).to({scaleX:1.5778,scaleY:1.574,rotation:-167.3446,x:286.7,y:194.3},0).wait(1).to({scaleX:1.5815,scaleY:1.5777,rotation:-167.6081,y:194.15},0).wait(1).to({scaleX:1.5853,scaleY:1.5814,rotation:-167.8717,x:286.6,y:193.95},0).wait(1).to({scaleX:1.5891,scaleY:1.5852,rotation:-168.1352,y:193.8},0).wait(1).to({scaleX:1.5928,scaleY:1.5889,rotation:-168.3987,x:286.5,y:193.6},0).wait(1).to({scaleX:1.5966,scaleY:1.5927,rotation:-168.6623,y:193.5},0).wait(1).to({scaleX:1.6004,scaleY:1.5965,rotation:-168.9258,y:193.35},0).wait(1).to({scaleX:1.6041,scaleY:1.6002,rotation:-169.1893,x:286.45,y:193.15},0).wait(1).to({scaleX:1.6078,scaleY:1.6039,rotation:-169.4529,x:286.4,y:193},0).wait(1).to({scaleX:1.6116,scaleY:1.6077,rotation:-169.7164,x:286.35,y:192.8},0).wait(1).to({scaleX:1.6154,scaleY:1.6114,rotation:-169.9799,x:286.3,y:192.65},0).wait(1).to({scaleX:1.6191,scaleY:1.6151,rotation:-170.2435,x:286.25,y:192.45},0).wait(1).to({scaleX:1.6229,scaleY:1.6189,rotation:-170.507,x:286.2,y:192.3},0).wait(1).to({scaleX:1.4046,scaleY:1.4012,rotation:-168.982,x:294.25,y:181.85},0).wait(1).to({scaleX:1.1863,scaleY:1.1834,rotation:-167.4569,x:302.35,y:171.3},0).wait(1).to({scaleX:0.968,scaleY:0.9656,rotation:-165.9319,x:310.45,y:160.6},0).wait(1).to({scaleX:0.7497,scaleY:0.7478,rotation:-164.4069,x:318.6,y:149.75},0).wait(1).to({scaleX:0.7498,rotation:-162.8819,x:317.55,y:150},0).wait(1).to({scaleX:0.7497,rotation:-161.3568,x:317.45,y:150.2},0).wait(1).to({scaleX:0.7498,rotation:-159.8318,x:317.35,y:150.35},0).wait(1).to({scaleX:0.7497,rotation:-158.3068,x:317.25,y:150.6},0).wait(1).to({rotation:-156.7818,x:317.2,y:150.8},0).wait(1).to({scaleX:0.7498,rotation:-155.2567,x:317.1,y:150.95},0).wait(1).to({scaleX:0.7497,rotation:-153.7317,x:316.95,y:151.15},0).wait(1).to({rotation:-152.2067,x:316.85,y:151.4},0).wait(1).to({rotation:-150.6817,x:316.75,y:151.6},0).wait(1).to({rotation:-149.1567,x:316.6,y:151.75},0).wait(1).to({rotation:-147.6316,x:316.45,y:151.9},0).wait(1).to({rotation:-146.1066,x:316.35,y:152.1},0).wait(1).to({rotation:-144.5816,x:316.2,y:152.25},0).wait(1).to({rotation:-143.0565,x:316.1,y:152.4},0).wait(1).to({rotation:-141.5315,x:315.9,y:152.6},0).wait(1).to({rotation:-140.0065,x:315.75,y:152.75},0).wait(1).to({rotation:-138.4815,x:315.6,y:152.9},0).wait(1).to({rotation:-136.9564,x:315.5,y:153.05},0).wait(1).to({rotation:-135.4314,x:315.3,y:153.2},0).wait(1).to({rotation:-133.9064,x:315.1,y:153.3},0).wait(1).to({rotation:-132.3814,x:314.95,y:153.5},0).wait(1).to({rotation:-130.8563,x:314.75,y:153.65},0).wait(1).to({rotation:-129.3313,x:314.6,y:153.75},0).wait(1).to({rotation:-127.8063,x:314.4,y:153.85},0).wait(1).to({rotation:-126.2813,x:314.25,y:154},0).wait(1).to({rotation:-124.7562,x:314.05,y:154.1},0).wait(1).to({rotation:-123.2312,x:313.8,y:154.2},0).wait(1).to({rotation:-121.7062,x:313.65,y:154.3},0).wait(1).to({rotation:-120.1812,x:313.45,y:154.45},0).wait(1).to({rotation:-118.6561,x:313.25,y:154.55},0).wait(1).to({rotation:-117.1311,x:313.1,y:154.6},0).wait(1).to({scaleX:0.9661,scaleY:0.9636,rotation:-115.6061,x:283.2,y:195.05},0).wait(1).to({scaleX:1.1825,scaleY:1.1794,rotation:-114.0811,x:253.25,y:235.6},0).wait(1).to({scaleX:1.3989,scaleY:1.3951,rotation:-112.556,x:223.2,y:276.05},0).wait(1).to({scaleX:1.6153,scaleY:1.6109,rotation:-111.031,x:192.95,y:316.65},0).wait(1).to({scaleX:1.8317,scaleY:1.8267,rotation:-109.506,x:162.65,y:357.2},0).wait(1).to({scaleX:1.8315,scaleY:1.8264,rotation:-109.3903,x:162.55,y:357},0).wait(1).to({scaleX:1.8312,scaleY:1.8261,rotation:-109.2746,x:162.5,y:356.8},0).wait(1).to({scaleX:1.8309,scaleY:1.8259,rotation:-109.1588,x:162.45,y:356.55},0).wait(1).to({scaleX:1.8306,scaleY:1.8256,rotation:-109.0431,y:356.35},0).wait(1).to({scaleX:1.8303,scaleY:1.8253,rotation:-108.9274,y:356.1},0).wait(1).to({scaleX:1.8301,scaleY:1.8251,rotation:-108.8117,x:162.4,y:355.9},0).wait(1).to({scaleX:1.8298,scaleY:1.8248,rotation:-108.6959,x:162.35,y:355.65},0).wait(1).to({scaleX:1.8296,scaleY:1.8245,rotation:-108.5802,x:162.3,y:355.45},0).wait(1).to({scaleX:1.8293,scaleY:1.8243,rotation:-108.4645,x:162.25,y:355.3},0).wait(1).to({scaleX:1.829,scaleY:1.824,rotation:-108.3488,y:355.05},0).wait(1).to({scaleX:1.8287,scaleY:1.8237,rotation:-108.2331,x:162.2,y:354.8},0).wait(1).to({scaleX:1.8284,scaleY:1.8234,rotation:-108.1173,x:162.1,y:354.6},0).wait(1).to({scaleX:1.8282,scaleY:1.8232,rotation:-108.0016,x:162.05,y:354.4},0).wait(1).to({scaleX:1.8279,scaleY:1.8229,rotation:-107.8859,y:354.15},0).wait(1).to({scaleX:1.8276,scaleY:1.8226,rotation:-107.7702,x:162,y:353.9},0).wait(1).to({scaleX:1.8274,scaleY:1.8224,rotation:-107.6544,x:161.95,y:353.7},0).wait(1).to({scaleX:1.8271,scaleY:1.8221,rotation:-107.5387,x:161.9,y:353.45},0).wait(1).to({scaleX:1.8268,scaleY:1.8218,rotation:-107.423,y:353.25},0).wait(1).to({scaleX:1.8265,scaleY:1.8215,rotation:-110.1799,x:162.85,y:352.75},0).wait(1).to({scaleX:1.8262,scaleY:1.8212,rotation:-112.9368,x:163.8,y:352.3},0).wait(1).to({scaleX:1.826,scaleY:1.821,rotation:-115.6937,x:164.65,y:351.7},0).wait(1).to({scaleX:1.8257,scaleY:1.8207,rotation:-118.4506,x:165.5,y:351.1},0).wait(1).to({scaleX:1.8254,scaleY:1.8204,rotation:-121.2074,x:166.45,y:350.45},0).wait(1).to({scaleX:1.8251,scaleY:1.8201,rotation:-123.9643,x:167.25,y:349.8},0).wait(1).to({scaleX:1.8249,scaleY:1.8199,rotation:-126.7212,x:168.1,y:349.05},0).wait(1).to({scaleX:1.8246,scaleY:1.8196,rotation:-129.4781,x:168.9,y:348.25},0).wait(1).to({scaleX:1.8243,scaleY:1.8193,rotation:-132.235,x:169.65,y:347.45},0).wait(1).to({scaleX:1.824,scaleY:1.8191,rotation:-134.9919,x:170.4,y:346.65},0).wait(1).to({scaleX:1.8238,scaleY:1.8188,rotation:-137.7488,x:171.1,y:345.75},0).wait(1).to({scaleX:1.8235,scaleY:1.8185,rotation:-140.5057,x:171.85,y:344.8},0).wait(1).to({scaleX:1.8232,scaleY:1.8182,rotation:-143.2626,x:172.45,y:343.9},0).wait(1).to({scaleX:1.823,scaleY:1.818,rotation:-146.0194,x:173.1,y:342.85},0).wait(1).to({scaleX:1.8227,scaleY:1.8177,rotation:-148.7763,x:173.65,y:341.9},0).wait(1).to({scaleX:1.8224,scaleY:1.8175,rotation:-151.5332,x:174.15,y:340.85},0).wait(1).to({scaleX:1.8222,scaleY:1.8172,rotation:-154.2901,x:174.7,y:339.85},0).wait(1).to({scaleX:1.8219,scaleY:1.8169,rotation:-157.047,x:175.15,y:338.7},0).wait(1).to({scaleX:1.763,scaleY:1.7582,rotation:-123.4335,x:221.1,y:297.65},0).wait(1).to({scaleX:1.7041,scaleY:1.6996,rotation:-89.8201,x:264.5,y:250.4},0).wait(1).to({scaleX:1.6452,scaleY:1.6409,rotation:-56.2066,x:309.1,y:197.1},0).wait(1).to({scaleX:1.5863,scaleY:1.5822,rotation:-22.5932,x:357.95,y:139.35},0).wait(1).to({scaleX:1.5274,scaleY:1.5236,rotation:11.0203,x:412.6,y:80.5},0).wait(1).to({scaleX:1.4685,scaleY:1.4649,rotation:44.6337,x:472.55,y:23.75},0).wait(1).to({rotation:44.4011,x:472.45,y:23.8},0).wait(1).to({rotation:44.1686,x:472.4,y:23.85},0).wait(1).to({rotation:43.936,x:472.35,y:23.9},0).wait(1).to({rotation:43.7035,x:472.3,y:23.95},0).wait(1).to({rotation:43.4709,x:472.25},0).wait(1).to({rotation:43.2383,y:24.05},0).wait(1).to({rotation:43.0058,x:472.2,y:24.1},0).wait(1).to({rotation:42.7732,x:472.1},0).wait(1).to({rotation:42.5406,y:24.2},0).wait(1).to({rotation:42.3081,x:472,y:24.25},0).wait(1).to({rotation:42.0755},0).wait(1).to({rotation:41.843,x:471.9},0).wait(1).to({rotation:41.6104,x:471.85,y:24.3},0).wait(1).to({rotation:42.6003,x:375.9,y:74.1},0).wait(1).to({rotation:43.5902,x:279.9,y:123.9},0).wait(1).to({rotation:44.5801,x:183.95,y:173.75},0).wait(1).to({rotation:45.5699,x:87.95,y:223.5},0).wait(1).to({rotation:46.5598,x:-8,y:273.35},0).wait(1).to({rotation:47.5497,x:-7.85,y:273.2},0).wait(1).to({rotation:48.5396,x:-7.6,y:273.05},0).wait(1).to({rotation:49.5295,x:-7.35,y:272.8},0).wait(1).to({rotation:50.5194,x:-7.15,y:272.65},0).wait(1).to({rotation:51.5093,x:-6.9,y:272.5},0).wait(1).to({rotation:52.4991,x:-6.7,y:272.35},0).wait(1).to({rotation:53.489,x:-6.45,y:272.15},0).wait(1).to({rotation:54.4789,x:-6.25,y:272.05},0).wait(1).to({rotation:55.4688,x:-5.95,y:271.9},0).wait(1).to({rotation:56.4587,x:-5.75,y:271.75},0).wait(1).to({rotation:57.4486,x:-5.45,y:271.65},0).wait(1).to({rotation:58.4385,x:-5.2,y:271.55},0).wait(1).to({rotation:59.4283,x:-4.95,y:271.4},0).wait(1).to({rotation:60.4182,x:-4.7,y:271.25},0).wait(1).to({rotation:61.4081,x:-4.45,y:271.1},0).wait(1).to({rotation:62.398,x:-4.2,y:271.05},0).wait(1).to({rotation:27.5386,x:109.6,y:176.95},0).wait(1).to({rotation:-7.3207,x:228.4,y:85.8},0).wait(1).to({rotation:-42.1801,x:353,y:-5.55},0).wait(1).to({rotation:-41.0853,x:352.75,y:-5.8},0).wait(1).to({rotation:-39.9905,x:352.55,y:-6},0).wait(1).to({rotation:-38.8957,x:352.4,y:-6.3},0).wait(1).to({rotation:-37.8009,x:352.3,y:-6.55},0).wait(1).to({rotation:-36.7061,x:352.1,y:-6.8},0).wait(1).to({rotation:-35.6112,x:351.9,y:-7.05},0).wait(1).to({rotation:-34.5164,x:351.75,y:-7.35},0).wait(1).to({rotation:-33.4216,x:351.55,y:-7.6},0).wait(1).to({rotation:-32.3268,x:351.45,y:-7.85},0).wait(1).to({rotation:-31.232,x:351.3,y:-8.1},0).wait(1).to({rotation:-30.1372,x:351.15,y:-8.4},0).wait(1).to({rotation:-29.0424,x:351.05,y:-8.7},0).wait(1).to({rotation:-27.9476,x:350.9,y:-9},0).wait(1).to({rotation:-26.8528,x:350.8,y:-9.25},0).wait(1).to({rotation:-25.758,x:350.65,y:-9.6},0).wait(1).to({rotation:-24.6631,x:350.55,y:-9.85},0).wait(1).to({rotation:-23.5683,x:350.45,y:-10.15},0).wait(1).to({rotation:-22.4735,x:350.35,y:-10.45},0).wait(1).to({rotation:-21.3787,x:350.25,y:-10.7},0).wait(1).to({rotation:-20.2839,x:350.2,y:-11},0).wait(1).to({rotation:-19.1891,x:350.05,y:-11.35},0).wait(1).to({rotation:-18.0943,x:350,y:-11.65},0).wait(1).to({rotation:-16.9995,x:349.95,y:-11.95},0).wait(1).to({rotation:-15.9047,x:349.85,y:-12.15},0).wait(1).to({rotation:-14.8099,y:-12.5},0).wait(1).to({rotation:-13.715,x:349.7,y:-12.8},0).wait(1).to({rotation:-12.6202,y:-13.1},0).wait(1).to({rotation:-11.5254,x:349.65,y:-13.4},0).wait(1).to({rotation:-10.4306,y:-13.8},0).wait(1).to({rotation:-9.3358,x:349.55,y:-14.05},0).wait(1);
	var _tweenStr_11 = _tweenStr_10.to({rotation:-8.241,y:-14.35},0).wait(1).to({rotation:-7.1462,y:-14.7},0).wait(1).to({rotation:-6.0514,y:-15},0).wait(1).to({rotation:-4.9566,x:349.5,y:-15.25},0).wait(1).to({rotation:-3.8618,x:349.55,y:-15.6},0).wait(1).to({rotation:-2.7669,y:-15.9},0).wait(1).to({rotation:-1.6721,y:-16.25},0).wait(1).to({rotation:-0.5773,y:-16.55},0).wait(1).to({rotation:0.5175,x:349.6,y:-16.85},0).wait(1).to({rotation:1.6123,x:349.65,y:-17.15},0).wait(1).to({rotation:2.7071,x:349.6,y:-17.45},0).wait(1).to({rotation:3.8019,x:349.7,y:-17.75},0).wait(1).to({rotation:4.8967,x:349.75,y:-18.05},0).wait(1).to({rotation:5.9915,y:-18.4},0).wait(1).to({rotation:7.0863,x:349.8,y:-18.7},0).wait(1).to({rotation:8.1812,x:349.9,y:-18.95},0).wait(1).to({rotation:9.276,x:350,y:-19.25},0).wait(1).to({rotation:10.3708,y:-19.6},0).wait(1).to({rotation:11.4656,x:350.1,y:-19.85},0).wait(1).to({rotation:12.5604,x:350.25,y:-20.15},0).wait(1).to({rotation:13.6552,x:350.3,y:-20.45},0).wait(1).to({rotation:14.75,x:350.4,y:-20.75},0).wait(1).to({rotation:15.8448,x:350.5,y:-21},0).wait(1).to({rotation:16.9396,x:350.6,y:-21.35},0).wait(1).to({rotation:18.0344,x:350.75,y:-21.65},0).wait(1).to({rotation:19.1293,x:350.9,y:-21.95},0).wait(1).to({rotation:20.2241,x:350.95,y:-22.2},0).wait(1).to({rotation:21.3189,x:351.1,y:-22.45},0).wait(1).to({rotation:22.4137,x:351.2,y:-22.75},0).wait(1).to({rotation:23.5085,x:351.4,y:-23.05},0).wait(1).to({rotation:24.6033,x:351.5,y:-23.35},0).wait(1).to({rotation:25.6981,x:351.7,y:-23.6},0).wait(1).to({rotation:26.7929,x:351.85,y:-23.85},0).wait(1).to({rotation:27.8877,x:352,y:-24.1},0).wait(1).to({rotation:28.9825,x:352.15,y:-24.4},0).wait(1).to({rotation:30.0774,x:352.3,y:-24.65},0).wait(1).to({rotation:31.1722,x:352.55,y:-24.85},0).wait(1).to({rotation:32.267,x:352.7,y:-25.1},0).wait(1).to({rotation:33.3618,x:352.85,y:-25.4},0).wait(1).to({rotation:34.4566,x:353.1,y:-25.65},0).wait(1).to({rotation:35.5514,x:353.25,y:-25.85},0).wait(1).to({rotation:36.6462,x:353.45,y:-26.15},0).wait(1).to({rotation:37.741,x:353.65,y:-26.35},0).wait(1).to({rotation:38.8358,x:353.9,y:-26.55},0).wait(1).to({rotation:39.9306,x:354.1,y:-26.75},0).wait(1).to({rotation:41.0254,x:354.3,y:-27},0).wait(1).to({rotation:42.1203,x:354.5,y:-27.25},0).wait(1).to({rotation:43.2151,x:354.8,y:-27.4},0).wait(1).to({rotation:44.3099,x:355,y:-27.65},0).wait(1).to({rotation:45.4047,x:355.2,y:-27.85},0).wait(1).to({rotation:46.4995,x:355.5,y:-28},0).wait(1).to({rotation:47.5943,x:355.7,y:-28.25},0).wait(1).to({rotation:48.6891,x:355.95,y:-28.45},0).wait(1).to({rotation:49.7839,x:356.15,y:-28.6},0).wait(1).to({rotation:50.8787,x:356.45,y:-28.8},0).wait(1).to({rotation:51.9735,x:356.7,y:-28.95},0).wait(1).to({rotation:53.0684,x:356.95,y:-29.15},0).wait(1).to({rotation:54.1632,x:357.25,y:-29.3},0).wait(1).to({rotation:55.258,x:357.45,y:-29.45},0).wait(1).to({rotation:56.3528,x:357.75,y:-29.6},0).wait(1).to({rotation:57.4476,x:358.05,y:-29.75},0).wait(1).to({rotation:58.5424,x:358.3,y:-29.9},0).wait(1).to({rotation:59.6372,x:358.55,y:-30.05},0).wait(1).to({rotation:60.732,x:358.85,y:-30.2},0).wait(1).to({rotation:61.8268,x:359.1,y:-30.3},0).wait(1).to({rotation:62.9216,x:359.4,y:-30.45},0).wait(1).to({rotation:64.0165,x:359.7,y:-30.5},0).wait(1).to({rotation:65.1113,x:360,y:-30.65},0).wait(1).to({rotation:66.2061,x:360.3,y:-30.8},0).wait(1).to({rotation:67.3009,x:360.55,y:-30.9},0).wait(1).to({rotation:68.3957,x:360.85,y:-30.95},0).wait(1).to({rotation:69.4905,x:361.15,y:-31.1},0).wait(1).to({rotation:70.5853,x:361.5,y:-31.15},0).wait(1).to({rotation:71.6801,x:361.75,y:-31.2},0).wait(1).to({rotation:72.7749,x:362.05,y:-31.3},0).wait(1).to({rotation:73.8697,x:362.35,y:-31.35},0).wait(1).to({rotation:74.9646,x:362.65,y:-31.45},0).wait(1).to({rotation:76.0594,x:362.95,y:-31.5},0).wait(1).to({rotation:77.1542,x:363.25},0).wait(1).to({rotation:78.249,x:363.55,y:-31.6},0).wait(1).to({rotation:79.3438,x:363.9},0).wait(1).to({rotation:80.4386,x:364.2,y:-31.65},0).wait(1).to({rotation:81.5334,x:364.45},0).wait(1).to({rotation:82.6282,x:364.85,y:-31.7},0).wait(1).to({rotation:83.723,x:365.15},0).wait(1).to({rotation:84.8178,x:365.4},0).wait(1).to({rotation:85.9127,x:365.75},0).wait(1).to({rotation:87.0075,x:366.05,y:-31.75},0).wait(1).to({rotation:88.1023,x:366.35,y:-31.7},0).wait(1).to({rotation:89.1971,x:366.65,y:-31.65},0).wait(1).to({rotation:90.2919,x:367,y:-31.7},0).wait(1).to({rotation:91.3867,x:367.3,y:-31.65},0).wait(1).to({rotation:92.4815,x:367.6,y:-31.6},0).wait(1).to({rotation:93.5763,x:367.9,y:-31.5},0).wait(1).to({rotation:94.6711,x:368.2,y:-31.55},0).wait(1).to({rotation:95.7659,x:368.45,y:-31.45},0).wait(1).to({rotation:96.8608,x:368.85,y:-31.4},0).wait(1).to({rotation:97.9556,x:369.15,y:-31.35},0).wait(1).to({rotation:99.0504,x:369.4,y:-31.3},0).wait(1).to({rotation:100.1452,x:369.75,y:-31.2},0).wait(1).to({rotation:101.24,x:370,y:-31.1},0).wait(1).to({rotation:102.3348,x:370.35},0).wait(1).to({rotation:103.4296,x:370.6,y:-30.95},0).wait(1).to({rotation:104.5244,x:370.9,y:-30.85},0).wait(1).to({rotation:105.6192,x:371.2,y:-30.75},0).wait(1).to({rotation:106.714,x:371.5,y:-30.65},0).wait(1).to({rotation:107.8088,x:371.8,y:-30.55},0).wait(1).to({rotation:108.9037,x:372.05,y:-30.45},0).wait(1).to({rotation:109.9985,x:372.3,y:-30.3},0).wait(1).to({rotation:111.0933,x:372.6,y:-30.15},0).wait(1).to({rotation:112.1881,x:372.9,y:-30},0).wait(1).to({rotation:113.2829,x:373.2,y:-29.9},0).wait(1).to({rotation:114.3777,x:373.45,y:-29.75},0).wait(1).to({rotation:115.4725,x:373.75,y:-29.65},0).wait(1).to({rotation:116.5673,x:374,y:-29.45},0).wait(1).to({rotation:117.6621,x:374.3,y:-29.3},0).wait(1).to({rotation:118.7569,x:374.5,y:-29.1},0).wait(1).to({rotation:119.8518,x:374.8,y:-28.95},0).wait(1).to({rotation:120.9466,x:375.05,y:-28.8},0).wait(1).to({rotation:122.0414,x:375.25,y:-28.6},0).wait(1).to({rotation:123.1362,x:375.55,y:-28.45},0).wait(1).to({rotation:124.231,x:375.8,y:-28.25},0).wait(1).to({rotation:125.3258,x:376.05,y:-28},0).wait(1).to({rotation:126.4206,x:376.25,y:-27.8},0).wait(1).to({rotation:127.5154,x:376.5,y:-27.6},0).wait(1).to({rotation:128.6102,x:376.75,y:-27.4},0).wait(1).to({rotation:129.705,x:376.95,y:-27.25},0).wait(1).to({rotation:130.7999,x:377.15,y:-27},0).wait(1).to({rotation:131.8947,x:377.4,y:-26.7},0).wait(1).to({rotation:132.9895,x:377.6,y:-26.5},0).wait(1).to({rotation:134.0843,x:377.85,y:-26.3},0).wait(1).to({rotation:135.1791,x:378,y:-26.05},0).wait(1).to({rotation:136.2739,x:378.2,y:-25.85},0).wait(1).to({rotation:137.3687,x:378.45,y:-25.6},0).wait(1).to({rotation:138.4635,x:378.6,y:-25.35},0).wait(1).to({rotation:139.5583,x:378.8,y:-25.1},0).wait(1).to({rotation:140.6531,x:379,y:-24.85},0).wait(1).to({rotation:141.748,x:379.15,y:-24.6},0).wait(1).to({rotation:142.8428,x:379.25,y:-24.35},0).wait(1).to({rotation:143.9376,x:379.45,y:-24.05},0).wait(1).to({rotation:145.0324,x:379.65,y:-23.8},0).wait(1).to({rotation:146.1272,x:379.8,y:-23.55},0).wait(1).to({rotation:147.222,x:379.95,y:-23.3},0).wait(1).to({rotation:148.3168,x:380.1,y:-23},0).wait(1).to({rotation:149.4116,x:380.25,y:-22.7},0).wait(1).to({rotation:150.5064,x:380.35,y:-22.45},0).wait(1).to({rotation:151.6012,x:380.5,y:-22.2},0).wait(1).to({rotation:152.6961,x:380.6,y:-21.9},0).wait(1).to({rotation:153.7909,x:380.75,y:-21.65},0).wait(1).to({rotation:154.8857,x:380.85,y:-21.3},0).wait(1).to({rotation:155.9805,x:380.95,y:-21.05},0).wait(1).to({rotation:157.0753,x:381.05,y:-20.75},0).wait(1).to({rotation:158.1701,x:381.15,y:-20.45},0).wait(1).to({rotation:159.2649,x:381.2,y:-20.1},0).wait(1).to({rotation:160.3597,x:381.35,y:-19.85},0).wait(1).to({rotation:161.4545,x:381.4,y:-19.55},0).wait(1).to({rotation:162.5493,x:381.5,y:-19.25},0).wait(1).to({rotation:163.6442,x:381.55,y:-18.95},0).wait(1).to({rotation:164.739,x:381.6,y:-18.65},0).wait(1).to({rotation:165.8338,x:381.7,y:-18.3},0).wait(1).to({rotation:166.9286,x:381.75,y:-18},0).wait(1).to({rotation:168.0234,y:-17.75},0).wait(1).to({rotation:169.1182,x:381.8,y:-17.4},0).wait(1).to({rotation:170.213,x:381.85,y:-17.1},0).wait(1).to({rotation:171.3078,y:-16.8},0).wait(1).to({rotation:172.4026,y:-16.5},0).wait(1).to({rotation:173.4974,x:381.9,y:-16.2},0).wait(1).to({rotation:174.5923,x:381.95,y:-15.85},0).wait(1).to({rotation:175.6871,x:381.9,y:-15.55},0).wait(1).to({rotation:176.7819,x:381.95,y:-15.25},0).wait(1).to({rotation:177.8767,y:-14.95},0).wait(1).to({rotation:178.9715,x:381.9,y:-14.65},0).wait(1).to({rotation:180.0663,x:381.85,y:-14.35},0).wait(1).to({rotation:181.1611,y:-14},0).wait(1).to({rotation:182.2559,y:-13.7},0).wait(1).to({rotation:183.3507,x:381.8,y:-13.4},0).wait(1).to({rotation:184.4455,x:381.7,y:-13.1},0).wait(1).to({rotation:185.5403,x:381.75,y:-12.8},0).wait(1).to({rotation:186.6352,x:381.65,y:-12.5},0).wait(1).to({rotation:187.73,x:381.55,y:-12.2},0).wait(1).to({rotation:188.8248,x:381.45,y:-11.85},0).wait(1).to({rotation:189.9196,y:-11.55},0).wait(1).to({rotation:191.0144,x:381.35,y:-11.25},0).wait(1).to({rotation:192.1092,x:381.25,y:-10.95},0).wait(1).to({rotation:193.204,x:381.2,y:-10.7},0).wait(1).to({rotation:194.2988,x:381.1,y:-10.35},0).wait(1).to({rotation:195.3936,x:380.95,y:-10.1},0).wait(1).to({rotation:196.4884,x:380.9,y:-9.8},0).wait(1).to({rotation:197.5833,x:380.75,y:-9.5},0).wait(1).to({rotation:198.6781,x:380.65,y:-9.25},0).wait(1).to({rotation:199.7729,x:380.55,y:-8.95},0).wait(1).to({rotation:200.8677,x:380.4,y:-8.65},0).wait(1).to({rotation:201.9625,x:380.3,y:-8.35},0).wait(1).to({rotation:203.0573,x:380.1,y:-8.1},0).wait(1).to({rotation:204.1521,x:380,y:-7.85},0).wait(1).to({rotation:205.2469,x:379.8,y:-7.55},0).wait(1).to({rotation:206.3417,x:379.7,y:-7.35},0).wait(1).to({rotation:207.4365,x:379.5,y:-7.05},0).wait(1).to({rotation:208.5314,x:379.35,y:-6.8},0).wait(1).to({rotation:209.6262,x:379.2,y:-6.5},0).wait(1).to({rotation:210.721,x:379,y:-6.25},0).wait(1).to({rotation:211.8158,x:378.85,y:-6},0).wait(1).to({rotation:212.9106,x:378.6,y:-5.75},0).wait(1).to({rotation:214.0054,x:378.45,y:-5.5},0).wait(1).to({rotation:215.1002,x:378.25,y:-5.25},0).wait(1).to({rotation:216.195,x:378.1,y:-5},0).wait(1).to({rotation:217.2898,x:377.9,y:-4.8},0).wait(1).to({rotation:218.3846,x:377.65,y:-4.55},0).wait(1).to({rotation:219.4795,x:377.4,y:-4.4},0).wait(1).to({rotation:220.5743,x:377.2,y:-4.1},0).wait(1).to({rotation:221.6691,x:377,y:-3.9},0).wait(1).to({rotation:222.7639,x:376.8,y:-3.7},0).wait(1).to({rotation:223.8587,x:376.55,y:-3.5},0).wait(1).to({rotation:224.9535,x:376.35,y:-3.3},0).wait(1).to({rotation:226.0483,x:376.05,y:-3.05},0).wait(1).to({rotation:227.1431,x:375.85,y:-2.9},0).wait(1).to({rotation:228.2379,x:375.6,y:-2.7},0).wait(1).to({rotation:229.3327,x:375.4,y:-2.5},0).wait(1).to({rotation:230.4276,x:375.15,y:-2.35},0).wait(1).to({rotation:231.5224,x:374.85,y:-2.15},0).wait(1).to({rotation:232.6172,x:374.55,y:-1.95},0).wait(1).to({rotation:233.712,x:374.35,y:-1.8},0).wait(1).to({rotation:234.8068,x:374.05,y:-1.65},0).wait(1).to({rotation:235.9016,x:373.8,y:-1.45},0).wait(1).to({rotation:236.9964,x:373.55,y:-1.3},0).wait(1).to({rotation:238.0912,x:373.3,y:-1.15},0).wait(1).to({rotation:239.186,x:372.95,y:-1.1},0).wait(1).to({rotation:240.2808,x:372.7,y:-0.9},0).wait(1).to({rotation:241.3757,x:372.4,y:-0.8},0).wait(1).to({rotation:242.4705,x:372.15,y:-0.7},0).wait(1).to({rotation:243.5653,x:371.9,y:-0.5},0).wait(1).to({rotation:244.6601,x:371.6,y:-0.4},0).wait(1).to({rotation:245.7549,x:371.35,y:-0.25},0).wait(1).to({rotation:246.8497,x:370.95,y:-0.2},0).wait(1).to({rotation:247.9445,x:370.65,y:-0.1},0).wait(1).to({rotation:249.0393,x:370.4,y:0},0).wait(1).to({rotation:250.1341,x:370.1,y:0.05},0).wait(1).to({rotation:251.2289,x:369.85,y:0.15},0).wait(1).to({rotation:252.3238,x:369.5,y:0.25},0).wait(1).to({rotation:253.4186,x:369.2,y:0.35},0).wait(1).to({rotation:254.5134,x:368.9},0).wait(1).to({rotation:255.6082,x:368.55,y:0.4},0).wait(1).to({rotation:256.703,x:368.3,y:0.45},0).wait(1).to({rotation:257.7978,x:367.95,y:0.55},0).wait(1).to({rotation:258.8926,x:367.7},0).wait(1).to({rotation:259.9874,x:367.35,y:0.6},0).wait(1).to({rotation:261.0822,x:367.1},0).wait(1).to({rotation:262.177,x:366.75,y:0.65},0).wait(1).to({rotation:263.2718,x:366.45},0).wait(1).to({rotation:264.3667,x:366.2,y:0.7},0).wait(1).to({rotation:265.4615,x:365.85,y:0.65},0).wait(1).to({rotation:266.5563,x:365.5},0).wait(1).to({rotation:267.6511,x:365.2,y:0.7},0).wait(1).to({rotation:268.7459,x:364.9,y:0.65},0).wait(1).to({rotation:269.8407,x:364.6},0).wait(1).to({rotation:270.9355,x:364.3,y:0.6},0).wait(1).to({rotation:272.0303,x:364},0).wait(1).to({rotation:273.1251,x:363.65},0).wait(1).to({rotation:274.2199,x:363.35,y:0.5},0).wait(1).to({rotation:275.3148,x:363.1,y:0.45},0).wait(1).to({rotation:276.4096,x:362.75,y:0.4},0).wait(1).to({rotation:277.5044,x:362.45,y:0.35},0).wait(1).to({rotation:278.5992,x:362.2,y:0.25},0).wait(1).to({rotation:279.694,x:361.85,y:0.15},0).wait(1).to({rotation:280.7888,x:361.55,y:0.1},0).wait(1).to({rotation:281.8836,x:361.25,y:0.05},0).wait(1).to({rotation:282.9784,x:360.95,y:-0.05},0).wait(1).to({rotation:284.0732,x:360.65,y:-0.15},0).wait(1).to({rotation:285.168,x:360.35,y:-0.25},0).wait(1).to({rotation:286.2629,x:360.1,y:-0.35},0).wait(1).to({rotation:287.3577,x:359.8,y:-0.45},0).wait(1).to({rotation:288.4525,x:359.5,y:-0.6},0).wait(1).to({rotation:289.5473,x:359.2,y:-0.7},0).wait(1).to({rotation:290.6421,x:358.9,y:-0.85},0).wait(1).to({rotation:291.7369,x:358.65,y:-0.95},0).wait(1).to({rotation:292.8317,x:358.4,y:-1.05},0).wait(1).to({rotation:293.9265,x:358.1,y:-1.25},0).wait(1).to({rotation:295.0213,x:357.8,y:-1.35},0).wait(1).to({rotation:296.1161,x:357.6,y:-1.55},0).wait(1).to({rotation:297.211,x:357.3,y:-1.7},0).wait(1).to({rotation:298.3058,x:357.05,y:-1.85},0).wait(1).to({rotation:299.4006,x:356.75,y:-2.05},0).wait(1).to({rotation:300.4954,x:356.55,y:-2.2},0).wait(1).to({rotation:301.5902,x:356.25,y:-2.4},0).wait(1).to({rotation:302.685,x:356.05,y:-2.55},0).wait(1).to({rotation:303.7798,x:355.75,y:-2.7},0).wait(1).to({rotation:304.8746,x:355.55,y:-2.9},0).wait(1).to({rotation:305.9694,x:355.25,y:-3.15},0).wait(1).to({rotation:307.0642,x:355.05,y:-3.35},0).wait(1).to({rotation:308.1591,x:354.8,y:-3.55},0).wait(1).to({rotation:309.2539,x:354.6,y:-3.75},0).wait(1).to({rotation:310.3487,x:354.4,y:-3.95},0).wait(1).to({rotation:311.4435,x:354.15,y:-4.15},0).wait(1).to({rotation:312.5383,x:354,y:-4.4},0).wait(1).to({rotation:313.6331,x:353.75,y:-4.6},0).wait(1).to({rotation:314.7279,x:353.55,y:-4.8},0).wait(1).to({rotation:315.8227,x:353.3,y:-5.1},0).wait(1).to({rotation:316.9175,x:353.1,y:-5.3},0).wait(1).to({rotation:318.0123,x:352.9,y:-5.6},0).wait(1).to({rotation:319.1072,x:352.8,y:-5.85},0).wait(1).to({rotation:320.202,x:352.6,y:-6.1},0).wait(1).to({rotation:321.2968,x:352.4,y:-6.3},0).wait(1).to({rotation:322.3916,x:352.2,y:-6.6},0).wait(1).to({rotation:323.4864,x:352,y:-6.85},0).wait(1).to({rotation:324.5812,x:351.9,y:-7.1},0).wait(1).to({rotation:325.676,x:351.75,y:-7.4},0).wait(1).to({rotation:326.7708,x:351.6,y:-7.65},0).wait(1).to({rotation:327.8656,x:351.4,y:-7.9},0).wait(1).to({rotation:328.9604,x:351.25,y:-8.15},0).wait(1).to({rotation:330.0553,x:351.15,y:-8.5},0).wait(1).to({rotation:331.1501,x:351,y:-8.75},0).wait(1).to({rotation:332.2449,x:350.9,y:-9.05},0).wait(1).to({rotation:333.3397,x:350.75,y:-9.35},0).wait(1).to({rotation:334.4345,x:350.7,y:-9.65},0).wait(1).to({rotation:335.5293,x:350.55,y:-9.9},0).wait(1).to({rotation:336.6241,x:350.45,y:-10.2},0).wait(1).to({rotation:337.7189,x:350.35,y:-10.5},0).wait(1).to({rotation:338.8137,x:350.25,y:-10.75},0).wait(1).to({rotation:339.9085,x:350.15,y:-11.05},0).wait(1).to({rotation:341.0033,x:350.1,y:-11.35},0).wait(1).to({rotation:342.0982,x:350,y:-11.7},0).wait(1).to({rotation:343.193,x:349.95,y:-12},0).wait(1).to({rotation:344.2878,x:349.9,y:-12.3},0).wait(1).to({rotation:345.3826,x:349.75,y:-12.55},0).wait(1).to({rotation:346.4774,y:-12.85},0).wait(1).to({rotation:347.5722,y:-13.2},0).wait(1).to({rotation:348.667,x:349.65,y:-13.5},0).wait(1).to({rotation:349.7618,x:349.6,y:-13.85},0).wait(1).to({rotation:350.8566,y:-14.1},0).wait(1).to({rotation:351.9514,x:349.55,y:-14.4},0).wait(1).to({rotation:353.0463,y:-14.75},0).wait(1).to({rotation:354.1411,y:-15.05},0).wait(1).to({rotation:355.2359,y:-15.3},0).wait(1).to({rotation:356.3307,y:-15.65},0).wait(1).to({rotation:357.4255,x:349.5,y:-15.95},0).wait(1).to({rotation:358.5203,x:349.55,y:-16.3},0).wait(1).to({rotation:359.6151,x:349.6,y:-16.6},0).wait(1).to({rotation:360.7099,y:-16.9},0).wait(1).to({rotation:361.8047,y:-17.2},0).wait(1).to({rotation:362.8995,x:349.65,y:-17.5},0).wait(1).to({rotation:363.9944,x:349.75,y:-17.85},0).wait(1).to({rotation:365.0892,x:349.7,y:-18.1},0).wait(1).to({rotation:366.184,x:349.8,y:-18.45},0).wait(1).to({rotation:367.2788,x:349.9,y:-18.75},0).wait(1).to({rotation:368.3736,y:-19},0).wait(1).to({rotation:369.4684,x:349.95,y:-19.35},0).wait(1).to({rotation:370.5632,x:350.05,y:-19.6},0).wait(1).to({rotation:371.658,x:350.2,y:-19.9},0).wait(1).to({rotation:372.7528,y:-20.2},0).wait(1).to({rotation:373.8476,x:350.3,y:-20.5},0).wait(1).to({rotation:374.9425,x:350.45,y:-20.8},0).wait(1).to({rotation:376.0373,x:350.55,y:-21.1},0).wait(1).to({rotation:377.1321,x:350.65,y:-21.4},0).wait(1).to({rotation:378.2269,x:350.7,y:-21.7},0).wait(1).to({rotation:379.3217,x:350.85,y:-22},0).wait(1).to({rotation:380.4165,x:351,y:-22.25},0).wait(1).to({rotation:381.5113,x:351.1,y:-22.5},0).wait(1).to({rotation:382.6061,x:351.3,y:-22.8},0).wait(1).to({rotation:383.7009,x:351.4,y:-23.1},0).wait(1).to({rotation:384.7957,x:351.6,y:-23.35},0).wait(1).to({rotation:385.8906,x:351.7,y:-23.6},0).wait(1).to({rotation:386.9854,x:351.85,y:-23.9},0).wait(1).to({rotation:388.0802,x:352,y:-24.15},0).wait(1).to({rotation:389.175,x:352.15,y:-24.4},0).wait(1).to({rotation:390.2698,x:352.35,y:-24.65},0).wait(1).to({rotation:391.3646,x:352.5,y:-24.9},0).wait(1).to({rotation:392.4594,x:352.75,y:-25.15},0).wait(1).to({rotation:393.5542,x:352.95,y:-25.45},0).wait(1).to({rotation:394.649,x:353.1,y:-25.65},0).wait(1).to({rotation:395.7438,x:353.3,y:-25.95},0).wait(1).to({rotation:396.8387,x:353.5,y:-26.15},0).wait(1).to({rotation:397.9335,x:353.7,y:-26.4},0).wait(1).to({rotation:399.0283,x:353.9,y:-26.6},0).wait(1).to({rotation:400.1231,x:354.15,y:-26.8},0).wait(1).to({rotation:401.2179,x:354.35,y:-27.05},0).wait(1).to({rotation:402.3127,x:354.55,y:-27.2},0).wait(1).to({rotation:403.4075,x:354.75,y:-27.5},0).wait(1).to({rotation:404.5023,x:355.05,y:-27.65},0).wait(1).to({rotation:405.5971,x:355.25,y:-27.9},0).wait(1).to({rotation:406.6919,x:355.5,y:-28.1},0).wait(1).to({rotation:407.7867,x:355.75,y:-28.25},0).wait(1).to({rotation:408.8816,x:356.05,y:-28.45},0).wait(1).to({rotation:409.9764,x:356.2,y:-28.65},0).wait(1).to({rotation:411.0712,x:356.5,y:-28.85},0).wait(1).to({rotation:412.166,x:356.75,y:-28.95},0).wait(1).to({rotation:413.2608,x:357.05,y:-29.15},0).wait(1).to({rotation:414.3556,x:357.25,y:-29.35},0).wait(1).to({rotation:415.4504,x:357.55,y:-29.5},0).wait(1).to({rotation:416.5452,x:357.8,y:-29.65},0).wait(1).to({rotation:417.64,x:358.1,y:-29.8},0).wait(1).to({rotation:418.7348,x:358.3,y:-29.95},0).wait(1).to({rotation:419.8297,x:358.65,y:-30.05},0).wait(1).to({rotation:420.9245,x:358.9,y:-30.2},0).wait(1).to({rotation:422.0193,x:359.15,y:-30.35},0).wait(1).to({rotation:423.1141,x:359.5,y:-30.45},0).wait(1).to({rotation:424.2089,x:359.75,y:-30.6},0).wait(1).to({rotation:425.3037,x:360.05,y:-30.7},0).wait(1).to({rotation:426.3985,x:360.35,y:-30.8},0).wait(1).to({rotation:427.4933,x:360.6,y:-30.85},0).wait(1);
	var _tweenStr_12 = _tweenStr_11.to({rotation:428.5881,x:360.9,y:-31},0).wait(1).to({rotation:429.6829,x:361.2,y:-31.05},0).wait(1).to({rotation:430.7778,x:361.55,y:-31.15},0).wait(1).to({rotation:431.8726,x:361.8,y:-31.25},0).wait(1).to({rotation:432.9674,x:362.1,y:-31.3},0).wait(1).to({rotation:434.0622,x:362.4,y:-31.4},0).wait(1).to({rotation:435.157,x:362.7},0).wait(1).to({rotation:436.2518,x:363,y:-31.45},0).wait(1).to({rotation:437.3466,x:363.35,y:-31.55},0).wait(1).to({rotation:438.4414,x:363.6,y:-31.6},0).wait(1).to({rotation:439.5362,x:363.95},0).wait(1).to({rotation:440.631,x:364.2,y:-31.65},0).wait(1).to({rotation:441.7259,x:364.6,y:-31.7},0).wait(1).to({rotation:442.8207,x:364.9},0).wait(1).to({rotation:443.9155,x:365.2},0).wait(1).to({rotation:445.0103,x:365.5,y:-31.75},0).wait(1).to({rotation:446.1051,x:365.8,y:-31.7},0).wait(1).to({rotation:447.1999,x:366.1},0).wait(1).to({rotation:448.2947,x:366.4},0).wait(1).to({rotation:449.3895,x:366.75},0).wait(1).to({rotation:450.4843,x:367.05,y:-31.65},0).wait(1).to({rotation:451.5791,x:367.35,y:-31.6},0).wait(1).to({rotation:452.674,x:367.65,y:-31.65},0).wait(1).to({rotation:453.7688,x:367.95,y:-31.55},0).wait(1).to({rotation:454.8636,x:368.25,y:-31.5},0).wait(1).to({rotation:455.9584,x:368.6,y:-31.4},0).wait(1).to({rotation:457.0532,x:368.9,y:-31.45},0).wait(1).to({rotation:458.148,x:369.2,y:-31.35},0).wait(1).to({rotation:459.2428,x:369.45,y:-31.25},0).wait(1).to({rotation:460.3376,x:369.8},0).wait(1).to({rotation:461.4324,x:370.05,y:-31.15},0).wait(1).to({rotation:462.5272,x:370.4,y:-31},0).wait(1).to({rotation:463.6221,x:370.65,y:-30.95},0).wait(1).to({rotation:464.7169,x:370.95,y:-30.85},0).wait(1).to({rotation:465.8117,x:371.25,y:-30.75},0).wait(1).to({rotation:466.9065,x:371.55,y:-30.65},0).wait(1).to({rotation:468.0013,x:371.85,y:-30.5},0).wait(1).to({rotation:469.0961,x:372.1,y:-30.35},0).wait(1).to({rotation:470.1909,x:372.4,y:-30.25},0).wait(1).to({rotation:471.2857,x:372.65,y:-30.15},0).wait(1).to({rotation:472.3805,x:372.95,y:-30.05},0).wait(1).to({rotation:473.4753,x:373.25,y:-29.85},0).wait(1).to({rotation:474.5702,x:373.5,y:-29.75},0).wait(1).to({rotation:475.665,x:373.8,y:-29.55},0).wait(1).to({rotation:476.7598,x:374.05,y:-29.4},0).wait(1).to({rotation:477.8546,x:374.3,y:-29.25},0).wait(1).to({rotation:478.9494,x:374.55,y:-29.1},0).wait(1).to({rotation:480.0442,x:374.85,y:-28.9},0).wait(1).to({rotation:481.139,x:375.05,y:-28.75},0).wait(1).to({rotation:482.2338,x:375.3,y:-28.55},0).wait(1).to({rotation:483.3286,x:375.6,y:-28.35},0).wait(1).to({rotation:484.4234,x:375.85,y:-28.15},0).wait(1).to({rotation:485.5182,x:376.05,y:-28},0).wait(1).to({rotation:486.6131,x:376.35,y:-27.8},0).wait(1).to({rotation:487.7079,x:376.55,y:-27.6},0).wait(1).to({rotation:488.8027,x:376.7,y:-27.35},0).wait(1).to({rotation:489.8975,x:377,y:-27.15},0).wait(1).to({rotation:490.9923,x:377.2,y:-26.95},0).wait(1).to({rotation:492.0871,x:377.45,y:-26.75},0).wait(1).to({rotation:493.1819,x:377.6,y:-26.5},0).wait(1).to({rotation:494.2767,x:377.85,y:-26.25},0).wait(1).to({rotation:495.3715,x:378.05,y:-26},0).wait(1).to({rotation:496.4663,x:378.2,y:-25.8},0).wait(1).to({rotation:497.5612,x:378.4,y:-25.55},0).wait(1).to({rotation:498.656,x:378.65,y:-25.3},0).wait(1).to({rotation:499.7508,x:378.8,y:-25.1},0).wait(1).to({rotation:500.8456,x:379,y:-24.8},0).wait(1).to({rotation:501.9404,x:379.15,y:-24.55},0).wait(1).to({rotation:503.0352,x:379.35,y:-24.3},0).wait(1).to({rotation:504.13,x:379.55,y:-24},0).wait(1).to({rotation:505.2248,x:379.6,y:-23.75},0).wait(1).to({rotation:506.3196,x:379.8,y:-23.5},0).wait(1).to({rotation:507.4144,x:379.95,y:-23.2},0).wait(1).to({rotation:508.5093,x:380.05,y:-22.95},0).wait(1).to({rotation:509.6041,x:380.25,y:-22.7},0).wait(1).to({rotation:510.6989,x:380.4,y:-22.4},0).wait(1).to({rotation:511.7937,x:380.5,y:-22.15},0).wait(1).to({rotation:512.8885,x:380.65,y:-21.85},0).wait(1).to({rotation:513.9833,x:380.7,y:-21.55},0).wait(1).to({rotation:515.0781,x:380.85,y:-21.25},0).wait(1).to({rotation:516.1729,x:380.95,y:-21},0).wait(1).to({rotation:517.2677,x:381.1,y:-20.7},0).wait(1).to({rotation:518.3625,x:381.15,y:-20.4},0).wait(1).to({rotation:519.4574,x:381.3,y:-20.05},0).wait(1).to({rotation:520.5522,x:381.35,y:-19.8},0).wait(1).to({rotation:521.647,x:381.45,y:-19.5},0).wait(1).to({rotation:522.7418,x:381.5,y:-19.2},0).wait(1).to({rotation:523.8366,x:381.55,y:-18.85},0).wait(1).to({rotation:524.9314,x:381.65,y:-18.6},0).wait(1).to({rotation:526.0262,x:381.7,y:-18.3},0).wait(1).to({rotation:527.121,y:-17.95},0).wait(1).to({rotation:528.2158,x:381.75,y:-17.7},0).wait(1).to({rotation:529.3106,x:381.8,y:-17.35},0).wait(1).to({rotation:530.4055,x:381.85,y:-17.05},0).wait(1).to({rotation:531.5003,x:381.9,y:-16.75},0).wait(1).to({rotation:532.5951,y:-16.45},0).wait(1).to({rotation:533.6899,y:-16.15},0).wait(1).to({rotation:534.7847,x:381.95,y:-15.8},0).wait(1).to({rotation:535.8795,x:381.9,y:-15.5},0).wait(1).to({rotation:536.9743,x:381.95,y:-15.2},0).wait(1).to({rotation:538.0691,x:381.9,y:-14.9},0).wait(1).to({rotation:539.1639,y:-14.6},0).wait(1).to({rotation:540.2587,y:-14.3},0).wait(1).to({rotation:541.3536,x:381.85,y:-13.95},0).wait(1).to({rotation:542.4484,x:381.8,y:-13.65},0).wait(1).to({rotation:543.5432,x:381.75,y:-13.35},0).wait(1).to({rotation:544.638,y:-13.05},0).wait(1).to({rotation:545.7328,x:381.65,y:-12.75},0).wait(1).to({rotation:546.8276,x:381.6,y:-12.45},0).wait(1).to({rotation:547.9224,y:-12.1},0).wait(1).to({rotation:549.0172,x:381.5,y:-11.85},0).wait(1).to({rotation:550.112,x:381.4,y:-11.5},0).wait(1).to({rotation:551.2068,x:381.35,y:-11.25},0).wait(1).to({rotation:552.3017,x:381.3,y:-10.9},0).wait(1).to({rotation:553.3965,x:381.15,y:-10.65},0).wait(1).to({rotation:554.4913,x:381.1,y:-10.3},0).wait(1).to({rotation:555.5861,x:380.95,y:-10.05},0).wait(1).to({rotation:556.6809,x:380.8,y:-9.75},0).wait(1).to({rotation:557.7757,y:-9.45},0).wait(1).to({rotation:558.8705,x:380.65,y:-9.2},0).wait(1).to({rotation:559.9653,x:380.5,y:-8.9},0).wait(1).to({rotation:561.0601,x:380.35,y:-8.6},0).wait(1).to({rotation:562.1549,x:380.2,y:-8.3},0).wait(1).to({rotation:563.2497,x:380.1,y:-8},0).wait(1).to({rotation:564.3446,x:379.95,y:-7.8},0).wait(1).to({rotation:565.4394,x:379.85,y:-7.5},0).wait(1).to({rotation:566.5342,x:379.65,y:-7.25},0).wait(1).to({rotation:567.629,x:379.5,y:-6.95},0).wait(1).to({rotation:568.7238,x:379.35,y:-6.7},0).wait(1).to({rotation:569.8186,x:379.15,y:-6.45},0).wait(1).to({rotation:570.9134,x:379,y:-6.2},0).wait(1).to({rotation:572.0082,x:378.8,y:-6},0).wait(1).to({rotation:573.103,x:378.65,y:-5.75},0).wait(1).to({rotation:574.1978,x:378.45,y:-5.45},0).wait(1).to({rotation:575.2927,x:378.25,y:-5.2},0).wait(1).to({rotation:576.3875,x:378,y:-5},0).wait(1).to({rotation:577.4823,x:377.8,y:-4.7},0).wait(1).to({rotation:578.5771,x:377.65,y:-4.55},0).wait(1).to({rotation:579.6719,x:377.45,y:-4.3},0).wait(1).to({rotation:580.7667,x:377.2,y:-4.1},0).wait(1).to({rotation:581.8615,x:377,y:-3.8},0).wait(1).to({rotation:582.9563,x:376.75,y:-3.65},0).wait(1).to({rotation:584.0511,x:376.55,y:-3.4},0).wait(1).to({rotation:585.1459,x:376.3,y:-3.25},0).wait(1).to({rotation:586.2408,x:376.05,y:-3.05},0).wait(1).to({rotation:587.3356,x:375.8,y:-2.8},0).wait(1).to({rotation:588.4304,x:375.55,y:-2.65},0).wait(1).to({rotation:589.5252,x:375.3,y:-2.45},0).wait(1).to({rotation:590.62,x:375.1,y:-2.25},0).wait(1).to({rotation:591.7148,x:374.8,y:-2.05},0).wait(1).to({rotation:592.8096,x:374.55,y:-2},0).wait(1).to({rotation:593.9044,x:374.25,y:-1.8},0).wait(1).to({rotation:594.9992,x:374,y:-1.6},0).wait(1).to({rotation:596.094,x:373.75,y:-1.45},0).wait(1).to({rotation:597.1889,x:373.5,y:-1.3},0).wait(1).to({rotation:598.2837,x:373.2,y:-1.15},0).wait(1).to({rotation:599.3785,x:372.95,y:-1},0).wait(1).to({rotation:600.4733,x:372.7,y:-0.9},0).wait(1).to({rotation:601.5681,x:372.4,y:-0.75},0).wait(1).to({rotation:602.6629,x:372.1,y:-0.6},0).wait(1).to({rotation:603.7577,x:371.85,y:-0.5},0).wait(1).to({rotation:604.8525,x:371.55,y:-0.4},0).wait(1).to({rotation:605.9473,x:371.25,y:-0.3},0).wait(1).to({rotation:607.0421,x:370.95,y:-0.2},0).wait(1).to({rotation:608.137,x:370.6,y:-0.1},0).wait(1).to({rotation:609.2318,x:370.35,y:0},0).wait(1).to({rotation:610.3266,x:370.05,y:0.1},0).wait(1).to({rotation:611.4214,x:369.75,y:0.15},0).wait(1).to({rotation:612.5162,x:369.5,y:0.25},0).wait(1).to({rotation:613.611,x:369.15,y:0.3},0).wait(1).to({rotation:614.7058,x:368.85,y:0.4},0).wait(1).to({rotation:615.8006,x:368.5,y:0.45},0).wait(1).to({rotation:616.8954,x:368.25,y:0.5},0).wait(1).to({rotation:617.9902,x:367.9,y:0.55},0).wait(1).to({rotation:619.0851,x:367.65},0).wait(1).to({rotation:620.1799,x:367.3,y:0.6},0).wait(1).to({rotation:621.2747,x:367.05},0).wait(1).to({rotation:622.3695,x:366.7,y:0.65},0).wait(1).to({rotation:623.4643,x:366.4},0).wait(1).to({rotation:624.5591,x:366.15,y:0.7},0).wait(1).to({rotation:625.6539,x:365.75},0).wait(1).to({rotation:626.7487,x:365.45},0).wait(1).to({rotation:627.8435,x:365.15,y:0.65},0).wait(1).to({rotation:628.9383,x:364.85},0).wait(1).to({rotation:630.0332,x:364.55},0).wait(1).to({rotation:631.128,x:364.25,y:0.6},0).wait(1).to({rotation:632.2228,x:363.9},0).wait(1).to({rotation:633.3176,x:363.6,y:0.55},0).wait(1).to({rotation:634.4124,x:363.3,y:0.5},0).wait(1).to({rotation:635.5072,x:363.05},0).wait(1).to({rotation:636.602,x:362.7,y:0.4},0).wait(1).to({rotation:637.6968,x:362.4,y:0.3},0).wait(1).to({rotation:638.7916,x:362.15,y:0.25},0).wait(1).to({rotation:639.8864,x:361.8,y:0.2},0).wait(1).to({rotation:640.9812,x:361.5,y:0.1},0).wait(1).to({rotation:642.0761,x:361.15,y:0.05},0).wait(1).to({rotation:643.1709,x:360.9,y:-0.05},0).wait(1).to({rotation:644.2657,x:360.55,y:-0.15},0).wait(1).to({rotation:645.3605,x:360.3,y:-0.2},0).wait(1).to({rotation:646.4553,x:360,y:-0.35},0).wait(1).to({rotation:647.5501,x:359.8,y:-0.5},0).wait(1).to({rotation:648.6449,x:359.45,y:-0.6},0).wait(1).to({rotation:649.7397,x:359.15,y:-0.7},0).wait(1).to({rotation:650.8345,x:358.85,y:-0.8},0).wait(1).to({rotation:651.9293,x:358.55,y:-0.95},0).wait(1).to({rotation:653.0242,x:358.35,y:-1.1},0).wait(1).to({rotation:654.119,x:358.05,y:-1.25},0).wait(1).to({rotation:655.2138,x:357.8,y:-1.4},0).wait(1).to({rotation:656.3086,x:357.55,y:-1.55},0).wait(1).to({rotation:657.4034,x:357.25,y:-1.7},0).wait(1).to({rotation:658.4982,x:357,y:-1.9},0).wait(1).to({rotation:659.593,x:356.7,y:-2.05},0).wait(1).to({rotation:660.6878,x:356.45,y:-2.25},0).wait(1).to({rotation:661.7826,x:356.2,y:-2.4},0).wait(1).to({rotation:662.8774,x:356,y:-2.6},0).wait(1).to({rotation:663.9723,x:355.7,y:-2.8},0).wait(1).to({rotation:665.0671,x:355.45,y:-3},0).wait(1).to({rotation:666.1619,x:355.25,y:-3.15},0).wait(1).to({rotation:667.2567,x:355,y:-3.35},0).wait(1).to({rotation:668.3515,x:354.8,y:-3.55},0).wait(1).to({rotation:669.4463,x:354.6,y:-3.85},0).wait(1).to({rotation:670.5411,x:354.3,y:-4},0).wait(1).to({rotation:671.6359,x:354.1,y:-4.25},0).wait(1).to({rotation:672.7307,x:353.9,y:-4.45},0).wait(1).to({rotation:673.8255,x:353.7,y:-4.7},0).wait(1).to({rotation:674.9204,x:353.5,y:-4.9},0).wait(1).to({rotation:676.0152,x:353.3,y:-5.2},0).wait(1).to({rotation:677.11,x:353.1,y:-5.4},0).wait(1).to({rotation:678.2048,x:352.9,y:-5.6},0).wait(1).to({rotation:679.2996,x:352.7,y:-5.85},0).wait(1).to({rotation:680.3944,x:352.55,y:-6.1},0).wait(1).to({rotation:681.4892,x:352.35,y:-6.4},0).wait(1).to({rotation:682.584,x:352.15,y:-6.65},0).wait(1).to({rotation:683.6788,x:352,y:-6.9},0).wait(1).to({rotation:684.7736,x:351.85,y:-7.2},0).wait(1).to({rotation:685.8685,x:351.7,y:-7.45},0).wait(1).to({rotation:686.9633,x:351.5,y:-7.7},0).wait(1).to({rotation:688.0581,x:351.45,y:-7.95},0).wait(1).to({rotation:689.1529,x:351.3,y:-8.25},0).wait(1).to({rotation:690.2477,x:351.15,y:-8.55},0).wait(1).to({rotation:691.3425,x:351.05,y:-8.8},0).wait(1).to({rotation:692.4373,x:350.9,y:-9.15},0).wait(1).to({rotation:693.5321,x:350.8,y:-9.35},0).wait(1).to({rotation:694.6269,x:350.6,y:-9.65},0).wait(1).to({rotation:695.7217,x:350.5,y:-9.95},0).wait(1).to({rotation:696.8166,x:350.4,y:-10.25},0).wait(1).to({rotation:697.9114,x:350.35,y:-10.55},0).wait(1).to({rotation:699.0062,x:350.2,y:-10.8},0).wait(1).to({rotation:700.101,x:350.15,y:-11.1},0).wait(1).to({rotation:701.1958,x:350.05,y:-11.4},0).wait(1).to({rotation:702.2906,x:350,y:-11.75},0).wait(1).to({rotation:703.3854,x:349.85,y:-12.05},0).wait(1).to({rotation:704.4802,y:-12.35},0).wait(1).to({rotation:705.575,x:349.8,y:-12.65},0).wait(1).to({rotation:706.6698,x:349.75,y:-12.95},0).wait(1).to({rotation:707.7646,x:349.65,y:-13.3},0).wait(1).to({rotation:708.8595,y:-13.55},0).wait(1).to({rotation:709.9543,x:349.6,y:-13.9},0).wait(1).to({rotation:711.0491,y:-14.15},0).wait(1).to({rotation:712.1439,x:349.55,y:-14.5},0).wait(1).to({rotation:713.2387,y:-14.8},0).wait(1).to({rotation:714.3335,y:-15.05},0).wait(1).to({rotation:715.4283,y:-15.35},0).wait(1).to({rotation:716.5231,y:-15.7},0).wait(1).to({rotation:717.6179,y:-16.05},0).wait(1).to({rotation:718.7127,y:-16.35},0).wait(1).to({rotation:719.8076,y:-16.65},0).wait(1).to({rotation:720.9024,x:349.6,y:-16.95},0).wait(1).to({rotation:721.9972,x:349.65,y:-17.25},0).wait(1).to({rotation:723.092,y:-17.55},0).wait(1).to({rotation:724.1868,x:349.7,y:-17.9},0).wait(1).to({rotation:725.2816,x:349.75,y:-18.15},0).wait(1).to({rotation:726.3764,x:349.8,y:-18.5},0).wait(1).to({rotation:727.4712,x:349.85,y:-18.8},0).wait(1).to({rotation:728.566,x:349.95,y:-19.05},0).wait(1).to({rotation:729.6608,x:350.05,y:-19.4},0).wait(1).to({rotation:730.7557,x:350.1,y:-19.65},0).wait(1).to({rotation:731.8505,x:350.15,y:-19.95},0).wait(1).to({rotation:732.9453,x:350.25,y:-20.25},0).wait(1).to({rotation:734.0401,x:350.35,y:-20.55},0).wait(1).to({rotation:735.1349,x:350.45,y:-20.85},0).wait(1).to({rotation:736.2297,x:350.55,y:-21.15},0).wait(1).to({rotation:737.3245,x:350.65,y:-21.4},0).wait(1).to({rotation:738.4193,x:350.75,y:-21.75},0).wait(1).to({rotation:739.5141,x:350.85,y:-22.05},0).wait(1).to({rotation:740.6089,x:351.05,y:-22.35},0).wait(1).to({rotation:741.7038,x:351.2,y:-22.55},0).wait(1).to({rotation:742.7986,x:351.25,y:-22.85},0).wait(1).to({rotation:743.8934,x:351.45,y:-23.15},0).wait(1).to({rotation:744.9882,x:351.55,y:-23.35},0).wait(1).to({rotation:746.083,x:351.75,y:-23.65},0).wait(1).to({rotation:747.1778,x:351.9,y:-23.95},0).wait(1).to({rotation:748.2726,x:352,y:-24.2},0).wait(1).to({rotation:749.3674,x:352.2,y:-24.4},0).wait(1).to({rotation:750.4622,x:352.4,y:-24.7},0).wait(1).to({rotation:751.557,x:352.6,y:-25},0).wait(1).to({rotation:752.6519,x:352.75,y:-25.2},0).wait(1).to({rotation:753.7467,x:352.9,y:-25.45},0).wait(1).to({rotation:754.8415,x:353.15,y:-25.7},0).wait(1).to({rotation:755.9363,x:353.35,y:-26},0).wait(1).to({rotation:757.0311,x:353.55,y:-26.2},0).wait(1).to({rotation:758.1259,x:353.75,y:-26.4},0).wait(1).to({rotation:759.2207,x:353.95,y:-26.65},0).wait(1).to({rotation:760.3155,x:354.15,y:-26.85},0).wait(1).to({rotation:761.4103,x:354.4,y:-27.1},0).wait(1).to({rotation:762.5051,x:354.6,y:-27.25},0).wait(1).to({rotation:763.6,x:354.85,y:-27.5},0).wait(1).to({rotation:764.6948,x:355.05,y:-27.7},0).wait(1).to({rotation:765.7896,x:355.3,y:-27.9},0).wait(1).to({rotation:766.8844,x:355.5,y:-28.1},0).wait(1).to({rotation:767.9792,x:355.8,y:-28.3},0).wait(1).to({rotation:769.074,x:356,y:-28.45},0).wait(1).to({rotation:770.1688,x:356.3,y:-28.65},0).wait(1).to({rotation:771.2636,x:356.5,y:-28.85},0).wait(1).to({rotation:772.3584,x:356.8,y:-29.05},0).wait(1).to({rotation:773.4532,x:357.05,y:-29.2},0).wait(1).to({rotation:774.5481,x:357.3,y:-29.35},0).wait(1).to({rotation:775.6429,x:357.6,y:-29.5},0).wait(1).to({rotation:776.7377,x:357.9,y:-29.65},0).wait(1).to({rotation:777.8325,x:358.1,y:-29.8},0).wait(1).to({rotation:778.9273,x:358.35,y:-29.95},0).wait(1).to({rotation:780.0221,x:358.7,y:-30.1},0).wait(1).to({rotation:781.1169,x:358.95,y:-30.25},0).wait(1).to({rotation:782.2117,x:359.25,y:-30.35},0).wait(1).to({rotation:783.3065,x:359.55,y:-30.5},0).wait(1).to({rotation:784.4013,x:359.8,y:-30.55},0).wait(1).to({rotation:785.4961,x:360.1,y:-30.7},0).wait(1).to({rotation:786.591,x:360.4,y:-30.75},0).wait(1).to({rotation:787.6858,x:360.65,y:-30.9},0).wait(1).to({rotation:788.7806,x:360.95,y:-31},0).wait(1).to({rotation:789.8754,x:361.25,y:-31.1},0).wait(1).to({rotation:790.9702,x:361.55,y:-31.15},0).wait(1).to({rotation:792.065,x:361.9,y:-31.25},0).wait(1).to({rotation:793.1598,x:362.15,y:-31.3},0).wait(1).to({rotation:794.2546,x:362.45,y:-31.35},0).wait(1).to({rotation:795.3494,x:362.75,y:-31.5},0).wait(1).to({rotation:796.4442,x:363.05},0).wait(1).to({rotation:797.5391,x:363.4},0).wait(1).to({rotation:798.6339,x:363.65,y:-31.6},0).wait(1).to({rotation:799.7287,x:364,y:-31.65},0).wait(1).to({rotation:800.8235,x:364.25},0).wait(1).to({rotation:801.9183,x:364.65,y:-31.7},0).wait(1).to({rotation:803.0131,x:364.95},0).wait(1).to({rotation:804.1079,x:365.25},0).wait(1).to({rotation:805.2027,x:365.55},0).wait(1).to({rotation:806.2975,x:365.85},0).wait(1).to({rotation:807.3923,x:366.15,y:-31.75},0).wait(1).to({rotation:808.4872,x:366.45,y:-31.7},0).wait(1).to({rotation:809.582,x:366.8,y:-31.65},0).wait(1).to({rotation:810.6768,x:367.1},0).wait(1).to({rotation:811.7716,x:367.4},0).wait(1).to({rotation:812.8664,x:367.7,y:-31.6},0).wait(1).to({rotation:813.9612,x:368,y:-31.5},0).wait(1).to({rotation:815.056,x:368.3,y:-31.55},0).wait(1).to({rotation:816.1508,x:368.65,y:-31.45},0).wait(1).to({rotation:817.2456,x:368.95,y:-31.35},0).wait(1).to({rotation:818.3404,x:369.25},0).wait(1).to({rotation:819.4353,x:369.55,y:-31.3},0).wait(1).to({rotation:820.5301,x:369.85,y:-31.2},0).wait(1).to({rotation:821.6249,x:370.1,y:-31.05},0).wait(1).to({rotation:822.7197,x:370.45,y:-31},0).wait(1).to({rotation:823.8145,x:370.7,y:-30.95},0).wait(1).to({rotation:824.9093,x:371,y:-30.8},0).wait(1).to({rotation:826.0041,x:371.3,y:-30.75},0).wait(1).to({rotation:827.0989,x:371.6,y:-30.6},0).wait(1).to({rotation:828.1937,x:371.9,y:-30.55},0).wait(1).to({rotation:829.2885,x:372.2,y:-30.4},0).wait(1).to({rotation:830.3834,x:372.45,y:-30.25},0).wait(1).to({rotation:831.4782,x:372.7,y:-30.15},0).wait(1).to({rotation:832.573,x:373,y:-29.95},0).wait(1).to({rotation:833.6678,x:373.3,y:-29.85},0).wait(1).to({rotation:834.7626,x:373.55,y:-29.65},0).wait(1).to({rotation:835.8574,x:373.85,y:-29.55},0).wait(1).to({rotation:836.9522,x:374.05,y:-29.35},0).wait(1).to({rotation:838.047,x:374.35,y:-29.2},0).wait(1).to({rotation:839.1418,x:374.6,y:-29},0).wait(1).to({rotation:840.2366,x:374.9,y:-28.85},0).wait(1).to({rotation:841.3315,x:375.1,y:-28.7},0).wait(1).to({rotation:842.4263,x:375.4,y:-28.5},0).wait(1).to({rotation:843.5211,x:375.6,y:-28.3},0).wait(1).to({rotation:844.6159,x:375.9,y:-28.15},0).wait(1).to({rotation:845.7107,x:376.1,y:-27.95},0).wait(1).to({rotation:846.8055,x:376.35,y:-27.75},0).wait(1).to({rotation:847.9003,x:376.55,y:-27.55},0).wait(1).to({rotation:848.9951,x:376.8,y:-27.35},0).wait(1).to({rotation:850.0899,x:377,y:-27.1},0).wait(1).to({rotation:851.1847,x:377.3,y:-26.9},0).wait(1).to({rotation:852.2796,x:377.45,y:-26.7},0).wait(1).to({rotation:853.3744,x:377.7,y:-26.45},0).wait(1).to({rotation:854.4692,x:377.85,y:-26.25},0).wait(1).to({rotation:855.564,x:378.1,y:-26},0).wait(1).to({rotation:856.6588,x:378.3,y:-25.75},0).wait(1).to({rotation:857.7536,x:378.45,y:-25.5},0).wait(1).to({rotation:858.8484,x:378.65,y:-25.25},0).wait(1).to({rotation:859.9432,x:378.85,y:-25},0).wait(1).to({rotation:861.038,x:379,y:-24.75},0).wait(1).to({rotation:862.1328,x:379.2,y:-24.5},0).wait(1).to({rotation:863.2276,x:379.35,y:-24.2},0).wait(1).to({rotation:864.3225,x:379.5,y:-24},0).wait(1);
	this.timeline.addTween(_tweenStr_12.to({rotation:865.4173,x:379.7,y:-23.7},0).wait(1).to({rotation:866.5121,x:379.85,y:-23.45},0).wait(1).to({rotation:867.6069,x:380,y:-23.15},0).wait(1).to({rotation:868.7017,x:380.15,y:-22.95},0).wait(1).to({rotation:869.7965,x:380.3,y:-22.65},0).wait(1).to({rotation:870.8913,x:380.4,y:-22.35},0).wait(1).to({rotation:871.9861,x:380.55,y:-22.1},0).wait(1).to({rotation:873.0809,x:380.65,y:-21.75},0).wait(1).to({rotation:874.1757,x:380.8,y:-21.5},0).wait(1).to({rotation:875.2706,x:380.9,y:-21.2},0).wait(1).to({rotation:876.3654,x:381,y:-20.95},0).wait(1).to({rotation:877.4602,x:381.1,y:-20.65},0).wait(1).to({rotation:878.555,x:381.2,y:-20.35},0).wait(1).to({rotation:879.6498,x:381.25,y:-20.05},0).wait(1).to({rotation:880.7446,x:381.35,y:-19.75},0).wait(1).to({rotation:881.8394,x:381.45,y:-19.45},0).wait(1).to({rotation:882.9342,x:381.55,y:-19.15},0).wait(1).to({rotation:884.029,x:381.6,y:-18.8},0).wait(1).to({rotation:885.1238,y:-18.55},0).wait(1).to({rotation:886.2187,x:381.7,y:-18.25},0).wait(1).to({rotation:887.3135,x:381.75,y:-17.9},0).wait(1).to({rotation:888.4083,y:-17.65},0).wait(1).to({rotation:889.5031,x:381.85,y:-17.3},0).wait(1).to({rotation:890.5979,y:-17.05},0).wait(1).to({rotation:891.6927,x:381.9,y:-16.7},0).wait(1).to({rotation:892.7875,x:381.95,y:-16.4},0).wait(1).to({rotation:893.8823,x:381.9,y:-16.05},0).wait(1).to({rotation:894.9771,y:-15.75},0).wait(1).to({rotation:896.0719,y:-15.45},0).wait(1).to({rotation:897.1668,x:381.95,y:-15.15},0).wait(1).to({rotation:898.2616,x:381.9,y:-14.85},0).wait(1).to({rotation:899.3564,y:-14.55},0).wait(1).to({rotation:900.4512,x:381.85,y:-14.2},0).wait(1).to({rotation:901.546,y:-13.9},0).wait(1).to({rotation:902.6408,y:-13.6},0).wait(1).to({rotation:903.7356,x:381.75,y:-13.3},0).wait(1).to({rotation:904.8304,x:381.7,y:-13},0).wait(1).to({rotation:905.9252,x:381.65,y:-12.7},0).wait(1).to({rotation:907.02,y:-12.4},0).wait(1).to({rotation:908.1149,x:381.55,y:-12.05},0).wait(1).to({rotation:909.2097,x:381.5,y:-11.8},0).wait(1).to({rotation:910.3045,x:381.4,y:-11.45},0).wait(1).to({rotation:911.3993,x:381.35,y:-11.2},0).wait(1).to({rotation:912.4941,x:381.2,y:-10.85},0).wait(1).to({rotation:913.5889,x:381.15,y:-10.6},0).wait(1).to({rotation:914.6837,x:381.05,y:-10.25},0).wait(1).to({rotation:915.7785,x:380.95,y:-10},0).wait(1).to({rotation:916.8733,x:380.85,y:-9.7},0).wait(1).to({rotation:917.9681,x:380.7,y:-9.4},0).wait(1).to({rotation:919.063,x:380.6,y:-9.15},0).wait(1).to({rotation:920.1578,x:380.45,y:-8.9},0).wait(1).to({rotation:921.2526,x:380.35,y:-8.6},0).wait(1).to({rotation:922.3474,x:380.25,y:-8.3},0).wait(1).to({rotation:923.4422,x:380.05,y:-8},0).wait(1).to({rotation:924.537,x:379.95,y:-7.75},0).wait(1).to({rotation:925.6318,x:379.75,y:-7.45},0).wait(1).to({rotation:926.7266,x:379.65,y:-7.2},0).wait(1).to({rotation:927.8214,x:379.45,y:-6.9},0).wait(1).to({rotation:928.9162,x:379.3,y:-6.7},0).wait(1).to({rotation:930.0111,x:379.15,y:-6.4},0).wait(1).to({rotation:931.1059,x:378.95,y:-6.15},0).wait(1).to({rotation:932.2007,x:378.75,y:-5.95},0).wait(1).to({rotation:933.2955,x:378.6,y:-5.65},0).wait(1).to({rotation:934.3903,x:378.4,y:-5.45},0).wait(1).to({rotation:935.4851,x:378.2,y:-5.15},0).wait(1).to({rotation:936.5799,x:378,y:-4.9},0).wait(1).to({rotation:937.6747,x:377.8,y:-4.75},0).wait(1).to({rotation:938.7695,x:377.6,y:-4.5},0).wait(1).to({rotation:939.8643,x:377.35,y:-4.25},0).wait(1).to({rotation:940.9591,x:377.15,y:-4.05},0).wait(1).to({rotation:942.054,x:376.9,y:-3.85},0).wait(1).to({rotation:943.1488,x:376.7,y:-3.65},0).wait(1).to({rotation:944.2436,x:376.45,y:-3.4},0).wait(1).to({rotation:945.3384,x:376.2,y:-3.15},0).wait(1).to({rotation:946.4332,x:376,y:-3},0).wait(1).to({rotation:947.528,x:375.8,y:-2.8},0).wait(1).to({rotation:948.6228,x:375.55,y:-2.6},0).wait(1).to({rotation:949.7176,x:375.3,y:-2.5},0).wait(1).to({rotation:950.8124,x:375,y:-2.3},0).wait(1).to({rotation:951.9072,x:374.8,y:-2.1},0).wait(1).to({rotation:953.0021,x:374.5,y:-1.9},0).wait(1).to({rotation:954.0969,x:374.2,y:-1.7},0).wait(1).to({rotation:955.1917,x:374,y:-1.6},0).wait(1).to({rotation:956.2865,x:373.7,y:-1.45},0).wait(1).to({rotation:957.3813,x:373.45,y:-1.3},0).wait(1).to({rotation:958.4761,x:373.15,y:-1.15},0).wait(1).to({rotation:959.5709,x:372.95,y:-1},0).wait(1).to({rotation:960.6657,x:372.6,y:-0.85},0).wait(1).to({rotation:961.7605,x:372.35,y:-0.7},0).wait(1).to({rotation:962.8553,x:372.05,y:-0.65},0).wait(1).to({rotation:963.9502,x:371.8,y:-0.5},0).wait(1).to({rotation:965.045,x:371.45,y:-0.4},0).wait(1).to({rotation:966.1398,x:371.2,y:-0.3},0).wait(1).to({rotation:967.2346,x:370.9,y:-0.15},0).wait(1).to({rotation:968.3294,x:370.6,y:-0.05},0).wait(1).to({rotation:969.4242,x:370.3,y:0},0).wait(1).to({rotation:970.519,x:370,y:0.15},0).wait(1).to({rotation:971.6138,x:369.7,y:0.2},0).wait(1).to({rotation:972.7086,x:369.4},0).wait(1).to({rotation:973.8034,x:369.1,y:0.3},0).wait(1).to({rotation:974.8983,x:368.8,y:0.4},0).wait(1).to({rotation:975.9931,x:368.5},0).wait(1).to({rotation:977.0879,x:368.2,y:0.5},0).wait(1).to({rotation:978.1827,x:367.9},0).wait(1).to({rotation:979.2775,x:367.55,y:0.55},0).wait(1).to({rotation:980.3723,x:367.25,y:0.65},0).wait(1).to({rotation:981.4671,x:367,y:0.6},0).wait(1).to({rotation:982.5619,x:366.65},0).wait(1).to({rotation:983.6567,x:366.35,y:0.7},0).wait(1).to({rotation:984.7515,x:366.1},0).wait(1).to({rotation:985.8464,x:365.7,y:0.65},0).wait(1).to({rotation:986.9412,x:365.4,y:0.7},0).wait(1).to({rotation:988.036,x:365.1},0).wait(1).to({rotation:989.1308,x:364.8,y:0.65},0).wait(1).to({rotation:990.2256,x:364.5,y:0.6},0).wait(1).to({rotation:991.3204,x:364.2},0).wait(1).to({rotation:992.4152,x:363.85},0).wait(1).to({rotation:993.51,x:363.55,y:0.5},0).wait(1).to({rotation:994.6048,x:363.25},0).wait(1).to({rotation:995.6996,x:363,y:0.4},0).wait(1).to({rotation:996.7945,x:362.65},0).wait(1).to({rotation:997.8893,x:362.35,y:0.3},0).wait(1).to({rotation:998.9841,x:362.1,y:0.25},0).wait(1).to({rotation:1000.0789,x:361.7,y:0.2},0).wait(1).to({rotation:1001.1737,x:361.45,y:0.1},0).wait(1).to({rotation:1002.2685,x:361.1,y:0.05},0).wait(1).to({rotation:1003.3633,x:360.85,y:-0.1},0).wait(1).to({rotation:1004.4581,x:360.5,y:-0.15},0).wait(1).to({rotation:1005.5529,x:360.25,y:-0.3},0).wait(1).to({rotation:1006.6477,x:359.95,y:-0.35},0).wait(1).to({rotation:1007.7425,x:359.7,y:-0.45},0).wait(1).to({rotation:1008.8374,x:359.45,y:-0.6},0).wait(1).to({rotation:1009.9322,x:359.15,y:-0.7},0).wait(1).to({rotation:1011.027,x:358.8,y:-0.85},0).wait(1).to({rotation:1012.1218,x:358.55,y:-1},0).wait(1).to({rotation:1013.2166,x:358.3,y:-1.15},0).wait(1).to({rotation:1014.3114,x:358,y:-1.3},0).wait(1).to({rotation:1015.4062,x:357.75,y:-1.4},0).wait(1).to({rotation:1016.501,x:357.45,y:-1.55},0).wait(1).to({rotation:1017.5958,x:357.15,y:-1.75},0).wait(1).to({rotation:1018.6906,x:356.95,y:-1.9},0).wait(1).to({rotation:1019.7855,x:356.7,y:-2.1},0).wait(1).to({rotation:1020.8803,x:356.4,y:-2.25},0).wait(1).to({rotation:1021.9751,x:356.2,y:-2.4},0).wait(1).to({rotation:1023.0699,x:355.95,y:-2.6},0).wait(1).to({rotation:1024.1647,x:355.7,y:-2.85},0).wait(1).to({rotation:1025.2595,x:355.45,y:-3},0).wait(1).to({rotation:1026.3543,x:355.2,y:-3.2},0).wait(1).to({rotation:1027.4491,x:355,y:-3.45},0).wait(1).to({rotation:1028.5439,x:354.75,y:-3.6},0).wait(1).to({rotation:1029.6387,x:354.55,y:-3.8},0).wait(1).to({rotation:1030.7336,x:354.3,y:-4.05},0).wait(1).to({rotation:1031.8284,x:354.15,y:-4.25},0).wait(1).to({rotation:1032.9232,x:353.85,y:-4.45},0).wait(1).to({rotation:1034.018,x:353.65,y:-4.75},0).wait(1).to({rotation:1035.1128,x:353.45,y:-4.95},0).wait(1).to({rotation:1036.2076,x:353.25,y:-5.15},0).wait(1).to({rotation:1037.3024,x:353.05,y:-5.45},0).wait(1).to({rotation:1038.3972,x:352.85,y:-5.65},0).wait(1).to({rotation:1039.492,x:352.65,y:-5.9},0).wait(1).to({rotation:1040.5868,x:352.45,y:-6.15},0).wait(1).to({rotation:1041.6817,x:352.3,y:-6.45},0).wait(1).to({rotation:1042.7765,x:352.2,y:-6.7},0).wait(1).to({rotation:1043.8713,x:352,y:-6.95},0).wait(1).to({rotation:1044.9661,x:351.8,y:-7.25},0).wait(1).to({rotation:1046.0609,x:351.65,y:-7.45},0).wait(1).to({rotation:1047.1557,x:351.55,y:-7.75},0).wait(1).to({rotation:1048.2505,x:351.35,y:-8},0).wait(1).to({rotation:1049.3453,x:351.2,y:-8.3},0).wait(1).to({rotation:1050.4401,x:351.1,y:-8.6},0).wait(1).to({rotation:1051.5349,x:350.95,y:-8.85},0).wait(1).to({rotation:1052.6298,x:350.8,y:-9.1},0).wait(1).to({rotation:1053.7246,x:350.7,y:-9.4},0).wait(1).to({rotation:1054.8194,x:350.6,y:-9.7},0).wait(1).to({rotation:1055.9142,x:350.5,y:-9.95},0).wait(1).to({rotation:1057.009,x:350.4,y:-10.25},0).wait(1).to({rotation:1058.1038,x:350.3,y:-10.65},0).wait(1).to({rotation:1059.1986,x:350.25,y:-10.9},0).wait(1).to({rotation:1060.2934,x:350.15,y:-11.15},0).wait(1).to({rotation:1061.3882,x:350.05,y:-11.45},0).wait(1).to({rotation:1062.483,x:349.95,y:-11.75},0).wait(1).to({rotation:1063.5779,x:349.9,y:-12.1},0).wait(1).to({rotation:1064.6727,x:349.85,y:-12.4},0).wait(1).to({rotation:1065.7675,x:349.8,y:-12.7},0).wait(1).to({rotation:1066.8623,x:349.7,y:-13},0).wait(1).to({rotation:1067.9571,y:-13.35},0).wait(1).to({rotation:1069.0519,x:349.65,y:-13.6},0).wait(1).to({rotation:1070.1467,y:-13.95},0).wait(1).to({rotation:1071.2415,x:349.6,y:-14.2},0).wait(1).to({rotation:1072.3363,x:349.55,y:-14.55},0).wait(1).to({rotation:1073.4311,y:-14.85},0).wait(1).to({rotation:1074.526,x:349.5,y:-15.1},0).wait(1).to({rotation:1075.6208,x:349.55,y:-15.4},0).wait(1).to({rotation:1076.7156,x:349.5,y:-15.75},0).wait(1).to({rotation:1077.8104,x:349.55,y:-16.1},0).wait(1).to({rotation:1078.9052,y:-16.4},0).wait(1).to({rotation:1080,x:349.6,y:-16.7},0).to({_off:true},1).wait(7));

	// Layer_9
	this.instance_5 = new lib.whitebg("synched",0);
	this.instance_5.setTransform(278.8,199.65);
	this.instance_5._off = true;
	var instance_5Filter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_5.filters = [instance_5Filter_1];
	this.instance_5.cache(-294,-211,589,422);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(247).to({_off:false},0).to({alpha:0.1992},14).to({alpha:0.1094},142).to({startPosition:0},152).to({alpha:0.6211},4).to({startPosition:0},187).to({startPosition:0},40).wait(1033));
	this.timeline.addTween(cjs.Tween.get(instance_5Filter_1).wait(247).to(new cjs.ColorFilter(0.55859375,0.91015625,1,1,0,0,0,0), 14).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 142).wait(152).to(new cjs.ColorFilter(0.12890625,0,1,1,0,0,255,0), 4).wait(187).to(new cjs.ColorFilter(0.6015625,0.16015625,0.26953125,1,0,29,56,0), 40).wait(1033));

	// Layer_1
	this.instance_6 = new lib.sky();
	this.instance_6.setTransform(412.85,299.8,0.55,0.7144,180,0,0,2.8,-0.7);

	this.instance_7 = new lib.sky();
	this.instance_7.setTransform(138.9,299.8,0.55,0.7144,0,180,0,2.8,-0.7);

	this.instance_8 = new lib.sky();
	this.instance_8.setTransform(412.5,100.2,0.55,0.7144,0,0,180,2.8,-0.7);

	this.instance_9 = new lib.sky();
	this.instance_9.setTransform(138.8,100.2,0.55,0.7143,0,0,0,2.6,-0.7);

	this.instance_10 = new lib.sky();
	this.instance_10.setTransform(188.15,99.25,0.4101,0.739,-90,0,0,2.6,-0.2);

	this.instance_11 = new lib.sky();
	this.instance_11.setTransform(187.85,304.95,0.4101,0.739,0,-90,90,3.1,-0.2);

	this.instance_12 = new lib.sky();
	this.instance_12.setTransform(394.5,99,0.4101,0.739,0,90,-90,2.3,-0.8);

	this.instance_13 = new lib.sky();
	this.instance_13.setTransform(394.05,304.95,0.4101,0.7389,90,0,0,3,-0.7);

	this.instance_14 = new lib.darksky();
	this.instance_14.setTransform(270.45,314.25,1.1849,0.7694,0,180,0,-1.4,-2.5);

	this.instance_15 = new lib.darksky();
	this.instance_15.setTransform(270.95,98.7,1.1851,0.7694,0,0,0,-1.4,-1.4);

	this.instance_16 = new lib.skylong();
	this.instance_16.setTransform(138.2,-4,0.8174,0.9871,0,-90,90,1.7,-1);

	this.instance_17 = new lib.skylong();
	this.instance_17.setTransform(411.65,-4,0.8174,0.9871,90,0,0,1.7,-0.8);

	this.instance_18 = new lib.skylong();
	this.instance_18.setTransform(411.85,403.25,0.8174,0.9871,0,90,-90,1.7,-1);

	this.instance_19 = new lib.skylong();
	this.instance_19.setTransform(138.4,403.25,0.8174,0.9871,-90,0,0,1.7,-0.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9,p:{regX:2.6,regY:-0.7,scaleX:0.55,scaleY:0.7143,rotation:0,x:138.8,y:100.2,skewX:0,skewY:0}},{t:this.instance_8,p:{regX:2.8,regY:-0.7,scaleX:0.55,scaleY:0.7144,skewX:0,skewY:180,x:412.5,y:100.2,rotation:0}},{t:this.instance_7,p:{regY:-0.7,scaleX:0.55,scaleY:0.7144,skewX:180,skewY:0,x:138.9,y:299.8,regX:2.8,rotation:0}},{t:this.instance_6,p:{regX:2.8,regY:-0.7,scaleX:0.55,scaleY:0.7144,rotation:180,x:412.85,y:299.8,skewX:0,skewY:0}}]},247).to({state:[{t:this.instance_9,p:{regX:3.1,regY:0.1,scaleX:0.8991,scaleY:1.1677,rotation:-31.9475,x:9.5,y:182.5,skewX:0,skewY:0}},{t:this.instance_8,p:{regX:2.4,regY:0.2,scaleX:0.8991,scaleY:1.1679,skewX:-31.9479,skewY:148.0534,x:389.35,y:-54.4,rotation:0}},{t:this.instance_7,p:{regY:-1.5,scaleX:0.8991,scaleY:1.1679,skewX:148.0521,skewY:-31.9466,x:182.2,y:459.45,regX:2.8,rotation:0}},{t:this.instance_6,p:{regX:2.5,regY:-1.4,scaleX:0.899,scaleY:1.1679,rotation:148.0521,x:562.35,y:222.2,skewX:0,skewY:0}}]},156).to({state:[{t:this.instance_13,p:{y:304.95,regX:3,regY:-0.7,scaleX:0.4101,scaleY:0.7389,rotation:90,x:394.05,skewX:0,skewY:0}},{t:this.instance_12,p:{y:99,regX:2.3,regY:-0.8,scaleX:0.4101,scaleY:0.739,skewX:90,skewY:-90,x:394.5}},{t:this.instance_11,p:{y:304.95,regX:3.1,regY:-0.2,scaleX:0.4101,scaleY:0.739,skewX:-90,skewY:90,x:187.85}},{t:this.instance_10,p:{y:99.25,regX:2.6,regY:-0.2,scaleX:0.4101,scaleY:0.739,rotation:-90,x:188.15,skewX:0,skewY:0}},{t:this.instance_9,p:{regX:2.5,regY:-0.6,scaleX:0.4101,scaleY:0.7371,rotation:0,x:-18.8,y:98.85,skewX:90,skewY:-90}},{t:this.instance_8,p:{regX:3.1,regY:-0.6,scaleX:0.4101,scaleY:0.7358,skewX:0,skewY:0,x:-18.95,y:304.5,rotation:90}},{t:this.instance_7,p:{regY:-0.1,scaleX:0.4101,scaleY:0.7327,skewX:0,skewY:0,x:601.3,y:98.9,regX:2.3,rotation:-90}},{t:this.instance_6,p:{regX:3,regY:-0.2,scaleX:0.4101,scaleY:0.7326,rotation:0,x:600.95,y:304.4,skewX:-90,skewY:90}}]},1).to({state:[{t:this.instance_13,p:{y:306.25,regX:3,regY:-0.7,scaleX:0.4101,scaleY:0.7389,rotation:90,x:394.05,skewX:0,skewY:0}},{t:this.instance_12,p:{y:100.3,regX:2.3,regY:-0.8,scaleX:0.4101,scaleY:0.739,skewX:90,skewY:-90,x:394.5}},{t:this.instance_11,p:{y:306.25,regX:3.1,regY:-0.2,scaleX:0.4101,scaleY:0.739,skewX:-90,skewY:90,x:187.85}},{t:this.instance_10,p:{y:100.55,regX:2.6,regY:-0.2,scaleX:0.4101,scaleY:0.739,rotation:-90,x:188.15,skewX:0,skewY:0}},{t:this.instance_9,p:{regX:2.5,regY:-0.6,scaleX:0.4101,scaleY:0.7371,rotation:0,x:-18.8,y:100.15,skewX:90,skewY:-90}},{t:this.instance_8,p:{regX:3.1,regY:-0.6,scaleX:0.4101,scaleY:0.7358,skewX:0,skewY:0,x:-18.95,y:305.8,rotation:90}},{t:this.instance_7,p:{regY:-0.1,scaleX:0.4101,scaleY:0.7327,skewX:0,skewY:0,x:601.3,y:100.2,regX:2.3,rotation:-90}},{t:this.instance_6,p:{regX:3,regY:-0.2,scaleX:0.4101,scaleY:0.7326,rotation:0,x:600.95,y:305.7,skewX:-90,skewY:90}}]},1).to({state:[{t:this.instance_13,p:{y:302.35,regX:3,regY:-0.7,scaleX:0.4101,scaleY:0.7389,rotation:90,x:394.05,skewX:0,skewY:0}},{t:this.instance_12,p:{y:96.4,regX:2.3,regY:-0.8,scaleX:0.4101,scaleY:0.739,skewX:90,skewY:-90,x:394.5}},{t:this.instance_11,p:{y:302.35,regX:3.1,regY:-0.2,scaleX:0.4101,scaleY:0.739,skewX:-90,skewY:90,x:187.85}},{t:this.instance_10,p:{y:96.65,regX:2.6,regY:-0.2,scaleX:0.4101,scaleY:0.739,rotation:-90,x:188.15,skewX:0,skewY:0}},{t:this.instance_9,p:{regX:2.5,regY:-0.6,scaleX:0.4101,scaleY:0.7371,rotation:0,x:-18.8,y:96.25,skewX:90,skewY:-90}},{t:this.instance_8,p:{regX:3.1,regY:-0.6,scaleX:0.4101,scaleY:0.7358,skewX:0,skewY:0,x:-18.95,y:301.9,rotation:90}},{t:this.instance_7,p:{regY:-0.1,scaleX:0.4101,scaleY:0.7327,skewX:0,skewY:0,x:601.3,y:96.3,regX:2.3,rotation:-90}},{t:this.instance_6,p:{regX:3,regY:-0.2,scaleX:0.4101,scaleY:0.7326,rotation:0,x:600.95,y:301.8,skewX:-90,skewY:90}}]},1).to({state:[{t:this.instance_13,p:{y:249.45,regX:3.4,regY:-0.6,scaleX:0.6274,scaleY:1.1302,rotation:63.0399,x:487.65,skewX:0,skewY:0}},{t:this.instance_12,p:{y:-31.6,regX:1.6,regY:-0.6,scaleX:0.6274,scaleY:1.1303,skewX:63.0375,skewY:-116.9595,x:345.2}},{t:this.instance_11,p:{y:392.9,regX:3.9,regY:-0.7,scaleX:0.6274,scaleY:1.1303,skewX:-116.9625,skewY:63.0405,x:206.25}},{t:this.instance_10,p:{y:112.05,regX:1.9,regY:-0.7,scaleX:0.6274,scaleY:1.1303,rotation:-116.9625,x:63.9,skewX:0,skewY:0}},{t:this.instance_9,p:{regX:2,regY:-0.8,scaleX:0.6274,scaleY:1.1275,rotation:0,x:-218.35,y:255.05,skewX:63.0368,skewY:-116.9577}},{t:this.instance_8,p:{regX:3.6,regY:-1.1,scaleX:0.6274,scaleY:1.1255,skewX:0,skewY:0,x:-75.7,y:535.55,rotation:63.0382}},{t:this.instance_7,p:{regY:-0.1,scaleX:0.6274,scaleY:1.1206,skewX:0,skewY:0,x:627.2,y:-175.25,regX:2.2,rotation:-116.9617}},{t:this.instance_6,p:{regX:3.8,regY:-0.1,scaleX:0.6274,scaleY:1.1205,rotation:0,x:769.5,y:105.25,skewX:-116.9607,skewY:63.0392}}]},151).to({state:[{t:this.instance_13,p:{y:400.85,regX:2.5,regY:-0.2,scaleX:0.8539,scaleY:1.2355,rotation:0,x:469.2,skewX:2.0631,skewY:3.5767}},{t:this.instance_12,p:{y:373.55,regX:2.7,regY:-0.2,scaleX:0.8539,scaleY:1.2357,skewX:2.0629,skewY:-176.4214,x:41.3}},{t:this.instance_11,p:{y:745.65,regX:2.9,regY:-0.8,scaleX:0.8539,scaleY:1.2357,skewX:-177.9371,skewY:3.5786,x:456.95}},{t:this.instance_10,p:{y:718.5,regX:2.8,regY:-1,scaleX:0.8538,scaleY:1.2357,rotation:0,x:29.6,skewX:-177.9371,skewY:-176.4218}},{t:this.instance_9,p:{regX:2.8,regY:-0.6,scaleX:0.8538,scaleY:1.2325,rotation:0,x:16.35,y:1064.05,skewX:2.0632,skewY:-176.4218}},{t:this.instance_8,p:{regX:2.9,regY:-0.7,scaleX:0.8539,scaleY:1.2304,skewX:2.0625,skewY:3.5786,x:443.65,y:1091,rotation:0}},{t:this.instance_7,p:{regY:-0.4,scaleX:0.8539,scaleY:1.2251,skewX:-177.9364,skewY:-176.4214,x:53.55,y:28,regX:2.9,rotation:0}},{t:this.instance_6,p:{regX:2.6,regY:-0.3,scaleX:0.8539,scaleY:1.225,rotation:0,x:480.6,y:55,skewX:-177.9347,skewY:3.5767}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.4,regY:-1.4,scaleX:1.1851,scaleY:0.7694,rotation:0,x:270.95,y:98.7}},{t:this.instance_14,p:{regX:-1.4,regY:-2.5,scaleX:1.1849,scaleY:0.7694,skewX:180,skewY:0,x:270.45,y:314.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-3,regY:-1.8,scaleX:1.4624,scaleY:1.761,rotation:-146.159,x:147.85,y:428.75}},{t:this.instance_14,p:{regX:-3.1,regY:-2,scaleX:1.4621,scaleY:1.761,skewX:33.841,skewY:-146.1607,x:422.95,y:19.65}}]},111).to({state:[{t:this.instance_19,p:{y:403.25,scaleY:0.9871,x:138.4}},{t:this.instance_18,p:{y:403.25,scaleY:0.9871,x:411.85,regY:-1}},{t:this.instance_17,p:{y:-4,scaleY:0.9871,x:411.65}},{t:this.instance_16,p:{y:-4,regY:-1,scaleY:0.9871,x:138.2}}]},1).to({state:[{t:this.instance_19,p:{y:415.75,scaleY:0.9871,x:138.4}},{t:this.instance_18,p:{y:415.75,scaleY:0.9871,x:411.85,regY:-1}},{t:this.instance_17,p:{y:8.5,scaleY:0.9871,x:411.65}},{t:this.instance_16,p:{y:8.5,regY:-1,scaleY:0.9871,x:138.2}}]},1).to({state:[{t:this.instance_19,p:{y:405.65,scaleY:0.9871,x:138.4}},{t:this.instance_18,p:{y:405.65,scaleY:0.9871,x:411.85,regY:-1}},{t:this.instance_17,p:{y:-1.6,scaleY:0.9871,x:411.65}},{t:this.instance_16,p:{y:-1.6,regY:-1,scaleY:0.9871,x:138.2}}]},1).to({state:[{t:this.instance_19,p:{y:408.25,scaleY:2.4479,x:-63.65}},{t:this.instance_18,p:{y:408.25,scaleY:2.4479,x:614.35,regY:-1}},{t:this.instance_17,p:{y:1,scaleY:2.4479,x:613.85}},{t:this.instance_16,p:{y:1,regY:-1.1,scaleY:2.4479,x:-64.4}}]},35).to({state:[{t:this.instance_19,p:{y:408.25,scaleY:2.683,x:-96.15}},{t:this.instance_18,p:{y:408.25,scaleY:2.683,x:646.95,regY:-1}},{t:this.instance_17,p:{y:1,scaleY:2.683,x:646.4}},{t:this.instance_16,p:{y:1,regY:-1.1,scaleY:2.683,x:-96.95}}]},1).to({state:[{t:this.instance_19,p:{y:408.25,scaleY:2.6277,x:-88.45}},{t:this.instance_18,p:{y:408.25,scaleY:2.6277,x:639.55,regY:-1.1}},{t:this.instance_17,p:{y:1,scaleY:2.6277,x:638.75}},{t:this.instance_16,p:{y:1,regY:-1.1,scaleY:2.6277,x:-89.25}}]},1).to({state:[]},1108).wait(1));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_5, startFrame:247, endFrame:247, x:-294, y:-211, w:589, h:422});
	this.filterCacheList.push({instance: this.instance_5, startFrame:248, endFrame:261, x:-294, y:-211, w:589, h:422});
	this.filterCacheList.push({instance: this.instance_5, startFrame:262, endFrame:403, x:-294, y:-211, w:589, h:422});
	this.filterCacheList.push({instance: this.instance_5, startFrame:556, endFrame:559, x:-294, y:-211, w:589, h:422});
	this.filterCacheList.push({instance: this.instance_5, startFrame:747, endFrame:786, x:-294, y:-211, w:589, h:422});
	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-197.3,-196.8,1219.9,1472.8999999999999);
// library properties:
lib.properties = {
	id: '70CB23A2DDADF547AEEDC97C3F006CD3',
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/frame_00_delay015s.png", id:"frame_00_delay015s"},
		{src:"images/frame_01_delay015s.png", id:"frame_01_delay015s"},
		{src:"images/frame_02_delay015s.png", id:"frame_02_delay015s"},
		{src:"images/frame_03_delay015s.png", id:"frame_03_delay015s"},
		{src:"images/frame_04_delay015s.png", id:"frame_04_delay015s"},
		{src:"images/frame_05_delay015s.png", id:"frame_05_delay015s"},
		{src:"images/frame_06_delay015s.png", id:"frame_06_delay015s"},
		{src:"images/frame_07_delay015s.png", id:"frame_07_delay015s"},
		{src:"images/frame_08_delay015s.png", id:"frame_08_delay015s"},
		{src:"images/frame_09_delay015s.png", id:"frame_09_delay015s"},
		{src:"images/loadinguibar.png", id:"loadinguibar"},
		{src:"images/loadinguibox.png", id:"loadinguibox"},
		{src:"images/play.png", id:"play"},
		{src:"images/smallbox.png", id:"smallbox"},
		{src:"sounds/sburban.mp3", id:"sburban"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['70CB23A2DDADF547AEEDC97C3F006CD3'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;