//
//  GameStateManager.h
//  Heyepe
//
//  Created by John Cleary on 28/09/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>


@interface GameStateManager : NSObject {
	
}
- (void) doStateChange: (Class) state renderLoop:(bool) loop;
@end
