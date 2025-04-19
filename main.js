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
      this.registerDomEvent(canvas.canvasE1, "touchstart", (event) => {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgQXBwLCBFZGl0b3IsIE1hcmtkb3duVmlldywgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nLCBXb3Jrc3BhY2VMZWFmICxJdGVtVmlldyB9IGZyb20gJ29ic2lkaWFuJztcclxuLy9pbXBvcnQgeyBDYW52YXMsIFN0YXRpY0NhbnZhcywgRmFicmljVGV4dCB9IGZyb20gJ2ZhYnJpYydcclxuXHJcbmZ1bmN0aW9uIGRlbGF5KG1zOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxufVxyXG5mdW5jdGlvbiB0b3VjaGVzVG9TdHJpbmcodG91Y2hlcykge1xyXG4gICAgLy8gXHU1QzA2IFRvdWNoTGlzdCBcdThGNkNcdTYzNjJcdTRFM0FcdTY2NkVcdTkwMUFcdTY1NzBcdTdFQzRcclxuICAgIGNvbnN0IHRvdWNoQXJyYXkgPSBBcnJheS5mcm9tKHRvdWNoZXMpLm1hcCh0b3VjaCA9PiAoe1xyXG4gICAgICAgIGlkZW50aWZpZXI6IHRvdWNoLmlkZW50aWZpZXIsXHJcbiAgICAgICAgY2xpZW50WDogdG91Y2guY2xpZW50WCxcclxuICAgICAgICBjbGllbnRZOiB0b3VjaC5jbGllbnRZLFxyXG4gICAgICAgIHBhZ2VYOiB0b3VjaC5wYWdlWCxcclxuICAgICAgICBwYWdlWTogdG91Y2gucGFnZVksXHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gXHU0RjdGXHU3NTI4IEpTT04uc3RyaW5naWZ5IFx1OEY2Q1x1NjM2Mlx1NEUzQVx1NUI1N1x1N0IyNlx1NEUzMlxyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRvdWNoQXJyYXksIG51bGwsIDIpO1xyXG59XHJcblxyXG5cclxuLy8gUmVtZW1iZXIgdG8gcmVuYW1lIHRoZXNlIGNsYXNzZXMgYW5kIGludGVyZmFjZXMhXHJcblxyXG5pbnRlcmZhY2UgSW1nQW5ub3RhdGlvblNldHRpbmdzIHtcclxuXHRteVNldHRpbmc6IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogSW1nQW5ub3RhdGlvblNldHRpbmdzID0gey8vXHJcblx0bXlTZXR0aW5nOiAnZGVmYXVsdCdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1nQW5ub3RhdGlvbiBleHRlbmRzIFBsdWdpbiB7XHJcblx0c2V0dGluZ3M6IEltZ0Fubm90YXRpb25TZXR0aW5ncztcclxuXHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuXHJcblx0XHQvLyBUaGlzIGNyZWF0ZXMgYW4gaWNvbiBpbiB0aGUgbGVmdCByaWJib24uXHJcblx0XHRjb25zdCByaWJib25JY29uRWwgPSB0aGlzLmFkZFJpYmJvbkljb24oJ2RpY2UnLCAnU2FtcGxlIFBsdWdpbicsIChldnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuXHRcdFx0Ly8gQ2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBpY29uLlxyXG5cdFx0XHRuZXcgTm90aWNlKCdIZWxsb1lvdScpO1xyXG5cdFx0fSk7XHJcblx0XHQvLyBQZXJmb3JtIGFkZGl0aW9uYWwgdGhpbmdzIHdpdGggdGhlIHJpYmJvblxyXG5cdFx0cmliYm9uSWNvbkVsLmFkZENsYXNzKCdteS1wbHVnaW4tcmliYm9uLWNsYXNzJyk7XHJcblxyXG5cdFx0Ly8gVGhpcyBhZGRzIGEgc3RhdHVzIGJhciBpdGVtIHRvIHRoZSBib3R0b20gb2YgdGhlIGFwcC4gRG9lcyBub3Qgd29yayBvbiBtb2JpbGUgYXBwcy5cclxuXHRcdGNvbnN0IHN0YXR1c0Jhckl0ZW1FbCA9IHRoaXMuYWRkU3RhdHVzQmFySXRlbSgpO1xyXG5cdFx0c3RhdHVzQmFySXRlbUVsLnNldFRleHQoJ1N0YXR1cyBCYXIgVGV4dCcpO1xyXG5cclxuXHRcdC8vIFRoaXMgYWRkcyBhIHNpbXBsZSBjb21tYW5kIHRoYXQgY2FuIGJlIHRyaWdnZXJlZCBhbnl3aGVyZVxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6ICdvcGVuLXNhbXBsZS1tb2RhbC1zaW1wbGUnLFxyXG5cdFx0XHRuYW1lOiAnT3BlbiBzYW1wbGUgbW9kYWwgKHNpbXBsZSknLFxyXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xyXG5cdFx0XHRcdG5ldyBTYW1wbGVNb2RhbCh0aGlzLmFwcCkub3BlbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdC8vIFRoaXMgYWRkcyBhbiBlZGl0b3IgY29tbWFuZCB0aGF0IGNhbiBwZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG9uIHRoZSBjdXJyZW50IGVkaXRvciBpbnN0YW5jZVxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6ICdzYW1wbGUtZWRpdG9yLWNvbW1hbmQnLFxyXG5cdFx0XHRuYW1lOiAnU2FtcGxlIGVkaXRvciBjb21tYW5kJyxcclxuXHRcdFx0ZWRpdG9yQ2FsbGJhY2s6IChlZGl0b3I6IEVkaXRvciwgdmlldzogTWFya2Rvd25WaWV3KSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZWRpdG9yLmdldFNlbGVjdGlvbigpKTtcclxuXHRcdFx0XHRlZGl0b3IucmVwbGFjZVNlbGVjdGlvbignU2FtcGxlIEVkaXRvciBDb21tYW5kJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0Ly8gVGhpcyBhZGRzIGEgY29tcGxleCBjb21tYW5kIHRoYXQgY2FuIGNoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGFwcCBhbGxvd3MgZXhlY3V0aW9uIG9mIHRoZSBjb21tYW5kXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ29wZW4tc2FtcGxlLW1vZGFsLWNvbXBsZXgnLFxyXG5cdFx0XHRuYW1lOiAnT3BlbiBzYW1wbGUgbW9kYWwgKGNvbXBsZXgpJyxcclxuXHRcdFx0Y2hlY2tDYWxsYmFjazogKGNoZWNraW5nOiBib29sZWFuKSA9PiB7XHJcblx0XHRcdFx0Ly8gQ29uZGl0aW9ucyB0byBjaGVja1xyXG5cdFx0XHRcdGNvbnN0IG1hcmtkb3duVmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XHJcblx0XHRcdFx0aWYgKG1hcmtkb3duVmlldykge1xyXG5cdFx0XHRcdFx0Ly8gSWYgY2hlY2tpbmcgaXMgdHJ1ZSwgd2UncmUgc2ltcGx5IFwiY2hlY2tpbmdcIiBpZiB0aGUgY29tbWFuZCBjYW4gYmUgcnVuLlxyXG5cdFx0XHRcdFx0Ly8gSWYgY2hlY2tpbmcgaXMgZmFsc2UsIHRoZW4gd2Ugd2FudCB0byBhY3R1YWxseSBwZXJmb3JtIHRoZSBvcGVyYXRpb24uXHJcblx0XHRcdFx0XHRpZiAoIWNoZWNraW5nKSB7XHJcblx0XHRcdFx0XHRcdG5ldyBTYW1wbGVNb2RhbCh0aGlzLmFwcCkub3BlbigpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFRoaXMgY29tbWFuZCB3aWxsIG9ubHkgc2hvdyB1cCBpbiBDb21tYW5kIFBhbGV0dGUgd2hlbiB0aGUgY2hlY2sgZnVuY3Rpb24gcmV0dXJucyB0cnVlXHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFRoaXMgYWRkcyBhIHNldHRpbmdzIHRhYiBzbyB0aGUgdXNlciBjYW4gY29uZmlndXJlIHZhcmlvdXMgYXNwZWN0cyBvZiB0aGUgcGx1Z2luXHJcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNhbXBsZVNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcblx0XHQvLyBJZiB0aGUgcGx1Z2luIGhvb2tzIHVwIGFueSBnbG9iYWwgRE9NIGV2ZW50cyAob24gcGFydHMgb2YgdGhlIGFwcCB0aGF0IGRvZXNuJ3QgYmVsb25nIHRvIHRoaXMgcGx1Z2luKVxyXG5cdFx0Ly8gVXNpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIGF1dG9tYXRpY2FsbHkgcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lciB3aGVuIHRoaXMgcGx1Z2luIGlzIGRpc2FibGVkLlxyXG5cdFx0dGhpcy5yZWdpc3RlckRvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snLCAoZXZ0OiBNb3VzZUV2ZW50KSA9PiB7XHJcblx0XHQvL1x0Y29uc29sZS5sb2coJ2NsaWNrJywgZXZ0KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFdoZW4gcmVnaXN0ZXJpbmcgaW50ZXJ2YWxzLCB0aGlzIGZ1bmN0aW9uIHdpbGwgYXV0b21hdGljYWxseSBjbGVhciB0aGUgaW50ZXJ2YWwgd2hlbiB0aGUgcGx1Z2luIGlzIGRpc2FibGVkLlxyXG5cdFx0dGhpcy5yZWdpc3RlckludGVydmFsKHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiBjb25zb2xlLmxvZygnc2V0SW50ZXJ2YWwnKSwgNSAqIDYwICogMTAwMCkpO1xyXG5cdFx0XHJcblx0XHQvLyB0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2xheW91dC1jaGFuZ2UnLCgpPT57XHJcblx0XHQvLyBcdC8vdGhpcy5hZGRJbWFnZUNsaWNrSGFuZGxlcigpO1xyXG5cdFx0Ly8gXHRuZXcgTm90aWNlKCdsYXlvdXQgY2hhbmdlJyk7XHJcblx0XHQvLyBcdGNvbnNvbGUubG9nKCdzdGFydCcpO1xyXG5cdFx0Ly8gXHR0aGlzLmFwcC53b3Jrc3BhY2UuaXRlcmF0ZUFsbExlYXZlcygobGVhZjogV29ya3NwYWNlTGVhZikgPT4ge1xyXG5cdFx0Ly8gXHRcdC8vbmV3IE5vdGljZShsZWFmLmdldFZpZXdTdGF0ZSgpPy50eXBlKVxyXG5cdFx0Ly8gXHRcdGNvbnNvbGUubG9nKGxlYWYuZ2V0Vmlld1N0YXRlKCk/LnR5cGUpO1xyXG5cclxuXHRcdC8vIFx0fSlcclxuXHRcdC8vIFx0Y29uc29sZS5sb2coJ2VuZCcpO1xyXG5cdFx0Ly8gfSlcclxuXHJcblxyXG5cdFx0Ly90aGlzLnJlZ2lzdGVyVG91Y2hFdmVudHNGb3JIYXJtb255VGFibGV0TW91c2UoKTtcclxuXHRcdHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2ZpbGUtb3BlbicsIGFzeW5jIChmaWxlKSA9PiB7XHJcblx0XHRcdGNvbnN0IGNhbnZhc1ZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShJdGVtVmlldyk7XHJcblx0XHRcdGlmIChjYW52YXNWaWV3Py5nZXRWaWV3VHlwZSgpICE9PSAnY2FudmFzJykgcmV0dXJuO1xyXG5cdFx0XHRjb25zdCBjYW52YXMgPSAoY2FudmFzVmlldyBhcyBhbnkpLmNhbnZhcztcclxuXHRcdFx0KHRoaXMgYXMgYW55KS5jYW52YXM9Y2FudmFzOyAvL1x1NUY1M1x1NTI0RFx1NjI1M1x1NUYwMFx1NzY4NGNhbnZhc1xyXG5cclxuXHRcdFx0dGhpcy5yZWdpc3RlckRvbUV2ZW50KGNhbnZhcy5jYW52YXNFMSxcInRvdWNoc3RhcnRcIiwgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XHJcblx0XHRcdFx0KHRoaXMgYXMgYW55KS5IYXJtb255VGFibGVNb3VzZVN0YXJ0VG91Y2hlcz1ldmVudC50b3VjaGVzLml0ZW0oMCk7XHJcblx0XHRcdFx0Ly9uZXcgTm90aWNlKHRoaXMpO1xyXG5cdFx0XHRcdG5ldyBOb3RpY2UoXCJ0b3VjaHN0YXJ0XCIpO1xyXG5cdFx0XHR9KTtcdFxyXG5cdFx0XHJcblxyXG5cdFx0fSkpOyBcclxuXHRcdFxyXG5cclxuXHR9XHJcblxyXG5cclxuXHRyZWdpc3RlclRvdWNoRXZlbnRzRm9ySGFybW9ueVRhYmxldE1vdXNlKCkge1xyXG5cdFx0dGhpcy5yZWdpc3RlckRvbUV2ZW50KGRvY3VtZW50LFwidG91Y2hzdGFydFwiLCAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcclxuXHRcdFx0KHRoaXMgYXMgYW55KS5IYXJtb255VGFibGVNb3VzZVN0YXJ0VG91Y2hlcz1ldmVudC50b3VjaGVzLml0ZW0oMCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudChkb2N1bWVudCxcInRvdWNobW92ZVwiLCAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcclxuXHRcdFx0KHRoaXMgYXMgYW55KS5IYXJtb255VGFibGVNb3VzZUVuZFRvdWNoZXM9ZXZlbnQudG91Y2hlcy5pdGVtKDApO1xyXG5cdFx0XHRpZihNYXRoLmFicyh0aGlzLkhhcm1vbnlUYWJsZU1vdXNlRW5kVG91Y2hlcy5jbGllbnRYLXRoaXMuSGFybW9ueVRhYmxlTW91c2VTdGFydFRvdWNoZXMuY2xpZW50WDwwLjAxKSl7XHJcblx0XHRcdFx0aWYodGhpcy5IYXJtb255VGFibGVNb3VzZUVuZFRvdWNoZXMuY2xpZW50WT50aGlzLkhhcm1vbnlUYWJsZU1vdXNlU3RhcnRUb3VjaGVzLmNsaWVudFkpe1xyXG5cdFx0XHRcdFx0dGhpcy5jYW52YXMuem9vbUJ5KDAuNSx7eDp0aGlzLkhhcm1vbnlUYWJsZU1vdXNlRW5kVG91Y2hlcy5jbGllbnRYLXRoaXMuY2FudmFzLmNhbnZhc1JlY3QuY3gseTp0aGlzLkhhcm1vbnlUYWJsZU1vdXNlRW5kVG91Y2hlcy5jbGllbnRZLXRoaXMuY2FudmFzLmNhbnZhc1JlY3QuY3l9KTsgLy90aGlzLmNhbnZhcy5jb25maWcuem9vbU11bHRpcGxpZXJcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLkhhcm1vbnlUYWJsZU1vdXNlRW5kVG91Y2hlcy5jbGllbnRZPHRoaXMuSGFybW9ueVRhYmxlTW91c2VTdGFydFRvdWNoZXMuY2xpZW50WSl7XHJcblx0XHRcdFx0XHR0aGlzLmNhbnZhcy56b29tQnkoLTAuNSwge3g6dGhpcy5IYXJtb255VGFibGVNb3VzZUVuZFRvdWNoZXMuY2xpZW50WC10aGlzLmNhbnZhcy5jYW52YXNSZWN0LmN4LHk6dGhpcy5IYXJtb255VGFibGVNb3VzZUVuZFRvdWNoZXMuY2xpZW50WS10aGlzLmNhbnZhcy5jYW52YXNSZWN0LmN5fSk7IC8vLXRoaXMuY2FudmFzLmNvbmZpZy56b29tTXVsdGlwbGllclxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHQvLyB0aGlzLnJlZ2lzdGVyRG9tRXZlbnQoZG9jdW1lbnQsXCJ0b3VjaGVuZFwiLCAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcclxuXHRcdC8vIH0pO1xyXG5cdH1cclxuXHRcdC8vIGNvbnN0IHRvdWNoRXZlbnRzID0gW1widG91Y2hzdGFydFwiLCBcInRvdWNobW92ZVwiLCBcInRvdWNoZW5kXCJdO1xyXG4gICAgICAgIC8vIHRvdWNoRXZlbnRzLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnJlZ2lzdGVyRG9tRXZlbnQoZG9jdW1lbnQsIGV2ZW50TmFtZSwgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAvL2NvbnNvbGUubG9nKGBUb3VjaCBldmVudDogJHtldmVudE5hbWV9YCwgZXZlbnQpO1xyXG5cdFx0Ly8gXHRcdG5ldyBOb3RpY2UodG91Y2hlc1RvU3RyaW5nKGV2ZW50LnRvdWNoZXMpKTtcclxuXHRcdC8vIFx0XHQvL25ldyBOb3RpY2UoYCR7ZXZlbnROYW1lfWAsIGV2ZW50LnRvdWNoZXMuc3RyaW5naWZ5KCkpO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcblxyXG5cdG9udW5sb2FkKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuXHR9XHJcblxyXG5cclxuXHRwcml2YXRlIGhhbmRsZUltYWdlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuXHRcdC8vIFx1NTNFRlx1NEVFNVx1NEY3Rlx1NzUyOGV2ZW50XHJcblx0XHRuZXcgTm90aWNlKCdJTUcgQ0xJQ0snKTtcclxuXHR9XHJcblx0Ly8gcHJpdmF0ZSBhZGRJbWFnZUNsaWNrSGFuZGxlcigpe1xyXG5cdC8vIFx0bmV3IE5vdGljZSgnYWRkaW5nIGhhbmRsZXInKTtcclxuXHQvLyBcdC8vIDEuIFx1ODNCN1x1NTNENlx1NUY1M1x1NTI0RFx1NkQzQlx1NTJBOFx1ODlDNlx1NTZGRVx1NzY4NFx1NUJCOVx1NTY2OFx1NTE0M1x1N0QyMFxyXG5cdC8vIFx0Y29uc3Qgdmlld0NvbnRhaW5lciA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmPy52aWV3LmNvbnRhaW5lckVsO1xyXG5cdC8vIFx0Ly8gMi4gXHU1Qjg5XHU1MTY4XHU1MjI0XHU2NUFEXHVGRjFBXHU3ODZFXHU0RkREXHU1QkI5XHU1NjY4XHU1QjU4XHU1NzI4XHJcblx0Ly8gXHRpZiAoIXZpZXdDb250YWluZXIpIHJldHVybjtcclxuXHQvLyBcdC8vIDMuIFx1NjdFNVx1NjI3RVx1NjI0MFx1NjcwOVx1NTZGRVx1NzI0N1x1NTE0M1x1N0QyMFxyXG5cdC8vIFx0Y29uc3QgaW1hZ2VzID0gdmlld0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKTtcclxuXHQvLyBcdC8vIDQuIFx1NEUzQVx1NkJDRlx1NEUyQVx1NTZGRVx1NzI0N1x1NkRGQlx1NTJBMFx1NzBCOVx1NTFGQlx1NEU4Qlx1NEVGNlx1NzZEMVx1NTQyQ1xyXG5cclxuXHQvLyBcdGltYWdlcy5mb3JFYWNoKGltZyA9PiB7XHJcblx0Ly8gXHRcdC8vIFx1NzlGQlx1OTY2NFx1NTNFRlx1ODBGRFx1NURGMlx1NUI1OFx1NTcyOFx1NzY4NFx1NEU4Qlx1NEVGNlx1NzZEMVx1NTQyQ1x1RkYwOFx1OTA3Rlx1NTE0RFx1OTFDRFx1NTkwRFx1NkRGQlx1NTJBMFx1RkYwOVxyXG5cdC8vIFx0XHRpbWcucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUltYWdlQ2xpY2spO1xyXG5cdC8vIFx0XHQvLyBcdTZERkJcdTUyQTBcdTY1QjBcdTc2ODRcdTRFOEJcdTRFRjZcdTc2RDFcdTU0MkNcclxuXHQvLyBcdFx0aW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVJbWFnZUNsaWNrLmJpbmQodGhpcykpO1xyXG5cdC8vIFx0fSk7XHJcblx0Ly8gfVxyXG5cclxufVxyXG5cclxuY2xhc3MgU2FtcGxlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XHJcblx0Y29uc3RydWN0b3IoYXBwOiBBcHApIHtcclxuXHRcdHN1cGVyKGFwcCk7XHJcblx0fVxyXG5cclxuXHRvbk9wZW4oKSB7XHJcblx0XHRjb25zdCB7Y29udGVudEVsfSA9IHRoaXM7XHJcblx0XHRjb250ZW50RWwuc2V0VGV4dCgnV29haCEnKTtcclxuXHR9XHJcblxyXG5cdG9uQ2xvc2UoKSB7XHJcblx0XHRjb25zdCB7Y29udGVudEVsfSA9IHRoaXM7XHJcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNhbXBsZVNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuXHRwbHVnaW46IEltZ0Fubm90YXRpb247XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEltZ0Fubm90YXRpb24pIHtcclxuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcclxuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheSgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHtjb250YWluZXJFbH0gPSB0aGlzO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdTZXR0aW5nICMxJylcclxuXHRcdFx0LnNldERlc2MoJ0l0XFwncyBhIHNlY3JldCcpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignRW50ZXIgeW91ciBzZWNyZXQnKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5teVNldHRpbmcpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MubXlTZXR0aW5nID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblx0fVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFBcUg7QUEyQnJILElBQU0sbUJBQTBDO0FBQUE7QUFBQSxFQUMvQyxXQUFXO0FBQ1o7QUFFQSxJQUFxQixnQkFBckIsY0FBMkMsdUJBQU87QUFBQSxFQUdqRCxNQUFNLFNBQVM7QUFDZCxVQUFNLEtBQUssYUFBYTtBQUd4QixVQUFNLGVBQWUsS0FBSyxjQUFjLFFBQVEsaUJBQWlCLENBQUMsUUFBb0I7QUFFckYsVUFBSSx1QkFBTyxVQUFVO0FBQUEsSUFDdEIsQ0FBQztBQUVELGlCQUFhLFNBQVMsd0JBQXdCO0FBRzlDLFVBQU0sa0JBQWtCLEtBQUssaUJBQWlCO0FBQzlDLG9CQUFnQixRQUFRLGlCQUFpQjtBQUd6QyxTQUFLLFdBQVc7QUFBQSxNQUNmLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFVBQVUsTUFBTTtBQUNmLFlBQUksWUFBWSxLQUFLLEdBQUcsRUFBRSxLQUFLO0FBQUEsTUFDaEM7QUFBQSxJQUNELENBQUM7QUFFRCxTQUFLLFdBQVc7QUFBQSxNQUNmLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLGdCQUFnQixDQUFDLFFBQWdCLFNBQXVC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
