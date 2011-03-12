function Dialog(txt)
{
	this.height = 50;
	this.width = 140;
	var oel = document.createElement('div');
    oel.style.width = "1920px";
    oel.style.height = "1920px";
	oel.style.position = "absolute";
	oel.style.backgroundColor = "#000";
	oel.style.zIndex = 50;
	oel.style.opacity = 0.9;
	var el = document.createElement('div');
    el.id = "gameMenu";
    el.style.width = "140px";
    el.style.height = "50px";
    el.style.backgroundColor = "#c0cc7c";
    el.style.zIndex = 50;
    el.style.position = "absolute";
    oel.style.display = "none";
    el.style.webkitBorderRadius = "20px";
    el.style.MozBorderRadius = "20px";
	el.innerHTML = txt + "<br /><br />";
	el.style.padding = "20px";
	var okBtn = document.createElement('input');
	okBtn.type = "button";
	okBtn.style.width = "60px";
	okBtn.value = "OK";
	okBtn.style.marginRight = "20px";
	var cBtn = document.createElement('input');
	cBtn.type = "button";
	cBtn.style.width = "60px";
	cBtn.value = "Cancel";
	this.CBtn = cBtn;
	this.OKBtn = okBtn;
	this.onCancelTouch = function(event)
	{
		dialog.Hide();
	}
	this.onOkTouch = function(event)
	{
		window.location = "ots://callback?quit=true";
	}
	cBtn.addEventListener(supportsTouch ? "touchend" : "mouseup", this.onCancelTouch, true);
	okBtn.addEventListener(supportsTouch ? "touchend" : "mouseup", this.onOkTouch, true);
	el.appendChild(okBtn);
	el.appendChild(cBtn);
	
	oel.appendChild(el);
	this.Visible = false;
	this.Element = oel;
	this.IElement = el;
	
	this.Show = function()
	{
		var cw = window.innerWidth;
        var ch = window.innerHeight;
		
        var xo = window.pageXOffset;
        var yo = window.pageYOffset;
		var iw = document.documentElement.clientWidth;
        var zoom = window.innerWidth / iw * 2.5;
        // yo *= zoom;
        //yo = Math.round(yo);
        var rh = this.height * zoom;
        var rw = this.width * zoom;
        if (this.selectedPiece) {
            this.selectedPiece.setPos(this.selectedPiece.posX, this.selectedPiece.posY + 50);
            this.selectedPiece = null;
        }
        //Debug((yo + ch) + "px", 2);
        this.IElement.style.top = ((ch / 2) - rh) + "px";
        this.IElement.style.left = ((cw / 2) - (rw / 1.7)) + "px";
        this.IElement.style.width = rw + "px";
        this.IElement.style.height = rh + "px";
		this.IElement.style.padding = (20 * zoom) + "px";
		this.IElement.style.fontSize = (14 * zoom) + "px";
		this.Element.style.display = "block";
		this.CBtn.style.width = this.OKBtn.style.width = (67 * zoom) + "px";
		this.CBtn.style.height = this.OKBtn.style.height = (20 * zoom) + "px";
		this.OKBtn.style.marginRight = (5 * zoom) + "px";
		this.CBtn.style.fontSize = this.OKBtn.style.fontSize = (14 * zoom) + "px";
		this.Element.style.top = yo + "px";
        this.Element.style.left = xo + "px";
		this.IElement.style.webkitBorderRadius = (15 * zoom) + "px";
		this.IElement.style.MozBorderRadius = (15 * zoom) + "px";
		this.Visible = true;
		
		
	}
	
	this.Hide = function()
	{
		var zoom = window.innerWidth / document.documentElement.clientWidth;
        headsUpDisplay.Lock.width = (ScreenLocked ? headsUpDisplay.IconSize : headsUpDisplay.OpenLockWidth) * zoom * headsUpDisplay.mult;
        headsUpDisplay.Lock.src = ScreenLocked ? "images/lockc.png" : "images/locko.png";
		this.Element.style.display = "none";
		this.Visible = false;
	}
}