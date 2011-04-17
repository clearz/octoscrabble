var Dirs = ["n", "s", "e", "w", "se", "sw", "ne", "nw"];
var Mults = [[0, -1], [0, 1], [1, 0], [-1, 0], [1, 1], [-1, 1], [1, -1], [-1, -1]];

function GamePiece(xp, yp, isrc)
{
	this.posX = xp;
	this.posY = yp;

	this.oPosX = xp;
	this.oPosY = yp;
	
	this.dPosX = 0;// xp;
	this.dPosY = 0;// yp;
	
	this.arrows = new Object();
	this.isSelected = false;
	this.img = isrc
	this.attachedPieces = new Object();
	this.size = 128;
	this.Board;
	this.attached = false;
    this.isGamePiece = true;

    var el = document.createElement('img');
	el.id = isrc.id + "-p" + gamePieces.length;
	el.src = isrc.src;
	el.style.width = this.size + "px";
	el.style.height = this.size + "px";
	el.style.left = xp - (this.size/2) + "px";
	el.style.top = yp - (this.size/2) + "px";
	el.style.zIndex = 0;
	el.style.position = "absolute";
	this.Id = el.id;	
	this.Element = el;

	this.isAttachableTo= function()
	{
	    for (var i in this.arrows)
	        if (this.arrows[i])
	            return true;

	    return false;
	}
	this.setArrowVisibility = function(sh)
	{
	    for (var i in this.arrows)
	        if (this.arrows[i])
		        this.arrows[i].setVisible(sh);

	}
	this.checkPointInArrow = function(px, py)
	{
	    for (var i in this.arrows)
			if(this.arrows[i] && this.arrows[i].pointCollides(px, py))
				return this.arrows[i];
				
		return false;
    }
    this.checkPointInArrowEx = function (px, py) {
        var x;
        var cols = new Array(); 
        for (var i in this.arrows)
                if (this.arrows[i] && this.arrows[i].pointCollides(px, py)) 
                    cols.push(this.arrows[i]);
        if (cols.length == 0)
            return false;
        else if (cols.length == 1)
            return cols[0];
        else {
            var y, sm;

            for (x = 0; x < cols.length; x++)
                for (y = x + 1; y < cols.length; y++) {
                    var dx1 = cols[x].posX - px;
                    var dy1 = cols[x].posY - py;
                    var dx2 = cols[y].posX - px;
                    var dy2 = cols[y].posY - py;
                    var d1 = (dx1 * dx1) + (dy1 * dy1);
                    var d2 = (dx2 * dx2) + (dy2 * dy2);

                    if (d1 < d2)
                        sm = cols[x];

                }
            if (!sm)
                sm = cols[y - 1];

            return sm;
        }
    }
	this.drawArrows = function()
	{
		if(!checkPointCollisionPure(this, this.posX, this.posY - 128))
			if(!this.attachedPieces["ne"] && !this.attachedPieces["nw"] && !this.attachedPieces["n"])
			{
				this.arrows["n"] = new Arrow(this.posX, this.posY - 128, "n", this);
				board.appendChild(this.arrows["n"].Element);
			}
			else this.removeArrow("n"); else this.removeArrow("n");
		if(!checkPointCollisionPure(this, this.posX, this.posY + 128))
			if(!this.attachedPieces["se"] && !this.attachedPieces["sw"] && !this.attachedPieces["s"])
			{
				this.arrows["s"] = new Arrow(this.posX, this.posY + 128, "s", this);
				board.appendChild(this.arrows["s"].Element);
			}
			else this.removeArrow("s"); else this.removeArrow("s");
		if(!checkPointCollisionPure(this, this.posX + 128, this.posY))
			if(!this.attachedPieces["ne"] && !this.attachedPieces["se"] && !this.attachedPieces["e"])
			{
				this.arrows["e"] = new Arrow(this.posX + 128, this.posY, "e", this);
				board.appendChild(this.arrows["e"].Element);
			}
			else this.removeArrow("e"); else this.removeArrow("e");
		if(!checkPointCollisionPure(this, this.posX - 128, this.posY))
			if(!this.attachedPieces["nw"] && !this.attachedPieces["sw"] && !this.attachedPieces["w"])
			{
				this.arrows["w"] = new Arrow(this.posX - 128, this.posY, "w", this);
				board.appendChild(this.arrows["w"].Element);
			}
			else this.removeArrow("w"); else this.removeArrow("w");
		if(!checkPointCollisionPure(this, this.posX - 88, this.posY - 88))
			if(!this.attachedPieces["n"] && !this.attachedPieces["w"] && !this.attachedPieces["nw"])
			{
				this.arrows["nw"] = new Arrow(this.posX - 88, this.posY - 88, "nw", this);
				board.appendChild(this.arrows["nw"].Element);
			}
			else this.removeArrow("nw"); else this.removeArrow("nw");
		if(!checkPointCollisionPure(this, this.posX + 88, this.posY - 88))
			if(!this.attachedPieces["e"] && !this.attachedPieces["n"] && !this.attachedPieces["ne"])
			{
				this.arrows["ne"] = new Arrow(this.posX + 88, this.posY - 88, "ne", this);
				board.appendChild(this.arrows["ne"].Element);
			}
			else this.removeArrow("ne"); else this.removeArrow("ne");
		if(!checkPointCollisionPure(this, this.posX - 88, this.posY + 88))
			if(!this.attachedPieces["s"] && !this.attachedPieces["w"] && !this.attachedPieces["sw"])
			{
				this.arrows["sw"] = new Arrow(this.posX - 88, this.posY + 88, "sw", this);
				board.appendChild(this.arrows["sw"].Element);
			}
			else this.removeArrow("sw"); else this.removeArrow("sw");
		if(!checkPointCollisionPure(this, this.posX + 88, this.posY + 88))
			if(!this.attachedPieces["e"] && !this.attachedPieces["s"] && !this.attachedPieces["se"])
			{
				this.arrows["se"] = new Arrow(this.posX + 88, this.posY + 88, "se", this);
				board.appendChild(this.arrows["se"].Element);
			}
			else this.removeArrow("se"); else this.removeArrow("se");
	}
	
	this.removeArrows = function()
	{
		this.removeArrow("ne");
		this.removeArrow("nw");
		this.removeArrow("se");
		this.removeArrow("sw");
		this.removeArrow("n");
		this.removeArrow("s");
		this.removeArrow("e");
		this.removeArrow("w");
	}
	
	this.collidsWith = function(other)
	{
		if(other == this) return false;
		
		var dx = other.posX - this.posX;
    	var dy = other.posY - this.posY;
		
   	 	if ( ( dx * dx )  + ( dy * dy ) < 16384 ) 
			return true;
		return false;	
	}
	
	this.pointCollides = function(xp, yp)
	{
		var dx = xp - this.posX;
    	var dy = yp - this.posY;
		
   	 	if ( ( dx * dx )  + ( dy * dy ) < 15384 ) 
			return true;
		return false;
	}
	
	this.isAttached = function(gp)
	{
		if (this.attachedPieces["n"] != null && this.attachedPieces["n"] == gp) 
			return "n";
		if (this.attachedPieces["s"] != null && this.attachedPieces["s"] == gp) 
			return "s";
		if (this.attachedPieces["e"] != null && this.attachedPieces["e"] == gp) 
			return "e";
		if (this.attachedPieces["w"] != null && this.attachedPieces["w"] == gp) 
			return "w";
		if (this.attachedPieces["ne"] != null && this.attachedPieces["ne"] == gp) 
			return "ne";
		if (this.attachedPieces["nw"] != null && this.attachedPieces["nw"] == gp) 
			return "nw";
		if (this.attachedPieces["se"] != null && this.attachedPieces["se"] == gp) 
			return "se";
		if (this.attachedPieces["sw"] != null && this.attachedPieces["sw"] == gp) 
			return "sw";
	}
	
	this.opositeOf = function(dir)
	{
		if(dir == "n") return "s";
		if(dir == "s") return "n";
		if(dir == "e") return "w";
		if(dir == "w") return "e";
		if(dir == "nw") return "se";
		if(dir == "ne") return "sw";
		if(dir == "sw") return "ne";
		if(dir == "se") return "nw";
	}
	
	this.removeArrow = function(pos)
	{
		if(this.arrows[pos] != null)
			board.removeChild(this.arrows[pos].Element);
			
		this.arrows[pos] = null
			
	}

	this.attachPiece = function (gp, pos) {

	    var attached = this.isAttached(gp); // if piece is already attached to this piece
	    if (attached == pos || this.attachedPieces[pos] != null)					// no need to do anything if it is the same place so return 
	        return false;

	    switch (pos) {
	        case "n":
	            if (!this.attachedPieces["ne"] && !this.attachedPieces["nw"] && !this.attachedPieces["n"]) {
	                if (checkPointCollision(this, this.posX, this.posY - 128)) return false;
	                this.attachedPieces["n"] = gp;
	                gp.attachedPieces["s"] = this;
	                gp.setAbsPos(this.posX, this.posY - 128);
	            }
	            else return false;
	            break;
	        case "s":
	            if (!this.attachedPieces["se"] && !this.attachedPieces["sw"] && !this.attachedPieces["s"]) {
	                if (checkPointCollision(this, this.posX, this.posY + 128)) return false;
	                this.attachedPieces["s"] = gp;
	                gp.attachedPieces["n"] = this;
	                gp.setAbsPos(this.posX, this.posY + 128);
	            }
	            else return false;
	            break;
	        case "e":
	            if (!this.attachedPieces["ne"] && !this.attachedPieces["se"] && !this.attachedPieces["e"]) {
	                if (checkPointCollision(this, this.posX + 128, this.posY)) return false;
	                this.attachedPieces["e"] = gp;
	                gp.attachedPieces["w"] = this;
	                //Debug(this.posX + "," + this.posY, 2);
	                gp.setAbsPos(this.posX + 128, this.posY);
	                //Debug(gp.posX + "," + gp.posY, 2);
	            }
	            else return false;
	            break;
	        case "w":
	            if (!this.attachedPieces["nw"] && !this.attachedPieces["sw"] && !this.attachedPieces["w"]) {
	                if (checkPointCollision(this, this.posX - 128, this.posY)) return false;
	                this.attachedPieces["w"] = gp;
	                gp.attachedPieces["e"] = this;
	                gp.setAbsPos(this.posX - 128, this.posY);
	            }
	            else return false;
	            break;
	        case "nw":
	            if (!this.attachedPieces["n"] && !this.attachedPieces["w"] && !this.attachedPieces["nw"]) {
	                if (checkPointCollision(this, this.posX - 88, this.posY - 88)) return false;
	                this.attachedPieces["nw"] = gp;
	                gp.attachedPieces["se"] = this;
	                gp.setAbsPos(this.posX - 88, this.posY - 88);
	            }
	            else return false;
	            break;
	        case "ne":
	            if (!this.attachedPieces["n"] && !this.attachedPieces["e"] && !this.attachedPieces["ne"]) {
	                if (checkPointCollision(this, this.posX + 88, this.posY - 88)) return false;
	                this.attachedPieces["ne"] = gp;
	                gp.attachedPieces["sw"] = this;
	                gp.setAbsPos(this.posX + 88, this.posY - 88);
	            }
	            else return false;
	            break;
	        case "sw":
	            if (!this.attachedPieces["s"] && !this.attachedPieces["w"] && !this.attachedPieces["sw"]) {
	                if (checkPointCollision(this, this.posX - 88, this.posY + 88)) return false;
	                this.attachedPieces["sw"] = gp;
	                gp.attachedPieces["ne"] = this;
	                gp.setAbsPos(this.posX - 88, this.posY + 88);
	            }
	            else return false;
	            break;
	        case "se":
	            if (!this.attachedPieces["s"] && !this.attachedPieces["e"] && !this.attachedPieces["se"]) {
	                if (checkPointCollision(this, this.posX + 88, this.posY + 88)) return false;
	                this.attachedPieces["se"] = gp;
	                gp.attachedPieces["nw"] = this;
	                gp.setAbsPos(this.posX + 88, this.posY + 88);
	            }
	            else return false;
	            break;
	    }
	    this.attachedPieces[attached] = null;
	    gp.setSize(128);
	    gp.attachedPieces[this.opositeOf(attached)] = null;
	    this.attached = true;
	    gp.attached = true;

	    var touchingPieces = this.getTouchingPieces(); // Attach to other touching pieces
	    for (var i in touchingPieces)
	            touchingPieces[i].attachByArrowClick(this, this.opositeOf(i));
	    checkAllArrows();
	    return true;
	}

	this.attachedPiecesCount = function () {
	    var x, i = 0;
	    for (var i in attachedPieces)
	        if (this.attachedPieces[i])
	            i++;

        return i;
    }

	this.getTouchingPieces = function () {
	    var tp = new Object();
	    var piece;

	    for (x = 0; x < gamePieces.length; x++) {
	        if (gamePieces[x].posX == this.posX && gamePieces[x].posY == this.posY - 128)
	            tp["n"] = (gamePieces[x]);
	        else if (gamePieces[x].posX == this.posX && gamePieces[x].posY == this.posY + 128)
	            tp["s"] = (gamePieces[x]);
	        else if (gamePieces[x].posX == this.posX - 128 && gamePieces[x].posY == this.posY)
	            tp["w"] = (gamePieces[x]);
	        else if (gamePieces[x].posX == this.posX + 128 && gamePieces[x].posY == this.posY)
	            tp["e"] = (gamePieces[x]);
	        else if (gamePieces[x].posX == this.posX - 88 && gamePieces[x].posY == this.posY - 88)
	            tp["nw"] = (gamePieces[x]);
	        else if (gamePieces[x].posX == this.posX + 88 && gamePieces[x].posY == this.posY + 88)
	            tp["se"] = (gamePieces[x]);
	        else if (gamePieces[x].posX == this.posX - 88 && gamePieces[x].posY == this.posY + 88)
	            tp["sw"] = (gamePieces[x]);
	        else if (gamePieces[x].posX == this.posX + 88 && gamePieces[x].posY == this.posY - 88)
	            tp["ne"] = (gamePieces[x]);
	    }

	    return tp;
	}
	this.attachByArrowClick = function(gp, dir)
	{
		this.attachedPieces[dir] = gp;
		gp.attachedPieces[this.opositeOf(dir)] = this;
		this.attached = true;
		gp.attached = true;
	}
	
	this.setSize = function(s)
	{
		this.Element.style.zIndex = (s == 128) ? 4 : 5;
		var oldSize = this.size;
		this.size = s;
		this.Element.style.width = this.size + "px";
		this.Element.style.height = this.size + "px";	
		var px = this.posX;
		var py = this.posY;
		this.setAbsPos(px, py);
		var arrowOffset = this.size - oldSize;
		if(arrowOffset != 0) arrowOffset /= 2;
		//Debug("arrowOffset = " + arrowOffset, 2);
		var x;
		for(x = 0; x < Dirs.length ; x++ )
		{
			if(this.arrows[Dirs[x]])
			{
				var apx = this.arrows[Dirs[x]].dispX;
				var apy = this.arrows[Dirs[x]].dispY;
				//Debug("curPos:(" + px + ", " + py + ") - Dir: " + Dirs[x] + " Mults[x][0]=" + Mults[x][0] + " Mults[x][1]=" + Mults[x][1], 2);
				apx = apx + (arrowOffset * Mults[x][0]);
				apy = apy +(arrowOffset * Mults[x][1]);
				//Debug("newPos:(" + px + ", " + py + ")", 2);
				this.arrows[Dirs[x]].setPos(apx, apy);
			}
		}
	}
	this.setPos = function(xp, yp)
	{
		var tx =  (xp - this.posX) ;
		var ty =  (yp - this.posY) ;
		this.setX(xp);
		this.setY(yp);
		this.dPosX += tx;
		this.dPosY += ty;
		//this.Element.style.left = this.posX - (this.size/2) + "px";
		//this.Element.style.top = this.posY - (this.size/2) + "px";
		this.Element.style.webkitTransform = "translate3d("+this.dPosX+"px, "+this.dPosY+"px, 0)";		
	}
	
	this.setAbsPos = function(xp, yp)
	{
		var tx =  (xp - this.posX) ;
		var ty =  (yp - this.posY) ;
		this.setX(xp);
		this.setY(yp);
		this.Element.style.left = this.posX - (this.size/2) + "px";
		this.Element.style.top = this.posY - (this.size / 2) + "px";
		this.dPosX = 0;
		this.dPosY = 0;
		this.Element.style.webkitTransform = "translate3d(0,0,0)";		
	}

	this.resetPos = function()
	{
		if(this.attached)return;
		this.size = 128;
		this.Element.style.width = this.size + "px";
		this.Element.style.height = this.size + "px";
		this.setAbsPos(this.oPosX, this.oPosY);
	}
	this.onTouch = function (event) {
	    if (!ScreenLocked) return;
	    var piece = findPiece(this.id);
	    Debug("PieceTouched: " + piece.Id, 2);
	    if (!piece.isAttachableTo()) return;
	    oldSelectedPiece = selectedPiece;
	    selectedPiece = piece;
	    pMouseDown(event);
	    // event.stopPropagation()
	    event.cancelBubble = true; // Stop event from propagating down to the game board
	    return false;
	}
	this.onUnTouch = function(event)
	{
	}

	this.Element.addEventListener(supportsTouch ? "touchstart" : "mousedown", this.onTouch, true);
	this.setX = function(xp)
	{
		this.posX = xp;
	}
	
	this.setY = function(yp)
	{
		this.posY = yp;
	}
	
	this.getId = function()
	{
		return this.Id;
	}
}

