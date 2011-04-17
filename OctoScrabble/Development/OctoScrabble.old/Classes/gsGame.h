//
//  gsTest.h
//  Heyepe
//
//  Created by John Cleary on 28/09/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GameState.h"

@interface gsGame : GameState <UIWebViewDelegate>{
	IBOutlet UIView* subview;
	IBOutlet UIWebView* browser;
}

@property (nonatomic, retain) IBOutlet UIView* subview;
@property (nonatomic, retain) IBOutlet UIWebView* browser;

- (void) callBack: (NSString*) data;

@end
