function WDialog()
{
	this.height = 100;
	this.width = 150;
	this.pos = 0;
	var oel = document.createElement('div');
    oel.style.width = "1920px";
    oel.style.height = "1920px";
	oel.style.position = "absolute";
	oel.style.backgroundColor = "#000";
	oel.style.zIndex = 50;
	oel.style.opacity = 1;
	var el = document.createElement('div');
    el.id = "wDialog";
    el.style.width = this.width + "px";
    el.style.height = this.height + "px";
    el.style.backgroundColor = "#c0cc7c";
    el.style.zIndex = 50;
    el.style.position = "absolute";
    oel.style.display = "none";
    el.style.webkitBorderRadius = "20px";
    el.style.MozBorderRadius = "20px";
    el.style.opacity = 1;
    el.style.fontFamily = "Helvetica";
	el.innerHTML = "Choose Wildcard Letter<br /><br />";
	el.style.padding = "20px";
	var left = document.createElement('img');
	left.src = "images/left.png";
	left.width = "128";
	left.height = "128";
	this.Left = left;
	var letter = document.createElement('img');
	letter.id = "letter";
	letter.width = "128";
	letter.height = "128";
	letter.src = images[this.pos].src;
	this.Letter = letter;
	var right = document.createElement('img');
	right.src = "images/right.png";
	right.width = "128";
	right.height = "128";
	this.Right = right;
    var okBtn = document.createElement('input');
	okBtn.type = "button";
	okBtn.style.width = "140px";
	okBtn.value = "OK";
	okBtn.style.marginLeft = "30%";
	okBtn.style.marginTop = "15px";
	this.OKBtn = okBtn;
	this.onLeftTouch = function (event) {
	    if (wdialog.pos == 0) wdialog.pos = 25;
	    else wdialog.pos--;

	    document.getElementById("letter").src = images[wdialog.pos].src;
	}
	this.onRightTouch = function (event) {
	    if (wdialog.pos == 25) wdialog.pos = 0;
	    else wdialog.pos++;

	    document.getElementById("letter").src = images[wdialog.pos].src;
	}
	this.onOkTouch = function (event) {
	    wdialog.Hide();
	}
	okBtn.addEventListener(supportsTouch ? "touchend" : "mouseup", this.onOkTouch, false);
	left.addEventListener(supportsTouch ? "touchend" : "mouseup", this.onLeftTouch, false);
	right.addEventListener(supportsTouch ? "touchend" : "mouseup", this.onRightTouch, false);
    el.appendChild(left);
	el.appendChild(letter);
	el.appendChild(right);
	//oel.innerHTML += "<br /><br />";
	el.appendChild(okBtn);
	
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
		this.Left.style.width = this.Left.style.height = (48 * zoom) + "px";
		this.Right.style.width = this.Right.style.height = (48 * zoom) + "px";
		this.Letter.width = this.Letter.height = (48 * zoom);
		this.OKBtn.style.marginRight = (5 * zoom) + "px";
		this.OKBtn.style.fontSize = this.OKBtn.style.fontSize = (11 * zoom) + "px";
		this.OKBtn.style.width = (50*zoom) + "px"
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