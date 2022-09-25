import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, MarkdownPostProcessorContext, TFile } from 'obsidian';


export default class MyPlugin extends Plugin {
	
	async onload() {
		const running = this.app
		const { basePath } = (this.app.vault.adapter as any);
		const { workspace } = this.app;
		
		workspace.on('file-open', TFile => {
			new Notice('File opened');
			const activeFilesId = workspace.getLayout().main.children;

			activeFilesId.forEach((id: { id: string; }) => {
				const workspaceLeaf: HTMLElement = (workspace.getLeafById(id.id) as any).containerEl;
				const viewContent = workspaceLeaf.querySelector('.workspace-leaf-content > .view-content')
				console.log(id.id);
				
				if(!viewContent) return;
				let codeBlocksArr = viewContent.querySelectorAll('pre');

				codeBlocksArr.forEach(block => {
					const content = block.firstChild?.textContent;//.replace(/\n.*$/, '');
					console.log(block);
					//console.log(ctx);

					// Skip empty code blocks
					if (!content) return;
					
					// Get code block language
					// let lines = content //! for object is possibly null
					// .split("\n")
					// .slice(content!.lineStart, content!.lineEnd);

					const f = new Function(content);
					f();
					

					// const [run_js,...code] = lines;
					
					// // Check block language. ```run-js
					// if (!run_js.contains('run-js')) return;

					// block.style.display = 'none';

					
				});
			});

			//let el = qualcosa;
		});

		// this.registerMarkdownPostProcessor(
		// 	async (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
		// 		// let codeBlocksArr = el.querySelectorAll('pre');
				
		// 		// codeBlocksArr.forEach(block => {
		// 		// 	let content = ctx.getSectionInfo(block);

		// 		// 	//console.log(ctx);
		// 		// 	// Skip empty code blocks
		// 		// 	if (!content) return;

		// 		// 	// Get code block language
		// 		// 	let lines = content!.text //! for object is possibly null
		// 		// 		.split("\n")
		// 		// 		.slice(content!.lineStart, content!.lineEnd);

		// 		// 	const [run_js,...code] = lines;
					
		// 		// 	// Check block language. ```run-js
		// 		// 	if (!run_js.contains('run-js')) return;

		// 		// 	block.style.display = 'none';

		// 		// 	const f = new Function(code.join('\n'));
		// 		// 	f();
		// 		// });
		// 		//console.log('CTX\n', ctx);
		// 		//console.log('DocID', workspace.getLeafById(ctx.docId));
		// 	},
		// 	100
		// );

	}

	async onunload() {

	}
}
