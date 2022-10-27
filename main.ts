import { Console, debug } from 'console';
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, MarkdownPostProcessorContext, TFile, Workspace } from 'obsidian';


export default class MyPlugin extends Plugin {
	
	async onload() {
		// const running = this.app
		// const { basePath } = (this.app.vault.adapter as any);
		const { workspace } = this.app;

		this.registerMarkdownPostProcessor(
			async (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
				this.compileJs(workspace, el, ctx);
			}
		);
	}

	async onunload() {

	}



	async compileJs(workspace: Workspace, el: HTMLElement, ctx: MarkdownPostProcessorContext){
		await sleep(1);
		
		const noteContainer = workspace.containerEl.children[2];
		
		let activeFiles = noteContainer?.querySelectorAll('.mod-active');
		
		activeFiles?.forEach(file => {
			const actions = file.querySelectorAll('.workspace-leaf-content > .view-header > .view-actions > .view-action')
			
			const editButton = actions[0];
			if(editButton.ariaLabel?.contains('editing')) return;
				
			let content = ctx.getSectionInfo(el);
			if (!content) return;

			const [first_line, ...lines] = content!.text.split('\n').slice(content!.lineStart, content!.lineEnd);
			if (!first_line.contains('run-js')) return;
			
			const f = new Function(lines.join('\n'));
			f();

			el.style.display = 'none';
		});
	}
}