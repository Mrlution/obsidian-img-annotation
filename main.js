/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ImgAnnotation
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  //
  mySetting: "default"
};
var ImgAnnotation = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    const ribbonIconEl = this.addRibbonIcon("dice", "Sample Plugin", (evt) => {
      new import_obsidian.Notice("HelloYou");
    });
    ribbonIconEl.addClass("my-plugin-ribbon-class");
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("Status Bar Text");
    this.addCommand({
      id: "open-sample-modal-simple",
      name: "Open sample modal (simple)",
      callback: () => {
        new SampleModal(this.app).open();
      }
    });
    this.addCommand({
      id: "sample-editor-command",
      name: "Sample editor command",
      editorCallback: (editor, view) => {
        console.log(editor.getSelection());
        editor.replaceSelection("Sample Editor Command");
      }
    });
    this.addCommand({
      id: "open-sample-modal-complex",
      name: "Open sample modal (complex)",
      checkCallback: (checking) => {
        const markdownView = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
        if (markdownView) {
          if (!checking) {
            new SampleModal(this.app).open();
          }
          return true;
        }
      }
    });
    this.addSettingTab(new SampleSettingTab(this.app, this));
    this.registerDomEvent(document, "click", (evt) => {
    });
    this.registerInterval(window.setInterval(() => console.log("setInterval"), 5 * 60 * 1e3));
    this.registerEvent(this.app.workspace.on("file-open", async (file) => {
      const canvasView = this.app.workspace.getActiveViewOfType(import_obsidian.ItemView);
      if ((canvasView == null ? void 0 : canvasView.getViewType()) !== "canvas")
        return;
      const canvas = canvasView.canvas;
      this.canvas = canvas;
      this.registerDomEvent(canvasView.containerEl, "touchstart", (event) => {
        this.HarmonyTableMouseStartTouches = event.touches.item(0);
        new import_obsidian.Notice("touchstart");
      });
    }));
  }
  registerTouchEventsForHarmonyTabletMouse() {
    this.registerDomEvent(document, "touchstart", (event) => {
      this.HarmonyTableMouseStartTouches = event.touches.item(0);
    });
    this.registerDomEvent(document, "touchmove", (event) => {
      this.HarmonyTableMouseEndTouches = event.touches.item(0);
      if (Math.abs(this.HarmonyTableMouseEndTouches.clientX - this.HarmonyTableMouseStartTouches.clientX < 0.01)) {
        if (this.HarmonyTableMouseEndTouches.clientY > this.HarmonyTableMouseStartTouches.clientY) {
          this.canvas.zoomBy(0.5, { x: this.HarmonyTableMouseEndTouches.clientX - this.canvas.canvasRect.cx, y: this.HarmonyTableMouseEndTouches.clientY - this.canvas.canvasRect.cy });
        } else if (this.HarmonyTableMouseEndTouches.clientY < this.HarmonyTableMouseStartTouches.clientY) {
          this.canvas.zoomBy(-0.5, { x: this.HarmonyTableMouseEndTouches.clientX - this.canvas.canvasRect.cx, y: this.HarmonyTableMouseEndTouches.clientY - this.canvas.canvasRect.cy });
        }
      }
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
  handleImageClick(event) {
    new import_obsidian.Notice("IMG CLICK");
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
};
var SampleModal = class extends import_obsidian.Modal {
  constructor(app) {
    super(app);
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.setText("Woah!");
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};
var SampleSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("Setting #1").setDesc("It's a secret").addText((text) => text.setPlaceholder("Enter your secret").setValue(this.plugin.settings.mySetting).onChange(async (value) => {
      this.plugin.settings.mySetting = value;
      await this.plugin.saveSettings();
    }));
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgQXBwLCBFZGl0b3IsIE1hcmtkb3duVmlldywgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nLCBXb3Jrc3BhY2VMZWFmICxJdGVtVmlldyB9IGZyb20gJ29ic2lkaWFuJztcclxuLy9pbXBvcnQgeyBDYW52YXMsIFN0YXRpY0NhbnZhcywgRmFicmljVGV4dCB9IGZyb20gJ2ZhYnJpYydcclxuXHJcbmZ1bmN0aW9uIGRlbGF5KG1zOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxufVxyXG5mdW5jdGlvbiB0b3VjaGVzVG9TdHJpbmcodG91Y2hlcykge1xyXG4gICAgLy8gXHU1QzA2IFRvdWNoTGlzdCBcdThGNkNcdTYzNjJcdTRFM0FcdTY2NkVcdTkwMUFcdTY1NzBcdTdFQzRcclxuICAgIGNvbnN0IHRvdWNoQXJyYXkgPSBBcnJheS5mcm9tKHRvdWNoZXMpLm1hcCh0b3VjaCA9PiAoe1xyXG4gICAgICAgIGlkZW50aWZpZXI6IHRvdWNoLmlkZW50aWZpZXIsXHJcbiAgICAgICAgY2xpZW50WDogdG91Y2guY2xpZW50WCxcclxuICAgICAgICBjbGllbnRZOiB0b3VjaC5jbGllbnRZLFxyXG4gICAgICAgIHBhZ2VYOiB0b3VjaC5wYWdlWCxcclxuICAgICAgICBwYWdlWTogdG91Y2gucGFnZVksXHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gXHU0RjdGXHU3NTI4IEpTT04uc3RyaW5naWZ5IFx1OEY2Q1x1NjM2Mlx1NEUzQVx1NUI1N1x1N0IyNlx1NEUzMlxyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRvdWNoQXJyYXksIG51bGwsIDIpO1xyXG59XHJcblxyXG5cclxuLy8gUmVtZW1iZXIgdG8gcmVuYW1lIHRoZXNlIGNsYXNzZXMgYW5kIGludGVyZmFjZXMhXHJcblxyXG5pbnRlcmZhY2UgSW1nQW5ub3RhdGlvblNldHRpbmdzIHtcclxuXHRteVNldHRpbmc6IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogSW1nQW5ub3RhdGlvblNldHRpbmdzID0gey8vXHJcblx0bXlTZXR0aW5nOiAnZGVmYXVsdCdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1nQW5ub3RhdGlvbiBleHRlbmRzIFBsdWdpbiB7XHJcblx0c2V0dGluZ3M6IEltZ0Fubm90YXRpb25TZXR0aW5ncztcclxuXHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuXHJcblx0XHQvLyBUaGlzIGNyZWF0ZXMgYW4gaWNvbiBpbiB0aGUgbGVmdCByaWJib24uXHJcblx0XHRjb25zdCByaWJib25JY29uRWwgPSB0aGlzLmFkZFJpYmJvbkljb24oJ2RpY2UnLCAnU2FtcGxlIFBsdWdpbicsIChldnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuXHRcdFx0Ly8gQ2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBpY29uLlxyXG5cdFx0XHRuZXcgTm90aWNlKCdIZWxsb1lvdScpO1xyXG5cdFx0fSk7XHJcblx0XHQvLyBQZXJmb3JtIGFkZGl0aW9uYWwgdGhpbmdzIHdpdGggdGhlIHJpYmJvblxyXG5cdFx0cmliYm9uSWNvbkVsLmFkZENsYXNzKCdteS1wbHVnaW4tcmliYm9uLWNsYXNzJyk7XHJcblxyXG5cdFx0Ly8gVGhpcyBhZGRzIGEgc3RhdHVzIGJhciBpdGVtIHRvIHRoZSBib3R0b20gb2YgdGhlIGFwcC4gRG9lcyBub3Qgd29yayBvbiBtb2JpbGUgYXBwcy5cclxuXHRcdGNvbnN0IHN0YXR1c0Jhckl0ZW1FbCA9IHRoaXMuYWRkU3RhdHVzQmFySXRlbSgpO1xyXG5cdFx0c3RhdHVzQmFySXRlbUVsLnNldFRleHQoJ1N0YXR1cyBCYXIgVGV4dCcpO1xyXG5cclxuXHRcdC8vIFRoaXMgYWRkcyBhIHNpbXBsZSBjb21tYW5kIHRoYXQgY2FuIGJlIHRyaWdnZXJlZCBhbnl3aGVyZVxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6ICdvcGVuLXNhbXBsZS1tb2RhbC1zaW1wbGUnLFxyXG5cdFx0XHRuYW1lOiAnT3BlbiBzYW1wbGUgbW9kYWwgKHNpbXBsZSknLFxyXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xyXG5cdFx0XHRcdG5ldyBTYW1wbGVNb2RhbCh0aGlzLmFwcCkub3BlbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdC8vIFRoaXMgYWRkcyBhbiBlZGl0b3IgY29tbWFuZCB0aGF0IGNhbiBwZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG9uIHRoZSBjdXJyZW50IGVkaXRvciBpbnN0YW5jZVxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6ICdzYW1wbGUtZWRpdG9yLWNvbW1hbmQnLFxyXG5cdFx0XHRuYW1lOiAnU2FtcGxlIGVkaXRvciBjb21tYW5kJyxcclxuXHRcdFx0ZWRpdG9yQ2FsbGJhY2s6IChlZGl0b3I6IEVkaXRvciwgdmlldzogTWFya2Rvd25WaWV3KSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZWRpdG9yLmdldFNlbGVjdGlvbigpKTtcclxuXHRcdFx0XHRlZGl0b3IucmVwbGFjZVNlbGVjdGlvbignU2FtcGxlIEVkaXRvciBDb21tYW5kJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0Ly8gVGhpcyBhZGRzIGEgY29tcGxleCBjb21tYW5kIHRoYXQgY2FuIGNoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGFwcCBhbGxvd3MgZXhlY3V0aW9uIG9mIHRoZSBjb21tYW5kXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ29wZW4tc2FtcGxlLW1vZGFsLWNvbXBsZXgnLFxyXG5cdFx0XHRuYW1lOiAnT3BlbiBzYW1wbGUgbW9kYWwgKGNvbXBsZXgpJyxcclxuXHRcdFx0Y2hlY2tDYWxsYmFjazogKGNoZWNraW5nOiBib29sZWFuKSA9PiB7XHJcblx0XHRcdFx0Ly8gQ29uZGl0aW9ucyB0byBjaGVja1xyXG5cdFx0XHRcdGNvbnN0IG1hcmtkb3duVmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XHJcblx0XHRcdFx0aWYgKG1hcmtkb3duVmlldykge1xyXG5cdFx0XHRcdFx0Ly8gSWYgY2hlY2tpbmcgaXMgdHJ1ZSwgd2UncmUgc2ltcGx5IFwiY2hlY2tpbmdcIiBpZiB0aGUgY29tbWFuZCBjYW4gYmUgcnVuLlxyXG5cdFx0XHRcdFx0Ly8gSWYgY2hlY2tpbmcgaXMgZmFsc2UsIHRoZW4gd2Ugd2FudCB0byBhY3R1YWxseSBwZXJmb3JtIHRoZSBvcGVyYXRpb24uXHJcblx0XHRcdFx0XHRpZiAoIWNoZWNraW5nKSB7XHJcblx0XHRcdFx0XHRcdG5ldyBTYW1wbGVNb2RhbCh0aGlzLmFwcCkub3BlbigpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFRoaXMgY29tbWFuZCB3aWxsIG9ubHkgc2hvdyB1cCBpbiBDb21tYW5kIFBhbGV0dGUgd2hlbiB0aGUgY2hlY2sgZnVuY3Rpb24gcmV0dXJucyB0cnVlXHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFRoaXMgYWRkcyBhIHNldHRpbmdzIHRhYiBzbyB0aGUgdXNlciBjYW4gY29uZmlndXJlIHZhcmlvdXMgYXNwZWN0cyBvZiB0aGUgcGx1Z2luXHJcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNhbXBsZVNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcblx0XHQvLyBJZiB0aGUgcGx1Z2luIGhvb2tzIHVwIGFueSBnbG9iYWwgRE9NIGV2ZW50cyAob24gcGFydHMgb2YgdGhlIGFwcCB0aGF0IGRvZXNuJ3QgYmVsb25nIHRvIHRoaXMgcGx1Z2luKVxyXG5cdFx0Ly8gVXNpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIGF1dG9tYXRpY2FsbHkgcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lciB3aGVuIHRoaXMgcGx1Z2luIGlzIGRpc2FibGVkLlxyXG5cdFx0dGhpcy5yZWdpc3RlckRvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snLCAoZXZ0OiBNb3VzZUV2ZW50KSA9PiB7XHJcblx0XHQvL1x0Y29uc29sZS5sb2coJ2NsaWNrJywgZXZ0KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFdoZW4gcmVnaXN0ZXJpbmcgaW50ZXJ2YWxzLCB0aGlzIGZ1bmN0aW9uIHdpbGwgYXV0b21hdGljYWxseSBjbGVhciB0aGUgaW50ZXJ2YWwgd2hlbiB0aGUgcGx1Z2luIGlzIGRpc2FibGVkLlxyXG5cdFx0dGhpcy5yZWdpc3RlckludGVydmFsKHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiBjb25zb2xlLmxvZygnc2V0SW50ZXJ2YWwnKSwgNSAqIDYwICogMTAwMCkpO1xyXG5cdFx0XHJcblx0XHQvLyB0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2xheW91dC1jaGFuZ2UnLCgpPT57XHJcblx0XHQvLyBcdC8vdGhpcy5hZGRJbWFnZUNsaWNrSGFuZGxlcigpO1xyXG5cdFx0Ly8gXHRuZXcgTm90aWNlKCdsYXlvdXQgY2hhbmdlJyk7XHJcblx0XHQvLyBcdGNvbnNvbGUubG9nKCdzdGFydCcpO1xyXG5cdFx0Ly8gXHR0aGlzLmFwcC53b3Jrc3BhY2UuaXRlcmF0ZUFsbExlYXZlcygobGVhZjogV29ya3NwYWNlTGVhZikgPT4ge1xyXG5cdFx0Ly8gXHRcdC8vbmV3IE5vdGljZShsZWFmLmdldFZpZXdTdGF0ZSgpPy50eXBlKVxyXG5cdFx0Ly8gXHRcdGNvbnNvbGUubG9nKGxlYWYuZ2V0Vmlld1N0YXRlKCk/LnR5cGUpO1xyXG5cclxuXHRcdC8vIFx0fSlcclxuXHRcdC8vIFx0Y29uc29sZS5sb2coJ2VuZCcpO1xyXG5cdFx0Ly8gfSlcclxuXHJcblxyXG5cdFx0Ly90aGlzLnJlZ2lzdGVyVG91Y2hFdmVudHNGb3JIYXJtb255VGFibGV0TW91c2UoKTtcclxuXHRcdHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2ZpbGUtb3BlbicsIGFzeW5jIChmaWxlKSA9PiB7XHJcblx0XHRcdGNvbnN0IGNhbnZhc1ZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShJdGVtVmlldyk7XHJcblx0XHRcdGlmIChjYW52YXNWaWV3Py5nZXRWaWV3VHlwZSgpICE9PSAnY2FudmFzJykgcmV0dXJuO1xyXG5cdFx0XHRjb25zdCBjYW52YXMgPSAoY2FudmFzVmlldyBhcyBhbnkpLmNhbnZhcztcclxuXHRcdFx0KHRoaXMgYXMgYW55KS5jYW52YXM9Y2FudmFzOyAvL1x1NUY1M1x1NTI0RFx1NjI1M1x1NUYwMFx1NzY4NGNhbnZhc1xyXG5cclxuXHRcdFx0dGhpcy5yZWdpc3RlckRvbUV2ZW50KGNhbnZhc1ZpZXcuY29udGFpbmVyRWwsXCJ0b3VjaHN0YXJ0XCIsIChldmVudDogVG91Y2hFdmVudCkgPT4ge1xyXG5cdFx0XHRcdCh0aGlzIGFzIGFueSkuSGFybW9ueVRhYmxlTW91c2VTdGFydFRvdWNoZXM9ZXZlbnQudG91Y2hlcy5pdGVtKDApO1xyXG5cdFx0XHRcdC8vbmV3IE5vdGljZSh0aGlzKTtcclxuXHRcdFx0XHRuZXcgTm90aWNlKFwidG91Y2hzdGFydFwiKTtcclxuXHRcdFx0fSk7XHRcclxuXHRcdFxyXG5cclxuXHRcdH0pKTsgXHJcblx0XHRcclxuXHJcblx0fVxyXG5cclxuXHJcblx0cmVnaXN0ZXJUb3VjaEV2ZW50c0Zvckhhcm1vbnlUYWJsZXRNb3VzZSgpIHtcclxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudChkb2N1bWVudCxcInRvdWNoc3RhcnRcIiwgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XHJcblx0XHRcdCh0aGlzIGFzIGFueSkuSGFybW9ueVRhYmxlTW91c2VTdGFydFRvdWNoZXM9ZXZlbnQudG91Y2hlcy5pdGVtKDApO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnJlZ2lzdGVyRG9tRXZlbnQoZG9jdW1lbnQsXCJ0b3VjaG1vdmVcIiwgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XHJcblx0XHRcdCh0aGlzIGFzIGFueSkuSGFybW9ueVRhYmxlTW91c2VFbmRUb3VjaGVzPWV2ZW50LnRvdWNoZXMuaXRlbSgwKTtcclxuXHRcdFx0aWYoTWF0aC5hYnModGhpcy5IYXJtb255VGFibGVNb3VzZUVuZFRvdWNoZXMuY2xpZW50WC10aGlzLkhhcm1vbnlUYWJsZU1vdXNlU3RhcnRUb3VjaGVzLmNsaWVudFg8MC4wMSkpe1xyXG5cdFx0XHRcdGlmKHRoaXMuSGFybW9ueVRhYmxlTW91c2VFbmRUb3VjaGVzLmNsaWVudFk+dGhpcy5IYXJtb255VGFibGVNb3VzZVN0YXJ0VG91Y2hlcy5jbGllbnRZKXtcclxuXHRcdFx0XHRcdHRoaXMuY2FudmFzLnpvb21CeSgwLjUse3g6dGhpcy5IYXJtb255VGFibGVNb3VzZUVuZFRvdWNoZXMuY2xpZW50WC10aGlzLmNhbnZhcy5jYW52YXNSZWN0LmN4LHk6dGhpcy5IYXJtb255VGFibGVNb3VzZUVuZFRvdWNoZXMuY2xpZW50WS10aGlzLmNhbnZhcy5jYW52YXNSZWN0LmN5fSk7IC8vdGhpcy5jYW52YXMuY29uZmlnLnpvb21NdWx0aXBsaWVyXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5IYXJtb255VGFibGVNb3VzZUVuZFRvdWNoZXMuY2xpZW50WTx0aGlzLkhhcm1vbnlUYWJsZU1vdXNlU3RhcnRUb3VjaGVzLmNsaWVudFkpe1xyXG5cdFx0XHRcdFx0dGhpcy5jYW52YXMuem9vbUJ5KC0wLjUsIHt4OnRoaXMuSGFybW9ueVRhYmxlTW91c2VFbmRUb3VjaGVzLmNsaWVudFgtdGhpcy5jYW52YXMuY2FudmFzUmVjdC5jeCx5OnRoaXMuSGFybW9ueVRhYmxlTW91c2VFbmRUb3VjaGVzLmNsaWVudFktdGhpcy5jYW52YXMuY2FudmFzUmVjdC5jeX0pOyAvLy10aGlzLmNhbnZhcy5jb25maWcuem9vbU11bHRpcGxpZXJcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0Ly8gdGhpcy5yZWdpc3RlckRvbUV2ZW50KGRvY3VtZW50LFwidG91Y2hlbmRcIiwgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XHJcblx0XHQvLyB9KTtcclxuXHR9XHJcblx0XHQvLyBjb25zdCB0b3VjaEV2ZW50cyA9IFtcInRvdWNoc3RhcnRcIiwgXCJ0b3VjaG1vdmVcIiwgXCJ0b3VjaGVuZFwiXTtcclxuICAgICAgICAvLyB0b3VjaEV2ZW50cy5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy5yZWdpc3RlckRvbUV2ZW50KGRvY3VtZW50LCBldmVudE5hbWUsIChldmVudDogVG91Y2hFdmVudCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgLy9jb25zb2xlLmxvZyhgVG91Y2ggZXZlbnQ6ICR7ZXZlbnROYW1lfWAsIGV2ZW50KTtcclxuXHRcdC8vIFx0XHRuZXcgTm90aWNlKHRvdWNoZXNUb1N0cmluZyhldmVudC50b3VjaGVzKSk7XHJcblx0XHQvLyBcdFx0Ly9uZXcgTm90aWNlKGAke2V2ZW50TmFtZX1gLCBldmVudC50b3VjaGVzLnN0cmluZ2lmeSgpKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG5cclxuXHRvbnVubG9hZCgpIHtcclxuXHJcblx0fVxyXG5cclxuXHRhc3luYyBsb2FkU2V0dGluZ3MoKSB7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcclxuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcblx0fVxyXG5cclxuXHJcblx0cHJpdmF0ZSBoYW5kbGVJbWFnZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcblx0XHQvLyBcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjhldmVudFxyXG5cdFx0bmV3IE5vdGljZSgnSU1HIENMSUNLJyk7XHJcblx0fVxyXG5cdC8vIHByaXZhdGUgYWRkSW1hZ2VDbGlja0hhbmRsZXIoKXtcclxuXHQvLyBcdG5ldyBOb3RpY2UoJ2FkZGluZyBoYW5kbGVyJyk7XHJcblx0Ly8gXHQvLyAxLiBcdTgzQjdcdTUzRDZcdTVGNTNcdTUyNERcdTZEM0JcdTUyQThcdTg5QzZcdTU2RkVcdTc2ODRcdTVCQjlcdTU2NjhcdTUxNDNcdTdEMjBcclxuXHQvLyBcdGNvbnN0IHZpZXdDb250YWluZXIgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZj8udmlldy5jb250YWluZXJFbDtcclxuXHQvLyBcdC8vIDIuIFx1NUI4OVx1NTE2OFx1NTIyNFx1NjVBRFx1RkYxQVx1Nzg2RVx1NEZERFx1NUJCOVx1NTY2OFx1NUI1OFx1NTcyOFxyXG5cdC8vIFx0aWYgKCF2aWV3Q29udGFpbmVyKSByZXR1cm47XHJcblx0Ly8gXHQvLyAzLiBcdTY3RTVcdTYyN0VcdTYyNDBcdTY3MDlcdTU2RkVcdTcyNDdcdTUxNDNcdTdEMjBcclxuXHQvLyBcdGNvbnN0IGltYWdlcyA9IHZpZXdDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnaW1nJyk7XHJcblx0Ly8gXHQvLyA0LiBcdTRFM0FcdTZCQ0ZcdTRFMkFcdTU2RkVcdTcyNDdcdTZERkJcdTUyQTBcdTcwQjlcdTUxRkJcdTRFOEJcdTRFRjZcdTc2RDFcdTU0MkNcclxuXHJcblx0Ly8gXHRpbWFnZXMuZm9yRWFjaChpbWcgPT4ge1xyXG5cdC8vIFx0XHQvLyBcdTc5RkJcdTk2NjRcdTUzRUZcdTgwRkRcdTVERjJcdTVCNThcdTU3MjhcdTc2ODRcdTRFOEJcdTRFRjZcdTc2RDFcdTU0MkNcdUZGMDhcdTkwN0ZcdTUxNERcdTkxQ0RcdTU5MERcdTZERkJcdTUyQTBcdUZGMDlcclxuXHQvLyBcdFx0aW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVJbWFnZUNsaWNrKTtcclxuXHQvLyBcdFx0Ly8gXHU2REZCXHU1MkEwXHU2NUIwXHU3Njg0XHU0RThCXHU0RUY2XHU3NkQxXHU1NDJDXHJcblx0Ly8gXHRcdGltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlSW1hZ2VDbGljay5iaW5kKHRoaXMpKTtcclxuXHQvLyBcdH0pO1xyXG5cdC8vIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFNhbXBsZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwKSB7XHJcblx0XHRzdXBlcihhcHApO1xyXG5cdH1cclxuXHJcblx0b25PcGVuKCkge1xyXG5cdFx0Y29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xyXG5cdFx0Y29udGVudEVsLnNldFRleHQoJ1dvYWghJyk7XHJcblx0fVxyXG5cclxuXHRvbkNsb3NlKCkge1xyXG5cdFx0Y29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xyXG5cdFx0Y29udGVudEVsLmVtcHR5KCk7XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBTYW1wbGVTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XHJcblx0cGx1Z2luOiBJbWdBbm5vdGF0aW9uO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBJbWdBbm5vdGF0aW9uKSB7XHJcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXkoKTogdm9pZCB7XHJcblx0XHRjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcclxuXHJcblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnU2V0dGluZyAjMScpXHJcblx0XHRcdC5zZXREZXNjKCdJdFxcJ3MgYSBzZWNyZXQnKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcclxuXHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoJ0VudGVyIHlvdXIgc2VjcmV0JylcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubXlTZXR0aW5nKVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLm15U2V0dGluZyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBQXFIO0FBMkJySCxJQUFNLG1CQUEwQztBQUFBO0FBQUEsRUFDL0MsV0FBVztBQUNaO0FBRUEsSUFBcUIsZ0JBQXJCLGNBQTJDLHVCQUFPO0FBQUEsRUFHakQsTUFBTSxTQUFTO0FBQ2QsVUFBTSxLQUFLLGFBQWE7QUFHeEIsVUFBTSxlQUFlLEtBQUssY0FBYyxRQUFRLGlCQUFpQixDQUFDLFFBQW9CO0FBRXJGLFVBQUksdUJBQU8sVUFBVTtBQUFBLElBQ3RCLENBQUM7QUFFRCxpQkFBYSxTQUFTLHdCQUF3QjtBQUc5QyxVQUFNLGtCQUFrQixLQUFLLGlCQUFpQjtBQUM5QyxvQkFBZ0IsUUFBUSxpQkFBaUI7QUFHekMsU0FBSyxXQUFXO0FBQUEsTUFDZixJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixVQUFVLE1BQU07QUFDZixZQUFJLFlBQVksS0FBSyxHQUFHLEVBQUUsS0FBSztBQUFBLE1BQ2hDO0FBQUEsSUFDRCxDQUFDO0FBRUQsU0FBSyxXQUFXO0FBQUEsTUFDZixJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixnQkFBZ0IsQ0FBQyxRQUFn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
