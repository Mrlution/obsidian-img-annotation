import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf ,ItemView } from 'obsidian';
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
}

const DEFAULT_SETTINGS: ImgAnnotationSettings = {//
	mySetting: 'default'
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


		this.registerTouchEventsForHarmonyTabletMouse();
		this.registerEvent(this.app.workspace.on('file-open', async (file) => {
			const canvasView = this.app.workspace.getActiveViewOfType(ItemView);
			if (canvasView?.getViewType() !== 'canvas') return;
			const canvas = (canvasView as any).canvas;
			(this as any).canvas=canvas; //当前打开的canvas
			// new Notice(-canvas.config.zoomMultiplier);
			// canvas.zoomBy(-canvas.config.zoomMultiplier);
			// await delay(1000);
			// canvas.zoomBy(-canvas.config.zoomMultiplier);
			// await delay(1000);
			// canvas.zoomBy(-canvas.config.zoomMultiplier);
			// await delay(1000);
		})); 
	}


	registerTouchEventsForHarmonyTabletMouse() {
		//(this as any).HarmonyTabletMouseEvent=0;
		this.registerDomEvent(document,"touchstart", (event: TouchEvent) => {
			//this.HarmonyTableMouseEvent=1;
			(this as any).HarmonyTableMouseStartTouches=event.touches.item(0);
		});
		this.registerDomEvent(document,"touchmove", (event: TouchEvent) => {
			//this.HarmonyTableMouseEvent=this.HarmonyTableMouseEvent+1;
			(this as any).HarmonyTableMouseEndTouches=event.touches.item(0);
			if(Math.abs(this.HarmonyTableMouseEndTouches.clientX-this.HarmonyTableMouseStartTouches.clientX<0.01)){
				if(this.HarmonyTableMouseEndTouches.clientY>this.HarmonyTableMouseStartTouches.clientY){
					//this.canvas.zoomBy(0.5,{x:this.HarmonyTableMouseEndTouches.clientX-this.canvasRect.cx,y:this.HarmonyTableMouseEndTouches.clientY-this.canvasRect.cy}); //this.canvas.config.zoomMultiplier
					//new Notice("zoom out");
					const wheelEvent = new WheelEvent('wheel', {
						deltaX: 0,       // 水平滚动量
						deltaY: 100,     // 垂直滚动量（正值表示向下滚动）
						deltaZ: 0,       // Z 轴滚动量（通常不常用）
						deltaMode: 0,    // 滚动单位模式：0 表示像素，1 表示行，2 表示页
						bubbles: true,   // 是否冒泡
						cancelable: true // 是否可取消
					});
					document.dispatchEvent(wheelEvent);
				}
				else if(this.HarmonyTableMouseEndTouches.clientY<this.HarmonyTableMouseStartTouches.clientY){
					//this.canvas.zoomBy(-0.5, this.domPosFromEvt(TouchEvent)); //-this.canvas.config.zoomMultiplier
					//new Notice("zoom in");
					const wheelEvent = new WheelEvent('wheel', {
						deltaX: 0,       // 水平滚动量
						deltaY: -100,     // 垂直滚动量（正值表示向下滚动）
						deltaZ: 0,       // Z 轴滚动量（通常不常用）
						deltaMode: 0,    // 滚动单位模式：0 表示像素，1 表示行，2 表示页
						bubbles: true,   // 是否冒泡
						cancelable: true // 是否可取消
					});
					document.dispatchEvent(wheelEvent);
				}
			}
		});
		this.registerDomEvent(document,"touchend", (event: TouchEvent) => {
			new Notice(this.HarmonyTableMouseEvent);
		});
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


	private handleImageClick(event: MouseEvent) {
		// 可以使用event
		new Notice('IMG CLICK');
	}
	// private addImageClickHandler(){
	// 	new Notice('adding handler');
	// 	// 1. 获取当前活动视图的容器元素
	// 	const viewContainer = this.app.workspace.activeLeaf?.view.containerEl;
	// 	// 2. 安全判断：确保容器存在
	// 	if (!viewContainer) return;
	// 	// 3. 查找所有图片元素
	// 	const images = viewContainer.querySelectorAll('img');
	// 	// 4. 为每个图片添加点击事件监听

	// 	images.forEach(img => {
	// 		// 移除可能已存在的事件监听（避免重复添加）
	// 		img.removeEventListener('click', this.handleImageClick);
	// 		// 添加新的事件监听
	// 		img.addEventListener('click', this.handleImageClick.bind(this));
	// 	});
	// }

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

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
