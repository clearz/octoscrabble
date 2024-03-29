var gameArrows = new Object();
var idPos = 0;

// xp is the x position
// yp is the y position
// dir is the direction e.g 'n', 'sw'
// gp is the referencing gamePiece
function Arrow(xp, yp, dir, gp)
{
	this.Dir = dir;
	this.posX = xp;
	this.posY = yp;
	
	this.dispX = xp;
	this.dispY = yp;
	
	this.size = 128;
	this.gamePiece = gp;
	var el = document.createElement('img');
	el.id = "a" + idPos++;
	el.src = arrows[dir].src;
	el.style.width = this.size + "px";
	el.style.height = this.size + "px";
	el.style.left = xp - (this.size/2) + "px";
	el.style.top = yp - (this.size/2) + "px";
	el.style.zIndex = 0;
	el.style.position = "absolute";
	this.Id = el.id;
	this.Element = el;

	this.setVisible = function(sv)
	{
	    this.Element.style.visibility = sv ? "visible" : "hidden";
	}
	
	this.setPos = function(px, py)
	{
		this.dispX = px;
		this.dispY = py;
		this.Element.style.left = px - (this.size/2) + "px";
		this.Element.style.top = py - (this.size/2) + "px";
	}

	this.arrowClicked = function (event) {
	    var gp;
	    if (cMenu.selectedPiece) {
	        gp = cMenu.selectedPiece;
	        cMenu.removeSelectedPiece();
	        gp.setPos(this.posX, this.posY);
	        gp.setSize(128);
	        //selectedPiece = null;
	        //cMenu.IShow();
	    }
	    else
	        gp = new GamePiece(this.posX, this.posY, images[((it++) % images.length)]);
	    addPiece(gp);
	    var x, tp = "";
	    var touchingPieces = gp.getTouchingPieces();
	    for (x = 0; x < Dirs.length; x++)
	        if (touchingPieces[Dirs[x]]) {
	            //Debug(touchingPieces[Dirs[x]].Id + " " + gp.opositeOf(Dirs[x]), 2);
	            touchingPieces[Dirs[x]].attachByArrowClick(gp, gp.opositeOf(Dirs[x]));
	        }


	    //Debug(this.gamePiece.Id + " " + this.Dir, 2);
	    //this.gamePiece.attachByArrowClick(gp, this.Dir);
	    if (selectedPiece) {
	        selectedPiece.setSize(128);
	        selectedPiece.isSelected = false;
	        selectedPiece = null;
	    }
	}
	
	this.pointCollides = function(xp, yp)
	{
		var dx = xp - this.posX;
    	var dy = yp - this.posY;
		
   	 	if ( ( dx * dx )  + ( dy * dy ) < 15384 )
   	 	    return this.Element.style.visibility != "hidden"; //return true only if the item is not hidden (visible or not set yet)
		return false;
	}
	//this.Element.addEventListener(supportsTouch ? "touchstart" : "mousedown", this.arrowClicked, true);
	gameArrows[this.Id] = this;
}

function clearArrows()
{
	gameArrows = new Object();
	idPos = 0;
}