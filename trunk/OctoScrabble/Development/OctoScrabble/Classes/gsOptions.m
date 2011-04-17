//
//  gsOptions.m
//  Heyepe
//
//  Created by John Cleary on 14/11/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "gsOptions.h"
#import "gsMainMenu.h";
#import "OctoScrabbleAppDelegate.h"
#import "ResourceManager.h"

@implementation gsOptions

@synthesize mainMenuBtn;
@synthesize subview;
@synthesize pickerView;
@synthesize playSound;
@synthesize playMusic;
@synthesize renderBtn;

-(IBAction) mainMenuBtnClicked:(id)sender
{
	[g_ResManager playSound:@"tap.caf"];
	[m_pManager doStateChange:[gsMainMenu class] renderLoop:FALSE];
}

-(IBAction) renderBtnClicked:(id)sender
{
	pickerView.hidden = FALSE;
	NSString* rMethod = [renderBtn titleLabel].text;

	// Select the chosen row in picker
	NSInteger pos = [renderMethods indexOfObject:[renderBtn titleLabel].text];
	[pickerView selectRow:pos inComponent:0 animated:NO];
}

-(gsOptions*) initWithFrame:(CGRect)frame andManager:(GameStateManager*)pManager
{
	if (self = [super initWithFrame:frame andManager:pManager]){
		[[NSBundle mainBundle] loadNibNamed:@"Options" owner:self options:nil];
		[self addSubview:subview];
	}
	
	renderMethods = [[NSMutableArray alloc] init];
	[renderMethods addObject:@"HTML5"];
	[renderMethods addObject:@"OpenGL"];
	[renderMethods addObject:@"Quartz 2D"];
	
	pickerView.hidden = TRUE;
	
	playSound.on = [[g_ResManager getUserData:@"playSound.on"] boolValue];
	playMusic.on = [[g_ResManager getUserData:@"playMusic.on"] boolValue];
	if([g_ResManager userDataExists:@"renderBtn.text"])
		[renderBtn setTitle:[g_ResManager getUserData:@"renderBtn.text"] forState:UIControlStateNormal];
	return self;
}
-(IBAction) playMusicSliderClicked:(id)sender
{
	[g_ResManager storeUserData:[NSNumber numberWithBool:playMusic.on] toFile:@"playMusic.on"];
	[g_ResManager playSound:@"tap.caf"];
	if(playMusic.on)
	{
		[g_ResManager stopMusic];
		[g_ResManager playMusic:@"island.mp3"];
	}
	else {
		[g_ResManager stopMusic];
	}

}
-(IBAction) playSoundSliderClicked:(id)sender
{
	[g_ResManager storeUserData:[NSNumber numberWithBool:playSound.on] toFile:@"playSound.on"];
	if(playSound.on)
		[g_ResManager playSound:@"tap.caf"];
}
-(NSInteger) numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
	return 1;
}

- (NSInteger)pickerView:(UIPickerView *)thePickerView numberOfRowsInComponent:(NSInteger)component {
	
	return [renderMethods count];
}

- (NSString *)pickerView:(UIPickerView *)thePickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component {
	return [renderMethods objectAtIndex:row];
}

- (void)pickerView:(UIPickerView *)thePickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component {
	
	//NSLog(@"Selected Color: %@. Index of selected color: %i", [renderMethods objectAtIndex:row], row);
	if(row == 0)
		[renderBtn setTitle:@"HTML5" forState:UIControlStateNormal];
	else if(row == 1)
		[renderBtn setTitle:@"OpenGL" forState:UIControlStateNormal];
	else {
		UIAlertView* alert = [[[UIAlertView alloc] init] autorelease];
		[alert setTitle:@"Not Implemented"];
		[alert setMessage:[NSString stringWithFormat:@"%@ engine is not supported",[renderMethods objectAtIndex:row]]];
		[alert addButtonWithTitle:@"OK"];
		[alert show];
		return;
	}
	
	[g_ResManager storeUserData:[renderMethods objectAtIndex:row] toFile:@"renderBtn.text"];
	
	pickerView.hidden = TRUE;
		
}
@end
