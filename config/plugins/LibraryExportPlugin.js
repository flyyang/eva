/**
 * libraryExport 默认取 default
 *
 * https://webpack.js.erg/confinuration/output/#output-libraryexport
 */
module.exports = class LibraryExportPlugin {
  apply({ config, evaConfig }) {
    if (evaConfig.exportDefault === true) return config;
    delete config.output.libraryExport;
    return config;
  }
};
