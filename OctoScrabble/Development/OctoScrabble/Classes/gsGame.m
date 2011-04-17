//
//  gsTest.m
//  Heyepe
//
//  Created by John Cleary on 28/09/2010.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "gsMainMenu.h"
#import "gsGame.h"

@implementation gsGame

@synthesize subview;
@synthesize browser;

//for saving preferences or other game data.  This is stored in the documents directory, and may persist between app version updates.
- (BOOL) storeUserData:(id) data toFile:(NSString*) filename {
	[[NSUserDefaults standardUserDefaults] setObject:data forKey:filename];
	return YES;
}

//for loading prefs or other data saved with storeData.
- (id) getUserData:(NSString*) filename {
	return [[NSUserDefaults standardUserDefaults] objectForKey:filename];
}

- (BOOL) userDataExists:(NSString*) filename{
	return [self getUserData:filename] != nil;
}

- (BOOL) webView:(UIWebView *)p_WebView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
	NSString* scheme = [[request URL] scheme];
	NSString* query = [[request URL] query];
	NSString* params = [[request URL] parameterString];
	if([scheme isEqualToString:@"ots"])
	{
		NSLog(@"Should page load?. scheme=%@, query=%@, parameterString=%@", scheme, query, params);
		[m_pManager doStateChange:[gsMainMenu class] renderLoop:FALSE];
		return FALSE;
	}
	
	return TRUE;
}


-(gsGame*) initWithFrame:(CGRect)frame andManager:(GameStateManager*)pManager
{
	if (self = [super initWithFrame:frame andManager:pManager]){
		[[NSBundle mainBundle] loadNibNamed:@"GameWindow" owner:self options:nil];
		//add subview as... a subview.  This will let everything from the nib file show up on screen.
	//	subview.frame.size = self.frame.size;
		[self addSubview:subview];
	}
	[browser loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"OctoScrabble" ofType:@"html"]isDirectory:NO]]];
	browser.delegate = self;
	return self;
}

- (void) callBack: (NSString*) data
{
	NSLog(@"%s", data);
}

@end
