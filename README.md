# AsciiDoc Support
A vscode support extension that provides live preview and syntax highlighting for the AsciiDoc format.

An extension to preview AsciiDoc text using the _AsciiDoctor_ publishing tool.

The extension can be activate in two ways

* Toggle Preview - `ctrl+k r`
* Open Preview to the Side - `ctrl+shift+r`

![alt](images/simple.gif)

## How to build and install from source (Linux)
```
git clone https://github.com/joaompinto/asciidoctor-vscode
cd asciidoctor-vscode
npm install
sudo npm install -g vsce
vsce package
code --install-extension *.vsix
```

## Credits:
This extension preview code was based on [joaompinto/asciidoctor-vscode](https://github.com/tht13/RST-vscode/),remove it's dependency asciidoctor of Ruby, repalce by asciidoctor.js.

**Because of there is a bug in opal witch is a depency of asciidoctor.js, this extension can not use directly.There is a solution:**

edit `opal.js` in module `opal-runtime`, change line #19305 form 

```
result = string.match(/\([^)]+\)/)[0].match(/[A-Z]/g).join('');
```

to

```
result = string.match(/\(([^)]+)\)/)[1];
```
