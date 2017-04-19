App.info({
  id: 'dakik.herokuapp.com',
  name: 'Dakik',
  description: 'Cross platform time management',
  author: 'codeaia',
  email: 'ahmetkasif@ogr.cbu.edu.tr',
  website: 'https://dakik.herokuapp.com'
});
App.icons({
  'android_mdpi': 'public/icons/mobile_icon_48.png',
  'android_hdpi': 'public/icons/mobile_icon_72.png',
  'android_xhdpi': 'public/icons/mobile_icon_96.png',
  'android_xxhdpi': 'public/icons/mobile_icon_144.png',
  'android_xxxhdpi': 'public/icons/mobile_icon_192.png',
});
App.launchScreens({
  'android_xxhdpi_portrait': 'public/icons/mobile_splash_1080_1440.9.png',
});
App.setPreference('Orientation', 'portrait');
