import API from "./API";

export function preloadAssets() {
  const imageList = [
    API.InstaImg,
    API.ProfileImg
  ];

  const fontFiles = API.fontList;

  const loadImages = imageList.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  });

  const loadFonts = fontFiles.map((fontPath, index) => {
    const fontName = `CustomFont${index + 1}`;
    const font = new FontFace(fontName, `url(${fontPath})`);
    return font.load().then(loadedFont => {
      document.fonts.add(loadedFont);
    });
  });

  return Promise.all([...loadImages, ...loadFonts]);
}
