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
	this.instance = new lib.frame_09_delay015s();
	this.instance.setTransform(-248,-141);

	this.instance_1 = new lib.frame_00_delay015s();
	this.instance_1.setTransform(-248,-141);

	this.instance_2 = new lib.frame_01_delay015s();
	this.instance_2.setTransform(-248,-141);

	this.instance_3 = new lib.frame_02_delay015s();
	this.instance_3.setTransform(-248,-141);

	this.instance_4 = new lib.frame_03_delay015s();
	this.instance_4.setTransform(-248,-141);

	this.instance_5 = new lib.frame_04_delay015s();
	this.instance_5.setTransform(-248,-141);

	this.instance_6 = new lib.frame_05_delay015s();
	this.instance_6.setTransform(-248,-141);

	this.instance_7 = new lib.frame_06_delay015s();
	this.instance_7.setTransform(-248,-141);

	this.instance_8 = new lib.frame_07_delay015s();
	this.instance_8.setTransform(-248,-141);

	this.instance_9 = new lib.frame_08_delay015s();
	this.instance_9.setTransform(-248,-141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_3}]},4).to({state:[{t:this.instance_4}]},4).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_6}]},4).to({state:[{t:this.instance_7}]},4).to({state:[{t:this.instance_8}]},4).to({state:[{t:this.instance_9}]},4).to({state:[{t:this.instance}]},4).wait(2));

	// Layer_2
	this.instance_10 = new lib.frame_09_delay015s();
	this.instance_10.setTransform(-248,-141);

	this.instance_11 = new lib.frame_00_delay015s();
	this.instance_11.setTransform(-248,-141);

	this.instance_12 = new lib.frame_01_delay015s();
	this.instance_12.setTransform(-248,-141);

	this.instance_13 = new lib.frame_02_delay015s();
	this.instance_13.setTransform(-248,-141);

	this.instance_14 = new lib.frame_03_delay015s();
	this.instance_14.setTransform(-248,-141);

	this.instance_15 = new lib.frame_04_delay015s();
	this.instance_15.setTransform(-248,-141);

	this.instance_16 = new lib.frame_05_delay015s();
	this.instance_16.setTransform(-248,-141);

	this.instance_17 = new lib.frame_06_delay015s();
	this.instance_17.setTransform(-248,-141);

	this.instance_18 = new lib.frame_07_delay015s();
	this.instance_18.setTransform(-248,-141);

	this.instance_19 = new lib.frame_08_delay015s();
	this.instance_19.setTransform(-248,-141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10}]}).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},4).to({state:[{t:this.instance_13}]},4).to({state:[{t:this.instance_14}]},4).to({state:[{t:this.instance_15}]},4).to({state:[{t:this.instance_16}]},4).to({state:[{t:this.instance_17}]},4).to({state:[{t:this.instance_18}]},4).to({state:[{t:this.instance_19}]},4).to({state:[{t:this.instance_10}]},4).wait(3));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_20}]}).to({state:[{t:this.instance_21}]},4).to({state:[{t:this.instance_22}]},4).to({state:[{t:this.instance_23}]},4).to({state:[{t:this.instance_24}]},4).to({state:[{t:this.instance_25}]},4).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_27}]},4).to({state:[{t:this.instance_28}]},4).to({state:[{t:this.instance_29}]},4).wait(4));

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
	this.instance = new lib.frame_09_delay015s();
	this.instance.setTransform(-248,-141);

	this.instance_1 = new lib.frame_00_delay015s();
	this.instance_1.setTransform(-248,-141);

	this.instance_2 = new lib.frame_01_delay015s();
	this.instance_2.setTransform(-248,-141);

	this.instance_3 = new lib.frame_02_delay015s();
	this.instance_3.setTransform(-248,-141);

	this.instance_4 = new lib.frame_03_delay015s();
	this.instance_4.setTransform(-248,-141);

	this.instance_5 = new lib.frame_04_delay015s();
	this.instance_5.setTransform(-248,-141);

	this.instance_6 = new lib.frame_05_delay015s();
	this.instance_6.setTransform(-248,-141);

	this.instance_7 = new lib.frame_06_delay015s();
	this.instance_7.setTransform(-248,-141);

	this.instance_8 = new lib.frame_07_delay015s();
	this.instance_8.setTransform(-248,-141);

	this.instance_9 = new lib.frame_08_delay015s();
	this.instance_9.setTransform(-248,-141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_1}]},7).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_3}]},7).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_4}]},7).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},7).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_6}]},7).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_7}]},7).to({state:[{t:this.instance_8}]},2).to({state:[{t:this.instance_8}]},7).to({state:[{t:this.instance_9}]},2).to({state:[{t:this.instance_9}]},7).to({state:[{t:this.instance}]},2).wait(7));

	// Layer_2
	this.instance_10 = new lib.frame_09_delay015s();
	this.instance_10.setTransform(-248,-141);

	this.instance_11 = new lib.frame_00_delay015s();
	this.instance_11.setTransform(-248,-141);

	this.instance_12 = new lib.frame_01_delay015s();
	this.instance_12.setTransform(-248,-141);

	this.instance_13 = new lib.frame_02_delay015s();
	this.instance_13.setTransform(-248,-141);

	this.instance_14 = new lib.frame_03_delay015s();
	this.instance_14.setTransform(-248,-141);

	this.instance_15 = new lib.frame_04_delay015s();
	this.instance_15.setTransform(-248,-141);

	this.instance_16 = new lib.frame_05_delay015s();
	this.instance_16.setTransform(-248,-141);

	this.instance_17 = new lib.frame_06_delay015s();
	this.instance_17.setTransform(-248,-141);

	this.instance_18 = new lib.frame_07_delay015s();
	this.instance_18.setTransform(-248,-141);

	this.instance_19 = new lib.frame_08_delay015s();
	this.instance_19.setTransform(-248,-141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10}]}).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},8).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},8).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},8).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_14}]},8).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},8).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},8).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_17}]},8).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_18}]},8).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_19}]},8).to({state:[{t:this.instance_10}]},1).wait(8));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_20}]}).to({state:[{t:this.instance_21}]},9).to({state:[{t:this.instance_22}]},9).to({state:[{t:this.instance_23}]},9).to({state:[{t:this.instance_24}]},9).to({state:[{t:this.instance_25}]},9).to({state:[{t:this.instance_26}]},9).to({state:[{t:this.instance_27}]},9).to({state:[{t:this.instance_28}]},9).to({state:[{t:this.instance_29}]},9).wait(9));

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
	this.shape.graphics.f().s("#38F43D").ss(4,1,1).p("AxRqmQBsn8J9hbQJ7hcGuISQGuIRgfJDQgfJElKG6");
	this.shape.setTransform(110.6043,129.1509);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,225.2,262.3);


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
	this.shape.graphics.f().s("#38F43D").ss(4,1,1).p("AxRqmQBsn8J9hbQJ7hcGuISQGuIRgfJDQgfJElKG6");
	this.shape.setTransform(110.6043,129.1509);
	this.shape._off = true;

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#38F43D").ss(4,1,1).p("AyoncQArrdKFjKQKDjKJFO4QJEO2iEHIQiDHGltD5");
	this.shape_1.setTransform(119.2652,109.0491);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#38F43D").ss(4,1,1).p("A0DkTQgWu9KMk5QKNk5LZVeQLbVdjoFKQjoFKmQA3");
	this.shape_2.setTransform(128.3561,88.9085);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#38F43D").ss(4,1,1).p("Az2kcQgUuzKMk1QKLk0LMVQQLLVOjkFPQjkFPl9A6");
	this.shape_3.setTransform(127.1001,89.823);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#38F43D").ss(4,1,1).p("AzpkmQgSupKNkwQKKkwK8VBQK9VAjgFVQjhFVlpA8");
	this.shape_4.setTransform(125.8408,90.7653);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#38F43D").ss(4,1,1).p("AzdkvQgOugKMkrQKKkrKtUzQKtUxjcFaQjdFalVA/");
	this.shape_5.setTransform(124.5833,91.6743);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#38F43D").ss(4,1,1).p("AzQk4QgMuXKLkmQKKknKeUkQKeUjjZFgQjYFflCBC");
	this.shape_6.setTransform(123.3186,92.6074);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#38F43D").ss(4,1,1).p("AzElBQgJuOKLkhQKKkiKOUWQKPUUjVFlQjUFlkvBE");
	this.shape_7.setTransform(122.0573,93.5087);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#38F43D").ss(4,1,1).p("Ay3lLQgGuEKLkcQKJkeJ/UIQKAUGjRFqQjRFqkbBH");
	this.shape_8.setTransform(120.7958,94.4591);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#38F43D").ss(4,1,1).p("AyqlUQgEt6KLkYQKJkZJwT5QJwT3jNFwQjNFwkHBJ");
	this.shape_9.setTransform(119.5337,95.3668);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#38F43D").ss(4,1,1).p("AyeldQgBtxKLkTQKIkUJhTqQJhTpjJF2QjKF1jzBL");
	this.shape_10.setTransform(118.2688,96.2679);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#38F43D").ss(4,1,1).p("AyRlmQACtoKKkOQKIkQJRTcQJSTajFF7QjGF7jfBO");
	this.shape_11.setTransform(117.0047,97.2173);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#38F43D").ss(4,1,1).p("AyElvQAEteKKkKQKIkLJCTNQJCTMjBGBQjCF/jLBR");
	this.shape_12.setTransform(115.7406,98.1181);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#38F43D").ss(4,1,1).p("Ax4l5QAItUKJkGQKHkGIzS/QI0S+i+GFQi+GGi4BT");
	this.shape_13.setTransform(114.4705,99.0512);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#38F43D").ss(4,1,1).p("AxrmCQAKtLKJkBQKHkBIkSwQIkSvi6GMQi6GKilBW");
	this.shape_14.setTransform(113.2067,99.9584);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#38F43D").ss(4,1,1).p("AxemLQANtCKIj8QKHj9IVSiQIUShi2GQQi2GQiRBZ");
	this.shape_15.setTransform(111.943,100.9009);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#38F43D").ss(4,1,1).p("AxSmUQAQs4KIj4QKHj4IFSUQIFSSiyGWQiyGVh9Bb");
	this.shape_16.setTransform(110.6794,101.8086);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#38F43D").ss(4,1,1).p("AxFmdQASsvKIjzQKGjzH2SFQH2SDiuGcQiuGbhqBd");
	this.shape_17.setTransform(109.4144,102.7154);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#38F43D").ss(4,1,1).p("Aw5mnQAWslKHjuQKGjvHnR3QHmR1iqGgQiqGhhWBg");
	this.shape_18.setTransform(108.1511,103.6577);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#38F43D").ss(4,1,1).p("AwsmwQAYscKIjpQKFjqHYRoQHXRmimGnQinGlhCBj");
	this.shape_19.setTransform(106.888,104.5641);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#38F43D").ss(4,1,1).p("Awfm5QAbsSKGjlQKGjlHIRZQHIRYijGsQiiGrgvBl");
	this.shape_20.setTransform(105.6194,105.4962);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#38F43D").ss(4,1,1).p("AwTnCQAesJKGjgQKFjgG5RLQG5RJifGxQifGxgbBn");
	this.shape_21.setTransform(104.3568,106.396);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#38F43D").ss(4,1,1).p("AwGnLQAhsAKGjbQKEjcGqQ8QGqQ7ibG3QibG2gIBq");
	this.shape_22.setTransform(103.0943,107.3442);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#38F43D").ss(4,1,1).p("Av5nVQAjr2KGjWQKEjXGaQtQGbQtiXG8QiYG7ANBt");
	this.shape_23.setTransform(101.8304,108.2507);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#38F43D").ss(4,1,1).p("AvtndQAmrtKGjSQKEjSGLQfQGLQeiTHBQiUHBAgBv");
	this.shape_24.setTransform(100.5685,109.1493);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#38F43D").ss(4,1,1).p("AvgnnQAorjKGjNQKDjOF8QRQF8QPiPHHQiQHGA0By");
	this.shape_25.setTransform(99.3068,110.0978);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#38F43D").ss(4,1,1).p("AvTnwQArraKFjIQKDjJFtQCQFsQBiLHMQiMHMBIB0");
	this.shape_26.setTransform(98.0437,110.9968);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#38F43D").ss(4,1,1).p("AvHn5QAurRKFjDQKDjFFdP0QFePyiIHSQiIHRBbB3");
	this.shape_27.setTransform(96.7798,111.9268);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#38F43D").ss(4,1,1).p("Au6oCQAxrHKEi/QKDjAFOPlQFOPkiEHXQiEHXBuB5");
	this.shape_28.setTransform(95.5195,112.8322);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#38F43D").ss(4,1,1).p("AuuoMQA0q9KEi6QKCi8E/PXQE/PViAHdQiBHcCDB8");
	this.shape_29.setTransform(94.2577,113.7726);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#38F43D").ss(4,1,1).p("AuhoVQA3q0KDi1QKCi3EwPIQEvPHh8HiQh9HiCXB+");
	this.shape_30.setTransform(92.9944,114.678);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#38F43D").ss(4,1,1).p("Av2pdQBRpYKAiJQJ/iJFvLtQFuLshNITQhOIThaEc");
	this.shape_31.setTransform(101.5264,121.9158);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#38F43D").ss(4,1,1).p("AwDpMQBaptICiRQIAiRHSKoQHRKnAIImQAIImjXGl");
	this.shape_32.setTransform(102.8394,120.25);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#38F43D").ss(4,1,1).p("Au+nzQBIrdGHjGQGGjIH0M+QH1M9AwIJQAvIJhkGP");
	this.shape_33.setTransform(95.8828,111.2996);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#38F43D").ss(4,1,1).p("AvIoCQBLrKGbi+QGai+HvMlQHvMjApIOQApIOh4GT");
	this.shape_34.setTransform(96.9237,112.785);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#38F43D").ss(4,1,1).p("AvToRQBOq3Gvi1QGvi1HpMMQHqMLAiISQAiITiLGW");
	this.shape_35.setTransform(98.0351,114.2946);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#38F43D").ss(4,1,1).p("AvfogQBRqkHEisQHEisHjLyQHjLzAcIWQAcIYieGa");
	this.shape_36.setTransform(99.1858,115.7785);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#38F43D").ss(4,1,1).p("AvrovQBUqSHZijQHXijHeLaQHdLZAVIcQAWIdixGd");
	this.shape_37.setTransform(100.3664,117.2615);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#38F43D").ss(4,1,1).p("Av3o+QBXp/HtiaQHsiaHYLAQHXLBAPIgQAPIijEGh");
	this.shape_38.setTransform(101.5783,118.7606);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#38F43D").ss(4,1,1).p("AwQpbQBdpaIWiIQIViIHMKOQHLKOACIrQABIrjqGp");
	this.shape_39.setTransform(104.1005,121.7301);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#38F43D").ss(4,1,1).p("AwdpqQBhpHIqh/QIpiAHGJ2QHGJ1gFIwQgFIwj9Gs");
	this.shape_40.setTransform(105.3777,123.2263);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#38F43D").ss(4,1,1).p("Awqp5QBko1I/h2QI+h2G/JcQHAJdgMI0QgLI1kQGw");
	this.shape_41.setTransform(106.6644,124.7039);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#38F43D").ss(4,1,1).p("Aw3qIQBnoiJThtQJThtG5JDQG6JEgSI5QgSI6kjGz");
	this.shape_42.setTransform(107.9603,126.1799);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#38F43D").ss(4,1,1).p("AxEqXQBqoPJohkQJnhkG0IqQGzIqgYI/QgZI/k2G2");
	this.shape_43.setTransform(109.2902,127.679);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#38F43D").ss(4,1,1).p("AygmVQE1wEKGh0QKFh1FhNUQFgNSA7LqQA7Lqo/Ak");
	this.shape_44.setTransform(118.529,101.8687);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#38F43D").ss(4,1,1).p("Az3i5QH94LKQiPQKQiOESSWQETSVCVOQQCWOQs0ly");
	this.shape_45.setTransform(127.1516,79.8806);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#38F43D").ss(4,1,1).p("AzZi/QHr3rKLiRQKKiSEMSGQELSGCHOGQCHOFrwlh");
	this.shape_46.setTransform(124.6018,80.8116);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#38F43D").ss(4,1,1).p("Ay8jEQHa3LKGiVQKGiVEER3QEER2B4N8QB5N6qslR");
	this.shape_47.setTransform(122.0024,81.7118);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#38F43D").ss(4,1,1).p("AyejKQHI2qKBiYQKBiZD9RoQD8RnBqNwQBqNxpolB");
	this.shape_48.setTransform(119.4526,82.6377);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#38F43D").ss(4,1,1).p("AyBjPQG32KJ9icQJ7icD2RZQD1RXBcNmQBbNmokkw");
	this.shape_49.setTransform(116.8791,83.5384);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#38F43D").ss(4,1,1).p("AxjjWQGl1pJ3ifQJ3igDuRKQDuRIBNNcQBONbnhkg");
	this.shape_50.setTransform(114.3127,84.4772);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#38F43D").ss(4,1,1).p("AxGjcQGT1JJziiQJyijDnQ6QDmQ5A/NRQA/NRmdkP");
	this.shape_51.setTransform(111.7608,85.4135);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#38F43D").ss(4,1,1).p("AwojiQGC0oJuimQJsinDgQrQDfQqAwNHQAxNGlZj/");
	this.shape_52.setTransform(109.1739,86.3509);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#38F43D").ss(4,1,1).p("AwLjoQFw0IJpipQJoiqDYQcQDYQaAiM8QAiM8kVjv");
	this.shape_53.setTransform(106.6356,87.3165);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#38F43D").ss(4,1,1).p("AvujuQFfzoJkisQJjitDRQMQDQQLAUMxQAUMyjSjf");
	this.shape_54.setTransform(104.0828,88.2673);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#38F43D").ss(4,1,1).p("AvRj0QFNzHJgiwQJeixDJP9QDJP8AFMnQAFMmiNjN");
	this.shape_55.setTransform(101.5585,89.2358);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#38F43D").ss(4,1,1).p("Au1j6QE8ynJai0QJaizDCPtQDBPtgJMcQgJMchKi9");
	this.shape_56.setTransform(99.12,90.1874);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#38F43D").ss(4,1,1).p("AuZkAQEqyHJVi3QJVi3C6PeQC7PdgYMSQgYMSgGit");
	this.shape_57.setTransform(96.7868,91.1844);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#38F43D").ss(4,1,1).p("AuHkHQEYxmJRi7QJPi6CzPPQCzPOgmMHQgmMHA+ic");
	this.shape_58.setTransform(95.4,92.1854);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#38F43D").ss(4,1,1).p("AuGkNQEGxHJMi9QJMi+CrPAQCsO+g1L9Qg1L8CCiM");
	this.shape_59.setTransform(95.6,93.1895);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#38F43D").ss(4,1,1).p("AuEkVQD1wlJHjBQJFjCClOxQCkOvhDLyQhDLyDGh7");
	this.shape_60.setTransform(95.85,94.224);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#38F43D").ss(4,1,1).p("AuDkcQDjwFJCjEQJBjFCeOhQCdOghSLoQhRLnEJhr");
	this.shape_61.setTransform(96.05,95.2564);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#38F43D").ss(4,1,1).p("AuBkjQDRvlI+jHQI8jJCWOSQCVORhfLdQhhLdFNhb");
	this.shape_62.setTransform(96.275,96.3191);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#38F43D").ss(4,1,1).p("AuAkqQDAvFI5jLQI3jMCOODQCPOChvLSQhuLSGRhK");
	this.shape_63.setTransform(96.525,97.4075);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#38F43D").ss(4,1,1).p("At+kxQCuulI0jOQIyjPCHNzQCHNzh8LIQh9LHHUg6");
	this.shape_64.setTransform(96.725,98.4789);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#38F43D").ss(4,1,1).p("At9k5QCduEIvjSQItjTCANlQCANjiMK9QiLK9IZgp");
	this.shape_65.setTransform(96.975,99.6101);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#38F43D").ss(4,1,1).p("At7lBQCLtjIqjWQIpjWB4NVQB4NUiZKzQiaKyJcgZ");
	this.shape_66.setTransform(97.175,100.7477);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#38F43D").ss(4,1,1).p("At6lJQB6tEIljYQIkjZBxNFQBxNEioKpQioKoKggJ");
	this.shape_67.setTransform(97.4,101.9475);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#38F43D").ss(4,1,1).p("At4lSQBosjIgjcQIfjcBqM2QBpM1i2KeQi3KdLkAI");
	this.shape_68.setTransform(97.625,103.1431);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#38F43D").ss(4,1,1).p("At3lbQBXsCIcjgQIajgBiMnQBiMmjFKTQjFKTMoAY");
	this.shape_69.setTransform(97.85,104.3666);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#38F43D").ss(4,1,1).p("At1lkQBFriIWjiQIVjkBbMYQBbMWjTKJQjUKINsAp");
	this.shape_70.setTransform(98.075,105.5854);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#38F43D").ss(4,1,1).p("At0lsQA0rCISjmQIPjnBUMJQBUMHjiJ+QjhJ+OvA5");
	this.shape_71.setTransform(98.3,106.762);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#38F43D").ss(4,1,1).p("Atyl1QAiqhINjqQILjqBML5QBML4jwJ0QjvJzPyBK");
	this.shape_72.setTransform(98.525,107.9734);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#38F43D").ss(4,1,1).p("Atxl9QARqBIHjtQIHjuBFLqQBFLqj/JoQj+JoQ3Ba");
	this.shape_73.setTransform(98.75,109.1574);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#38F43D").ss(4,1,1).p("AtvmGQgBpgIDjxQIBjwA+LaQA9LakNJeQkMJeR6Bq");
	this.shape_74.setTransform(98.9748,110.3574);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#38F43D").ss(4,1,1).p("AtwmLQABpeIFjuQIEjuBELWQBELXkJJdQkIJeRgBw");
	this.shape_75.setTransform(98.85,110.6886);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#38F43D").ss(4,1,1).p("AtxmQQADpdIHjrQIGjsBLLUQBKLTkEJdQkEJdRGB2");
	this.shape_76.setTransform(98.75,111.0477);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#38F43D").ss(4,1,1).p("AtxmVQAEpbIKjpQIIjpBRLQQBRLQkAJcQkAJcQrB9");
	this.shape_77.setTransform(98.625,111.3767);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#38F43D").ss(4,1,1).p("AtymaQAGpaIMjmQIKjmBYLMQBYLMj8JcQj7JcQQCD");
	this.shape_78.setTransform(98.5,111.729);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#38F43D").ss(4,1,1).p("AtzmgQAJpXIOjjQIMjkBeLIQBfLJj4JbQj3JcP2CI");
	this.shape_79.setTransform(98.375,112.0614);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#38F43D").ss(4,1,1).p("At0mlQALpWIQjgQIOjhBlLFQBlLFjzJaQjzJcPcCO");
	this.shape_80.setTransform(98.275,112.4149);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#38F43D").ss(4,1,1).p("At0mqQAMpUISjeQIRjeBrLCQBsLBjvJaQjvJbPBCU");
	this.shape_81.setTransform(98.175,112.7432);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#38F43D").ss(4,1,1).p("At1mvQAOpSIUjbQIUjcBxK+QBzK9jsJaQjqJbOnCa");
	this.shape_82.setTransform(98.05,113.0753);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#38F43D").ss(4,1,1).p("At2m0QAQpRIWjYQIWjZB5K6QB4K6jnJZQjmJaONCh");
	this.shape_83.setTransform(97.95,113.4282);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#38F43D").ss(4,1,1).p("At3m6QASpOIZjWQIXjWCAK2QB/K3jjJZQjjJZN0Cm");
	this.shape_84.setTransform(97.825,113.7546);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#38F43D").ss(4,1,1).p("At4m/QAUpNIbjTQIajUCFKzQCGKzjeJZQjfJZNaCs");
	this.shape_85.setTransform(97.7,114.1114);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#38F43D").ss(4,1,1).p("At4nEQAWpLIdjQQIbjRCNKvQCMKwjaJYQjaJYM+Cy");
	this.shape_86.setTransform(97.575,114.4388);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("#38F43D").ss(4,1,1).p("At5nJQAYpJIfjOQIejOCTKsQCTKrjWJYQjWJYMkC4");
	this.shape_87.setTransform(97.475,114.791);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#38F43D").ss(4,1,1).p("At6nOQAapIIijLQIgjLCZKoQCaKojSJXQjSJXMKC/");
	this.shape_88.setTransform(97.35,115.1314);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f().s("#38F43D").ss(4,1,1).p("At7nTQAcpGIkjIQIijJCgKkQCgKljNJXQjOJXLwDE");
	this.shape_89.setTransform(97.225,115.448);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#38F43D").ss(4,1,1).p("At8nYQAepEImjGQIkjGCnKhQCnKhjJJWQjKJWLWDL");
	this.shape_90.setTransform(97.125,115.7995);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#38F43D").ss(4,1,1).p("At9neQAgpCIojDQInjDCuKdQCtKdjFJWQjFJWK7DQ");
	this.shape_91.setTransform(97,116.1407);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#38F43D").ss(4,1,1).p("At9njQAipAIqjBQIpjBCzKaQC0KajAJVQjBJWKgDW");
	this.shape_92.setTransform(96.875,116.4818);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#38F43D").ss(4,1,1).p("At+noQAko/Isi+QIri+C6KWQC7KXi8JUQi9JVKGDd");
	this.shape_93.setTransform(96.75,116.8065);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#38F43D").ss(4,1,1).p("At/ntQAmo9Iui7QIti8DCKTQDAKSi4JUQi4JVJsDj");
	this.shape_94.setTransform(96.65,117.1722);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("#38F43D").ss(4,1,1).p("At/nyQAno7Ixi5QIvi5DIKQQDHKOizJUQi1JUJRDp");
	this.shape_95.setTransform(96.55,117.489);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#38F43D").ss(4,1,1).p("AuAn4QApo5Izi2QIxi2DPKMQDOKLiwJTQiwJUI3Du");
	this.shape_96.setTransform(96.425,117.813);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#38F43D").ss(4,1,1).p("AuBn9QAro3I1izQI0i0DVKIQDUKIirJTQisJTIdD0");
	this.shape_97.setTransform(96.325,118.1782);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#38F43D").ss(4,1,1).p("AuCoCQAto1I3ixQI3ixDbKFQDbKEinJSQinJTICD6");
	this.shape_98.setTransform(96.2,118.4932);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#38F43D").ss(4,1,1).p("AuDoHQAwo0I5iuQI4iuDiKBQDiKBijJRQijJTHoEA");
	this.shape_99.setTransform(96.075,118.8414);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#38F43D").ss(4,1,1).p("AuEoMQAyoyI7irQI6isDpJ9QDoJ9ieJSQifJSHOEG");
	this.shape_100.setTransform(95.95,119.1811);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#38F43D").ss(4,1,1).p("AuEoRQAzoxI+ioQI8ipDvJ6QDvJ5iaJRQibJRG0EN");
	this.shape_101.setTransform(95.85,119.5216);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#38F43D").ss(4,1,1).p("AuFoXQA1ouJAimQI/imD1J2QD2J2iWJQQiWJRGYES");
	this.shape_102.setTransform(95.725,119.8598);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("#38F43D").ss(4,1,1).p("AuGocQA3osJCijQJBikD9JyQD7JziSJQQiRJQF+EY");
	this.shape_103.setTransform(95.6,120.182);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#38F43D").ss(4,1,1).p("AuHohQA5orJEigQJDihEEJvQECJuiOJQQiNJQFkEe");
	this.shape_104.setTransform(95.5,120.5219);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f().s("#38F43D").ss(4,1,1).p("AuIomQA8opJGieQJFieEKJrQEJJriJJPQiKJQFKEk");
	this.shape_105.setTransform(95.375,120.8605);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f().s("#38F43D").ss(4,1,1).p("AuJorQA+ooJIibQJIibEQJnQEQJoiFJOQiFJPEvEr");
	this.shape_106.setTransform(95.25,121.2069);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("#38F43D").ss(4,1,1).p("AuJowQA/omJLiYQJJiZEXJkQEWJkiBJOQiAJPEUEw");
	this.shape_107.setTransform(95.125,121.52);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#38F43D").ss(4,1,1).p("AuKo1QBBokJNiWQJMiWEdJgQEdJgh9JOQh8JOD6E3");
	this.shape_108.setTransform(95.025,121.8829);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f().s("#38F43D").ss(4,1,1).p("AuLo7QBDoiJPiTQJOiTEkJdQEjJch4JNQh4JODgE8");
	this.shape_109.setTransform(94.925,122.2044);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f().s("#38F43D").ss(4,1,1).p("AuMpAQBFogJSiQQJPiRErJZQEqJZh0JNQh0JNDGFC");
	this.shape_110.setTransform(94.8,122.5168);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f().s("#38F43D").ss(4,1,1).p("AuNpFQBHoeJUiOQJSiOExJWQEwJVhvJMQhwJNCsFI");
	this.shape_111.setTransform(94.7,122.8789);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().s("#38F43D").ss(4,1,1).p("AuNpKQBJocJViLQJUiME4JSQE3JShrJMQhsJMCRFO");
	this.shape_112.setTransform(94.575,123.1985);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f().s("#38F43D").ss(4,1,1).p("AuTpPQBLobJYiIQJWiJE+JOQE+JPhnJLQhnJMB2FU");
	this.shape_113.setTransform(94.9457,123.535);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f().s("#38F43D").ss(4,1,1).p("AuepUQBNoZJaiGQJZiGFEJLQFFJKhjJLQhjJMBcFa");
	this.shape_114.setTransform(95.8321,123.8713);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f().s("#38F43D").ss(4,1,1).p("AuppZQBPoYJciDQJbiDFLJHQFLJHheJKQhfJLBCFh");
	this.shape_115.setTransform(96.7244,124.2158);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("#38F43D").ss(4,1,1).p("Au0peQBRoWJeiAQJdiBFSJEQFSJDhbJKQhaJLAnFm");
	this.shape_116.setTransform(97.6068,124.5339);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f().s("#38F43D").ss(4,1,1).p("Au+pkQBToTJgh+QJfh+FZJAQFYJAhXJJQhWJKANFs");
	this.shape_117.setTransform(98.494,124.8611);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().s("#38F43D").ss(4,1,1).p("AvKppQBVoSJjh7QJhh7FfI8QFfI8hSJJQhSJKgNFy");
	this.shape_118.setTransform(99.4023,125.2043);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f().s("#38F43D").ss(4,1,1).p("AvVpuQBXoQJlh4QJjh5FmI5QFlI5hNJIQhOJJgoF4");
	this.shape_119.setTransform(100.3162,125.522);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f().s("#38F43D").ss(4,1,1).p("AvgpzQBZoOJnh2QJmh2FsI1QFsI1hKJIQhJJJhCF+");
	this.shape_120.setTransform(101.2174,125.8735);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f().s("#38F43D").ss(4,1,1).p("Avrp4QBboMJphzQJoh0FzIyQFyIxhFJIQhFJIhdGE");
	this.shape_121.setTransform(102.1239,126.1898);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f().s("#38F43D").ss(4,1,1).p("Av2p9QBdoLJrhwQJqhxF5IuQF5IuhBJHQhBJIh2GK");
	this.shape_122.setTransform(103.0529,126.5312);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f().s("#38F43D").ss(4,1,1).p("AwBqCQBeoJJuhuQJshuGAIrQF/Iqg8JGQg9JIiRGQ");
	this.shape_123.setTransform(104.0122,126.8576);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f().s("#38F43D").ss(4,1,1).p("AwMqHQBgoHJwhrQJuhsGHInQGGIng5JGQg4JHisGW");
	this.shape_124.setTransform(104.9325,127.1725);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f().s("#38F43D").ss(4,1,1).p("AwYqMQBjoGJxhoQJxhpGNIkQGNIig0JGQg1JHjFGc");
	this.shape_125.setTransform(105.8765,127.5126);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f().s("#38F43D").ss(4,1,1).p("AwjqRQBkoEJ0hlQJzhnGUIgQGTIggwJFQgwJGjgGi");
	this.shape_126.setTransform(106.8054,127.8375);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f().s("#38F43D").ss(4,1,1).p("AwuqWQBmoCJ2hjQJ1hkGaIcQGaIcgsJFQgrJGj7Go");
	this.shape_127.setTransform(107.7382,128.1759);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f().s("#38F43D").ss(4,1,1).p("Aw6qbQBpoAJ4hhQJ3hgGhIYQGgIYgnJFQgoJFkVGu");
	this.shape_128.setTransform(108.6961,128.4894);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f().s("#38F43D").ss(4,1,1).p("AxGqgQBrn/J6hdQJ5hfGoIWQGnIUgjJEQgkJFkvG0");
	this.shape_129.setTransform(109.6587,128.839);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f().s("#38F43D").ss(4,1,1).p("AvEn9QBqoXHQk+QHOk+G1LZQG0LaAUJkQAVJmhhHH");
	this.shape_130.setTransform(96.4788,112.3231);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f().s("#38F43D").ss(4,1,1).p("AuclKQBnoyEjohQEiogG6OhQG7OiBIKGQBIKHCIHU");
	this.shape_131.setTransform(92.475,94.4001);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#38F43D").ss(4,1,1).p("AuMlhQBnotEeoBQEeoBHhOHQHiOGA5KAQA5KBBBHM");
	this.shape_132.setTransform(90.9,96.6925);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f().s("#38F43D").ss(4,1,1).p("At8l4QBnopEanhQEZnhIJNrQIINrAqJ7QApJ7gFHF");
	this.shape_133.setTransform(89.3272,98.994);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#38F43D").ss(4,1,1).p("AuImPQBookEVnBQEVnCIvNQQIwNQAaJ1QAaJ1hMG9");
	this.shape_134.setTransform(90.5469,101.2639);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f().s("#38F43D").ss(4,1,1).p("AuhmlQBpogEQmiQERmhJWM1QJWM0AMJvQAKJwiSG0");
	this.shape_135.setTransform(92.9572,103.513);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#38F43D").ss(4,1,1).p("Au7m8QBpobEMmCQELmCJ+MaQJ9MZgEJqQgFJqjYGs");
	this.shape_136.setTransform(95.6262,105.7839);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f().s("#38F43D").ss(4,1,1).p("AvXnSQBqoXEHliQEHliKlL+QKkL+gTJkQgUJlkfGk");
	this.shape_137.setTransform(98.3523,108.0305);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#38F43D").ss(4,1,1).p("AvynoQBqoTEDlCQEClCLLLjQLMLjgjJeQgjJfllGc");
	this.shape_138.setTransform(101.1066,110.2389);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f().s("#38F43D").ss(4,1,1).p("AwOn/QBroOD+kiQD+kiLyLHQLzLIgyJYQgzJZmsGV");
	this.shape_139.setTransform(103.8833,112.4639);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#38F43D").ss(4,1,1).p("AwqoUQBroKD6kCQD5kDMaKtQMaKshCJTQhCJTnyGM");
	this.shape_140.setTransform(106.6996,114.6319);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f().s("#38F43D").ss(4,1,1).p("AxGoqQBroFD1jiQD1jjNAKRQNBKRhQJNQhSJOo4GE");
	this.shape_141.setTransform(109.5047,116.7871);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#38F43D").ss(4,1,1).p("Axio/QBsoBDwjDQDwjCNoJ1QNoJ2hgJHQhhJJp/F8");
	this.shape_142.setTransform(112.326,118.9295);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f().s("#38F43D").ss(4,1,1).p("Ax+pUQBsn9DsiiQDrijOPJaQOPJahwJCQhwJDrFF0");
	this.shape_143.setTransform(115.1499,121.0091);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#38F43D").ss(4,1,1).p("AykkBQA8sxJAo6QI/o7JaXUQJZXUgoJwQgpJvj+lE");
	this.shape_144.setTransform(118.8528,87.1036);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f().s("#38F43D").ss(4,1,1).p("Az2g5QALxlIEwbUAIEgQaAMEAmYUAMFAmXgAyAKbQgzKbiyxC");
	this.shape_145.setTransform(127.0782,67.1312);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#38F43D").ss(4,1,1).p("AzuhJQAQxIIKvsUAIJgPtAL0Ak8UAL0Ak7gAxAKXQgxKXi6v5");
	this.shape_146.setTransform(126.299,68.7158);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f().s("#38F43D").ss(4,1,1).p("AzmhZQAVwrIPu+UAIPgO/ALjAjgUALlAjfgAxAKTQgwKTjBuw");
	this.shape_147.setTransform(125.4991,70.3367);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#38F43D").ss(4,1,1).p("AzehqQAZwNIVuRUAIVgORALTAiFUALUAiDgAwAKPQgvKPjIto");
	this.shape_148.setTransform(124.7212,71.9897);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f().s("#38F43D").ss(4,1,1).p("AzWh7QAdvwIbtjUAIbgNkALCAgpUALEAgogAuAKLQgvKKjPsf");
	this.shape_149.setTransform(123.9433,73.7069);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#38F43D").ss(4,1,1).p("AzPiNQAivSIhs2QIgs2KzfOQKzfLgtKHQguKGjXrV");
	this.shape_150.setTransform(123.1655,75.4815);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f().s("#38F43D").ss(4,1,1).p("AzHifQAnu1InsIQImsJKidyQKidwgsKDQgtKCjeqN");
	this.shape_151.setTransform(122.3627,77.3291);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#38F43D").ss(4,1,1).p("Ay/izQAsuXIsrbQIsraKRcVQKTcVgsJ+QgsJ+jlpD");
	this.shape_152.setTransform(121.5848,79.2784);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().s("#38F43D").ss(4,1,1).p("Ay3jHQAwt6IyqtQIxqtKCa6QKCa4grJ7QgrJ6jsn7");
	this.shape_153.setTransform(120.8069,81.3171);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#38F43D").ss(4,1,1).p("AyvjdQA1tdI3p/QI4p/JxZeQJxZdgqJ2QgqJ2jzmy");
	this.shape_154.setTransform(120.0071,83.4934);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().s("#38F43D").ss(4,1,1).p("Aynj0QA5tAI+pRQI8pSJhYDQJiYBgpJyQgpJyj7lp");
	this.shape_155.setTransform(119.2292,85.841);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("#38F43D").ss(4,1,1).p("AygkOQA+siJDojQJColJSWnQJRWmgoJuQgpJtkBkg");
	this.shape_156.setTransform(118.4514,88.3858);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f().s("#38F43D").ss(4,1,1).p("AyYkqQBDsEJJn2QJHn3JBVLQJBVKgnJqQgnJpkJjX");
	this.shape_157.setTransform(117.6735,91.1948);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().s("#38F43D").ss(4,1,1).p("AyQlJQBIroJOnIQJOnJIwTwQIxTugnJlQgmJlkQiN");
	this.shape_158.setTransform(116.8737,94.3324);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f().s("#38F43D").ss(4,1,1).p("AyIltQBMrKJVmbQJTmbIgSUQIgSSglJhQgmJhkXhF");
	this.shape_159.setTransform(116.0959,97.9043);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f().s("#38F43D").ss(4,1,1).p("AyAmXQBQqtJaltQJZltIQQ4QIQQ2gkJdQglJdkeAE");
	this.shape_160.setTransform(115.318,102.1291);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f().s("#38F43D").ss(4,1,1).p("Ax4nFQBVqPJgk/QJflAH/PcQH/PbgjJZQgkJZklBN");
	this.shape_161.setTransform(114.5153,106.6856);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f().s("#38F43D").ss(4,1,1).p("AxwnyQBapyJlkSQJlkSHvOAQHvN/gjJVQgiJVktCW");
	this.shape_162.setTransform(113.7375,111.2327);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f().s("#38F43D").ss(4,1,1).p("AxpogQBfpUJrjkQJqjlHfMlQHfMjgiJRQgiJQk0Dg");
	this.shape_163.setTransform(112.9596,115.7728);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f().s("#38F43D").ss(4,1,1).p("AxhpNQBjo3Jxi2QJwi3HPLJQHOLIggJMQghJMk7Eo");
	this.shape_164.setTransform(112.1818,120.2562);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f().s("#38F43D").ss(4,1,1).p("AxZp5QBooaJ3iJQJ2iJG+JtQG+JtggJIQggJIlCFx");
	this.shape_165.setTransform(111.3821,124.7369);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().s("#38F43D").ss(4,1,1).p("AtFirQnWpwKxnVQKwnVIpVBQIpVAjKDkQjLDjl2gc");
	this.shape_166.setTransform(140.7591,73.0159);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().s("#38F43D").ss(4,1,1).p("AnRAbQwYriLltPUALkgNPAKkAhxUAKlAhwgF2gB9Ql2h+mjny");
	this.shape_167.setTransform(160.5685,47.6201);
	this.shape_167._off = true;

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f().s("#38F43D").ss(4,1,1).p("AnbAXQwHraLrtBUALqgNCAKWAhTUAKWAhRgFygB1Qlzh2mhnY");
	this.shape_168.setTransform(160.2554,48.0102);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().s("#38F43D").ss(4,1,1).p("AnmAUQv1rSLxs0UALwgM0AKIAg0UAKIAgzgFvgBtQlwhumem/");
	this.shape_169.setTransform(159.909,48.3826);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f().s("#38F43D").ss(4,1,1).p("AnwARQvkrLL4smUAL2gMnAJ6AgWUAJ5AgUgFsgBlQlthmmbml");
	this.shape_170.setTransform(159.5768,48.7519);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().s("#38F43D").ss(4,1,1).p("An6AOQvTrDL+sZQL9sZJrf3QJrf2lphdQlphemYmL");
	this.shape_171.setTransform(159.2201,49.1132);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f().s("#38F43D").ss(4,1,1).p("AoEALQvBq8MEsLQMCsMJdfZQJdfXlmhVQlmhVmVly");
	this.shape_172.setTransform(158.8726,49.5005);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f().s("#38F43D").ss(4,1,1).p("AoPAIQuvq0MKr+QMJr+JPe6QJOe5ljhNQljhNmSlZ");
	this.shape_173.setTransform(158.5175,49.8656);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f().s("#38F43D").ss(4,1,1).p("AoYAFQueqsMQrxQMPrxJAecQJAealfhEQlghFmQk/");
	this.shape_174.setTransform(158.1454,50.2432);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f().s("#38F43D").ss(4,1,1).p("AoiABQuNqkMXrjQMVrjIyd9QIxd8lcg9Qldg9mNkl");
	this.shape_175.setTransform(157.7833,50.6367);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f().s("#38F43D").ss(4,1,1).p("AosgBQt7qeMdrVQMbrWIkdeQIjdelag1QlZg1mKkL");
	this.shape_176.setTransform(157.397,51.0085);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f().s("#38F43D").ss(4,1,1).p("Ao2gEQtqqWMjrIQMirJIVdAQIVc/lXgsQlWgtmHjy");
	this.shape_177.setTransform(157.0186,51.3936);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f().s("#38F43D").ss(4,1,1).p("ApAgHQtYqPMpq6QMoq7IHchQIGcglTgkQlTgkmEjZ");
	this.shape_178.setTransform(156.629,51.7826);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f().s("#38F43D").ss(4,1,1).p("ApKgLQtGqGMvquQMuqtH5cDQH3cClPgcQlRgdmBi/");
	this.shape_179.setTransform(156.229,52.1744);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f().s("#38F43D").ss(4,1,1).p("ApUgOQs0p/M1qgQM0qgHqbkQHqbklNgUQlNgUl+im");
	this.shape_180.setTransform(155.8248,52.5573);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f().s("#38F43D").ss(4,1,1).p("ApdgSQskp3M8qSQM7qTHbbGQHbbFlJgMQlKgMl8iM");
	this.shape_181.setTransform(155.4118,52.9667);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f().s("#38F43D").ss(4,1,1).p("ApngVQsSpwNCqFQNBqFHNaoQHNamlHgDQlHgFl4hy");
	this.shape_182.setTransform(155.0006,53.3681);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f().s("#38F43D").ss(4,1,1).p("ApwgZQsApnNIp4QNGp4G/aJQG/aIlEAFQlDAEl2hZ");
	this.shape_183.setTransform(154.5803,53.7694);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f().s("#38F43D").ss(4,1,1).p("Ap5gdQrvpgNOpqQNNpqGxZqQGwZplBANQlAAMlzg/");
	this.shape_184.setTransform(154.1477,54.2732);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f().s("#38F43D").ss(4,1,1).p("AqDgjQrdpYNUpdQNTpdGiZMQGiZLk9AVQk9AUlwgl");
	this.shape_185.setTransform(153.7049,54.9323);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f().s("#38F43D").ss(4,1,1).p("AqMgtQrMpRNbpPQNZpPGUYuQGTYsk6AdQk6AcltgM");
	this.shape_186.setTransform(153.2587,55.9891);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f().s("#38F43D").ss(4,1,1).p("AqWhAQq6pJNhpBQNgpCGFYPQGFYNk3AlQk3AllqAO");
	this.shape_187.setTransform(152.8108,57.904);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f().s("#38F43D").ss(4,1,1).p("AqfhUQqopBNno0QNlo1F3XxQF3Xvk0AtQk0AtlnAn");
	this.shape_188.setTransform(152.3587,59.9833);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f().s("#38F43D").ss(4,1,1).p("AqnhoQqYo6NuonQNsomFoXSQFoXQkwA2QkxA0llBB");
	this.shape_189.setTransform(151.8927,62.0741);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f().s("#38F43D").ss(4,1,1).p("Aqxh9QqFoyNzoZQNyoZFaWzQFaWyktA+QkuA9liBa");
	this.shape_190.setTransform(151.4189,64.1665);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f().s("#38F43D").ss(4,1,1).p("Aq5iRQp1oqN6oMQN5oMFLWVQFMWUkrBGQkqBFlfB0");
	this.shape_191.setTransform(150.94,66.2454);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f().s("#38F43D").ss(4,1,1).p("ArDilQpiojOAn+QN+n+E+V2QE8V1kmBOQkoBNlcCO");
	this.shape_192.setTransform(150.4523,68.3492);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f().s("#38F43D").ss(4,1,1).p("ArLi5QpRobOGnxQOEnxEvVYQEvVWkkBWQkkBWlZCn");
	this.shape_193.setTransform(149.9667,70.4278);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f().s("#38F43D").ss(4,1,1).p("ArUjOQpAoTONnjQOLnkEgU5QEgU4kgBeQkhBelXDB");
	this.shape_194.setTransform(149.4597,72.5197);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f().s("#38F43D").ss(4,1,1).p("ArdjiQouoMOTnWQORnWESUbQESUakeBmQkeBllTDb");
	this.shape_195.setTransform(148.9681,74.6095);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f().s("#38F43D").ss(4,1,1).p("Arlj2QodoEOZnJQOXnIEET8QEDT7kaBvQkbBtlRD0");
	this.shape_196.setTransform(148.4526,76.6875);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f().s("#38F43D").ss(4,1,1).p("ArukLQoLn8Ofm7QOem7D1TeQD1TckXB3QkYB2lOEN");
	this.shape_197.setTransform(147.9401,78.779);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f().s("#38F43D").ss(4,1,1).p("Ar2kfQn6n1OlmtQOkmuDnTAQDnS+kVB+QkUB+lLEn");
	this.shape_198.setTransform(147.4254,80.868);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f().s("#38F43D").ss(4,1,1).p("Ar/kzQnontOsmgQOqmhDYShQDYSgkQCGQkSCHlIFA");
	this.shape_199.setTransform(146.8841,82.9591);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f().s("#38F43D").ss(4,1,1).p("AsHlHQnXnmOymSQOwmTDKSCQDKSBkOCPQkOCOlFFb");
	this.shape_200.setTransform(146.3685,85.0362);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f().s("#38F43D").ss(4,1,1).p("AsQlcQnFndO4mFQO3mGC7RkQC8RjkLCWQkLCXlCF0");
	this.shape_201.setTransform(145.819,87.1381);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f().s("#38F43D").ss(4,1,1).p("AsYlwQmznWO9l4QO9l3CtRFQCuREkICfQkICek/GO");
	this.shape_202.setTransform(145.2921,89.2123);
	this.shape_202._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},4).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_184}]},1).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_187}]},1).to({state:[{t:this.shape_188}]},1).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_190}]},1).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_193}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_198}]},1).to({state:[{t:this.shape_199}]},1).to({state:[{t:this.shape_200}]},1).to({state:[{t:this.shape_201}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4).to({_off:false},0).to({_off:true},1).wait(31).to({_off:false},0).to({_off:true},1).wait(13).to({_off:false},0).wait(1).to({_off:true},1).wait(86).to({_off:false},0).to({_off:true},1).wait(14).to({_off:false},0).to({_off:true},1).wait(22).to({_off:false},0).wait(2).to({_off:true},1).wait(61));
	this.timeline.addTween(cjs.Tween.get(this.shape_167).wait(180).to({_off:false},0).wait(1).to({x:160.5762,y:47.6444},0).wait(8).to({x:160.5685,y:47.6201},0).to({_off:true},1).wait(50));
	this.timeline.addTween(cjs.Tween.get(this.shape_202).wait(224).to({_off:false},0).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.1,-189.6,272.70000000000005,513.6);


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
	props.labels = {start:20};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,19,20,21,58,95,133,173,209,246,284,304,324,364,404,439,459,479,519,559,598,609,632,672,711,754,1785];
	this.streamSoundSymbolsList[20] = [{id:"sburban",startFrame:20,endFrame:1784,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var _this = this;
		
		_this.playbutton.on('click', function(){
		
		_this.gotoAndPlay('start');
		});
	}
	this.frame_19 = function() {
		this.gotoAndPlay(0);
	}
	this.frame_20 = function() {
		var soundInstance = playSound("sburban",0);
		this.InsertIntoSoundStreamData(soundInstance,20,1784,1);
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
		_this.skiport2.inner.gotoAndPlay('pian2');
	}
	this.frame_598 = function() {
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
	this.frame_711 = function() {
		this.skiport.inner.gotoAndPlay('pian1');
	}
	this.frame_754 = function() {
		this.skiport.inner.gotoAndPlay('drumhit');
	}
	this.frame_1785 = function() {
		createjs.Sound.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(1).call(this.frame_20).wait(1).call(this.frame_21).wait(37).call(this.frame_58).wait(37).call(this.frame_95).wait(38).call(this.frame_133).wait(40).call(this.frame_173).wait(36).call(this.frame_209).wait(37).call(this.frame_246).wait(38).call(this.frame_284).wait(20).call(this.frame_304).wait(20).call(this.frame_324).wait(40).call(this.frame_364).wait(40).call(this.frame_404).wait(35).call(this.frame_439).wait(20).call(this.frame_459).wait(20).call(this.frame_479).wait(40).call(this.frame_519).wait(40).call(this.frame_559).wait(39).call(this.frame_598).wait(11).call(this.frame_609).wait(23).call(this.frame_632).wait(40).call(this.frame_672).wait(39).call(this.frame_711).wait(43).call(this.frame_754).wait(1031).call(this.frame_1785).wait(34));

	// loading_bar
	this.instance = new lib.loadingguibar("synched",0);
	this.instance.setTransform(252.1,748.3,0.0433,1,0,0,0,136.4,86.1);
	this.instance._off = true;

	
	var _tweenStr_1 = cjs.Tween.get(this.instance).wait(95).to({_off:false},0).wait(1).to({regX:137.5,regY:85.9,scaleX:0.0512,x:213.25,y:514.85},0).wait(1).to({scaleX:0.0592,x:174.35,y:281.6},0).wait(1).to({scaleX:0.0598,x:174.4},0).wait(1).to({scaleX:0.0603,x:174.45},0).wait(1).to({scaleX:0.0609,x:174.5},0).wait(1).to({scaleX:0.0615,x:174.55},0).wait(1).to({scaleX:0.062,x:174.6,y:281.65},0).wait(1).to({scaleX:0.0626,x:174.65},0).wait(1).to({scaleX:0.0631,x:174.75},0).wait(1).to({scaleX:0.0637},0).wait(1).to({scaleX:0.0642,x:174.85},0).wait(1).to({scaleX:0.0648,x:174.9,y:281.7},0).wait(1).to({scaleX:0.0654,x:174.95},0).wait(1).to({scaleX:0.0659,x:175},0).wait(1).to({scaleX:0.0665,x:175.05},0).wait(1).to({scaleX:0.067,x:175.1,y:281.75},0).wait(1).to({scaleX:0.0676,x:175.15},0).wait(1).to({scaleX:0.0681,x:175.2},0).wait(1).to({scaleX:0.0687,x:175.3},0).wait(1).to({scaleX:0.0693},0).wait(1).to({scaleX:0.0698,x:175.4,y:281.8},0).wait(1).to({scaleX:0.0704,x:175.45},0).wait(1).to({scaleX:0.0709,x:175.5},0).wait(1).to({scaleX:0.0715,x:175.55},0).wait(1).to({scaleX:0.0721,x:175.6},0).wait(1).to({scaleX:0.0726,x:175.65,y:281.85},0).wait(1).to({scaleX:0.0732,x:175.7},0).wait(1).to({scaleX:0.0737,x:175.8},0).wait(1).to({scaleX:0.0743},0).wait(1).to({scaleX:0.0748,x:175.9,y:281.9},0).wait(1).to({scaleX:0.0754},0).wait(1).to({scaleX:0.076,x:176},0).wait(1).to({scaleX:0.0765},0).wait(1).to({scaleX:0.0771,x:176.1},0).wait(1).to({scaleX:0.0776,x:176.15,y:281.95},0).wait(1).to({scaleX:0.0782,x:176.2},0).wait(1).to({scaleX:0.0787,x:176.3},0).wait(1).to({scaleX:0.0793},0).wait(1).to({scaleX:0.0799,x:176.4},0).wait(1).to({scaleX:0.0804,y:282},0).wait(1).to({scaleX:0.081,x:176.5},0).wait(1).to({scaleX:0.0815,x:176.55},0).wait(1).to({scaleX:0.0821,x:176.6},0).wait(1).to({scaleX:0.0827,x:176.65,y:282.05},0).wait(1).to({scaleX:0.0832,x:176.7},0).wait(1).to({scaleX:0.0838,x:176.75},0).wait(1).to({scaleX:0.0843,x:176.8},0).wait(1).to({scaleX:0.0849,x:176.85},0).wait(1).to({scaleX:0.0854,x:176.9,y:282.1},0).wait(1).to({scaleX:0.086,x:176.95},0).wait(1).to({scaleX:0.0866,x:177.05},0).wait(1).to({scaleX:0.0871,x:177.1},0).wait(1).to({scaleX:0.0877,x:177.15},0).wait(1).to({scaleX:0.0882,x:177.2,y:282.15},0).wait(1).to({scaleX:0.0888,x:177.25},0).wait(1).to({scaleX:0.0894,x:177.3},0).wait(1).to({scaleX:0.0899,x:177.35},0).wait(1).to({scaleX:0.0905,x:177.45,y:282.2},0).wait(1).to({scaleX:0.091},0).wait(1).to({scaleX:0.0916,x:177.55},0).wait(1).to({scaleX:0.0921},0).wait(1).to({scaleX:0.0927,x:177.65},0).wait(1).to({scaleX:0.0933,y:282.25},0).wait(1).to({scaleX:0.0938,x:177.75},0).wait(1).to({scaleX:0.0944},0).wait(1).to({scaleX:0.0949,x:177.85},0).wait(1).to({scaleX:0.0955,x:177.95},0).wait(1).to({scaleX:0.096,y:282.3},0).wait(1).to({scaleX:0.0966,x:178.05},0).wait(1).to({scaleX:0.0972},0).wait(1).to({scaleX:0.0977,x:178.15},0).wait(1).to({scaleX:0.0983,y:282.35},0).wait(1).to({scaleX:0.0988,x:178.25},0).wait(1).to({scaleX:0.0994,x:178.3},0).wait(1).to({scaleX:0.1,x:178.35},0).wait(1).to({scaleX:0.1005,x:178.4},0).wait(1).to({scaleX:0.1011,x:178.45,y:282.4},0).wait(1).to({scaleX:0.1016,x:178.5},0).wait(1).to({scaleX:0.1022,x:178.55},0).wait(1).to({scaleX:0.1027,x:178.65},0).wait(1).to({scaleX:0.1033},0).wait(1).to({scaleX:0.1039,x:178.75,y:282.45},0).wait(1).to({scaleX:0.1044,x:178.8},0).wait(1).to({scaleX:0.105,x:178.85},0).wait(1).to({scaleX:0.1055,x:178.9},0).wait(1).to({scaleX:0.1061,x:178.95,y:282.5},0).wait(1).to({scaleX:0.1066,x:179},0).wait(1).to({scaleX:0.1072,x:179.05},0).wait(1).to({scaleX:0.1078,x:179.1},0).wait(1).to({scaleX:0.1083,x:179.2},0).wait(1).to({scaleX:0.1089,y:282.55},0).wait(1).to({scaleX:0.1094,x:179.3},0).wait(1).to({scaleX:0.11},0).wait(1).to({scaleX:0.1106,x:179.4},0).wait(1).to({scaleX:0.1111,x:179.45,y:282.6},0).wait(1).to({scaleX:0.1117,x:179.5},0).wait(1).to({scaleX:0.1122,x:179.6},0).wait(1).to({scaleX:0.1128},0).wait(1).to({scaleX:0.1133,x:179.7},0).wait(1).to({scaleX:0.1139,y:282.65},0).wait(1).to({scaleX:0.1145,x:179.8},0).wait(1).to({scaleX:0.115},0).wait(1).to({scaleX:0.1156,x:179.9},0).wait(1).to({scaleX:0.1161},0).wait(1).to({scaleX:0.1167,x:180,y:282.7},0).wait(1).to({scaleX:0.1173,x:180.05},0).wait(1).to({scaleX:0.1178,x:180.1},0).wait(1).to({scaleX:0.1184,x:180.15},0).wait(1).to({scaleX:0.1189,x:180.2,y:282.75},0).wait(1).to({scaleX:0.1195,x:180.3},0).wait(1).to({scaleX:0.12},0).wait(1).to({scaleX:0.1206,x:180.4},0).wait(1).to({scaleX:0.1212,x:180.45},0).wait(1).to({scaleX:0.1217,x:180.5,y:282.8},0).wait(1).to({scaleX:0.1223,x:180.55},0).wait(1).to({scaleX:0.1228,x:180.6},0).wait(1).to({scaleX:0.1234,x:180.65},0).wait(1).to({scaleX:0.1239,x:180.7},0).wait(1).to({scaleX:0.1245,x:180.75,y:282.85},0).wait(1).to({scaleX:0.1251,x:180.8},0).wait(1).to({scaleX:0.1256,x:180.85},0).wait(1).to({scaleX:0.1262,x:180.95},0).wait(1).to({scaleX:0.1267,y:282.9},0).wait(1).to({scaleX:0.1273,x:181.05},0).wait(1).to({scaleX:0.1279,x:181.1},0).wait(1).to({scaleX:0.1284,x:181.15},0).wait(1).to({scaleX:0.129,x:181.2},0).wait(1).to({scaleX:0.1295,x:181.25,y:282.95},0).wait(1).to({scaleX:0.1301,x:181.35},0).wait(1).to({scaleX:0.1306},0).wait(1).to({scaleX:0.1312,x:181.45},0).wait(1).to({scaleX:0.1318},0).wait(1).to({scaleX:0.1323,x:181.55,y:283},0).wait(1).to({scaleX:0.1329},0).wait(1).to({scaleX:0.1334,x:181.65},0).wait(1).to({scaleX:0.134,x:181.7},0).wait(1).to({scaleX:0.1345,x:181.75,y:283.05},0).wait(1).to({scaleX:0.1351,x:181.85},0).wait(1).to({scaleX:0.1357},0).wait(1).to({scaleX:0.1362,x:181.95},0).wait(1).to({scaleX:0.1368},0).wait(1).to({scaleX:0.1373,x:182.05,y:283.1},0).wait(1).to({scaleX:0.1379},0).wait(1).to({scaleX:0.1385,x:182.15},0).wait(1).to({scaleX:0.139,x:182.2},0).wait(1).to({scaleX:0.1396,x:182.25},0).wait(1).to({scaleX:0.1401,x:182.3,y:283.15},0).wait(1).to({scaleX:0.1407,x:182.35},0).wait(1).to({scaleX:0.1412,x:182.4},0).wait(1).to({scaleX:0.1418,x:182.45},0).wait(1).to({scaleX:0.1424,x:182.5,y:283.2},0).wait(1).to({scaleX:0.1429,x:182.6},0).wait(1).to({scaleX:0.1435,x:182.65},0).wait(1).to({scaleX:0.144,x:182.7},0).wait(1).to({scaleX:0.1446,x:182.75},0).wait(1).to({scaleX:0.1452,x:182.8,y:283.25},0).wait(1).to({scaleX:0.1457,x:182.85},0).wait(1).to({scaleX:0.1463,x:182.9},0).wait(1).to({scaleX:0.1468,x:182.95},0).wait(1).to({scaleX:0.1474,x:183},0).wait(1).to({scaleX:0.1479,x:183.1,y:283.3},0).wait(1).to({scaleX:0.1485},0).wait(1).to({scaleX:0.1491,x:183.2},0).wait(1).to({scaleX:0.1496},0).wait(1).to({scaleX:0.1502,x:183.3,y:283.35},0).wait(1).to({scaleX:0.1507},0).wait(1).to({scaleX:0.1513,x:183.4},0).wait(1).to({scaleX:0.1518,x:183.5},0).wait(1).to({scaleX:0.1524},0).wait(1).to({scaleX:0.153,x:183.6,y:283.4},0).wait(1).to({scaleX:0.1535},0).wait(1).to({scaleX:0.1541,x:183.7},0).wait(1).to({scaleX:0.1546},0).wait(1).to({scaleX:0.1552,x:183.8},0).wait(1).to({scaleX:0.1558,y:283.45},0).wait(1).to({scaleX:0.1563,x:183.9},0).wait(1).to({scaleX:0.1569,x:183.95},0).wait(1).to({scaleX:0.1574,x:184},0).wait(1).to({scaleX:0.158,x:184.05,y:283.5},0).wait(1).to({scaleX:0.1585,x:184.1},0).wait(1).to({scaleX:0.1591,x:184.15},0).wait(1).to({scaleX:0.1597,x:184.2},0).wait(1).to({scaleX:0.1602,x:184.3},0).wait(1).to({scaleX:0.1608,x:184.35,y:283.55},0).wait(1).to({scaleX:0.1613,x:184.4},0).wait(1).to({scaleX:0.1619,x:184.45},0).wait(1).to({scaleX:0.1624,x:184.5},0).wait(1).to({scaleX:0.163,x:184.55,y:283.6},0).wait(1).to({scaleX:0.2726,scaleY:1.6682,x:134.5,y:337.9},0).wait(1).to({scaleX:0.2734,x:134.55},0).wait(1).to({scaleX:0.2742,x:134.65},0).wait(1).to({scaleX:0.275,x:134.7},0).wait(1).to({scaleX:0.2758,x:134.8},0).wait(1).to({scaleX:0.2766,x:134.9},0).wait(1).to({scaleX:0.2774,x:135},0).wait(1).to({scaleX:0.2782,x:135.05},0).wait(1).to({scaleX:0.279,x:135.1},0).wait(1).to({scaleX:0.2799,x:135.25},0).wait(1).to({scaleX:0.2807,x:135.3},0).wait(1).to({scaleX:0.2815,x:135.4},0).wait(1).to({scaleX:0.2823,x:135.45},0).wait(1).to({scaleX:0.2831,x:135.5},0).wait(1).to({scaleX:0.2839,x:135.65},0).wait(1).to({scaleX:0.2847,x:135.7},0).wait(1).to({scaleX:0.2855,x:135.8},0).wait(1).to({scaleX:0.2863,x:135.85},0).wait(1).to({scaleX:0.2871,x:136},0).wait(1).to({scaleX:0.2879,x:136.05},0).wait(1).to({scaleX:0.2888,x:136.1},0).wait(1).to({scaleX:0.2896,x:136.2},0).wait(1).to({scaleX:0.2904,x:136.25},0).wait(1).to({scaleX:0.2912,x:136.4},0).wait(1).to({scaleX:0.292,x:136.45},0).wait(1).to({scaleX:0.2928,x:136.55},0).wait(1).to({scaleX:0.2936,x:136.6},0).wait(1).to({scaleX:0.2944,x:136.7},0).wait(1).to({scaleX:0.2952,x:136.8},0).wait(1).to({scaleX:0.296,x:136.85},0).wait(1).to({scaleX:0.2968,x:136.95},0).wait(1).to({scaleX:0.2977,x:137.05},0).wait(1).to({scaleX:0.2985,x:137.15},0).wait(1).to({scaleX:0.2993,x:137.2},0).wait(1).to({scaleX:0.3001,x:137.25,y:337.95},0).wait(1).to({scaleX:0.3009,x:137.35},0).wait(1).to({scaleX:0.3017,x:137.45},0).wait(1).to({scaleX:0.3025,x:137.55},0).wait(1).to({scaleX:0.3033,x:137.6},0).wait(1).to({scaleX:0.3041,x:137.7},0).wait(1).to({scaleX:0.3049,x:137.8},0).wait(1).to({scaleX:0.3057,x:137.85},0).wait(1).to({scaleX:0.3066,x:137.95},0).wait(1).to({scaleX:0.3074,x:138},0).wait(1).to({scaleX:0.3082,x:138.1},0).wait(1).to({scaleX:0.309,x:138.2},0).wait(1).to({scaleX:0.3098,x:138.3},0).wait(1).to({scaleX:0.3106,x:138.35},0).wait(1).to({scaleX:0.3114,x:138.4},0).wait(1).to({scaleX:0.3122,x:138.55},0).wait(1).to({scaleX:0.313,x:138.6},0).wait(1).to({scaleX:0.3138,x:138.7},0).wait(1).to({scaleX:0.3146,x:138.75},0).wait(1).to({scaleX:0.3155,x:138.85},0).wait(1).to({scaleX:0.3163,x:138.95},0).wait(1).to({scaleX:0.3171,x:139},0).wait(1).to({scaleX:0.3179,x:139.1},0).wait(1).to({scaleX:0.3187,x:139.15},0).wait(1).to({scaleX:0.3195,x:139.3},0).wait(1).to({scaleX:0.3203,x:139.35},0).wait(1).to({scaleX:0.3211,x:139.45},0).wait(1).to({scaleX:0.3219,x:139.5},0).wait(1).to({scaleX:0.3227,x:139.55},0).wait(1).to({scaleX:0.3235,x:139.7},0).wait(1).to({scaleX:0.3244,x:139.75},0).wait(1).to({scaleX:0.3252,x:139.85},0).wait(1).to({scaleX:0.326,x:139.9},0).wait(1).to({scaleX:0.3268,x:140.05},0).wait(1).to({scaleX:0.3276,x:140.1},0).wait(1).to({scaleX:0.3284,x:140.15},0).wait(1).to({scaleX:0.3292,x:140.25},0).wait(1).to({scaleX:0.33,x:140.35},0).wait(1).to({scaleX:0.3308,x:140.45},0).wait(1).to({scaleX:0.3316,x:140.5},0).wait(1).to({scaleX:0.3324,x:140.6},0).wait(1).to({scaleX:0.3333,x:140.65},0).wait(1).to({scaleX:0.3341,x:140.75},0).wait(1).to({scaleX:0.3349,x:140.85},0).wait(1).to({scaleX:0.3357,x:140.9},0).wait(1).to({scaleX:0.3365,x:141},0).wait(1).to({scaleX:0.3373,x:141.1},0).wait(1).to({scaleX:0.3381,x:141.2},0).wait(1).to({scaleX:0.3389,x:141.25,y:338},0).wait(1).to({scaleX:0.3397,x:141.3},0).wait(1).to({scaleX:0.3405,x:141.4},0).wait(1).to({scaleX:0.3413,x:141.5},0).wait(1).to({scaleX:0.3422,x:141.6},0).wait(1).to({scaleX:0.343,x:141.65},0).wait(1).to({scaleX:0.3438,x:141.75},0).wait(1).to({scaleX:0.3446,x:141.85},0).wait(1).to({scaleX:0.3454,x:141.9},0).wait(1).to({scaleX:0.3462,x:142},0).wait(1).to({scaleX:0.347,x:142.05},0).wait(1).to({scaleX:0.3478,x:142.15},0).wait(1).to({scaleX:0.3486,x:142.25},0).wait(1).to({scaleX:0.3494,x:142.35},0).wait(1).to({scaleX:0.3502,x:142.4},0).wait(1).to({scaleX:0.3511,x:142.45},0).wait(1).to({scaleX:0.3519,x:142.6},0).wait(1).to({scaleX:0.3527,x:142.65},0).wait(1).to({scaleX:0.3535,x:142.75},0).wait(1).to({scaleX:0.3543,x:142.8},0).wait(1).to({scaleX:0.3551,x:142.9},0).wait(1).to({scaleX:0.3559,x:143},0).wait(1).to({scaleX:0.3567,x:143.05},0).wait(1).to({scaleX:0.3575,x:143.15},0).wait(1).to({scaleX:0.3583,x:143.2},0).wait(1).to({scaleX:0.3591,x:143.35},0).wait(1).to({scaleX:0.36,x:143.4},0).wait(1).to({scaleX:0.3608,x:143.5},0).wait(1).to({scaleX:0.3616,x:143.55},0).wait(1).to({scaleX:0.3624,x:143.65},0).wait(1).to({scaleX:0.3632,x:143.75},0).wait(1).to({scaleX:0.364,x:143.8},0).wait(1).to({scaleX:0.3648,x:143.9},0).wait(1).to({scaleX:0.3656,x:143.95},0).wait(1).to({scaleX:0.3664,x:144.1},0).wait(1).to({scaleX:0.3672,x:144.15},0).wait(1).to({scaleX:0.368,x:144.2},0).wait(1).to({scaleX:0.3689,x:144.3},0).wait(1).to({scaleX:0.3697,x:144.4},0).wait(1).to({scaleX:0.3705,x:144.5},0).wait(1).to({scaleX:0.3713,x:144.55},0).wait(1).to({scaleX:0.3721,x:144.6},0).wait(1).to({scaleX:0.3729,x:144.7},0).wait(1).to({scaleX:0.3737,x:144.8},0).wait(1).to({scaleX:0.3745,x:144.9},0).wait(1).to({scaleX:0.3753,x:144.95},0).wait(1).to({scaleX:0.3761,x:145.05},0).wait(1).to({scaleX:0.3769,x:145.15},0).wait(1).to({scaleX:0.3778,x:145.2},0).wait(1).to({scaleX:0.3786,x:145.3,y:338.05},0).wait(1).to({scaleX:0.3794,x:145.35},0).wait(1).to({scaleX:0.3802,x:145.45},0).wait(1).to({scaleX:0.381,x:145.55},0).wait(1).to({scaleX:0.3818,x:145.65},0).wait(1).to({scaleX:0.3826,x:145.7},0).wait(1).to({scaleX:0.3834,x:145.75},0).wait(1).to({scaleX:0.3842,x:145.9},0).wait(1).to({scaleX:0.385,x:145.95},0).wait(1).to({scaleX:0.3859,x:146.05},0).wait(1).to({scaleX:0.3867,x:146.1},0).wait(1).to({scaleX:0.3875,x:146.25},0).wait(1).to({scaleX:0.3883,x:146.3},0).wait(1).to({scaleX:0.3891,x:146.35},0).wait(1).to({scaleX:0.3899,x:146.45},0).wait(1).to({scaleX:0.3907,x:146.5},0).wait(1).to({scaleX:0.3915,x:146.65},0).wait(1).to({scaleX:0.3923,x:146.7},0).wait(1).to({scaleX:0.3931,x:146.8},0).wait(1).to({scaleX:0.3939,x:146.85},0).wait(1).to({scaleX:0.3948,x:146.95},0).wait(1).to({scaleX:0.3956,x:147.05},0).wait(1).to({scaleX:0.3964,x:147.1},0).wait(1).to({scaleX:0.3972,x:147.2},0).wait(1).to({scaleX:0.398,x:147.25},0).wait(1).to({scaleX:0.3988,x:147.4},0).wait(1).to({scaleX:0.3996,x:147.45},0).wait(1).to({scaleX:0.4004,x:147.5},0).wait(1).to({scaleX:0.4012,x:147.6},0).wait(1).to({scaleX:0.402,x:147.7},0).wait(1).to({scaleX:0.4028,x:147.8},0).wait(1).to({scaleX:0.4037,x:147.85},0).wait(1).to({scaleX:0.4045,x:147.95},0).wait(1).to({scaleX:0.4053,x:148},0).wait(1).to({scaleX:0.4061,x:148.1},0).wait(1).to({scaleX:0.4069,x:148.2},0).wait(1).to({scaleX:0.4077,x:148.25},0).wait(1).to({scaleX:0.4085,x:148.35},0).wait(1).to({scaleX:0.4093,x:148.45},0).wait(1).to({scaleX:0.4101,x:148.55},0).wait(1).to({scaleX:0.4109,x:148.6},0).wait(1).to({scaleX:0.4117,x:148.65},0).wait(1).to({scaleX:0.4126,x:148.8},0).wait(1).to({scaleX:0.4134,x:148.85},0).wait(1).to({scaleX:0.4142,x:148.95},0).wait(1).to({scaleX:0.415,x:149},0).wait(1).to({scaleX:0.4158,x:149.1},0).wait(1).to({scaleX:0.4166,x:149.2},0).wait(1).to({scaleX:0.4174,x:149.25,y:338.1},0).wait(1).to({scaleX:0.4182,x:149.35},0).wait(1).to({scaleX:0.419,x:149.4},0).wait(1).to({scaleX:0.4198,x:149.55},0).wait(1).to({scaleX:0.4206,x:149.6},0).wait(1).to({scaleX:0.4215,x:149.7},0).wait(1).to({scaleX:0.4223,x:149.75},0).wait(1).to({scaleX:0.4231,x:149.8},0).wait(1).to({scaleX:0.4239,x:149.95},0).wait(1).to({scaleX:0.4247,x:150},0).wait(1).to({scaleX:0.4255,x:150.1},0).wait(1).to({scaleX:0.4263,x:150.15},0).wait(1).to({scaleX:0.4271,x:150.3},0).wait(1).to({scaleX:0.4279,x:150.35},0).wait(1).to({scaleX:0.4287,x:150.4},0).wait(1).to({scaleX:0.4295,x:150.5},0).wait(1).to({scaleX:0.4304,x:150.55},0).wait(1).to({scaleX:0.4312,x:150.7},0).wait(1).to({scaleX:0.432,x:150.75},0).wait(1).to({scaleX:0.4328,x:150.85},0).wait(1).to({scaleX:0.4336,x:150.9},0).wait(1).to({scaleX:0.4344,x:151},0).wait(1).to({scaleX:0.4352,x:151.1},0).wait(1).to({scaleX:0.436,x:151.15},0).wait(1).to({scaleX:0.4368,x:151.25},0).wait(1).to({scaleX:0.4376,x:151.3},0).wait(1).to({scaleX:0.4384,x:151.45},0).wait(1).to({scaleX:0.4393,x:151.5},0).wait(1).to({scaleX:0.4401,x:151.55},0).wait(1).to({scaleX:0.4409,x:151.65},0).wait(1);
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
	this.instance_1 = new lib.smallbox_1("synched",0);
	this.instance_1.setTransform(262.35,350.15,0.5112,0.5111,0,0,0,4.1,7);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(284).to({_off:false},0).wait(1).to({y:353.15},0).wait(1).to({y:352.15},0).wait(1533));

	// loading_box
	this.playbutton = new lib.playbutton();
	this.playbutton.name = "playbutton";
	this.playbutton.setTransform(322,214,1,1,0,0,0,150,150);
	new cjs.ButtonHelper(this.playbutton, 0, 1, 1);

	this.instance_2 = new lib.loadingguibox("synched",0);
	this.instance_2.setTransform(266.5,470.25,1,1,0,0,0,137.5,84.7);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.playbutton}]}).to({state:[]},20).to({state:[{t:this.instance_2}]},75).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[]},1).wait(1));
	
	var _tweenStr_5 = cjs.Tween.get(this.instance_2).wait(95).to({_off:false},0).wait(1).to({y:392.95},0).wait(1).to({y:315.7},0).wait(1).to({y:316.45},0).wait(1).to({y:317.2},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({y:475.2},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1);
	var _tweenStr_6 = _tweenStr_5.to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1);
	var _tweenStr_7 = _tweenStr_6.to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1);
	var _tweenStr_8 = _tweenStr_7.to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1);
	this.timeline.addTween(_tweenStr_8.to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},1).wait(1));

	// portal2
	this.skiport2 = new lib.spiningskaianportal();
	this.skiport2.name = "skiport2";
	this.skiport2.setTransform(92,175.25,0.9788,0.9723,0,0,0,0,4.6);
	this.skiport2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.skiport2).wait(399).to({_off:false},0).wait(1).to({regX:-11,regY:4.1,scaleX:0.9859,scaleY:0.9804,x:135.65,y:202.35},0).wait(1).to({scaleX:0.993,scaleY:0.9884,x:190.1,y:230},0).wait(1).to({scaleX:1.0001,scaleY:0.9964,x:244.5,y:257.6},0).wait(1).to({scaleX:1.0072,scaleY:1.0044,x:298.9,y:285.2},0).wait(1).to({scaleX:1.0144,scaleY:1.0125,x:353.4,y:312.85},0).wait(152).to({x:475.15,y:293.45},0).wait(1).to({x:596.9,y:274},0).wait(1).to({x:718.65,y:254.6},0).wait(1).to({x:840.45,y:235.2},0).to({_off:true},1).wait(1259));

	// portal
	this.skiport = new lib.spiningskaianportal();
	this.skiport.name = "skiport";
	this.skiport.setTransform(274.25,317.8,0.3698,0.3691,0,0,0,0,4.9);
	this.skiport._off = true;

	this.timeline.addTween(cjs.Tween.get(this.skiport).wait(20).to({_off:false},0).wait(1).to({regX:-11,regY:4.1,scaleX:0.4443,scaleY:0.4434,x:269.35,y:252.95},0).wait(1).to({scaleX:0.5187,scaleY:0.5178,x:268.55,y:188.45},0).wait(1).to({scaleX:0.5932,scaleY:0.5921,x:267.7,y:124},0).wait(1).to({scaleX:0.9269,scaleY:0.9253,x:264.05,y:190},0).wait(1).to({scaleX:0.95,scaleY:0.9485,x:263.8,y:188.05},0).wait(1).to({scaleX:0.9498,scaleY:0.9483},0).wait(1).to({scaleX:0.9496,scaleY:0.9481},0).wait(1).to({scaleX:0.9494,scaleY:0.9478,y:188.1},0).wait(1).to({scaleX:0.9492,scaleY:0.9476},0).wait(1).to({scaleX:0.9489,scaleY:0.9474,y:188.15},0).wait(1).to({scaleX:0.9487,scaleY:0.9472},0).wait(1).to({scaleX:0.9485,scaleY:0.947},0).wait(1).to({scaleX:0.9483,scaleY:0.9468,y:188.2},0).wait(1).to({scaleX:0.9481,scaleY:0.9465},0).wait(1).to({scaleX:0.9478,scaleY:0.9463,y:188.25},0).wait(1).to({scaleX:0.9476,scaleY:0.9461,x:263.85},0).wait(1).to({scaleX:0.9474,scaleY:0.9459},0).wait(1).to({scaleX:0.9472,scaleY:0.9457,y:188.3},0).wait(1).to({scaleX:0.947,scaleY:0.9454},0).wait(1).to({scaleX:0.9468,scaleY:0.9452,y:188.35},0).wait(1).to({scaleX:0.9465,scaleY:0.945,y:188.3},0).wait(1).to({scaleX:0.9463,scaleY:0.9448},0).wait(1).to({scaleX:0.9461,scaleY:0.9446,y:188.35},0).wait(1).to({scaleX:0.9459,scaleY:0.9444},0).wait(1).to({scaleX:0.9457,scaleY:0.9441,y:188.4},0).wait(1).to({scaleX:0.9454,scaleY:0.9439},0).wait(1).to({scaleX:0.9452,scaleY:0.9437},0).wait(1).to({scaleX:0.945,scaleY:0.9435,y:188.45},0).wait(1).to({scaleX:0.9448,scaleY:0.9433},0).wait(1).to({scaleX:0.9446,scaleY:0.943},0).wait(1).to({scaleX:0.9444,scaleY:0.9428,y:188.5},0).wait(1).to({scaleX:0.9441,scaleY:0.9426},0).wait(1).to({scaleX:0.9439,scaleY:0.9424,y:188.55},0).wait(1).to({scaleX:0.9437,scaleY:0.9422},0).wait(1).to({scaleX:0.9435,scaleY:0.9419},0).wait(1).to({scaleX:0.9433,scaleY:0.9417,y:188.6},0).wait(1).to({scaleX:0.943,scaleY:0.9415,x:263.9},0).wait(1).to({scaleX:0.9428,scaleY:0.9413,y:188.65},0).wait(1).to({scaleX:0.9426,scaleY:0.9411},0).wait(1).to({scaleX:0.9424,scaleY:0.9409},0).wait(1).to({scaleX:0.9422,scaleY:0.9406,y:188.7},0).wait(1).to({scaleX:0.942,scaleY:0.9404},0).wait(1).to({scaleX:0.9417,scaleY:0.9402,y:188.75},0).wait(1).to({scaleX:0.9415,scaleY:0.94},0).wait(1).to({scaleX:0.9413,scaleY:0.9398},0).wait(1).to({scaleX:0.9411,scaleY:0.9395,y:188.8},0).wait(1).to({scaleX:0.9409,scaleY:0.9393},0).wait(1).to({scaleX:0.9406,scaleY:0.9391},0).wait(1).to({scaleX:0.9404,scaleY:0.9389,y:188.85},0).wait(1).to({scaleX:0.9402,scaleY:0.9387},0).wait(1).to({scaleX:0.94,scaleY:0.9385,y:188.9},0).wait(1).to({scaleX:0.9398,scaleY:0.9382},0).wait(1).to({scaleX:0.9396,scaleY:0.938},0).wait(1).to({scaleX:0.9393,scaleY:0.9378,y:188.95},0).wait(1).to({scaleX:0.9391,scaleY:0.9376},0).wait(1).to({scaleX:0.9389,scaleY:0.9374,y:189},0).wait(1).to({scaleX:0.9387,scaleY:0.9371},0).wait(1).to({scaleX:0.9385,scaleY:0.9369,x:263.95},0).wait(1).to({scaleX:0.9383,scaleY:0.9367,y:189.05},0).wait(1).to({scaleX:0.938,scaleY:0.9365},0).wait(1).to({scaleX:0.9378,scaleY:0.9363,y:189.1},0).wait(1).to({scaleX:0.9376,scaleY:0.936},0).wait(1).to({scaleX:0.9374,scaleY:0.9358},0).wait(1).to({scaleX:0.9372,scaleY:0.9356,y:189.15},0).wait(1).to({scaleX:0.9369,scaleY:0.9354},0).wait(1).to({scaleX:0.9367,scaleY:0.9352},0).wait(1).to({scaleX:0.9365,scaleY:0.935,y:189.2},0).wait(1).to({scaleX:0.9363,scaleY:0.9347},0).wait(1).to({scaleX:0.9361,scaleY:0.9345,y:189.25},0).wait(1).to({scaleX:0.9359,scaleY:0.9343},0).wait(1).to({scaleX:0.9356,scaleY:0.9341},0).wait(1).to({scaleX:0.9354,scaleY:0.9339,y:189.3},0).wait(1).to({scaleX:0.9352,scaleY:0.9336},0).wait(1).to({scaleX:0.935,scaleY:0.9334,y:189.35},0).wait(1).to({scaleX:0.9348,scaleY:0.9332},0).wait(1).to({scaleX:0.9345,scaleY:0.933},0).wait(1).to({scaleX:0.9343,scaleY:0.9328},0).wait(1).to({scaleX:0.9341,scaleY:0.9326},0).wait(1).to({scaleX:0.9339,scaleY:0.9323,x:264,y:189.4},0).wait(1).to({scaleX:0.9337,scaleY:0.9321},0).wait(1).to({scaleX:0.9335,scaleY:0.9319},0).wait(1).to({scaleX:0.9332,scaleY:0.9317,y:189.45},0).wait(1).to({scaleX:0.933,scaleY:0.9315},0).wait(1).to({scaleX:0.9328,scaleY:0.9312},0).wait(1).to({scaleX:0.9326,scaleY:0.931,y:189.5},0).wait(1).to({scaleX:0.9324,scaleY:0.9308},0).wait(1).to({scaleX:0.9321,scaleY:0.9306,y:189.55},0).wait(1).to({scaleX:0.9319,scaleY:0.9304},0).wait(1).to({scaleX:0.9317,scaleY:0.9301},0).wait(1).to({scaleX:0.9315,scaleY:0.9299,y:189.6},0).wait(1).to({scaleX:0.9313,scaleY:0.9297},0).wait(1).to({scaleX:0.9311,scaleY:0.9295,y:189.65},0).wait(1).to({scaleX:0.9308,scaleY:0.9293},0).wait(1).to({scaleX:0.9306,scaleY:0.9291},0).wait(1).to({scaleX:0.9304,scaleY:0.9288,y:189.7},0).wait(1).to({scaleX:0.9302,scaleY:0.9286},0).wait(1).to({scaleX:0.93,scaleY:0.9284,y:189.75},0).wait(1).to({scaleX:0.9297,scaleY:0.9282},0).wait(1).to({scaleX:0.9295,scaleY:0.928,x:264.05},0).wait(1).to({scaleX:0.9293,scaleY:0.9277,y:189.8},0).wait(1).to({scaleX:0.9291,scaleY:0.9275},0).wait(1).to({scaleX:0.9289,scaleY:0.9273},0).wait(1).to({scaleX:0.9287,scaleY:0.9271,y:189.85},0).wait(1).to({scaleX:0.9284,scaleY:0.9269},0).wait(1).to({scaleX:0.9282,scaleY:0.9267,y:189.9},0).wait(1).to({scaleX:0.928,scaleY:0.9264},0).wait(1).to({scaleX:0.9278,scaleY:0.9262},0).wait(1).to({scaleX:0.9276,scaleY:0.926,y:189.95},0).wait(1).to({scaleX:0.9273,scaleY:0.9258},0).wait(1).to({scaleX:0.9271,scaleY:0.9256,y:190},0).wait(1).to({scaleX:0.9269,scaleY:0.9253},0).wait(1).to({scaleX:0.8127,scaleY:0.8113,x:265.3,y:154.95},0).wait(1).to({scaleX:0.6985,scaleY:0.6973,x:266.55,y:119.8},0).wait(110).to({scaleX:0.8731,scaleY:0.8715,x:310.85,y:166.85},0).wait(1).to({scaleX:1.0477,scaleY:1.0458,x:355.1,y:213.9},0).wait(1).to({scaleX:1.2224,scaleY:1.2201,x:399.4,y:260.9},0).wait(1).to({scaleX:1.397,scaleY:1.3944,x:443.7,y:307.95},0).wait(1).to({scaleX:1.5716,scaleY:1.5687,x:488,y:355},0).wait(36).to({scaleX:1.171,scaleY:1.1688,x:342.65,y:244.75},0).wait(1).to({scaleX:0.7703,scaleY:0.7688,x:197.35,y:134.45},0).wait(21).to({scaleX:0.7438,scaleY:0.7424,x:234.4,y:130.25},0).wait(1).to({scaleX:0.7173,scaleY:0.7159,x:271.5,y:126.1},0).wait(1).to({scaleX:0.6908,scaleY:0.6895,x:308.65,y:121.9},0).wait(1).to({scaleX:0.6643,scaleY:0.663,x:345.75,y:117.65},0).wait(1).to({scaleX:0.6377,scaleY:0.6366,x:382.85,y:113.45},0).wait(1).to({scaleX:0.6112,scaleY:0.6101,x:420,y:109.25},0).wait(1).to({scaleX:0.6096,scaleY:0.6085,x:420.05,y:109.15},0).wait(1).to({scaleX:0.6079,scaleY:0.6069,x:420.15,y:109.05},0).wait(1).to({scaleX:0.6062,scaleY:0.6052,x:420.3,y:109},0).wait(1).to({scaleX:0.6046,scaleY:0.6036,x:420.4,y:108.85},0).wait(1).to({scaleX:0.6029,scaleY:0.6019,x:420.5,y:108.75},0).wait(1).to({scaleX:0.6013,scaleY:0.6003,x:420.65,y:108.7},0).wait(1).to({scaleX:0.5996,scaleY:0.5986,x:420.75,y:108.6},0).wait(1).to({scaleX:0.598,scaleY:0.597,x:420.8,y:108.5},0).wait(1).to({scaleX:0.5963,scaleY:0.5954,x:420.95,y:108.45},0).wait(1).to({scaleX:0.5947,scaleY:0.5937,x:421.05,y:108.35},0).wait(1).to({scaleX:0.593,scaleY:0.5921,x:421.2,y:108.25},0).wait(1).to({scaleX:0.5914,scaleY:0.5904,x:421.3,y:108.15},0).wait(1).to({scaleX:0.5897,scaleY:0.5888,x:421.4,y:108.05},0).wait(1).to({scaleX:0.5881,scaleY:0.5871,x:421.55,y:107.95},0).wait(1).to({scaleX:0.6154,scaleY:0.6144,x:323.75,y:151.45},0).wait(1).to({scaleX:0.6428,scaleY:0.6417,x:225.95,y:194.95},0).wait(1).to({scaleX:0.6701,scaleY:0.6689,x:128.15,y:238.45},0).wait(1).to({scaleX:0.701,scaleY:0.6996,x:132.65,y:237.15},0).wait(1).to({scaleX:0.7318,scaleY:0.7303,x:137.15,y:235.85},0).wait(1).to({scaleX:0.7626,scaleY:0.761,x:141.7,y:234.5},0).wait(1).to({scaleX:0.7934,scaleY:0.7917,x:146.2,y:233.25},0).wait(1).to({scaleX:0.8243,scaleY:0.8224,x:150.8,y:231.9},0).wait(31).to({scaleX:0.8949,scaleY:0.8929,x:204.85,y:203},0).wait(1).to({scaleX:0.9656,scaleY:0.9633,x:258.95,y:174.05},0).wait(1).to({x:257.65,y:174.7},0).wait(35).to({scaleX:1.1843,scaleY:1.1816,x:222.65,y:123.6},0).wait(1).to({scaleX:1.4031,scaleY:1.3998,x:187.75,y:72.45},0).wait(1).to({scaleX:1.6218,scaleY:1.618,x:152.8,y:21.35},0).wait(1).to({scaleX:1.8406,scaleY:1.8363,x:117.9,y:-29.75},0).wait(1).to({scaleX:2.0594,scaleY:2.0545,x:83,y:-80.95},0).wait(36).to({x:84.05},0).wait(1).to({x:85.1},0).wait(1).to({x:86.15},0).wait(1).to({x:87.25},0).wait(1).to({x:88.3},0).wait(1).to({x:89.35},0).wait(1).to({x:90.45},0).wait(1).to({x:91.5},0).wait(1).to({x:92.55},0).wait(1).to({x:93.65},0).wait(1).to({x:94.7},0).wait(1).to({x:95.75},0).wait(1).to({x:96.85},0).wait(1).to({x:97.9},0).wait(1).to({x:98.95},0).wait(1).to({x:100.05},0).wait(1).to({x:101.1},0).wait(1).to({x:102.15},0).wait(1).to({x:103.2},0).wait(1).to({x:104.3},0).wait(1).to({x:105.35},0).wait(1).to({x:106.4},0).wait(1).to({x:107.5},0).wait(1).to({x:108.55},0).wait(1).to({x:109.6},0).wait(1).to({x:110.7},0).wait(1).to({x:111.75},0).wait(1).to({x:112.8},0).wait(1).to({x:113.9},0).wait(1).to({x:114.95},0).wait(1).to({x:116},0).wait(1).to({x:117.1},0).wait(1).to({x:118.15},0).wait(1).to({x:119.2},0).wait(1).to({x:120.25},0).wait(1).to({x:121.35},0).wait(1).to({x:122.4},0).wait(1).to({x:123.45},0).wait(1).to({x:124.55},0).wait(1).to({x:125.6},0).wait(1).to({x:126.65},0).wait(1).to({x:127.75},0).wait(1).to({x:128.8},0).wait(1).to({x:129.85},0).wait(1).to({x:130.95},0).wait(1).to({x:132},0).wait(1).to({x:133.05},0).wait(1).to({x:134.15},0).wait(1).to({x:135.2},0).wait(1).to({x:136.25},0).wait(1).to({x:137.3},0).wait(1).to({x:138.4},0).wait(1).to({x:139.45},0).wait(1).to({x:140.5},0).wait(1).to({x:141.6},0).wait(1).to({x:142.65},0).wait(1).to({x:143.7},0).wait(1).to({x:144.8},0).wait(1).to({x:145.85},0).wait(1).to({x:146.9},0).wait(1).to({x:148},0).wait(1).to({x:149.05},0).wait(1).to({x:150.1},0).wait(1).to({x:151.2},0).wait(1).to({x:152.25},0).wait(1).to({x:153.3},0).wait(1).to({x:154.35},0).wait(1).to({x:155.45},0).wait(1).to({x:156.5},0).wait(1).to({x:157.55},0).wait(1).to({x:158.65},0).wait(1).to({x:159.7},0).wait(1).to({x:160.75},0).wait(1).to({x:161.85},0).wait(1).to({x:162.9},0).wait(1).to({x:163.95},0).wait(1).to({x:165.05},0).wait(1).to({x:166.1},0).wait(1).to({x:167.15},0).wait(1).to({x:168.25},0).wait(37).to({scaleX:1.8488,scaleY:1.8444,x:192.75,y:-11.25},0).wait(1).to({scaleX:1.6383,scaleY:1.6344,x:217.35,y:58.4},0).wait(1).to({scaleX:1.4277,scaleY:1.4243,x:241.9,y:128.1},0).wait(1).to({scaleX:1.2172,scaleY:1.2142,x:266.45,y:197.8},0).wait(1).to({scaleX:1.2214,scaleY:1.2184,x:266.5},0).wait(1).to({scaleX:1.2256,scaleY:1.2225,x:266.6,y:197.75},0).wait(1).to({scaleX:1.2297,scaleY:1.2267,x:266.7,y:197.8},0).wait(1).to({scaleX:1.2339,scaleY:1.2309,x:266.8},0).wait(1).to({scaleX:1.2381,scaleY:1.2351,x:266.9},0).wait(1).to({scaleX:1.2423,scaleY:1.2392,x:267,y:197.85},0).wait(1).to({scaleX:1.2465,scaleY:1.2434,x:267.05},0).wait(1).to({scaleX:1.2506,scaleY:1.2476,x:267.15},0).wait(1).to({scaleX:1.2548,scaleY:1.2517,x:267.25,y:197.9},0).wait(1).to({scaleX:1.259,scaleY:1.2559,x:267.3,y:197.85},0).wait(1).to({scaleX:1.2632,scaleY:1.2601,x:267.4},0).wait(1).to({scaleX:1.2674,scaleY:1.2643,x:267.5,y:197.9},0).wait(1).to({scaleX:1.2716,scaleY:1.2684,x:267.55},0).wait(1).to({scaleX:1.2757,scaleY:1.2726,x:267.65},0).wait(1).to({scaleX:1.2799,scaleY:1.2768,x:267.75,y:197.95},0).wait(1).to({scaleX:1.2841,scaleY:1.2809,x:267.8},0).wait(1).to({scaleX:1.2883,scaleY:1.2851,x:267.95,y:197.9},0).wait(1).to({scaleX:1.2925,scaleY:1.2893,x:268.05,y:197.95},0).wait(1).to({scaleX:1.2967,scaleY:1.2935,x:268.1},0).wait(1).to({scaleX:1.3008,scaleY:1.2976,x:268.2},0).wait(1).to({scaleX:1.305,scaleY:1.3018,x:268.3,y:198},0).wait(1).to({scaleX:1.3092,scaleY:1.306,x:268.35},0).wait(1).to({scaleX:1.3134,scaleY:1.3102,x:268.45},0).wait(1).to({scaleX:1.3176,scaleY:1.3143,x:268.55,y:198.05},0).wait(1).to({scaleX:1.3217,scaleY:1.3185,x:268.65,y:198},0).wait(1).to({scaleX:1.3259,scaleY:1.3227,x:268.7},0).wait(1).to({scaleX:1.3301,scaleY:1.3268,x:268.8,y:198.05},0).wait(1).to({scaleX:1.3343,scaleY:1.331,x:268.9},0).wait(1).to({scaleX:1.3385,scaleY:1.3352,x:269},0).wait(1).to({scaleX:1.3427,scaleY:1.3394,x:269.1,y:198.1},0).wait(1).to({scaleX:1.3468,scaleY:1.3435,x:269.2},0).wait(1).to({scaleX:1.351,scaleY:1.3477,x:269.25,y:198.15},0).wait(1).to({scaleX:1.3552,scaleY:1.3519,x:269.35,y:198.1},0).wait(1).to({scaleX:1.3594,scaleY:1.356,x:269.45},0).wait(1).to({scaleX:1.3636,scaleY:1.3602,x:269.5,y:198.15},0).wait(1).to({scaleX:1.3677,scaleY:1.3644,x:269.6},0).wait(1).to({scaleX:1.3719,scaleY:1.3686,x:269.7},0).wait(1).to({scaleX:1.3761,scaleY:1.3727,x:269.75,y:198.2},0).wait(1).to({scaleX:1.3803,scaleY:1.3769,x:269.85},0).wait(1).to({scaleX:1.3845,scaleY:1.3811,x:269.95,y:198.15},0).wait(1).to({scaleX:1.3887,scaleY:1.3853,x:270,y:198.2},0).wait(1).to({scaleX:1.3928,scaleY:1.3894,x:270.15},0).wait(1).to({scaleX:1.397,scaleY:1.3936,x:270.25},0).wait(1).to({scaleX:1.4012,scaleY:1.3978,x:270.3,y:198.25},0).wait(1).to({scaleX:1.4054,scaleY:1.4019,x:270.4},0).wait(1).to({scaleX:1.4096,scaleY:1.4061,x:270.5},0).wait(1).to({scaleX:1.4138,scaleY:1.4103,x:270.55,y:198.3},0).wait(1).to({scaleX:1.4179,scaleY:1.4145,x:270.65,y:198.25},0).wait(1).to({scaleX:1.4221,scaleY:1.4186,x:270.75},0).wait(1).to({scaleX:1.4263,scaleY:1.4228,x:270.85,y:198.3},0).wait(1).to({scaleX:1.4305,scaleY:1.427,x:270.9},0).wait(1).to({scaleX:1.4347,scaleY:1.4311,x:271},0).wait(1).to({scaleX:1.4388,scaleY:1.4353,x:271.1,y:198.35},0).wait(1).to({scaleX:1.443,scaleY:1.4395,x:271.2},0).wait(1).to({scaleX:1.4472,scaleY:1.4437,x:271.3},0).wait(1).to({scaleX:1.4514,scaleY:1.4478,x:271.4},0).wait(1).to({scaleX:1.4556,scaleY:1.452,x:271.45},0).wait(1).to({scaleX:1.4598,scaleY:1.4562,x:271.55},0).wait(1).to({scaleX:1.4639,scaleY:1.4604,x:271.65,y:198.4},0).wait(1).to({scaleX:1.4681,scaleY:1.4645,x:271.7},0).wait(1).to({scaleX:1.4723,scaleY:1.4687,x:271.8},0).wait(1).to({scaleX:1.4765,scaleY:1.4729,x:271.9,y:198.45},0).wait(1).to({scaleX:1.4807,scaleY:1.477,x:271.95,y:198.4},0).wait(1).to({scaleX:1.4848,scaleY:1.4812,x:272.05},0).wait(1).to({scaleX:1.489,scaleY:1.4854,x:272.15,y:198.45},0).wait(1).to({scaleX:1.4932,scaleY:1.4896,x:272.2},0).wait(1).to({scaleX:1.4974,scaleY:1.4937,x:272.35},0).wait(1).to({scaleX:1.5016,scaleY:1.4979,x:272.45,y:198.5},0).wait(1).to({scaleX:1.5058,scaleY:1.5021,x:272.5},0).wait(1).to({scaleX:1.5099,scaleY:1.5062,x:272.6,y:198.55},0).wait(1).to({scaleX:1.5141,scaleY:1.5104,x:272.7,y:198.5},0).wait(1).to({scaleX:1.5183,scaleY:1.5146,x:272.75},0).wait(1).to({scaleX:1.5225,scaleY:1.5188,x:272.85,y:198.55},0).wait(1).to({scaleX:1.5267,scaleY:1.5229,x:272.95},0).wait(1).to({scaleX:1.5309,scaleY:1.5271,x:273.05},0).wait(1).to({scaleX:1.535,scaleY:1.5313,x:273.1,y:198.6},0).wait(1).to({scaleX:1.5392,scaleY:1.5355,x:273.2},0).wait(1).to({scaleX:1.5434,scaleY:1.5396,x:273.3,y:198.55},0).wait(1).to({scaleX:1.5476,scaleY:1.5438,x:273.4,y:198.6},0).wait(1).to({scaleX:1.5518,scaleY:1.548,x:273.5},0).wait(1).to({scaleX:1.5559,scaleY:1.5521,x:273.6},0).wait(1).to({scaleX:1.5601,scaleY:1.5563,x:273.65,y:198.65},0).wait(1).to({scaleX:1.5643,scaleY:1.5605,x:273.75},0).wait(1).to({scaleX:1.5685,scaleY:1.5647,x:273.85},0).wait(1).to({scaleX:1.5727,scaleY:1.5688,x:273.9,y:198.7},0).wait(1).to({scaleX:1.5769,scaleY:1.573,x:274,y:198.65},0).wait(1).to({scaleX:1.581,scaleY:1.5772,x:274.1},0).wait(1).to({scaleX:1.5852,scaleY:1.5813,x:274.15,y:198.7},0).wait(1).to({scaleX:1.5894,scaleY:1.5855,x:274.25},0).wait(1).to({scaleX:1.5936,scaleY:1.5897,x:274.35},0).wait(1).to({scaleX:1.5978,scaleY:1.5939,x:274.4,y:198.75},0).wait(1).to({scaleX:1.6019,scaleY:1.598,x:274.55},0).wait(1).to({scaleX:1.6061,scaleY:1.6022,x:274.65},0).wait(1).to({scaleX:1.6103,scaleY:1.6064,x:274.7},0).wait(1).to({scaleX:1.6145,scaleY:1.6106,x:274.8},0).wait(1).to({scaleX:1.6187,scaleY:1.6147,x:274.9},0).wait(1).to({scaleX:1.6229,scaleY:1.6189,x:275,y:198.8},0).wait(8).to({scaleX:1.5137,scaleY:1.51,x:278.45,y:192.25},0).wait(1).to({scaleX:1.4046,scaleY:1.4011,x:281.9,y:185.7},0).wait(1).to({scaleX:1.2954,scaleY:1.2922,x:285.35,y:179.15},0).wait(1).to({scaleX:1.1863,scaleY:1.1834,x:288.8,y:172.6},0).wait(1).to({scaleX:1.0772,scaleY:1.0745,x:292.25,y:166.05},0).wait(1).to({scaleX:0.968,scaleY:0.9656,x:295.7,y:159.5},0).wait(1).to({scaleX:0.8589,scaleY:0.8567,x:299.15,y:152.9},0).wait(1).to({scaleX:0.7497,scaleY:0.7478,x:302.6,y:146.35},0).wait(1).to({x:301.6},0).wait(1139).to({_off:true},1).wait(7));

	// Layer_9
	this.instance_3 = new lib.whitebg("synched",0);
	this.instance_3.setTransform(278.8,199.65);
	this.instance_3._off = true;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,204,0.549)").s().p("EAl3AhhIgCAAIgSAAIgSAAIgRAAIgSAAIgZgBIgSgCIgPgDIgLAAIgLAAIgIAAIgIgBIgLgBIgLgBIgLgBIgHgCIgfAAIgfAAIgbAAIgbAAQgOgBgOgDIgQgDIi2AAIifAAIifAAIiIABQgoABgogHIgHgCIgLAAIgLAAIgLAAIgKAAIgLAAIgLAAIgLAAIgLAAQghAJgjgBIhTgBIhMAAIhIABQggABgegJIgeAAIgdAAIgaAAIgZAAQgPAAgOgDIgKgBIgEgCIgXAAIgXAAIgRgBIgRgBIgWgDIAAgBIgJAAIgIAAIgIAAIgKAAIgJAAIgLgBIgUgDIgLgBIgEgCIgFAAIgIAAIgIgBIgIAAIgIgBIgHgCIgIgCIgFAAIgJgBIgLgBIgJgBIgJgBIgKgDIgCAAIgLgCIgLgBIgLgDIgCAAIgHAAIgKAAIgJgBIgJgCIgIgCIgGgBIh+AAIhyAAIhvAAIhwgBIgwAAQgWAHgYAAIgyAAIg4AAIgoAAQgUgBgTgFIgMAAIgXAAIgWgBIgMAAIgWgDIgLgCQgdgBgdABIhEAAIg2AAIgygBIgnABIgEABQhBAIhCgCQhBgBhBAAIiCAAIh5AAIhjAAIgTAEIgUACIgUAAIgeAAIgVAAIgWAAIgJACIgJACIgJABIgKABIgKAAIgJABIgKAAIgEABIgRACIgRACIgQABIgRAAIgSAAIgRAAIgJAAIgEACQhBAHhCgBQhBgBhBgBIiBAAIh1AAIhoAAQg3ALg5gCQhBgChBAAQg8AAg8ACQg2ACg1gMQgVgFgRgOQgVgSgKgZIgIgPIgHgQQgEgJgDgIQgDgKgCgKQgDgKgBgKIgBgUIAAgLIgBgCQgIhFAChHQABhCAAhEIAAiSQAAg8gCg7QgBgwAJgwIAAgHIAAgGIAAgGIABgHIABgLIABgLIACgLIACgHIAAgHIAAgIIAAgIIABgHIABgLIABgLIADgKIAAgCIAAgMIABgFIAAgGIABgLIACgLIACgMIABhnIAAhyIAAhaIgBhjQAAgbAFgcIADgKIACgLIACgKIABgHIAAgGIAAgGIABgGIAAgHIABgKIACgLIACgLIABgYIAAgiIAAgdIAAgcQAAgOABgOQABgNAEgMIAAgtIAAguIAAgrIAAgpIABgnQgJgfABggIABhMIAAhDIgBhAQAAgaAHgaIAAgeIAAggIAAgeIAAgcIAAgcIABgKIgDgJIgCgJIgBgKIgBgKIAAgKIAAgKIgDgJIgBgJIgCgKIAAgJIAAgJIgBgKIAAgKIgCgKIgCgMIgBgKIgBgLIgCgKIgCgKIgBgKIgBgKIAAgLIAAgKIAAgIIAAgHQgGgUgBgVIAAg0IAAgpIABgoQAAgRADgRIACgLIABgVIAAgeIAAgcQgBgOACgPQABgOAEgOIAAh9IAAh8IAAhuIgBhoQAAgeAHgdIAAgHIAAgGIAAgHIABgHIABgLIABgKIACgLIACgHIAAhQIAAhOIAAg9IAAg3QABgXAJgWIACgGIABgZIAAghQgBgOABgOIADgbQACgNAGgMIAHgPIAFgHIAGgHIAGgGIADgDIAHgFIAGgGIAIgEIAHgEIAIgDIAIgEIAKgDIAKAAIAKgBIAJABIAJAAIAIACIAIADIAOgIQAHgFAIgCQAIgDAIgCQAJgBAKgBIATABIAJACIALACIAKABIALACIAHABIALAAIAHABIAGAAIALABIALACIAKADQBcAABdAAICrAAICsAAICPgBQAxgBAxAGIAHADIDDAAICsAAICrAAICTAAICSAAIAXgGQAMgCAMABIAfAAIAiAAIAhAAQASgFATgBIAngBIAqAAIAqAAIAWAAIADgBQAPgDAQgBIAdgBIAaAAIAgAAIAhAAIADgBQBDgIBEACQBBABBBAAICNAAIBxgBQAugBAtAGIAGACIARAAIASAAIAUAAIAVACIAUADIAKACIABAAIAIABIAIAAIAIADIAHACIAEABIAJACIAJABIAJAEIAJACIAHACICJABICHAAICCAAIB4AAIBEAAIADgCQAegGAeABIA3ABIA8AAIA8AAIA0AAIALAAIADgCIAJgCIAKgBIAJgBIAJAAIAKgBIAIAAIAIAAIAIAAIAJAAIADgBQAPgEAPgBIAagBIAbAAIAcAAIAdAAIAKAAIAEgBIAIgBIAJgCIAIgBIAJgBIAJAAIAKAAIAHAAIAIAAIAKgCIAJgCIAKgBIAKAAIAKgBIAGAAIAHAAIAEgBIAKgEIAKgBIAGgCIAIgBIAJgCIAIgBIAJgBIAIAAQA3gJA4gDIBxgFQAzgCAzgBIBtABIBYAAIAGgCIAGgBIAJgBIAIgBIAIgBIAIgBIAJgCIAKgCIAKgBIAJAAIAKgBIAEAAIAFgBIAGgCIAJgCIAIgBIAIAAIAIgBIAKgCIAKgBIAJgCIALgBIADgBIAHgCIALgBIALgBIALgBIAAAAIAKgDIAJgBIAJgDIAJgCIAJgCIAJgBIAKgBIAJAAIAJAAIAGAAIAGAAQAXgHAYAAIAwAAQAZABAYAGQAWAHARAOQANALAJAPQAGAMAEAMIABAGIABAGIAAAAIAEAHIADAIIADAIIACAHQAJAVABAXIAAAuIAAA0IgBAoQAAASgDARIgCAKIgBAhIAAAoIAAAqQABATgCATQgBAOgEANIAABaIAABZIAABKIAAA8IAAAtIABAEQAHAegBAeIgBA4IAAA+IAAA9IAAAwIAAAKIAEASIACATIABAUIAAAUIAAASIgBARIAAAJIADAJIACAJIABAJIABAJIAAAJIAAABIABADIACAJIABAIIAEAJQAGAcgBAcIAAA3IAAA+IAAA4IgBAvQAIAVAAAYIgBA5IAAA1IAAA1IAAA1QAKAlgCAnQgBArAAArIAABJIAABPIAAA6QAIAggBAgIgBBCIAABGIABA6QAAAfgEAfIgDAPIAAA0IAAA0IAAA5IAAAqQgBAUgGAUIAAAWIAAAVIAAATIAAATQAAAOgCAOIgEATIAAAeIAAAeIAAAdQAAAOgCANQgBANgEAMIAAAJIAAAJIAAAJIAAAKIAAAKIgBAKIgBAKIgEAUIAAAeIAAAgIAAAmIAAAdQAAAMgCALIgEAWIAAABIAAAMIgBAGIAAAGIgBALIgCAKIgCAMIAAABIgBALIAAALIAAALIAAAMIAAAKIADAJIABAJIACAKIAAAJIAAAJIABAKIAAAJIABAFIACAIIABAJIADAHIACAIIABAKIABAJIADAGIABAIIACAJIABAIIADAJIAAADIADAHIAEAHIADAHIADAIIABAIIACAJIADAHIABAFIADAHIACAIIACAIIABAIIADAJIADAJIABAAIAEAJIADAJIADAJIADAIIACAHQADANABAMIABAbIAAAlIAAAeIgBAaQgCAOgEANIgBAIIgBAHIgCAGIgDAJIgBAKIgCAHIgDAIIgDAIIgCAIIgEAJIgBAGIgDAJIgDAIIgCAIIgDAIIgDAIIgDAIIgDAIQgHALgIAKQgIAKgLAHQgLAIgOAFQgOAEgPABQgPAAgPgDQgOgDgMgIIgGAGIgHAEIgGAFIgFADIgGADIgCABIgGADIgHADIgFADIgFACIgCABIgGADIgHAFIgHAFIgEADIgGADIgJAHIgDABIgHAHIgIAFIgIAGIgFADIgGADIgIACIgHACIgIACIgIACIgHAAIgGABIgBAAIgEABIgJABIgJACIgKABIgKADIgKACIgKABIgKAAIgLABIgKAAgAJXd2IABAAIABAAIgCAAIgBAAIABAAgAuC/vIABAAIACgBIgCAAIgBABg");
	this.shape.setTransform(274.1398,200);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},247).to({state:[{t:this.instance_3}]},14).to({state:[{t:this.instance_3}]},142).to({state:[{t:this.instance_3}]},152).to({state:[{t:this.shape}]},4).wait(1260));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(247).to({_off:false},0).to({alpha:0.1992},14).to({alpha:0.1094},142).to({startPosition:0},152).to({_off:true},4).wait(1260));

	// Layer_1
	this.instance_4 = new lib.sky();
	this.instance_4.setTransform(412.85,299.8,0.55,0.7144,180,0,0,2.8,-0.7);

	this.instance_5 = new lib.sky();
	this.instance_5.setTransform(138.9,299.8,0.55,0.7144,0,180,0,2.8,-0.7);

	this.instance_6 = new lib.sky();
	this.instance_6.setTransform(412.5,100.2,0.55,0.7144,0,0,180,2.8,-0.7);

	this.instance_7 = new lib.sky();
	this.instance_7.setTransform(138.8,100.2,0.55,0.7143,0,0,0,2.6,-0.7);

	this.instance_8 = new lib.darksky();
	this.instance_8.setTransform(274.7,299.95,1.0998,0.7143,0,180,0,-1.7,-1.9);

	this.instance_9 = new lib.darksky();
	this.instance_9.setTransform(275.15,100.05,1.1001,0.7143,0,0,0,-1.7,-1.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4}]},247).to({state:[{t:this.instance_9},{t:this.instance_8}]},312).to({state:[]},1259).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(26.7,-209.4,977.6999999999999,1043.5);
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