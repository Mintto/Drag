let 
box1,box2,down,
drag = false;
function init(){
	event();
}
function event(){
	$(document)
	.on("mousedown","#dragBox>div",Mousedown)
	.on("mousemove",Mousemove)
	.on("mouseup",Mouseup)
}
function Mousedown(e){
	down = { x:e.clientX,y:e.clientY };
	box1 = $(this);
	drag = true;
	let
	parentHeight =  box1.parent().outerHeight(true)+box1.outerHeight(true),
	top = box1.offset().top-window.scrollY;
	box1.css({'position':'fixed','z-index':'9999','background':'lightgreen','top':top+"px",'pointer-events':'none'}).parent().css({ 'height':parentHeight+"px" });
	posChange(box1);
}
function Mousemove(e){
	if( drag ){
		box1.css({ "transform":`translate(${e.clientX-down.x}px,${e.clientY-down.y}px)` });
		boxEnter();
	}
}
function Mouseup(e){
	drag = false;
	if( box1 && box2 ){
		box2.before(box1.clone()).remove();
		box1.before(box2.clone()).remove();
		$("#dragBox>div").each(function(){
			$(this).removeAttr("style");
		})
	}
}
function boxEnter(){
	let 
	al = box1.offset().left,
	ar = al+box1.outerWidth(),
	at = box1.offset().top,
	ab = at+box1.outerHeight();
	$("#dragBox>div").not(box1).each(function(){
		let 
		v = $(this),
		bl = v.offset().left,
		br = bl+v.outerWidth(),
		bt = v.offset().top,
		bb = bt+v.outerHeight();
		if( al > br || ar < bl ){
			return true;
		}else if( at > bb || ab < bt ){
			return true;
		}
		box2 = v;
		return false;
	});
}
function posChange(target){
	let idx = target.index();
	$(`#dragBox>div:lt(${idx})`).css({ "transform":`translateY(0px)`});
	$(`#dragBox>div:gt(${idx})`).css({ "transform":`translateY(${target.outerHeight(true)}px)`});
}
init();