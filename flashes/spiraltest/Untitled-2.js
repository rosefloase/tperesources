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



(lib.play = function() {
	this.initialize(img.play);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib.testbg = function() {
	this.initialize(img.testbg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,550,400);


(lib.Scene_1_bg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bg
	this.instance = new lib.testbg();
	this.instance.setTransform(0,-1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({_off:false},0).wait(221));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.play_1 = function(mode,startPosition,loop,reversed) {
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


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
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
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.skaianportalanimation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {s1:4,s2:34,s3:46,s4:53};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_33 = function() {
		this.stop();
	}
	this.frame_45 = function() {
		this.stop();
	}
	this.frame_52 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(33).call(this.frame_33).wait(12).call(this.frame_45).wait(7).call(this.frame_52).wait(127));

	// Layer_3
	this.instance = new lib.Symbol51("synched",0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#38F43D").ss(4,1,1).p("AxRqmQBsn8J9hbQJ7hcGuISQGuIRgfJDQgfJElKG6");
	this.shape.setTransform(110.6043,129.1509);
	this.shape._off = true;

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#38F43D").ss(4,1,1).p("AxTqeQBsn9KAhmQJ+hnGxIVQGwIVgnJLQgoJKlEG8");
	this.shape_1.setTransform(110.8153,128.4234);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#38F43D").ss(4,1,1).p("AxVqXQBsn8KChyQKChyGzIZQG0IZgwJRQgwJSk/G8");
	this.shape_2.setTransform(111.0383,127.6946);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#38F43D").ss(4,1,1).p("AxYqPQBtn9KFh9QKEh9G3IdQG2Idg5JYQg4JYk5G+");
	this.shape_3.setTransform(111.2728,126.9434);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#38F43D").ss(4,1,1).p("AxaqIQBsn8KIiJQKHiIG6IhQG5IghBJfQhBJfk0G/");
	this.shape_4.setTransform(111.5365,126.183);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#38F43D").ss(4,1,1).p("AxdqAQBtn9KLiTQKJiVG9IlQG8IlhJJmQhKJlkuHB");
	this.shape_5.setTransform(111.7965,125.4192);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#38F43D").ss(4,1,1).p("Axgp4QBtn9KNifQKNifG/IpQHAIohSJtQhSJskpHC");
	this.shape_6.setTransform(112.0599,124.6397);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#38F43D").ss(4,1,1).p("AxipxQBsn8KRirQKPiqHDItQHCIshbJzQhaJ0kkHC");
	this.shape_7.setTransform(112.3327,123.852);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#38F43D").ss(4,1,1).p("AxlppQBsn8KUi2QKSi2HFIxQHFIwhjJ6QhjJ6keHE");
	this.shape_8.setTransform(112.6128,123.0602);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#38F43D").ss(4,1,1).p("AxophQBsn8KWjBQKWjCHII1QHII0hsKBQhrKBkZHF");
	this.shape_9.setTransform(112.9004,122.2568);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#38F43D").ss(4,1,1).p("AxrpYQBtn9KZjMQKYjNHLI5QHLI4h0KHQh0KIkTHH");
	this.shape_10.setTransform(113.1961,121.4352);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#38F43D").ss(4,1,1).p("AxupQQBsn9KcjXQKbjZHOI9QHOI8h8KOQh9KPkOHI");
	this.shape_11.setTransform(113.5131,120.6315);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#38F43D").ss(4,1,1).p("AxxpIQBsn9KfjjQKejjHRJAQHQJAiEKVQiFKWkJHJ");
	this.shape_12.setTransform(113.8204,119.8063);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#38F43D").ss(4,1,1).p("Ax0pAQBsn8KijvQKhjvHTJFQHUJEiNKcQiOKckDHK");
	this.shape_13.setTransform(114.1336,118.967);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#38F43D").ss(4,1,1).p("Ax4o3QBtn9Kkj5QKkj7HXJJQHWJIiWKiQiVKjj+HM");
	this.shape_14.setTransform(114.4631,118.1425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#38F43D").ss(4,1,1).p("Ax7ovQBtn9KnkFQKmkFHaJMQHaJMifKpQieKqj4HN");
	this.shape_15.setTransform(114.7875,117.3002);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#38F43D").ss(4,1,1).p("Ax+omQBsn9KqkQQKqkRHcJQQHdJQinKwQinKxjzHO");
	this.shape_16.setTransform(115.117,116.4445);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#38F43D").ss(4,1,1).p("AyCoeQBtn8KtkcQKskcHfJUQHgJUiwK3QivK3jtHP");
	this.shape_17.setTransform(115.4512,115.5923);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#38F43D").ss(4,1,1).p("AyFoVQBsn9KwknQKvknHiJYQHjJXi4K+Qi4K+joHR");
	this.shape_18.setTransform(115.803,114.7495);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#38F43D").ss(4,1,1).p("AyIoNQBsn8KzkzQKykzHlJcQHlJcjALFQjALEjjHS");
	this.shape_19.setTransform(116.1476,113.8772);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#38F43D").ss(4,1,1).p("AyMoEQBtn9K1k+QK1k+HoJgQHoJgjILLQjJLMjdHT");
	this.shape_20.setTransform(116.4944,113.0147);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#38F43D").ss(4,1,1).p("AyPn8QBsn8K5lJQK3lKHrJkQHrJkjRLSQjRLSjYHU");
	this.shape_21.setTransform(116.8451,112.1592);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#38F43D").ss(4,1,1).p("AyTnzQBsn8K8lVQK6lVHuJoQHuJojaLYQjZLajTHV");
	this.shape_22.setTransform(117.2017,111.2747);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#38F43D").ss(4,1,1).p("AyXnqQBtn9K+lgQK9lgHxJsQHxJrjiLgQjiLgjNHX");
	this.shape_23.setTransform(117.5597,110.4013);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#38F43D").ss(4,1,1).p("AyanhQBsn9LBlrQLAlsH0JwQH0JwjrLmQjqLnjIHY");
	this.shape_24.setTransform(117.9318,109.5197);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#38F43D").ss(4,1,1).p("AyenYQBsn9LEl2QLDl3H3J0QH3JzjzLtQj0LujCHZ");
	this.shape_25.setTransform(118.3077,108.6398);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#38F43D").ss(4,1,1).p("AyinQQBtn8LHmCQLFmCH6J3QH6J3j8L0Qj7L1i9Ha");
	this.shape_26.setTransform(118.6778,107.7533);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#38F43D").ss(4,1,1).p("AylnHQBsn8LKmNQLJmOH8J8QH9J7kEL6QkEL8i4Hb");
	this.shape_27.setTransform(119.0482,106.8652);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#38F43D").ss(4,1,1).p("Aypm+QBsn8LNmZQLLmZIAKAQH/J/kMMBQkNMCiyHd");
	this.shape_28.setTransform(119.421,105.9649);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#38F43D").ss(4,1,1).p("AzOmkQBtn9LOm+QLNm+IrLBQIrLBkoLmQkoLmjVHc");
	this.shape_29.setTransform(123.0872,103.4221);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#38F43D").ss(4,1,1).p("AzzmLQBtn8LQnkQLPnkJWMEQJWMDlDLKQlELLj4HZ");
	this.shape_30.setTransform(126.7534,100.8708);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#38F43D").ss(4,1,1).p("A0XlxQBsn9LSoJQLRoJKBNFQKCNFlfKvQlgKvkbHY");
	this.shape_31.setTransform(130.418,98.3153);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#38F43D").ss(4,1,1).p("A08lYQBtn8LTovQLTovKtOHQKtOHl7KTQl7KUk+HW");
	this.shape_32.setTransform(134.0751,95.7632);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#38F43D").ss(4,1,1).p("A1gk+QBsn9LWpUQLUpULYPJQLZPJmXJ3QmXJ4lhHV");
	this.shape_33.setTransform(137.7441,93.2108);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#38F43D").ss(4,1,1).p("A2FkkQBsn9LXp6QLWp6MEQMQMEQKmyJcQmzJdmEHT");
	this.shape_34.setTransform(141.4124,90.6368);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#38F43D").ss(4,1,1).p("A2qkLQBtn8LZqgQLXqfMwRNQMvRMnOJBQnPJBmmHR");
	this.shape_35.setTransform(145.0822,88.0839);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#38F43D").ss(4,1,1).p("A3OjxQBsn9LbrFQLZrFNbSQQNaSOnpIlQnqIlnKHQ");
	this.shape_36.setTransform(148.7409,85.5309);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#38F43D").ss(4,1,1).p("A3zjYQBsn8LdrrQLbrqOGTRQOGTQoGIKQoFIJntHO");
	this.shape_37.setTransform(152.4081,82.9742);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#38F43D").ss(4,1,1).p("A4Yi+QBtn9LesQQLdsQOxUTQOxUSogHuQoiHvoPHM");
	this.shape_38.setTransform(156.0773,80.4209);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#38F43D").ss(4,1,1).p("A48ilQBsn8Lgs2QLgs1PbVVQPdVUo9HSQo8HTozHK");
	this.shape_39.setTransform(159.7409,77.869);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#38F43D").ss(4,1,1).p("A48ilQBsn8Lgs2QLgs1PcVVQPcVUo8HSQo9HTozHK");
	this.shape_40.setTransform(159.7483,77.8675);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#38F43D").ss(4,1,1).p("A4Pl9QBtn8K1oGQK1oFO9PCQO+PCnFH5QnGH5qOJC");
	this.shape_41.setTransform(155.1602,99.4525);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#38F43D").ss(4,1,1).p("A3kpSQBsn8KLjWQKKjVOfIvQOgIwlPIfQlPIgrqK6");
	this.shape_42.setTransform(150.9446,120.7516);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#38F43D").ss(4,1,1).p("A2/sAQBsn9JgBbQJgBaOACdQOBCdjXJHQjYJGtGMy");
	this.shape_43.setTransform(147.2372,138.2163);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#38F43D").ss(4,1,1).p("A2itJQBtn8I1GKQI1GLNij2QNjj2hhJuQhhJtuhOp");
	this.shape_44.setTransform(144.2633,145.4826);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#38F43D").ss(4,1,1).p("A2PttQBsn8ILK6QIKK6NEqIQNEqJAWKVQAWKUv9Qh");
	this.shape_45.setTransform(142.4234,149.0886);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#38F43D").ss(4,1,1).p("A2ItrQBtn9INKoQINKoM6ptQM6ptAVKTQAVKSvsQT");
	this.shape_46.setTransform(141.6705,148.9173);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#38F43D").ss(4,1,1).p("A2AtpQBtn9IQKVQIQKVMwpQQMwpRAUKRQATKQvbQE");
	this.shape_47.setTransform(140.8939,148.7452);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#38F43D").ss(4,1,1).p("A14toQBsn8ITKCQITKCMmo0QMno1ASKPQASKOvLP1");
	this.shape_48.setTransform(140.1414,148.5626);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#38F43D").ss(4,1,1).p("A1xtmQBtn8IVJvQIVJvMdoYQMeoZAQKOQARKMu6Pm");
	this.shape_49.setTransform(139.3649,148.379);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#38F43D").ss(4,1,1).p("A1ptkQBsn8IYJcQIYJdMTn9QMUn8AQKLQAPKKuqPY");
	this.shape_50.setTransform(138.6126,148.184);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#38F43D").ss(4,1,1).p("A1itiQBtn8IbJJQIaJKMKngQMKnhAOKKQAPKIuaPJ");
	this.shape_51.setTransform(137.8612,147.9823);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#38F43D").ss(4,1,1).p("A1atgQBtn8IdI3QIeI2L/nEQMBnEANKHQANKHuJO6");
	this.shape_52.setTransform(137.0849,147.779);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#38F43D").ss(4,1,1).p("A1SteQBsn8IgIkQIhIkL2moQL2mpAMKGQAMKEt5Os");
	this.shape_53.setTransform(136.333,147.5628);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#38F43D").ss(4,1,1).p("A1LtbQBtn9IjISQIjIRLsmMQLtmNALKEQAKKDtoOd");
	this.shape_54.setTransform(135.5812,147.3447);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#38F43D").ss(4,1,1).p("A1DtZQBsn9ImH/QImH+LilwQLjlwAKKBQAJKBtYOP");
	this.shape_55.setTransform(134.8052,147.1125);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#38F43D").ss(4,1,1).p("A08tXQBtn8IoHrQIoHsLalUQLZlUAIKAQAIJ+tHOA");
	this.shape_56.setTransform(134.0538,146.8714);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#38F43D").ss(4,1,1).p("A00tUQBtn9IrHZQIrHZLPk4QLQk4AHJ+QAHJ8s3Ny");
	this.shape_57.setTransform(133.278,146.6277);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#38F43D").ss(4,1,1).p("A0stSQBsn8IuHGQIuHGLFkcQLHkcAFJ8QAGJ7snNi");
	this.shape_58.setTransform(132.5269,146.3677);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#38F43D").ss(4,1,1).p("A0ltPQBtn9IwG0QIxGzK8kAQK8kAAFJ6QAEJ5sWNU");
	this.shape_59.setTransform(131.776,146.1044);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#38F43D").ss(4,1,1).p("A0dtMQBsn9IzGhQI0GgKyjkQKzjkADJ4QADJ3sGNG");
	this.shape_60.setTransform(131.0006,145.8231);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#38F43D").ss(4,1,1).p("A0WtJQBtn9I2GOQI2GOKojIQKpjIACJ2QACJ1r1M3");
	this.shape_61.setTransform(130.2503,145.53);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#38F43D").ss(4,1,1).p("A0OtGQBsn9I5F7QI5F7KfisQKfisABJ0QAAJ0rlMo");
	this.shape_62.setTransform(129.5,145.2326);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#38F43D").ss(4,1,1).p("A0GtDQBsn9I8FoQI7FoKViPQKWiQgBJyQAAJxrVMa");
	this.shape_63.setTransform(128.7251,144.9139);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#38F43D").ss(4,1,1).p("Az/tAQBtn8I+FVQI+FVKMhzQKMh0gCJwQgCJvrEML");
	this.shape_64.setTransform(127.9753,144.5899);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#38F43D").ss(4,1,1).p("Az3s8QBsn9JBFDQJBFCKChXQKChYgDJuQgDJuq0L8");
	this.shape_65.setTransform(127.201,144.2421);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#38F43D").ss(4,1,1).p("Azws5QBtn8JDEwQJDEvJ5g7QJ5g8gFJsQgEJsqjLt");
	this.shape_66.setTransform(126.4516,143.8879);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#38F43D").ss(4,1,1).p("Azos1QBsn9JGEdQJGEdJvggQJvgggFJrQgGJqqTLf");
	this.shape_67.setTransform(125.7024,143.5068);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#38F43D").ss(4,1,1).p("AzgsxQBsn9JJEKQJIEKJmgDQJlgEgHJpQgHJoqCLQ");
	this.shape_68.setTransform(124.929,143.1072);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#38F43D").ss(4,1,1).p("AzZstQBtn8JLD3QJLD3JcAZQJcAYgIJnQgJJmpxLB");
	this.shape_69.setTransform(124.1802,142.6987);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#38F43D").ss(4,1,1).p("AzRspQBsn8JPDkQJNDlJSA0QJTA0gKJmQgKJjphKz");
	this.shape_70.setTransform(123.4083,142.2578);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#38F43D").ss(4,1,1).p("AzKskQBtn9JRDSQJQDRJJBRQJIBQgLJkQgLJhpQKl");
	this.shape_71.setTransform(122.6602,141.8061);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#38F43D").ss(4,1,1).p("AzCsfQBsn9JUC/QJTC/I/BtQI/BsgMJhQgMJgpBKW");
	this.shape_72.setTransform(121.9123,141.3174);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#38F43D").ss(4,1,1).p("Ay6saQBsn9JXCsQJVCsI2CJQI1CIgOJgQgNJeowKH");
	this.shape_73.setTransform(121.1408,140.8013);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#38F43D").ss(4,1,1).p("AyzsVQBtn8JZCZQJYCZIsClQIrCkgOJeQgPJcofJ4");
	this.shape_74.setTransform(120.3935,140.2704);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#38F43D").ss(4,1,1).p("AyrsPQBsn8JcCGQJbCHIiDAQIiDBgQJbQgQJboPJp");
	this.shape_75.setTransform(119.6464,139.6933);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#38F43D").ss(4,1,1).p("AyksJQBtn8JeB0QJeBzIYDdQIYDcgRJaQgRJYn+Jb");
	this.shape_76.setTransform(118.8761,139.0977);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#38F43D").ss(4,1,1).p("AycsCQBsn9JiBhQJgBhIPD5QIOD4gSJXQgTJXnuJN");
	this.shape_77.setTransform(118.1314,138.448);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#38F43D").ss(4,1,1).p("AyVr8QBtn8JkBOQJjBOIFEVQIFEUgUJVQgUJVndI+");
	this.shape_78.setTransform(117.3622,137.7563);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#38F43D").ss(4,1,1).p("AyNr0QBsn9JnA8QJmA7H7ExQH7EwgVJTQgVJUnNIv");
	this.shape_79.setTransform(116.6168,137.0384);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#38F43D").ss(4,1,1).p("AyGrtQBtn8JpAoQJpApHyFNQHxFMgWJRQgXJSm8Ig");
	this.shape_80.setTransform(115.8716,136.2506);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#38F43D").ss(4,1,1).p("Ax+rkQBsn9JsAWQJsAVHoFqQHnFogXJPQgYJQmsIS");
	this.shape_81.setTransform(115.104,135.4294);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#38F43D").ss(4,1,1).p("Ax3rbQBtn9JvADQJuADHeGFQHeGFgZJNQgYJOmcID");
	this.shape_82.setTransform(114.3598,134.5241);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#38F43D").ss(4,1,1).p("AxvrRQBsn9JygQQJxgQHUGhQHUGhgZJLQgaJMmMH1");
	this.shape_83.setTransform(113.6159,133.5454);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#38F43D").ss(4,1,1).p("AxorHQBtn9J0giQJzgjHLG9QHLG9gbJJQgbJKl7Hm");
	this.shape_84.setTransform(112.8527,132.5224);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#38F43D").ss(4,1,1).p("Axgq8QBsn9J3g1QJ2g2HCHZQHBHZgdJIQgcJHlrHY");
	this.shape_85.setTransform(112.1101,131.4236);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#38F43D").ss(4,1,1).p("AxYqxQBsn9J6hIQJ5hJG3H2QG4H1geJFQgeJGlaHJ");
	this.shape_86.setTransform(111.3459,130.3112);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},4).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28,p:{x:119.421,y:105.9649}}]},1).to({state:[{t:this.shape_28,p:{x:119.4213,y:105.9728}}]},1).to({state:[{t:this.shape_28,p:{x:119.421,y:105.9649}}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4).to({_off:false},0).to({_off:true},1).wait(90).to({_off:false},0).wait(82).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-104.5,323.5,364.8);


(lib.Symbol73 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {idle:0,twist1:2,twist2:4,twist3:6,twist4:8};
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
		
		_this.l1.gotoAndPlay('s2');
		_this.l2.gotoAndPlay('s2');
		_this.l3.gotoAndPlay('s2');
		_this.l4.gotoAndPlay('s2');
		_this.l5.gotoAndPlay('s2');
		_this.l6.gotoAndPlay('s2');
		_this.l7.gotoAndPlay('s2');
		_this.l8.gotoAndPlay('s2');
		_this.l9.gotoAndPlay('s2');
		_this.l10.gotoAndPlay('s2');
		_this.r1.gotoAndPlay('s2');
		_this.r2.gotoAndPlay('s2');
		_this.r3.gotoAndPlay('s2');
		_this.r4.gotoAndPlay('s2');
		_this.r5.gotoAndPlay('s2');
		_this.r6.gotoAndPlay('s2');
		_this.r7.gotoAndPlay('s2');
		_this.r8.gotoAndPlay('s2');
		_this.r9.gotoAndPlay('s2');
		_this.r10.gotoAndPlay('s2');
	}
	this.frame_5 = function() {
		this.stop();
	}
	this.frame_6 = function() {
		var _this = this;
		
		_this.l1.gotoAndPlay('s3');
		_this.l2.gotoAndPlay('s3');
		_this.l3.gotoAndPlay('s3');
		_this.l4.gotoAndPlay('s3');
		_this.l5.gotoAndPlay('s3');
		_this.l6.gotoAndPlay('s3');
		_this.l7.gotoAndPlay('s3');
		_this.l8.gotoAndPlay('s3');
		_this.l9.gotoAndPlay('s3');
		_this.l10.gotoAndPlay('s3');
		_this.r1.gotoAndPlay('s3');
		_this.r2.gotoAndPlay('s3');
		_this.r3.gotoAndPlay('s3');
		_this.r4.gotoAndPlay('s3');
		_this.r5.gotoAndPlay('s3');
		_this.r6.gotoAndPlay('s3');
		_this.r7.gotoAndPlay('s3');
		_this.r8.gotoAndPlay('s3');
		_this.r9.gotoAndPlay('s3');
		_this.r10.gotoAndPlay('s3');
	}
	this.frame_7 = function() {
		this.stop();
	}
	this.frame_8 = function() {
		var _this = this;
		
		_this.l1.gotoAndPlay('s4');
		_this.l2.gotoAndPlay('s4');
		_this.l3.gotoAndPlay('s4');
		_this.l4.gotoAndPlay('s4');
		_this.l5.gotoAndPlay('s4');
		_this.l6.gotoAndPlay('s4');
		_this.l7.gotoAndPlay('s4');
		_this.l8.gotoAndPlay('s4');
		_this.l9.gotoAndPlay('s4');
		_this.l10.gotoAndPlay('s4');
		_this.r1.gotoAndPlay('s4');
		_this.r2.gotoAndPlay('s4');
		_this.r3.gotoAndPlay('s4');
		_this.r4.gotoAndPlay('s4');
		_this.r5.gotoAndPlay('s4');
		_this.r6.gotoAndPlay('s4');
		_this.r7.gotoAndPlay('s4');
		_this.r8.gotoAndPlay('s4');
		_this.r9.gotoAndPlay('s4');
		_this.r10.gotoAndPlay('s4');
	}
	this.frame_9 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1).call(this.frame_5).wait(1).call(this.frame_6).wait(1).call(this.frame_7).wait(1).call(this.frame_8).wait(1).call(this.frame_9).wait(346));

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
	this.inner.setTransform(-11,4.1,0.8055,0.8043,0,0,0,241.5,229.9);

	
	var _tweenStr_0 = cjs.Tween.get(this.inner).wait(1).to({regX:241.7,regY:230.1,rotation:0.7516,x:-10.85,y:4.3},0).wait(1).to({scaleX:0.8056,rotation:1.5031,x:-10.8},0).wait(1).to({rotation:2.2547,x:-10.85},0).wait(1).to({rotation:3.0063,x:-10.8,y:4.25},0).wait(1).to({rotation:3.7578,x:-10.85},0).wait(1).to({scaleX:0.8055,rotation:4.5094,y:4.3},0).wait(1).to({rotation:5.261,x:-10.8},0).wait(1).to({rotation:6.0125,x:-10.85},0).wait(1).to({scaleX:0.8056,rotation:6.7641,y:4.35},0).wait(1).to({rotation:7.5157,x:-10.8,y:4.3},0).wait(1).to({rotation:8.2672,x:-10.85},0).wait(1).to({scaleX:0.8055,rotation:9.0188},0).wait(1).to({rotation:9.7704,y:4.35},0).wait(1).to({rotation:10.5219,x:-10.9,y:4.3},0).wait(1).to({rotation:11.2735,x:-10.85},0).wait(1).to({scaleX:0.8056,rotation:12.0251},0).wait(1).to({rotation:12.7766,y:4.35},0).wait(1).to({rotation:13.5282},0).wait(1).to({scaleX:0.8055,rotation:14.2797,y:4.3},0).wait(1).to({rotation:15.0313,y:4.35},0).wait(1).to({rotation:15.7829,x:-10.9},0).wait(1).to({rotation:16.5344,x:-10.85,y:4.3},0).wait(1).to({rotation:17.286,x:-10.9},0).wait(1).to({rotation:18.0376,x:-10.85},0).wait(1).to({scaleX:0.8056,rotation:18.7891,x:-10.9},0).wait(1).to({rotation:19.5407,x:-10.85},0).wait(1).to({scaleX:0.8055,rotation:20.2923,x:-10.9,y:4.35},0).wait(1).to({scaleX:0.8056,rotation:21.0438},0).wait(1).to({scaleX:0.8055,rotation:21.7954,x:-10.85},0).wait(1).to({rotation:22.547,x:-10.9,y:4.3},0).wait(1).to({rotation:23.2985,x:-10.95,y:4.35},0).wait(1).to({scaleX:0.8056,rotation:24.0501,x:-10.9},0).wait(1).to({rotation:24.8017,y:4.3},0).wait(1).to({scaleX:0.8055,rotation:25.5532,x:-10.95,y:4.35},0).wait(1).to({scaleX:0.8056,rotation:26.3048,x:-10.9},0).wait(1).to({scaleX:0.8055,rotation:27.0564,x:-10.95,y:4.3},0).wait(1).to({rotation:27.8079,y:4.35},0).wait(1).to({rotation:28.5595,x:-10.9},0).wait(1).to({rotation:29.3111,x:-10.95,y:4.3},0).wait(1).to({rotation:30.0626,y:4.35},0).wait(1).to({rotation:30.8142},0).wait(1).to({rotation:31.5658},0).wait(1).to({rotation:32.3173},0).wait(1).to({rotation:33.0689},0).wait(1).to({rotation:33.8205},0).wait(1).to({rotation:34.572,y:4.4},0).wait(1).to({rotation:35.3236,y:4.35},0).wait(1).to({rotation:36.0752,x:-11,y:4.4},0).wait(1).to({rotation:36.8267,x:-10.95,y:4.35},0).wait(1).to({rotation:37.5783},0).wait(1).to({rotation:38.3299,y:4.4},0).wait(1).to({rotation:39.0814,y:4.35},0).wait(1).to({rotation:39.833,x:-11,y:4.3},0).wait(1).to({rotation:40.5846,y:4.35},0).wait(1).to({rotation:41.3361},0).wait(1).to({rotation:42.0877,x:-10.95},0).wait(1).to({rotation:42.8392,x:-11},0).wait(1).to({rotation:43.5908},0).wait(1).to({rotation:44.3424,x:-10.95},0).wait(1).to({rotation:45.0939,x:-11},0).wait(1).to({rotation:45.8455,x:-11.05},0).wait(1).to({rotation:46.5971,x:-10.95},0).wait(1).to({rotation:47.3486,x:-11},0).wait(1).to({rotation:48.1002,x:-10.95},0).wait(1).to({rotation:48.8518,x:-11.05},0).wait(1).to({rotation:49.6033,y:4.4},0).wait(1).to({rotation:50.3549,x:-11.1,y:4.35},0).wait(1).to({rotation:51.1065,x:-11.05},0).wait(1).to({rotation:51.858,y:4.4},0).wait(1).to({rotation:52.6096},0).wait(1).to({rotation:53.3612},0).wait(1).to({rotation:54.1127},0).wait(1).to({rotation:54.8643,x:-11.1,y:4.3},0).wait(1).to({rotation:55.6159,y:4.35},0).wait(1).to({rotation:56.3674},0).wait(1).to({rotation:57.119,x:-11.05,y:4.3},0).wait(1).to({rotation:57.8706,x:-11.1,y:4.4},0).wait(1).to({rotation:58.6221,y:4.3},0).wait(1).to({rotation:59.3737,y:4.4},0).wait(1).to({rotation:60.1253,y:4.35},0).wait(1).to({rotation:60.8768},0).wait(1).to({rotation:61.6284,x:-11.15},0).wait(1).to({scaleX:0.8056,rotation:62.38},0).wait(1).to({scaleX:0.8055,rotation:63.1315,x:-11.1,y:4.4},0).wait(1).to({scaleX:0.8056,rotation:63.8831,y:4.3},0).wait(1).to({rotation:64.6347,x:-11.15,y:4.4},0).wait(1).to({rotation:65.3862,x:-11.1,y:4.35},0).wait(1).to({scaleX:0.8055,rotation:66.1378,x:-11.15,y:4.3},0).wait(1).to({scaleX:0.8056,rotation:66.8894,x:-11.1,y:4.35},0).wait(1).to({scaleX:0.8055,rotation:67.6409,x:-11.15},0).wait(1).to({rotation:68.3925,x:-11.1,y:4.3},0).wait(1).to({scaleX:0.8056,rotation:69.1441,x:-11.15,y:4.35},0).wait(1).to({scaleX:0.8055,rotation:69.8956},0).wait(1).to({scaleX:0.8056,rotation:70.6472},0).wait(1).to({rotation:71.3987},0).wait(1).to({rotation:72.1503,x:-11.1},0).wait(1).to({scaleX:0.8055,rotation:72.9019,x:-11.15},0).wait(1).to({rotation:73.6534},0).wait(1).to({rotation:74.405},0).wait(1).to({rotation:75.1566,y:4.3},0).wait(1).to({rotation:75.9081,y:4.35},0).wait(1).to({rotation:76.6597},0).wait(1).to({scaleX:0.8056,rotation:77.4113,x:-11.1,y:4.3},0).wait(1).to({rotation:78.1628,x:-11.15},0).wait(1).to({rotation:78.9144},0).wait(1).to({rotation:79.666,x:-11.1,y:4.35},0).wait(1).to({scaleX:0.8055,rotation:80.4175,x:-11.2},0).wait(1).to({rotation:81.1691,y:4.3},0).wait(1).to({rotation:81.9207},0).wait(1).to({rotation:82.6722,x:-11.15},0).wait(1).to({scaleX:0.8056,rotation:83.4238},0).wait(1).to({rotation:84.1754,y:4.35},0).wait(1).to({rotation:84.9269,x:-11.2,y:4.3},0).wait(1).to({scaleX:0.8055,rotation:85.6785},0).wait(1).to({rotation:86.4301,y:4.25},0).wait(1).to({rotation:87.1816,y:4.3},0).wait(1).to({scaleX:0.8056,rotation:87.9332,y:4.25},0).wait(1).to({rotation:88.6848,y:4.3},0).wait(1).to({rotation:89.4363},0).wait(1).to({scaleX:0.8055,rotation:90.1879},0).wait(1).to({rotation:90.9395,y:4.25},0).wait(1).to({rotation:91.691,y:4.3},0).wait(1).to({scaleX:0.8056,rotation:92.4426,y:4.25},0).wait(1).to({rotation:93.1942,y:4.3},0).wait(1).to({rotation:93.9457,x:-11.25},0).wait(1).to({rotation:94.6973,x:-11.2},0).wait(1).to({scaleX:0.8055,rotation:95.4489,x:-11.25},0).wait(1).to({rotation:96.2004,y:4.25},0).wait(1).to({rotation:96.952,x:-11.2},0).wait(1).to({scaleX:0.8056,rotation:97.7035,y:4.3},0).wait(1).to({rotation:98.4551,x:-11.25},0).wait(1).to({rotation:99.2067},0).wait(1).to({scaleX:0.8055,rotation:99.9582,x:-11.2,y:4.25},0).wait(1).to({rotation:100.7098,x:-11.25},0).wait(1).to({rotation:101.4614},0).wait(1).to({rotation:102.2129},0).wait(1).to({scaleX:0.8056,rotation:102.9645,y:4.3},0).wait(1).to({rotation:103.7161,x:-11.2,y:4.25},0).wait(1).to({rotation:104.4676,x:-11.25,y:4.2},0).wait(1).to({rotation:105.2192},0).wait(1).to({rotation:105.9708,y:4.3},0).wait(1).to({scaleX:0.8055,rotation:106.7223,x:-11.2,y:4.2},0).wait(1).to({rotation:107.4739,x:-11.25,y:4.25},0).wait(1).to({rotation:108.2255},0).wait(1).to({rotation:108.977,x:-11.2,y:4.2},0).wait(1).to({rotation:109.7286,y:4.25},0).wait(1).to({rotation:110.4802},0).wait(1).to({rotation:111.2317,x:-11.25},0).wait(1).to({rotation:111.9833,y:4.2},0).wait(1).to({rotation:112.7349},0).wait(1).to({rotation:113.4864},0).wait(1).to({rotation:114.238},0).wait(1).to({rotation:114.9896,y:4.15},0).wait(1).to({rotation:115.7411,y:4.25},0).wait(1).to({rotation:116.4927,y:4.2},0).wait(1).to({rotation:117.2443,x:-11.3},0).wait(1).to({rotation:117.9958,x:-11.25},0).wait(1).to({rotation:118.7474},0).wait(1).to({rotation:119.499,y:4.15},0).wait(1).to({rotation:120.2505,y:4.2},0).wait(1).to({scaleX:0.8056,rotation:121.0021,x:-11.3},0).wait(1).to({scaleX:0.8055,rotation:121.7537,x:-11.2,y:4.15},0).wait(1).to({rotation:122.5052,x:-11.3,y:4.2},0).wait(1).to({rotation:123.2568,x:-11.25,y:4.15},0).wait(1).to({rotation:124.0084,y:4.2},0).wait(1).to({rotation:124.7599},0).wait(1).to({rotation:125.5115},0).wait(1).to({rotation:126.263,x:-11.2},0).wait(1).to({rotation:127.0146,y:4.15},0).wait(1).to({rotation:127.7662,x:-11.25},0).wait(1).to({rotation:128.5177,y:4.2},0).wait(1).to({rotation:129.2693,x:-11.3,y:4.15},0).wait(1).to({rotation:130.0209},0).wait(1).to({rotation:130.7724,x:-11.25},0).wait(1).to({rotation:131.524,y:4.1},0).wait(1).to({rotation:132.2756,y:4.15},0).wait(1).to({rotation:133.0271},0).wait(1).to({rotation:133.7787,y:4.1},0).wait(1).to({rotation:134.5303,x:-11.3},0).wait(1).to({rotation:135.2818,x:-11.25,y:4.15},0).wait(1).to({rotation:136.0334,x:-11.3,y:4.05},0).wait(1).to({rotation:136.785,x:-11.25},0).wait(1).to({rotation:137.5365,x:-11.3},0).wait(1).to({rotation:138.2881},0).wait(1).to({rotation:139.0397,x:-11.25,y:4.1},0).wait(1).to({rotation:139.7912,y:4.05},0).wait(1).to({rotation:140.5428,x:-11.2},0).wait(1).to({rotation:141.2944,x:-11.3,y:4.1},0).wait(1).to({rotation:142.0459,x:-11.2,y:4.05},0).wait(1).to({rotation:142.7975,x:-11.3},0).wait(1).to({rotation:143.5491,x:-11.25,y:4.1},0).wait(1).to({rotation:144.3006,y:4.05},0).wait(1).to({rotation:145.0522},0).wait(1).to({rotation:145.8038},0).wait(1).to({rotation:146.5553,y:4},0).wait(1).to({rotation:147.3069},0).wait(1).to({rotation:148.0585},0).wait(1).to({rotation:148.81,y:4.05},0).wait(1).to({rotation:149.5616},0).wait(1).to({rotation:150.3132,y:3.95},0).wait(1).to({scaleX:0.8056,rotation:151.0647,y:4.05},0).wait(1).to({rotation:151.8163,y:4},0).wait(1).to({scaleX:0.8055,rotation:152.5678,y:4.05},0).wait(1).to({rotation:153.3194,y:4},0).wait(1).to({rotation:154.071},0).wait(1).to({rotation:154.8225},0).wait(1).to({rotation:155.5741},0).wait(1).to({rotation:156.3257,x:-11.2},0).wait(1).to({rotation:157.0772,x:-11.25},0).wait(1).to({rotation:157.8288,y:3.95},0).wait(1).to({rotation:158.5804,y:4},0).wait(1).to({rotation:159.3319,x:-11.2},0).wait(1).to({scaleX:0.8056,rotation:160.0835,x:-11.25,y:3.95},0).wait(1).to({rotation:160.8351,y:4},0).wait(1).to({scaleX:0.8055,rotation:161.5866},0).wait(1).to({scaleX:0.8056,rotation:162.3382,x:-11.2,y:3.95},0).wait(1).to({rotation:163.0898,x:-11.25,y:4},0).wait(1).to({rotation:163.8413,x:-11.2},0).wait(1).to({rotation:164.5929,y:3.95},0).wait(1).to({rotation:165.3445},0).wait(1).to({rotation:166.096,y:4},0).wait(1).to({scaleX:0.8055,rotation:166.8476,x:-11.25},0).wait(1).to({rotation:167.5992,y:3.95},0).wait(1).to({scaleX:0.8056,rotation:168.3507,x:-11.2},0).wait(1).to({rotation:169.1023,x:-11.25},0).wait(1).to({rotation:169.8539,x:-11.2,y:4},0).wait(1).to({rotation:170.6054,y:3.95},0).wait(1).to({rotation:171.357},0).wait(1).to({scaleX:0.8055,rotation:172.1086,y:4},0).wait(1).to({rotation:172.8601,y:3.95},0).wait(1).to({rotation:173.6117,x:-11.25},0).wait(1).to({scaleX:0.8056,rotation:174.3633,y:3.9},0).wait(1).to({rotation:175.1148,x:-11.2,y:3.95},0).wait(1).to({rotation:175.8664,x:-11.25},0).wait(1).to({rotation:176.618,x:-11.2},0).wait(1).to({scaleX:0.8055,rotation:177.3695},0).wait(1).to({rotation:178.1211},0).wait(1).to({scaleX:0.8056,rotation:178.8727},0).wait(1).to({rotation:179.6242},0).wait(1).to({rotation:180.3758,y:3.9},0).wait(1).to({rotation:181.1273,x:-11.15},0).wait(1).to({scaleX:0.8055,rotation:181.8789,x:-11.2},0).wait(1).to({rotation:182.6305},0).wait(1).to({scaleX:0.8056,rotation:183.382},0).wait(1).to({rotation:184.1336},0).wait(1).to({rotation:184.8852},0).wait(1).to({rotation:185.6367,x:-11.15},0).wait(1).to({scaleX:0.8055,rotation:186.3883,x:-11.2,y:3.95},0).wait(1).to({rotation:187.1399,y:3.9},0).wait(1).to({rotation:187.8914},0).wait(1).to({scaleX:0.8056,rotation:188.643,y:3.95},0).wait(1).to({rotation:189.3946,y:3.85},0).wait(1).to({rotation:190.1461,x:-11.15,y:3.9},0).wait(1).to({rotation:190.8977},0).wait(1).to({rotation:191.6493,x:-11.2},0).wait(1).to({scaleX:0.8055,rotation:192.4008,x:-11.15},0).wait(1).to({rotation:193.1524,x:-11.2},0).wait(1).to({scaleX:0.8056,rotation:193.904,y:3.85},0).wait(1).to({rotation:194.6555,x:-11.15,y:3.9},0).wait(1).to({rotation:195.4071,y:3.95},0).wait(1).to({rotation:196.1587,y:3.9},0).wait(1).to({rotation:196.9102},0).wait(1).to({rotation:197.6618,x:-11.1},0).wait(1).to({scaleX:0.8055,rotation:198.4134,x:-11.15,y:3.85},0).wait(1).to({scaleX:0.8056,rotation:199.1649,y:3.9},0).wait(1).to({rotation:199.9165,x:-11.1},0).wait(1).to({scaleX:0.8055,rotation:200.6681,x:-11.15},0).wait(1).to({rotation:201.4196,x:-11.1,y:3.85},0).wait(1).to({rotation:202.1712,y:3.9},0).wait(1).to({rotation:202.9228,y:3.85},0).wait(1).to({rotation:203.6743},0).wait(1).to({rotation:204.4259,x:-11.05,y:3.9},0).wait(1).to({rotation:205.1775,x:-11.1,y:3.85},0).wait(1).to({rotation:205.929,x:-11.15},0).wait(1).to({rotation:206.6806,x:-11.1,y:3.9},0).wait(1).to({rotation:207.4322,y:3.85},0).wait(1).to({scaleX:0.8056,rotation:208.1837},0).wait(1).to({rotation:208.9353,y:3.9},0).wait(1).to({scaleX:0.8055,rotation:209.6868,y:3.85},0).wait(1).to({rotation:210.4384},0).wait(1).to({rotation:211.19},0).wait(1).to({rotation:211.9415},0).wait(1).to({rotation:212.6931},0).wait(1).to({rotation:213.4447,x:-11.05},0).wait(1).to({rotation:214.1962,x:-11.1,y:3.9},0).wait(1).to({rotation:214.9478,y:3.85},0).wait(1).to({rotation:215.6994,x:-11.05},0).wait(1).to({rotation:216.4509},0).wait(1).to({rotation:217.2025,x:-11.1,y:3.9},0).wait(1).to({rotation:217.9541,x:-11.05,y:3.85},0).wait(1).to({rotation:218.7056,y:3.9},0).wait(1).to({rotation:219.4572,y:3.85},0).wait(1).to({rotation:220.2088,x:-11.1},0).wait(1).to({rotation:220.9603},0).wait(1).to({rotation:221.7119,x:-11.05},0).wait(1).to({rotation:222.4635},0).wait(1).to({rotation:223.215},0).wait(1).to({rotation:223.9666,y:3.9},0).wait(1).to({rotation:224.7182,x:-11,y:3.85},0).wait(1).to({rotation:225.4697},0).wait(1).to({rotation:226.2213,y:3.9},0).wait(1).to({rotation:226.9729,x:-10.95,y:3.8},0).wait(1).to({rotation:227.7244,y:3.85},0).wait(1).to({rotation:228.476},0).wait(1).to({rotation:229.2276,x:-11},0).wait(1).to({rotation:229.9791,x:-10.95},0).wait(1).to({rotation:230.7307},0).wait(1).to({rotation:231.4823},0).wait(1).to({rotation:232.2338},0).wait(1).to({rotation:232.9854,y:3.9},0).wait(1).to({rotation:233.737,y:3.85},0).wait(1).to({rotation:234.4885},0).wait(1).to({rotation:235.2401,y:3.9},0).wait(1).to({rotation:235.9916,y:3.85},0).wait(1).to({rotation:236.7432},0).wait(1).to({rotation:237.4948},0).wait(1).to({rotation:238.2463},0).wait(1).to({scaleX:0.8056,rotation:238.9979},0).wait(1).to({scaleX:0.8055,rotation:239.7495},0).wait(1).to({rotation:240.501,x:-10.9},0).wait(1).to({rotation:241.2526,x:-10.95},0).wait(1).to({rotation:242.0042,y:3.9},0).wait(1).to({rotation:242.7557},0).wait(1).to({rotation:243.5073,x:-10.9},0).wait(1).to({rotation:244.2589,y:3.85},0).wait(1).to({rotation:245.0104},0).wait(1).to({rotation:245.762,x:-10.95},0).wait(1).to({rotation:246.5136,x:-10.9,y:3.9},0).wait(1).to({rotation:247.2651},0).wait(1).to({rotation:248.0167,x:-10.95,y:3.85},0).wait(1).to({rotation:248.7683,x:-10.9,y:3.9},0).wait(1).to({rotation:249.5198,y:3.85},0).wait(1).to({rotation:250.2714,x:-10.85,y:3.9},0).wait(1).to({rotation:251.023,x:-10.9},0).wait(1).to({rotation:251.7745,y:3.85},0).wait(1).to({rotation:252.5261,x:-10.85,y:3.9},0).wait(1).to({rotation:253.2777},0).wait(1).to({scaleX:0.8056,rotation:254.0292},0).wait(1).to({rotation:254.7808},0).wait(1).to({rotation:255.5324,x:-10.9},0).wait(1).to({rotation:256.2839,x:-10.85,y:3.85},0).wait(1).to({rotation:257.0355,x:-10.9,y:3.9},0).wait(1).to({scaleX:0.8055,rotation:257.7871,x:-10.85},0).wait(1).to({rotation:258.5386,y:3.95},0).wait(1).to({rotation:259.2902,y:3.9},0).wait(1).to({rotation:260.0418,x:-10.8},0).wait(1).to({scaleX:0.8056,rotation:260.7933,x:-10.85},0).wait(1).to({rotation:261.5449,x:-10.9},0).wait(1).to({rotation:262.2965,x:-10.85},0).wait(1).to({scaleX:0.8055,rotation:263.048},0).wait(1).to({rotation:263.7996},0).wait(1).to({rotation:264.5511,y:3.95},0).wait(1).to({scaleX:0.8056,rotation:265.3027,y:3.9},0).wait(1).to({rotation:266.0543,x:-10.8},0).wait(1).to({rotation:266.8058},0).wait(1).to({rotation:267.5574,x:-10.85},0).wait(1).to({scaleX:0.8055,rotation:268.309,y:3.95},0).wait(1).to({rotation:269.0605},0).wait(1).to({rotation:269.8121},0).wait(1).to({scaleX:0.8056,rotation:270.5637,y:3.9},0).wait(1).to({rotation:271.3152},0).wait(1).to({rotation:272.0668},0).wait(1).to({scaleX:0.8055,rotation:272.8184,y:3.95},0).wait(1).to({rotation:273.5699},0).wait(1).to({rotation:274.3215},0).wait(1).to({scaleX:0.8056,rotation:275.0731,x:-10.8,y:3.9},0).wait(1).to({rotation:275.8246,x:-10.85,y:3.95},0).wait(1).to({rotation:276.5762,x:-10.8},0).wait(1).to({scaleX:0.8055,rotation:277.3278},0).wait(1).to({rotation:278.0793},0).wait(1).to({rotation:278.8309,x:-10.75},0).wait(1).to({rotation:279.5825,x:-10.8,y:3.9},0).wait(1).to({scaleX:0.8056,rotation:280.334,y:3.95},0).wait(1).to({rotation:281.0856,y:4},0).wait(1).to({rotation:281.8372,x:-10.75,y:3.95},0).wait(1).to({rotation:282.5887,x:-10.8,y:4},0).wait(1).to({scaleX:0.8055,rotation:283.3403,x:-10.85,y:3.95},0).wait(1).to({rotation:284.0919,x:-10.8},0).wait(1).to({rotation:284.8434,x:-10.75},0).wait(1).to({rotation:285.595,x:-10.8},0).wait(1).to({rotation:286.3466,x:-10.75},0).wait(1).to({rotation:287.0981},0).wait(1).to({scaleX:0.8056,rotation:287.8497,x:-10.8,y:4.05},0).wait(1).to({rotation:288.6013,y:3.95},0).wait(1).to({rotation:289.3528,y:4},0).wait(1).to({scaleX:0.8055,rotation:290.1044,y:3.95},0).wait(1).to({scaleX:0.8056,rotation:290.8559,y:4},0).wait(1).to({scaleX:0.8055,rotation:291.6075},0).wait(1).to({rotation:292.3591},0).wait(1).to({scaleX:0.8056,rotation:293.1106,y:4.05},0).wait(1).to({scaleX:0.8055,rotation:293.8622,y:4},0).wait(1).to({scaleX:0.8056,rotation:294.6138,x:-10.75,y:4.05},0).wait(1).to({rotation:295.3653,y:4},0).wait(1).to({rotation:296.1169,x:-10.8},0).wait(1).to({scaleX:0.8055,rotation:296.8685,x:-10.75},0).wait(1).to({scaleX:0.8056,rotation:297.62,y:4.05},0).wait(1).to({scaleX:0.8055,rotation:298.3716,x:-10.8},0).wait(1).to({rotation:299.1232,y:4},0).wait(1);
	this.timeline.addTween(_tweenStr_0.to({rotation:299.8747,x:-10.75,y:4.05},0).wait(1).to({rotation:300.6263},0).wait(1).to({rotation:301.3779,x:-10.8},0).wait(1).to({rotation:302.1294,x:-10.75},0).wait(1).to({rotation:302.881,x:-10.8,y:4},0).wait(1).to({rotation:303.6326,x:-10.75,y:4.05},0).wait(1).to({rotation:304.3841,y:4},0).wait(1).to({rotation:305.1357,y:4.05},0).wait(1).to({rotation:305.8873},0).wait(1).to({rotation:306.6388},0).wait(1).to({rotation:307.3904},0).wait(1).to({rotation:308.142},0).wait(1).to({rotation:308.8935},0).wait(1).to({rotation:309.6451,x:-10.8,y:4.1},0).wait(1).to({rotation:310.3967,x:-10.75,y:4.05},0).wait(1).to({rotation:311.1482,x:-10.8,y:4.1},0).wait(1).to({rotation:311.8998,x:-10.75},0).wait(1).to({rotation:312.6514,x:-10.8},0).wait(1).to({rotation:313.4029,x:-10.75,y:4.05},0).wait(1).to({rotation:314.1545},0).wait(1).to({rotation:314.9061,y:4.1},0).wait(1).to({rotation:315.6576,y:4.05},0).wait(1).to({rotation:316.4092,x:-10.8,y:4.1},0).wait(1).to({rotation:317.1608,x:-10.75,y:4.05},0).wait(1).to({rotation:317.9123,y:4.15},0).wait(1).to({rotation:318.6639},0).wait(1).to({rotation:319.4154},0).wait(1).to({rotation:320.167},0).wait(1).to({rotation:320.9186},0).wait(1).to({rotation:321.6701,x:-10.7,y:4.2},0).wait(1).to({rotation:322.4217,x:-10.8,y:4.1},0).wait(1).to({rotation:323.1733,x:-10.75,y:4.2},0).wait(1).to({rotation:323.9248},0).wait(1).to({rotation:324.6764},0).wait(1).to({rotation:325.428,x:-10.8,y:4.15},0).wait(1).to({rotation:326.1795,y:4.2},0).wait(1).to({rotation:326.9311,x:-10.75,y:4.15},0).wait(1).to({rotation:327.6827},0).wait(1).to({rotation:328.4342,y:4.2},0).wait(1).to({rotation:329.1858,x:-10.8},0).wait(1).to({rotation:329.9374,y:4.15},0).wait(1).to({rotation:330.6889,y:4.2},0).wait(1).to({rotation:331.4405,y:4.15},0).wait(1).to({rotation:332.1921,x:-10.75,y:4.2},0).wait(1).to({rotation:332.9436},0).wait(1).to({scaleX:0.8056,rotation:333.6952},0).wait(1).to({scaleX:0.8055,rotation:334.4468,y:4.15},0).wait(1).to({scaleX:0.8056,rotation:335.1983,y:4.25},0).wait(1).to({rotation:335.9499,x:-10.8,y:4.2},0).wait(1).to({scaleX:0.8055,rotation:336.7015,y:4.25},0).wait(1).to({rotation:337.453,y:4.2},0).wait(1).to({rotation:338.2046,x:-10.75},0).wait(1).to({scaleX:0.8056,rotation:338.9562,x:-10.8,y:4.25},0).wait(1).to({scaleX:0.8055,rotation:339.7077},0).wait(1).to({scaleX:0.8056,rotation:340.4593,x:-10.75},0).wait(1).to({rotation:341.2109,x:-10.8},0).wait(1).to({scaleX:0.8055,rotation:341.9624,x:-10.75,y:4.2},0).wait(1).to({rotation:342.714,x:-10.8,y:4.25},0).wait(1).to({rotation:343.4656},0).wait(1).to({rotation:344.2171},0).wait(1).to({rotation:344.9687,x:-10.75},0).wait(1).to({rotation:345.7203},0).wait(1).to({scaleX:0.8056,rotation:346.4718,x:-10.8},0).wait(1).to({rotation:347.2234,x:-10.75},0).wait(1).to({rotation:347.9749,x:-10.8},0).wait(1).to({scaleX:0.8055,rotation:348.7265,x:-10.75},0).wait(1).to({rotation:349.4781,x:-10.8},0).wait(1).to({rotation:350.2296,x:-10.85},0).wait(1).to({rotation:350.9812,x:-10.8,y:4.3},0).wait(1).to({scaleX:0.8056,rotation:351.7328,x:-10.85,y:4.25},0).wait(1).to({rotation:352.4843,x:-10.8,y:4.3},0).wait(1).to({rotation:353.2359,y:4.25},0).wait(1).to({scaleX:0.8055,rotation:353.9875,x:-10.75},0).wait(1).to({rotation:354.739,x:-10.8,y:4.3},0).wait(1).to({rotation:355.4906},0).wait(1).to({scaleX:0.8056,rotation:356.2422,y:4.25},0).wait(1).to({rotation:356.9937,y:4.3},0).wait(1).to({rotation:357.7453},0).wait(1).to({rotation:358.4969},0).wait(1).to({scaleX:0.8055,rotation:359.2484},0).wait(1).to({rotation:360,x:-10.85,y:4.25},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-207.8,-182.8,393.9,374);


(lib.Scene_1_Layer_2 = function(mode,startPosition,loop,reversed) {
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
	this.playbutton = new lib.play_1();
	this.playbutton.name = "playbutton";
	this.playbutton.setTransform(296.9,202,1,1,0,0,0,150,150);
	new cjs.ButtonHelper(this.playbutton, 0, 1, 1);

	this.skiport = new lib.spiningskaianportal();
	this.skiport.name = "skiport";
	this.skiport.setTransform(471.4,64.65,0.2671,0.2668,0,0,0,-9.8,4.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.playbutton}]}).to({state:[{t:this.skiport}]},19).wait(221));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.Untitled2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {start:19};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,18,19,20,52,92,130,239];
	this.streamSoundSymbolsList[19] = [{id:"mamaquin",startFrame:19,endFrame:240,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.playbutton = this.Layer_2.playbutton;
		var _this = this;
		
		_this.playbutton.on('click', function(){
		_this.gotoAndPlay('start');
		});
	}
	this.frame_18 = function() {
		this.gotoAndPlay(0)
	}
	this.frame_19 = function() {
		var soundInstance = playSound("mamaquin",0);
		this.InsertIntoSoundStreamData(soundInstance,19,240,1);
		this.playbutton = undefined;this.skiport = this.Layer_2.skiport;
	}
	this.frame_20 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('twist1');
	}
	this.frame_52 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('twist2');
	}
	this.frame_92 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('twist3');
	}
	this.frame_130 = function() {
		var _this = this; 
		
		_this.skiport.inner.gotoAndPlay('twist4');
	}
	this.frame_239 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(18).call(this.frame_18).wait(1).call(this.frame_19).wait(1).call(this.frame_20).wait(32).call(this.frame_52).wait(40).call(this.frame_92).wait(38).call(this.frame_130).wait(109).call(this.frame_239).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(275,200);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(19).to({regX:0.6,regY:0.4,scaleX:0.259,scaleY:0.259,x:470.85,y:65.3},0).wait(1).to({regX:0,regY:0,x:470.7,y:65.2},0).wait(31).to({scaleX:0.3699,scaleY:0.3699,x:438.871,y:84.9057},0).wait(1).to({scaleX:0.4808,scaleY:0.4808,x:407.042,y:104.6113},0).wait(1).to({scaleX:0.5916,scaleY:0.5916,x:375.213,y:124.317},0).wait(1).to({scaleX:0.7025,scaleY:0.7025,x:343.3839,y:144.0226},0).wait(36).to({scaleX:0.7434,scaleY:0.7434,x:333.5494,y:152.2663},0).wait(1).to({scaleX:0.7843,scaleY:0.7843,x:323.7148,y:160.5099},0).wait(1).to({scaleX:0.8252,scaleY:0.8252,x:313.8803,y:168.7535},0).wait(1).to({scaleX:0.8662,scaleY:0.8662,x:304.0457,y:176.9971},0).wait(1).to({scaleX:0.9071,scaleY:0.9071,x:294.2112,y:185.2408},0).wait(1).to({scaleX:0.9085,scaleY:0.9085,x:293.9323,y:185.4497},0).wait(1).to({scaleX:0.9099,scaleY:0.9099,x:293.6534,y:185.6586},0).wait(1).to({scaleX:0.9113,scaleY:0.9113,x:293.3745,y:185.8674},0).wait(1).to({scaleX:0.9127,scaleY:0.9127,x:293.0956,y:186.0763},0).wait(1).to({scaleX:0.9141,scaleY:0.9141,x:292.8167,y:186.2852},0).wait(1).to({scaleX:0.9155,scaleY:0.9155,x:292.5378,y:186.4941},0).wait(1).to({scaleX:0.9169,scaleY:0.9169,x:292.2589,y:186.703},0).wait(1).to({scaleX:0.9182,scaleY:0.9182,x:291.98,y:186.9119},0).wait(1).to({scaleX:0.9196,scaleY:0.9196,x:291.7011,y:187.1208},0).wait(1).to({scaleX:0.921,scaleY:0.921,x:291.4222,y:187.3296},0).wait(1).to({scaleX:0.9224,scaleY:0.9224,x:291.1434,y:187.5385},0).wait(1).to({scaleX:0.9238,scaleY:0.9238,x:290.8645,y:187.7474},0).wait(1).to({scaleX:0.9252,scaleY:0.9252,x:290.5856,y:187.9563},0).wait(1).to({scaleX:0.9266,scaleY:0.9266,x:290.3067,y:188.1652},0).wait(1).to({scaleX:0.928,scaleY:0.928,x:290.0278,y:188.3741},0).wait(1).to({scaleX:0.9294,scaleY:0.9294,x:289.7489,y:188.583},0).wait(1).to({scaleX:0.9308,scaleY:0.9308,x:289.47,y:188.7919},0).wait(1).to({scaleX:0.9322,scaleY:0.9322,x:289.1911,y:189.0007},0).wait(1).to({scaleX:0.9336,scaleY:0.9336,x:288.9122,y:189.2096},0).wait(1).to({scaleX:0.935,scaleY:0.935,x:288.6333,y:189.4185},0).wait(1).to({scaleX:0.9364,scaleY:0.9364,x:288.3544,y:189.6274},0).wait(1).to({scaleX:0.9378,scaleY:0.9378,x:288.0755,y:189.8363},0).wait(1).to({scaleX:0.9392,scaleY:0.9392,x:287.7966,y:190.0452},0).wait(1).to({scaleX:0.9406,scaleY:0.9406,x:287.5178,y:190.2541},0).wait(1).to({scaleX:0.942,scaleY:0.942,x:287.2389,y:190.4629},0).wait(1).to({scaleX:0.9433,scaleY:0.9433,x:286.96,y:190.6718},0).wait(1).to({scaleX:0.9447,scaleY:0.9447,x:286.6811,y:190.8807},0).wait(1).to({scaleX:0.9461,scaleY:0.9461,x:286.4022,y:191.0896},0).wait(1).to({scaleX:0.9475,scaleY:0.9475,x:286.1233,y:191.2985},0).wait(1).to({scaleX:0.9489,scaleY:0.9489,x:285.8444,y:191.5074},0).wait(1).to({scaleX:0.9503,scaleY:0.9503,x:285.5655,y:191.7163},0).wait(1).to({scaleX:0.9517,scaleY:0.9517,x:285.2866,y:191.9252},0).wait(1).to({scaleX:0.9531,scaleY:0.9531,x:285.0077,y:192.134},0).wait(1).to({scaleX:0.9545,scaleY:0.9545,x:284.7288,y:192.3429},0).wait(1).to({scaleX:0.9559,scaleY:0.9559,x:284.4499,y:192.5518},0).wait(1).to({scaleX:0.9573,scaleY:0.9573,x:284.171,y:192.7607},0).wait(1).to({scaleX:0.9581,scaleY:0.9581,x:284.0059,y:192.8865},0).wait(1).to({scaleX:0.9589,scaleY:0.9589,x:283.8408,y:193.0123},0).wait(1).to({scaleX:0.9597,scaleY:0.9597,x:283.6757,y:193.1381},0).wait(1).to({scaleX:0.9605,scaleY:0.9605,x:283.5106,y:193.2639},0).wait(1).to({scaleX:0.9612,scaleY:0.9612,x:283.3455,y:193.3897},0).wait(1).to({scaleX:0.962,scaleY:0.962,x:283.1804,y:193.5155},0).wait(1).to({scaleX:0.9628,scaleY:0.9628,x:283.0153,y:193.6413},0).wait(1).to({scaleX:0.9636,scaleY:0.9636,x:282.8502,y:193.7671},0).wait(1).to({scaleX:0.9644,scaleY:0.9644,x:282.6851,y:193.8929},0).wait(1).to({scaleX:0.9652,scaleY:0.9652,x:282.52,y:194.0186},0).wait(1).to({scaleX:0.966,scaleY:0.966,x:282.3549,y:194.1444},0).wait(1).to({scaleX:0.9668,scaleY:0.9668,x:282.1898,y:194.2702},0).wait(1).to({scaleX:0.9676,scaleY:0.9676,x:282.0247,y:194.396},0).wait(1).to({scaleX:0.9684,scaleY:0.9684,x:281.8596,y:194.5218},0).wait(1).to({scaleX:0.9691,scaleY:0.9691,x:281.6945,y:194.6476},0).wait(1).to({scaleX:0.9699,scaleY:0.9699,x:281.5294,y:194.7734},0).wait(1).to({scaleX:0.9707,scaleY:0.9707,x:281.3643,y:194.8992},0).wait(1).to({scaleX:0.9715,scaleY:0.9715,x:281.1992,y:195.025},0).wait(1).to({scaleX:0.9723,scaleY:0.9723,x:281.0341,y:195.1508},0).wait(1).to({scaleX:0.9731,scaleY:0.9731,x:280.869,y:195.2766},0).wait(1).to({scaleX:0.9739,scaleY:0.9739,x:280.7039,y:195.4024},0).wait(1).to({scaleX:0.9747,scaleY:0.9747,x:280.5388,y:195.5282},0).wait(1).to({scaleX:0.9755,scaleY:0.9755,x:280.3737,y:195.654},0).wait(1).to({scaleX:0.9763,scaleY:0.9763,x:280.2086,y:195.7798},0).wait(1).to({scaleX:0.977,scaleY:0.977,x:280.0434,y:195.9056},0).wait(1).to({scaleX:0.9778,scaleY:0.9778,x:279.8783,y:196.0314},0).wait(1).to({scaleX:0.9786,scaleY:0.9786,x:279.7132,y:196.1572},0).wait(1).to({scaleX:0.9794,scaleY:0.9794,x:279.5481,y:196.283},0).wait(1).to({scaleX:0.9802,scaleY:0.9802,x:279.383,y:196.4088},0).wait(1).to({scaleX:0.981,scaleY:0.981,x:279.2179,y:196.5345},0).wait(1).to({scaleX:0.9818,scaleY:0.9818,x:279.0528,y:196.6603},0).wait(1).to({scaleX:0.9826,scaleY:0.9826,x:278.8877,y:196.7861},0).wait(1).to({scaleX:0.9834,scaleY:0.9834,x:278.7226,y:196.9119},0).wait(1).to({scaleX:0.9842,scaleY:0.9842,x:278.5575,y:197.0377},0).wait(1).to({scaleX:0.985,scaleY:0.985,x:278.3924,y:197.1635},0).wait(1).to({scaleX:0.9857,scaleY:0.9857,x:278.2273,y:197.2893},0).wait(1).to({scaleX:0.9865,scaleY:0.9865,x:278.0622,y:197.4151},0).wait(1).to({scaleX:0.9873,scaleY:0.9873,x:277.8971,y:197.5409},0).wait(1).to({scaleX:0.9881,scaleY:0.9881,x:277.732,y:197.6667},0).wait(1).to({scaleX:0.9889,scaleY:0.9889,x:277.5669,y:197.7925},0).wait(1).to({scaleX:0.9897,scaleY:0.9897,x:277.4018,y:197.9183},0).wait(1).to({scaleX:0.9905,scaleY:0.9905,x:277.2367,y:198.0441},0).wait(1).to({scaleX:0.9913,scaleY:0.9913,x:277.0716,y:198.1699},0).wait(1).to({scaleX:0.9921,scaleY:0.9921,x:276.9065,y:198.2957},0).wait(1).to({scaleX:0.9929,scaleY:0.9929,x:276.7414,y:198.4215},0).wait(1).to({scaleX:0.9936,scaleY:0.9936,x:276.5763,y:198.5473},0).wait(1).to({scaleX:0.9944,scaleY:0.9944,x:276.4112,y:198.6731},0).wait(1).to({scaleX:0.9952,scaleY:0.9952,x:276.2461,y:198.7989},0).wait(1).to({scaleX:0.996,scaleY:0.996,x:276.081,y:198.9247},0).wait(1).to({scaleX:0.9968,scaleY:0.9968,x:275.9159,y:199.0504},0).wait(1).to({scaleX:0.9976,scaleY:0.9976,x:275.7508,y:199.1762},0).wait(1).to({scaleX:0.9984,scaleY:0.9984,x:275.5856,y:199.302},0).wait(1).to({scaleX:0.9992,scaleY:0.9992,x:275.4205,y:199.4278},0).wait(1).to({scaleX:1,scaleY:1,x:275.2554,y:199.5536},0).wait(56));

	// Layer_2_obj_
	this.Layer_2 = new lib.Scene_1_Layer_2();
	this.Layer_2.name = "Layer_2";
	this.Layer_2.setTransform(296.9,202,1,1,0,0,0,296.9,202);
	this.Layer_2.depth = 0;
	this.Layer_2.isAttachedToCamera = 0
	this.Layer_2.isAttachedToMask = 0
	this.Layer_2.layerDepth = 0
	this.Layer_2.layerIndex = 0
	this.Layer_2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_2).wait(19).to({regX:476.4,regY:65.7,scaleX:3.8605,scaleY:3.8605,x:297.1,y:202.15},0).wait(221));

	// bg_obj_
	this.bg = new lib.Scene_1_bg();
	this.bg.name = "bg";
	this.bg.depth = 0;
	this.bg.isAttachedToCamera = 0
	this.bg.isAttachedToMask = 0
	this.bg.layerDepth = 0
	this.bg.layerIndex = 1
	this.bg.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.bg).wait(19).to({regX:399.4,regY:13.3,scaleX:3.8605,scaleY:3.8605,x:-0.15,y:-0.15},0).wait(221));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(274,198.5,277.4,202.5);
// library properties:
lib.properties = {
	id: '8416808AA334954FBFB33BA9BD40A2D7',
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/play.png", id:"play"},
		{src:"images/testbg.png", id:"testbg"},
		{src:"sounds/mamaquin.mp3", id:"mamaquin"}
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
an.compositions['8416808AA334954FBFB33BA9BD40A2D7'] = {
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

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
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

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
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