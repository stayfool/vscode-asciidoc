'use strict';
import {
    Uri,
    window,
    commands,
    workspace,
    ViewColumn,
    TextDocument,
    ExtensionContext,
    TextDocumentChangeEvent
} from 'vscode';

import AsciidocProvider from './asciidocProvider';
import * as path from "path";

export function activate(context: ExtensionContext) {

    const provider = new AsciidocProvider();
    const previewTitle = path.basename(window.activeTextEditor.document.fileName);
    const previewUri = Uri.parse(`${AsciidocProvider.scheme}://${previewTitle}`);

    workspace.onDidChangeTextDocument((e: TextDocumentChangeEvent) => {
        if (provider.isAsciidocDocument(e.document)) {
            provider.update(previewUri);
        }
    })

    workspace.onDidSaveTextDocument((e: TextDocument) => {
        if (provider.isAsciidocDocument(e)) {
            provider.update(previewUri);
        }
    })

    const registration = workspace.registerTextDocumentContentProvider(AsciidocProvider.scheme, provider)

    const previewToSide = commands.registerCommand("asciidoc.previewToSide", () => {
        let displayColumn: ViewColumn;
        switch (window.activeTextEditor.viewColumn) {
            case ViewColumn.One:
                displayColumn = ViewColumn.Two;
                break;
            case ViewColumn.Two:
            case ViewColumn.Three:
                displayColumn = ViewColumn.Three;
                break;
        }
        return commands.executeCommand("vscode.previewHtml", previewUri, displayColumn, previewTitle)
            .then((success) => { },
            (reason) => {
                console.warn(reason);
                window.showErrorMessage(reason);
            })
    })

    const preview = commands.registerCommand("asciidoc.preview", () => {
        return commands.executeCommand("vscode.previewHtml", previewUri, window.activeTextEditor.viewColumn, previewTitle)
            .then((success) => { },
            (reason) => {
                console.warn(reason);
                window.showErrorMessage(reason);
            })
    })

    context.subscriptions.push(registration, previewToSide, preview);
}

// this method is called when your extension is deactivated
export function deactivate() { }

export const TZ = 'GMT'