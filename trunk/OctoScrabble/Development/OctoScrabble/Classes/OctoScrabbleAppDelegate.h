//
//  OctoScrabbleAppDelegate.h
//  OctoScrabble
//
//  Created by John Cleary on 14/12/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "GameStateManager.h";

@class OctoScrabbleViewController;

@interface OctoScrabbleAppDelegate : GameStateManager <UIApplicationDelegate> {
    UIWindow *window;
    OctoScrabbleViewController *viewController;
	CFTimeInterval m_FPS_lastSecondStart;
	int m_FPS_framesThisSecond;
	int m_FPS;
	bool renderLoopRunning;
}
- (int) getFramesPerSecond;
- (void) startRenderLoop;
- (void) stopRenderLoop;

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet OctoScrabbleViewController *viewController;

@end

