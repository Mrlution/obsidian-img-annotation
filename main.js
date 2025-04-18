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
    this.registerTouchEvents();
  }
  registerTouchEvents() {
    const touchEvents = ["touchstart", "touchmove", "touchend"];
    touchEvents.forEach((eventName) => {
      this.registerDomEvent(document, eventName, (event) => {
        new import_obsidian.Notice("${eventName}", event);
      });
    });
  }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgQXBwLCBFZGl0b3IsIE1hcmtkb3duVmlldywgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5pbXBvcnQgeyBDYW52YXMsIFN0YXRpY0NhbnZhcywgRmFicmljVGV4dCB9IGZyb20gJ2ZhYnJpYydcclxuXHJcbi8vIFJlbWVtYmVyIHRvIHJlbmFtZSB0aGVzZSBjbGFzc2VzIGFuZCBpbnRlcmZhY2VzIVxyXG5cclxuaW50ZXJmYWNlIEltZ0Fubm90YXRpb25TZXR0aW5ncyB7XHJcblx0bXlTZXR0aW5nOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IEltZ0Fubm90YXRpb25TZXR0aW5ncyA9IHsvL1xyXG5cdG15U2V0dGluZzogJ2RlZmF1bHQnXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltZ0Fubm90YXRpb24gZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHNldHRpbmdzOiBJbWdBbm5vdGF0aW9uU2V0dGluZ3M7XHJcblxyXG5cdGFzeW5jIG9ubG9hZCgpIHtcclxuXHRcdGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XHJcblxyXG5cdFx0Ly8gVGhpcyBjcmVhdGVzIGFuIGljb24gaW4gdGhlIGxlZnQgcmliYm9uLlxyXG5cdFx0Y29uc3QgcmliYm9uSWNvbkVsID0gdGhpcy5hZGRSaWJib25JY29uKCdkaWNlJywgJ1NhbXBsZSBQbHVnaW4nLCAoZXZ0OiBNb3VzZUV2ZW50KSA9PiB7XHJcblx0XHRcdC8vIENhbGxlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgaWNvbi5cclxuXHRcdFx0bmV3IE5vdGljZSgnSGVsbG9Zb3UnKTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8gUGVyZm9ybSBhZGRpdGlvbmFsIHRoaW5ncyB3aXRoIHRoZSByaWJib25cclxuXHRcdHJpYmJvbkljb25FbC5hZGRDbGFzcygnbXktcGx1Z2luLXJpYmJvbi1jbGFzcycpO1xyXG5cclxuXHRcdC8vIFRoaXMgYWRkcyBhIHN0YXR1cyBiYXIgaXRlbSB0byB0aGUgYm90dG9tIG9mIHRoZSBhcHAuIERvZXMgbm90IHdvcmsgb24gbW9iaWxlIGFwcHMuXHJcblx0XHRjb25zdCBzdGF0dXNCYXJJdGVtRWwgPSB0aGlzLmFkZFN0YXR1c0Jhckl0ZW0oKTtcclxuXHRcdHN0YXR1c0Jhckl0ZW1FbC5zZXRUZXh0KCdTdGF0dXMgQmFyIFRleHQnKTtcclxuXHJcblx0XHQvLyBUaGlzIGFkZHMgYSBzaW1wbGUgY29tbWFuZCB0aGF0IGNhbiBiZSB0cmlnZ2VyZWQgYW55d2hlcmVcclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnb3Blbi1zYW1wbGUtbW9kYWwtc2ltcGxlJyxcclxuXHRcdFx0bmFtZTogJ09wZW4gc2FtcGxlIG1vZGFsIChzaW1wbGUpJyxcclxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHtcclxuXHRcdFx0XHRuZXcgU2FtcGxlTW9kYWwodGhpcy5hcHApLm9wZW4oKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHQvLyBUaGlzIGFkZHMgYW4gZWRpdG9yIGNvbW1hbmQgdGhhdCBjYW4gcGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvbiB0aGUgY3VycmVudCBlZGl0b3IgaW5zdGFuY2VcclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnc2FtcGxlLWVkaXRvci1jb21tYW5kJyxcclxuXHRcdFx0bmFtZTogJ1NhbXBsZSBlZGl0b3IgY29tbWFuZCcsXHJcblx0XHRcdGVkaXRvckNhbGxiYWNrOiAoZWRpdG9yOiBFZGl0b3IsIHZpZXc6IE1hcmtkb3duVmlldykgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVkaXRvci5nZXRTZWxlY3Rpb24oKSk7XHJcblx0XHRcdFx0ZWRpdG9yLnJlcGxhY2VTZWxlY3Rpb24oJ1NhbXBsZSBFZGl0b3IgQ29tbWFuZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdC8vIFRoaXMgYWRkcyBhIGNvbXBsZXggY29tbWFuZCB0aGF0IGNhbiBjaGVjayB3aGV0aGVyIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBhcHAgYWxsb3dzIGV4ZWN1dGlvbiBvZiB0aGUgY29tbWFuZFxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6ICdvcGVuLXNhbXBsZS1tb2RhbC1jb21wbGV4JyxcclxuXHRcdFx0bmFtZTogJ09wZW4gc2FtcGxlIG1vZGFsIChjb21wbGV4KScsXHJcblx0XHRcdGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xyXG5cdFx0XHRcdC8vIENvbmRpdGlvbnMgdG8gY2hlY2tcclxuXHRcdFx0XHRjb25zdCBtYXJrZG93blZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xyXG5cdFx0XHRcdGlmIChtYXJrZG93blZpZXcpIHtcclxuXHRcdFx0XHRcdC8vIElmIGNoZWNraW5nIGlzIHRydWUsIHdlJ3JlIHNpbXBseSBcImNoZWNraW5nXCIgaWYgdGhlIGNvbW1hbmQgY2FuIGJlIHJ1bi5cclxuXHRcdFx0XHRcdC8vIElmIGNoZWNraW5nIGlzIGZhbHNlLCB0aGVuIHdlIHdhbnQgdG8gYWN0dWFsbHkgcGVyZm9ybSB0aGUgb3BlcmF0aW9uLlxyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHRuZXcgU2FtcGxlTW9kYWwodGhpcy5hcHApLm9wZW4oKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBUaGlzIGNvbW1hbmQgd2lsbCBvbmx5IHNob3cgdXAgaW4gQ29tbWFuZCBQYWxldHRlIHdoZW4gdGhlIGNoZWNrIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBUaGlzIGFkZHMgYSBzZXR0aW5ncyB0YWIgc28gdGhlIHVzZXIgY2FuIGNvbmZpZ3VyZSB2YXJpb3VzIGFzcGVjdHMgb2YgdGhlIHBsdWdpblxyXG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTYW1wbGVTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XHJcblxyXG5cdFx0Ly8gSWYgdGhlIHBsdWdpbiBob29rcyB1cCBhbnkgZ2xvYmFsIERPTSBldmVudHMgKG9uIHBhcnRzIG9mIHRoZSBhcHAgdGhhdCBkb2Vzbid0IGJlbG9uZyB0byB0aGlzIHBsdWdpbilcclxuXHRcdC8vIFVzaW5nIHRoaXMgZnVuY3Rpb24gd2lsbCBhdXRvbWF0aWNhbGx5IHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXIgd2hlbiB0aGlzIHBsdWdpbiBpcyBkaXNhYmxlZC5cclxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJywgKGV2dDogTW91c2VFdmVudCkgPT4ge1xyXG5cdFx0Ly9cdGNvbnNvbGUubG9nKCdjbGljaycsIGV2dCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBXaGVuIHJlZ2lzdGVyaW5nIGludGVydmFscywgdGhpcyBmdW5jdGlvbiB3aWxsIGF1dG9tYXRpY2FsbHkgY2xlYXIgdGhlIGludGVydmFsIHdoZW4gdGhlIHBsdWdpbiBpcyBkaXNhYmxlZC5cclxuXHRcdHRoaXMucmVnaXN0ZXJJbnRlcnZhbCh3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4gY29uc29sZS5sb2coJ3NldEludGVydmFsJyksIDUgKiA2MCAqIDEwMDApKTtcclxuXHRcdFxyXG5cdFx0Ly8gdGhpcy5hcHAud29ya3NwYWNlLm9uKCdsYXlvdXQtY2hhbmdlJywoKT0+e1xyXG5cdFx0Ly8gXHQvL3RoaXMuYWRkSW1hZ2VDbGlja0hhbmRsZXIoKTtcclxuXHRcdC8vIFx0bmV3IE5vdGljZSgnbGF5b3V0IGNoYW5nZScpO1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnc3RhcnQnKTtcclxuXHRcdC8vIFx0dGhpcy5hcHAud29ya3NwYWNlLml0ZXJhdGVBbGxMZWF2ZXMoKGxlYWY6IFdvcmtzcGFjZUxlYWYpID0+IHtcclxuXHRcdC8vIFx0XHQvL25ldyBOb3RpY2UobGVhZi5nZXRWaWV3U3RhdGUoKT8udHlwZSlcclxuXHRcdC8vIFx0XHRjb25zb2xlLmxvZyhsZWFmLmdldFZpZXdTdGF0ZSgpPy50eXBlKTtcclxuXHJcblx0XHQvLyBcdH0pXHJcblx0XHQvLyBcdGNvbnNvbGUubG9nKCdlbmQnKTtcclxuXHRcdC8vIH0pXHJcblx0XHRcclxuXHRcdHRoaXMucmVnaXN0ZXJUb3VjaEV2ZW50cygpO1xyXG5cdFxyXG5cdH1cclxuXHRyZWdpc3RlclRvdWNoRXZlbnRzKCkge1xyXG5cdFx0Y29uc3QgdG91Y2hFdmVudHMgPSBbXCJ0b3VjaHN0YXJ0XCIsIFwidG91Y2htb3ZlXCIsIFwidG91Y2hlbmRcIl07XHJcbiAgICAgICAgdG91Y2hFdmVudHMuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEb21FdmVudChkb2N1bWVudCwgZXZlbnROYW1lLCAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYFRvdWNoIGV2ZW50OiAke2V2ZW50TmFtZX1gLCBldmVudCk7XHJcblx0XHRcdFx0bmV3IE5vdGljZSgnJHtldmVudE5hbWV9JywgZXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHR9XHJcblxyXG5cdG9udW5sb2FkKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuXHR9XHJcblxyXG5cclxuXHRwcml2YXRlIGhhbmRsZUltYWdlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuXHRcdC8vIFx1NTNFRlx1NEVFNVx1NEY3Rlx1NzUyOGV2ZW50XHJcblx0XHRuZXcgTm90aWNlKCdJTUcgQ0xJQ0snKTtcclxuXHR9XHJcblx0Ly8gcHJpdmF0ZSBhZGRJbWFnZUNsaWNrSGFuZGxlcigpe1xyXG5cdC8vIFx0bmV3IE5vdGljZSgnYWRkaW5nIGhhbmRsZXInKTtcclxuXHQvLyBcdC8vIDEuIFx1ODNCN1x1NTNENlx1NUY1M1x1NTI0RFx1NkQzQlx1NTJBOFx1ODlDNlx1NTZGRVx1NzY4NFx1NUJCOVx1NTY2OFx1NTE0M1x1N0QyMFxyXG5cdC8vIFx0Y29uc3Qgdmlld0NvbnRhaW5lciA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmPy52aWV3LmNvbnRhaW5lckVsO1xyXG5cdC8vIFx0Ly8gMi4gXHU1Qjg5XHU1MTY4XHU1MjI0XHU2NUFEXHVGRjFBXHU3ODZFXHU0RkREXHU1QkI5XHU1NjY4XHU1QjU4XHU1NzI4XHJcblx0Ly8gXHRpZiAoIXZpZXdDb250YWluZXIpIHJldHVybjtcclxuXHQvLyBcdC8vIDMuIFx1NjdFNVx1NjI3RVx1NjI0MFx1NjcwOVx1NTZGRVx1NzI0N1x1NTE0M1x1N0QyMFxyXG5cdC8vIFx0Y29uc3QgaW1hZ2VzID0gdmlld0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKTtcclxuXHQvLyBcdC8vIDQuIFx1NEUzQVx1NkJDRlx1NEUyQVx1NTZGRVx1NzI0N1x1NkRGQlx1NTJBMFx1NzBCOVx1NTFGQlx1NEU4Qlx1NEVGNlx1NzZEMVx1NTQyQ1xyXG5cclxuXHQvLyBcdGltYWdlcy5mb3JFYWNoKGltZyA9PiB7XHJcblx0Ly8gXHRcdC8vIFx1NzlGQlx1OTY2NFx1NTNFRlx1ODBGRFx1NURGMlx1NUI1OFx1NTcyOFx1NzY4NFx1NEU4Qlx1NEVGNlx1NzZEMVx1NTQyQ1x1RkYwOFx1OTA3Rlx1NTE0RFx1OTFDRFx1NTkwRFx1NkRGQlx1NTJBMFx1RkYwOVxyXG5cdC8vIFx0XHRpbWcucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUltYWdlQ2xpY2spO1xyXG5cdC8vIFx0XHQvLyBcdTZERkJcdTUyQTBcdTY1QjBcdTc2ODRcdTRFOEJcdTRFRjZcdTc2RDFcdTU0MkNcclxuXHQvLyBcdFx0aW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVJbWFnZUNsaWNrLmJpbmQodGhpcykpO1xyXG5cdC8vIFx0fSk7XHJcblx0Ly8gfVxyXG5cclxufVxyXG5cclxuY2xhc3MgU2FtcGxlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XHJcblx0Y29uc3RydWN0b3IoYXBwOiBBcHApIHtcclxuXHRcdHN1cGVyKGFwcCk7XHJcblx0fVxyXG5cclxuXHRvbk9wZW4oKSB7XHJcblx0XHRjb25zdCB7Y29udGVudEVsfSA9IHRoaXM7XHJcblx0XHRjb250ZW50RWwuc2V0VGV4dCgnV29haCEnKTtcclxuXHR9XHJcblxyXG5cdG9uQ2xvc2UoKSB7XHJcblx0XHRjb25zdCB7Y29udGVudEVsfSA9IHRoaXM7XHJcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNhbXBsZVNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuXHRwbHVnaW46IEltZ0Fubm90YXRpb247XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEltZ0Fubm90YXRpb24pIHtcclxuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcclxuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheSgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHtjb250YWluZXJFbH0gPSB0aGlzO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdTZXR0aW5nICMxJylcclxuXHRcdFx0LnNldERlc2MoJ0l0XFwncyBhIHNlY3JldCcpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignRW50ZXIgeW91ciBzZWNyZXQnKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5teVNldHRpbmcpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MubXlTZXR0aW5nID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblx0fVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFBNEY7QUFTNUYsSUFBTSxtQkFBMEM7QUFBQTtBQUFBLEVBQy9DLFdBQVc7QUFDWjtBQUVBLElBQXFCLGdCQUFyQixjQUEyQyx1QkFBTztBQUFBLEVBR2pELE1BQU0sU0FBUztBQUNkLFVBQU0sS0FBSyxhQUFhO0FBR3hCLFVBQU0sZUFBZSxLQUFLLGNBQWMsUUFBUSxpQkFBaUIsQ0FBQyxRQUFvQjtBQUVyRixVQUFJLHVCQUFPLFVBQVU7QUFBQSxJQUN0QixDQUFDO0FBRUQsaUJBQWEsU0FBUyx3QkFBd0I7QUFHOUMsVUFBTSxrQkFBa0IsS0FBSyxpQkFBaUI7QUFDOUMsb0JBQWdCLFFBQVEsaUJBQWlCO0FBR3pDLFNBQUssV0FBVztBQUFBLE1BQ2YsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sVUFBVSxNQUFNO0FBQ2YsWUFBSSxZQUFZLEtBQUssR0FBRyxFQUFFLEtBQUs7QUFBQSxNQUNoQztBQUFBLElBQ0QsQ0FBQztBQUVELFNBQUssV0FBVztBQUFB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
