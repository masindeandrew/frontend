@()
@import conf.Static

// this image fallback is duplicated in app.js by /grunt-configs/concat.js
try {
    @JavaScript(Static.js.omnitureJs)
} catch (e) {
    (new Image()).src = window.guardian.config.page.beaconUrl + '/count/omniture-library-error.gif';
}