//
//  gsMain.m
//  Heyepe
//
//  Created by John Cleary on 28/09/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "gsMainMenu.h"
#import "OctoScrabbleAppDelegate.h"
#import "gsGame.h"
#import "gsTest.h"
#import "gsOptions.h"
#import "ResourceManager.h"
#import "gsGameOpenGL.h"

@implementation gsMainMenu

@synthesize startBtn;
@synthesize subview;
@synthesize networkBtn;
@synthesize optionsBtn;
@synthesize exitBtn;

-(gsMainMenu*) initWithFrame:(CGRect)frame andManager:(GameStateManager*)pManager
{
	if (self = [super initWithFrame:frame andManager:pManager]){
		[[NSBundle mainBundle] loadNibNamed:@"MainMenu" owner:self options:nil];
		//add subview as... a subview.  This will let everything from the nib file show up on screen.
		//	subview.frame.size = self.frame.size;
		[self addSubview:subview];
	}
	[g_ResManager stopMusic];
	[g_ResManager playMusic:@"island.mp3"];
	return self;
}

-(IBAction) startBtnClicked:(id)sender
{
	int renderType = 0; // 0 == HTML 1 = OpenGL 2 = Quartz 2D
	if([g_ResManager userDataExists:@"renderBtn.text"])
	{
		if ([[g_ResManager getUserData:@"renderBtn.text"] isEqualToString:@"HTML5"]) {
			renderType = 0;
		}
		else if ([[g_ResManager getUserData:@"renderBtn.text"] isEqualToString:@"OpenGL"]) {
			renderType = 1;
		}
	}
	NSLog(@"renderType: %d obj: %@", renderType, [g_ResManager getUserData:@"renderBtn.text"]);
	[g_ResManager playSound:@"tap.caf"];
	if(renderType == 0)
		[m_pManager doStateChange:[gsGame class] renderLoop:FALSE];
	else if(renderType == 1)
		[m_pManager doStateChange:[gsGameOpenGL class] renderLoop:TRUE];
}

-(IBAction) optionsBtnClicked:(id)sender
{
	[g_ResManager playSound:@"tap.caf"];
	[m_pManager doStateChange:[gsOptions class] renderLoop:FALSE];
}

-(IBAction) networkBtnClicked:(id)sender
{

}

-(IBAction) exitBtnClicked:(id)sender
{
	[g_ResManager playSound:@"tap.caf"];
	UIAlertView* alert = [[[UIAlertView alloc] init] autorelease];
	[alert setTitle:@"Confirm Exit"];
	[alert setMessage:@"Are you sure?"];
	[alert addButtonWithTitle:@"Yes"];
	[alert addButtonWithTitle:@"No"];
	[alert setDelegate:self]; 
	[alert show];
}

-(void) alertView: (UIAlertView*)alertView clickedButtonAtIndex:(NSInteger)buttonIndex 
{
	if(buttonIndex == 0) // Yes Clicked
		exit(0);
		
}

@end
