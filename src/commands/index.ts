import type { Editor } from 'grapesjs';
import { RequiredPluginOptions } from '..';
import {
  cmdClear,
  cmdDeviceDesktop,
  cmdDeviceMobile,
  cmdDeviceTablet,
} from './../consts';
import openImport from './openImport';

export default (editor: Editor, config: RequiredPluginOptions) => {
  const { Commands } = editor;
  const txtConfirm = config.textCleanCanvas;

  openImport(editor, config);

  Commands.add(cmdDeviceDesktop, {
    run: ed => ed.setDevice('Desktop'),
    stop: () => {},
  });
  Commands.add(cmdDeviceTablet, {
    run: ed => ed.setDevice('Tablet'),
    stop: () => {},
  });
  Commands.add(cmdDeviceMobile, {
    run: ed => ed.setDevice('Mobile portrait'),
    stop: () => {},
  });
  Commands.add(cmdClear, (e: Editor) => confirm(txtConfirm) && e.runCommand('core:canvas-clear'));

  Commands.add('export-template', {
    run(editor) {
      const html = editor.getHtml();
      const css = editor.getCss();
  
      editor.Modal.setTitle('Export Code')
        .setContent(`
          <textarea style="width:100%; height:200px;">${html}</textarea>
          <textarea style="width:100%; height:200px;">${css}</textarea>
        `)
  
      // İndirme için dosya oluşturma
      const blob = new Blob([`<style>${css}</style>${html}`], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'export.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
}
