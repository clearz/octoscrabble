//
//  gsOptions.h
//  Heyepe
//
//  Created by John Cleary on 14/11/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GameState.h"


@interface gsOptions : GameState <UIPickerViewDelegate, UIPickerViewDataSource> {
	IBOutlet UIView* subview;
	IBOutlet UIButton* mainMenuBtn;
	IBOutlet UIPickerView* pickerView;
	IBOutlet UISwitch* playMusic;
	IBOutlet UISwitch* playSound;
	IBOutlet UIButton* renderBtn;
	NSMutableArray *renderMethods;
}
@property (nonatomic, retain) IBOutlet UIView* subview;
@property (nonatomic, retain) IBOutlet UIButton* mainMenuBtn;
@property (nonatomic, retain) IBOutlet UIPickerView* pickerView;
@property (nonatomic, retain) IBOutlet UISwitch* playSound;
@property (nonatomic, retain) IBOutlet UISwitch* playMusic;
@property (nonatomic, retain) IBOutlet UIButton* renderBtn;

-(IBAction) mainMenuBtnClicked:(id)sender;
-(IBAction) renderBtnClicked:(id)sender;
-(IBAction) playMusicSliderClicked:(id)sender;
-(IBAction) playSoundSliderClicked:(id)sender;
@end

