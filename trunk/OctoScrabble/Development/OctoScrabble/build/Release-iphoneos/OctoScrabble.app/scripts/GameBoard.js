var blockBoardTouch = false;
var gamePieces = new Array(); // Holds all the pieces on the board
var it = 0;
var selectedPiece, oldSelectedPiece;
var board;
var touchevent;
var supportsTouch = 'createTouch' in document; // Check if it is an iOS device or a PC/Mac 
var ScreenLocked = false;
var cMenu; // The board piece collection
var dialog;


// USAGE: called by the pages onload event. preforms any application initializiation
// PARAM: (none)
// RETURNS (none)
function Init() {
    try{
        ClearDebug();
		dialog = new Dialog("Quit to Main Menu?");
	    board = document.getElementById("board"); // get a pointer to the boards div
        cMenu = new ControlMenu();
		cMenu.toggleLock();
		//window.scrollTo(2240,2400); // move to the center of the board 3373,3328
	    board.appendChild(cMenu.Element);
		board.appendChild(cMenu.TopElement);
		board.appendChild(dialog.Element);
		
        board.addEventListener(supportsTouch ? "touchstart" : "mousedown", boardClicked, false);
	    board.addEventListener(supportsTouch ? "touchmove" : "mousemove", pMouseMove, true);
		//dialog.Element.addEventListener(supportsTouch ? "touchmove" : "mousemove", pMouseMove, true);
	    board.addEventListener(supportsTouch ? "touchend" : "mouseup", pMouseUp, true);
		//addPiece(new GamePiece(2496, 2656, images[((it++) % images.length)]));//3776, 3904
	    cMenu.IShow();
    } catch (e) {
        var lln = "";
        for (var i in e) lln += (i + ' = ' + e[i]) + " ";
        alert("Exception: " + lln); ;
    }
}

// USAGE: for checking if a piece can attach to another piece and will not sit over another one
// PARAM: (sel) the piece calling this fuction. Used so that a piece does not collide against itself
// PARAM: (posX) The x coordinate of the calling piece
// PARAM: (posY) The y coordinate of the calling piece
// RETURNS: false if the piece is the calling piece or the piece is the selectedPiece
// RETURNS: true if the point collides with any other piece
function checkPointCollision(self, posX, posY)
{
	var x;
	for(x = 0; x < gamePieces.length ; x++ )
		if(self != gamePieces[x] && selectedPiece != gamePieces[x] && gamePieces[x].pointCollides(posX, posY))
			return true;

	return false;
}

// USAGE: for checking a which positions an arrow can be dislpayed
// PARAM: (sel) the piece calling this fuction. Used so that arrows do not collide against the calling piece
// PARAM: (posX) The x coordinate of the calling piece
// PARAM: (posY) The y coordinate of the calling piece
// RETURNS: false if the piece is the calling piece
// RETURNS: true if the arrow collides with any other piece
function checkPointCollisionPure(self, posX, posY) {
	var x;
	for(x = 0; x < gamePieces.length ; x++ )
		if(gamePieces[x] != self && gamePieces[x].pointCollides(posX, posY))
			return true;
			
	return false;
}


// USAGE: Check what object has been touched on the screen
// PARAM: (posX) The x coordinate of the calling piece
// PARAM: (posY) The y coordinate of the calling piece
// RETURNS: false if the piece is the calling piece
// RETURNS: true if the arrow collides with any other piece
function checkItemCollision(posX, posY) 
{
	var x;
	for(x = 0; x < gamePieces.length ; x++ )
	{
		var gp = gamePieces[x];


		var arrow = gp.checkPointInArrow(posX, posY);
		if (arrow) return arrow;

		if (gp.pointCollides(posX, posY))
		    return gamePieces[x];
	}
		
	return false;
}

// USAGE: for checking a which positions an arrow can be dislpayed
// PARAM: (sel) the piece calling this fuction. Used so that arrows do not collide against the calling piece
// PARAM: (posX) The x coordinate of the calling piece
// PARAM: (posY) The y coordinate of the calling piece
// RETURNS: false if the piece is the calling piece
// RETURNS: true if the arrow collides with any other piece
function checkItemCollisionEx(posX, posY) {
    var x;
    var cols = new Array();
    var gpG, sm;
    for (x = 0; x < gamePieces.length; x++) {
        var gp = gamePieces[x];
        if (gamePieces[x].pointCollides(posX, posY))
            gpG = gp;
        var arrow = gp.checkPointInArrowEx(posX, posY);
        if (arrow) cols.push(arrow);
    }

    if (cols.length == 1)
        sm = cols[0];
    else if (cols.length > 1) {
       //Debug("You hit " + cols.length + " arrows!!!", 2);
        var y;
        for (x = 0; x < cols.length; x++)
            for (y = x + 1; y < cols.length; y++) {
                var dx1 = cols[x].posX - posX;
                var dy1 = cols[x].posY - posY;
                var dx2 = cols[y].posX - posX;
                var dy2 = cols[y].posY - posY;

                var d1 = (dx1 * dx1) + (dy1 * dy1);
                var d2 = (dx2 * dx2) + (dy2 * dy2);
              //Debug(cols[x].Dir + "(d1): " + d1 + " - " + cols[y].Dir + "(d2): " + d2, 2)
                if (d1 < d2)
                    sm = cols[x];

            }
       //Debug(y - 1, 2);
        if (!sm)
            sm = cols[y - 1];
       //Debug(sm.Dir, 2);
    }
    
    if (!sm && !gpG) return false;
    if (sm && !gpG) return sm;
    if (gpG && !sm) return gpG;

    var dx1 = sm.posX - posX;
    var dy1 = sm.posY - posY;
    var dx2 = gpG.posX - posX;
    var dy2 = gpG.posY - posY;

    var d1 = (dx1 * dx1) + (dy1 * dy1);
    var d2 = (dx2 * dx2) + (dy2 * dy2);
    //Debug(sm.Id + "(d1): " + d1 + " - " + gpG.Id + "(d2): " + d2, 2)
    if (d1 < d2)
        return sm;
    return gpG;
}
// USAGE: a mouse click has happened on the main game board
// PARAM: (event) info about the click
// RETURNS (none)
function boardClicked(event) {

        var xPos = supportsTouch ? event.touches[0].clientX : event.clientX
        var yPos = supportsTouch ? event.touches[0].clientY : event.clientY;

        var xPix = xPos - (xPos % 128) + 64;
        var yPix = yPos - (yPos % 128) + 64;
        var zoom = window.innerWidth / document.documentElement.clientWidth;
	
        if (ScreenLocked)
        {
            //Debug("BordTouched@" + xPos + "," + yPos, 2);
//Debug("WindowPosition@" + window.innerWidth + "," + window.pageYOffset + " Zoom=" + zoom + " clientWidth=" + document.documentElement.clientWidth + " clientHeight=" + document.documentElement.clientHeight, 2);
           // Debug("!selectedPiece: "  + !selectedPiece + " !selectedPiece.isSelected: " + ((selectedPiece) ? !selectedPiece.isSelected : "null"))
            try {
                var object = checkItemCollisionEx(xPix, yPix);
                if (object) {

                    if (object.arrowClicked) {
                        //selectedPiece = null;
                        object.arrowClicked(event);
                    }
                    else {
                        //Debug(object.isAttachableTo(), 2);
                        if (!object.isAttachableTo()) return;
                        oldSelectedPiece = selectedPiece;
                        selectedPiece = object;
                        pMouseDown(event);

                        event.preventDefault();
                    }
                }
                else if (!selectedPiece || !selectedPiece.isSelected) {
                    addPiece(new GamePiece(xPix, yPix, images[((it++) % images.length)]));
                }
            } catch (e) {
                var lln = "";
                for (var i in e) lln += (i + ' = ' + e[i]) + "\r\n";
                alert("Exception: " + lln); ;
            }
            event.preventDefault();
        }
 }

// USAGE: Adds a new game piece to the board
// PARAM: (gp) the game piece to add
// RETURNS (none)
function addPiece(gp)
{
	//gp.Element.addEventListener(supportsTouch ? "touchstart" : "mousedown", pMouseDown, true);
	//gp.Element.addEventListener(supportsTouch ? "touchend" : "mouseup", pMouseUp, true);
    //gp.Element.addEventListener(supportsTouch ? "touchmove" : "mousemove", pMouseMove, true);
	gamePieces.push(gp);
	board.appendChild(gp.Element);
	checkAllArrows();
}

// USAGE: remove all arrows from each piece then only display the ones with available moves.
// PARAM: (none)
// RETURNS (none)
function checkAllArrows() {
    //return;
	var x;
	//clearArrows();
	for(x = gamePieces.length-1; x >= 0  ; x-- )
	{
		gamePieces[x].removeArrows();
		gamePieces[x].drawArrows();
	}
}

function hideAllArrows()
{
	var x;
	for(x = gamePieces.length-1; x >= 0  ; x-- )
		gamePieces[x].setArrowVisibility(false);
}

function showAllArrows()
{
	var x;
	for(x = gamePieces.length-1; x >= 0  ; x-- )
		gamePieces[x].setArrowVisibility(true);
}

// USAGE: check for a collision between two gamepieces.
// PARAM: (other) is the calling gamepiece
// RETURNS (none)
function checkCollision()
{
	var x;
	for(x = 0; x < gamePieces.length ; x++ )
		if(selectedPiece.collidsWith(gamePieces[x]))
			if(gamePieces[x] != selectedPiece)
				return gamePieces[x];

	return null;
}



// USAGE: dragging finger while there is a selected object. This checks for a collision and if it finds one it attaches the two pieces at the required ends
// PARAM: (event) a mouseevent carrying any info about the event
// RETURNS (none)
function pMouseMove(event)
{
        if (!ScreenLocked)
            cMenu.Hide();
	if( selectedPiece == null || selectedPiece.attached ) return;
	var posX, posY;
	
	var collidedWith = checkCollision();
	if(collidedWith != null)
	{
		var x1 = collidedWith.posX;
		var y1 = collidedWith.posY;
		var x2 = selectedPiece.posX;
		var y2 = selectedPiece.posY;
		var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI; // Get the angle of the line between the points at the center of the touching pieces
		angle += 180;
		if(angle > 337.5 || angle <= 22.5)
			pos = "w";
		else if(angle > 22.5 && angle <= 67.5)
			pos = "nw";
		else if(angle > 67.5 && angle <= 112.5)
			pos = "n";
		else if(angle > 112.5 && angle <= 157.5)
			pos = "ne";
		else if(angle > 157.5 && angle <= 202.5)
			pos = "e";
		else if(angle > 202.5 && angle <= 247.5)
			pos = "se";
		else if(angle > 247.5 && angle <= 292.5)
			pos = "s";
		else if(angle > 292.5 && angle <= 337.5)
			pos = "sw";

        //Debug(collidedWith.Id + "-" + selectedPiece.Id, 2);
		if(!collidedWith.attachPiece(selectedPiece, pos)) // *Try* to attach pieces
		{
			var touch = supportsTouch ? event.touches[0] : event;
			//event.preventDefault();		
			selectedPiece.setPos(touch.clientX, touch.clientY);
		}
	}
	else
	{
	    var touch = supportsTouch ? event.touches[0] : event;
		selectedPiece.setPos(touch.clientX, touch.clientY);
	}
    event.preventDefault();
}

// USAGE: A piece has been selected by touching it.
// PARAM: (event) a mouseevent carrying any info about the event
// RETURNS (none)
function pMouseDown(event)
{
    if (selectedPiece == null) return;

    if (oldSelectedPiece != null && oldSelectedPiece.Id != selectedPiece.Id && oldSelectedPiece.attached && oldSelectedPiece.isSelected) {
		
        oldSelectedPiece.setSize(128);
        oldSelectedPiece.isSelected = false;
    }
	if(selectedPiece.attached)
	{
		if(selectedPiece.isSelected)
		{
			selectedPiece.setSize(128);
			selectedPiece.isSelected = false;
			//ScreenLocked = false;
			showAllArrows();
			//if (!cMenu.Hidden)
			//    cMenu.Hide();
		}
		else
		{
		    hideAllArrows();
		    if (cMenu.Hidden)
		        cMenu.Show();
		    ScreenLocked = true;
		    //DisplayMenu();
			selectedPiece.setArrowVisibility(true);
			selectedPiece.isSelected;
			selectedPiece.isSelected = true;
			selectedPiece.setSize(148);
			//selectedPiece.setArrowVisibility(true);
		}
	}
	else
	{
		selectedPiece.removeArrows();
		showAllArrows();
		selectedPiece.setSize(148);
	}
}

// USAGE: finger has been lifted off the selected piece.
// PARAM: (event) a mouseevent carrying any info about the event
// RETURNS (none)
function pMouseUp(event) {

    event.preventDefault();
    if (cMenu.Hidden)
        cMenu.Show();
	if(selectedPiece == null || selectedPiece.attached)return;

	selectedPiece.resetPos();
	selectedPiece.drawArrows();
	selectedPiece = null;
	//document.body.removeEventListener("touchmove", pBoardMove, false);
}

// USAGE: find a piece object based on its id
// PARAM: (id) this is the id of the img tag and piece id
// RETURNS the gamePiece found otherwise null.
function findPiece(id)
{
	var x;
	for(x=0;x<gamePieces.length;x++)
		if(gamePieces[x].Id == id)
			return gamePieces[x];
	return null;
}

