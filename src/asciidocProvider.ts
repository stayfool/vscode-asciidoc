'use strict'
import {
    Uri,
    Event,
    window,
    workspace,
    TextEditor,
    TextDocument,
    EventEmitter,
    TextDocumentContentProvider
} from 'vscode';
import * as Asciidoctor from 'asciidoctor.js'

export default class AsciidocProvider implements TextDocumentContentProvider {
    static scheme = 'asciidoc-preview';

    private _onDidChange = new EventEmitter<Uri>();
    private lastPreviewHTML;
    private asciidoctor;
    private options;

    constructor() {
        this.asciidoctor = Asciidoctor();
        this.options = {
            attributes: []
        }

        const config = workspace.getConfiguration('asciidoc');
        if (config.get('showtitle', true))
            this.options.attributes.push('showtitle')

        const icons = config.get('icons', 'font');
        if (icons)
            this.options.attributes.push('icons:' + icons)
    }

    public isAsciidocEditor(editor: TextEditor): boolean {
        return editor && this.isAsciidocDocument(editor.document)
    }

    public isAsciidocDocument(document: TextDocument): boolean {
        return document && document.languageId === "asciidoc"
    }

    public provideTextDocumentContent(uri: Uri): string | Thenable<string> {
        let editor = window.activeTextEditor;
        if (!this.isAsciidocEditor(editor)) {
            if (this.lastPreviewHTML) {
                return this.lastPreviewHTML;
            }
            return this.errorSnippet("Active editor doesn't show an AsciiDoc document - no properties to preview.");
        }
        return new Promise<string>((resolve, reject) => {
            this.lastPreviewHTML = this.asciidoctor.convert(editor.document.getText(), this.options);
            resolve(this.lastPreviewHTML);
        });
    }

    public update(uri: Uri) {
        this._onDidChange.fire(uri);
    }

    get onDidChange(): Event<Uri> {
        return this._onDidChange.event;
    }

    private errorSnippet(error: string): string {
        return `
                <body>
                    <h1>
                    ${error}
                    </h1>
                </body>`;
    }
}