//
//  gsMain.h
//  Heyepe
//
//  Created by John Cleary on 28/09/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GameState.h"

@interface gsMainMenu : GameState {
	IBOutlet UIView* subview;
	IBOutlet UIButton* startBtn;
	IBOutlet UIButton* networkBtn;
	IBOutlet UIButton* optionsBtn;
	IBOutlet UIButton* exitBtn;
}
@property (nonatomic, retain) IBOutlet UIView* subview;
@property (nonatomic, retain) IBOutlet UIButton* startBtn;
@property (nonatomic, retain) IBOutlet UIButton* networkBtn;
@property (nonatomic, retain) IBOutlet UIButton* optionsBtn;
@property (nonatomic, retain) IBOutlet UIButton* exitBtn;

-(IBAction) startBtnClicked:(id)sender;
-(IBAction) optionsBtnClicked:(id)sender;
-(IBAction) networkBtnClicked:(id)sender;
-(IBAction) exitBtnClicked:(id)sender;
@end
