import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf ,ItemView } from 'obsidian';
import { text } from 'stream/consumers';
//import { Canvas, StaticCanvas, FabricText } from 'fabric'

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function touchesToString(touches) {
    // 将 TouchList 转换为普通数组
    const touchArray = Array.from(touches).map(touch => ({
        identifier: touch.identifier,
        clientX: touch.clientX,
        clientY: touch.clientY,
        pageX: touch.pageX,
        pageY: touch.pageY,
    }));

    // 使用 JSON.stringify 转换为字符串
    return JSON.stringify(touchArray, null, 2);
}


// Remember to rename these classes and interfaces!

interface ImgAnnotationSettings {
	mySetting: string;
	zoomSpeedSetting:number;
}

const DEFAULT_SETTINGS: ImgAnnotationSettings = {
	mySetting: 'default',
	zoomSpeedSetting:0.2,
}

export default class ImgAnnotation extends Plugin {
	settings: ImgAnnotationSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('HelloYou');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		//	console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
		
		// this.app.workspace.on('layout-change',()=>{
		// 	//this.addImageClickHandler();
		// 	new Notice('layout change');
		// 	console.log('start');
		// 	this.app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
		// 		//new Notice(leaf.getViewState()?.type)
		// 		console.log(leaf.getViewState()?.type);

		// 	})
		// 	console.log('end');
		// })


		//this.registerTouchEventsForHarmonyTabletMouse();
		this.registerEvent(this.app.workspace.on('active-leaf-change', async (leaf:WorkspaceLeaf|null) => {
			const canvasView = this.app.workspace.getActiveViewOfType(ItemView);
			if (canvasView?.getViewType() !== 'canvas') return;
			const canvas = (canvasView as any).canvas;
			//(this as any).canvas=canvas; //当前打开的canvas

			if(!canvasView.isRegisteredTouchAndKeyEvents)
			{
				(canvasView as any).ctrlKeyIsPressed=false;
				this.registerDomEvent(canvasView.containerEl,"keydown", (event: KeyboardEvent) => {
					if(event.ctrlKey){
						canvasView.ctrlKeyIsPressed=true;
					}
				});
				this.registerDomEvent(canvasView.containerEl,"keyup", (event: KeyboardEvent) => {
					if(!event.ctrlKey){
						canvasView.ctrlKeyIsPressed=false;
					}
				});
				this.registerDomEvent(canvasView.containerEl,"touchstart", (event: TouchEvent) => {
					//new Notice(touchesToString(event.touches));
					(canvasView as any).HarmonyTableMouseStartTouches=event.touches.item(0);
					//new Notice(this);
					//new Notice("touchstart");
				});	

				this.registerDomEvent(canvasView.containerEl,"touchmove", (event: TouchEvent) => {
					//new Notice(touchesToString(event.touches));
					(canvasView as any).HarmonyTableMouseEndTouches=event.touches.item(0);
					//if(Math.abs(canvasView.HarmonyTableMouseEndTouches.clientX-canvasView.HarmonyTableMouseStartTouches.clientX<0.000000000001)){}

					if(canvasView.ctrlKeyIsPressed&&canvasView.HarmonyTableMouseEndTouches.clientY>canvasView.HarmonyTableMouseStartTouches.clientY){
						canvasView.canvas.zoomBy(this.settings.zoomSpeedSetting,{x:canvasView.HarmonyTableMouseEndTouches.clientX-canvasView.canvas.canvasRect.cx,y:canvasView.HarmonyTableMouseEndTouches.clientY-canvasView.canvas.canvasRect.cy}); //this.canvas.config.zoomMultiplier
					}
					else if(canvasView.ctrlKeyIsPressed&&canvasView.HarmonyTableMouseEndTouches.clientY<canvasView.HarmonyTableMouseStartTouches.clientY){
						canvasView.canvas.zoomBy(-this.settings.zoomSpeedSetting, {x:canvasView.HarmonyTableMouseEndTouches.clientX-canvasView.canvas.canvasRect.cx,y:canvasView.HarmonyTableMouseEndTouches.clientY-canvasView.canvas.canvasRect.cy}); //-this.canvas.config.zoomMultiplier
					}
					
				});
				(canvasView as any).isRegisteredTouchAndKeyEvents = true;
			}
		

		})); 
		

	}


	registerTouchEventsForHarmonyTabletMouse() {
		this.registerDomEvent(document,"touchstart", (event: TouchEvent) => {
			(this as any).HarmonyTableMouseStartTouches=event.touches.item(0);
		});
		this.registerDomEvent(document,"touchmove", (event: TouchEvent) => {
			(this as any).HarmonyTableMouseEndTouches=event.touches.item(0);
			if(Math.abs(this.HarmonyTableMouseEndTouches.clientX-this.HarmonyTableMouseStartTouches.clientX<0.01)){
				if(this.HarmonyTableMouseEndTouches.clientY>this.HarmonyTableMouseStartTouches.clientY){
					this.canvas.zoomBy(0.5,{x:this.HarmonyTableMouseEndTouches.clientX-this.canvas.canvasRect.cx,y:this.HarmonyTableMouseEndTouches.clientY-this.canvas.canvasRect.cy}); //this.canvas.config.zoomMultiplier
				}
				else if(this.HarmonyTableMouseEndTouches.clientY<this.HarmonyTableMouseStartTouches.clientY){
					this.canvas.zoomBy(-0.5, {x:this.HarmonyTableMouseEndTouches.clientX-this.canvas.canvasRect.cx,y:this.HarmonyTableMouseEndTouches.clientY-this.canvas.canvasRect.cy}); //-this.canvas.config.zoomMultiplier
				}
			}
		});
		// this.registerDomEvent(document,"touchend", (event: TouchEvent) => {
		// });
	}
		// const touchEvents = ["touchstart", "touchmove", "touchend"];
        // touchEvents.forEach((eventName) => {
        //     this.registerDomEvent(document, eventName, (event: TouchEvent) => {
        //         //console.log(`Touch event: ${eventName}`, event);
		// 		new Notice(touchesToString(event.touches));
		// 		//new Notice(`${eventName}`, event.touches.stringify());
        //     });
        // });


	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	

}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: ImgAnnotation;

	constructor(app: App, plugin: ImgAnnotation) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		// new Setting(containerEl)
		// 	.setName('Setting #1')
		// 	.setDesc('It\'s a secret')
		// 	.addText(text => text
		// 		.setPlaceholder('Enter your secret')
		// 		.setValue(this.plugin.settings.mySetting)
		// 		.onChange(async (value) => {
		// 			this.plugin.settings.mySetting = value;
		// 			await this.plugin.saveSettings();
		// 		}));
		new Setting(containerEl)
			.setName('Zoom Speed')
			.setDesc('0.1 to 1.0')
			.addText((text) => {
				text
				.setPlaceholder('0.2')
				.setValue(this.plugin.settings.zoomSpeedSetting.toString())
				.onChange(async (value) => {
					const float_value= parseFloat(value);
					
					if(!isNaN(float_value) &&(float_value>=0.01 && float_value<=1.0)){
						this.plugin.settings.zoomSpeedSetting = float_value;
					}else{
						this.plugin.settings.zoomSpeedSetting = 0.2;
					}
					text.setValue(this.plugin.settings.zoomSpeedSetting.toString());
					await this.plugin.saveSettings();
				})
			});
	}
}
