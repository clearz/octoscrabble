var cPieces = new Object();
var device = "iPad";

function ControlMenu() {
    this.topHeight = 0;
    this.botHeight = 0;
    if( device == "iPad")
    {
        this.width = 770;
        this.height = 123;
		
        this.startXPos = 62;
        this.startYPos = 64;
        this.startSize = 108;
		
		this.mult = 2;
        this.bottomOffset = 10;
        this.pieceClickedOffset = 50; // The amount to move the selected piece
    }
    else if( device == "iPhone")
    {
        this.width = 320;
        this.height = 50;
		
        this.startXPos = 26;
        this.startYPos = 26;
        this.startSize = 45;
		
        this.bottomOffset = 5;
        this.pieceClickedOffset = 10; // The amount to move the selected piece
    }
    this.selectedPiece = null;
    this.Hidden = false;
    var el = document.createElement('div');
    el.id = "gameMenu";
    el.style.width = this.width + "px";
    el.style.height = this.height + "px";
    el.style.backgroundColor = "#c1c3f0";
    el.style.zIndex = 10;
    el.style.position = "absolute";
    el.style.display = "none";
    el.style.webkitBorderRadius = "20px";
    el.style.MozBorderRadius = "20px";
	
    var tel = document.createElement('div');
    tel.id = "gameMenu";
    tel.style.width = this.width + "px";
    tel.style.height = this.height + "px";
    tel.style.zIndex = 10;
	//tel.style.backgroundColor = "#c1c3f0";
    tel.style.position = "absolute";
    tel.style.display = "none";
    tel.style.webkitBorderRadius = "20px";
    tel.style.MozBorderRadius = "20px";
	
	this.TopElement = tel;
	
    var img = document.createElement("img");
    img.src = "images/settings.png";
    img.style.position = "absolute";
	img.style.zIndex = 10;
	//img.style.float = "right";
    var lock = document.createElement("img");
    lock.src = "images/locko.png";
    lock.style.position = "absolute";
    lock.style.left = "665px";
    lock.style.top = "17px";
	//lock.style.float="right";
	img.style.zIndex = 10;
    this.Lock = lock;
    this.IconSize = 64;  // Size of settings icon height + width and lock closed height + width and opened lock height;
    this.OpenLockWidth = 88;
    this.Settings = img;
    this.opacity = 0.8;
    this.targetOpacity = 0.8;
    el.style.opacity = this.opacity;
	tel.style.opacity = this.opacity;
    this.Id = el.id;
    this.Element = el;
    this.lastX = -1;
    this.AddPieces = function () {
        var z;
        var zoom = window.innerWidth / document.documentElement.clientWidth;
        var px = this.startXPos * zoom;
        for (x = 0; x < 7; x++) {
            var gp = new GamePiece(px, this.startYPos * zoom, images[((it++) % images.length)]);
            gp.setSize(this.startSize * zoom);
            gp.Element.addEventListener(supportsTouch ? "touchstart" : "mousedown", this.pieceClicked, true);
            cPieces[gp.Id] = gp;
            this.Element.appendChild(gp.Element);
            px += this.startSize;
        }
    }
	
    this.removeSelectedPiece = function () {
        this.Element.removeChild(this.selectedPiece.Element);
        cPieces[this.selectedPiece.Id] = null;
        this.selectedPiece = null;
    }
    this.pieceClicked = function (event) {
        if (!ScreenLocked) return;
        var piece = cPieces[this.id];
        if (headsUpDisplay.selectedPiece == piece) {
            headsUpDisplay.selectedPiece.setPos(headsUpDisplay.selectedPiece.posX, headsUpDisplay.selectedPiece.posY + headsUpDisplay.pieceClickedOffset);
            headsUpDisplay.selectedPiece = null;
        }
        else {
            if (headsUpDisplay.selectedPiece)
                headsUpDisplay.selectedPiece.setPos(headsUpDisplay.selectedPiece.posX, headsUpDisplay.selectedPiece.posY + headsUpDisplay.pieceClickedOffset);
            piece.setPos(piece.posX, piece.posY - headsUpDisplay.pieceClickedOffset);
            headsUpDisplay.selectedPiece = piece;
        }
		
        event.cancelBubble = true;
    }
    this.AddPieces();
    this.TopElement.appendChild(lock);
    this.TopElement.appendChild(img);
	
    this.SettingsClicked = function (event) {        
        ScreenLocked = false;
		dialog.Show();
		if(event)
		{
			event.cancelBubble = true;
			event.preventDefault();
		}
    }
	
    this.Settings.addEventListener(supportsTouch ? "touchstart" : "mousedown", this.SettingsClicked, true);
    this.toggleLock = function (event) {
        ScreenLocked = !ScreenLocked;
        var zoom = window.innerWidth / document.documentElement.clientWidth;
        headsUpDisplay.Lock.width = (ScreenLocked ? headsUpDisplay.IconSize : headsUpDisplay.OpenLockWidth) * zoom * headsUpDisplay.mult;
        headsUpDisplay.Lock.src = ScreenLocked ? "images/lockc.png" : "images/locko.png";
		if(event)
		{
			event.cancelBubble = true;
			event.preventDefault();
		}
    }
    this.Lock.addEventListener(supportsTouch ? "touchstart" : "mousedown", this.toggleLock, true);
    this.Show = function () {
        if (window.pageXOffset != headsUpDisplay.lastX) {
            headsUpDisplay.lastX = window.pageXOffset;
            setTimeout(headsUpDisplay.Show, 20);
        }
        else {
            headsUpDisplay.lastX = -1;
            headsUpDisplay.IShow();
        }
    }
    this.fadeIn = function () {
        if (headsUpDisplay.opacity < headsUpDisplay.targetOpacity) {
            headsUpDisplay.opacity += 0.01;
            headsUpDisplay.Element.style.opacity = headsUpDisplay.opacity;
			headsUpDisplay.TopElement.style.opacity = headsUpDisplay.opacity;
            setTimeout(headsUpDisplay.fadeIn, 4);
        }
    }
    this.IShow = function () {
        var cw = window.innerWidth;
        var ch = window.innerHeight;

        var xo = window.pageXOffset;
        var yo = window.pageYOffset;
        var iw = document.documentElement.clientWidth;
        var zoom = window.innerWidth / iw;
        // yo *= zoom;
        //yo = Math.round(yo);
        var rh = this.height * zoom;
        var rw = this.width * zoom;
        if (this.selectedPiece) {
            // this.selectedPiece.setPos(this.selectedPiece.posX, this.selectedPiece.posY + 50);
            this.selectedPiece = null;
        }
        //Debug((yo + ch) + "px", 2);
        this.Element.style.top = (yo - rh + ch - (this.bottomOffset * zoom)) + "px";
        this.Element.style.left = xo + ((cw - rw) / 2) + "px";
        el.style.width = rw + "px";
        el.style.height = rh + "px";


        this.TopElement.style.top = (yo + 10) + "px";
        this.TopElement.style.left = xo + ((cw - rw) / 2) + "px";
        this.TopElement.style.width = rw + "px";
        this.TopElement.style.height = rh + "px";
        this.topHeight = (yo + 10) + rh;

        this.botHeight = (yo - rh + ch - (this.bottomOffset * zoom));
        var zoom = window.innerWidth / document.documentElement.clientWidth;
        var px = this.startXPos * zoom;
        for (var x in cPieces)
            if (cPieces[x]) {
                cPieces[x].setSize(this.startSize * zoom);
                cPieces[x].setPos(px, this.startYPos * zoom);
                px += (this.startSize * zoom);
            }
        this.Lock.height = (this.IconSize * zoom * this.mult);
        this.Lock.style.top = (0) + "px";
        this.Lock.width = ((ScreenLocked ? headsUpDisplay.IconSize : headsUpDisplay.OpenLockWidth) * zoom * this.mult);
        this.Lock.src = ScreenLocked ? "images/lockc.png" : "images/locko.png";
        this.Lock.style.left = (0) + "px";
        this.Settings.width = (this.IconSize * zoom * this.mult);
        this.Settings.height = (this.IconSize * zoom * this.mult);
        this.Settings.style.right = (0) + "px";
        this.Settings.style.top = (0) + "px";
        this.Element.style.webkitBorderRadius = (20 * zoom) + "px";
        this.Element.style.MozBorderRadius = (20 * zoom) + "px";
        this.opacity = 0;
        this.Element.style.opacity = "0";
        this.Element.style.display = "block";
        this.TopElement.style.display = "block";
        this.fadeIn();
        this.Hidden = false;
    }
	
    this.Hide = function () {
        this.Element.style.display = "none";
		this.TopElement.style.display = "none";
        this.Hidden = true;
    }
}/*
 
 this.Lock.height = this.IconSize * zoom;
 this.Lock.style.left = (this.width * zoom) + "px"
 this.Lock.style.top = (17 * zoom) + "px"
 this.Lock.width = (ScreenLocked ? headsUpDisplay.IconSize : headsUpDisplay.OpenLockWidth) * zoom;
 this.Lock.src = ScreenLocked ? "images/lockc.png" : "images/locko.png";
 this.Settings.width = this.IconSize * zoom;
 this.Settings.height = this.IconSize * zoom;
 this.Settings.style.left = (-70 * zoom) + "px"
 this.Settings.style.top = (20 * zoom) + "px"
 this.Element.style.webkitBorderRadius = (20 * zoom) + "px";
 this.Element.style.MozBorderRadius = (20 * zoom) + "px";
 this.opacity = 0;
 this.Element.style.opacity = "0";
 this.Element.style.display = "block";
 this.fadeIn();
 this.Hidden = false;
 
 */