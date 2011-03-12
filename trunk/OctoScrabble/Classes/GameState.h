//
//  GameState.h
//  Heyepe
//
//  Created by John Cleary on 28/09/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GameStateManager.h";

@interface GameState : UIView {
	
	@protected
		GameStateManager *m_pManager;

}
	-(id) initWithFrame:(CGRect)frame andManager:(GameStateManager*)pManager;
	-(void) Render;
	-(void) Update;

@end
