//
//  gsGameOpenGL.m
//  OctoScrabble
//
//  Created by John Cleary on 24/12/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "gsGameOpenGL.h"
#import "gsMainMenu.h"
#import "ResourceManager.h"
#import "GameStateManager.h"
#import "OctoScrabbleAppDelegate.h"
#import "GLTexture.h";

@implementation gsGameOpenGL

-(id) initWithFrame:(CGRect)frame andManager:(GameStateManager*)pManager;
{
    if (self = [super initWithFrame:frame andManager:pManager]) {
        bg = [g_ResManager getTexture:@"images/bg.png"];
    }
    return self;
}

-(void) Render
{
	//clear anything left over from the last frame, and set background color.
	//glClearColor(0xff/256.0f, 0x66/256.0f, 0x00/256.0f, 1.0f);
	//glClear(GL_COLOR_BUFFER_BIT);
	
	//render textures here.
	//some rendering offsets
	int yspacing = -24, line = 0, yoff = 360;
	int leftcolumn = 10;
	for(int x=0;x<3;x++)
		for(int y=0;y<5;y++)
			[bg drawAtPoint:CGPointMake(x*128, y*128)];
	// Test OpenGL Font
	[[g_ResManager defaultFont] drawString:@"Test Font" atPoint:CGPointMake(leftcolumn, yoff+yspacing*line++)];
	
	[[g_ResManager defaultFont] drawString:@"OpenGL Texture test:" atPoint:CGPointMake(leftcolumn, yoff+yspacing*line++)];
	line+=2;
	
	//make the image waggle back and forth.
	float sx = (1+sin([[NSDate date] timeIntervalSince1970])) * self.frame.size.width / 2;
	float sy = (1+cos([[NSDate date] timeIntervalSince1970])) * self.frame.size.height / 2;
	
	[[g_ResManager getTexture:@"images/discs/F.png"] drawAtPoint:CGPointMake(sx, yoff+yspacing*line++) withRotation:0 withScale:0.5 ];
	[[g_ResManager getTexture:@"images/discs/K.png"] drawAtPoint:CGPointMake(200, sy) withRotation:0 withScale:0.5 ];
	yoff -= [[g_ResManager getTexture:@"images/discs/F.png"] contentSize].height;
	
	//you get a nice boring white screen if you forget to swap buffers.
	[self swapBuffers];
}



-(void) touchesEnded:(NSSet*)touches withEvent:(UIEvent*)event
{
	UITouch* touch = [touches anyObject];
	NSUInteger numTaps = [touch tapCount];
	if( numTaps > 1 ) {
		[m_pManager doStateChange:[gsMainMenu class] renderLoop:FALSE];
	}
}

@end
