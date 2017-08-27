# AsciiDoc Support

A vscode support extension that provides live preview and syntax highlighting for the AsciiDoc format.

An extension to preview AsciiDoc text using the _AsciiDoctor_ publishing tool.

The extension can be activate in two ways

* Toggle Preview - `ctrl+k r`
* Open Preview to the Side - `ctrl+shift+r`

![simple](images/simple.gif)

## How to build and install from source
```
git clone https://github.com/stayfool/vscode-asciidoc.git
cd asciidoctor-vscode
npm install
sudo npm install -g vsce
vsce package
code --install-extension *.vsix
```

## Credits:
This extension preview code was based on [joaompinto/asciidoctor-vscode](https://github.com/joaompinto/asciidoctor-vscode), remove it's dependency asciidoctor of Ruby, repalce by asciidoctor.js.