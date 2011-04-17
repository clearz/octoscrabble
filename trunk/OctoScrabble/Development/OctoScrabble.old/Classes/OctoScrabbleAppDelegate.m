//
//  HeyepeAppDelegate.m
//  Heyepe
//
//  Created by John Cleary on 28/09/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "OctoScrabbleAppDelegate.h"
#import "OctoScrabbleViewController.h"
#import "GameState.h"
#import "gsMainMenu.h"
#import "gsGame.h"
#import "ResourceManager.h"

#define IPHONE_WIDTH 320
#define IPHONE_HEIGHT 480

@implementation OctoScrabbleAppDelegate

@synthesize window;
@synthesize viewController;

- (void) applicationDidFinishLaunching:(UIApplication *)application 
{
	[ResourceManager initialize];
	//create instance of first GameState
	[self doStateChange:[gsMainMenu class] renderLoop:FALSE];
}
- (void) startRenderLoop
{
	if(renderLoopRunning) return;
	renderLoopRunning = true;
	[NSTimer scheduledTimerWithTimeInterval:0.011 target:self selector:@selector(gameLoop:) userInfo:nil repeats:NO];
}
- (void) stopRenderLoop
{
	renderLoopRunning = false;
}
- (void) gameLoop:(id) sender 
{
	double currTime = [[NSDate date] timeIntervalSince1970];
	m_FPS_framesThisSecond++;
	float timeThisSecond = currTime - m_FPS_lastSecondStart;
	if( timeThisSecond > 1.0f ) {
		m_FPS = m_FPS_framesThisSecond;
		m_FPS_framesThisSecond = 0;
		m_FPS_lastSecondStart = currTime;
	}
	[((GameState*)viewController.view) Update];
	[((GameState*)viewController.view) Render];
	if(renderLoopRunning)
		[NSTimer scheduledTimerWithTimeInterval:0.011 target:self selector:@selector(gameLoop:) userInfo:nil repeats:NO];
}

- (void) doStateChange: (Class) state renderLoop: (bool) loop
{
	if ( viewController.view != nil ) {
		//remove the view from the window's subviews.
		[viewController.view removeFromSuperview];
		[viewController.view release]; //release game state.
	}
	
	viewController.view = [[state alloc] initWithFrame:CGRectMake(0, 0, IPHONE_WIDTH, IPHONE_HEIGHT) andManager:self];
	
	//set our view as visible.
	[window addSubview:viewController.view];
	[window makeKeyAndVisible];
	if(loop)
		[self startRenderLoop];
	else
		[self stopRenderLoop];
}

- (int) getFramesPerSecond{
	return m_FPS;
}

- (void)applicationWillTerminate:(UIApplication *)application {
	NSLog(@"appdelegeate release.");
	[g_ResManager shutdown];
}

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
	NSLog(@"low memory, purging caches.");
	[g_ResManager purgeSounds];
	[g_ResManager purgeTextures];
}

- (void)dealloc {
    [viewController release];
    [window release];
    [super dealloc];
}

@end
