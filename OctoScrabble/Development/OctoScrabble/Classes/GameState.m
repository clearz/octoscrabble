//
//  GameState.m
//  Heyepe
//
//  Created by John Cleary on 28/09/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "GameState.h"


@implementation GameState

-(id) initWithFrame:(CGRect)frame andManager:(GameStateManager*)pManager;
{
	if(self = [super initWithFrame:frame])
	{
		m_pManager = pManager;
		self.userInteractionEnabled = true;
	}
	return self;
}

-(void) Update
{
}

-(void) Render
{
}

-(void) drawRect:(CGRect)rect
{
}

@end
