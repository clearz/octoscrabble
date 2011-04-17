//
//  gsTest.m
//  Heyepe
//
//  Created by John Cleary on 28/09/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "gsTest.h"
#import "gsMainMenu.h"
#import "OctoScrabbleAppDelegate.h"

@implementation gsTest

-(gsTest*) initWithFrame:(CGRect)frame andManager:(GameStateManager*)pManager
{
	if (self = [super initWithFrame:frame andManager:pManager]){
	}
	return self;
}

-(void) Render
{
	[self setNeedsDisplay];
}
-(void) drawRect:(CGRect) rect 
{
	CGContextRef g = UIGraphicsGetCurrentContext();
	//fill background with blue
	CGContextSetFillColorWithColor(g, [UIColor blueColor].CGColor);
	CGContextFillRect(g, CGRectMake(0, 0, self.frame.size.width, self.frame.size.height));
	
	//draw text in black
	CGContextSetFillColorWithColor(g, [UIColor blackColor].CGColor);
	[@"it works!" drawAtPoint:CGPointMake(10.0,20.0) withFont:[UIFont systemFontOfSize:[UIFont systemFontSize]]];
	
	//fps display from page 76 of iPhone Game Development
	int FPS = [((OctoScrabbleAppDelegate*)m_pManager) getFramesPerSecond];
	NSString* strFPS = [NSString stringWithFormat:@"%d", FPS];
	[strFPS drawAtPoint:CGPointMake(10.0, 60.0) withFont:[UIFont systemFontOfSize:[UIFont systemFontSize]]];
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
