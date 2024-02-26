export const FileHelper = {
  byteToFileSize: function (bytes: number) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    for (var i = 0; i < sizes.length; i++) {
      if (bytes <= 1024) {
        return bytes + ' ' + sizes[i];
      } else {
        let x = bytes / 1024;
        let p = parseFloat(x.toString()).toFixed(2);
        bytes = parseInt(p);
      }
    }
    return bytes + ' P';
  },
};
